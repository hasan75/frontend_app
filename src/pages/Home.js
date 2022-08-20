import React from 'react';
import { Col, Container, Row, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Product from '../components/Product.js';
import Slider from '../components/Slider.js';
import useProducts from '../hooks/useProducts.js';
import useStoryBlogs from '../hooks/useStoryBlogs.js';
import './../assets/css/home.css';

import lalbag from './../assets/images/lalbag.jpg';
import kaptai from './../assets/images/kaptai-lake.jpg';
import moynamoti from './../assets/images/Moynamoti.jpg';
import sajek from './../assets/images/sajek.jpg';

// import Bounce from 'react-reveal/Bounce';
import Testimonials from '../components/Testimonials.js';
import VideoCOmponent from '../components/VideoCOmponent/VideoCOmponent.js';
import TravelBlog from '../components/TravelBlog/TravelBlog.js';
import SingleStory from '../components/SingleStory/SingleStory.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  faMapLocationDot,
  faHandHoldingDollar,
  faEarthOceania,
  faMountainSun,
} from '@fortawesome/free-solid-svg-icons';
import Contact from '../components/Contact/Contact.js';

const Home = () => {
  const products = useProducts();
  const blogs = useStoryBlogs();
  return (
    <div>
      <Slider />
      <Container className='mb-4'>
        <Row>
          <Col className='mb-2' xs={12} md={6} lg={3}>
            <div className='imgHolder'>
              <img className='img-fluid' src={lalbag} alt='' />
            </div>
          </Col>
          <Col className='mb-2' xs={12} md={6} lg={3}>
            <div className='imgHolder'>
              <img className='img-fluid' src={kaptai} alt='' />
            </div>
          </Col>
          <Col className='mb-2' xs={12} md={6} lg={3}>
            <div className='imgHolder'>
              <img className='img-fluid' src={moynamoti} alt='' />
            </div>
          </Col>
          <Col className='mb-2' xs={12} md={6} lg={3}>
            <div className='imgHolder'>
              <img className='img-fluid' src={sajek} alt='' />
            </div>
          </Col>
        </Row>
      </Container>
      <Container className='collections my-5 mx-auto'>
        {/* <Bounce bottom cascade> */}
        <h2 className='text-center feature'>Why Choose Us?</h2>
        {/* </Bounce> */}
        <p
          style={{ maxWidth: '650px' }}
          className='text-center mb-4 pt-2 mx-auto mt-3'
        >
          {/* <Bounce> */}
          Baundule is a eco-friendly and one of the most experienced tourism
          management group of Bangladesh.
          {/* </Bounce> */}
        </p>
        <Row className='mx-0 g-2'>
          <Col className='my-2 ms-0' xs={12} md={6} lg={3}>
            <div className='d-flex align-items-center justify-content-center flex-column'>
              <div className='iconContainer mb-2'>
                <FontAwesomeIcon
                  icon={faMapLocationDot}
                  size='3x'
                  className='mapIcon'
                />
              </div>
              <h4 className=''>Diverse Destinations</h4>
              <span className='text-center mx-2'>
                We have a widely range of citys, tourist spots to explore
                around.
              </span>
            </div>
          </Col>
          <Col className='my-2 ms-0' xs={12} md={6} lg={3}>
            <div className='d-flex align-items-center justify-content-center flex-column'>
              <div className='iconContainer mb-2'>
                <FontAwesomeIcon
                  icon={faHandHoldingDollar}
                  size='3x'
                  className='mapIcon'
                />
              </div>
              <h4 className=''>Value for Money</h4>
              <span className='text-center mx-2'>
                Safe travel and comfortable travelling with bearable costs.
              </span>
            </div>
          </Col>
          <Col className='my-2 ms-0' xs={12} md={6} lg={3}>
            <div className='d-flex align-items-center justify-content-center flex-column'>
              <div className='iconContainer mb-2'>
                <FontAwesomeIcon
                  icon={faEarthOceania}
                  size='3x'
                  className='mapIcon'
                />
              </div>
              <h4 className=''>Beautiful Places</h4>
              <span className='text-center mx-2'>
                We have a widely range of citys, tourist spots to explore
                around.
              </span>
            </div>
          </Col>
          <Col className='my-2 ms-0' xs={12} md={6} lg={3}>
            <div className='d-flex align-items-center justify-content-center flex-column'>
              <div className='iconContainer mb-2'>
                <FontAwesomeIcon
                  icon={faMountainSun}
                  size='3x'
                  className='mapIcon'
                />
              </div>
              <h4 className=''>Passionate Travel</h4>
              <span className='text-center mx-2'>
                We have a widely range of passionate hosts, guide to guide you.
              </span>
            </div>
          </Col>
        </Row>
      </Container>
      <Container>
        {/* <Bounce bottom cascade> */}
        <h2 className='text-center feature textPackage'>
          Some of Our Packages
        </h2>
        <p style={{ maxWidth: '650px' }} className='text-center mx-auto mt-3'>
          {' '}
          Our Tour packages are very well maintained where you can enjoy and
          learn with a great numbers of package lists.
        </p>
        {/* </Bounce> */}
        {!products.length ? (
          <div className='text-center my-5 private-spinner py-5'>
            <Spinner variant='danger' animation='border' role='status'>
              <span className='visually-hidden'>Loading...</span>
            </Spinner>
            <h6>Loading...</h6>
          </div>
        ) : (
          <Row>
            {products?.slice(2, 8)?.map((product) => (
              <Product key={product._id} product={product} />
            ))}
          </Row>
        )}
        <div className='text-center'>
          <Link to='/products'>
            <button className='btn btn-primary mb-5 mt-3'>
              Explore All Packages
            </button>
          </Link>
        </div>
      </Container>
      <section classsName='videoContent my-5'>
        <Container>
          <VideoCOmponent></VideoCOmponent>
        </Container>
      </section>
      <Container mt={3}>
        {/* <Bounce bottom cascade> */}
        <h2 className='text-center feature'>Traveller's Story</h2>
        <p style={{ maxWidth: '650px' }} className='text-center mx-auto mt-3'>
          {' '}
          A great memory shouldn't be forgotten. Some of the finest writings are
          here to entertain your soul.
        </p>
        {/* </Bounce> */}
        {!blogs.length ? (
          <div className='text-center my-5 private-spinner py-5'>
            <Spinner variant='danger' animation='border' role='status'>
              <span className='visually-hidden'>Loading...</span>
            </Spinner>
            <h6>Loading...</h6>
          </div>
        ) : (
          <Row>
            {blogs?.slice(0, 2)?.map((singledata) => (
              <SingleStory key={singledata._id} singledata={singledata} />
            ))}
          </Row>
        )}
        <div className='text-center'>
          <Link to='/blogs'>
            <button className='btn btn-primary mb-5 mt-3'>
              Explore All Blogs
            </button>
          </Link>
        </div>
      </Container>
      <Testimonials />
      <Contact />
    </div>
  );
};

export default Home;
