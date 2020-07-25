const getFormattedDate = date => date && date.toLocaleString('pl-PL', { year: 'numeric', month: '2-digit', day: '2-digit' });

const prepareDataBeforeResponse = registration => {
    const { _id: id, eventDate, ...restData } = registration;
    return {
        id: id.toString(),
        eventDate: getFormattedDate(eventDate),
        ...restData
    };
};

const replaceMultipleSpaces = val => typeof val === "string" ? val.replace(/\s\s+/g, ' ').trim() : val;

module.exports = { getFormattedDate, prepareDataBeforeResponse, replaceMultipleSpaces };