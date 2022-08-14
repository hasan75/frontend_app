import React from 'react';
import './Banner.css';
import bannerImg from '../../assets/images/bannerImg.png';
const Banner = () => {
  // const [date]
  // let today = new Date();
  // let day = `${today.getDate() < 10 ? '0' : ''}${today.getDate()}`;
  // let month = `${today.getMonth() + 1 < 10 ? '0' : ''}${today.getMonth() + 1}`;
  // let year = today.getFullYear();
  // let dateToday = `${day}/${month}/${year}`;
  let theDate = new Date().toLocaleDateString();
  let theTime = new Date().toLocaleTimeString();
  // let fullDate =
  //   today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

  return (
    <div className='mt-2'>
      <div className='container col-lg-12 d-lg-flex py-5 banner'>
        <div className='col-lg-5 py-4 ps-2 my-auto'>
          <h1 className='mb-3'>Baundule</h1>
          <h2 className='mb-3 text-primary'>A Tour Management Company</h2>
          <h3>
            “Travel is fatal to prejudice, bigotry, and narrow mindedness, and
            many of our people need it sorely on these accounts.”{' '}
            <span className='text-success'> ~ Mark Twain</span>
          </h3>
          {/* <h4>Today is : {today.toString()}</h4>
          <h4>Today is : {day}</h4>
          <h4>Today is : {fullDate}</h4>
          <h4>Today is : {dateToday}</h4> */}
          <h4 className='py-2 text-success'>Today's Date : {theDate}</h4>
        </div>

        <div className='my-auto col-lg-6'>
          <img className='img-fluid' src={bannerImg} alt='' srcset='' />
        </div>
      </div>
    </div>
  );
};
export default Banner;
