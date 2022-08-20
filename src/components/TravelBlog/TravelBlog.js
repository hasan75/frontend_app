import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import SingleStory from '../SingleStory/SingleStory';
import travelStyles from './TravelBlog.module.css';

const TravelBlog = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5001/blogs')
      .then((res) => res.json())
      .then((data) => {
        setBlogs(data);
        // console.log(data);
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

  return (
    <div>
      <h1 className='text-center pt-4'>Traveller's Story</h1>
      <div className='container my-2'>
        <div className='row d-flex justify-content-between'>
          {blogs.map((singledata) => (
            <SingleStory
              key={singledata._id}
              singledata={singledata}
            ></SingleStory>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TravelBlog;
