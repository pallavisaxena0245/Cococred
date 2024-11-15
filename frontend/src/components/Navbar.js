import React, { useContext, useEffect } from 'react';
import logo from './logo.png'; // Your logo
import { AuthContext } from '../contexts/AuthService'; // Context to check if the user is authenticated
import { WalletContext } from '../contexts/WalletService'; // Context for the wallet address
import { ethers } from 'ethers';

const Navbar = (props) => {
    const { authenticated } = useContext(AuthContext); // Get authentication status
    const { address, setAddress } = useContext(WalletContext); // Get address and setter function from WalletContext

    const connectMetamask = async () => {
        if (window.ethereum) {
            try {
                // Requesting user to connect their MetaMask account
                await window.ethereum.request({ method: 'eth_requestAccounts' });

                // Create an instance of Web3Provider to interact with MetaMask
                const ethersProvider = new ethers.providers.Web3Provider(window.ethereum);

                // Get the connected account(s)
                const accounts = await ethersProvider.listAccounts();
                if (accounts.length > 0) {
                    setAddress(accounts[0]); // Set the first account as the address
                }

            } catch (error) {
                console.error('Error connecting to MetaMask:', error);
            }
        } else {
            alert('Please install MetaMask!');
        }
    };

    useEffect(() => {
        // Listen for account changes in MetaMask
        if (window.ethereum) {
            const handleAccountsChanged = (accounts) => {
                if (accounts.length > 0) {
                    setAddress(accounts[0]);
                } else {
                    setAddress(null);
                }
            };

            // Add event listener
            window.ethereum.on('accountsChanged', handleAccountsChanged);

            // Cleanup function to remove the listener when the component unmounts
            return () => {
                window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
            };
        }
    }, [setAddress]); // Dependency on setAddress

    return (
        <>
            <nav className="navbar" style={{ backgroundColor: '#004d00' }}>
                <a className="navbar-brand d-flex align-items-center" href="#" style={{ color: 'white' }}>
                    <img 
                        src={logo}
                        alt="Logo"
                        style={{ height: '60px', marginRight: '30px' }} 
                    />
                    {props.title}
                </a>
                
                {/* Show "Connect Wallet" button if authenticated */}
                {authenticated && (
                    <button onClick={connectMetamask} style={{ marginLeft: 'auto', color: 'white', backgroundColor: '#004d00', border: 'none', padding: '10px 20px' }}>
                        {address ? address : 'Connect Wallet'}
                    </button>
                )}
            </nav>
        </>
    );
};

export default Navbar;
