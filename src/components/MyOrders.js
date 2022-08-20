import React, { useEffect, useRef, useState } from 'react';
import { Spinner, Table, Button } from 'react-bootstrap';
import toast, { Toaster } from 'react-hot-toast';
import useContexts from '../hooks/useContexts.js';
import myordersStyle from '../assets/css/myorder.module.css';
import ReactToPrint from 'react-to-print';
import { Link } from 'react-router-dom';
import httLogo from '../assets/images/logo.png';

const Orders = () => {
  const { email } = useContexts();
  const [orders, setOrders] = useState([]);
  const [displayOrders, setDisplayOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const todayDate = new Date().toLocaleDateString();

  // for printing pdf
  const componentRef = useRef();

  //for printing invoice
  const invoiceRef = useRef();

  console.log(orders);

  useEffect(() => {
    fetch(`http://localhost:5001/orders?email=${email}`)
      .then((res) => res.json())
      .then((data) => {
        setOrders(data);
        setDisplayOrders(data);
        setLoading(false);
      })
      .catch((error) => toast.error(error.message));
  }, [email]);

  // const deletion = (id) => {
  //   Swal.fire({
  //     icon: 'warning',
  //     title: 'Are you sure to delete this order?',
  //     showCancelButton: true,
  //     confirmButtonText: 'Yes',
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       fetch(`http://localhost:5001/placeorder/${id}`, {
  //         method: 'DELETE',
  //       })
  //         .then((res) => res.json())
  //         .then((data) => {
  //           if (data.deletedCount) {
  //             const modifiedOrders = orders.filter((order) => order._id !== id);
  //             setOrders(modifiedOrders);
  //             setDisplayOrders(modifiedOrders);
  //             Swal.fire('Deleted!', '', 'success');
  //           }
  //         });
  //     }
  //   });
  // };

  //handle search
  const handleMyOrderSearch = (e) => {
    const searchText = e.target.value;
    const matchedOrders = orders.filter(
      (order) =>
        order.title.toLowerCase().includes(searchText.toLowerCase()) ||
        order.desc.toLowerCase().includes(searchText.toLowerCase())
    );
    setDisplayOrders(matchedOrders);
  };

  return (
    <div className='px-2  mx-md-2 bg-white' style={{ borderRadius: '15px' }}>
      <h3 className='text-center fw-bold mb-4'>My Booked Packages</h3>

      {/* search container  */}
      <div className={`${myordersStyle.searchContainer} my-2`}>
        <input
          type='text'
          placeholder='enter package name or description or package title to search'
          onChange={handleMyOrderSearch}
        />
      </div>

      {/* print trigger button  */}
      <ReactToPrint
        trigger={() => (
          <button className='btn btn-warning mb-3'>
            {' '}
            <i className='fa-solid fa-print'></i>
          </button>
        )}
        content={() => componentRef.current}
      />
      {loading ? (
        <div className='text-center my-5 private-spinner py-5'>
          <Spinner variant='danger' animation='border' role='status'>
            <span className='visually-hidden'>Loading...</span>
          </Spinner>
          <h6>Loading...</h6>
        </div>
      ) : (
        <>
          <Table hover borderless responsive>
            <Toaster position='bottom-left' reverseOrder={false} />
            <thead className='bg-light'>
              <tr>
                <th colSpan={8} className='text-center text-primary fw-bold'>
                  <span className='text-danger'> Baundule </span> <br />
                  The package list booked at Baundule <br />
                  <span className='text-secondary'>
                    Date: {new Date().toDateString()}
                  </span>
                </th>
              </tr>
              <tr>
                <th>Image</th>
                <th>Package</th>
                <th>Booking Date</th>
                <th>Cost</th>
                <th>Status</th>
                <th>Payment Status</th>
                <th>Invoice</th>
                {/* <th>Action</th> */}
              </tr>
            </thead>
            {displayOrders.map((order) => {
              return (
                <tbody key={order._id} style={{ fontWeight: '500' }}>
                  <tr>
                    <td>
                      <img width='100px' src={order.img} alt='' />
                    </td>
                    <td>{order.title}</td>
                    <td>{order?.orderDate}</td>
                    <td>
                      {Math.round(
                        parseInt(order?.price) -
                          parseInt(order?.price) *
                            (parseInt(order?.discount) / 100)
                      )}
                    </td>

                    <td>
                      <button
                        style={{ width: '100px' }}
                        className={
                          !order.payment ? 'btn btn-danger' : 'btn btn-success'
                        }
                      >
                        {order.payment ? 'Done' : 'Pending'}
                      </button>
                    </td>
                    <td>
                      {order.payment ? (
                        'Paid'
                      ) : (
                        <Link to={`/dashboard/payment/${order._id}`}>
                          <button className='btn btn-primary'>Pay</button>
                        </Link>
                      )}
                    </td>
                    <td>
                      {order?.payment ? (
                        <ReactToPrint
                          trigger={() => (
                            <button className='btn btn-info mb-3'>
                              {' '}
                              <i className='fa-solid fa-print'></i>{' '}
                              <span>Invoice</span>
                            </button>
                          )}
                          content={() => invoiceRef.current}
                        />
                      ) : (
                        <span>Not paid</span>
                      )}

                      {/* the invisible table  */}
                      <div style={{ display: 'none' }}>
                        <div class='container' ref={invoiceRef}>
                          <div class='row pt-5'>
                            <div class='col-12'>
                              <div class='card'>
                                <div class='card-body p-0'>
                                  <div class='row px-5 pb-2 pt-4'>
                                    <div class='col-6'>
                                      <img
                                        style={{
                                          height: '120px',
                                          display: 'block',
                                          marginLeft: '20px',
                                        }}
                                        src={httLogo}
                                        alt='the Logo'
                                      />
                                      <span className='ms-2'>
                                        Baundule Travellers
                                      </span>
                                    </div>
                                    <div class='col-6 text-end mt-3'>
                                      <p class='font-weight-bold mb-1'>
                                        Invoice{' '}
                                        <span className='text-bold'>
                                          #{order._id}
                                        </span>
                                      </p>
                                      <p class='text-muted'>
                                        Issue Date: {todayDate}
                                      </p>
                                    </div>
                                  </div>
                                  <hr class='my-2' />
                                  <div class='row pb-5 p-5'>
                                    <div class='col-6'>
                                      <p class='font-weight-bold mb-4'>
                                        Client Information
                                      </p>
                                      <p class='mb-1'>{order.name}</p>
                                      <p>{order.address}</p>
                                      <p class='mb-1'>{order.phone}</p>
                                      <p class='mb-1'>{order.email}</p>
                                    </div>
                                    <div class='col-6 text-end'>
                                      <p class='font-weight-bold mb-4'>
                                        Payment Details
                                      </p>
                                      <p class='mb-1'>
                                        <span class='text-muted'>Method: </span>{' '}
                                        Stripe Card
                                      </p>
                                      <p class='mb-1'>
                                        <span class='text-muted'>
                                          Last Four Digit:{' '}
                                        </span>{' '}
                                        {order?.payment?.last4}
                                      </p>
                                      <p class='mb-1'>
                                        <span class='text-muted'>
                                          Payment Type:{' '}
                                        </span>{' '}
                                        Card
                                      </p>
                                      <p class='mb-1'>
                                        <span class='text-muted'>Name: </span>{' '}
                                        {order.name}
                                      </p>
                                    </div>
                                  </div>

                                  <div class='row'>
                                    <div class='col-12 p-5'>
                                      <table class='table'>
                                        <thead>
                                          <tr>
                                            <th class='border-0 text-uppercase small font-weight-bold'>
                                              ID
                                            </th>
                                            <th class='border-0 text-uppercase small font-weight-bold'>
                                              Package Name
                                            </th>
                                            <th class='border-0 text-uppercase small font-weight-bold'>
                                              Tour Destination & Date
                                            </th>
                                            <th class='border-0 text-uppercase small font-weight-bold'>
                                              Base Cost
                                            </th>
                                            <th class='border-0 text-uppercase small font-weight-bold'>
                                              Discount
                                            </th>
                                            <th class='border-0 text-uppercase small font-weight-bold'>
                                              Total
                                            </th>
                                          </tr>
                                        </thead>
                                        <tbody>
                                          <tr>
                                            <td>1</td>
                                            <td>{order.title}</td>
                                            <td>
                                              {order.destination} <br />{' '}
                                              {order.tour_date}
                                            </td>
                                            <td>{order.price} TK</td>
                                            <td>{order.discount} %</td>
                                            <td>
                                              {Math.round(
                                                parseInt(order?.price) -
                                                  parseInt(order?.price) *
                                                    (parseInt(order?.discount) /
                                                      100)
                                              )}
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </div>
                                  </div>

                                  <div class='d-flex flex-row-reverse bg-dark text-white p-4'>
                                    <div class='py-3 px-5 text-end'>
                                      <div class='mb-2'>Grand Total</div>
                                      <div class='h2 font-weight-light'>
                                        {Math.round(
                                          parseInt(order?.price) -
                                            parseInt(order?.price) *
                                              (parseInt(order?.discount) / 100)
                                        )}{' '}
                                        <span> Taka</span>
                                      </div>
                                    </div>

                                    <div class='py-3 px-5 text-end'>
                                      <div class='mb-2'>Discount</div>
                                      <div class='h2 font-weight-light'>
                                        {order?.discount}%
                                      </div>
                                    </div>

                                    <div class='py-3 px-5 text-end'>
                                      <div class='mb-2'>Base Price</div>
                                      <div class='h2 font-weight-light'>
                                        {order?.price} Taka
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div class='text-light mt-5 mb-5 text-center small'>
                            by :{' '}
                            <a class='text-light' target='_blank' href=''>
                              baundule.com
                            </a>
                          </div>
                        </div>
                      </div>
                    </td>
                    {/* <td>
                      <Button
                        variant='outline-danger'
                        className='p-1 ml-3 mb-0'
                        onClick={() => deletion(order._id)}
                      >
                        <i className='fas mx-1 fa-trash'></i>
                        Delete
                      </Button>
                    </td> */}
                  </tr>
                </tbody>
              );
            })}
          </Table>
          <div style={{ display: 'none' }}>
            <Table ref={componentRef} hover borderless responsive>
              {/* <Toaster position='bottom-left' reverseOrder={false} /> */}
              <thead className='bg-light'>
                <tr>
                  <th colSpan={8} className='text-center text-primary fw-bold'>
                    <span className='text-danger'> Baundule </span> <br />
                    The package list booked at Baundule <br />
                    <span className='text-secondary'>
                      Date: {new Date().toDateString()}
                    </span>
                  </th>
                </tr>
                <tr>
                  <th>Image</th>
                  <th>Package</th>
                  <th>Description</th>
                  <th>Booking Date</th>
                  <th>Confirm Status</th>
                  <th>Payment Status</th>
                </tr>
              </thead>
              {displayOrders.map((order) => {
                return (
                  <tbody key={order._id} style={{ fontWeight: '500' }}>
                    <tr>
                      <td>
                        <img width='100px' src={order.img} alt='' />
                      </td>
                      <td>{order.title}</td>
                      <td>{order.desc}</td>
                      <td>{order?.orderDate}</td>

                      <td>
                        <button
                          style={{ width: '100px' }}
                          className={
                            order.status === 'Pending'
                              ? 'btn btn-danger'
                              : order.status === 'Done'
                              ? 'btn btn-success'
                              : 'btn btn-info'
                          }
                        >
                          {order.status}
                        </button>
                      </td>
                      <td>{order.payment ? 'Paid' : 'Not Paid Yet'}</td>
                    </tr>
                  </tbody>
                );
              })}
            </Table>
          </div>
        </>
      )}
    </div>
  );
};

export default Orders;
