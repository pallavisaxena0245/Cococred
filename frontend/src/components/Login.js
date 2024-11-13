import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import {useNavigate, Link} from 'react-router-dom';
import { useContext } from 'react';
import {AuthContext} from '../contexts/AuthService';

function Login({user_choice}) {
    const clientId = process.env.REACT_APP_CLIENT_ID;
    const {setAuthenticated}= useContext(AuthContext);
    
    // Define clientId here
    const navigate = useNavigate();

  function onSuccess(response) {
    console.log('Login successful:', response);
   setAuthenticated(true);
    navigate('/home');
  }

  function onFailure(error) {
    console.log('Login unsuccessful:', error);
   setAuthenticated(false);
  }

  return (

    <>
    

    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">

    <form style={{ width: '300px', padding: '20px', backgroundColor: '#ccffcc', borderRadius: '8px' }}>
        <div className="form-group">
            <label htmlFor="exampleInputEmail1" style={{ color: '#006600' }}>Enter {user_choice} email address</label>
            <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter email"
                style={{ backgroundColor: '#e6ffe6', borderColor: '#66cc66', color: '#004d00' }}
            />
        </div>
        <div className="form-group">
            <label htmlFor="exampleInputPassword1" style={{ color: '#006600' }}>Enter {user_choice} password</label>
            <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Password"
                style={{ backgroundColor: '#e6ffe6', borderColor: '#66cc66', color: '#004d00' }}
            />
        </div>
        
        {/* Centered submit button */}
        <div className="d-flex justify-content-center mt-3">
            <button type="submit" className="btn" style={{ backgroundColor: '#66cc66', color: 'white' }}>
                Submit
            </button>
        </div>


        <div className="text-center mt-3">
                        {user_choice == 'user' ? (
                            <>
                            {console.log(user_choice)}
                            <Link to="/auth_login" style={{ color: '#339933' }}>
                                Not a user? Go to authority login
                            </Link>
                            </>
                            
                        ) : (
                            <>
                            {console.log("admin" + user_choice)}
                            <Link to="/user_login" style={{ color: '#339933' }}>
                                Not an authority? Go to user login
                            </Link>
                            </>
                        )}
                    </div>

        <div className="container py-3">
            <GoogleOAuthProvider clientId={clientId}>
                <GoogleLogin
                    onSuccess={onSuccess}
                    onError={onFailure}
                    style={{
                        marginTop: '20px',
                        backgroundColor: '#66cc66',
                        color: 'white',
                        border: 'none',
                        padding: '10px 20px',
                        borderRadius: '5px',
                        cursor: 'pointer'
                    }}
                />
            </GoogleOAuthProvider>
        </div>
    </form>
</div>
</>
  );
}

export default Login;
