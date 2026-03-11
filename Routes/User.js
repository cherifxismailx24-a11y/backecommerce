const express = require('express')
const userRouter = express.Router()
const { Signup, Login, GetAllUsers, GetOneUser, UpdateUser, DeleteUser } = require('../Controllers/User');
const { validSignUp, Validation, validLogin } = require('../Middlewares/Validator');
const { isAuth } = require('../Middlewares/isAuth');

userRouter.post('/Register', validSignUp, Validation, Signup)

userRouter.post('/Login',validLogin, Validation, Login)

userRouter.get('/CurrentUser', isAuth, (req, res) => res.send(req.user))

userRouter.get('/getAllUsers', GetAllUsers)

userRouter.get('/getOneUser/:id', GetOneUser)

userRouter.put('/updateUser/:id',UpdateUser)

userRouter.delete('/deleteUser/:id',DeleteUser)

module.exports = userRouter
