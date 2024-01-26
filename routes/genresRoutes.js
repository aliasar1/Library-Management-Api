const express = require('express');
const router = express.Router();
const { getAllGenres, getGenre, addGenre, updateGenre, deleteGenre } = require('../controllers/genreController');
const validateToken = require('../middlewares/validateTokenHandler');
const validateAdminToken = validateToken('user');

router.get('/',  validateAdminToken, getAllGenres);

router.get('/:id', validateAdminToken, getGenre);

router.post('/', validateAdminToken, addGenre);

router.put('/:id', validateAdminToken, updateGenre);

router.delete('/:id', validateAdminToken, deleteGenre);

module.exports = router;