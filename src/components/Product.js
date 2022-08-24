import React, { useEffect, useState } from 'react';
import { Card, Col } from 'react-bootstrap';
import Rating from 'react-rating';
import { Link } from 'react-router-dom';
import Zoom from 'react-reveal/Zoom';
import productStyle from '../assets/css/product.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import useBookings from '../hooks/useBookings';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';

const Product = ({ product }) => {
  const {
    _id,
    title,
    desc,
    price,
    img,
    rating,
    totalReview,
    from,
    destination,
    tour_date,
    start_time,
    return_date,
    discount,
    member,
  } = product;

  // for finding seats
  const [bookings] = useBookings();

  // useEffect(() => {
  //   fetch('http://localhost:5001/orders')
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setBookings(data);
  //     })
  //     .catch((err) => {
  //       Swal.fire({
  //         icon: 'error',
  //         title: 'Oops...',
  //         text: 'Something went wrong!',
  //         footer: 'Please, try again',
  //       });
  //     });
  // }, []);

  //FOR CHECKING AVAILABLE SEATS IN EVENT.
  const packageBookings = bookings.filter((booking) => booking.title === title);
  const availableSeats = member - packageBookings.length;

  // console.log(availableSeats, 'seats');

  // for date comparison
  let todayDate = new Date();
  const eventDate = new Date(product.tour_date);

  //DISCOUNT PRICE CALCULATION
  const discountedPrice =
    parseInt(price) - parseInt(price) * (parseInt(discount) / 100);
  //console.log();

  return (
    <Col className='my-3 text-center' sm={12} md={6} lg={4}>
      <Zoom>
        <Card
          style={{ height: '32em', width: '22rem' }}
          className='mx-1  shadow'
        >
          <div className='text-center'>
            <Card.Img
              className={
                todayDate >= eventDate ? `${productStyle.imgOffset}` : ''
              }
              style={{ width: '100%', height: '12rem' }}
              variant='top'
              src={img}
            />
            {/* MESSAGE FOR PAST EVENT  */}
            {todayDate >= eventDate ? (
              <div className={productStyle.dateCaution}>
                <span className='text-danger'>
                  <FontAwesomeIcon
                    icon={faTriangleExclamation}
                    className='me-2'
                  />
                  Sorry! This is a past event!!
                </span>
              </div>
            ) : (
              ''
            )}
          </div>
          <Card.Body className={productStyle.cardBody}>
            {parseInt(discount) > 0 && (
              // <div className={productStyle.discountContainer}>
              //   <h6 className={productStyle.discountText}>
              //     <span className='ms-4'>{discount}% </span>
              //     <br /> Discount
              //   </h6>
              // </div>
              <div className={productStyle.discountContain}>
                <span className={productStyle.discountText}>
                  <span className='text-bold'>-</span> {discount}%
                </span>
              </div>
            )}
            <Card.Title className='text-uppercase text-center'>
              {title}
            </Card.Title>
            <Card.Text className='text-center small'>
              <i className='fas event-icon fa-map-marker-alt text-success'></i>{' '}
              &nbsp; {from} to {destination} &nbsp;{' '}
              <i className='fas event-icon fa-flag-checkered text-success'></i>
            </Card.Text>
            <Card.Text
              className={`${productStyle.smallTexts}  text-center fw-bold `}
            >
              <span className='text-primary'> Available Seats:</span>
              <span
                className={
                  availableSeats > 2 ? `text-success ms-1` : `text-warning ms-1`
                }
              >
                {' '}
                {availableSeats}
              </span>
            </Card.Text>
            <Card.Text className='text-center fw-bold '>
              <span
                className={
                  !isNaN(discountedPrice)
                    ? [
                        'text-decoration-line-through',
                        'textDecorationColor',
                      ].join(' ')
                    : 'textDecorationColor'
                }
              >
                {' '}
                {price}.00
              </span>{' '}
              {!isNaN(discountedPrice) && (
                <span className='text-success'>{discountedPrice} </span>
              )}
              TK
            </Card.Text>
            <Card.Text
              className={`${productStyle.smallTexts} text-center fw-bold `}
            >
              Date: <span className='text-success'> {tour_date}</span>
            </Card.Text>
            <hr />
            <Card.Text className={`${productStyle.smallTexts} text-center`}>
              {desc.slice(0, 110)}...
            </Card.Text>
            <Card.Text
              className={`${productStyle.smallTexts} text-center fw-bold `}
            >
              {' '}
              <Rating
                className={`${productStyle.ratingColor} text-center mt-2`}
                initialRating={rating}
                readonly
                emptySymbol='far fa-star'
                fullSymbol='fas fa-star'
              />{' '}
              {rating} ({totalReview}2)
            </Card.Text>
            <Link to={`products/${_id}`}>
              <button className={`${productStyle.detailBooking} mt-2 me-5`}>
                See Details
              </button>
            </Link>
            {todayDate >= eventDate || availableSeats < 1 ? (
              <button className='mt-2 btn btn-secondary opacity-25' disabled>
                Book Now
              </button>
            ) : (
              <Link to={`/placeorder/${_id}`}>
                <button className='mt-2 btn btn-success'>Book Now</button>
              </Link>
            )}
          </Card.Body>
        </Card>
      </Zoom>
    </Col>
  );
};

export default Product;
