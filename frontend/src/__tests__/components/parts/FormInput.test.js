import React from 'react';
import { FormInput } from '../../../components/parts/FormInput';
import { Formik, Form } from 'formik';
import { mount } from 'enzyme';
import { act } from "@testing-library/react";
import * as yup from 'yup';

describe('FormInput component test (text type input)', () => {

    let form, props;

    beforeEach(() => {

        const validationSchema = yup.object().shape({
            firstName: yup.string().required('First name is required!')
        });

        props = {
            name: 'firstName',
            label: 'First name',
            placeholder: 'First name',
        };

        form = mount(
            <Formik
                initialValues={{[props.name]: ''}}
                validationSchema={validationSchema}
            >
                <Form>
                    <FormInput {...props}/>
                </Form>
            </Formik>
        );

    });

    // ===

    it("should render text input with valid props", () => {

        const label = form.find('label');
        const input = form.find('input#firstName');

        // check label
        expect(label.length).toBe(1);
        expect(label.prop('htmlFor')).toBe(props.name);
        expect(label.text()).toBe(props.label);

        // check input
        expect(input.length).toBe(1);
        expect(input.prop('type')).toBe('text');
        expect(input.prop('id')).toBe(props.name);
        expect(input.prop('name')).toBe(props.name);
        expect(input.prop('value')).toBe('');
        expect(input.prop('placeholder')).toBe(props.placeholder);

    });

    it("should show error message on blur", async () => {

        await act( async () => {
            // simulate blur on empty input should show error message
            form.find('input#firstName').simulate('blur');
        });

        form.update();

        const invalidInput = form.find('input.is-danger');
        const errorMessage = form.find('p.help.is-danger');

        expect(invalidInput.length).toBe(1);
        expect(errorMessage.length).toBe(1);
        expect(errorMessage.text()).toBe('First name is required!');

    });

    it("should add 'is-success' css class to input", async () => {

        await act( async () => {
            form.find('input#firstName').simulate('change', { target: { name: 'firstName', value: 'Jan' } });
        });

        form.update();

        await act( async () => {
            form.find('input#firstName').simulate('blur');
        });

        form.update();

        const input = form.find('input#firstName');

        expect(input.prop('className')).toMatch('is-success');
        expect(input.prop('value')).toBe('Jan');

    });

});

describe('FormInput component test (date type input)', () => {

    let form, props;

    beforeEach(() => {

        const validationSchema = yup.object().shape({
            eventDate: yup.date().required('You must select an event date')
        });

        props = {
            name: 'eventDate',
            label: 'Event date',
            placeholder: 'Event date',
            type: 'date',
        };

        form = mount(
            <Formik
                initialValues={{[props.name]: ''}}
                validationSchema={validationSchema}
            >
                <Form>
                    <FormInput {...props}/>
                </Form>
            </Formik>
        );

    });

    // ===

    it("should render date input with valid props", () => {

        const label = form.find('label');
        const input = form.find('input#eventDate');

        // check label
        expect(label.length).toBe(1);
        expect(label.prop('htmlFor')).toBe(props.name);
        expect(label.text()).toBe(props.label);

        // check input
        expect(input.length).toBe(1);
        expect(input.prop('type')).toBe('text');
        expect(input.prop('id')).toBe(props.name);
        expect(input.prop('name')).toBe(props.name);
        expect(input.prop('value')).toBe('');
        expect(input.prop('placeholder')).toBe(props.placeholder);

    });

    it("should show error message on blur", async () => {

        await act( async () => {
            // simulate blur on empty input should show error message
            form.find('input#eventDate').simulate('blur');
        });

        form.update();

        const invalidInput = form.find('input.is-danger');
        const errorMessage = form.find('p.help.is-danger');

        expect(invalidInput.length).toBe(1);
        expect(errorMessage.length).toBe(1);
        expect(errorMessage.text()).toBe('You must select an event date');

    });

    it("should add 'is-success' css class to input", async () => {

        const dateString = '2020-07-31';

        await act( async () => {
            form.find('input#eventDate').simulate('change', { target: { name: 'eventDate', value: dateString } });
        });

        form.update();

        const input = form.find('input#eventDate');

        expect(input.prop('className')).toMatch('is-success');
        expect(input.prop('value')).toBe(dateString);

    });

});

