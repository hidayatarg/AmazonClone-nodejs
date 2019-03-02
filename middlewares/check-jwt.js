const jwt = require('jsonwebtoken');
const config = require('../config');

module.exports = function(req, res, next) {
    // request the header
    let token = req.header["authorization"];

    // token is avaliable
    if(token) {
    jwt.verify(token, config.Secret, function(err, decoded){
        if(err){
            res.json({
                success: false,
                message: 'Failed to authenticate token'
            });
        }else {
            req.decoded = decoded;
            // for id in token 
            // req.decoded.user._id
            next();
        }
    });
    }else {
        res.status(403).json({
            success: false,
            message: 'No token provided'
        })
    
    }
}