const mongoose = require('mongoose');

const bookSchema =  mongoose.model('Book', new mongoose.Schema({
        title: {
            type: String,
            required: true,
            trim: true, 
            minlength: 5,
            maxlength: 255
        },
        genres: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Genre',
                required: true
            }
        ],
        numberInStock: { 
            type: Number, 
            required: true,
            min: 0,
            max: 255
        },
        weeklyRentalRate: { 
            type: Number, 
            required: true,
            min: 0,
            max: 255
        }
    },
    {
        timestamps: true,
    }
)); 

module.exports = bookSchema;