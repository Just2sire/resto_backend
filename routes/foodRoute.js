const express = require('express');
const router = express.Router();
const {all_foods, add_food, get_food, update_food, delete_food} = require('../controllers/foodController');

router.get('/menu', all_foods);

router.get('/menu/:id', get_food);

router.post('/add', add_food);

router.post('/update', update_food);

router.post('/delete', delete_food);

module.exports = router;