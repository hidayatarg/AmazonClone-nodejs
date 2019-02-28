const router = require('express').Router();
// using the upper for the prefix need (../accounts/signup)

const jwt = require('jsonwebtoken');

const User = require('../models/user');

const config = require('../config');

// signup
router.post('/signup', (req, res, next) => {
    // console.log(req.body);
    // check if the user exists
    let user = new User();
    user.name = req.body.name;
    user.email = req.body.email;
    user.password = req.body.password;
    user.picture = user.gravatar();
    user.isSeller = req.body.isSeller;

    // findOne is function by mongoose
    User.findOne({ email: req.body.email }, (err, existingUser)=>{
        // if user exists
        if (existingUser) {
            // response
            res.json({
                success: false,
                message: 'Account with that email exists.'
            });
        }else {
            user.save();
            var token = jwt.sign({
                // pass user object
                user: user
            }, config.Secret, {
                expiresIn: '7d'
            });
            // response
            res.json({
                success: true,
                message: 'Token Created',
                token: token
            });

        }
    });
});


module.exports = router;