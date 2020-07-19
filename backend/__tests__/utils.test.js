const { Types: { ObjectId } } = require('mongoose');
const { getFormattedDate, prepareDataBeforeResponse } = require('./../utils');

describe('utils function getFormattedDate', () => {

    it("should format date", () => {

        const dateString = '2020-07-31';
        const date = new Date(dateString);
        const formattedDate = getFormattedDate(date);
        expect(formattedDate).toBe(dateString);

    });

    it("should return 'Invalid Date' error", () => {

        const dateString = '0000-00-00';
        const date = new Date(dateString);
        const formattedDate = getFormattedDate(date);
        expect(formattedDate).toBe('Invalid Date');

    });

    it("should do nothing with falsy value", () => {

        const formattedDate = getFormattedDate(null);
        expect(formattedDate).toBeNull();

    });

});

describe('utils function prepareDataBeforeResponse', () => {

    it("should format data", () => {

        const data = {
            "_id" : ObjectId("5f14709525345b2b6c1eb4e5"),
            "firstName" : "Jan",
            "lastName" : "Kowalski",
            "email" : "jan.kowalski@example.com",
            "eventDate" : new Date("2020-07-01T00:00:00.000Z"),
            "__v" : 0
        };

        const { _id, id, firstName, lastName, email, eventDate } = prepareDataBeforeResponse(data);

        expect(_id).toBe(undefined);
        expect(id).toBe('5f14709525345b2b6c1eb4e5');
        expect(firstName).toBe('Jan');
        expect(lastName).toBe('Kowalski');
        expect(email).toBe('jan.kowalski@example.com');
        expect(eventDate).toBe('2020-07-01');

    });

});