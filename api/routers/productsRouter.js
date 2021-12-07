const {  getProductById,getAllProducts,updateProduct,removeProduct,addProduct
    
} = require('../queries');

const express = require('express');
const productsRouter = express.Router();

productsRouter.get('/',getAllProducts);
productsRouter.get('/:product_id',getProductById);
productsRouter.post('/',addProduct)
productsRouter.put('/:product_id',updateProduct);
productsRouter.delete('/:product_id',removeProduct);

module.exports = productsRouter;