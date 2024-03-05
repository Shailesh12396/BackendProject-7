const product_model = require("../models/product.model")
const category_model = require("../models/category.model")


// Controller for creating the product
/**
 *  POST localhost:8888/ecomm/api/v1/auth/products
 * 
 *   {
 *    "name": "Soap",
 *    "description": "Soap is used for nahana",
 *    "category": "Household",
 *    "cost": 30
 *    }
 */


// Creating New Product  (Only Admin)
 
exports.createNewProduct = async (req, res) => {

    // Read the req body

    // Create the product Object
    try {
        const prod_data = {
            name: req.body.name,
            description: req.body.description,
            cost: req.body.cost,
            category: req.body.category
            
        }

        // Insert into mongodb

        const product = await product_model.create(prod_data)

        try {
             // Find category in MongoDB
            const category = await category_model.findOne({ name: product.category })
            // Push product name to category's products array
            category.products.push(product.name)
            await category.save()
        } catch (err) {
            console.log("Error while updating the category", err);
            return res.status(500).send({
                message: "Error while updating the product's category"
            });
        }
        res.status(201).send(product);

    }
    catch (err) {
        // Handle any errors that occur during product creation
        console.log("Error while creating the product", err)
        return res.status(500).send({
            message: "Error while creating the product"
        })
    }
}

// Getting all Product   (Logged in user)

exports.getProduct = async (req, res) => {
    try{
        const products=await product_model.find()
        res.status(200).send(products);
        
         }catch(err){
            console.log("Error while getting all products", err);
            res.status(500).send({
                message : "Error while getting all products"
            })
        }
   
}

// Getting Product based on name   (Logged in user)

exports.getOneProduct = async (req, res) => {
    try{
        const product=await product_model.find({name : req.params['product_name']})
        res.status(200).send(product);
        
         }catch(err){
            console.log("Error while getting product with name", err);
            res.status(500).send({
                message : "Error while getting product with name"
            })
        }
   
}

 // PUT/Update product (Only Admin)

 exports.updOneProduct = async (req,res)=>{

    try{
        const oneproduct = await product_model.findOne({name : req.params['product_name']})   
        oneproduct.name = req.body.name ? req.body.name : oneproduct.name
        oneproduct.description = req.body.description ? req.body.description : oneproduct.description
        oneproduct.cost = req.body.cost ? req.body.cost : oneproduct.cost
        oneproduct.category = req.body.category ? req.body.category : oneproduct.category


        const updatedProduct = await oneproduct.save();

        res.status(200).send(updatedProduct);
 
     }catch(err){
        console.log("Error while updating product with name", err.message);
        res.status(500).send({
            message : "Error while updating product with name"
        });
    }
 
 }

 // Deleting one product (Logged in)

exports.deleteOneProduct=async(req, res)=>{

    try{
    const product=await product_model.findOne({name : req.params['product_name']})
    const updatedProduct = await product.deleteOne();
    
    res.status(200).send(updatedProduct);
    
     }catch(err){
        console.log("Error while deleting a product ", err);
        res.status(500).send({
            message : "Error while deleting a product"
        })
    }
}


 // Getting all products in a category (Logged in)

 exports.getProductInCategory=async(req, res)=>{
    try{
        const products = await product_model.find({category : req.params['category_name']})   
        res.status(200).send(products);
 
     }catch(err){
        console.log('Error while getting the category with name', err);
        res.status(500).send({
            message : "Error while getting category based on category name "
        })
    }

}

// Getting all products whose cost is greater than X (Logged in)

exports.basedOnCost=async(req, res)=>{
    try{
        const products = await product_model.find({ cost : {$gt: req.params['cost']}})   
        res.status(200).send(products);
 
     }catch(err){
        console.log('Error while getting the products whose cost is greater than X', err);
        res.status(500).send({
            message : "Error while getting the products whose cost is greater than X "
        })
    }

}

// Getting all products whose cost is less than X (Logged in)

exports.basedOnCostSecond=async(req, res)=>{
    try{
        const products = await product_model.find({ cost : {$lt: req.params['cost']}})   
        res.status(200).send(products);
 
     }catch(err){
        console.log('Error while getting the products whose cost is less than X', err);
        res.status(500).send({
            message : "Error while getting the products whose cost is less than X "
        })
    }

}



// Getting all products in a category whose cost is greater than X (Logged in)

exports.basedOnCostThird=async(req, res)=>{
    try{
        const products = await product_model.find({category : req.params['category_name'], cost : {$gt: req.params['cost']}})   
        res.status(200).send(products);
 
     }catch(err){
        console.log('Error while getting products in a category whose cost is greater than X', err);
        res.status(500).send({
            message : "Error while getting products in a category whose cost is greater than X"
        })
    }

}

// Getting all products in a category whose cost is less than X (Logged in)

exports.basedOnCostFourth=async(req, res)=>{
    try{
        const products = await product_model.find({category : req.params['category_name'], cost : {$lt: req.params['cost']}})   
        res.status(200).send(products);
 
     }catch(err){
        console.log('Error while getting products in a category whose cost is less than X', err);
        res.status(500).send({
            message : "Error while getting products in a category whose cost is less than X"
        })
    }

}