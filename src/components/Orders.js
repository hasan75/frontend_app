import React, { useEffect, useRef, useState } from 'react';
import { Spinner, Table, Button } from 'react-bootstrap';
import toast, { Toaster } from 'react-hot-toast';
import ReactToPdf from 'react-to-pdf';
import Swal from 'sweetalert2';
import ordersStyle from '../assets/css/orders.module.css';
import ReactToPrint from 'react-to-print';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [displayOrders, setDisplayOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [searchDate, setSearchDate] = useState();
  const [dateRangeStart, setdateRangeStart] = useState();
  const [dateRangeLast, setdateRangeLast] = useState();
  // console.log(orders);

  // for printing pdf
  const componentRef = useRef();

  useEffect(() => {
    fetch(`http://localhost:5001/orders`)
      .then((res) => res.json())
      .then((data) => {
        setOrders(data);
        setDisplayOrders(data);
        setLoading(false);
      })
      .catch((error) => toast.error(error.message));
  }, []);

  // const handleStatusChange = (id, status) => {
  //   let modifiedOrders = [];
  //   orders.forEach((order) => {
  //     if (order._id === id) {
  //       order.status = status;
  //     }
  //     modifiedOrders.push(order);
  //   });
  //   setOrders(modifiedOrders);
  //   setDisplayOrders(modifiedOrders);
  //   const modifiedStatus = { id, status };

  //   fetch('http://localhost:5001/updateOrderStatus', {
  //     method: 'put',
  //     headers: { 'content-type': 'application/json' },
  //     body: JSON.stringify(modifiedStatus),
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       if (data) {
  //         toast.success(<b style={{ color: '#198754' }}>Set to {status}</b>);
  //       } else {
  //         toast.error('something went wrong!');
  //       }
  //     })
  //     .catch((error) => toast.error(error.message));
  // };

  // const deletion = (id) => {
  //   Swal.fire({
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

  // code for table to pdf
  // const pdfRef = useRef();
  // const options = {
  //   orientation: 'landscape',
  //   unit: 'in',
  //   format: [18, 10],
  // };

  //handle search
  const handleSearch = (e) => {
    setSearchText(e.target.value);
    const matchedOrders = orders.filter(
      (order) =>
        order.name.toLowerCase().includes(searchText.toLowerCase()) ||
        order.email.toLowerCase().includes(searchText.toLowerCase()) ||
        order.title.toLowerCase().includes(searchText.toLowerCase())
    );
    setDisplayOrders(matchedOrders);
  };

  // search by date
  const handleDateSearch = (e) => {
    const dateValue = new Date(e.target.value).toLocaleDateString();
    setSearchDate(dateValue);
    const matchedOrders = orders.filter(
      (order) => order?.orderDate === dateValue
    );
    setDisplayOrders(matchedOrders);
  };

  //handle inputs for range
  const handleRangeStart = (e) => {
    setdateRangeStart(e.target.value);
  };

  const handleRangeLast = (e) => {
    setdateRangeLast(e.target.value);
  };

  //handle range search
  const handleSearchRange = () => {
    const bookingsByRange = orders.filter(
      (order) =>
        (new Date(dateRangeStart) < new Date(order.orderDate) &&
          new Date(dateRangeLast) > new Date(order.orderDate)) ||
        new Date(dateRangeStart).toDateString() ===
          new Date(order.orderDate).toDateString() ||
        new Date(dateRangeLast).toDateString() ===
          new Date(order.orderDate).toDateString()
    );
    setDisplayOrders(bookingsByRange);
    console.log(bookingsByRange);
  };

  //to find the total price of the booking
  let totalPrice = displayOrders.reduce((acc, booking) => {
    return (
      acc +
      Math.round(
        parseInt(booking?.price) -
          parseInt(booking?.price) * (parseInt(booking?.discount) / 100)
      )
    );
  }, 0);

  let totalPaidPrice = displayOrders.reduce((accu, bookingPay) => {
    return (
      accu +
      (bookingPay?.payment?.amount ? bookingPay?.payment?.amount / 100 : 0)
    );
  }, 0);

  return (
    <div className='px-2  mx-md-2 bg-white' style={{ borderRadius: '10px' }}>
      <h3 className='text-center mb-4 fw-bold my-3'>
        Manage all booking Packages
      </h3>

      {/* search container  */}
      <div className='row'>
        <div className='col-md-7'>
          <div className={`${ordersStyle.searchContainer} my-2`}>
            <input
              type='text'
              placeholder='enter email or name or package title to search'
              onChange={handleSearch}
            />
          </div>
        </div>
        {/* search by date container  */}
        <div className='col-md-5 d-flex justify-content-center align-items-center'>
          <label htmlFor='dateSearch'>Search By Date</label>
          <input
            type='date'
            className='form-control'
            onChange={handleDateSearch}
          />
        </div>
      </div>
      <div className='row my-2'>
        <div className='col-12'>
          <h5 className=' text-success'>Search By Booking Date Range</h5>
          <div className='d-flex align-items-center'>
            <div className='d-flex justify-content-center align-items-center my-2'>
              <label htmlFor='from'>Booking From</label>
              <input
                type='date'
                className='form-control'
                onChange={handleRangeStart}
              />
            </div>
            <div className='d-flex justify-content-center align-items-center me-2'>
              <label className='mx-2' htmlFor='to'>
                To
              </label>
              <input
                type='date'
                className='form-control'
                onChange={handleRangeLast}
              />
            </div>
            <div>
              <button
                className='btn btn-outline-success'
                onClick={handleSearchRange}
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* //react to print button   */}
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
                <th colSpan={10} className='text-center text-primary fw-bold'>
                  <span className='text-danger'> Baundule </span> <br />
                  The package list booked at Baundule <br />
                  <span className='text-secondary'>
                    Date: {new Date().toDateString()}
                  </span>
                </th>
              </tr>
              <tr>
                <th colSpan={10} className='text-center text-primary fw-bold'>
                  Total Booking Price:{' '}
                  <span className='text-danger'>{totalPrice}</span> Taka
                </th>
              </tr>
              <tr>
                <th colSpan={10} className='text-center text-primary fw-bold'>
                  Total Paid Booking Price:{' '}
                  <span className='text-danger'>{totalPaidPrice}</span> Taka
                </th>
              </tr>
              <tr>
                <th>Name</th>
                <th>Email ID</th>
                <th>Phone</th>
                <th>Address</th>
                <th>Package</th>
                <th>Booking Date</th>
                <th>Cost</th>
                {/* <th>Action</th> */}
                <th>Booking Status</th>
                <th>Payment Status</th>
              </tr>
            </thead>
            {displayOrders.map((order) => {
              return (
                <tbody key={order._id} style={{ fontWeight: '500' }}>
                  <tr>
                    <td>{order.name}</td>
                    <td>{order.email}</td>
                    <td>{order.phone}</td>
                    <td>{order.address}</td>
                    <td title={order.title}>{order.title}</td>
                    <td>{order?.orderDate}</td>
                    <td>
                      {' '}
                      {Math.round(
                        parseInt(order?.price) -
                          parseInt(order?.price) *
                            (parseInt(order?.discount) / 100)
                      )}
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
                      {order?.payment ? (
                        <span className='text-success'>Paid</span>
                      ) : (
                        <span className='text-warning'>Not Paid</span>
                      )}
                    </td>
                  </tr>
                </tbody>
              );
            })}
          </Table>
          <div style={{ display: 'none' }}>
            <Table ref={componentRef} hover borderless responsive>
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
                  <th colSpan={8} className='text-center text-primary fw-bold'>
                    Total Booking Price:{' '}
                    <span className='text-danger'>{totalPrice}</span>
                  </th>
                </tr>
                <tr>
                  <th>Name</th>
                  <th>Email ID</th>
                  <th>Phone</th>
                  <th>Address</th>
                  <th>Package</th>
                  <th>Booking Date</th>
                  <th>Cost</th>
                  <th>Booking Status</th>
                  <th>Payment Status</th>
                </tr>
              </thead>
              {displayOrders.map((order) => {
                return (
                  <tbody key={order._id} style={{ fontWeight: '500' }}>
                    <tr>
                      <td>{order.name}</td>
                      <td>{order.email}</td>
                      <td>{order.phone}</td>
                      <td>{order.address}</td>
                      <td title={order.title}>{order.title}</td>
                      <td>{order?.orderDate}</td>
                      <td>
                        {' '}
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
                            !order.payment
                              ? 'btn btn-danger'
                              : 'btn btn-success'
                          }
                        >
                          {order.payment ? 'Done' : 'Pending'}
                        </button>
                      </td>
                      <td>{order?.payment ? 'Paid' : 'Not Paid'}</td>
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
