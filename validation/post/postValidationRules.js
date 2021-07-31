const { body } = require('express-validator');
const formidable = require('formidable');

let form = formidable.IncomingForm({ keepExtensions: true });

exports.postValidationRules = [
    body('title', 'Title is Required').notEmpty(),
    body('title', 'Title should be of length min: 5 & max: 10').isLength({ min: 5, max: 10}),

    body('body', 'Body is Required').notEmpty(),
    body('body', 'Body should be of length min: 5 & max: 50').isLength({ min: 5, max: 50})
]
