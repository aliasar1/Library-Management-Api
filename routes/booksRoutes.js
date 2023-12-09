const express = require('express');
const router = express.Router();
const { getAllBooks, getBook } = require('../controllers/bookController');

router.get('/', getAllBooks);

router.get('/:id', getBook);

module.exports = router;