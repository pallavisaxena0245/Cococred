import React, { useContext } from 'react';
import './styles/Landing.css'; // Import CSS file
import { VerifiedContext } from '../contexts/CertificateService';
import { useNavigate } from 'react-router-dom';

const Landing = () => {
    const {verified} = useContext(VerifiedContext);
    const navigate = useNavigate();

    function gotoVerify(){
      navigate('/user_verify');
    }

    return (
        <div className="landing-container">
            <h1 className="landing-title">Welcome to Cococred</h1>
            <p className="landing-description">
                Are you tired of revealing your sensitive data to third-party agents? Cococred ensures secure and hassle-free verification with zero compromises on your privacy.
            </p>
            {!verified ? (
                <button className="landing-button verify-btn" onClick={gotoVerify}>Verify Profile</button>
            ) : (
                <button className="landing-button certificates-btn">Show Certificates</button>
            )}
        </div>
    );
};

export default Landing;
