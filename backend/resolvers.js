const EventRegistration = require('./models/EventRegistration');
const { prepareDataBeforeResponse } = require('./utils');

const resolvers = {
    Query: {
        hello: () => 'Hello world!'
    },
    Mutation: {
        createEventRegistration: async (_, {data}) => {

            const registration = await EventRegistration.create({...data}).then(item => item.toObject());
            return prepareDataBeforeResponse(registration);

        }
    }
};

module.exports = resolvers;