import React, { useEffect } from 'react';
import { useState } from 'react';
import Swal from 'sweetalert2';

const useStoryBlogs = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5001/blogs')
      .then((res) => res.json())
      .then((data) => {
        setBlogs(data);
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
  return blogs;
};

export default useStoryBlogs;
