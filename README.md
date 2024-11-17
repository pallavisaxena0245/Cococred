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

The commitment formula for the attribute `x` and random nonce `r` is defined as:

\[
C = g^x * h^r
\]

Where:
- `g` and `h` are generators of a cryptographic group.
- `x` is the attribute value.
- `r` is a random nonce for security.
- `C` is the resulting commitment.

### Proof Generation (Government Side)

The government generates a proof to show that it knows the attribute `x` and nonce `r` such that `C = g^x * h^r` holds true. This is done using a non-interactive zero-knowledge proof.

#### Steps:
1. **Commit**: The government commits to `x` with a random nonce `r`.
2. **Generate Proof**:
   - Create a challenge `e` using the hash of the commitment: 
   
   \[
   e = H(C)
   \]

   - Compute responses:
   
   \[
   s_x = x + e * x_1
   \]
   where `x_1` is an auxiliary value used for proof generation.

   \[
   s_r = r + e * r_1
   \]
   where `r_1` is an auxiliary value used for proof generation.

### Verification Process (Third-Party Verifier)

The verifier checks the proof provided by the user to confirm the commitment's validity.

#### Steps:
1. **Receive the Commitment `C` and Proof `(s_x, s_r)`**.
2. **Reconstruct Challenge**:

   \[
   e = H(C)
   \]

3. **Verify Proof**:
   The verifier computes:

   \[
   C' = g^{s_x} * h^{s_r} * C^{-e}
   \]

   If:

   \[
   C' = C
   \]

   holds true, the proof is valid, confirming that the user possesses the attribute `x` and corresponding nonce `r`.

## Mathematical Proofs for Correctness

### Given:

\[
C = g^x * h^r
\]

The proof `(s_x, s_r)` with:

\[
s_x = x + e * x_1, \quad s_r = r + e * r_1
\]

### Verification:

\[
C' = g^{s_x} * h^{s_r} * C^{-e}
\]

#### Expand \( C^{-e} \):

\[
C^{-e} = (g^x * h^r)^{-e} = g^{-e * x} * h^{-e * r}
\]

#### Substitute into \( C' \):

\[
C' = g^{x + e * x_1} * h^{r + e * r_1} * g^{-e * x} * h^{-e * r}
\]

#### Simplify Exponents:

\[
C' = g^{e * x_1} * h^{e * r_1}
\]

### Conclusion:

If:

\[
C' = g^{e * x_1} * h^{e * r_1}
\]

then the proof is valid, confirming that the user possesses the value `x` and nonce `r` corresponding to the commitment `C`.

## Key Points to Understand

- **Fiat-Shamir Heuristic**: Transforms an interactive proof into a non-interactive proof using a hash function.
- **Hiding Property**: Ensures the commitment does not reveal the actual value `x` or `r`.
- **Binding Property**: Prevents altering the value after commitment.

## Benefits of This System

- **Privacy-Preserving**: Users can prove attributes without revealing actual values.
- **Non-Interactive**: Verifiers can check proofs independently.
- **Security**: Provides strong binding and hiding properties using cryptographic commitments and ZKPs.

## Example Code Implementation

For cryptographic code examples and the complete implementation, please refer to the `src/` folder in this repository.

## License

This project is licensed under the MIT License.
