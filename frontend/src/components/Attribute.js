import React, { useState } from 'react'

const  Attribute = () => {
    const [certData, setCertData] = useState({attribute:'', value:''})

    const handleSubmit = async(e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('attribute', certData.attribute);
        data.append('value', certData.value);


        
    }

    const handleChange = (e) => {

        setCertData({...certData,[e.target.name] : e.target.value})
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <form onSubmit={handleSubmit} style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
            <h3 style={{ textAlign: 'center' }}>Generate Commitment</h3>
            <div className="form-group">
              <label htmlFor="attribute">Select Attribute:</label>
              <select
                id="attribute"
                className="form-control"
                onChange={handleChange}
                required
                style={{ marginBottom: '15px' }}
              >
                <option value="">Select</option>
                <option value="name">Name</option>
                <option value="age">Age</option>
                <option value="gender">Gender</option>
                <option value="address">Address</option>
                {/* Add more options as needed */}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="value">Enter Value:</label>
              <input
                type="text"
                id="value"
                className="form-control"
                onChange={handleChange}
                placeholder="Enter value"
                required
                style={{ marginBottom: '15px' }}
              />
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
              Generate Commitment
            </button>
          </form>
        </div>
      );
};

export default  Attribute;

