const express = require('express')
const ConnectDB = require('./Config/ConnectDB')
const userRouter = require('./Routes/User')
const productRouter = require('./Routes/Product')
const shoppingcartRouter = require('./Routes/ShoppingCart')
const orderRouter = require('./Routes/Order')
const cors = require('cors')
const app = express()

app.use(cors({
  origin: 'https://endearing-alfajores-fa1fa6.netlify.app',
  credentials: true 
}))


require('dotenv').config()

ConnectDB()

app.use(express.json())

app.use('/api/user',userRouter)

app.use('/api/product',productRouter)

app.use('/api/shoppingcart',shoppingcartRouter)

app.use('/api/order',orderRouter)

app.listen(process.env.port, console.log(`Server is running on the port ${process.env.port}`))