import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './styles/Certificate.css';

const Certificate = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Destructure state with default values
  const { commitment = '', hash = '', verified = false } = location.state || {};

  // Redirect to the homepage if data is missing
  useEffect(() => {
    if (!commitment || !hash) {
      alert('Missing certificate data! Redirecting to the homepage.');
      navigate('/home'); // Redirect to the homepage
    }
  }, [commitment, hash, navigate]);

  // Close the popup and navigate to the homepage
  const handleClose = () => {
    navigate('/home');
  };

  return (
    <div className="certificate-container">
      <div className="certificate-box">
        <h3 className="certificate-title">Certificate</h3>
        <div className="certificate-info">
          <p><strong>Hash:</strong> {hash}</p>
          <p><strong>Commitment:</strong> {commitment}</p>
          <p><strong>Verified:</strong> {verified ? 'Yes' : 'No'}</p>
        </div>
        <button className="certificate-button" onClick={handleClose}>
          Close and Go to Homepage
        </button>
      </div>
    </div>
  );
};

export default Certificate;
