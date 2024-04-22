import "./Auth.css";
import { useState } from "react";
import { Navigate } from "react-router-dom"; 
import axios from "axios";

export const AuthSignUp = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [redirectToDashboard, setRedirectToDashboard] = useState(false);

    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://xto10x-24f21250d5a0.herokuapp.com/api/auth/register', {
                username,
                password
            });
            console.log(response.data);
            
            // Check if the response indicates successful signup
            if (response.status === 201) { // Assuming 201 is the status code for successful signup
                // Set redirectToDashboard to true to navigate to the dashboard
                setRedirectToDashboard(true);
            } else {
                console.log('Signup failed'); // Log an error if signup was not successful
            }
        } catch (error) {
            console.error('Error during signup:', error.response?.data?.message || error.message);
        }
    };
    
    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    return (
        <div className="d-grid">
            <div className="login-auth d-flex direction-column justify-center">
                <h2 className="auth-title">SignUp</h2>
                <form onSubmit={handleSignUp}> 
                    <div className="form-container">
                        <label className="form-label">Username</label>
                        <input className="form-input lh-ls" placeholder="prakashsakari" value={username} onChange={handleUsernameChange}/>
                    </div>
                    <div className="form-container">
                        <label className="form-label">Password</label>
                        <input className="form-input lh-ls" placeholder="*******" value={password} onChange={handlePasswordChange}/>
                    </div>
                    <div className="cta">
                        <button className="button login-btn btn-margin cursor sign-up-btn">SignUp</button>
                    </div>
                </form>
            </div>
            {redirectToDashboard && <Navigate to="/dashboard" />}
        </div>
    )
}
