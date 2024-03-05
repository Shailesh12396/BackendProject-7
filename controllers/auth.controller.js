//  I need to write the controller / Logic to register a user

const bcrypt=require('bcryptjs')
const user_model=require("../models/user.model")
const jwt=require("jsonwebtoken")
const secret=require("../configs/auth.config")

exports.signup=async (req,res)=>{

    // Logic to create the user

    //1. Read the request body
    const request_body=req.body
    //req.body will give the body of the request in the form of JSON object and body is the method of req

    //2. Insert the data in the users collection in MogoDB
    const userObj={
        name: request_body.name,
        userId: request_body.userId,
        email: request_body.email,
        userType: request_body.userType,
        password: bcrypt.hashSync(request_body.password,8)
    }
    // Now store this into user collection so for this we have to require user_model
    
    try{
        const user_created=await user_model.create(userObj)
        // Return this user

        const res_obj={
            name : user_created.name,
            userId : user_created.userId,
            email : user_created.email,
            userType : user_created.userType,
            createdAt : user_created.createdAt,
            updatedAt : user_created.updateAt
        }
        res.status(201).send(res_obj)  // Successfully created
    }
    catch(err){
        console.log("Error while registering the user", err)
        res.status(500).send({            // Internal server error
            message: "Some error happened while registering the user"
        }) 
    }
    
    //3. Return the response back to user
}


exports.signin=async (req, res)=>{

    //Check if the user id is present in the system
    const user= await user_model.findOne({userId: req.body.userId})
    
    if(user==null){
        return res.status(400).send({
            message:"User Id passed is not a valid user id"
        })
    }

    // Check password is correct
        // Bcrypt the provided password with the saved password using compareSync
        // user.password is the stored value of password
    const isPasswordValid= bcrypt.compareSync(req.body.password, user.password)

    if(!isPasswordValid){
        return res.status(401).send({
            message:"Wrong password passed"
        })
    }

    // using JWT we will create the access token with a given TTL (Time to live is the duration of token at which it alive) and return 
        // JWT having a method sign for creating a token
        // It requires three parameters
        // First on which basis you wants to create token (user.userId) 
        // Second is the secrete words (My xyz secret). Secrect is provide to better security so it have to keep changing so make its config (auth.config.js)
        // Third is the time, Token will alive for 120 seconds

    const token =jwt.sign({id: user.userId}, secret.secret,{
        expiresIn: 120
    })

    res.status(200).send({
        name: user.name,
        userId: user.userId,
        email: user.email,
        userType: user.userType,
        accessToken: token
    })
}