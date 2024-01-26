const express = require('express');
const router = express.Router();
const { issueBook, getAllIssuedBooks, getCustomerIssuedBooks } = require('../controllers/issueController');
const validateToken = require('../middlewares/validateTokenHandler');
const validateAdminToken = validateToken('user');

router.post('/issueBook', validateAdminToken, issueBook);
router.get('/issuedBooks', validateAdminToken, getAllIssuedBooks);
router.get('/customerIssuedBooks', validateAdminToken, getCustomerIssuedBooks);

module.exports = router;