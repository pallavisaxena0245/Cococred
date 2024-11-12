import React, { useState } from 'react';
import axios from 'axios';
import WalletButton from './WalletButton';

const Landing = () => {
   const [attribute, setAttribute] = useState('');
   const [value, setValue] = useState('');

   
   // Handle changes for attribute selection
   const handleAttributeChange = (e) => {
      setAttribute(e.target.value);
   };

   // Handle changes for attribute value input
   const handleValueChange = (e) => {
      setValue(e.target.value);
   };

   // Handle form submission
   const handleSubmit = async (e) => {
      e.preventDefault(); // Prevent the default form submission

      try {
         // Send a POST request to generate ZKP
         const response = await axios.post('http://localhost:5000/generate_zkp', {
            attribute: attribute,
            value: value,
         });

         // Log the response data for debugging
         console.log('ZKP Response:', response.data);

         // Show success message with commitment (response data)
         alert('Commitment generated:\n' + JSON.stringify(response.data, null, 2));
      } catch (error) {
         // Catch any errors
         console.error('Error generating ZKP:', error);
         alert('An error occurred while generating ZKP.');
      }
   };

   return (
      <div className="container d-flex justify-content-center align-items-center min-vh-100">
         <div className="card p-4 shadow-sm" style={{ width: '400px' }}>
            <h1 className="text-center mb-4">Generate Zero-Knowledge Proof</h1>
            <form onSubmit={handleSubmit}>
               <div className="mb-3">
                  <label className="form-label">Select Attribute:</label>
                  <select 
                     value={attribute} 
                     onChange={handleAttributeChange} 
                     className="form-select" 
                     required
                  >
                     <option value="">Select...</option>
                     <option value="age">Age</option>
                     <option value="gender">Gender</option>
                     <option value="address">Address</option>
                     <option value="dob">Date of Birth</option>
                     <option value="mobile">Mobile Number</option>
                  </select>
               </div>
               <div className="mb-3">
                  <label className="form-label">Enter Attribute Value:</label>
                  <input 
                     type="text" 
                     value={value} 
                     onChange={handleValueChange} 
                     className="form-control" 
                     required 
                  />
               </div>
               <button type="submit" className="btn btn-success w-100">Generate ZKP</button>
            </form>
         </div>
      </div>
   );
};

export default Landing;
