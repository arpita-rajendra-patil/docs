// Initialize required npm Packages.

const express = require("express");
const app = express();
const nodemon =require("nodemon"); 
const bodyParser= require("body-parser");
const dotenv=require("dotenv");
const mongoose= require("mongoose");


dotenv.config();

//middlewares
app.use(bodyParser.json()); //body-parser will parse any input or output data to json format.

//Bring in routes functions
const postRoutes = require("./routes/post");

//db connection
const uri=process.env.MONGO_URI;
mongoose.connect(uri,{ useNewUrlParser: true }, { useUnifiedTopology: true }).then(() => console.log("DB connected"));
mongoose.connection.on("error",err => {
    console.log("DB connection error: ",err.message);
})

//A middleware that will make a call to the fn router in routes/post when there is a get for "/"
app.use("/flowerstore",postRoutes);     //postRoutes can be used to access any fn in routes/post file.


const port= process.env.PORT || 8080;
app.listen(port);




