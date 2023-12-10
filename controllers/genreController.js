const asyncHandler = require('express-async-handler');
const Genre = require('../models/genre');

const getAllGenres = asyncHandler(async(req, res) => {
    const genres = await Genre.find();
    res.status(200).json(genres);
});

const getGenre = asyncHandler(async(req, res) => {
    const genre = await Genre.findById(req.params.id);
    if(!genre){
        res.status(404);
        throw new Error("Genre not found with given ID.");
    }
    res.status(200).json(genre);
});

const addGenre = asyncHandler(async (req, res) => {
    const { name } = req.body;

    if (!name) {
        res.status(400);
        throw new Error("All fields are mandatory.");
    }

    const existingGenre = await Genre.findOne({ name: { $regex: new RegExp("^" + name + "$", "i") } });

    if (existingGenre) {
        res.status(400);
        throw new Error("Genre with the same name already exists.");
    }

    const genre = new Genre({ name });
    await genre.save();
    res.status(200).json(genre);
});

const updateGenre = asyncHandler(async(req, res) => {
    const { name } = req.body;
    if(!name){
        res.status(400);
        throw new Error("All fields are mandatory.");
    }

    const genre = await Genre.findById(req.params.id);
    if(!genre){
        res.status(404);
        throw new Error("Genre not found with given ID.");
    }

    const updateGenre = await Genre.findByIdAndUpdate(req.params.id, {name}, { new: true });
    res.status(200).json(updateGenre);
});

const deleteGenre = asyncHandler(async(req, res) => {
    const genre = await Genre.findById(req.params.id);
    if(!genre){
        res.status(404);
        throw new Error("Genre not found with given ID.");
    }

    await Genre.deleteOne({ _id: req.params.id });
    res.status(200).json(genre);
});

module.exports = {
    getAllGenres,
    getGenre,
    addGenre,
    updateGenre,
    deleteGenre
};