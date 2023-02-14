const express = require('express');
const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');
const path = require('path');
const router = express.Router();

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory


app.get("/login", (req, res) => {
    //const con = "This is the best gym in the world"
    //const params = { 'title': 'Buscle Fitness', "content": con }
    res.status(200).render('login.pug');
})

app.get("/register", (req, res) => {
    //const con = "This is the best gym in the world"
    //const params = { 'title': 'Buscle Fitness', "content": con }
    res.status(200).render('register.pug');
})
app.post('/register', async(req, res) => {
    const { name, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
        },
    });

    res.json(newUser);
    console.log(newUser);

});

app.post('/login', async(req, res) => {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
        where: {
            email,
        },
    });

    if (!user) {
        return res.status(401).json({ error: 'User not found' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
        return res.status(401).json({ error: 'Incorrect password' });
    }

    res.json({ message: 'Login successful' });

});


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});