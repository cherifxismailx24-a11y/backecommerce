 const User = require('../Models/User')
 const bcrypt = require('bcrypt');
 const jwt = require('jsonwebtoken');   
const ShoppingCart = require('../Models/ShoppingCart');
    
    exports.Signup = async(req, res) => {
    try {
       const { email, password } = req.body 

       console.log(req.body)

       const found = await User.findOne({email})

       console.log(found)

       if(found){
        return res.status(400).send({errors : [{msg : 'Email already exists'}]})
       } 

       const account = new User(req.body)
       
       const saltRounds = 10;
       const salt = bcrypt.genSaltSync(saltRounds);
       const hashPassword = bcrypt.hashSync(password, salt);

       account.password = hashPassword

       await account.save()

       const cart =  new ShoppingCart({owner : account._id, items :[], totalPrice : 0})

       await cart.save()
       
       const payload = { id: account._id }

       var token = jwt.sign(payload, process.env.privateKey);

       res.status(200).send({msg : 'Account has been created', account, token})

        
    } catch (error) {
        res.status(500).send({errors: [{msg : 'Could not create an account'}]})
    }
}
 
 exports.Login = async(req, res) => {
    try {
        const {email, password} = req.body
        const found = await User.findOne({email})
        if(!found){
            return res.status(400).send({errors : [{message : 'Wrong Email'}]})
        }

        const matched = bcrypt.compareSync(password, found.password)
        
        if(!matched){
            return res.status(400).send({errors : [{message : 'Wrong Password'}]})
        }
       
       const payload = { id: found._id }
       var token = jwt.sign(payload, process.env.privateKey);

       res.status(200).send({message : 'You are logged in', found, token})

    } catch (error) {
        res.status(500).send({errors : [{message : 'Could Not Login'}]})
    }
}

exports.GetAllUsers = async(req, res)=>{
    try {
        const users = await User.find()

        res.status(200).send({message : 'List of Users', users})
    } catch (error) {
        res.status(500).send({message : 'Could not get Users'})

    }
}

exports.GetOneUser = async(req,res) => {
    try {
        const {id} = req.params 
        const found = await User.findById(id)
        res.status(200).send({message : 'User Found', found })
    } catch (error) {
        res.status(500).send({message : 'Could not get User'})
    }
}

exports.UpdateUser = async(req, res) => {
    try {
        const {id} = req.params
        await User.findByIdAndUpdate(id, {$set : req.body})
        res.status(200).send({message : 'User Updated'})
    } catch (error) {
        res.status(500).send({message : 'Could not update User'})
    }
}

exports.DeleteUser = async(req, res) => {
    try {
        const {id} = req.params
        await User.findByIdAndDelete(id)
        res.status(200).send({message : 'User Deleted'})
    } catch (error) {
        res.status(500).send({message : 'Could not delete User'})
    }
}
