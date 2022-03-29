const book = require('express').Router();
const { Book, validateBook } = require('../model/Book');

book.get('/', async (req, res) => {
    const books = await Book.find({});
    res.send(books);
});

book.post('/', async (req, res) => {
    const { error } = validateBook(req.body);
    if (error) return res.status(400).send({ message: error.message });
    const { name } = req.body;
    let book = await Book.findOne({ name });
    if (book) return res.status(400).send({ message: 'book name has already exists' });
    book = new Book(req.body);
    await book.save();
    res.send(book);
});

module.exports = book;