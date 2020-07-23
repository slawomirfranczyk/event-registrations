import React from 'react';
import { FormInput } from "./parts/FormInput";
import { Formik, Form } from 'formik'
import {
    Container,
    Columns,
    Form as BulmaForm,
    Level, Box, Button
} from 'react-bulma-components';
import {callAPI, prepareDataBeforeSend} from '../utils';
import { CREATE_EVENT_REGISTRATION_MUTATION } from  '../graphQLMutations';

const { Column } = Columns;
const { Field, Control } = BulmaForm;

export const RegistrationForm = () => {

    const inputs = [
        { name: 'firstName', label: 'First name' },
        { name: 'lastName', label: 'Last name' },
        { name: 'email', label: 'Email', type: 'email' },
        { name: 'eventDate', label: 'Event date', type: 'date' },
    ];

    const initValues = Object.fromEntries(inputs.map(item => [ [item.name], '' ]));

    return (
        <Container>
            <Columns>
                <Column className="is-half is-offset-one-quarter">
                    <Box>
                        <Formik
                            enableReinitialize={true}
                            initialValues={initValues}
                            // todo with Yup
                            // validationSchema={validationSchema}
                            onSubmit={ async  values => {

                                const valuesToSend = prepareDataBeforeSend(values);

                                try {
                                    await callAPI(CREATE_EVENT_REGISTRATION_MUTATION, { data: { ...valuesToSend } });
                                    console.log('success!');
                                } catch (err) {
                                    console.error('Oh no!', err);
                                }

                            }}
                        >
                            {({ handleSubmit, handleReset }) => (
                                <Form autoComplete="off">
                                    { inputs.map(({ name, label, type }, index) => <FormInput name={name} label={label} type={type} placeholder={label} key={index}/>) }

                                    <Field kind="group" className="has-text-centered is-block">
                                        <Control className="is-inline-block">
                                            <Button className="is-success is-focused" onClick={handleSubmit}>Register</Button>
                                        </Control>
                                        <Control className="is-inline-block">
                                            <Button className="is-light is-focused" onClick={handleReset}>Reset</Button>
                                        </Control>
                                    </Field>

                                </Form>
                            )}
                        </Formik>
                    </Box>
                </Column>
            </Columns>
        </Container>
    )
};
