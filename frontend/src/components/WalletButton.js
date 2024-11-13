import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthService';

function WalletButton() {
    const [account, setAccount] = useState('');
    const { authenticated } = useContext(AuthContext);
    const {ethers} = require('ethers');

    const connectMetamask = async () => {
        if (window.ethereum) {
            try {
                await window.ethereum.request({ method: 'eth_requestAccounts' });
                const ethersProvider = new ethers.providers.Web3Provider(window.ethereum);
                const accounts = await ethersProvider.listAccounts();
                setAccount(accounts[0]);
            } catch (error) {
                console.error('Error connecting to MetaMask:', error);
            }
        } else {
            alert('Please install MetaMask!');
        }
    };

    useEffect(() => {
        if (window.ethereum) {
            window.ethereum.on('accountsChanged', (accounts) => {
                setAccount(accounts.length > 0 ? accounts[0] : null);
            });
        }
    }, []);

    return (
        <div>
            {authenticated && (
                <button onClick={connectMetamask}>
                    {account ? 'Connected' : 'Connect Wallet'}
                </button>
            )}
            {account && <p>Connected account: {account}</p>}
        </div>
    );
}

export default WalletButton;
