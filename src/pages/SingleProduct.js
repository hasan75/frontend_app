import { Button } from 'bootstrap';
import '../assets/css/singleProduct.css';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useHistory } from 'react-router';
import singleServiceStyle from '../assets/css/singleService.module.css';
import useContexts from '../hooks/useContexts';
import { useForm } from 'react-hook-form';
import Rating from 'react-rating';
import SingleReviews from '../components/SingleReviews';
import { useLocation } from 'react-router-dom';
import useBookings from '../hooks/useBookings';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowPointer,
  faCircleCheck,
  faCircleXmark,
  faRectangleXmark,
  faThumbsUp,
  faTriangleExclamation,
} from '@fortawesome/free-solid-svg-icons';

const SingleProduct = () => {
  const { id } = useParams();
  const [service, setService] = useState({});
  const [reviews, setReviews] = useState([]);

  // const location = useLocation();

  const [rating, setRating] = useState(5);
  const { displayName, email, photoURL } = useContexts();
  const { register, handleSubmit, reset } = useForm();
  const [bookings] = useBookings();

  useEffect(() => {
    fetch(`http://localhost:5001/products/${id}`)
      .then((res) => res.json())
      .then((data) => setService(data));
  }, [id]);

  useEffect(() => {
    fetch('http://localhost:5001/reviews')
      .then((res) => res.json())
      .then((data) => setReviews(data));
  }, []);

  // console.log(reviews);

  // const findOne = () => {
  //   const matchedReviewbyIdandEmail = reviews?.find(
  //     (r) => r.email === email && r.packageId === id
  //   );
  // }
  // findOne();
  // reviews?.find(
  //   (review) => review.email === email && review?.packageId === id
  // );

  const matchedReviewbyIdandEmail = reviews?.find(
    (review) => review.email === email && review?.packageId === id
  );

  const discoutPrice = Math.round(
    parseInt(service?.price) -
      parseInt(service?.price) * (parseInt(service?.discount) / 100)
  );

  // review section

  const onSubmit = (data) => {
    data.img = photoURL || 'https://i.ibb.co/5GzXkwq/user.png';
    data.email = email;
    data.rating = rating;
    data.packageId = id;

    Swal.fire({
      icon: 'warning',
      title: 'Do you want to rate?',
      showCancelButton: true,
      confirmButtonText: 'Yes',
    }).then((result) => {
      if (result.isConfirmed) {
        fetch('http://localhost:5001/addReview', {
          method: 'post',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify(data),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.insertedId) {
              reset();
              Swal.fire('Publish on review section!', '', 'success');
              window.location.reload();
            }
          });
      }
    });

    reset();
  };

  const packageBookings = bookings.filter(
    (booking) => booking.title === service.title
  );
  const availableSeats = service?.member - packageBookings.length;

  let todayDate = new Date();
  const eventDate = new Date(service.tour_date);
  const pastEvent = todayDate >= eventDate;

  return (
    <div className='container my-2 py-2'>
      <h1 className='py-3 text-secondary fw-bold'>
        <span>{service?.title}</span>
      </h1>
      <div
        className={`${singleServiceStyle.textOrange} d-flex align-items-center `}
      >
        <h5 className='me-3'>{service?.destination}</h5>
        <h5 className='ms-2 me-3'>{service?.tour_date}</h5>
        <h5 className='ms-2'>{service?.start_time} PM</h5>
      </div>
      <section className='tourImage mt-3'>
        <img
          src={service?.img}
          alt='sundarban_img'
          className={`${singleServiceStyle.singlePicture} img-fluid w-100`}
        />
        <div className={`${singleServiceStyle.details} row mx-2`}>
          <div className='col-2'>
            <div
              className={`${singleServiceStyle.serviceInfo} d-flex align-items-center justify-content-center flex-column`}
            >
              <h6 className=''>Available Seats</h6>
              <h6 className={`${singleServiceStyle.textDetail}`}>
                {availableSeats}
              </h6>
            </div>
          </div>
          <div className='col-2'>
            <div
              className={`${singleServiceStyle.serviceInfo} d-flex align-items-center justify-content-center flex-column`}
            >
              <h6 className=''>Event Date</h6>
              <h6 className={`${singleServiceStyle.textDetail}`}>
                {service?.tour_date}
              </h6>
            </div>
          </div>
          <div className='col-2'>
            <div
              className={`${singleServiceStyle.serviceInfo} d-flex align-items-center justify-content-center flex-column`}
            >
              <h6 className=''>Regular Price</h6>
              <h6 className={`${singleServiceStyle.textDetail}`}>
                {service?.price}
              </h6>
            </div>
          </div>
          <div className='col-2'>
            <div
              className={`${singleServiceStyle.serviceInfo} d-flex align-items-center justify-content-center flex-column`}
            >
              <h6 className=''>Discount</h6>
              <h6 className={`${singleServiceStyle.textDetail}`}>
                {service?.discount} %
              </h6>
            </div>
          </div>
          <div className='col-2'>
            <div
              className={`${singleServiceStyle.serviceInfo} d-flex align-items-center justify-content-center flex-column`}
            >
              <h6 className=''>Final Cost</h6>
              <h6 className={`${singleServiceStyle.textDetail}`}>
                {discoutPrice}
              </h6>
            </div>
          </div>
          <div className='col-2'>
            <div
              className={`${singleServiceStyle.serviceInfo} d-flex align-items-center justify-content-center flex-column`}
            >
              <h6 className=''>Tour Members</h6>
              <h6 className={`${singleServiceStyle.textDetail}`}>
                {service?.member}
              </h6>
            </div>
          </div>
        </div>
      </section>
      <section className=' px-5 mx-3 my-3 rounded'>
        <div className='row'>
          <div className='col-md-6 my-4'>
            <div className={`${singleServiceStyle.tourDetails}`}>
              <h4 className='text-start text-success fw-bold'>Tour Details</h4>
              <p className='fw-bold'>{service?.desc}</p>
              <h5 className='text-secondary fw-bold my-2 pt-3'>
                Read the points below before you book your package
              </h5>
              <ul className='list-group my-2 py-3'>
                <li className='list-group-item d-flex'>
                  <span className='text-success me-2'>
                    <FontAwesomeIcon icon={faCircleCheck} size='xl' />
                  </span>{' '}
                  <span>
                    Every Tour consists of minimum 15 people, so you have to be
                    with a group
                  </span>
                </li>
                <li className='list-group-item d-flex'>
                  <span className='text-success me-2'>
                    <FontAwesomeIcon icon={faCircleCheck} size='xl' />
                  </span>
                  <span>
                    No Extra Costs like snacks, cigarette, extra food, extra
                    guide will be beared by host.
                  </span>
                </li>
                <li className='list-group-item d-flex'>
                  <span className='text-success me-2'>
                    <FontAwesomeIcon icon={faCircleCheck} size='xl' />
                  </span>
                  <span>Members have to listen to the host's dicision</span>
                </li>
                <li className='list-group-item d-flex'>
                  <span className='text-success me-2'>
                    <FontAwesomeIcon icon={faCircleCheck} size='xl' />
                  </span>
                  <span>
                    Your guide or host won't be the person which will carry your
                    belongings.
                  </span>
                </li>
                <li className='list-group-item d-flex'>
                  <span className='text-danger me-2'>
                    <FontAwesomeIcon icon={faCircleXmark} size='xl' />
                  </span>
                  <span>
                    Drugs, Alcohol, Any kind of deadly weapons like guns, knife.
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <div className='col-md-6 my-4'>
            <div className={`${singleServiceStyle.tourDetails}`}>
              <h4 className='text-start text-success fw-bold'>
                Benefits with Baundule
              </h4>
              <p className='fw-bold'>
                In order to help explain the undeniable benefits of using a
                travel agent to book your future travel, I’ve partnered with Abu
                Bakar Siddique, owner of Baundule.
              </p>
              <ul className='list-group my-2 py-3'>
                <li className='list-group-item d-flex'>
                  <span className={`${singleServiceStyle.thumbs} text-success`}>
                    <FontAwesomeIcon icon={faThumbsUp} size='xl' />
                  </span>
                  <span className='ms-2'>
                    The #1 benefit of using Baundule when it comes to booking
                    your family travel is because travel is our expertise.
                  </span>
                </li>
                <li className='list-group-item d-flex'>
                  <span className={`${singleServiceStyle.thumbs} text-success`}>
                    <FontAwesomeIcon icon={faThumbsUp} size='xl' />
                  </span>
                  <span className='ms-2'>
                    We, the hosts of Baundule have the greatest Destination
                    knowledge.
                  </span>
                </li>
                <li className='list-group-item d-flex'>
                  <span className={`${singleServiceStyle.thumbs} text-success`}>
                    <FontAwesomeIcon icon={faThumbsUp} size='xl' />
                  </span>
                  <span className='ms-2'>
                    that travelers do not pay more for vacations because
                    Baundule is always with you.
                  </span>
                </li>
                <li className='list-group-item d-flex'>
                  <span className={`${singleServiceStyle.thumbs} text-success`}>
                    <FontAwesomeIcon icon={faThumbsUp} size='xl' />
                  </span>
                  <span className='ms-2'>
                    The relationship you’ll form with your Baundule host, as
                    well as their relationships with other hosts, are two of the
                    benefits of using Baundule as your travel partner.
                  </span>
                </li>
                <li className='list-group-item d-flex'>
                  <span className={`${singleServiceStyle.thumbs} text-success`}>
                    <FontAwesomeIcon icon={faThumbsUp} size='xl' />
                  </span>
                  <span className='ms-2'>
                    Our Hosts will be the best assistance to you in your trip.
                    They will assist you anywhere, anyhow!
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      {/* book button  */}
      <div className='my-3 text-center'>
        {pastEvent ? (
          <>
            <div className='textAreaForMessage'>
              <div className='d-flex align-items-center justify-content-center flex-column'>
                <span className='text-danger'>
                  <FontAwesomeIcon icon={faTriangleExclamation} size='4x' />
                </span>
                <h4 className='text-danger'>
                  Sorry, This Event is a past event
                </h4>
              </div>
            </div>
          </>
        ) : availableSeats < 1 ? (
          <>
            <div className='textAreaForMessage'>
              <div className='d-flex align-items-center justify-content-center flex-column'>
                <span className='text-danger'>
                  <FontAwesomeIcon icon={faTriangleExclamation} size='4x' />
                </span>
                <h4 className='text-danger'>
                  Sorry, No Seats Available in this event!
                </h4>
              </div>
            </div>
          </>
        ) : (
          ''
        )}
        {pastEvent || availableSeats < 1 ? (
          <button className='btn btn-secondary opacity-25 bookButton' disabled>
            <span className='me-2 text-danger'>
              <FontAwesomeIcon icon={faRectangleXmark} size='xl' />
            </span>
            Book Your Package
          </button>
        ) : (
          <Link to={`/placeorder/${id}`}>
            <button className='btn btn-success bookButton'>
              <span className='me-2'>
                <FontAwesomeIcon icon={faArrowPointer} size='xl' />
              </span>
              Book Your Package
            </button>
          </Link>
        )}
      </div>
      {/* review show sections  */}
      <SingleReviews id={id} title={service.title}></SingleReviews>

      {/* add review sections  */}
      <section className='container my-4'>
        <h3 className='text-center text-capitalize fw-bold'>Give a feedback</h3>
        <Form onSubmit={handleSubmit(onSubmit)} className='w-100 form-main'>
          <div
            className='p-3 mx-auto  bg-white'
            style={{ borderRadius: '15px', maxWidth: '50rem' }}
          >
            <Row className='justify-content-center'>
              <Col md={6}>
                <Form.Group>
                  <Form.Label style={{ fontWeight: 'bold' }}>
                    Your Name
                  </Form.Label>
                  <Form.Control
                    type='text'
                    defaultValue={displayName}
                    {...register('name', { required: true })}
                    placeholder='Enter your name'
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <h6 className='fw-bold mt-1 mb-2'>Your Rating</h6>
                <Rating
                  className='text-warning fs-3'
                  emptySymbol='far fa-star '
                  fullSymbol='fas fa-star '
                  onChange={(rate) => setRating(rate)}
                  initialRating={rating}
                  fractions={2}
                />
                <h4 className='d-inline-block ms-2'>{rating}</h4>
              </Col>
            </Row>
            <Row className='my-2'>
              <Col>
                <Form.Group>
                  <Form.Label style={{ fontWeight: 'bold' }}>
                    Address
                  </Form.Label>
                  <Form.Control
                    type='text'
                    {...register('address', { required: true })}
                    placeholder='Enter your address'
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className='my-2'>
              <Form.Group as={Col} md={12}>
                <Form.Label style={{ fontWeight: 'bold' }}>
                  Description
                </Form.Label>
                <Form.Control
                  style={{ height: '10rem' }}
                  type='text'
                  as='textarea'
                  {...register('description', { required: true })}
                  placeholder='Enter a description'
                />
              </Form.Group>
            </Row>
            <div className='mt-4'>
              {matchedReviewbyIdandEmail ? (
                // <span className='fw-bold text-danger'>
                //   You have already given a review about this package
                // </span>
                <>
                  <div className='textAreaForMessage'>
                    <div className='d-flex align-items-center justify-content-center flex-column'>
                      <span className='text-warning'>
                        <FontAwesomeIcon
                          icon={faTriangleExclamation}
                          size='4x'
                        />
                      </span>
                      <h4 className='text-danger'>
                        You have already given a review about this event.
                      </h4>
                    </div>
                  </div>

                  <button
                    type='submit'
                    className='btn btn-secondary'
                    disabled
                    style={{ padding: '.6rem 2rem' }}
                  >
                    <span className='text-danger me-2'>
                      <FontAwesomeIcon icon={faTriangleExclamation} size='xl' />
                    </span>{' '}
                    Submit
                  </button>
                </>
              ) : (
                <button
                  type='submit'
                  className='btn btn-primary'
                  style={{ padding: '.6rem 2rem' }}
                >
                  Submit
                </button>
              )}
            </div>
          </div>
        </Form>
      </section>
    </div>
  );
};

export default SingleProduct;
