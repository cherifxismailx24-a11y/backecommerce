const ShoppingCart = require("../Models/ShoppingCart")

exports.GetUserPanier = async(req, res)=>{
    try {

        const found = await ShoppingCart.findOne({owner : req.user._id}).populate("owner").populate("items.product")
        res.status(200).send(  {msg : "panier found", panier: found})

    } catch (error) {
        res.status(500).send( {errors: [{msg : "Could not get panier"}]})
    }
}
exports.UpdatePanier = async(req, res)=>{
    try {
        const {id} = req.params

        const cart = await ShoppingCart.findOne({owner : id}).populate("items.product")


        const productId = String(req.body.product)
        const qty = Number(req.body.qte) || 1
        const local = req.body.local

        
        if (!cart) {
            const newCart = new ShoppingCart({ owner: id, items: [{ ...req.body, product: productId, qte: qty }] })
            await newCart.save()
            return res.status(201).send({ msg: "panier created", panier: newCart })
        }

        let upItems
        const foundIndex = cart.items.findIndex((el) => String(el.product._id) === productId)
        console.log(foundIndex)
//EEEEEEEEEEEEED
        if (foundIndex !== -1) {
            upItems = cart.items.map((el) =>
                String(el.product._id) === productId && local == 'add'
                    ? { ...(el.toObject ? el.toObject() : el), qte: (el.qte || 0) + qty,price : el.product.price * (el.qte + qty )}
                  :  
                  
                  String(el.product._id) === productId && local == 'upp' ?
                   { ...(el.toObject ? el.toObject() : el), qte: qty,price : el.product.price * qty }
                    : el
            )
        } else {
            upItems = [...cart.items, { ...req.body, product: productId, qte: qty }]
        }

        upItems = upItems.filter(i => i.qte && i.qte > 0)

        const initialValue = 0;
        const sumWithInitial = upItems.reduce(
        (accumulator, currentValue) => accumulator + currentValue.price,
        initialValue,[]
        );
        const updated = await ShoppingCart.findByIdAndUpdate(cart._id, { $set: { items: upItems , totalPrice: sumWithInitial} }, { new: true })

        res.status(200).send({ msg: "panier updated", panier: updated })

    } catch (error) {
        res.status(500).send( {errors: [{msg : "Could not get panier"}]})
    }
}
exports.DeletePanier = async(req, res)=>{
    try {
        const {id} = req.params
        const cart = await ShoppingCart.findOne({owner : id})
        if (!cart) {
            return res.status(400).send({ errors: [{ msg: "panier not found" }] })
        }
        await ShoppingCart.findByIdAndDelete(cart._id)
        res.status(200).send({ msg: "panier deleted" })
    } catch (error) {
        res.status(500).send( {errors: [{msg : "Could not delete panier"}]})
    }

}