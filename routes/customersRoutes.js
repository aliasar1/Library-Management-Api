const express = require('express');
const router = express.Router();
const { registerCustomer, loginCustomer, currentCustomer } = require('../controllers/customerController');
const validateToken = require('../middlewares/validateTokenHandler');
const validateCustomerToken = validateToken('customer');

router.post('/register', registerCustomer);
router.post('/login', loginCustomer);
router.get('/current', validateCustomerToken, currentCustomer);

module.exports = router;
