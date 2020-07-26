import { prepareDataBeforeSend } from '../../utils';

describe('CreateEventRegistration mutation', () => {

    it('should transform `eventDate` field from date object to string', () => {

        const data = {
            firstName : 'Jan',
            lastName : 'Kowalski',
            email : 'jan.kowalski@example.com',
            eventDate : new Date('2020-02-25')
        };

        const processedData = prepareDataBeforeSend(data);

        expect(processedData.firstName).toBe(data.firstName);
        expect(processedData.lastName).toBe(data.lastName);
        expect(processedData.email).toBe(data.email);
        expect(processedData.eventDate).toBe('2020-02-25');

    });

});