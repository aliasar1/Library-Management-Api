const express = require('express');
const {
    registerUser,
    currentUser,
    loginUser
} = require('../controllers/adminController');
const validateToken = require('../middlewares/validateTokenHandler');

const router = express.Router();
const validateAdminToken = validateToken('user');

router.post('/register', registerUser);

router.post('/login', loginUser);

router.get('/current', validateAdminToken, currentUser);

module.exports = router;