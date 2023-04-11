import React, { useEffect, useState } from "react";
import User from "../../common/models/User";
import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import './Register.css';
import AuthService from "../../service/AuthService";

const Register = () => {
  const [user, setUser] = useState(new User('', '', ''));
  const [loading, setLoading] = useState(false); //sets a loading state to let the user know the page is loading
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const currentUser = useSelector((state) => state.user);

  const navigate = useNavigate();
  

  useEffect(() => {
    if (currentUser?.id) {
      navigate("/profile");
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((previousState) => {
      return {
        ...previousState,
        [name]: value,
      };
    });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    //stops the register creds being displayed in url

    setSubmitted(true);
    if (!user.username || !user.password || !user.role) {
      return; //checks if username and password fields are not empty
    }
    setLoading(true);

    //Authenitcation next
    AuthService.register(user)
      .then(_ => {
        //set user in session
        navigate("/login");
      })
      .catch((error) => {
        console.log(error);
        // Todo:v
        //add custom user error pasges later. Check if error is 409 => username password not valid. setsErrorMsg to something like username not found 
            //don't expose the users creds by allowing 
        if(error?.response?.status === 409){
            setErrorMessage("username or password is not valid")
        }else{
            setErrorMessage("Unexpected error. Try again.");
        }
        setLoading(false);
      });
  };

  return (
    <div className="container mt-5">
      <div className="card ms-auto me-auto p-3 shadow-lg custom-card">
      <h3>Sign up</h3> {/*NoT really happy with this but style later if you get a chance*/}
        {errorMessage && (
          <div className="alert alert-danger">{errorMessage}</div>
        )}
        <form
          onSubmit={(e) => handleRegister(e)}
          className={submitted ? "was-validated" : ""}
          noValidate // does not validate the form
        >
            <div className="form-group">
            {/*USER's Role*/}
            <label htmlFor="role">Your role</label>
            <input
              type="text"
              name="role"
              className="form-control"
              placeholder="Enter your role here"
              value={user.role}
              onChange={(e) => handleChange(e)}
              required
            />
            {/*DISPLAYS ANY ERROR MESSAGE RELATING TO FIELD*/}
            <div className="invalid-feedback">Role IS REQUIRED!!</div>
          </div>




          <div className="form-group">
            {/*USERNAME*/}
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              className="form-control"
              placeholder="Enter your username here"
              value={user.username}
              onChange={(e) => handleChange(e)}
              required
            />
            {/*DISPLAYS ANY ERROR MESSAGE RELATING TO FIELD*/}
            <div className="invalid-feedback">USERNAME IS REQUIRED!!</div>
          </div>

          <div className="form-group">
            {/*PASSWORD*/}
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Enter your password here"
              value={user.password}
              onChange={(e) => handleChange(e)}
              required
            />
            {/*DISPLAYS ANY ERROR MESSAGE RELATING TO FIELD*/}
            <div className="invalid-feedback">PASSWORD IS REQUIRED!!</div>
          </div>

          {/*Add the button*/}
          <button className="btn btn-primary w-100 mt-3">Sign up</button>
        </form>
        <Link
          to="/login"
          className="btn btn-link"
          style={{ color: "darkgray" }}
        >
          I have an Account
        </Link>
      </div>
    </div>
  );
};
//} think this goes here. EDIT: nvm
export default Register;
