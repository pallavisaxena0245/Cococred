import React, { useContext, useEffect } from 'react';
import './styles/NavBar.css'; // Import CSS file
import logo from './logo.png'; // Your logo
import { AuthContext } from '../contexts/AuthService';
import { WalletContext } from '../contexts/WalletService';
import { ethers } from 'ethers';
import { useLocation } from 'react-router-dom';

const Navbar = (props) => {
    const location = useLocation();
    const { authenticated } = useContext(AuthContext);
    const { address, setAddress } = useContext(WalletContext);

    const connectMetamask = async () => {
        if (window.ethereum) {
            try {
                await window.ethereum.request({ method: 'eth_requestAccounts' });
                const ethersProvider = new ethers.providers.Web3Provider(window.ethereum);
                const accounts = await ethersProvider.listAccounts();
                if (accounts.length > 0) {
                    setAddress(accounts[0]);
                }
            } catch (error) {
                console.error('Error connecting to MetaMask:', error);
            }
        } else {
            alert('Please install MetaMask!');
        }
    };

    useEffect(() => {
        if (window.ethereum) {
            const handleAccountsChanged = (accounts) => {
                setAddress(accounts.length > 0 ? accounts[0] : null);
            };
            window.ethereum.on('accountsChanged', handleAccountsChanged);
            return () => window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        }
    }, [setAddress]);

    return (
        <nav className="navbar">
            <a className="navbar-brand" href="#">
                <img src={logo} alt="Logo" className="navbar-logo" />
                {props.title}
            </a>
            <div className="ml-auto">
                {authenticated && location.pathname !== '/user_login' && (
                    <button className="connect-wallet-btn" onClick={connectMetamask}>
                        {address ? address : 'Connect Wallet'}
                    </button>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
