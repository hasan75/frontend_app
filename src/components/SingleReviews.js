import React, { useEffect, useState } from 'react';
import { Card, Spinner } from 'react-bootstrap';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Autoplay, Pagination } from 'swiper';
import Fade from 'react-reveal/Fade';
import Testimonial from './Testimonial.js';
import toast from 'react-hot-toast';
import '../assets/css/Testimonials.css';
import SingleReview from './SingleReview.js';

const SingleReviews = ({ id, title }) => {
  // console.log(id);
  SwiperCore.use([Pagination, Autoplay]);
  const [loading, setLoading] = useState(true);
  const [Reviews, setReviews] = useState([]);
  useEffect(() => {
    fetch('http://localhost:5001/reviews')
      .then((res) => res.json())
      .then((data) => {
        setReviews(data);
        setLoading(false);
      })
      .catch((error) => toast.error(error.message));
  }, []);

  const matchedReviews = Reviews.filter((review) => review?.packageId === id);
  // console.log(matchedReviews);

  return (
    <section
      id='reviews'
      style={{ overflow: 'hidden' }}
      className='testimonials p-md-3'
    >
      <Fade bottom duration={2500} distance='40px'>
        <div className='my-5 py-4'>
          <div className='review-title text-center'>
            <span>Customers Review about {title}</span>
            <h2>Reviews</h2>
          </div>
          {loading ? (
            <div className='text-center'>
              <Spinner animation='border' variant='danger' />
            </div>
          ) : (
            <Card className='mt-5'>
              <Swiper
                loop={true}
                slidesPerView={1}
                breakpoints={{
                  640: {
                    slidesPerView: 1,
                    spaceBetween: 2,
                  },
                  768: {
                    slidesPerView: 2,
                    spaceBetween: 10,
                  },
                  1024: {
                    slidesPerView: 3,
                    spaceBetween: 10,
                  },
                }}
                autoplay={{
                  delay: 2500,
                  disableOnInteraction: false,
                }}
                spaceBetween={10}
              >
                {matchedReviews.map((testimonial) => {
                  return (
                    <SwiperSlide key={testimonial._id}>
                      <SingleReview testimonial={testimonial} />
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </Card>
          )}
        </div>
      </Fade>
    </section>
  );
};

export default SingleReviews;
