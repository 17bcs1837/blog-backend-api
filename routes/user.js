const router = require('express').Router();

const { userById, allUsers, getUser, updateUser, deleteUser } = require('../controllers/user');
const { authCheck, isAuthorized } = require('../controllers/auth');

router.get('/users', authCheck, allUsers);
router.get('/user/:userId', authCheck, getUser);
router.put('/user/:userId', authCheck, isAuthorized, updateUser);
router.delete('/user/:userId', authCheck, isAuthorized, deleteUser);


router.param('userId', userById);

module.exports = router;