const mongoose = require('mongoose');

const Schema  = mongoose.Schema;

const order_foodSchema = new Schema({
    foodInfo: {
        type: Schema.Type.ObjectId,
        ref: 'Food',
        required: true
    },
    orderInfo: {
        type: Schema.Type.ObjectId,
        ref: 'Order',
        required: true
    },
    quantite: {
        type: Number,
        required: true
    }
}, {timestamps: true});

const Order_Food = mongoose.model('Order_Food', order_foodSchema);

module.exports = Order_Food;