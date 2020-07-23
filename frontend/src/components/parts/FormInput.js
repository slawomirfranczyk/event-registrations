import React from 'react';
import { Form } from 'react-bulma-components';
import DatePicker from 'react-datepicker';
import { useField, useFormikContext } from 'formik';
import 'react-datepicker/dist/react-datepicker.min.css';

const { Input, Field, Control, Label, Help } = Form;

export const FormInput = ({ label, ...props }) => {

    const [field] = useField(props);
    const { setFieldValue, touched, errors, handleBlur } = useFormikContext();
    const isSuccess = touched[field.name] && !errors[field.name] ? 'is-success' : '';
    const isError = touched[field.name] && errors[field.name] ? 'is-danger' : '';
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
                            className={`input ${isError || isSuccess}`}
                        />
                        : <Input id={field.name} {...field} {...props} className={isError || isSuccess}/>
                }
            </Control>
            {!isSuccess && <Help color='danger'>{errorMessage}</Help>}
        </Field>
    );
};