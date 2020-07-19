const getFormattedDate = date => date && date.toLocaleString('pl-PL', { year: 'numeric', month: '2-digit', day: '2-digit' });

const prepareDataBeforeResponse = registration => {
    const { _id: id, eventDate, ...restData } = registration;
    return {
        id: id.toString(),
        eventDate: getFormattedDate(eventDate),
        ...restData
    };
};

module.exports = { getFormattedDate, prepareDataBeforeResponse };