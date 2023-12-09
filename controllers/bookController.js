const asyncHandler = require('express-async-handler');
const Book = require('../models/book');

const getAllBooks = asyncHandler(async(req, res)=>{
    const books = await Book.find();
    res.status(200).json(books);
});

const getBook = asyncHandler(async(req, res)=>{
    const book = await Book.findById(req.params.id);
    if(!book){
        res.status(404);
        throw new Error("Book not found.");
    }
    res.status(200).json(book);
});

const addBook = asyncHandler(async (req, res) => {
    const { title, genre, numberInStock, weeklyRentalRate } = req.body;

    if (!title || !genre || !numberInStock || !weeklyRentalRate) {
        res.status(400);
        throw new Error("All fields are mandatory.");
    }

    try {
        const newBook = new Book({
            title,
            genre,
            numberInStock,
            weeklyRentalRate,
        });

        await newBook.save();
        res.status(201).json(newBook);
    } catch (error) {
        res.status(500);
        throw new Error("Error adding the book to the database.");
    }
});

module.exports = {
    getAllBooks,
    getBook,
    addBook,
};