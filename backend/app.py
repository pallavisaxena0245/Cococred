from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
import random
import hashlib

app = Flask(__name__)
CORS(app, origins=["http://localhost:3000"])


# Large prime number for the group
p = 23_457_853_597  # Example prime number (should be much larger in production)
g = 2  # Example generator of the group

# Hash function for attribute conversion
def attribute_to_number(attribute):
    """Converts a string attribute to a number using a hash function."""
    hash_object = hashlib.sha256(attribute.encode())
    return int(hash_object.hexdigest(), 16) % p

@app.route('/generate_zkp', methods=['POST'])
@cross_origin(origins="http://localhost:3000")
def generate_zkp():
    """
    Generate a commitment for a given attribute.
    Expects JSON input with 'attribute' (e.g., 'age') and its 'value'.
    """
    data = request.json
    attribute = data.get('attribute')
    value = data.get('value')

    # Convert value to number
    value_num = attribute_to_number(value)

    # Generate a random 'r' for the commitment
    r = random.randint(1, p-1)
    C = (pow(g, r, p) * pow(g, value_num, p)) % p  # C = g^r * g^value (mod p)

    return jsonify({
        'commitment': C,
        'message': f'Commitment for attribute {attribute} generated.'
    })



if __name__ == '__main__':
     app.run(debug=True)
