const { gql } = require('apollo-server-express');

const typeDefs = gql`

    input EventRegistrationCreateInput {
        firstName: String!
        lastName: String!
        email: String!
        eventDate: String!
    }

    type EventRegistration {
        id: ID!
        firstName: String!
        lastName: String!
        email: String!
        eventDate: String!
    }

    type Query {
        hello: String
    }
    
    type Mutation {
        createEventRegistration(data: EventRegistrationCreateInput):  EventRegistration!
    }
`;

module.exports = typeDefs;