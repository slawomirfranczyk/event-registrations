const { request } = require('graphql-request');
const API_URL = 'http://localhost:4000/graphql';

const fetchAPI = (query, variables) => request(API_URL, query, variables);

module.exports = fetchAPI;