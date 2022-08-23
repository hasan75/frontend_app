import React from 'react';
import { Container } from 'react-bootstrap';
import AboutPageService from '../components/AboutPageService/AboutPageService';
import Banner from '../components/Banner/Banner';
import Contact from '../components/Contact/Contact';

const About = () => {
  return (
    <section className='my-3'>
      <Container>
        <Banner></Banner>
        <AboutPageService />
        <section className='mt-4'>
          <Contact />
        </section>
      </Container>
    </section>
  );
};

export default About;
