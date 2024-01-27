const express = require('express');
const router = express.Router();
const { returnBook, getAllReturnedBooks, getCustomerReturnedBooks } = require('../controllers/returnController');
const validateToken = require('../middlewares/validateTokenHandler');
const validateAdminToken = validateToken('user');

router.post('/returnBook', validateAdminToken, returnBook);
router.get('/returnedBooks', validateAdminToken, getAllReturnedBooks);
router.get('/customerReturnedBooks', validateAdminToken, getCustomerReturnedBooks);

module.exports = router;