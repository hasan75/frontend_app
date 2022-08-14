import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

const useUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5001/users')
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
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
  return users;
};

export default useUsers;
