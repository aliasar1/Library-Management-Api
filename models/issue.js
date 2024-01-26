const mongoose = require('mongoose');

const issueSchema = new mongoose.Schema({
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
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('Issue', issueSchema); 