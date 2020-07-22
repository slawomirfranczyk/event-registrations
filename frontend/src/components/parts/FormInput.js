import React from 'react';
import { Form } from 'react-bulma-components';
import DatePicker from 'react-datepicker';
import { useField, useFormikContext } from 'formik';
import 'react-datepicker/dist/react-datepicker.min.css';

const { Input, Field, Control, Label, Help } = Form;

export const FormInput = ({ label, ...props }) => {

    const [field] = useField(props);
    const { setFieldValue, touched, errors, handleBlur } = useFormikContext();
    const checkIfValid = () => touched[field.name] && !errors[field.name] ? 'is-success' : '';

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
                            className={`input ${checkIfValid()}`}
                        />
                        : <Input id={field.name} {...field} {...props} className={checkIfValid()}/>
                }
            </Control>
            {/*{validationMessage && <Help color={validationMessageType}>{message}</Help>}*/}
        </Field>
    );
};