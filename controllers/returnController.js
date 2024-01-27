const asyncHandler = require('express-async-handler');
const Return = require('../models/return');
const Book = require('../models/book');
const Customer = require('../models/customer');
const Issue = require('../models/issue');

const returnBook = asyncHandler(async (req, res) => {
    const { issueId } = req.body;

    if (!issueId) {
        res.status(400);
        throw new Error("Issue ID is required");
    }

    const existingIssue = await Issue.findById(issueId);
    console.log('Existing Issue:', existingIssue);
    if (!existingIssue) {
        res.status(404);
        throw new Error('Issue not found');
    }

    const existingBook = await Book.findById(existingIssue.bookId);
    console.log(existingBook)
    if (!existingBook) {
        res.status(404);
        throw new Error('Book not found');
    }
    
    const existingCustomer = await Customer.findById(existingIssue.customerId);
    console.log(existingCustomer)
    if (!existingCustomer) {
        res.status(404);
        throw new Error('Customer not found');
    }

    const rentalRate = calculateRentalRate(existingBook.weeklyRentalRate, existingCustomer.createdAt);
    console.log(rentalRate)
    const newReturn = new Return({
        bookId: existingIssue.bookId,
        customerId: existingIssue.customerId,
        rentalRate,
    });
    console.log(newReturn)
    

    existingCustomer.booksIssued = existingCustomer.booksIssued.filter(id => id.toString() !== existingIssue.bookId.toString());
    console.log(existingCustomer.booksIssued)
    existingBook.numberInStock++;

    await existingBook.save();
    await existingCustomer.save();

    await newReturn.save();

    await Issue.deleteOne({ _id: issueId });

    res.status(201).json({ message: 'Book returned successfully', rentalRate });
});


const getAllReturnedBooks = asyncHandler(async (req, res) => {
    const returnedBooks = await Return.find().populate('bookId').populate('customerId');

    res.status(200).json({ returnedBooks });
});

const getCustomerReturnedBooks = asyncHandler(async (req, res) => {
    const { customerId } = req.query;

    if (!customerId) {
        res.status(400);
        throw new Error("Customer ID is required");
    }

    const returnedBooks = await Return.find({ customerId }).populate('bookId').populate('customerId');

    res.status(200).json({ returnedBooks });
});

const calculateRentalRate = (weeklyRentalRate, customerCreatedAt) => {
    const weeksSinceRegistration = Math.ceil((Date.now() - customerCreatedAt.getTime()) / (7 * 24 * 60 * 60 * 1000));

    const rentalRate = weeklyRentalRate * weeksSinceRegistration;

    return rentalRate;
};

module.exports = { returnBook, getAllReturnedBooks, getCustomerReturnedBooks };
