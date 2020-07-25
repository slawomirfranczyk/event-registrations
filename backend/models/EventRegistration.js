const mongoose = require('mongoose');
const { replaceMultipleSpaces } = require('./../utils');

// regexp from https://emailregex.com
const emailRegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const EventRegistrationSchema = new mongoose.Schema({
    firstName: {
        type: String,
        minlength: 1,
        set: replaceMultipleSpaces
    },
    lastName: {
        type: String,
        minlength: 1,
        set: replaceMultipleSpaces
    },
    email: {
        type: String,
        validate: {
            validator: val => emailRegExp.test(val),
            message: ({ value }) => `\`${value}\` is not a valid email!`
        },
        set: replaceMultipleSpaces
    },
    eventDate: {
        type: Date,
        set: val => new Date(val)
    },
});

const EventRegistration = mongoose.model('EventRegistration', EventRegistrationSchema);

module.exports = EventRegistration;