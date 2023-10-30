const Post = require("../models/post");
const Register = require("../models/register");
var loginValidator = 0; //used in loginUser function for validating login.



// The below function is for fetching the list of flowers from the db. (get call)
exports.getPosts = (req, res) => {  // query params- pagenumber and pagelimit
    console.log("getPost entered");
    
        const pagenumber=req.query.pagenumber; //page no. obtained from url for pagination.
        const pagelimit=parseInt(req.query.pagelimit); //page limit used for limiting the no. of flowers displayed in a page.
       
        const posts = Post.find().select("_id flower colour")
            .skip((pagenumber-1)*pagelimit)
            .limit(pagelimit) //This code is used for pagination purpose
            .then((posts) => {
                res.status(200).json({ posts: posts })
            })
            .catch(err => console.log("error", err));
    }
   


// The below function is for adding a flower and it's color data to the db. (post call)
exports.createPost = (req, res) => {

        const post = new Post(req.body);

        post.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    "error": err
                })
            }
            res.status(201).json({
                post: result,
                message: "Your flower details is saved."
            })
        })
    }


// The below function is for deleting a flower from the db. Query param to be given- flower name.
exports.removePost = (req, res) => {

    Post.findOneAndDelete({ flower: req.query.flower }, function (err, Post) {
        if (err) {
            console.log(err);
            res.json({

                error: err
            })
        }
        res.status(204).json({
            message: "Flower deleted successfully"
        })
    })
}
 

// The below function is for updating the colour of a flower based on Query param- flower name.
exports.updatePost = (req, res) => {
    
    var updateflower = {
        colour: req.body.colour,
    }
    Post.updateOne({ flower: req.query.flower }, updateflower, function (err, Post) {
        if (err) {
            res.json({
                error: err
            })
        }
        res.status(201).json({
            message: "Flower colour updated successfully"
        })
    })
}
   
