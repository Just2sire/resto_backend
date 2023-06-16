const bcrypt = require('bcrypt');
// const User = require('../Models/user');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const register = (req, res) => {
    const {username, password} = req.body
    const exists = User.findOne({username: username})
    .then((user) => {
        if (user !== null) {
            return res.json({error: `L'utilisateur ${username} existe déjà !!!`});
        };
    }).catch(err => { throw Error(err.message) })

    bcrypt.genSalt(10, (err, salt) => {
        if (err) throw Error(err.message);
        bcrypt.hash(password, salt, (err, hash) => {
            if (err) throw Error(err.message);

            password = hash;        
            const user = new User(req.body);
            user.save()
            .then((user) => {
                // const token = user.generateAuthToken();
                res.json({success: "Votre compte a bien été crée"});
            })
            .catch((err) => {
                res.json({error: err.message});
                throw err.message
            })
        })
    });
}

/*const register = (req, res) => {
    const exists = User.exists({ name: req.body.name });
    if (exists) {
      return res.json({ error: 'User already exists' });
    }
  
    bcrypt.genSalt(10, (err, salt) => {
      if (err) return next(err);
  
      bcrypt.hash(req.body.password, salt, (err, hash) => {
        if (err) return next(err);
  
        req.body.password = hash;
        const user = new User(req.body);
        user.save()
          .then(() => {
            const payload = { id: user.id, username: user.username };
            const token = jwt.sign(payload, process.env.JWT_SECRET);
  
            res.json({ success: 'Your account has been created', token });
          })
          .catch((err) => {
            res.json({ error: err.message });
            throw new Error("Error during registration");
          });
      });
    });
  };*/
  
const login = (req, res) => {
  const { email, password } = req.body;
    User.findOne({email: email})
    .then((user) => {
      // Comparer le mot de passe hashé stocké avec le mot de passe fourni
      bcrypt.compare(password, user.password)
        .then(match => {
          if (!match) {
            return res.json({ error: 'Identifiants invalides' });
          }

          // Générer le token JWT
          const token = user.generateAuthToken();

          // Renvoyer le token en tant que réponse
          res.json({ 
            success: "Connecté avec succès",
            token 
          });
        })
        .catch(err => {
          console.error(err);
          res.json({ error: "Erreur lors de l'authentification" });
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