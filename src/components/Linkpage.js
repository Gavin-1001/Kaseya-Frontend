import React from 'react'
import { Link } from 'react-router-dom';

const Linkpage = () => {
  return (
    <section>
        <h1>Linkpage</h1>
        <br />
        <h2>Public</h2>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
        <Link to="/about">About</Link>
        <Link to="/test">Test</Link>
        <br />
        <h2>Private</h2>
        <Link to="/">Home</Link>
        <Link to="/dashboard">Dashboard</Link>
    </section>
  )
}

export default Linkpage