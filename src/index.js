const express = require('express');
const bcrypt = require('bcryptjs'); // Import the bcryptjs library for password hashing
const { PrismaClient } = require('@prisma/client'); // Import the Prisma client
const path = require('path');
const router = express.Router();

const app = express();
const prisma = new PrismaClient(); // Create a new Prisma client

app.use(express.json());

app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory


app.get("/login", (req, res) => {
    res.status(200).render('login.pug'); // Render the login.pug template
})

app.get("/register", (req, res) => {
    res.status(200).render('register.pug'); // Render the register.pug template
})

// Handle a POST request to /register
app.post('/register', async(req, res) => {
    const { name, email, password } = req.body; // Extract the name, email, and password from the request body

    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password using bcryptjs

    // Create a new user using the Prisma client and the hashed password
    const newUser = await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
        },
    });

    res.json(newUser); // Send the new user as a JSON response
    console.log(newUser);
});

// Handle a POST request to /login
app.post('/login', async(req, res) => {
    const { email, password } = req.body; // Extract the email and password from the request body

    const user = await prisma.user.findUnique({ // Find the user in the Prisma database using their email address
        where: {
            email,
        },
    });

    if (!user) { // If the user is not found, return an error response
        return res.status(401).json({ error: 'User not found' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password); // Compare the password from the request with the hashed password stored in the database

    if (!passwordMatch) { // If the passwords do not match, return an error response
        return res.status(401).json({ error: 'Incorrect password' });
    }

    res.json({ message: 'Login successful' }); // If the passwords match, send a success message as a JSON response
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});