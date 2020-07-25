const { Types: { ObjectId } } = require('mongoose');
const { getFormattedDate, prepareDataBeforeResponse, replaceMultipleSpaces } = require('./../utils');

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


describe('utils function replaceMultipleSpaces', () => {

    it("should remove multiple spaces and trim string", () => {

        const value = '   Najkrótszy    dowcip   programistyczny:  "Już   prawie  skończyłem"';
        const processedValue = replaceMultipleSpaces(value);

        expect(processedValue).toBe('Najkrótszy dowcip programistyczny: "Już prawie skończyłem"');

    });

    it("should do nothing if value type is not a string or if string is empty", () => {

        const value1 = '';
        const value2 = null;
        const value3 = { key: 'value' };

        const processedValue1 = replaceMultipleSpaces(value1);
        const processedValue2 = replaceMultipleSpaces(value2);
        const processedValue3 = replaceMultipleSpaces(value3);

        expect(processedValue1).toBe(value1);
        expect(processedValue2).toBe(value2);
        expect(processedValue3).toBe(value3);

    });

});