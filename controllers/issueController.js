const asyncHandler = require('express-async-handler');
const Issue = require('../models/issue');
const Book = require('../models/book');
const Customer = require('../models/customer');

const issueBook = asyncHandler(async (req, res) => {
    const { bookId, customerId } = req.body;

    if (!customerId || !bookId) {
        res.status(400);
        throw new Error("All fields are required");
    }

    const existingBook = await Book.findById(bookId);
    if (!existingBook) {
        res.status(404);
        throw new Error('Book not found');
    }

    const existingCustomer = await Customer.findById(customerId);
    if (!existingCustomer) {
        res.status(404);
        throw new Error('Customer not found');
    }

    if (existingBook.numberInStock === 0) {
        res.status(400);
        throw new Error('Book is out of stock');
    }

    existingBook.numberInStock--;

    existingCustomer.booksIssued.push(bookId);

    await existingBook.save();
    await existingCustomer.save();

    const newIssue = new Issue({
        bookId,
        customerId,
    });

    await newIssue.save();

    res.status(201).json({ message: 'Book issued successfully' });
});

const getAllIssuedBooks = asyncHandler(async (req, res) => {

    const issuedBooks = await Issue.find();

    res.status(200).json({ issuedBooks });
});

const getCustomerIssuedBooks = asyncHandler(async (req, res) => {
    const { customerId } = req.body;

    if (!customerId) {
        res.status(400);
        throw new Error("Customer ID is required");
    }

    try {
        const issuedBooks = await Issue.find({ customerId }).populate('bookId').populate('customerId');

        res.status(200).json({ issuedBooks });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching customer issued books', error: error.message });
    }
});

module.exports = { issueBook, getAllIssuedBooks, getCustomerIssuedBooks};
