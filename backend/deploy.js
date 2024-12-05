const hre = require("hardhat");

async function main() {

    const [deployer] = await hre.ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);
    console.log("Account balance: ", deployer.getBalance().toString());

    const certContract = await hre.ethers.getContractFactory("CertificateRegistry");
    const contract = await certContract.deploy("dummy_commitment", "dummy_hash", deployer.address);

    await contract.deployed();

    console.log("SimpleContract deployed to:", contract.address);
}


main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
