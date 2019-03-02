const router = require('express').Router();
// using the upper for the prefix need (../accounts/signup)

const jwt = require('jsonwebtoken');

const User = require('../models/user');

const config = require('../config');

// custom middleware
const checkJWT = require('../middlewares/check-jwt');

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

// login 
router.post('/login', (req, res, next) => {
    User.findOne({ email: req.body.email }, (err, user) => {
        if(err) throw err;

        if(!user){
            res.json({
                success: false,
                message: 'Authentication failed, User not found'
            });
        } else if (user){
            var validPassword = user.comparePassword(req.body.password);
            // check validity of password
            if (!validPassword) {
                res.json({
                    success: false,
                    message: 'Authentication failed. Wrong Password!'
                });
            }else {
                 var token = jwt.sign({
                     // pass user object
                     user: user
                 }, config.Secret, {
                     expiresIn: '7d'
                 });

                res.json({
                    success: true,
                    message: "Login Successful",
                    token: token
                });
            }
        }
    });
});

// profile API
// router.get('/profile');
// router.post('/profile')
router.route('/profile')
    .get(checkJWT, (req, res, next) => {
        User.findOne({
            _id: req.decoded.user._id
        }, (err, user) => {
            res.json({
                success: true,
                user: user,
                message: "Successful"
            });
        });
    })
    .post(checkJWT, (req, res, next) => {
        User.findOne({
            _id: req.decoded.user._id
        }, (err, user) => {
            if (err) return next(err);

            if (req.body.name) user.name = req.body.name;
            if (req.body.email) user.email = req.body.email;
            if (req.body.password) user.password = req.body.password;

            user.isSeller = req.body.isSeller;

            user.save();
            res.json({
                success: true,
                message: 'Successfully edited your profile'
            });
        });
    });

    // for address
router.route('/address')
    .get(checkJWT, (req, res, next) => {
        User.findOne({
            _id: req.decoded.user._id
        }, (err, user) => {
            res.json({
                success: true,
                address: user.address,
                message: "Successful"
            });
        });
    })

    .post(checkJWT, (req, res, next) => {
        User.findOne({ _id: req.decoded.user._id }, (err, user) =>{
            if(err) return next(err);
            // check all the fields
            if (req.body.addr1) user.address.addr1 = req.body.addr1;
            if (req.body.addr2) user.address.addr2 = req.body.addr2;
            if (req.body.city) user.address.city = req.body.city;
            if (req.body.state) user.address.state = req.body.state;
            if (req.body.country) user.address.country = req.body.country;
            if (req.body.postalcode) user.address.postalcode = req.body.postalcode;

            user.save();
            res.json({
                success: true,
                message: 'Successfully edited / Updated your profile'
            });
        });
});

module.exports = router;