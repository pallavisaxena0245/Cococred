# Zero-Knowledge Proof-Based Attribute Verification System

## Project Overview

This project enables users to prove specific attributes (e.g., age, gender, address) to third-party verifiers without revealing the actual values of those attributes. The verification process is facilitated by a zero-knowledge proof (ZKP) system, ensuring both privacy and security.

### How It Works

1. **User Submission**: A user fills in their details (age, gender, name, address, nationality) in a form.
2. **Commitment by Government**: The government commits to each attribute and generates a ZKP for verification.
3. **Proof Generation**: The government creates a non-interactive proof to share with the user.
4. **Verification by Third-Party**: The user can present the proof to a third party, who verifies it without knowing the original attribute values.

## Cryptographic Background

### Commitment Scheme Overview

A commitment scheme allows a party to commit to a value while keeping it hidden and unchangeable once set. This scheme should satisfy:

- **Hiding**: The commitment should not reveal the committed value.
- **Binding**: The committed value cannot be altered after the commitment is made.

#### Pedersen Commitment Formula:
\[
C = g^x \cdot h^r
\]
where:

- \( g \) and \( h \) are generators of a cryptographic group.
- \( x \) is the attribute value.
- \( r \) is a random nonce for security.
- \( C \) is the resulting commitment.

### Proof Generation (Government Side)

The government generates a proof to show that it knows the attribute \( x \) and nonce \( r \) such that \( C = g^x \cdot h^r \) holds true. This is done using a non-interactive ZKP.

#### Steps:
1. **Commit**: The government commits to \( x \) with a random nonce \( r \).
2. **Generate Proof**:
   - Create a challenge \( e \) using the hash of the commitment: \( e = H(C) \).
   - Compute responses:
     \[
     s_x = x + e \cdot x_1, \quad s_r = r + e \cdot r_1
     \]
   where \( x_1 \) and \( r_1 \) are auxiliary values used for proof generation.

### Verification Process (Third-Party Verifier)

The verifier checks the proof provided by the user to confirm the commitment's validity.

#### Steps:
1. **Receive the Commitment \( C \) and Proof \( (s_x, s_r) \)**.
2. **Reconstruct Challenge**:
   \[
   e = H(C)
   \]
3. **Verify Proof**:
   Compute:
   \[
   C' = g^{s_x} \cdot h^{s_r} \cdot C^{-e}
   \]
   If:
   \[
   C' \stackrel{?}{=} C
   \]
   holds true, the proof is valid, confirming that the user possesses the attribute \( x \) and corresponding nonce \( r \).

## Mathematical Proofs for Correctness

### Given:
\[
C = g^x \cdot h^r
\]
Proof \( (s_x, s_r) \) with:
\[
s_x = x + e \cdot x_1, \quad s_r = r + e \cdot r_1
\]

### Verification:
\[
C' = g^{s_x} \cdot h^{s_r} \cdot C^{-e}
\]

#### Expand \( C^{-e} \):
\[
C^{-e} = (g^x \cdot h^r)^{-e} = g^{-e \cdot x} \cdot h^{-e \cdot r}
\]

#### Substitute into \( C' \):
\[
C' = g^{x + e \cdot x_1} \cdot h^{r + e \cdot r_1} \cdot g^{-e \cdot x} \cdot h^{-e \cdot r}
\]

#### Simplify Exponents:
\[
C' = g^{e \cdot x_1} \cdot h^{e \cdot r_1}
\]

### Conclusion:
If \( C' \) matches the form \( g^{e \cdot x_1} \cdot h^{e \cdot r_1} \), the proof is valid.

## Key Points to Understand

- **Fiat-Shamir Heuristic**: Transforms an interactive proof into a non-interactive proof using a hash function.
- **Hiding Property**: Ensures the commitment does not reveal the actual value \( x \) or \( r \).
- **Binding Property**: Prevents altering the value after commitment.

## Benefits of This System

- **Privacy-Preserving**: Users can prove attributes without revealing actual values.
- **Non-Interactive**: Verifiers can check proofs independently.
- **Security**: Provides strong binding and hiding properties using cryptographic commitments and ZKPs.

## Example Code Implementation

For cryptographic code examples and the complete implementation, please refer to the `src/` folder in this repository.

## License

This project is licensed under the MIT License.
