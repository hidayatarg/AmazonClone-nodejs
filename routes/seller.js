const router = require('express').Router();
const Product = require('../models/product');

const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const s3 = new aws.S3({
    accessKeyId: "AKIAIAOLULFJJLN3LMTA",
    secretAccessKey: "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"
});

module.exports = router;