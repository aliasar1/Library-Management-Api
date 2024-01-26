const express = require('express');
const router = express.Router();
const { getAllBooks, getBook, addBook, updateBook, deleteBook } = require('../controllers/bookController');
const validateToken = require('../middlewares/validateTokenHandler');
const validateAdminToken = validateToken('user');

router.get('/', getAllBooks);

router.get('/:id', getBook);

router.post('/', validateAdminToken, addBook);

router.put('/:id', validateAdminToken, updateBook);

router.delete('/:id', validateAdminToken, deleteBook);

module.exports = router;
