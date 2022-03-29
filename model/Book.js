const mongoose = require('mongoose');
const { Schema } = mongoose;
const Joi = require('joi');

const BookSchema = new Schema({
    name: String,
    description: String,
});

const Book = mongoose.model('Book', BookSchema);

const validateBook = book => {
    const schema = Joi.object({
        name: Joi.string().min(1).max(100).required().error(new Error("book name must be 1-100 characters' long")),
        description: Joi.string(),
    })

    return schema.validate(book);
}

module.exports = {
    Book,
    validateBook
}