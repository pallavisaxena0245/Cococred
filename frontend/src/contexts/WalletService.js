import React, { useEffect, createContext, useState } from "react";

// Create the WalletContext
export const WalletContext = createContext();

function WalletService({ children }) {
    // State to hold the MetaMask address
    const [address, setAddress] = useState('');

    useEffect(() => {
        // Check if Ethereum is available (MetaMask)
        if (window.ethereum) {
            const handleAccountsChanged = (accounts) => {
                if (accounts.length > 0) {
                    setAddress(accounts[0]); // Set the first account as the address
                } else {
                    setAddress(null); // If no accounts are found, set address to null
                }
            };

            // Add event listener for account changes
            window.ethereum.on('accountsChanged', handleAccountsChanged);

            // Cleanup event listener on component unmount
            return () => {
                window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
            };
        }
    }, []);

    // Provide address and setAddress to the component tree
    return (
        <WalletContext.Provider value={{ address, setAddress }}>
            {children}
        </WalletContext.Provider>
    );
};

export default WalletService;
