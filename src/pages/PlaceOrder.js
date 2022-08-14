import React from 'react';
import { useEffect, useState } from 'react';
import { Col, Container, Row, Spinner } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router';
import { useForm } from 'react-hook-form';
import useContexts from '../hooks/useContexts.js';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';
import placeOrderStyle from '../assets/css/placeOrder.module.css';

const PlaceOrder = () => {
  let theOrderDate = new Date().toLocaleDateString();
  let theOrderTime = new Date().toLocaleTimeString();

  const history = useHistory();
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const { displayName, email } = useContexts();
  const [orders, setOrders] = useState([]);

  // to see the orders by the users
  useEffect(() => {
    fetch(`http://localhost:5001/orders?email=${email}`)
      .then((res) => res.json())
      .then((data) => {
        setOrders(data);
      })
      .catch((error) => toast.error(error.message));
  }, [email]);

  const orderMatched = orders?.find(
    (order) => product.title === order.title && email === order.email
  );
  console.log(orderMatched);

  //to place order
  useEffect(() => {
    fetch(`http://localhost:5001/placeorder/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, [id]);

  // for date comparison
  let todayDate = new Date();
  const eventDate = new Date(product.tour_date);

  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    data.orderDate = theOrderDate;
    data.orderTime = theOrderTime;
    Swal.fire({
      icon: 'warning',
      title: 'Do you want to confirm your order?',
      showCancelButton: true,
      confirmButtonText: 'Yes',
    }).then((result) => {
      if (result.isConfirmed) {
        fetch('http://localhost:5001/placeorder', {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ ...data, ...product }),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.insertedId) {
              reset();
              Swal.fire('Confirmed!', '', 'success');
              history.replace('/dashboard/myorder');
            }
          });
      }
    });
  };
  const discoutPrice = Math.round(
    parseInt(product?.price) -
      parseInt(product?.price) * (parseInt(product?.discount) / 100)
  );

  // function to add a invoice

  return (
    <>
      {!product.title ? (
        <div className='text-center my-5 private-spinner py-5'>
          <Spinner variant='danger' animation='border' role='status'>
            <span className='visually-hidden'>Loading...</span>
          </Spinner>
          <h6>Loading...</h6>
        </div>
      ) : (
        <Container>
          <Row className='align-items-center'>
            <h2 className='text-center feature mt-4'>
              Please Confirm Your Package Booking
            </h2>
            <Col sm={12} style={{ borderRight: '1px solid #ddd' }} md={6}>
              <img width='100%' src={product.img} alt='' />
            </Col>
            <Col className='my-4' sm={12} md={6}>
              <div className='mt-5'>
                <h2 className='text-success fw-bold'>{product?.title}</h2>
                <h4>{product.desc}</h4>
                <h3 className='mt-3 fw-bold text-warning'>
                  Price: {discoutPrice}.00TK
                </h3>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Row className='mt-3'>
                    <Col sm={12} md={6}>
                      <label htmlFor='name'>
                        <b>Name</b>
                      </label>
                      <input
                        id='name'
                        required
                        type='text'
                        className='form-control'
                        {...register('name')}
                        defaultValue={displayName}
                        placeholder='your name'
                      />
                    </Col>
                    <Col sm={12} md={6}>
                      <label htmlFor='email'>
                        <b>Email</b>
                      </label>
                      <input
                        id='email'
                        required
                        type='email'
                        readOnly
                        defaultValue={email}
                        className='form-control'
                        {...register('email')}
                        placeholder='your email'
                      />
                    </Col>
                  </Row>
                  <Row className='my-4'>
                    <Col>
                      <label htmlFor='address'>
                        <b>Address</b>
                      </label>
                      <input
                        id='address'
                        required
                        type='text'
                        className='form-control'
                        {...register('address')}
                        placeholder='Enter your address'
                      />
                    </Col>
                  </Row>
                  <Row className='my-4'>
                    <Col>
                      <label htmlFor='phone'>
                        <b>Phone</b>
                      </label>
                      <input
                        id='phone'
                        required
                        type='number'
                        className='form-control'
                        {...register('phone')}
                        placeholder='Enter your phone'
                      />
                    </Col>
                  </Row>
                  {/* {todayDate >= eventDate ? (
                    <h2 className='text-danger fw-bold'>
                      !! Past Event !! <br />
                      Sorry! This event date was {product.tour_date}. You can't
                      book this.
                    </h2>
                  ) : (
                    <input
                      value='Book Now'
                      className='btn btn-primary'
                      type='submit'
                    />
                  )}
                  {orderMatched ? (
                    <h2 className='text-danger fw-bold'>
                      You have already booked the package. Your Booking Date was{' '}
                      {orderMatched.orderDate} at {orderMatched.orderTime}.
                    </h2>
                  ) : (
                    <input
                      value='Book Now'
                      className='btn btn-primary'
                      type='submit'
                    />
                  )} */}

                  {todayDate >= eventDate ? (
                    <div className={`${placeOrderStyle.alertDiv} p-2 rounded`}>
                      <h2 className='text-danger fw-bold bg'>
                        !! Past Event !! <br />
                        Sorry! This event date was {product.tour_date}. You
                        can't book this.
                      </h2>
                    </div>
                  ) : orderMatched ? (
                    <div className={`${placeOrderStyle.alertDiv} p-2 rounded`}>
                      <h2 className='text-danger fw-bold alertDiv'>
                        You have already booked the package. Your Booking Date
                        was {orderMatched.orderDate} at {orderMatched.orderTime}
                        .
                      </h2>
                    </div>
                  ) : (
                    <input
                      value='Book Now'
                      className='btn btn-primary'
                      type='submit'
                      data-toggle='tooltip'
                      data-placement='top'
                      title='Invoice Will be available after payment'
                    />
                  )}
                </form>
              </div>
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
};

export default PlaceOrder;
