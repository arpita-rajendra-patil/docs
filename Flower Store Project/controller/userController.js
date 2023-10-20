const bcrypt= require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const User= require("../models/register");

exports.register = (req,res,next) => {
    User.find({userid: req.body.userid})
    .exec()
    .then(user => {
        if(user.length>=1){
            return res.status(409).json({
                message: 'User exists'
            })  //we got the req but ther's some conflict with the resource n can't process it
        }
        else{
            bcrypt.hash(req.body.password, 10, (err,hash) => {
                if(err){
                    return res.status(500).json({
                        error: err
                    });
                }
                else{
                    const user = new User({
                        userid :req.body.userid,
                        password: hash
                    });
                    user.save()
                    .then(result => {
                        console.log(result);
                        res.status(201).json({
                            message: "User created"
                        });
                    })
                    .catch(err => {
                        res.status(500).json({
                          error: err
                    });
                })
            }
            })
        }
    })
  
  }

exports.login = (req,res) => {
 
    User.find({userid: req.body.userid})
    .exec()
    .then(loginuser => 
        {
            if(loginuser.length<1)
            { //no user
                return res.status(401).json({ //unauthorised
                    message: "Invalid Username/Password"
                })
            }
            bcrypt.compare(req.body.password, loginuser[0].password, (err,result) =>
            {
                if(err){
                    return res.status(401).json({ //unauthorised
                        message: "Invalid Username/Password"
                
            });
        }
        if(result)
        {
           const token= jsonwebtoken.sign({
                userid:loginuser[0].userid,
                dbId: loginuser[0]._id

            }, process.env.JWT_KEY, 
            {
                expiresIn: "1h"
            },
            )
            return res.status(200).json({
              
                token:token,
            });
        }

    });
           
   });
}