const asyncHandler = require('express-async-handler');
const Book = require('../models/book');

const getAllBooks = asyncHandler(async (req, res) => {
    const books = await Book.find();
    res.status(200).json(books);
});

const getBook = asyncHandler(async (req, res) => {
    const book = await Book.findById(req.params.id);
    if (!book) {
        res.status(404);
        throw new Error("Book not found.");
    }
    res.status(200).json(book);
});

const addBook = asyncHandler(async (req, res) => {
    const { title, genres, numberInStock, weeklyRentalRate } = req.body;

    if (!title || !genres || !numberInStock || !weeklyRentalRate) {
        res.status(400);
        throw new Error("All fields are mandatory.");
    }

    try {
        const newBook = new Book({
            title,
            genres,
            numberInStock,
            weeklyRentalRate,
        });

        await newBook.save();
        res.status(200).json(newBook);
    } catch (error) {
        res.status(500);
        throw new Error("Error adding the book to the database.");
    }
});

const updateBook = asyncHandler(async (req, res) => {
    const { title, genres, numberInStock, weeklyRentalRate } = req.body;

    if (!title || !genres || !numberInStock || !weeklyRentalRate) {
        res.status(400);
        throw new Error("All fields are mandatory.");
    }

    const book = await Book.findById(req.params.id);

    if (!book) {
        res.status(404);
        throw new Error("Book not found.");
    }

    book.title = title;
    book.genres = genres;
    book.numberInStock = numberInStock;
    book.weeklyRentalRate = weeklyRentalRate;

    const updatedBook = await book.save();
    res.status(200).json(updatedBook);
});

const deleteBook = asyncHandler(async (req, res) => {
    const book = await Book.findById(req.params.id);

    if (!book) {
        res.status(404);
        throw new Error("Book not found.");
    }

    await Book.deleteOne({ _id: req.params.id });;
    res.status(200).json({ message: "Book removed successfully." });
});

module.exports = {
    getAllBooks,
    getBook,
    addBook,
    updateBook,
    deleteBook,
};
