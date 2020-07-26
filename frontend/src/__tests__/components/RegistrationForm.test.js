import React from 'react';
import { mount } from 'enzyme';
import { RegistrationForm } from "../../components/RegistrationForm";
import {act} from "@testing-library/react";

describe('RegistrationForm component test', () => {

    let form, props = {
        requestStatus: {
            isLoading: false,
            success: false,
            error: false
        },
        setRequestStatus: jest.fn(),
        handleSubmit: jest.fn()
    };

    beforeEach(() => {

        form = mount(<RegistrationForm {...props}/>);

    });

    // ===

    it("should render all form inputs + submit and reset button", () => {


        const firstName = form.find('input#firstName');
        const lastName = form.find('input#lastName');
        const email = form.find('input#email');
        const eventDate = form.find('input#eventDate');

        const submitButton = form.find('button[type="submit"]');
        const resetButton = form.find('button[type="reset"]');

        expect(firstName.length).toBe(1);
        expect(lastName.length).toBe(1);
        expect(email.length).toBe(1);
        expect(eventDate.length).toBe(1);

        expect(submitButton.length).toBe(1);
        expect(resetButton.length).toBe(1);

    });


    it("should show error messages on all inputs", async () => {

        await act( async () => {
            form.find('input#firstName').simulate('change', { target: { name: 'firstName', value: '' } }); // empty value
            form.find('input#lastName').simulate('change', { target: { name: 'lastName', value: '' } }); // empty value
            form.find('input#email').simulate('change', { target: { name: 'email', value: 'jan.kowalski@example' } }); // invalid email
            form.find('input#eventDate').simulate('change', { target: { name: 'eventDate', value: '2020-01-0' } }); // invalid date
        });

        form.update();

        await act( async () => {
            form.find('input#firstName').simulate('blur');
            form.find('input#lastName').simulate('blur');
            form.find('input#email').simulate('blur');
            form.find('input#eventDate').simulate('blur');
        });

        form.update();

        const invalidInputs = form.find('input.input.is-danger');
        const errorMessages = form.find('p.help.is-danger');

        expect(invalidInputs.length).toBe(4);
        expect(errorMessages.length).toBe(4);

        await act( async () => {
            // try submit incorrect values
            form.find('button[type="submit"]').simulate('click');
        });

        expect(props.handleSubmit.mock.calls.length).toBe(0);

    });

    it("should submit correct values", async () => {

        const date = new Date(Date.now() + ( 3600 * 1000 * 24));

        const values = {
            firstName: 'Jan',
            lastName: 'Kowalski',
            email: 'jan.kowalski@example.com',
            eventDate: date
        };

        await act( async () => {
            form.find('input#firstName').simulate('change', { target: { name: 'firstName', value: values.firstName } });
            form.find('input#lastName').simulate('change', { target: { name: 'lastName', value: values.lastName } });
            form.find('input#email').simulate('change', { target: { name: 'email', value: values.email } });
            form.find('input#eventDate').simulate('change', { target: { name: 'eventDate', value: values.eventDate } });
        });

        form.update();

        await act( async () => {
            form.find('input#firstName').simulate('blur');
            form.find('input#lastName').simulate('blur');
            form.find('input#email').simulate('blur');
            form.find('input#eventDate').simulate('blur');
        });

        form.update();

        const validInputs = form.find('input.input.is-success');
        expect(validInputs.length).toBe(4);

        await act( async () => {
            // try submit correct values
            form.find('button[type="submit"]').simulate('click');
        });

        expect(props.handleSubmit.mock.calls.length).toBe(1);
        expect(props.handleSubmit).toHaveBeenCalledWith(expect.objectContaining({ values: values }));

    });

});

