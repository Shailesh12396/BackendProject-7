/**
 *   POST localhost:8888/ecomm/api/v1/auth/products
 * 
 */
const authMW=require("../middlewares/auth.mw")
product_controller=require("../controllers/product.controller")
auth_mw=require("../middlewares/auth.mw")

module.exports=(app)=>{
    app.post("/ecomm/api/v1/auth/products",[auth_mw.verifyToken, authMW.isAdmin], product_controller.createNewProduct)

    app.get("/ecomm/api/v1/auth/products",[auth_mw.verifyToken], product_controller.getProduct)

    app.get("/ecomm/api/v1/auth/products/:product_name",[auth_mw.verifyToken], product_controller.getOneProduct)

    app.put("/ecomm/api/v1/auth/products/:product_name",[auth_mw.verifyToken, authMW.isAdmin], product_controller.updOneProduct)

    app.delete("/ecomm/api/v1/auth/products/:product_name",[auth_mw.verifyToken, authMW.isAdmin], product_controller.deleteOneProduct)

    // Searching functionality API (Find all the products in Electronics category)
    // localhost:8888/ecomm/api/v1/auth/categories/Electronics/products
    app.get("/ecomm/api/v1/auth/categories/:category_name/products",[auth_mw.verifyToken],  product_controller.getProductInCategory)

    // Searching functionality API (Find all the products whose cost is greater then X)
    // localhost:8888/ecomm/api/v1/auth/products/cost/gt/31000
    app.get("/ecomm/api/v1/auth/products/cost/gt/:cost",[auth_mw.verifyToken], product_controller.basedOnCost)

    // Searching functionality API (Find all the products whose cost is less then X)
    // localhost:8888/ecomm/api/v1/auth/products/cost/lt/31000
    app.get("/ecomm/api/v1/auth/products/cost/lt/:cost",[auth_mw.verifyToken], product_controller.basedOnCostSecond)

    // Searching functionality API (Find all the products whose cost is greater then X in a given category) 
    // localhost:8888/ecomm/api/v1/auth/categories/Electronics/products/gt/31000
    app.get("/ecomm/api/v1/auth/categories/:category_name/products/gt/:cost",[auth_mw.verifyToken], product_controller.basedOnCostThird)

    // Searching functionality API (Find all the products whose cost is less then X in a given category) 
    // localhost:8888/ecomm/api/v1/auth/categories/Electronics/products/lt/36000
    app.get("/ecomm/api/v1/auth/categories/:category_name/products/lt/:cost",[auth_mw.verifyToken], product_controller.basedOnCostFourth)
}