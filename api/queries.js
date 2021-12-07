const { response } = require('express');
const hash256 = require('./utils');
const Pool = require('pg').Pool;
const { RowDescriptionMessage } = require('pg-protocol/dist/messages');
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'ecommerce_api',
    password: '.-xanax+x.',
    port:5432
})

//USERS ROUTER
const registerUser = (req,res)=>{
    const {username,first_name,last_name,region,password} = req.body;

    pool.query('INSERT INTO users (username,first_name,last_name,region,password) VALUES ($1,$2,$3,$4,$5)',[username,first_name,last_name,region,hash256(password)],(error,result)=>{
        if(error){
            throw error;
        }
        response.status(201).send(`User added with ID : ${result.insertID}`);
    })
}

const loginUser = (req,res) => {
    const {username,password} = req.body;

    pool.query(
        'SELECT * FROM users',
        []
        ,(error,result) =>{
            if(error){
                throw error;
            }
            response.status(201).send(`Login Successful.`);
    })
}

//PRODUCTS

const getAllProducts = (req,res) => {
    pool.query(
        'SELECT * FROM products'
    ,(error,result) => {
        if(error){
            throw error;
        }
        res.send(result.rows);

    });

}

const getProductById = (req,res) =>{
    const product_id = req.params.product_id;

    pool.query(
        'SELECT * FROM products WHERE product_id = $1',[product_id],
        (error,result) => {
        if(error){
            throw error;
        }
        res.send(result.rows);
    })
}

const addProduct = (req,res) => {
    const {name,price,description} = req.body;

    pool.query(
        'INSERT INTO products (name,price,description) VALUES $1,$2,$3',
        [name,price,description],
        (error,result) => {
            if(error) {
                throw error;
            }
            res.status(201).send(`Product with name : ${name} added.`)
        }
    )
}

const updateProduct = (req,res) => {
    const product_id = req.params.product_id;
    const {name,price,description} = req.body;
    pool.query(
        'UPDATE products SET name = $1,price = $2, description = $3 WHERE product_id = $4',[name,price,description,product_id],
        (error,result) => {
        if(error){
            throw error;
        }
        res.status(200).send(`User modified with ID: ${product_id}`);
    })
    
}


const removeProduct = (req,res) =>{
    const {product_id} = req.params.product_id;

    pool.query(
        'DELETE FROM products WHERE product_id = $1',
        [product_id],
        (error,result) => {
            if(error){
                throw error;
            }
            res.status(204).send(`Removed Product with ID : ${product_id}`)
        }
    )
}

//CART

const getUserCart = (req,res) => {
    const {user_id} = req.params.user_id;

    pool.query(
        'SELECT * FROM users_cart JOIN products ON products.product_id = users_cart.product_id WHERE user_id = $1',
        [user_id],
        (error,result) => {
            if (error){
                throw error;
            }
            res.send(result.rows);
        }
    )
}
const addProductToCart = (req,res) => {
    const {user_id} = req.params.user_id;
    const {product_id,qty} = req.body;

    pool.query('INSERT INTO users_cart (user_id,product_id,qty) VALUES $1,$2,$3',[user_id,product_id,qty],(error,result) => {
        if(error){
            throw error;
        }
        res.send(`Product :${product_id} added to card to the User with ID : ${user_id}`)
    })
}

const updateProductQtyFromCart = (req,res) => {
    const {user_id} = req.params.user_id;
    const {product_id,qty} = req.body;
    
    pool.query(
        'UPDATE users_cart SET qty = $1 WHERE user_id = $2 AND product_id = $3',
        [qty,user_id,product_id],
        (error,result) => {
            if(error){
                throw error;
            }
            res.status(200).send(`User modified with ID: ${product_id} From the Cart of the User with ID : ${user_id}`);
        }

    )
}

const clearUserCart = (req,res) => {
    const {user_id} = req.params.user_id;

    pool.query('DELETE FROM users_cart WHERE user_id = $1',[user_id],(error,result) => {
        if(error){
            throw error;
        }
        res.status(204).send(`Cart of the user with ID : ${user_id} cleared`)
    })
}

const removeProductFromCart = (req,res) =>{
    const {user_id} = req.params.user_id;
    const {product_id} = req.body;

    pool.query(
        'DELETE FROM users_cart WHERE user_id = $1 AND product_id = $2',
        [user_id,product_id],
        (error,result) => {
            if(error){
                throw error;
            }
            res.status(204).send(`Removed Product with ID : ${product_id} from the Cart of the User with ID : ${user_id}`)
        }
    )
}

//ORDER

const getOrder = (req,res) => {
    const {order_id} = req.params.order_id;

    pool.query(
        'SELECT * FROM orders WHERE order_id = $1',
        [order_id],
        (error,result) => {
            if(error){
                throw error;
            }
            res.send(result.rows);
        }
    )
}
const placeOrder = (req,res) => {
    const {user_id} = req.params.user_id;
    const { timestamp ,total} = req.body;
    
    pool.query(
        'INSERT INTO orders (timestamp,total,status,user_id) VALUES $1,$2,$3,$4',
        [timestamp,total,'pending',user_id],
        (error,result)=> {
            if(error){
                throw error;
            }
            res.status(201).send(`User with ID ${user_id}\'s order in ${timestamp} has been successfully placed.`)
        }
    )
}

const removeOrder = (req,res) => {
    const {order_id} = req.params.order_id;

    pool.query(
        'SELECT status FROM orders WHERE order_id = $1',
        [order_id],
        (error,result) =>{
            if (error){
                throw error;
            }
            if(result.rows['status'] === 'pending'){
                pool.query(
                    'DELETE FROM orders WHERE order_id = $1',
                    [order_id],
                    (error,result) => {
                        if(error){
                            throw error;
                        }
                        res.status(204).send(`Order with ID : ${order_id} successfully removed.`)
                    }
                )
            } else{
                res.status(400).send(`Order with ID : ${order_id} cannot be removed because the delievery of the product was either successful or it had already started.`)
            }


        }
    )
}

module.exports = {
    registerUser,loginUser,
    getProductById,getAllProducts,addProduct,updateProduct,removeProduct,
    getUserCart,updateProductQtyFromCart,removeProductFromCart,clearUserCart,addProductToCart,
    getOrder,removeOrder,placeOrder
}