 const mongoose = require('mongoose')

 const ConnectDB = async () => {
    try {
        await mongoose.connect(process.env.mongo_uri)
        console.log('MongoDB is Connected')
    } catch (error) {
        console.log(error)
    }
 }

 module.exports = ConnectDB