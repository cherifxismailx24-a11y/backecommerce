const express = require('express')
const { isAuth } = require('../Middlewares/isAuth')
const { GetUserPanier, UpdatePanier, DeletePanier } = require('../Controllers/ShoppingCart')

const shoppingcartRouter = express.Router()



shoppingcartRouter.get('/panieruser',isAuth, GetUserPanier)

shoppingcartRouter.put('/updatepanier/:id', UpdatePanier)

shoppingcartRouter.delete('/deletepanier/:id',DeletePanier)




module.exports = shoppingcartRouter