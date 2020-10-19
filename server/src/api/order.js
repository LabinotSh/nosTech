const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const Order = require('../models/Order');


// find all orders
router.get('/', asyncHandler(async (req, res) => {
    const orders = await Order.find();
    res.json(orders); 
}));

//find order by id
router.get('/:orderId', asyncHandler(async(req,res) => {
    const id = req.params.orderId;
    const order = await Order.findById(id)
    res.json(order);
}));

//Delete by id
router.delete('/:orderId', asyncHandler(async (req,res) => {
    const id = req.params.orderId;
    const deletedOrder = await Order.findByIdAndDelete(id);
    res.send(deletedOrder);
}));

module.exports = router;