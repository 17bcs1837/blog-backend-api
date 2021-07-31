const { body } = require('express-validator');

exports.signupValidationRules = [
    body('name', "Name is Required")
    .notEmpty()
    .isLength({ min: 5, max: 10 })
    .withMessage("Name length should be of min: 5 & max: 10"),

    body('email', "Email is Required")
    .notEmpty()
    .matches(/.+\@.+\..+/)
    .withMessage("Email must contain @")
    .isLength({ min: 4, max: 30 })
    .withMessage("Email should be of length min: 4 & max: 30"),

    body('password', "Password is Required")
    .notEmpty()
    .isLength({ min: 5, max: 20 })
    .withMessage("Password length should be of min: 5 & max: 25")
]

exports.signinValidationRules = [
    body('email', 'Email is Required')
    .notEmpty()
    .isString()
    .isLength({ min: 4, max: 30 })
    .withMessage('Email should be of length min: 4 and max: 30')
    .matches(/.+\@.+\..+/)
    .withMessage('Enter valid email'),

    body('password', 'Password is required')
    .notEmpty()
    .isLength({ min: 5, max: 20 })
    .withMessage('Password should be of length min: 5 & max: 20')
]