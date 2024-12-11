// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CertificateRegister {
    struct Certificate {
        string commitment;
        string hash;
        bool verified;
        address requester;
        address verifier;
    }

    mapping(address => Certificate) public certificates;
    Certificate[] public all_certs;
    address[] public govtOfficials;

    // Modifier to restrict access to government officials
    modifier onlyOfficial() {
        require(govtOfficials.length > 0, "No government officials are set");
        bool isOfficial = false;
        for (uint i = 0; i < govtOfficials.length; i++) {
            if (govtOfficials[i] == msg.sender) {
                isOfficial = true;
                break;
            }
        }
        require(isOfficial, "Only a government official can call this method");
        _;
    }

    // Constructor to set initial government officials
    constructor(address[] memory _govtOfficials) {
        require(_govtOfficials.length > 0, "At least one government official must be specified");
        govtOfficials = _govtOfficials;
    }

    // Function to register a new certificate
    function registerCertificate(
        string memory _commitment,
        string memory _hash,
        address _requester
    ) public {
        require(bytes(_commitment).length > 0, "Commitment cannot be empty");
        require(bytes(_hash).length > 0, "Hash cannot be empty");
        require(certificates[_requester].requester == address(0), "Certificate already exists for this requester");

        // Assign verifier using round-robin logic
        uint verifierIndex = uint(keccak256(abi.encodePacked(_requester, block.timestamp))) % govtOfficials.length;
        address verifier = govtOfficials[verifierIndex];

        Certificate memory newCert = Certificate({
            commitment: _commitment,
            hash: _hash,
            verified: false,
            requester: _requester,
            verifier: verifier
        });

        certificates[_requester] = newCert;
        all_certs.push(newCert);
    }

    // Function to validate a certificate
    function validateCertificate(address _user) public onlyOfficial {
        Certificate storage cert = certificates[_user];
        require(cert.requester != address(0), "Certificate does not exist");
        require(cert.verifier == msg.sender, "Only the assigned verifier can validate this certificate");
        cert.verified = true;

        // Update the corresponding certificate in all_certs
        for (uint i = 0; i < all_certs.length; i++) {
            if (all_certs[i].requester == _user) {
                all_certs[i].verified = true;
                break;
            }
        }
    }

    // Function to get all unverified certificates
    function getUnverifiedCertificates() public view returns (Certificate[] memory) {
        uint count = 0;

        // Count unverified certificates
        for (uint i = 0; i < all_certs.length; i++) {
            if (!all_certs[i].verified) {
                count++;
            }
        }

        // Create a memory array to store unverified certificates
        Certificate[] memory unverified = new Certificate[](count);
        uint index = 0;

        for (uint i = 0; i < all_certs.length; i++) {
            if (!all_certs[i].verified) {
                unverified[index] = all_certs[i];
                index++;
            }
        }

        return unverified;
    }

    // Function to get all verified certificates
    function getVerifiedCertificates() public view returns (Certificate[] memory) {
        uint count = 0;

        // Count verified certificates
        for (uint i = 0; i < all_certs.length; i++) {
            if (all_certs[i].verified) {
                count++;
            }
        }

        // Create a memory array to store verified certificates
        Certificate[] memory verified = new Certificate[](count);
        uint index = 0;

        for (uint i = 0; i < all_certs.length; i++) {
            if (all_certs[i].verified) {
                verified[index] = all_certs[i];
                index++;
            }
        }

        return verified;
    }

    // Function to retrieve a certificate's details
    function getCertificate(address _user)
        public
        view
        returns (
            string memory commitment,
            string memory hash,
            bool verified,
            address requester,
            address verifier
        )
    {
        Certificate memory cert = certificates[_user];
        require(cert.requester != address(0), "Certificate does not exist");
        return (cert.commitment, cert.hash, cert.verified, cert.requester, cert.verifier);
    }
}
