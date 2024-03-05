// It should contain cart products and it's total cost

const  mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({

    products : {
        type : [String],
        default : []
    },
    totalCost : {
        type : Number,
        default : 0
    }


},{ timestamps : true , versionKey : false})

module.exports = mongoose.model("Cart" , cartSchema);