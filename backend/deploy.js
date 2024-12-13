const hre = require("hardhat");

async function main() {
    // Deploy the CertificateRegister contract
    const CertificateRegister = await hre.ethers.getContractFactory("CertificateRegister");
    const govOfficials = ["0x70997970C51812dc3A010C7d01b50e0d17dc79C8"]; // Replace this with the actual list of government officials' addresses
    const certificateRegister = await CertificateRegister.deploy(govOfficials);
    
    console.log("CertificateRegister deployed to:", certificateRegister.target);

}

// Error handling
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
