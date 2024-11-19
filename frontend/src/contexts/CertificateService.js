import React, { createContext, useState } from 'react';

export const VerifiedContext = createContext();
export const HashContext = createContext();
export const CommitmentContext = createContext();


const CertificateService = ({ children }) => {
  const [verified, setVerified] = useState(false);
  const [hash, setHash] = useState('');
  const [commitment, setCommitment] = useState('');


  return (
    
      <VerifiedContext.Provider value={{ verified, setVerified }}>
        <CommitmentContext.Provider value={{ commitment, setCommitment }}>
          <HashContext.Provider value={{ hash, setHash }}>
            {children}
          </HashContext.Provider>
        </CommitmentContext.Provider>
      </VerifiedContext.Provider>
  );
};

export default CertificateService;
