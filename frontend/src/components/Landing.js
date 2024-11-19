// LandingPage.js
import React, { useState } from 'react';
import Certificate from './Certificate';
import axios from 'axios';

const Landing = () => {
   const [certificates, setCertificates] = useState({});
  const [formData, setFormData] = useState({ name: '', age: '', gender: '', address: '' });
  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('name', formData.name);
    data.append('age', formData.age);
    data.append('gender', formData.gender);
    data.append('address', formData.address);
    data.append('document', file);

    try {
      const response = await axios.post('http://localhost:5000/verify_profile', data);
      alert('Commitment generated successfully!');
      setCertificates(response.data.commitments);
     
     

      // Iterate over the commitments object
     

    } catch (error) {
      console.error('Error generating commitment:', error);
    }
  };

  return (
   <div className="d-flex justify-content-center align-items-center vh-100">
   <form onSubmit={handleSubmit} className="p-4 shadow-lg rounded border bg-light" style={{ width: '100%', maxWidth: '600px' }}>
     <h2 className="text-center mb-4">User Profile Verification</h2>

     {/* Name Input */}
     <div className="form-group mb-3">
       <label htmlFor="nameInput" className="form-label">Name</label>
       <input
         className="form-control"
         type="text"
         id="nameInput"
         name="name"
         placeholder="Enter your name"
         onChange={handleChange}
         required
       />
     </div>

     {/* Age Input */}
     <div className="form-group mb-3">
       <label htmlFor="ageInput" className="form-label">Age</label>
       <input
         className="form-control"
         type="number"
         id="ageInput"
         name="age"
         placeholder="Enter your age"
         onChange={handleChange}
         required
       />
     </div>

     {/* Gender Select */}
     <div className="form-group mb-3">
       <label htmlFor="genderSelect" className="form-label">Gender</label>
       <select
         className="form-control"
         id="genderSelect"
         name="gender"
         onChange={handleChange}
         required
       >
         <option value="">Select your gender</option>
         <option>Male</option>
         <option>Female</option>
         <option>Others</option>
       </select>
     </div>

     {/* Address Input */}
     <div className="form-group mb-3">
       <label htmlFor="addressTextarea" className="form-label">Address</label>
       <textarea
         className="form-control"
         id="addressTextarea"
         name="address"
         placeholder="Enter your address"
         onChange={handleChange}
         rows="3"
         required
       ></textarea>
     </div>

     {/* File Upload */}
     <div className="form-group mb-4">
       <label htmlFor="fileInput" className="form-label">Government Issued Identity Proof</label>
       <input
         className="form-control"
         type="file"
         id="fileInput"
         onChange={handleFileChange}
         required
       />
     </div>

     {/* Submit Button */}
     <div className="text-center">
       <button type="submit" className="btn btn-primary">
         Generate Commitment
       </button>
     </div>
   </form>
 </div>
  );
};

export default Landing;
