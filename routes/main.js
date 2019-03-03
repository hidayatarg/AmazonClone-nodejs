const router = require('express').Router();
const Category = require('../models/category');

router.route('/categories')
    .get((req, res, next) =>{
        let category = new Category();
        res.json({
            success: true,
            category: category,
            message: 'All categories Successful'
        });
    })
    .post((req, res, next) => {
        let category = new Category();
        category.name = req.body.category;
        category.save();
        res.json({
            success: true,
            message: 'Category Added Successfully'
        });
    });

module.exports = router;