const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const bookRouter = require('./routes/book');
const contactRouter = require('./routes/contact');

const app = express();
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/address_book')
    .then(() => console.log("database connected"))
    .catch(() => console.log("database connection failed"));

app.use(cors());

app.use('/book', bookRouter);
app.use('/contact', contactRouter);

app.listen(8000, () => {
    console.log('express server running at 8000');
})