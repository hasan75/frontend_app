import React from 'react';
import { Button, Card, Container } from 'react-bootstrap';
import useContexts from '../hooks/useContexts.js';
import ItemDashboard from './ItemDashboard/ItemDashboard.js';

const Profile = () => {
  const { displayName, email, logout } = useContexts();
  return (
    <>
      <div className='container my-2'>
        <div className='d-flex justify-content-end'>
          <div className='imgContainer d-flex align-items-center justify-content-center'>
            <img
              src='https://i.ibb.co/5GzXkwq/user.png'
              alt='Admin'
              className='rounded-circle'
              width='80'
            />
            <div className='info d-flex flex-column align-items-center justify-content-between ms-4'>
              <span className='text-uppercase mb-1'>{displayName}</span>
              {/* <Button onClick={logout} className='px-4 logout-btn btn-main'>
                Logout
              </Button> */}
              <span className='text-secondary'>{email}</span>
            </div>
          </div>
        </div>
        {/* for the summary component  */}
        <ItemDashboard email={email} displayName={displayName}></ItemDashboard>
      </div>
      {/* for profile component  */}
      <Container style={{ maxWidth: '30rem', marginBottom: '25px' }}>
        <Card className='border-0 shadow'>
          <Card.Header as={'h4'} className='text-center border-0 mt-1'>
            Profile
          </Card.Header>
          <Card.Body className='card-body'>
            <div className='d-flex flex-column align-items-center text-center'>
              <img
                src='https://i.ibb.co/5GzXkwq/user.png'
                alt='Admin'
                className='rounded-circle'
                width='150'
              />
              <div className='mt-3'>
                <h4>{displayName}</h4>
                <p className='text-secondary mb-1'>{email}</p>
              </div>
              <Button onClick={logout} className='px-4 logout-btn btn-main'>
                Logout
              </Button>
            </div>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default Profile;
