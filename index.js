const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const session = require('express-session');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const localStrategy = require('passport-local').Strategy;
const User = require('./models/user');
const mesRoutes = require('express-list-endpoints');

const app =  express();
app.use(express.json())
// app.use(cors());
app.use(express.static('public'));
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));

dotenv.config();

mongoose.connect(process.env.DB_HOST)
.then(() => {
    app.listen(process.env.SERVER_PORT);
    console.log(`Le serveur est au port ${process.env.SERVER_PORT}`);
    console.log("Connected successfully to the DB");
}).catch((err) => {
    console.log("DB error");
});

// Mes routes

app.get('/', (req, res) => {
    res.send({
        message: "API backend près pour le service"
    });
});

// Routes liés à la nourriture

const foodRoute = require('./routes/foodRoute');

app.use('/food', foodRoute);

// Routes liés à l'authentification

const authRoute = require('./routes/authRoute');

app.use('/auth', authRoute);

// Routes liés aux commandes

const orderRoute = require('./routes/orderRoute');

app.use('/order', orderRoute);



// console.log(mesRoutes(app));
