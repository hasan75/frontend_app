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

  // for printing pdf
  const componentRef = useRef();

  //for printing invoice
  const invoiceRef = useRef();

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
                        <Table ref={invoiceRef} responsive>
                          <thead className='bg-light'>
                            <tr>
                              <th colSpan={4} className='text-center fw-bold'>
                                <img
                                  style={{
                                    height: '60px',
                                    display: 'block',
                                    marginLeft: '20px',
                                  }}
                                  src={httLogo}
                                  alt='the Logo'
                                ></img>
                                <span className='text-danger'> Baundule </span>{' '}
                                <br />
                                The finest Tour Management Group of BD <br />
                                <span className='text-primary'>
                                  Date: {new Date().toDateString()}
                                </span>
                              </th>
                            </tr>
                            <tr>
                              <th
                                colSpan={4}
                                className='d-flex justify-content-center'
                              >
                                <span className='text-info fw-bold'>
                                  Invoice for{' '}
                                  <span className='text-danger'>
                                    {order.title}
                                  </span>
                                </span>
                              </th>
                              <th
                                colSpan={4}
                                className='d-flex justify-content-center m-2'
                              >
                                <span className='text-info fw-bold'>
                                  Invoice Number{' '}
                                  <span className='text-danger'>
                                    {order._id}
                                  </span>
                                </span>
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td
                                colSpan={4}
                                className='d-flex justify-content-end me-2'
                              >
                                <span className='fw-bold'>
                                  Invoice to: {order.name}
                                </span>
                              </td>
                            </tr>
                            <tr>
                              <td
                                colSpan={4}
                                className='d-flex justify-content-end me-2'
                              >
                                <span className='fw-bold'>
                                  Email: {order.email}
                                </span>
                              </td>
                            </tr>
                            <tr>
                              <td
                                colSpan={4}
                                className='d-flex justify-content-end me-2'
                              >
                                <span className='fw-bold'>
                                  Address: {order.address}
                                </span>
                              </td>
                            </tr>
                            <tr>
                              <td
                                colSpan={4}
                                className='d-flex justify-content-end me-2'
                              >
                                <span className='fw-bold'>
                                  Phone: {order.phone}
                                </span>
                              </td>
                            </tr>
                            <tr>
                              <td
                                colSpan={4}
                                className='d-flex justify-content-end me-2'
                              >
                                <span className='fw-bold'>
                                  Order Date: {order.orderDate}
                                </span>
                              </td>
                            </tr>
                            <tr>
                              <td
                                colSpan={4}
                                className='d-flex justify-content-end me-2'
                              >
                                <span className='fw-bold'>
                                  Package Cost: {order.price} Taka
                                </span>
                              </td>
                            </tr>
                            <tr>
                              <td
                                colSpan={4}
                                className='d-flex justify-content-end me-2'
                              >
                                <span className='fw-bold text-warning'>
                                  Discount: {order.discount} %
                                </span>
                              </td>
                            </tr>
                            <tr>
                              <td
                                colSpan={4}
                                className='d-flex justify-content-end me-2'
                              >
                                <span className='fw-bold text-success'>
                                  Final Cost :{' '}
                                  {Math.round(
                                    parseInt(order?.price) -
                                      parseInt(order?.price) *
                                        (parseInt(order?.discount) / 100)
                                  )}
                                </span>
                              </td>
                            </tr>
                            <tr>
                              <td
                                colSpan={4}
                                className='d-flex justify-content-end me-2'
                              >
                                <span className='fw-bold text-warning'>
                                  Payment Method: Stripe Card
                                </span>
                              </td>
                            </tr>
                            <tr>
                              <td
                                colSpan={4}
                                className='d-flex justify-content-end me-2'
                              >
                                <span className='fw-bold text-warning'>
                                  Last Four Digit of the Card:{' '}
                                  {order?.payment?.last4}
                                </span>
                              </td>
                            </tr>
                            <tr>
                              <td
                                colSpan={4}
                                className='d-flex justify-content-end me-2'
                              >
                                <span className='fw-bold text-danger'>
                                  Payment Amount: {order?.payment?.amount / 100}
                                </span>
                              </td>
                            </tr>
                          </tbody>
                        </Table>
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
