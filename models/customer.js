const mongoose = require('mongoose');

const customerSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please add username"],
    },
    email: {
        type: String,
        required: [true, "Please add email address"],
        unique: [true, "Email address already taken"],
    },
    password: {
        type: String,
        required: [true, "Please add password"],
    },
    booksIssued: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
    }],
}, {
    timestamps: true,
});

module.exports = mongoose.model("Customer", customerSchema);
