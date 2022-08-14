import React from 'react';
import { Carousel } from 'react-bootstrap';
import '../assets/css/slider.css';
import slider123 from '../assets/images/slider123.jpg';
import Slider1 from '../assets/images/slider1.png';
import Slider2 from '../assets/images/slider2.png';
import Slider3 from '../assets/images/slider3.png';
import Slider4 from '../assets/images/slider4.png';

const Slider = () => {
  return (
    <div>
      <Carousel>
        <Carousel.Item interval={3000}>
          <img
            className='d-block w-100 imageSlider'
            src={slider123}
            alt='Slider Img'
          />
          <Carousel.Caption className=' mb-5 rounded sliderCaption'>
            <h3>Bangladesh</h3>
            <p className='px-2'>
              Baundule often arrange tours in all Bangladesh.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={3000}>
          <img
            className='d-block w-100 imageSlider'
            src={Slider2}
            alt='Second slide'
          />
          <Carousel.Caption className=' mb-5 rounded sliderCaption'>
            <h3>Places Hidden in Bangladesh</h3>
            <p className='px-2'>
              Baundule often arrange tours all over the Bangladesh. It is
              basically a relax package where people of any ages can go. The
              packages of ours are not negotiable.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={3000}>
          <img
            className='d-block w-100 imageSlider'
            src={Slider3}
            alt='Third slide'
          />
          <Carousel.Caption className=' mb-5 rounded sliderCaption'>
            <h3>Tanguar Hawor</h3>
            <p className='px-2'>
              Baundule often arrange tours in Saint Martin. It is basically a
              relax package where people of any ages can go. The packages of
              ours are not negotiable.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={3000}>
          <img
            className='d-block w-100 imageSlider'
            src={Slider4}
            alt='Fourth slide'
          />
          <Carousel.Caption className=' mb-5 rounded sliderCaption'>
            <h3>Ratargul Swam Forest, Sylhet</h3>
            <p className='px-2'>
              Baundule often arrange tours in sylhet. It is basically a relax
              package where people of any ages can go. The packages of ours are
              not negotiable.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default Slider;
