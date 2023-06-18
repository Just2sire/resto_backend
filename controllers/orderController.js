const Order = require('../models/order');
const { v4: uuidv4 } = require('uuid');

const add_order = (req, res) => {
    const uniqId = uuidv4();
    // const newData = (req.body.panier).map((element) => ({
    //     price: element.price,
    //     quantite: element.quantite,
    //     foodInfo: element._id,
    //     userInfo: req.body.userInfo,
    //     id_order: uniqId,
    // }));
    // const data = Object.assign({}, newData);
    const data = (req.body.panier).reduce((acc, element) => {
        acc.push({
            price: element.price,
            quantite: element.quantite,
            foodInfo: element._id,
            userInfo: req.body.userInfo,
            id_order: uniqId,
        });
        return acc;
    }, []);
    console.log(data);
    Order.insertMany(data)
        .then((order) => {
            res.json({
                success: "Votre commande a été enregistré avec succès"
            })
        }).catch((err) => {
            console.log(err.message);
            res.status(500).json({ message: err.message, data })
            // res.status(500).json({message: "Erreur lors de l'enregistrement de la commande", data})
        });
}

module.exports = {
    add_order,
}