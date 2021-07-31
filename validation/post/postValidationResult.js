const { validationResult } = require('express-validator');

exports.postValidationResult = (req, res, next) => {
    console.log(req.body)
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.json({ msg: errors.array()[0].msg });
    }
    next();
}