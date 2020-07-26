import React from 'react';
import PropTypes from 'prop-types';
import { FormField } from "./parts/FormField";
import { Formik, Form } from 'formik'
import {
    Container,
    Columns,
    Form as BulmaForm,
    Box,
    Button
} from 'react-bulma-components';
import {callAPI, prepareDataBeforeSend} from '../utils';
import { CREATE_EVENT_REGISTRATION_MUTATION } from  '../graphQLMutations';
import * as yup from 'yup';

const { Column } = Columns;
const { Field, Control } = BulmaForm;

export const RegistrationForm = ({ requestStatus, setRequestStatus }) => {

    const { isLoading } = requestStatus;

    const inputs = [
        {
            name: 'firstName',
            label: 'First name',
            validation: yup.string().trim().required('First name is required')
        },
        {
            name: 'lastName',
            label: 'Last name',
            validation: yup.string().trim().required('Last name is required')
        },
        {
            name: 'email',
            label: 'Email',
            type: 'email',
            validation: yup.string().required('Email is required').email('Email is invalid')
        },
        {
            name: 'eventDate',
            label: 'Event date',
            type: 'date',
            validation: yup.date().required('You must select an event date')
        }
    ];

    const getValidationRules = inputs => {
      const validationRules = {};
      inputs.forEach(({ name, validation }) => { validationRules[name] = validation });
      return validationRules;
    };

    const initValues = Object.fromEntries(inputs.map(item => [ [item.name], '' ]));
    const validationSchema = yup.object().shape(getValidationRules(inputs));

    const handleResetNotification = () => {
        setTimeout(() => {
            setRequestStatus(() => ({ isLoading: false, success: false, error: false }));
        }, 4 * 1000);
    };

    return (
        <Container>
            <Columns>
                <Column className="is-half is-offset-one-quarter">
                    <Box>
                        <Formik
                            initialValues={initValues}
                            validationSchema={validationSchema}
                            onSubmit={ async (values, { resetForm }) => {

                                const valuesToSend = prepareDataBeforeSend(values);

                                try {
                                    setRequestStatus(currStatus => ({ ...currStatus, isLoading: true }));
                                    await callAPI(CREATE_EVENT_REGISTRATION_MUTATION, { data: { ...valuesToSend } });
                                    resetForm({});
                                    setRequestStatus(currStatus => ({ ...currStatus, isLoading: false, success: true }));
                                } catch (err) {
                                    setRequestStatus(currStatus => ({ ...currStatus, isLoading: false, error: true }));
                                    if (process.env.NODE_ENV === 'development') console.error(err);
                                }

                                handleResetNotification();

                            }}
                        >
                            {({ handleSubmit, handleReset }) => (
                                <Form autoComplete="off">

                                    { inputs.map(({ name, label, type }, index) => <FormField name={name} label={label} type={type} placeholder={label} key={index}/>) }

                                    <Field kind="group" className="has-text-centered is-block">
                                        <Control className="is-inline-block">
                                            <Button
                                                disabled={isLoading}
                                                type="submit"
                                                className={`is-success ${isLoading ? 'is-loading' : ''}`}
                                                onClick={handleSubmit}
                                            >
                                                Register
                                            </Button>
                                        </Control>
                                        <Control className="is-inline-block">
                                            <Button
                                                disabled={isLoading}
                                                className="is-light"
                                                onClick={handleReset}
                                            >
                                                Reset
                                            </Button>
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

RegistrationForm.propTypes = {
    requestStatus: PropTypes.exact({
        isLoading: PropTypes.bool.isRequired,
        success: PropTypes.bool.isRequired,
        error: PropTypes.bool.isRequired
    }),
    setRequestStatus: PropTypes.func.isRequired
};
