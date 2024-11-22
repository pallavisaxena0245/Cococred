import React, { useContext, useState } from 'react';
import { VerifiedContext, HashContext, CommitmentContext } from '../contexts/CertificateService';
import axios from 'axios';
import './styles/Profile.css'; // Importing the CSS file

const Profile = () => {
   const { setHash } = useContext(HashContext);
   const { setVerified } = useContext(VerifiedContext);
   const { setCommitment } = useContext(CommitmentContext);
   const [formData, setFormData] = useState({ name: '', age: '', gender: '', address: '', govt_id: '' });
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
      data.append('govt_id', formData.govt_id);
      data.append('document', file);

      try {
         const response = await axios.post('http://localhost:5000/verify_profile', data);
         alert('Commitment generated successfully!');
         setCommitment(response.data.commitment);
         setHash(response.data.hash);
         // make verified variable set by authority
         setVerified(true);
         console.log(response);
      } catch (error) {
         console.error('Error generating commitment:', error);
      }
   };

   function alertUser(){
      alert("Form details submitted successfully");
   }

   return (
      <div className="profile-container">
         <form onSubmit={handleSubmit} className="profile-form">
            <h2 className="profile-title">User Profile Verification</h2>

            <div className="form-group">
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

            <div className="form-group">
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

            <div className="form-group">
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

            <div className="form-group">
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

            <div className="form-group">
               <label htmlFor="idInput" className="form-label">Government Id Number</label>
               <input
                  className="form-control"
                  type="number"
                  id="idInput"
                  name="govt_id"
                  placeholder="Enter your govt_id number"
                  onChange={handleChange}
                  required
               />
            </div>

            <div className="form-group">
               <label htmlFor="fileInput" className="form-label">Government Issued Identity Proof</label>
               <input
                  className="form-control"
                  type="file"
                  id="fileInput"
                  onChange={handleFileChange}
                  required
               />
            </div>

            <div className="submit-button-container">
               <button type="submit" className="btn submit-button" onSubmit={alertUser}>
                  Generate Commitment
               </button>
            </div>
         </form>
      </div>
   );
};

export default Profile;
