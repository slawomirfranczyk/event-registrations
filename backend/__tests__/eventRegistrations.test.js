require('dotenv').config();
const { env: { MONGODB_URI } } = process;

const mongoose = require('mongoose');
const EventRegistration = require('./../models/EventRegistration');
const fetchAPI = require('./utils/fetchAPI');

const createEventRegistrationMutation = `mutation CreateEventRegistration($data: EventRegistrationCreateInput) {
                                            createEventRegistration(data: $data) {
                                                id
                                                firstName
                                                lastName
                                                email
                                                eventDate
                                            }
                                      }`;

// ===

afterAll(async (done) => {

    // connect to mongodb
    const mongooseOptions = {useNewUrlParser: true, useUnifiedTopology: true};
    await mongoose.connect(MONGODB_URI, mongooseOptions);
    // delete all registrations after tests
    await EventRegistration.deleteMany();
    // check if all registrations have been deleted
    const count = await EventRegistration.countDocuments();
    expect(count).toBe(0);
    // close mongodb connection
    await mongoose.connection.close();
    done();

});

describe('event registrations', () => {

    it("should add new event registration", async done => {

        // todo test with empty values
        const data = {
            firstName: 'Jan',
            lastName: 'Kowalski',
            email: 'jan.kowalski@example.com',
            eventDate: '2020-07-01'
        };

        const { createEventRegistration: { id, firstName, lastName, email, eventDate } = {} } = await fetchAPI(createEventRegistrationMutation, { data });

        expect(id).toHaveLength(24);
        expect(firstName).toBe(data.firstName);
        expect(lastName).toBe(data.lastName);
        expect(email).toBe(data.email);
        expect(eventDate).toBe(data.eventDate);

        done();
    })

});