import React from 'react';

const Certificate = ({ field, commitment }) => {
    return (
        <div style={certificateContainerStyle}>
            <div style={certificateStyle}>
                <h3>Certificate</h3>
                <div style={infoStyle}>
                    <p><strong>Field:</strong> {field}</p>
                    <p><strong>Commitment:</strong> {commitment}</p>
                </div>
            </div>
        </div>
    );
};

// Styles for the container to allow horizontal scrolling
const certificateContainerStyle = {
    overflowX: 'auto', // Enable horizontal scrolling
    whiteSpace: 'nowrap', // Prevent content from wrapping to next line
    width: '100%', // Full width of the parent container
    padding: '10px 0',
};

const certificateStyle = {
    display: 'inline-block', // Align certificate side-by-side horizontally
    border: '2px solid #ccc',
    borderRadius: '8px',
    padding: '20px',
    width: '300px', // Set fixed width
    backgroundColor: '#f9f9f9',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
    marginRight: '10px', // Space between certificates
};

const infoStyle = {
    fontSize: '14px',
    lineHeight: '1.6',
};

export default Certificate;
