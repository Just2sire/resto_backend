const mongoose = require('mongoose');

const Schema  = mongoose.Schema;

const offreSchema = new Schema({
    type: {
        type: String,
        required: true
    },
    name: {
        type: Schema.Type.ObjectIdStrng,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 500
    },
    foodsInfos: [
        {
            type: Schema.Types.ObjectId,
            ref: 'MenuItem',
        }
    ],
    img: {
        type: String,
        required: true
    }
}, {timestamps: true});

const Offre = mongoose.model('Offre', offreSchema);

module.exports = Offre;