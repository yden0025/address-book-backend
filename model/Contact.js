const mongoose = require('mongoose');
const { Schema } = mongoose;
const Joi = require('joi');

const ContactSchema = new Schema({
    name: String,
    phone: String,
    book: {
        type: Schema.Types.ObjectId,
        ref: 'Book'
    },
    description: String
});

const Contact = mongoose.model('Contact', ContactSchema);

const validateContact = contact => {
    const schema = Joi.object({
        name: Joi.string().required().error(new Error("contact name is required")),
        phone: Joi.string().pattern(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/).error(new Error("invalid phone number")),
        book: Joi.string().pattern(/^[0-9a-fA-F]{24}$/),
        description: Joi.string(),
    })
    return schema.validate(contact);
}

module.exports = {
    Contact,
    validateContact
}