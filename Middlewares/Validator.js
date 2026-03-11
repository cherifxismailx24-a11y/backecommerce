const { body, validationResult } = require('express-validator')

exports.validSignUp = [
    body('email', 'Wrong Email Format').isEmail(),
    body('password', 'Your password must be at least 6 characters').isLength({ min: 6 }),

]

exports.validLogin =[
    body('email', 'Wrong Email Format').isEmail()
]

exports.Validation = (req, res, next) => {
    const errors = validationResult(req)

    if(!errors.isEmpty()) {
        return res.status(400).send(errors)
    }
    next()
}