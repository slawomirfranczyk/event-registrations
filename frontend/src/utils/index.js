import { request } from 'graphql-request'

const { REACT_APP_API_URL } = process.env;
export const callAPI = (query, variables) => request(REACT_APP_API_URL, query, variables);

export const convertDateToString = date => date.toString() === 'Invalid Date' ? date : date.toLocaleString('pl-PL', { year: 'numeric', month: '2-digit', day: '2-digit' });

