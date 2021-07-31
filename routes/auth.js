const router = require('express').Router();

//Controllers
const authController = require('../controllers/auth');

//Validation
const { signupValidationRules, signinValidationRules } = require('../validation/user/userValidationRules');
const { userValidationResult } = require('../validation/user/userValidationResult');

router.post('/signup', signupValidationRules, userValidationResult, authController.signup);
router.post('/signin', signinValidationRules, userValidationResult, authController.signin);


module.exports = router;