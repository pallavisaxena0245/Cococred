from flask import Flask, request, jsonify
from flask_cors import CORS
import random
import hashlib

app = Flask(__name__)
CORS(app)

# Prime number for the group (use a secure one in production)
p = 23_457_853_597  # Example value
g = 2  # Generator

def attribute_to_number(attribute):
    hash_object = hashlib.sha256(attribute.encode())
    return int(hash_object.hexdigest(), 16) % p

@app.route('/verify_profile', methods=['POST'])
def verify_profile():
    if 'document' not in request.files:
        return jsonify({'error': 'No document uploaded'}), 400

    # Extract user data
    name = request.form.get('name')
    age = request.form.get('age')
    gender = request.form.get('gender')
    address = request.form.get('address')
    document = request.files['document']

    

    # Generate commitments for each attribute
    attributes = {'name': name, 'age': age, 'gender': gender, 'address': address}
    commitments = {}
    # field=['name', 'age', 'gender', 'address']
    for key, value in attributes.items():
        value_num = attribute_to_number(value)
        r = random.randint(1, p - 1)
        C = (pow(g, value_num, p) * pow(g, r, p)) % p  # C = g^value * g^r (mod p)
        commitments[key] = C


    return jsonify({
        'commitments': commitments,
        'message': 'Commitments generated successfully.'
    })

if __name__ == '__main__':
    app.run(debug=True)
