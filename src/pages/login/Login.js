import React, { useEffect, useState } from 'react'
import User from '../../common/models/User'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [user, setUser] = useState(new User("", "", ""))
    const [loading, setLoading] = useState(false); //sets a loading state to let the user know the page is loading 
    const [submitted, setSubmitted] = useState(false);
    const[errorMessage, setErrorMessage] = useState("");

    const currentUser = useSelector((state) => state.user);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() =>{
        if(currentUser?.id){
            navigate('/profile');
        }
    }, []);

    const handleChange = (e) =>{
            const {name, value} = e.target;
            setUser((previousState) => {
                return{
                ...previousState,
                [name]: value,
                };
            });
        };

        const handleLogin = (e) => {
            e.preventDefault(); 
            //stops the login creds being displayed in url

            setSubmitted(true);
            if(!user.username || !user.password){
                return;//checks if username and password fields are not empty
            }
            setLoading(true);
        }
    }

  return (
    <div>Login</div>
  )
}

export default Login