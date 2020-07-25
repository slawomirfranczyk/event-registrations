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

describe('CreateEventRegistration mutation', () => {

    it("should add new event registration", async done => {

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
    });

    it("should replace multiple spaces and trim event registration data", async done => {

        const data = {
            firstName: '  Jan    Adam ',
            lastName: '  Kowalski ',
            email: ' jan.kowalski@example.com  ',
            eventDate: '    2020-07-01 '
        };

        const { createEventRegistration: { id, firstName, lastName, email, eventDate } = {} } = await fetchAPI(createEventRegistrationMutation, { data });

        expect(id).toHaveLength(24);
        expect(firstName).toBe('Jan Adam');
        expect(lastName).toBe('Kowalski');
        expect(email).toBe('jan.kowalski@example.com');
        expect(eventDate).toBe('2020-07-01');

        done();
    });

    it("should not add registration with empty values", async done => {

        const data = {
            firstName: '',
            lastName: '',
            email: '',
            eventDate: ''
        };

        try {
            await fetchAPI(createEventRegistrationMutation, { data });
            done('registration with empty values added');
        } catch (err) {
            const { response: { errors } = {} } = err;
            const [graphQLError] = errors || [];

            expect(errors && errors.length).toBe(1);
            expect(graphQLError.message).toMatch('Path `firstName` (``) is shorter than the minimum allowed length (1)');
            expect(graphQLError.message).toMatch('Path `lastName` (``) is shorter than the minimum allowed length (1)');
            expect(graphQLError.message).toMatch('Path `email` (``) is not a valid email!');
            expect(graphQLError.message).toMatch('Cast to date failed for value "Invalid Date" at path "eventDate"');

            done();
        }
    });

    it("should not add registration with invalid email", async done => {

        const data = {
            firstName: 'Jan',
            lastName: 'Kowalski',
            email: 'jan.kowalski@example',
            eventDate: '2020-07-01'
        };

        try {
            await fetchAPI(createEventRegistrationMutation, { data });
            done('registration with invalid email added');
        } catch (err) {
            const { response: { errors } = {} } = err;
            const [graphQLError] = errors || [];

            expect(errors && errors.length).toBe(1);
            expect(graphQLError.message).toMatch('Path `email` (`jan.kowalski@example`) is not a valid email!');

            done();
        }
    });

    it("should not add registration with invalid event date", async done => {

        const data = {
            firstName: 'Jan',
            lastName: 'Kowalski',
            email: 'jan.kowalski@example.com',
            eventDate: '2020-07-21abc'
        };

        try {
            await fetchAPI(createEventRegistrationMutation, { data });
            done('registration with invalid event date added');
        } catch (err) {
            const { response: { errors } = {} } = err;
            const [graphQLError] = errors || [];

            expect(errors && errors.length).toBe(1);
            expect(graphQLError.message).toMatch('Cast to date failed for value "Invalid Date" at path "eventDate"');

            done();
        }
    });

});