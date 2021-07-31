const { validationResult } = require('express-validator');

exports.userValidationResult = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.json({ error: errors.array()[0].msg })
    }

    next();
}