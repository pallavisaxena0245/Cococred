// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CertificateRegister {
    struct Certificate {
        string commitment;
        string hash;
        // address issuer;
        address requester;
    }

    mapping(address => Certificate) public certificates;

    function storeCertificate(address user, string memory commitment, string memory hash) public {
        certificates[user] = Certificate(commitment, hash, msg.sender);
    }

    function getCertificate(address user) public view returns (string memory, string memory, address) {
        Certificate memory cert = certificates[user];
        return (cert.commitment, cert.hash, cert.requester);
    }
}
