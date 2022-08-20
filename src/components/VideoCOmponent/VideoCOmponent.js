import React from 'react';
import ReactPlayer from 'react-player';
import './VideoCOmponent.css';

const VideoCOmponent = () => {
  return (
    <div className='container videoHTT'>
      <div className='d-lg-flex mb-5'>
        <div className='container'>
          <ReactPlayer
            width='100%'
            controls='true'
            url='https://www.youtube.com/watch?v=rDYdeq3JW_E'
          />
        </div>
        <div className='container my-auto'>
          <h2 className='text-center title'>
            {' '}
            Travel With Baundule Travellers
          </h2>
          <div className='container pt-5 subtitle text-center'>
            <h4>
              Baundule is one of the finest and oldest tour management Group in
              Bangladesh. We offer our customers maximum security and maximum
              amount of comfort. We have several hosts who will try their best
              to host the tours very arrangly. <br />
              <span className='text-bold fw-bold'>
                We Don't Encourage to use Plastic. Say No to Plastic.
              </span>{' '}
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCOmponent;
