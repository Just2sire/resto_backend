const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const Schema  = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        minlength: 3,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: (value) => {
                // Utiliser le validateur d'email intégré de Mongoose
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
            },
            message: 'Adresse email invalide',
        }
    },
    number: {
        type: String,
        required: false,
        minlength: 8
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    }
}, {timestamps: true});

userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({_id: this._id}, process.env.JWT_PRIVATE_KEY, {expiresIn: '7d'});
    return token;
}

const User = mongoose.model('User', userSchema);

module.exports = User;