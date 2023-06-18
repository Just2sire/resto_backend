const Order_Food = require('../models/order_food');

const order_food = (req, res) => {
    Order_Food.insertMany(req.body)
    .then((order) => {
        res.json({
            success: "Votre commande a été enregistré avec succès"
        })
    }).catch((err) => {
        res.status(500).json({message: "Erreur lors de l'enregistrement de la commande"})
    });
};

module.exports = {
    order_food
}