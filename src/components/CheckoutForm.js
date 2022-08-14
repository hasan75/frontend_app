import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useRef, useState } from 'react';
import { Spinner, Table } from 'react-bootstrap';
import Swal from 'sweetalert2';

const CheckoutForm = ({ order }) => {
  const { price, name, email, discount, _id, title } = order;
  const thePrice = Math.round(
    parseInt(price) - parseInt(price) * (parseInt(discount) / 100)
  );
  //   console.log(thePrice);
  const [errormsg, setErrormsg] = useState('');
  const [success, setSuccess] = useState('');
  const [processing, setProcessing] = useState(false);
  const [clientSecret, setClientSecret] = useState('');
  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    fetch('http://localhost:5001/create-payment-intent', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({ thePrice }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [thePrice]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);
    if (card === null) {
      return;
    }
    setProcessing(true);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });

    if (error) {
      //   console.log(error.message);
      setErrormsg(error.message);
      setSuccess('');
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: errormsg,
        html: 'Please, try again',
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      setErrormsg('');
      console.log('[PaymentMethod]', paymentMethod);
    }
    //payment intent
    const { paymentIntent, error: intentError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: name,
            email: email,
          },
        },
      });

    if (intentError) {
      setErrormsg(intentError.message);
      setSuccess('');
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: errormsg,
        html: 'Please, try again',
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      setErrormsg('');
      setSuccess('Your Payment Procced SuccessFully');
      Swal.fire('Payment Confirmed!', '', 'success');
      console.log(paymentIntent);
      setProcessing(false);

      //save to database
      const payment = {
        amount: paymentIntent.amount,
        created: paymentIntent.created,
        last4: paymentMethod.card.last4,
        transaction: paymentIntent.client_secret.slice('_secret')[0],
      };
      const url = `http://localhost:5001/orders/${_id}`;
      fetch(url, {
        method: 'PUT',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(payment),
      })
        .then((res) => res.json())
        .then((data) => console.log(data));
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <CardElement
          className='py-3 my-2 px-2 border rounded-1'
          options={{
            style: {
              base: {
                iconColor: '#1a1f37',
                color: '#2d2d2d',
                fontWeight: '500',
                fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
                fontSize: '16px',
                fontSmoothing: 'antialiased',
                ':-webkit-autofill': {
                  color: '#fce883',
                },
                '::placeholder': {
                  color: '#2d2d2d',
                },
              },
              invalid: {
                iconColor: '#e53d38',
                color: '#9e2146',
              },
            },
          }}
        />

        {processing ? (
          <Spinner variant='danger' animation='border' role='status'>
            <span className='visually-hidden'>Loading...</span>
          </Spinner>
        ) : order.payment ? (
          <span className='text-success fw-bold'>Payment Completed</span>
        ) : (
          <button
            type='submit'
            className='btn btn-outline-success'
            disabled={!stripe || success}
          >
            Pay {thePrice} Taka
          </button>
        )}
      </form>
    </div>
  );
};

export default CheckoutForm;
