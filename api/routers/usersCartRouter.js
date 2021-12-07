const {
    
    getUserCart,updateProductQtyFromCart,removeProductFromCart,clearUserCart,addProductToCart
} = require('../queries');

const express = require('express');
const usersCartRouter = express.Router();

usersCartRouter.get('/user_id',getUserCart);
usersCartRouter.put('/:user_id',updateProductQtyFromCart);
usersCartRouter.post('/:user_id',addProductToCart);
usersCartRouter.delete('/:user_id',clearUserCart);
module.exports = usersCartRouter;