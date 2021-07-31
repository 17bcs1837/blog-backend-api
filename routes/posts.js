const router = require('express').Router();

// Controllers
const postController = require('../controllers/posts');
const { authCheck, isAuthorized } = require('../controllers/auth');
const { userById } = require('../controllers/user');

//Validation
const { postValidationRules } = require('../validation/post/postValidationRules');
const { postValidationResult } = require('../validation/post/postValidationResult');

router.get('/', postController.getPosts);
router.post('/post/new/:userId', authCheck, postController.createPost);
router.get('/post/by/:userId', authCheck, postController.postsByUser);
router.delete('/post/:postId', authCheck, postController.checkPoster, postController.deletePost);

router.param('userId', userById);
router.param('postId', postController.postById);

module.exports = router;