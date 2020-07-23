import { request } from 'graphql-request'

export const prepareDataBeforeSend = values => ({ ...values, eventDate: values.eventDate.toISOString().toString().replace(/T.+/,'') });

export const callAPI = (query, variables) => request('http://localhost:4000/graphql', query, variables);