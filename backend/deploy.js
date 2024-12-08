const hre = require("hardhat");

async function main() {
    // Deploy the CertificateRegister contract
    const CertificateRegister = await hre.ethers.getContractFactory("CertificateRegister");
    const govOfficials = ["0x70997970C51812dc3A010C7d01b50e0d17dc79C8"]; // Replace this with the actual list of government officials' addresses
    const certificateRegister = await CertificateRegister.deploy(govOfficials);
    
    console.log("CertificateRegister deployed to:", certificateRegister.target);

    // Now you can interact with the deployed contract
    // For example, calling getCertificate to retrieve details about a particular certificate:
    // const certificate = await certificateRegister.getCertificate(someAddress);
    // console.log("Certificate details:", certificate);
}

// Error handling
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
