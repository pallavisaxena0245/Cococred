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

    uint public cert_count;

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

        cert_count = 0;
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

        cert_count++;

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

    // Function to get all unverified certificates
    function getCertificates() public view returns (Certificate[] memory) {
        Certificate[] memory all_cert = new Certificate[](cert_count);
        uint256 index = 0;

        // Iterate over the mapping to collect unverified certificates
        for (uint256 i = 0; i < cert_count; i++) {
            if (!certificates[address(i)].verified) {
                all_cert[index] = certificates[address(i)];
                index++;
            }
        }

        // Resize the array to the actual number of unverified certificates found
        assembly {
            mstore(all_cert, index)
        }

        return all_cert;
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
