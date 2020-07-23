export const CREATE_EVENT_REGISTRATION_MUTATION = `mutation CreateEventRegistration($data: EventRegistrationCreateInput) {
                                                createEventRegistration(data: $data) {
                                                    id
                                                }
                                            }`;