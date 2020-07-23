import React, { useState } from 'react';
import { Container, Notification, Section, Hero, Heading } from 'react-bulma-components';
import { RegistrationForm } from "./components/RegistrationForm";

function App() {

    const [requestStatus, setRequestStatus] = useState({
        isLoading: false,
        success: false,
        error: false
    });

    const successMessage = 'Yeah! You have been successfully registered for the event!';
    const errorMessage = 'Oh no! Something went wrong. Please try again later.';
    const getNotificationMessage = ({ isLoading, success, error } = {}) => (!isLoading && success && successMessage) || (!isLoading && error && errorMessage);
    const getNotificationType = ({ isLoading, success, error } = {}) => (!isLoading && success && 'success') || (!isLoading && error && 'danger');

    const registrationFormProps = { requestStatus, setRequestStatus };

    return (
        <div className="App">
            <Hero size="fullheight" style={{background: `rgba(0, 0, 0, 0.3)`}}>
                {
                    getNotificationType(requestStatus) &&
                    <Notification color={getNotificationType(requestStatus)} className="mx-3 my-3">
                        {getNotificationMessage(requestStatus)}
                    </Notification>
                }
                <Hero.Body>
                    <Container>
                        <Heading className="has-text-white has-text-centered">
                            REGISTER FOR AN EVENT
                        </Heading>
                        <RegistrationForm {...registrationFormProps}/>
                    </Container>
                </Hero.Body>
            </Hero>
        </div>
    );
}

export default App;
