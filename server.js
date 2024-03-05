// This will be the starting file of the project

const express = require("express")
const mongoose = require("mongoose")
const app = express()
const server_config = require("./configs/server.config")
const db_config = require("./configs/db.config")
const user_model = require("./models/user.model")
const bcrypt = require("bcryptjs")

app.use(express.json())  //Middleware (Whenever you get JSON read it as JS object)
// Create an admin user at the starting of the application if not already present

// Connection with mongoDB
mongoose.connect(db_config.DB_URL)

const db = mongoose.connection
db.on("error", () => {
    console.log("Error while connecting with mongoDB")
})
db.once("open", () => {
    console.log("Connected to MongoDB")
    init()
})

async function init() {
    try {
        let user = await user_model.findOne({ userId: "admin" })

        if (user) {
            console.log("Admin is already present")
            return
        }
    } catch (err) {
        console.log("Error while reading the data", err)
    }


    try {
        user = await user_model.create({
            name: "Singh",
            userId: "admin",
            email: "hello@gmail.com",
            userType: "ADMIN",
            password: bcrypt.hashSync("Welcome1", 8)
            // 8 is a random number to add more extra character before the encryption 
        })
        console.log("Admin Created", user)
    }
    catch (err) {
        console.log("Error while create admin", err)
    }
}

//Stich the routes with the server
// Calling routes and passing app object

require("./routes/auth.routes")(app)

require("./routes/category.routes")(app)

require("./routes/product.routes")(app)

// Start the server
// 8080 is the hard coded port number so to remove this there is server.config.js
app.listen(server_config.PORT, () => {
    console.log("Server is started at port num :", server_config.PORT)
})