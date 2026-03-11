const express = require('express')
const { AddOrder, GetUserOrder, GetAllOrder, DeleteOrder, AcceptOrder, RejectedOrder } = require('../Controllers/Order')
const {isAuth} = require('../Middlewares/isAuth')

const orderRouter = express.Router()

orderRouter.get('/addOrder',isAuth,AddOrder)

orderRouter.get('/userorder',isAuth, GetUserOrder)

orderRouter.get('/getallorders',GetAllOrder)

orderRouter.delete('/deleteorder/:id',DeleteOrder)

orderRouter.put('/acceptorder/:id',AcceptOrder)

orderRouter.put('/rejectedorder/:id',RejectedOrder)

module.exports = orderRouter