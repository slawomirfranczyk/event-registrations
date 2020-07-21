import React from 'react';
import { Container, Notification, Section, Hero, Heading } from 'react-bulma-components';
import { RegistrationForm } from "./components/RegistrationForm";

function App() {
  return (
      <div className="App">
          <Hero size="fullheight" style={{background: `rgba(0, 0, 0, 0.3)`}}>
                  <Notification color='success'>test notification</Notification>
                  <Hero.Body>
                      <Container>
                          <Heading className="has-text-white has-text-centered">
                              REGISTER FOR AN EVENT
                          </Heading>
                          <RegistrationForm/>
                      </Container>
                  </Hero.Body>
              </Hero>
      </div>
  );
}

export default App;
