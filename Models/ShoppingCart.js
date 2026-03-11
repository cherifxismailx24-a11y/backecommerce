const mongoose = require('mongoose')

const cartSchema = mongoose.Schema(
    {
        owner : {
            type : mongoose.Types.ObjectId ,
            ref : "user"
        },
        items : [
            {
                    product :{
                type : mongoose.Types.ObjectId ,
                ref : "product"
                    },
                    qte : Number,
                    price : Number
            }
        ],
        totalPrice : Number
    })

    module.exports = mongoose.model('cart', cartSchema)