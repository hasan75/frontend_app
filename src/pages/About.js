import React from 'react';
import { Container } from 'react-bootstrap';
import AboutPageService from '../components/AboutPageService/AboutPageService';
import Banner from '../components/Banner/Banner';
import VideoCOmponent from '../components/VideoCOmponent/VideoCOmponent';

const About = () => {
  return (
    <section className='my-3'>
      <Container>
        <Banner></Banner>
        <AboutPageService />
      </Container>
    </section>
  );
};

export default About;
