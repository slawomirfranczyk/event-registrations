import { convertDateToString } from '../../utils';

describe('CreateEventRegistration mutation', () => {

    it('should transform valid date object to string', () => {

        const date = new Date('2020-02-02');
        const convertedDate = convertDateToString(date);

        expect(convertedDate).toBe('2020-02-02')

    });

    it('should do nothing with invalid date', () => {

        const date = new Date('2020-02-02abc');
        const convertedDate = convertDateToString(date);

        expect(convertedDate).toBe(date);

    });

});