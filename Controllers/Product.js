const Product = require('../Models/Product')

exports.addProduct = async (req, res) => {
    try {
        const existingProduct = await Product.find({title : req.body.title})
        //console.log(existingProduct)
        if(existingProduct.length != 0){
            return res.status(400).send({errores: [{message : 'Product already exists'}]})
        }
        if(req.body.description.length < 10){
            return res.status(400).send({errors : [{message : 'Description need to be at least 10 characters long' }]})
        }
        const producttoAdd = new Product(req.body)
        await producttoAdd.save()
        res.status(200).send({message : 'Product has been added', producttoAdd})
    } catch (error) {
        res.status(500).send({errors : [{message : 'Could not add Product'}]})
    }
}

exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find()
        res.status(200).send({message : 'All Products', products})
        
    } catch (error) {
        res.status(500).send({errors : [{message : 'Could not get Products'}]})
    }
}

exports.getOneProduct = async(req, res) => {
    try {
        const {id} = req.params
        const found = await Product.findById(id)
        res.status(200).send({message : 'Product Found', found})
    } catch (error) {
        res.status(500).send({errors : [{message : 'Could not get Product'}]})
    }
}

exports.UpdateProduct = async(req, res) => {
    try {
        const {id} = req.params
        await Product.findByIdAndUpdate(id, {$set : req.body})
        res.status(200).send({message : 'Product Updated'})
    } catch (error) {
        res.status(500).send({errors : [{message : 'Could not update Contact'}]})
    }
}

exports.DeleteProduct = async(req, res) => {
    try {
        const {id} = req.params
        await Product.findByIdAddDelete(id)
        res.status(200).send({message : 'Product Deleted'})
    } catch (error) {
        res.status(500).send({errors : [{message : 'Could not update Product'}]})
    }
}