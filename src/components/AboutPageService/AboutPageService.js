import React from 'react';
import './AboutPageService.css';
import weather from '../../assets/images/about/satellite.png';
import local from '../../assets/images/about/local.png';
import flight from '../../assets/images/about/plane.png';
import customize from '../../assets/images/about/customize.png';

const AboutPageService = () => {
  return (
    <div className='mb-5 pb-5'>
      <div className='services py-4 my-2'>
        <h4 className='text-center text-uppercase'>We Offer Best Services</h4>
      </div>
      <div className='row g-4'>
        <div className='col-12 col-md-6 col-lg-3'>
          <div className='aboutService text-center px-4 shadow py-2 bg-body rounded'>
            <img src={weather} alt='' className='imgAbout' />
            <h5>Calculated Weather</h5>
            <span>
              Built Wicket longer admire to barton vanity itself do in
            </span>
          </div>
        </div>
        <div className='col-12 col-md-6 col-lg-3'>
          <div className='aboutService text-center px-4 shadow py-2 bg-body rounded'>
            <img src={flight} alt='' className='imgAbout' />
            <h5>Best Flights</h5>
            <span>
              We offer you the best air flights,seats and other facilities.
            </span>
          </div>
        </div>
        <div className='col-12 col-md-6 col-lg-3'>
          <div className='aboutService text-center px-4 shadow py-2 bg-body rounded'>
            <img src={local} alt='' className='imgAbout' />
            <h5>Local Events</h5>
            <span>
              Our experties are in local events. You will feel like home with
              us.
            </span>
          </div>
        </div>
        <div className='col-12 col-md-6 col-lg-3'>
          <div className='aboutService text-center px-4 shadow py-2 bg-body rounded'>
            <img src={customize} alt='' className='imgAbout' />
            <h5>Customization</h5>
            <span>
              All of our packages are highly customizable to match with your
              groups and other circumstances.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPageService;
