const mongoose = require('mongoose');

// regexp from https://emailregex.com
const emailRegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const EventRegistrationSchema = new mongoose.Schema({
    firstName: {
        type: String,
        minlength: 1,
    },
    lastName: {
        type: String,
        minlength: 1
    },
    email: {
        type: String,
        validate: {
            validator: val => emailRegExp.test(val),
            message: ({ value }) => `\`${value}\` is not a valid email!`
        }
    },
    eventDate: {
        type: String,
        validate: {
            validator: val => /[0-9]{4}-[0-9]{2}-[0-9]{2}/.test(val) && !/0000-00-00/.test(val),
            message: ({ value }) => `\`${value}\` is not a valid date! Required date format: YYYY-MM-DD`
        }
    },
});

const EventRegistration = mongoose.model('EventRegistration', EventRegistrationSchema);

module.exports = EventRegistration;