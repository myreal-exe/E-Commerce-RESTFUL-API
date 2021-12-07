const {
    registerUser,loginUser
  
} = require('../queries');

const express = require('express');
const usersRouter = express.Router();

usersRouter.post('/login',loginUser);
usersRouter.post('/register',registerUser);

module.exports = usersRouter;