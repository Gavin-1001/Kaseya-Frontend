import React, { useContext, useEffect, useRef, useState } from 'react'
import AuthContext from '../context/AuthProvider';
import axios from '../api/axios';

const LOGIN_URL = '/api/authentication/signin';


export default function Login() {


    const userRef = useRef();
    const {setAuth} = useContext(AuthContext);
    const errRef = useRef();


    const [user, setUser] =useState('');
    const [password, setPassword] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState('');



    useEffect(() =>{
        userRef.current.focus();
    }, []);


    useEffect(() =>{
        setErrMsg('');
    }, [user, password]);


    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            const response = await axios.post(LOGIN_URL, JSON.stringify({username: user, password : password}), //21 minutes in 
            {
                headers: {'Content-Type': 'application/json'},
                withCredentials: true

            }); 
            console.log(JSON.stringify(response?.data));
            console.log(JSON.stringify(response)); //stringify the whole response

            const accessToken = response?.data?.accessToken;
            const roles = response?.data?.roles;

            setAuth({user,password, roles ,accessToken})

            console.log(user, password)
            setUser('');
            setPassword('');
            setSuccess(true);
        }catch(err){
            if(!err?.response){
                setErrMsg("NO server response");
            }else if(err.response?.status === 400){
                setErrMsg("Missing username or password");
            }else if(err.repsonse?.status === 401){
                setErrMsg("Unauthorized");
            }else{
                setErrMsg("Login failed");
            }
            errRef.current.focus();
        }

    }


  return (
    <section>
        <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
        <h1>Sign In</h1>

        <form onSubmit={handleSubmit}>
                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            id="username"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setUser(e.target.value)}
                            value={user}
                            required
                        />
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            required
                        />
                        <button>Sign In</button>
                    </form>
                    <p>
                        Need an Account?<br />
                        <span className="line">
                            {/*put router link here*/}
                            <a href="#">Sign Up</a>
                        </span>
                    </p>
    </section>
  )
}
