require('dotenv').config({ path: process.env.NODE_ENV === 'production' ? '.env.production' : '.env' });
const { env: { NODE_ENV, SERVER_PORT, DB_NAME } } = process;

const { ApolloServer, gql } = require('apollo-server-express');
const express = require('express');
const mongoose = require('mongoose');
const app = express();

const typeDefs = gql`
    type Query {
        hello: String
    }
`;

const resolvers = {
  Query: {
      hello: () => 'Hello world!'
  }
};

( async () => {

    const mongooseOptions = { useNewUrlParser: true, useUnifiedTopology: true };
    await mongoose.connect(`mongodb://localhost/${DB_NAME}`, mongooseOptions);

    const server = new ApolloServer({
        typeDefs,
        resolvers
    });

    server.applyMiddleware({ app });

    app.listen({ port: SERVER_PORT }, () => {
        if ( NODE_ENV !== 'production' ) {
            console.log(`Yeah! Server ready at http://localhost:${SERVER_PORT}`);
            console.log(`GraphQL Playground at http://localhost:${SERVER_PORT}/graphql`);
        }
    });

})();
