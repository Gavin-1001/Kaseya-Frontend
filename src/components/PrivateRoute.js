import React, { useState } from 'react'
import { Navigate } from 'react-router-dom';

export default function PrivateRoute({children}) {

    const [jwt, setJwt] = useState("", "token");
    return jwt ? children : <Navigate to="/login" />; //checks to see if jwt is present in localstorage
                                                        //if it is it renders the children otherwise the terniary statement returns user to /login

  return (
    <div>PrivateRoute</div>
  )
}
