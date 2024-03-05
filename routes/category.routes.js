/**
 *   POST localhost:8888/ecomm/api/v1/auth/categories
 * 
 */
const authMW=require("../middlewares/auth.mw")
category_controller=require("../controllers/category.controller")
auth_mw=require("../middlewares/auth.mw")

module.exports=(app)=>{
    app.post("/ecomm/api/v1/auth/categories",[auth_mw.verifyToken, authMW.isAdmin], category_controller.createNewCategory)

    app.get("/ecomm/api/v1/auth/categories",[auth_mw.verifyToken], category_controller.getAllCategory)

    app.get("/ecomm/api/v1/categories/:category_name",[auth_mw.verifyToken], category_controller.getOneCategory);

    app.put("/ecomm/api/v1/categories/:category_name",[auth_mw.verifyToken, authMW.isAdmin], category_controller.updOneCategory);

    app.delete("/ecomm/api/v1/categories/:category_name",[auth_mw.verifyToken, authMW.isAdmin], category_controller.deleteOneCategory);


}