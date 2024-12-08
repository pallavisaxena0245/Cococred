import React, { useContext, useState } from 'react';
import { VerifiedContext, HashContext, CommitmentContext } from '../contexts/CertificateService';
import axios from 'axios';
import { ethers } from 'ethers';
import './styles/Profile.css';

const Profile = () => {

   const { verified, setVerified } = useContext(VerifiedContext);
  const { hash, setHash } = useContext(HashContext);
  const { commitment, setCommitment } = useContext(CommitmentContext);


   const [formData, setFormData] = useState({ name: '', age: '', gender: '', address: '', govt_id: '' });
   const [file, setFile] = useState(null);
   const [certificate, setCertificate] = useState(null); // State to store certificate data
   const [showCertificate, setShowCertificate] = useState(false); // State to toggle certificate modal

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

         const { commitment, hash } = response.data;
         setCommitment(commitment);
         setHash(hash);
         setVerified(true);

         if (window.ethereum) {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            await provider.send('eth_requestAccounts', []); // Request access to Metamask

            const signer = provider.getSigner();
            const contractAddress = '0x2279b7a0a67db372996a5fab50d91eaa73d2ebe6'; // Replace with deployed contract address
            const abi = [
              
             ]; // Replace with your contract's ABI

            const contract = new ethers.Contract(contractAddress, abi, signer);
            const tx = await contract.registerCertificate(commitment, hash, await signer.getAddress());
            await tx.wait();

            alert('Certificate successfully registered on the blockchain!');
         } else {
            alert('Please connect to Metamask to continue.');
         }

         setCertificate({
            name: formData.name,
            age: formData.age,
            gender: formData.gender,
            address: formData.address,
            commitment,
            hash,
            date: new Date().toLocaleDateString(),
         });
         setShowCertificate(true);
      } catch (error) {
         console.error('Error:', error);
         alert('An error occurred. Please try again.');
      }
   };

   const closeCertificate = () => {
      setShowCertificate(false);
   };

   return (
      <div className="profile">
         <form onSubmit={handleSubmit} className="profile__form">
            <h2 className="profile__title">User Profile Verification</h2>

            <div className="profile__form-group">
               <label htmlFor="nameInput" className="profile__label">Name</label>
               <input
                  className="profile__input"
                  type="text"
                  id="nameInput"
                  name="name"
                  placeholder="Enter your name"
                  onChange={handleChange}
                  required
               />
            </div>

            <div className="profile__form-group">
               <label htmlFor="ageInput" className="profile__label">Age</label>
               <input
                  className="profile__input"
                  type="number"
                  id="ageInput"
                  name="age"
                  placeholder="Enter your age"
                  onChange={handleChange}
                  required
               />
            </div>

            <div className="profile__form-group">
               <label htmlFor="genderSelect" className="profile__label">Gender</label>
               <select
                  className="profile__select"
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

            <div className="profile__form-group">
               <label htmlFor="addressTextarea" className="profile__label">Address</label>
               <textarea
                  className="profile__textarea"
                  id="addressTextarea"
                  name="address"
                  placeholder="Enter your address"
                  onChange={handleChange}
                  rows="3"
                  required
               ></textarea>
            </div>

            <div className="profile__form-group">
               <label htmlFor="idInput" className="profile__label">Government ID Number</label>
               <input
                  className="profile__input"
                  type="number"
                  id="idInput"
                  name="govt_id"
                  placeholder="Enter your Govt ID number"
                  onChange={handleChange}
                  required
               />
            </div>

            <div className="profile__form-group">
               <label htmlFor="fileInput" className="profile__label">Government Issued ID Proof</label>
               <input
                  className="profile__input"
                  type="file"
                  id="fileInput"
                  onChange={handleFileChange}
                  required
               />
            </div>

            <button type="submit" className="btn btn--primary">
               Generate Commitment
            </button>
         </form>

         {showCertificate && certificate && (
            <div className="modal">
               <div className="modal__content">
                  <h1 className="modal__title">Certificate of Verification</h1>
                  <p className="modal__subtitle">This certifies the following information:</p>

                  <div className="modal__details">
                     <p><strong>Name:</strong> {certificate.name}</p>
                     <p><strong>Age:</strong> {certificate.age}</p>
                     <p><strong>Gender:</strong> {certificate.gender}</p>
                     <p><strong>Address:</strong> {certificate.address}</p>
                     <p><strong>Commitment:</strong> {certificate.commitment}</p>
                     <p><strong>Hash:</strong> {certificate.hash}</p>
                     <p><strong>Date:</strong> {certificate.date}</p>
                  </div>

                  <button className="btn btn--secondary" onClick={closeCertificate}>
                     Close
                  </button>
               </div>
            </div>
         )}
      </div>
   );
};

export default Profile;
