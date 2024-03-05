/**
 *   POST localhost:8888/ecomm/api/v1/auth/carts
 * 
 */
const authMW=require("../middlewares/auth.mw")
cart_controller=require("../controllers/cart.controller")
auth_mw=require("../middlewares/auth.mw")

module.exports=(app)=>{
    app.post("/ecomm/api/v1/auth/products", cart_controller.createNewCart)

}