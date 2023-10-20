
const express= require("express"); //express has to be required to use the Router() fn.
const postController = require("../controller/post");
const userController= require("../controller/userController");
const authentication=require("../middleware/authentication");
const router = express.Router(); //this Router() fn helps in routing to resp fns upon any req.

// When a req arrives at "/flowerstore/" it comes from app.js to here.
router.post("/login",userController.login); 

router.get("/getFlowersList",authentication,postController.getPosts); 

router.post("/addFlower",authentication,postController.createPost); 

router.delete("/removeFlower",authentication,postController.removePost); 

router.put("/updateColour",authentication,postController.updatePost); 

router.post("/register",userController.register);

module.exports=router;


