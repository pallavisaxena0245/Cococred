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

    data = {
    "name" : request.form.get('name'),
    "age" : request.form.get('age'),
    "gender" : request.form.get('gender'),
    "address" : request.form.get('address'),
    "govt_id" : request.form.get('national_id')
    }
    document = request.files['document']
    

    # Convert the JSON object to a canonical JSON string

    data_string = json.dumps(data, sort_keys=True)

    # Generate the SHA-256 hash of the serialized JSON string
    data_hash = hashlib.sha256(data_string.encode()).hexdigest()



    # Generate commitments for each attribute
    value_num = attribute_to_number(data.govt_id)
    r = random.randint(1, p - 1)
    C = (pow(g, value_num, p) * pow(g, r, p)) % p  # C = g^value * g^r (mod p)
    commitment = C


    return jsonify({
        'commitment': commitment,
        'hash':data_hash,
        'message': 'Certificate generated successfully.'
    })



@app.route('/attribute_cert', methods=['POST'])
def attribute_cert():

    # Extract user data
    attribute_name = request.form.get('attribute')
    attribute_value = request.form.get('value')


    value_num = attribute_to_number(attribute_value)
    r = random.randint(1, p - 1)
    C = (pow(g, value_num, p) * pow(g, r, p)) % p  # C = g^value * g^r (mod p)
    commitment = C


    return jsonify({
        'commitment': commitment,
        'Attribute' : attribute_name,
        'message': 'Commitment on {attribute_name} generated successfully.'
    })

if __name__ == '__main__':
    app.run(debug=True)
