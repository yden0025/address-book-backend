const contact = require('express').Router();
const mongoose = require('mongoose');
const { Contact, validateContact } = require('../model/Contact');

contact.get('/:book_id', async (req, res) => {
    const { book_id } = req.params;
    const contacts = await Contact
        .find({ book: mongoose.Types.ObjectId(book_id) })
        .sort({ name: 'asc' });
    res.send(contacts);
});

contact.post('/:book_id', async (req, res) => {
    const { error } = validateContact(req.body);
    if (error) return res.status(400).send({ message: error.message });

    const { book_id } = req.params;
    const { name } = req.body;
    const contact = await Contact.find({ name, book: mongoose.Types.ObjectId(book_id) });
    if (contact.length !== 0) {
        return res.status(400).send({ message: 'contact has already exist in this book' });
    }

    const createdContact = new Contact({ ...req.body, book: mongoose.Types.ObjectId(book_id) });
    await createdContact.save();

    res.send(createdContact);
});

contact.get('/count/all', async (req, res) => {
    const data = await Contact
        .aggregate()
        .group({ _id: '$name', count: { $sum: 1 } });
    const counter = {};
    data.forEach((item, i) => {
        counter[String(item._id)] = item.count
    })
    res.send(counter);
});

module.exports = contact;