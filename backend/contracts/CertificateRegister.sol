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
    ) public onlyOfficial {
        require(bytes(_commitment).length > 0, "Commitment cannot be empty");
        require(bytes(_hash).length > 0, "Hash cannot be empty");
        require(certificates[_requester].requester == address(0), "Certificate already exists for this requester");

        // Assign verifier using round-robin logic
        uint verifierIndex = uint(keccak256(abi.encodePacked(_requester, block.timestamp))) % govtOfficials.length;
        address verifier = govtOfficials[verifierIndex];

        certificates[_requester] = Certificate({
            commitment: _commitment,
            hash: _hash,
            verified: false,
            requester: _requester,
            verifier: verifier
        });
    }

    // Function to validate a certificate
    function validateCertificate(address _user) public onlyOfficial {
        Certificate storage cert = certificates[_user];
        require(cert.requester != address(0), "Certificate does not exist");
        require(cert.verifier == msg.sender, "Only the assigned verifier can validate this certificate");
        cert.verified = true;
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
