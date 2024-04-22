import "./login.css";
import React, { Fragment } from 'react';

import { Navbar } from "../../components/Navbar/Navbar";
import { AuthLogin } from "../../components/Auth/login";
const Login = ({ onLogin }) => {
   

    const handleLogin = (username) => {
        console.log("Logged in as:", username); 
        onLogin(username); 
    };
    return (
        <Fragment>
        <Navbar route="/login"/>
        <AuthLogin onLogin={handleLogin} /> 
        </Fragment>
    );
};

export default Login;
