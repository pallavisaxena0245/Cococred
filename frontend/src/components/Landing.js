import React, { useState } from 'react';
import axios from 'axios';

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
      e.preventDefault();  // Prevent the default form submission

      try {
         // Send a POST request to generate ZKP
         const response = await axios.post('http://localhost:5000/generate_zkp', {
            attribute: attribute,
            value: value
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
      <div className="container">
         <h1>Welcome to the Landing Page</h1>

         <form onSubmit={handleSubmit}>
            <label>
               Select Attribute:
               <select value={attribute} onChange={handleAttributeChange} required>
                  <option value="">Select...</option>
                  <option value="age">Age</option>
                  <option value="gender">Gender</option>
                  <option value="address">Address</option>
                  <option value="dob">Date of Birth</option>
                  <option value="mobile">Mobile Number</option>
               </select>
            </label>
            <br />
            <br />
            <label>
               Enter Attribute Value:
               <input type="text" value={value} onChange={handleValueChange} required />
            </label>
            <button type="submit">Generate ZKP</button>
            <br />
            <br />
         </form>
      </div>
   );
};

export default Landing;
