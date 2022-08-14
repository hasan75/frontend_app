import React, { useEffect, useState } from 'react';
import styles from './ItemDashboard.module.css';
import introImg from '../../assets/images/introDash.png';
import useProducts from '../../hooks/useProducts';
import useStoryBlogs from '../../hooks/useStoryBlogs';
import useBookings from '../../hooks/useBookings';
import useUsers from '../../hooks/useUsers';

const ItemDashboard = ({ displayName, email }) => {
  const products = useProducts();
  const blogs = useStoryBlogs();
  const bookings = useBookings();
  const users = useUsers();

  //admin users
  const adminUser = users.find((admin) => admin.email === email);
  const role = adminUser?.role || undefined;

  //   personalBookings
  const personalBookings = bookings.filter(
    (personalBook) => personalBook.email === email
  );

  //   to find total bookin amount
  let totalPrice = bookings.reduce((acc, booking) => {
    return (
      acc +
      Math.round(
        parseInt(booking?.price) -
          parseInt(booking?.price) * (parseInt(booking?.discount) / 100)
      )
    );
  }, 0);

  //to find total personal booking amount
  let totalPersonalPrice = personalBookings.reduce((acc, personalBooking) => {
    return (
      acc +
      Math.round(
        parseInt(personalBooking?.price) -
          parseInt(personalBooking?.price) *
            (parseInt(personalBooking?.discount) / 100)
      )
    );
  }, 0);

  return (
    <div>
      <div
        className={`${styles.intro} mt-2 d-flex flex-sm-row flex-column justify-content-between align-items-center`}
      >
        <div className='imgContainer'>
          <img
            className='img-fluid'
            // height={400}
            // width={600}
            src={introImg}
            alt='introductory_img'
          />
        </div>
        <div className='text-secondary m-2 me-sm-1 me-md-4'>
          <h4>Hi, {displayName}</h4>
          <p>
            This is your profile dashboard. YOu can track your bookings and
            services here.{' '}
          </p>
        </div>
      </div>
      <div className='row row-cols-2 row-cols-md-2 row-cols-lg-4 g-4 mt-4 mb-4 mx-1'>
        <div className='col'>
          <div
            className={`${styles.dashContainer} border rounded-3 bg-white position-relative`}
          >
            <div className={styles.taskIconHolder}>
              <i
                className={`${styles.taskIcon} fa-solid fa-list-check fa-2xl`}
              ></i>
            </div>
            <div className=' d-flex justify-content-end'>
              <div className='text-center text-secondary m-2'>
                <span>Total Packages</span>
                <h5>{products.length}</h5>
              </div>
            </div>
          </div>
        </div>
        <div className='col'>
          <div
            className={`${styles.dashContainer} border rounded-3 bg-white position-relative`}
          >
            <div className={styles.orderIconHolder}>
              <i
                className={`${styles.orderIcon} fa-regular fa-chart-bar fa-2xl`}
              ></i>
            </div>
            <div className='d-flex justify-content-end'>
              <div className='text-center text-secondary m-2'>
                <span>Bookings</span>
                <h5>{role ? bookings.length : personalBookings.length}</h5>
              </div>
            </div>
          </div>
        </div>
        <div className='col'>
          <div
            className={`${styles.dashContainer} border rounded-3 bg-white position-relative`}
          >
            <div className={styles.incomeIconHolder}>
              <i
                className={`${styles.incomeIcon} fa-regular fa-money-bill-1 fa-2xl`}
              ></i>
            </div>
            <div className='d-flex justify-content-end'>
              <div className='text-center text-secondary m-2'>
                <span>Cost</span>
                <h5>৳ {role ? totalPrice : totalPersonalPrice}</h5>
              </div>
            </div>
          </div>
        </div>
        <div className='col'>
          <div
            className={`${styles.dashContainer} border rounded-3 bg-white position-relative`}
          >
            <div className={styles.likeIconHolder}>
              <i
                className={`${styles.likeIcon} fa-regular fa-thumbs-up fa-2xl`}
              ></i>
            </div>
            <div className='d-flex justify-content-end'>
              <div className='text-center text-secondary m-2'>
                <span>Stories</span>
                <h5>
                  <i className='fa-regular fa-user text-secondary fa-xs'></i>{' '}
                  {blogs.length}
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDashboard;
