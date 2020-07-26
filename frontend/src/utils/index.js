import { request } from 'graphql-request'

export const callAPI = (query, variables) => request('http://localhost:4000/graphql', query, variables);

export const convertDateToString = date => date.toString() === 'Invalid Date' ? date : date.toLocaleString('pl-PL', { year: 'numeric', month: '2-digit', day: '2-digit' });

