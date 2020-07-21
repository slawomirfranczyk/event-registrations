import React from 'react';
import { Form } from 'react-bulma-components';
import { useField } from 'formik';
const { Input, Field, Control, Label, Help } = Form;

export const FormInput = ({ label, ...props }) => {

    const [field, meta] = useField(props);
    const { touched, error } = meta; //todo display validation message

    return (
        <Field>
            <Label htmlFor={field.name}>{label}</Label>
            <Control>
                <Input id={field.name} {...field} {...props} className=""/>
            </Control>
            {/*{validationMessage && <Help color={validationMessageType}>{message}</Help>}*/}
        </Field>
    );
};