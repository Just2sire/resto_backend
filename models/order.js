const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const Schema  = mongoose.Schema;

const orderSchema = new Schema({
    userInfo: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    foodInfo: {
        type: Schema.Types.ObjectId,
        ref: 'Food',
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 500,
        validate: {
            validator: (value) => {(value % 25) !== 0},
            message: (props) => "Montant invalide"
        }
    },
    quantite: {
        type: Number,
        required: true
    },
    id_order: {
        type: String,
        required: true,
        minlength: 5
    },
    statut: {
        type: String,
        required: false,
        default: "Non livré"
    }
}, {timestamps: true});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;