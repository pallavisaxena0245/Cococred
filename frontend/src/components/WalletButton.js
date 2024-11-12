import React, { useEffect, useState } from 'react';
const ethers = require("ethers")

function WalletButton() {
    const [account, setAccount] = useState('');
    const [provider, setProvider] = useState(null);

    const connectMetamask = async () => {
        if (window.ethereum) {
            try {
                // Requesting user to connect their MetaMask account
                await window.ethereum.request({ method: 'eth_requestAccounts' });

                // Create an instance of Web3Provider to interact with MetaMask
                const ethersProvider = new ethers.providers.Web3Provider(window.ethereum);

                // Get the connected account(s)
                const accounts = await ethersProvider.listAccounts();
                setAccount(accounts[0]);

                setProvider(ethersProvider);
            } catch (error) {
                console.error('Error connecting to MetaMask:', error);
            }
        } else {
            alert('Please install MetaMask!');
        }
    };

    useEffect(() => {
        // Listen for account change in MetaMask
        if (window.ethereum) {
            window.ethereum.on('accountsChanged', (accounts) => {
                setAccount(accounts.length > 0 ? accounts[0] : null);
            });
        }

        
    }, []);

    return (
        <div>
            <button onClick={connectMetamask}>
                {account ? 'Connected' : 'Connect Wallet'}
            </button>
            {account && <p>Connected account: {account}</p>}
        </div>
    );
}

export default WalletButton;
