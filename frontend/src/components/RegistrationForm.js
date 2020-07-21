import React from 'react';
import { Container, Columns, Form, Level, Box, Button } from 'react-bulma-components';
const { Column } = Columns;
const { Input, Field, Control, Label, Help } = Form;

export const RegistrationForm = () => {

    return (
        <Container>
            <Columns>
                <Column className="is-half is-offset-one-quarter">
                    <Box>
                        <form>
                            <Field>
                                <Label>First name</Label>
                                <Control>
                                    <Input type='text' placeholder='test'/>
                                </Control>
                                <Help color="success">is ok</Help>
                            </Field>
                            <Field>
                                <Label>Last name</Label>
                                <Control>
                                    <Input type='text' placeholder='test'/>
                                </Control>
                                <Help color="success">is ok</Help>
                            </Field>
                            <Field>
                                <Label>Email</Label>
                                <Control>
                                    <Input type='text' placeholder='test'/>
                                </Control>
                                <Help color="success">is ok</Help>
                            </Field>
                            <Field>
                                <Label>Event date</Label>
                                <Control>
                                    <Input type='text' placeholder='test'/>
                                </Control>
                                <Help color="success">is ok</Help>
                            </Field>


                            <Field kind="group" className="has-text-centered is-block">
                                <Control className="is-inline-block">
                                    <Button className="is-success">Register</Button>
                                </Control>
                                <Control className="is-inline-block">
                                    <Button className="is-light">Reset</Button>
                                </Control>
                            </Field>
                        </form>
                    </Box>
                </Column>
            </Columns>
        </Container>
    )
};