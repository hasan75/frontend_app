import React from 'react';
import heartOutline from '../../assets/images/heart-outline.png';
import heartFill from '../../assets/images/heart-fill.png';
import singleStoryStyles from './SingleStory.module.css';

const SingleStory = (props) => {
  const data = props.singledata;

  const convertedDateFormat = new Date(data.date).toLocaleDateString('en-us', {
    weekday: 'long',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <div className='col-lg-6'>
      <div className={`${singleStoryStyles.card} card  m-1`}>
        <div className='card-header'>
          <div className='profile'>
            <span className='letter'>{data.storyAuthor}</span>
          </div>
          <div className='card-title-group'>
            <h5 className='card-title'>{data.title}</h5>
            <div className='card-date'>{convertedDateFormat}</div>
          </div>
        </div>

        <img
          className={`${singleStoryStyles.cardImage} card-image`}
          src={data.image}
          alt='Logo'
        />
        <div className='card-text mb-2'>{data.description}</div>
        <div className='card-like-bar d-flex justify-content-center align-items-center'>
          <div className='likeDIv'>
            {data.isLiked ? (
              <img className='card-like-icon' src={heartFill} alt='Logo' />
            ) : (
              <img className='card-like-icon' src={heartOutline} alt='Logo' />
            )}
          </div>

          <div className='like-text ms-2'>
            <b>{data.like}</b> peoples love this.
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleStory;
