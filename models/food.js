const mongoose = require('mongoose');

const Schema  = mongoose.Schema;

const foodSchema = new Schema({
    img: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
        minlength: 3
    },
    price: {
        type: Number,
        required: true,
    },
    promotionalPrice: {
        type: Number,
        required: false,
    },
    description :{
        type: String,
        min: 500,
        required: true,
    },
    categorie: {
        type: String,
        required: true,
    },
    quantite: {
        type: Number,
        required: false
    },
    rating: {
        type: Number,
        required: false,
        default: 3,
        max: 5
    }
}, {timestamps: true});

const Food = mongoose.model('Food', foodSchema);

module.exports = Food;