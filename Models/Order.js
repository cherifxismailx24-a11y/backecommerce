const mongoose = require ('mongoose')

const orderSchema = mongoose.Schema({
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
        totalPrice : Number,
        status : {
            type : String,
            default :  "Pending"
        }
})

module.exports = mongoose.model('order',orderSchema)