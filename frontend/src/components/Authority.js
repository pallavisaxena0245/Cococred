import React, { useState } from "react";
import { ethers } from "ethers";
import CertificateContractABI from "../abis/CertificateRegister.json";

const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;
const Authority = () => {
  const [certificates, setCertificates] = useState([]);
  const [isVerified, setIsVerified] = useState(false);

  const fetchCertificates = async (verified) => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, CertificateContractABI.abi, signer);

      const certs = verified
        ? await contract.getUnverifiedCertificates()
        : await contract.getVerifiedCertificates();

      setCertificates(certs);
      setIsVerified(verified);
    } catch (error) {
      console.error("Error fetching certificates:", error);
    }
  };

  

  return (
    <div>
      <h1>Authority Page</h1>
      <div>
        <button onClick={() => fetchCertificates(false)}>Show Unverified Certificates</button>
        <button onClick={() => fetchCertificates(true)}>Show Verified Certificates</button>
      </div>
      <div>
        {certificates.length > 0 ? (
          <table border="1" style={{ marginTop: "20px", width: "100%" }}>
            <thead>
              <tr>
                <th>Commitment</th>
                <th>Hash</th>
                <th>Requester</th>
                <th>Verifier</th>
                <th>Verified</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {certificates.map((cert, index) => (
                <tr key={index}>
                  <td>{cert.commitment}</td>
                  <td>{cert.hash}</td>
                  <td>{cert.requester}</td>
                  <td>{cert.verifier}</td>
                  <td>{cert.verified ? "Yes" : "No"}</td>
                  <td>
                    {!cert.verified && (
                      <>
                        <button
                          onClick={() => alert('Approved')}
                        >
                          Approve
                        </button>
                        <button
                          onClick={() =>alert('Rejected')}
                        >
                          Reject
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No certificates to display.</p>
        )}
      </div>
    </div>
  );
};

export default Authority;
