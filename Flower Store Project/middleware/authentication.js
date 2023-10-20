const jsonwebtoken = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config()
//var properties = require('../config/properties');
 
module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jsonwebtoken.verify(token, process.env.KEY);
        req.userData = decoded;
        next();
    } catch (error) {
        return res.status(401).json({
            message: 'Auth failed'
        });
    }
};