const express = require('express');
const router = express.Router();
const { add_order } = require("../controllers/orderController");

router.post('/add', add_order);

module.exports = router;
