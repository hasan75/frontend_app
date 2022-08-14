import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React, { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import paymentStyle from '../assets/css/payment.module.css';
import CheckoutForm from './CheckoutForm';

// publishable key is added from stripe js
const stripePromise = loadStripe(
  'pk_test_51Jz4DvAGeXXLEp16fDRF0qcMZmDbvKfF9xM0MFYZBx0OTTP7sCAz6uGZuwTUAa6HDequykJ5zp0QduqkdHihFZCW00YDpRO0Jw'
);

const Payment = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState({});
  useEffect(() => {
    fetch(`http://localhost:5001/orders/${orderId}`)
      .then((res) => res.json())
      .then((data) => setOrder(data));
  }, []);
  const discountedPrice = Math.round(
    parseInt(order?.price) -
      parseInt(order?.price) * (parseInt(order?.discount) / 100)
  );
  return (
    <section className={`${paymentStyle.paymentSection} m-2`}>
      <div className={`${paymentStyle.header} my-2`}>
        <h2>
          Let's pay for the amazing{' '}
          <span className='text-success fw-bold'>{order.title}</span>
        </h2>
      </div>
      <div className='row g-2 paymentInfo my-2'>
        <div className='col-sm-6'>
          <div
            className={`${paymentStyle.basicPrice} d-flex flex-column justify-content-center align-items-center`}
          >
            <h3 className='text-primary'>Regular Cost: {order.price} Taka</h3>
            <h3>
              After{' '}
              <span className='fw-bold text-warning'>{order.discount}% </span>
              discount <br /> Payment Cost:{' '}
              <span className='fw-bold text-danger'>{discountedPrice} </span>
              Taka
            </h3>
          </div>
        </div>
        <div className='col-sm-6'>
          <div
            className={`${paymentStyle.discountPriceDiv} d-flex flex-column justify-content-center align-items-center`}
          >
            <h5 className='text-secondary'>
              Name: <span className='text-dark fw-bold'>{order.name}</span>
            </h5>
            <h5 className='text-secondary'>
              Email: <span className='text-dark fw-bold'>{order.email}</span>
            </h5>
            <h5 className='text-secondary'>
              Event Date:{' '}
              <span className='text-dark fw-bold'>{order.tour_date}</span>
            </h5>
            <h5 className='text-secondary'>
              Journey Time:{' '}
              <span className='text-dark fw-bold'>{order.start_time}</span>{' '}
            </h5>
            <h5 className='text-secondary'>
              Return Time:{' '}
              <span className='text-dark fw-bold'>{order.return_date}</span>{' '}
            </h5>
          </div>
        </div>
      </div>
      <div className='paymentContainer container my-4 text-center'>
        <h3 className='text-center text-success'>
          We accept all kind of Bank Cards{' '}
          <i class='fa-solid fa-credit-card'></i>
        </h3>
        <p className='text-center text-success'>
          Please enter the card valid informations to pay.
        </p>
        {order?.price ? (
          <Elements stripe={stripePromise}>
            <CheckoutForm order={order} />
          </Elements>
        ) : (
          <Spinner variant='primary' animation='border' role='status'>
            <span className='visually-hidden'>Loading...</span>
          </Spinner>
        )}
      </div>

      <div className={`${paymentStyle.stripeCards}`}>
        <p className='mb-2'>Stripe Demo Cards Numbers</p>
        <ul>
          <li>4242424242424242</li>
          <li>4000056655665556</li>
          <li>5555555555554444</li>
        </ul>
      </div>
    </section>
  );
};

export default Payment;
