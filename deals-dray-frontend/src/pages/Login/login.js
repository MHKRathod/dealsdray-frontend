import "./login.css";

import React, { Fragment } from 'react';
import { Navbar } from "../../components/Navbar/Navbar";

const Login = () => {
    return (
        <Fragment>
        <Navbar route="/login"/>
        <div className="d-grid">
            <div className="login-auth d-flex direction-column justify-center">
                <h2 className="auth-title">Login</h2>
                <form >
                    <div className="form-container">
                        <label className="form-label">Username</label>
                        <input className="form-input lh-ls" placeholder="prakashsakari"  />
                    </div>
                    <div className="form-container">
                        <label className="form-label">Password</label>
                        <input className="form-input lh-ls" placeholder="*******"  />
                    </div>
                    <div className="cta">
                        <button className="button login-btn btn-margin cursor sign-up-btn">Login</button>
                    </div>
                </form>
                <div>
                    <button className="button login-btn btn-outline-primary btn-margin sign-up-btn">
                        Login with Test Credentials
                    </button>
                </div>
            </div>
        </div>
        </Fragment>
    );
};

export default Login;
