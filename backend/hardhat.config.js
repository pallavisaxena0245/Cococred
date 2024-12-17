
require("@nomiclabs/hardhat-ethers");
require("dotenv").config();

module.exports = {
   solidity: "0.8.0",
   networks: {
      gochain_testnet: {
         url: "http://127.0.0.1:8545", // GoChain Testnet RPC
         accounts: [process.env.PRIVATE_KEY], // Your private key
         chainId: 31337, // GoChain Testnet chain ID
      },
   },
};
