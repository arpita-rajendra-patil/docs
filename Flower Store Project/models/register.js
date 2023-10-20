const mongoose = require("mongoose");

// below is the schema for the users collection to store userid and password of the users.
const registerSchema =new mongoose.Schema({
    userid :{
        type: String,
        unique:"The user already exists.",
        required:"User id is a must. Enter user id."
    },
    password :{
        type: String,
        unique: false,
        required: "Password is a must. Enter Password."
    }
});

module.exports= mongoose.model("Register",registerSchema);