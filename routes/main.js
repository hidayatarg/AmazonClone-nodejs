const router = require('express').Router();
const Category = require('../models/category');

router.route('/categories')
    .get((req, res, next) =>{
        // find all categories by mangoose
        Category.find({}, (err, categories) => {
            res.json({
                success: true,
                message: 'All categories Successful',
                categories: categories
            });
        });  
    })
    .post((req, res, next) => {
        let category = new Category();
        // it will take from the request form category
        category.name = req.body.category;
        category.save();
        res.json({
            success: true,
            message: 'Category Added Successfully'
        });
    });

module.exports = router;