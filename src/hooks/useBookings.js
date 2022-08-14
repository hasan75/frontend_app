import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

const useBookings = () => {
  const [bookings, setBookings] = useState([]);
  useEffect(() => {
    fetch('http://localhost:5001/orders')
      .then((res) => res.json())
      .then((data) => {
        setBookings(data);
      })
      .catch((err) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
          footer: 'Please, try again',
        });
      });
  }, []);
  return [bookings];
};

export default useBookings;
