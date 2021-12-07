
const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan')
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(cors());


app.get('/',(req,res) =>{
    res.json({info:'ugay'});
});
const usersRouter = require('./routers/usersRouter');
const usersCartRouter = require('./routers/usersCartRouter');
const ordersRouter = require('./routers/ordersRouter');
const productsRouter = require('./routers/productsRouter');


app.use('/users',usersRouter);
app.use('/cart',usersCartRouter);
app.use('/orders',ordersRouter);
app.use('/products',productsRouter)

const PORT = 3000;
app.listen(PORT,() => {
    console.log(`Server Listening on PORT : ${PORT}`);
});
