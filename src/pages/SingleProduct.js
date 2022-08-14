import { Button } from 'bootstrap';
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
      <h1 className='py-3 text-center text-dark'>
        Tour Package Details of{' '}
        <span className='text-warning'>{service?.title}</span>
      </h1>
      <section className=' px-5 mx-3 my-3 rounded'>
        <div className='row g-1'>
          <div className='col-lg-8'>
            <div className='pb-2'>
              <img
                src={service?.img}
                alt='sundarban_img'
                className={`${singleServiceStyle.singlePicture} img-fluid`}
              />
            </div>
          </div>
          <div className='col-lg-4'>
            <div
              className={`${singleServiceStyle.extraInfo} h-100 text-start ms-3`}
            >
              <div className={`${singleServiceStyle.extraInfoText}`}>
                <h4 className='text-secondary fw-bold text-center'>
                  Key Infos
                </h4>
              </div>
              <div className='ps-3'>
                <span
                  className={`${singleServiceStyle.infoText} my-2 mx-2 text-secondary`}
                >
                  Destination:{' '}
                  <span className='fw-bold'>{service?.destination}</span>
                </span>
                <span
                  className={`${singleServiceStyle.infoText} my-2 text-secondary mx-2`}
                >
                  Journey From: <span className='fw-bold'>{service?.from}</span>
                </span>
                <span
                  className={`${singleServiceStyle.infoText} my-2 text-secondary mx-2`}
                >
                  Journey Date:{' '}
                  <span className='fw-bold'>{service?.tour_date}</span>
                </span>
                <span
                  className={`${singleServiceStyle.infoText} my-2 text-secondary mx-2`}
                >
                  Reporting Time:{' '}
                  <span className='fw-bold'>{service?.start_time}</span>
                </span>
                <span
                  className={`${singleServiceStyle.infoText} my-2 text-secondary mx-2`}
                >
                  Return Date:{' '}
                  <span className='fw-bold'>{service?.return_date}</span>
                </span>
                <span
                  className={`${singleServiceStyle.infoText} my-2 text-secondary mx-2`}
                >
                  Estimated Cost:{' '}
                  <span className='fw-bold text-danger '>{service?.price}</span>
                </span>
                <span
                  className={`${singleServiceStyle.infoText} my-2 text-secondary mx-2`}
                >
                  Discount Available:{' '}
                  <span className='fw-bold text-danger'>
                    {service?.discount} %
                  </span>
                </span>
                <span
                  className={`${singleServiceStyle.infoText} my-2 text-secondary mx-2`}
                >
                  Discount Price:{' '}
                  <span className='fw-bold text-success'>{discoutPrice}</span>
                </span>
                <span
                  className={`${singleServiceStyle.infoText} my-2 text-secondary mx-2`}
                >
                  Package Capacity:{' '}
                  <span className='fw-bold text-success'>
                    {service?.member}
                  </span>
                </span>
                <span
                  className={`${singleServiceStyle.infoText} my-2 text-secondary mx-2`}
                >
                  Available seats:{' '}
                  <span className='fw-bold text-success'>{availableSeats}</span>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col-md-6 my-4'>
            <div className={`${singleServiceStyle.tourDetails}`}>
              <h4 className='text-start text-success fw-bold'>Tour Details</h4>
              <p className='fw-bold'>{service?.desc}</p>
              <h5 className='text-warning fw-bold my-2 pt-3'>
                Read the points below before you book your package
              </h5>
              <ul className='list-group my-2 py-3'>
                <li className='list-group-item'>
                  Every Tour consists of minimum 15 people, so you have to be
                  with a group
                </li>
                <li className='list-group-item'>
                  No Extra Costs like snacks, cigarette, extra food, extra guide
                  will be beared by host.
                </li>
                <li className='list-group-item'>
                  Members have to listen to the host's call
                </li>
                <li className='list-group-item text-danger'>
                  No alcohol is allowed in the tour.
                </li>
                <li className='list-group-item'>
                  Your guide or host won't be the person which will carry your
                  belongings.
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
                <li className='list-group-item'>
                  The #1 benefit of using Baundule when it comes to booking your
                  family travel is because travel is our expertise.
                </li>
                <li className='list-group-item'>
                  We, the hosts of Baundule have the greatest Destination
                  knowledge.
                </li>
                <li className='list-group-item'>
                  that travelers do not pay more for vacations because Hit The
                  Trail is always with you.
                </li>
                <li className='list-group-item'>
                  The relationship you’ll form with your Baundule host, as well
                  as their relationships with other hosts, are two of the
                  benefits of using Baundule as your travel partner.
                </li>
                <li className='list-group-item'>
                  Our Hosts will be the best assistance to you in your trip.
                  They will assist you anywhere, anyhow!! That's the main
                  advantage if you get the service of Baundule
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <div className='my-3 text-center'>
        {pastEvent || availableSeats < 1 ? (
          <button className='btn btn-outline-success' disabled>
            Book Your Package
          </button>
        ) : (
          <Link to={`/placeorder/${id}`}>
            <button className='btn btn-outline-success'>
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
                <span className='fw-bold text-danger'>
                  You have already given a review about this package
                </span>
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
