const category_model=require("../models/category.model")

// Controller for creating the category
/**
 *  POST localhost:8888/ecomm/api/v1/auth/categories
 * 
 *   {
 *    "name": "Household",
 *    "description": "This will have all the household items"
 *    }
 */


// Creating New Category  (Only Admin)

exports.createNewCategory=async (req,res)=>{
    // Read the req body

    // Create the category object
    const cat_data={
        name: req.body.name,
        description: req.body.description
    }

    try{
        // Insert into mongodb
        const category=await category_model.create(cat_data)
        return res.status(201).send(category)
    }
    catch(err){
        console.log("Error while creating the category",err)
        return res.status(500).send({
            message: "Error while creating the category"
        })
    }


    // return the response of the created category

}


// Getting all categories (Logged in)

exports.getAllCategory=async(req, res)=>{

    try{
    const categories=await category_model.find()
    res.status(200).send(categories);
    
     }catch(err){
        console.log("Error while getting all categories ", err);
        res.status(500).send({
            message : "Error while getting all categories"
        })
    }
}

// Getting categories based on name  (Logged in)

exports.getOneCategory = async (req,res)=>{

    try{
        const onecategory = await category_model.find({name : req.params['category_name']})   
        res.status(200).send(onecategory);
 
     }catch(err){
        console.log('Error while getting the category with name', err);
        res.status(500).send({
            message : "Error while getting category based on category name "
        })
    }
 
 }


 // PUT/Update categories  (Only Admin)

exports.updOneCategory = async (req,res)=>{

    try{
        const onecategory = await category_model.findOne({name : req.params['category_name']})   
        onecategory.name = req.body.name ? req.body.name : onecategory.name
        onecategory.description = req.body.description ? req.body.description : onecategory.description

        const updatedCategory = await onecategory.save();

        res.status(200).send(updatedCategory);
 
     }catch(err){
        console.log("Error while updating category with name", err.message);
        res.status(500).send({
            message : "Error while updating category with name"
        });
    }
 
 }


 // Deleting one categories (Logged in)

exports.deleteOneCategory=async(req, res)=>{

    try{
    const category=await category_model.findOne({name : req.params['category_name']})
    const updatedCategory = await category.deleteOne();

    res.status(200).send(updatedCategory);
    
     }catch(err){
        console.log("Error while deleting a categories ", err);
        res.status(500).send({
            message : "Error while deleting a categories"
        })
    }
}