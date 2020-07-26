import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-bulma-components';
import DatePicker from 'react-datepicker';
import { useField, useFormikContext } from 'formik';
import 'react-datepicker/dist/react-datepicker.min.css';

const { Input, Field, Control, Label, Help } = Form;

export const FormField = ({ label, ...props }) => {

    const [field] = useField(props);
    const { setFieldValue, touched, errors, handleBlur } = useFormikContext();
    const inputValidationState = touched[field.name] ? (errors[field.name] ? 'is-danger' : 'is-success') : '';
    const errorMessage = touched[field.name] && errors[field.name];

    return (
        <Field>
            <Label htmlFor={field.name}>{label}</Label>
            <Control>
                {
                    props.type === 'date'
                        ? <DatePicker
                            id={field.name}
                            {...field}
                            {...props}
                            dateFormat="yyyy-MM-dd"
                            placeholderText={props.placeholder}
                            selected={field.value}
                            onChange={val => {
                                handleBlur({ target: { name: field.name } });
                                setFieldValue(field.name, val)
                            }}
                            minDate={new Date()}
                            className={`input ${inputValidationState}`}
                        />
                        : <Input id={field.name} {...field} {...props} className={inputValidationState}/>
                }
            </Control>
            {inputValidationState === 'is-danger' && <Help color='danger'>{errorMessage}</Help>}
        </Field>
    );
};

FormField.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired
};

FormField.defaultProps = {
    type: 'text'
};