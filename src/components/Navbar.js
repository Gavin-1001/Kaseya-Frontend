/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { clearCurrentUser } from "../redux/store/actions/users";
import { Role } from "../common/models/Role";

const Navbar = () => {
  const currentUser = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = () => {
    dispatch(clearCurrentUser());
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand navbar-dark bg-dark">
      <a href="https://google.com/" className="navbar-brand ms-1">
        {/* <img src="#" className="App-Logo" alt="image" /> */}
      </a>
      <div className="navbar-nav me-auto">
        {currentUser?.role === Role.USER && (
          <li className="nav-item">
            <NavLink to="/admin" className="nav-link">
              Admin
            </NavLink>
          </li>
        )}

        <li>
          <NavLink to="/home" className="nav-link">
            Home
          </NavLink>
        </li>
        {/*DASHBOARD*/}
        <li className="nav-item">
          <NavLink to="/dashboard" className="nav-link">
            Dashboard
          </NavLink>
        </li>
      </div>
      {/*NAVLINKS FOR LOGIN AND REGISTER*/}
      {!currentUser && (
        <div className="navbar-nav ms-auto">
          <li className="nav-item">
            <NavLink to="/register" className="nav-link">
              Sign up
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/login" className="nav-link">
              Sign In
            </NavLink>
          </li>
        </div>
      )}

      {currentUser && (
        <div className="navbar-nav ms-auto">
          {/* <li className="nav-item">
            <NavLink to="/profile">{currentUser.name}</NavLink>
          </li> */}
          <li className="nav-item -auto">
            <a href="#" className="nav-item" onClick={() => logout()}>
              Logout
            </a>
          </li>
        </div>
      )}
    </nav>
  );
};
export default Navbar;
