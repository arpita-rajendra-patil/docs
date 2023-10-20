const mongoose = require("mongoose");

// below is the schema for the flower collection to store Name and colour of a flower into db.
const postSchema = new mongoose.Schema({
    flower :{
        type: String,
        unique : false,
        required : "Flower name is required."
    },
    colour :{
        type: String,
        unique : false,
        required : "Flower color is required."
    }

});

module.exports=  mongoose.model("Post",postSchema);
