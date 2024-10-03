const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    page: {
        type: Number,
        required: false
    },
    genre: {
        type: String,
        required: false
    },
    cover_img: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: false
    }
});

module.exports = mongoose.model("Book", BookSchema);
