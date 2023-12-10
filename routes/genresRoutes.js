const express = require('express');
const router = express.Router();
const { getAllGenres, getGenre, addGenre, updateGenre, deleteGenre } = require('../controllers/genreController');
const validateToken = require('../middlewares/validateTokenHandler');

router.get('/',  validateToken, getAllGenres);

router.get('/:id', validateToken, getGenre);

router.post('/', validateToken, addGenre);

router.put('/:id', validateToken, updateGenre);

router.delete('/:id', validateToken, deleteGenre);

module.exports = router;