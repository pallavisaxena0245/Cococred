import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { useNavigate, Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthService';
import './styles/Login.css'; // Importing the CSS file
import "core-js/stable/atob";
import { jwtDecode } from "jwt-decode";
const { v4: uuidv4 } = require('uuid');

function Login() {
    const clientId = process.env.REACT_APP_CLIENT_ID;
    const { setAuthenticated } = useContext(AuthContext);
    const navigate = useNavigate();

    function onSuccess(response) {
        console.log('Login successful:', response);
        const credential = response.credential; // your credential

        const decoded = jwtDecode(credential);
        const email = decoded.email;
        console.log("Email:", email);


        const userId = uuidv4();
        console.log("Generated user ID:", userId);
        
        setAuthenticated(true);
        localStorage.setItem('authenticated', 'true');
        navigate('/home');
    }

    function onFailure(error) {
        console.log('Login unsuccessful:', error);
        setAuthenticated(false);
        localStorage.setItem('authenticated', 'false');
    }

    return (
        <div className="user-login-container">
            <form className="user-login-form">
                <div className="form-group">
                    <label htmlFor="userEmail" className="form-label">
                        Enter your email address
                    </label>
                    <input
                        type="email"
                        className="form-control"
                        id="userEmail"
                        placeholder="Enter email"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="userPassword" className="form-label">
                        Enter your password
                    </label>
                    <input
                        type="password"
                        className="form-control"
                        id="userPassword"
                        placeholder="Password"
                    />
                </div>

                <div className="submit-button-container">
                    <button type="submit" className="btn submit-button">
                        Submit
                    </button>
                </div>

                <div className="switch-login-link">
                    <Link to="/auth_login">Not a user? Go to authority login</Link>
                </div>

                <div className="google-login-container">
                    <GoogleOAuthProvider clientId={clientId}>
                        <GoogleLogin
                            onSuccess={onSuccess}
                            onError={onFailure}
                        />
                    </GoogleOAuthProvider>
                </div>
            </form>
        </div>
    );
}

export default Login;
