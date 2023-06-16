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

// Partie authentification

// app.use(passport.initialize());

// app.use(passport.session());

/*passport.serializeUser((user, done) => {
    done(null, user.id)
});

passport.deserializeUser((id, done) => {
    User.findById(id)
    .then(user => {
        done(null, user);
    }).catch(err => {
        done(err, null);
    });
});

passport.use(new localStrategy((username, password, done) => {
    User.findOne({ name: username })
    .then(user => {
        if (!user) {
            return done(null, false, { message: "Nom d'utilisateur incorrect." });
        }
        bcrypt.compare(password, user.password)
        .then(result => {
            if (result === false) {
                return done(null, false, { message: "Mot de passe incorrect." });
            }
            return done(null, user);
        }).catch(err => done(err));
    }).catch(err => done(err));
}));
*/

/*app.get('/logout', (req, res) => {
    req.logout((err) => {
        if (err) {
            console.log(err);
            // return res.redirect('/admin'); // ou gérer l'erreur d'une autre manière
            res.json({error: "Erreur lors de la déconnexion"});
        }
        // res.redirect('/loginView');
        res.json({success: "Vous etes déconnecté"});
    });
    // res.redirect('/loginView');
    res.json({success: "Vous etes déconnecté"});
});*/

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


// console.log(mesRoutes(app));
