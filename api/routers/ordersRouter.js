const {
   
    getOrder,removeOrder,placeOrder
} = require('../queries');
const express = require('express');
const ordersRouter = express.Router();

ordersRouter.get('/:order_id',getOrder);
ordersRouter.post('/:user_id',placeOrder);
ordersRouter.delete('/order_id',removeOrder);

module.exports = ordersRouter;

