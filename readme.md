# Amazon Clone
This is an opensource project, I am developing this project for teaching to a community code camp. Feb 27 2019
## Express 
Web Framework - Create Http routes like get, post, put, delete

## Morgan
Http request logger for nodejs. It is a middle ware. 

## BodyParser
Data reader. Nodejs cannot communicate with front end data 

## Mongoose
MangoDB angent with easy interface.

## Install
npm install bcrypt-nodejs --save

## Middlware
check-jwt: to check the token validity.
Edit the user Information

## Adding a category and a product as a Seller
Created the category schema

## Register Amazon S3 Web Service
Access key ID: AKIAIAOLULFJJLN3LMTA

Secret access key: 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

### Policy documentation
```json
{
  "Id": "Policy1551654463295",
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "Stmt1551654455596",
      "Action": "s3:*",
      "Effect": "Allow",
      "Resource": "arn:aws:s3:::amazonawebapplication/*",
      "Principal": "*"
    }
  ]
}
```
Set the bucket to public using the aws policy.
`npm install aws-sdk  multer multer-s3 --save`
