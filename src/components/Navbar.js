/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate, Link } from "react-router-dom";
import { clearCurrentUser } from "../redux/store/actions/users";
//import { Role } from "../common/models/Role";

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
      </a>
      <div className="navbar-nav me-auto">

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
        {/*SKILLS*/}
        <li className="nav-item">
          <NavLink to="/skills" className="nav-link">
            Skills
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

      {/*LOGOUT*/}
      {currentUser && (
        <div className="navbar-nav ms-auto">
          {/* <li className="nav-item">
            <NavLink to="/profile">{currentUser.name}</NavLink>
          </li> */}
          <li className="nav-item">
            <Link to="/logout" className="nav-link" onClick={() => logout()}>
              Logout
            </Link>
          </li>
        </div>
      )}
    </nav>
  );
};
export default Navbar;
