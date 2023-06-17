const bcrypt = require('bcrypt');
// const User = require('../Models/user');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const register = (req, res) => {
    const {username, password} = req.body
    User.findOne({username: username})
    .then((user) => {
        if (user !== null) {
            return res.status(500).json({message: `L'utilisateur ${username} existe déjà !!!`});
        };
    }).catch(err => { 
      console.error(err.message);
      return res.status(500).json({message: `Erreur lors de l'inscription`});
    })

    bcrypt.genSalt(10, (err, salt) => {
        if (err) res.status(500).json({message: `Erreur lors de l'inscription`});
        bcrypt.hash(password, salt, (err, hash) => {
            if (err) console.error(err.message);

            req.body.password = hash;        
            const user = new User(req.body);
            user.save()
            .then((user) => {
                const token = user.generateAuthToken();
                const userId = user.id;
                res.json({
                  success: "Votre compte a bien été crée",
                  token,
                  userId
                });
            })
            .catch((err) => {
                res.status(500).json({message: err.message});
                throw err.message
            })
        })
    });
}

const login = (req, res) => {
  const { email, password } = req.body;
    User.findOne({email: email})
    .then((user) => {
      // Comparer le mot de passe hashé stocké avec le mot de passe fourni
      bcrypt.compare(password, user.password)
        .then(match => {
          if (!match) {
            return res.status(500).json({ message: 'Identifiants invalides' });
          }

          // Générer le token JWT
          const token = user.generateAuthToken();
          // console.log(token);

          // Renvoyer le token en tant que réponse
          res.json({ 
            success: "Connecté avec succès",
            token,
            userId: user._id
          });
        })
        .catch(err => {
          console.error(err.message);
          res.status(500).json({ message: "Erreur lors de l'authentification" });
        });
    })
};

const isLogout = (req, res, next) => {
    if (!req.isAuthenticated()) return next();
    // res.redirect('/admin');
};

module.exports = {
    register,
    login,
    isLogout
}