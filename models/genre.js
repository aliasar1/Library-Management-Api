const mongoose = require('mongoose');

const genreSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 50
    }, 
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('Genre', genreSchema); 