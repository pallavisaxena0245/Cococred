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
      const response = await axios.post('http://localhost:5000/generate_commitment', data);
      alert('Commitment generated successfully!');
      setCertificates(response.data.commitments);
     
     

      // Iterate over the commitments object
     

    } catch (error) {
      console.error('Error generating commitment:', error);
    }
  };

  return (
    <div>
      <h1>Welcome to Cococred</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
        <input type="number" name="age" placeholder="Age" onChange={handleChange} required />
        <input type="text" name="gender" placeholder="Gender" onChange={handleChange} required />
        <input type="text" name="address" placeholder="Address" onChange={handleChange} required />
        <input type="file" onChange={handleFileChange} required />
        <button type="submit">Generate Commitment</button>
      </form>

      <div>
      {Object.entries(certificates).map(([attribute, commitment]) => (
        <Certificate field={attribute} commitment={commitment} />
      ))}
    </div>
      
    </div>
  );
};

export default Landing;
