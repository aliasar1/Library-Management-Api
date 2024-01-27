const mongoose = require('mongoose');

const returnSchema = new mongoose.Schema({
    bookId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
        required: true
    },
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        required: true
    },
    rentalRate: {
        type: Number,
        required: true,
        min: 0,
        max: 255
    }
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('Return', returnSchema); 