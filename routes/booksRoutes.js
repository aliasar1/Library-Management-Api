const express = require('express');
const router = express.Router();
const { getAllBooks, getBook, addBook, updateBook, deleteBook } = require('../controllers/bookController');
const validateToken = require('../middlewares/validateTokenHandler');

router.get('/', getAllBooks);

router.get('/:id', getBook);

router.post('/', validateToken, addBook);

router.put('/:id', validateToken, updateBook);

router.delete('/:id', validateToken, deleteBook);

module.exports = router;
