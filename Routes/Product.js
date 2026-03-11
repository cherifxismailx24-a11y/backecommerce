const express = require('express')
const {addProduct, getAllProducts, getOneProduct, UpdateProduct, DeleteProduct} = require('../Controllers/Product')

const productRouter = express.Router()

productRouter.post('/addProduct', addProduct)

productRouter.get('/getAllProducts',getAllProducts)

productRouter.get('/getOneProduct/:id',getOneProduct)

productRouter.put('/updateProduct/:id',UpdateProduct)

productRouter.delete('/deleteProduct/:id',DeleteProduct)

module.exports = productRouter