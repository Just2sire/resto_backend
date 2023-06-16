const mongoose = require('mongoose');

const Schema  = mongoose.Schema;

const orderSchema = new Schema({
    userInfo: {
        type: Schema.Type.ObjectId,
        ref: 'User',
        required: true
    },
    total_price: {
        type: Number,
        required: true,
        min: 500,
        validate: {
            validator: (value) => {(value % 25) !== 0},
            message: (props) => "Montant invalide"
        }
    },
    id_order: {
        type: String,
        required: true,
        minlength: 5
    },
    adresse: {
        type: String,
        required: true,
        minlength: 3
    },
    statut: {
        type: String,
        required: false,
        default: "Non livré"
    }
}, {timestamps: true});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;