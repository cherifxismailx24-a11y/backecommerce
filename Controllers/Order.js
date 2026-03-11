const Order = require("../Models/Order")
const ShoppingCart = require("../Models/ShoppingCart")


exports.AddOrder = async(req,res) => {
    try {
        console.log(req.user)
        const found = await ShoppingCart.findOne({owner : req.user._id})
        console.log(found)
        const newOrder =new Order ({owner : req.user._id, items : found.items, totalPrice : found.totalPrice})
        await newOrder.save()
        await ShoppingCart.findByIdAndUpdate(found._id, { $set: {items: [], totalPRice: 0}}, {new: true})

        res.status(200).send({message: 'Order added Successfully', order: newOrder})
       
    } catch (error) {
        res.status(500).send({errors : [{message : 'Server error'}]})
    }
}

exports.DeleteOrder = async(req, res) => {
    try {
        const {id} = req.params
        await Order.findByIdAndDelete(id)
        res.status(200).send({msg: 'Order Deleted'})
    } catch (error) {
        res.status(500).send({errors: [{message : 'Could not Delete Order'}]})
    }
}

exports.GetAllOrder = async(req, res) => {
    try {
        const orders = await Order.find().populate('owner').populate('items.product')

        res.status(200).send({message : 'List of All Orders', orders})
    } catch (error) {
        res.status(500).send({errors : [{message: 'Could not get Orders'}]})
    }
}

exports.GetUserOrder = async(req, res)=>{
    try {
        console.log("Hello", req.user)
        const found = await Order.find({ owner: req.user._id }).populate("owner").populate("items.product");
      console.log(found)
        res.status(200).send({ msg: "commande(s) found", commandes: found });
    } catch (error) {
        res.status(500).send({ errors: [{ msg: "Could not get commande" }] });
    }
}

exports.AcceptOrder = async(req, res) => {
    try {
        const {id} = req.params;
        let cmd = await Order.findById(id).populate('owner').populate('items.product');
   
        cmd.status = 'Accepted';
        await cmd.save();
        res.status(200).send({ msg: "Commande accepted and email sent successfully", commande: cmd });

    } catch (error) {
        console.error(error);
        res.status(500).send({errors: [{message: 'Could not Accept Order'}]})
    }
}

exports.RejectedOrder = async(req, res) => {
    try {
        const {id} = req.params;
        let cmd = await Order.findById(id).populate('owner').populate('items.product');
   
        cmd.status = 'Rejected';
        await cmd.save();
        res.status(200).send({ msg: "Commande accepted and email sent successfully", commande: cmd });

    } catch (error) {
        console.error(error);
        res.status(500).send({errors: [{message: 'Could not Accept Order'}]})
    }
}