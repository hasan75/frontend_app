import React from 'react';
import contactNow from '../assets/images/contact.png';
import { Col, Container, Row } from 'react-bootstrap';
import '../assets/css/footer.css';
import Zoom from 'react-reveal/Zoom';

const Footer = () => {
  return (
    <>
      <div className='footer-top pb-4'>
        <Container>
          <Row>
            <Col sm={12} md={6} lg={4}>
              <Zoom>
                <h4 className='col-title'>Want to get updates?</h4>
                <h5 className='text-muted'>Sign up for our Newsletter</h5>
                <form className='d-flex w-75'>
                  <input
                    placeholder='Enter your email'
                    className='form-control rounded-0'
                    type='text'
                  />
                  <button className='btn rounded-0 btn-success'>Subs</button>
                </form>
                <h5 className='text-muted mt-4'>Follow us on</h5>
                <div>
                  <ul className='social-icons'>
                    <li>
                      <a href='/home'>
                        <i className='fab fa-youtube'></i>
                      </a>
                    </li>
                    <li>
                      <a href='/home'>
                        <i className='fab fa-facebook-square'></i>
                      </a>
                    </li>
                    <li>
                      <a href='/home'>
                        <i className='fab fa-instagram'></i>
                      </a>
                    </li>
                    <li>
                      <a href='/home'>
                        <i className='fab fa-twitter-square'></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </Zoom>
            </Col>
            {/* <Col sm={12} md={6} lg={3}>
              <Zoom>
                <h4 className='col-title'>INFORMATION</h4>
                <ul className='information'>
                  <li>
                    <a href='/home'>Online Payments</a>
                  </li>
                  <li>
                    <a href='/home'>TERMS & CONDITIONS</a>
                  </li>
                  <li>
                    <a href='/home'>Baundule</a>
                  </li>
                  <li>
                    <a href='/home'>Career</a>
                  </li>
                  <li>
                    <a href='/home'>Privacy Policy</a>
                  </li>
                  <li>
                    <a href='/home'>Refund Policy</a>
                  </li>
                </ul>
              </Zoom>
            </Col> */}

            <Col sm={12} md={6} lg={4}>
              <Zoom>
                <div className='text-center'>
                  <h4 className='col-title'>CUSTOMER SERVICE</h4>
                  <ul className='information'>
                    <li>
                      <a href='/home'>FAQs</a>
                    </li>
                    <li>
                      <a href='/home'>Baundule</a>
                    </li>
                    <li>
                      <a href='/home'>Store Locator</a>
                    </li>
                    <li>
                      <a href='/home'>All About Baundule</a>
                    </li>
                    <li>
                      <a href='/home'>Contact Info</a>
                    </li>
                    <li>
                      <a href='/products'>Packages</a>
                    </li>
                  </ul>
                </div>
              </Zoom>
            </Col>
            <Col sm={12} md={6} lg={4}>
              <Zoom>
                <div className='text-center'>
                  <h4 className='col-title'>Reach us</h4>
                  <div className='text-center'>
                    <img width='90px' src={contactNow} alt='' className='' />
                  </div>
                  <ul className='information contact-info'>
                    <li>
                      <i className='fas fa-map-marker-alt'></i>
                      Bongshal Mor, BUET Palashi Cattar, Dhaka
                    </li>
                    <li>
                      <i className='fas fa-envelope'></i>
                      Email: info@baundule.bd
                    </li>
                    <li>
                      <i className='fas fa-phone'></i>
                      Helpline: +8801631899938
                    </li>
                  </ul>
                </div>
              </Zoom>
            </Col>
          </Row>
        </Container>
      </div>
      <div className='footer'>
        <p className='text-center'>
          {' '}
          <span className='text-warning fw-bold'> &copy; Baundule</span>
        </p>
      </div>
    </>
  );
};

export default Footer;
