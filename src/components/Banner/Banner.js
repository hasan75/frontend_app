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
      <div className='container col-lg-12 d-lg-flex pb-5 pt-1 justify-content-between banner'>
        <div className='col-lg-6 py-4 ps-2 my-auto'>
          <h5 className='text-first'>BEST DESTINATION AROUND THE COUNTRY</h5>
          <h1 className='mb-3 textBaundule'>Baundule Travellers</h1>
          <h4 className='mb-3 feature-text'>
            Travel, enjoy and live a new and full life.
          </h4>
          <h6 className='additional-text'>
            Baundule Offers you excellent eco-friendly tour packages, where you
            can travel with your friend, family and colleagues.
          </h6>
        </div>

        <div className='col-lg-6'>
          <img
            className='img-fluid imageAbout'
            src={bannerImg}
            alt=''
            srcset=''
          />
        </div>
      </div>
    </div>
  );
};
export default Banner;
