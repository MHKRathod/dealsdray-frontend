import "./Auth.css";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";

export const AuthLogin = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [redirectToDashboard, setRedirectToDashboard] = useState(false);
    const navigate = useNavigate(); 

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://xto10x-24f21250d5a0.herokuapp.com/api/auth/login', {
                username,
                password
            });
            if (response.status === 200) {
                // Call onLogin function with username upon successful login
                onLogin(username); // Pass the username to the onLogin function
                // Set redirectToDashboard to true to navigate to dashboard
                setRedirectToDashboard(true);
            } else {
                // Handle registration or other cases here if needed
                console.log('Login failed');
            }
        } catch (error) {
            console.error('Error during login:', error.response?.data?.message || error.message);
            alert('Incorrect username or password');
        }
    };

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSignup = () => {
        navigate('/signup');
    };

    return (
        <div className="d-grid">
            <div className="login-auth d-flex direction-column justify-center">
                <h2 className="auth-title">Login</h2>
                <form onSubmit={handleLogin}>
                    <div className="form-container">
                        <label className="form-label">Username</label>
                        <input className="form-input lh-ls" placeholder="" value={username} onChange={handleUsernameChange}/>
                    </div>
                    <div className="form-container">
                        <label className="form-label">Password</label>
                        <input
                            className="form-input lh-ls"
                            type="password"
                            placeholder=""
                            value={password}
                            onChange={handlePasswordChange}
                        />
                    </div>
                    <div className="cta">
                        <button className="button login-btn btn-margin cursor sign-up-btn">Login</button>
                    </div>
                </form>
                <div>
                    <button className="button login-btn btn-outline-primary btn-margin sign-up-btn" onClick={handleSignup}>
                        SignUp
                    </button>
                </div>
            </div>
            {redirectToDashboard && <Navigate to="/dashboard" />}
        </div>
    );
};
