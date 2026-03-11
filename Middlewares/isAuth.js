const jwt = require('jsonwebtoken')
const User = require('../Models/User')

exports.isAuth = async(req, res, next) => {
    try {
        const token = req.header('authorization')

        var decoded = jwt.verify(token, process.env.privateKey)

        if(!decoded) {
            res.status(400).send('Wrong Token')
        }
        const user = await User.findById(decoded.id)
        req.user = user
        next()
    } catch (error) {
        res.status(500).send({errors : [{message : 'Not Authorized'}]})
    }
}