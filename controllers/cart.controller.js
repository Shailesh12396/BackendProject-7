const product_model = require("../models/product.model")
const category_model = require("../models/category.model")
const cart_model=require("../models/cart.model")

// Controller for creating the cart
/**
 *  POST localhost:8888/ecomm/api/v1/auth/carts
 * 

 */


// Creating New Cart  (Logged in)

exports.createNewCart = async (req, res) => {
    try{
        const cart=await cart_model.create()
        console.log("ID",cart._id)
        res.status(200).send(cart);
        
         }catch(err){
            console.log("Error while creating new cart", err);
            res.status(500).send({
                message : "Error while creating new cart"
            })
        }
   
}