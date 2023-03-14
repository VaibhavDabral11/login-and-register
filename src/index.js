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
<<<<<<< HEAD
    const { name, email, password } = req.body; // Extract the name, email, and password from the request body

    const hashedPassword = await bcrypt.hash(password, 10); // Hash(password , round (4 from 12(build in value 10 )) )  the password using bcryptjs

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
=======
        const { name, email, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const new_endUser_register_data = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            },
        });
        if (name == "" || email == "" || password == "") {
            res.json({
                status: "FAILED",
                massage: "Empty input fields!"
            });
        } else if (!/^[a-zA-Z ]+$/.test(name)) {
            res.json({
                status: "FAILED",
                massage: "Invalid name entered"
            });
        } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
            res.json({
                status: "FAILED",
                message: "Invalid email entered"
            });
        } else if (password.length < 8) {
            res.json({
                status: "FAILED",
                message: "Password is too short!"
            });

        } else {
            res.json({
                status: "SUCCESS",
                message: "Register successful",
                data: new_endUser_register_data,
            });
        }
        // res.json(newUser);
        //console.log(newUser);
    }

);
>>>>>>> 78996b6 (reset password and add payload in login , register and reset password)

// Handle a POST request to /login
app.post('/login', async(req, res) => {
    const { email, password } = req.body; // Extract the email and password from the request body

<<<<<<< HEAD
    const user = await prisma.user.findUnique({ // Find the user in the Prisma database using their email address
=======
    const End_User_login_data = await prisma.user.findUnique({
>>>>>>> 78996b6 (reset password and add payload in login , register and reset password)
        where: {
            email,
        },
    });

    if (!user) { // If the user is not found, return an error response
        return res.status(401).json({ error: 'User not found' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password); // Compare the password from the request with the hashed password stored in the database

<<<<<<< HEAD
    if (!passwordMatch) { // If the passwords do not match, return an error response
        return res.status(401).json({ error: 'Incorrect password' });
    }

    res.json({ message: 'Login successful' }); // If the passwords match, send a success message as a JSON response
});

// Start the server
=======
    if (!passwordMatch) {

        res.json({
            status: "FAILED",
            message: "Invalid password"
        })
    } else {

        res.json({
            status: "SUCCESS",
            message: 'Login successful',
            data: End_User_login_data,
        });
    }
});

app.post('/reset-password', async(req, res) => {
    // Get the email and new password from the request body
    const { email, newPassword } = req.body;

    // Hash the new password using bcrypt
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password in the database using Prisma
    const reset_Password_user_data = await prisma.user.update({
        where: { email },
        data: { password: hashedPassword },
    });

    // Send a response indicating success
    res.json({
        status: "SUCCESS",
        message: "Password reset successful!",
        data: reset_Password_user_data,
    });
});

app.get("/readusers", async(req, res) => {
    const read_Enduser_data = await prisma.user.findMany();
    res.json(users);
    console.log(users);

});
>>>>>>> 78996b6 (reset password and add payload in login , register and reset password)
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});