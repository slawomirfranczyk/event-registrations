require('dotenv').config({ path: process.env.NODE_ENV === 'production' ? '.env.production' : '.env' });
const { NODE_ENV, PORT, MONGODB_URI } = process.env;

const { ApolloServer } = require('apollo-server-express');
const express = require('express');
const mongoose = require('mongoose');
const app = express();

const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');

( async () => {

    try {
        const mongooseOptions = { useNewUrlParser: true, useUnifiedTopology: true };
        await mongoose.connect(MONGODB_URI, mongooseOptions);
    } catch (err) {
        return console.error(err);
    }

    const server = new ApolloServer({
        typeDefs,
        resolvers,
        playground: NODE_ENV !== 'production',
        formatError: (err) => {
            // Don't give the specific errors to the client on production
            if (err && NODE_ENV === 'production') return new Error(err.message);
            return err;
        },
    });

    server.applyMiddleware({ app });

    app.listen({ port: PORT }, () => {
        if ( NODE_ENV === 'production' ) {
            console.log(`Yeah! Server ready at port: ${PORT}`);
        } else {
            console.log(`Yeah! Server ready at http://localhost:${PORT}`);
            console.log(`GraphQL Playground at http://localhost:${PORT}/${server.graphqlPath}`);
        }
    });

})();

module.exports = { app };
