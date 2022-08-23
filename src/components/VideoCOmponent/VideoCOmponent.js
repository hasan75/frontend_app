import { faHeart, faPlaneDeparture, faThumbTack } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
            What Bauldule Travellers offers
          </h2>
          <div className='container pt-3 text-center'>
            {/* <h4>
              Baundule is one of the finest and oldest tour management Group in
              Bangladesh. We offer our customers maximum security and maximum
              amount of comfort. We have several hosts who will try their best
              to host the tours very arrangly. <br />
              <span className='text-bold fw-bold'>
                We Don't Encourage to use Plastic. Say No to Plastic.
              </span>{' '}
            </h4> */}
            <div className="row g-3">
              <div className="col-4">
                <div className="d-flex align-items-center justify-content-center flex-column offers">
                  <span className='d-block pb-2'>
                    <FontAwesomeIcon icon={faThumbTack} />
                  </span>
                  <h6>Exclusive Tour Plans</h6>
                  <p className='offerSpan'>
                    We offer different kinds of packages.
                  </p>
                </div>
              </div>
              <div className="col-4">
                <div className="d-flex align-items-center justify-content-center flex-column offers">
                  <span className='d-block pb-2'>
                    <FontAwesomeIcon icon={faPlaneDeparture} />
                  </span>
                  <h6>Exclusive Travel Plans</h6>
                  <p className='offerSpan'>Excellent tour plans for everyone.</p>
                </div>
              </div>
              <div className="col-4">
                <div className="d-flex align-items-center justify-content-center flex-column offers">
                  <span className='d-block pb-2'>
                    <FontAwesomeIcon icon={faHeart} />
                  </span>
                  <h6>Stay Plans</h6>
                  <p className='offerSpan'>Travelling is easy with us to the countryside</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCOmponent;


{/*  */ }


{/*  */ }
