const mongoose = require('mongoose');
const Food = require('../models/food');

const all_foods = (req, res) => {
    Food.find()
    .then(foods => {
        res.json(foods)
    }).catch(err => {
        res.json({error: "Erreur lors de la récupération du menu"});
        throw Error("Erreur lors de la récupération du menu");
    })
}

const get_food = (req, res) => {
    let id = req.params.id;
    Food.findById(id).
    then(food => {
        res.json(food)
    })
    .catch(err => {
        res.json("Erreur lors de la récupération du plat");
        throw Error("Erreur lors de la récupération du plat");
    });
}

const add_food = (req, res) => {
    const food = new Food(req.body);
    food.save()
    .then(() => {
        res.json({success: "Le plat a été  ajouté avec succès"});
    }).catch(err => {
        res.json({error: "Erreur lors de l'ajout du plat"});      
        throw Error("Erreur lors de l'ajout du plat");
    })
}

const update_food = (req, res) => {
    let id = req.params.id;
    Food.findByIdAndUpdate(id, req.body)
    .then(() => {
        res.json({success: "Le plat a été modifié avec succès"});
    }).catch(err => {
        res.json("Erreur lors de la modification du plat");
        throw Error("Erreur lors de la modification du plat");
    });
}

const delete_food = (req, res) => {
    let id = req.params.id;
    Food.findByIdAndDelete(id)
    .then(() => {
        res.json({success: "Le plat a été supprimé avec succès"});
    }).catch(err => {
        res.json("Erreur lors de la suppression du plat");
        throw Error("Erreur lors de la suppression du plat");
    });
}



module.exports = {
    all_foods,
    add_food,
    get_food,
    update_food,
    delete_food
}
