const {ethers} = require("hardhat")
const fs = require("fs")

async function main() {
    const CertificateRegistry = await ethers.getContractFactory("CertificateRegistry");
    const registry = await CertificateRegistry.deploy();
    registry.deployed();


    const contractInfo = {
    contractAddress : registry.address,
    abi : JSON.parse(registry.interface.format("json"))
    };

    fs.writeFileSync("./abis/CertificateRegistry.json");
    console.log(`Contract deployed to: ${registry.address}`);



}


main().catch((error) => {
    console.error(error);
    process.exit(1);
  });