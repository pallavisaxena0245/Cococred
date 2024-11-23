const express = require('express');
const { Client } = require('pg');
const { v4: uuidv4 } = require('uuid');
const app = express();
const jwtDecode = require('jwt-decode');

// PostgreSQL client setup
const client = new Client({
    user: process.env.DATABASE_USER,
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE,
    password: process.env.DATABASE_PASSWORD,
    port: 5432,
});

// Connect to PostgreSQL
async function connectDb() {
    try {
        await client.connect();
        console.log('Connected to PostgreSQL database');
        // Create tables if they don't exist
        await createTables();
    } catch (err) {
        console.error('Failed to connect to database:', err);
        process.exit(1);
    }
}

app.use(express.json());
connectDb();

// Create Users and Mapemail tables if they don't exist
const createTables = async () => {
    const createUsers = `
    CREATE TABLE IF NOT EXISTS Users (
        user_id SERIAL PRIMARY KEY, 
        certificate_generated BOOLEAN NOT NULL DEFAULT FALSE,
        certificate_hash VARCHAR(200),
        verified BOOLEAN DEFAULT FALSE
    )`;

    const createMapemail = `
    CREATE TABLE IF NOT EXISTS Mapemail (
        user_email VARCHAR(255) PRIMARY KEY,
        user_id INTEGER REFERENCES Users(user_id)
    )`;

    try {
        await client.query(createUsers);
        await client.query(createMapemail);
    } catch (err) {
        console.error('Error creating tables:', err);
    }
};

// Create user endpoint
app.post('/api/create-user', async (req, res) => {
    const { email } = req.body;  // Assuming email is sent in the request body
    if (!email) {
        return res.status(400).json({ message: 'Email is required' });
    }

    console.log('Received email:', email);

    try {
        // Check if the email already exists in the Mapemail table
        const emailCheckQuery = 'SELECT * FROM Mapemail WHERE user_email = $1';
        const emailCheckResult = await client.query(emailCheckQuery, [email]);

        if (emailCheckResult.rows.length > 0) {
            // If email already exists, return existing user_id
            return res.status(200).json({ message: 'User already exists', user_id: emailCheckResult.rows[0].user_id });
        }

        // Generate a unique user ID
        const userId = uuidv4();
        console.log('Generated user ID:', userId);

        // Insert a new user into the Users table (default values)
        const insertUserQuery = `
        INSERT INTO Users (user_id, certificate_generated, certificate_hash, verified) 
        VALUES ($1, $2, $3, $4) RETURNING user_id
        `;
        const userResult = await client.query(insertUserQuery, [userId, false, null, false]);
        const newUserId = userResult.rows[0].user_id;

        // Map the email to the generated user ID in the Mapemail table
        const insertEmailMapping = `
        INSERT INTO Mapemail (user_email, user_id) 
        VALUES ($1, $2)
        `;
        await client.query(insertEmailMapping, [email, newUserId]);

        // Return the user_id to the frontend
        res.status(201).json({ message: 'User created successfully', user_id: newUserId });
    } catch (err) {
        console.error('Error creating user:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Start the server
app.listen(5000, () => {
    console.log('Server running on port 5000');
});
