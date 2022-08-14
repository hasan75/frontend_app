import React from 'react';
import {
  Button,
  Col,
  Form,
  FormControl,
  InputGroup,
  Row,
} from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { useHistory } from 'react-router-dom';
import './../assets/css/AddService.css';

const AddProduct = () => {
  const history = useHistory();
  const { register, handleSubmit, reset } = useForm();
  const onSubmit = async (data) => {
    data.rating = 5;
    data.totalReview = 1;
    Swal.fire({
      icon: 'warning',
      title: 'Are you sure to add this package?',
      showCancelButton: true,
      confirmButtonText: 'Yes',
    }).then((result) => {
      if (result.isConfirmed) {
        fetch('http://localhost:5001/addProduct', {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify(data),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.insertedId) {
              reset();
              Swal.fire('Confirmed!', '', 'success');
              history.replace('/products');
            }
          })
          .catch((err) => {
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: 'Something went wrong!',
              html: 'Please, try again',
              showConfirmButton: false,
              timer: 1500,
            });
          });
      }
    });
    reset();
  };

  return (
    <>
      <section className='add-service'>
        <h3 className='text-center mb-3 fw-bold'>Add a new Package</h3>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <div
            className='pb-5 mx-auto  bg-white form-main'
            style={{ borderRadius: '15px', maxWidth: '85rem' }}
          >
            <Row className='justify-content-center'>
              <Form.Group as={Col} md={6} sm={12} className='mr-md-5'>
                <Form.Label style={{ fontWeight: 'bold' }}>
                  Tour Event Name
                </Form.Label>
                <Form.Control
                  type='text'
                  {...register('title', { required: true })}
                  placeholder='Tour Event title'
                />
              </Form.Group>
              <Form.Group as={Col} md={6} sm={12} className='mr-md-5'>
                <Form.Label style={{ fontWeight: 'bold' }}>Tour Tag</Form.Label>
                <Form.Control
                  type='text'
                  {...register('tag', { required: true })}
                  placeholder='Tour Tag'
                />
              </Form.Group>
            </Row>

            <Row className='justify-content-center mb-2 mt-4'>
              <Form.Group as={Col} md={4} sm={12}>
                <Form.Label style={{ fontWeight: 'bold' }}>
                  Member Capacity
                </Form.Label>
                <Form.Control
                  type='number'
                  {...register('member', { required: true })}
                  placeholder='Enter package capacity'
                />
              </Form.Group>
              <Form.Group as={Col} md={4} sm={12}>
                <Form.Label style={{ fontWeight: 'bold' }}>
                  Estimated Cost
                </Form.Label>
                <Form.Control
                  type='number'
                  {...register('price', { required: true })}
                  placeholder='Enter package cost'
                />
              </Form.Group>
              <Form.Group as={Col} md={4} sm={12}>
                <Form.Label style={{ fontWeight: 'bold' }}>
                  Discount in %
                </Form.Label>
                <Form.Control
                  type='discount'
                  {...register('discount', { required: false })}
                  placeholder='Want to Give some discount perentage?'
                />
              </Form.Group>
            </Row>

            <Row className='justify-content-center mb-2 mt-4'>
              <Form.Group as={Col} md={4} sm={12}>
                <Form.Label style={{ fontWeight: 'bold' }}>
                  Tour Start From
                </Form.Label>
                <Form.Control
                  type='text'
                  {...register('from', { required: true })}
                  placeholder='Journey Start From?'
                />
              </Form.Group>

              <Form.Group as={Col} md={4} sm={12} className='mr-md-5'>
                <Form.Label style={{ fontWeight: 'bold' }}>
                  Tour Date
                </Form.Label>
                <Form.Control
                  type='date'
                  {...register('tour_date', { required: true })}
                  placeholder='Tour Date'
                />
              </Form.Group>
              <Form.Group as={Col} md={4} sm={12} className='mr-md-5'>
                <Form.Label style={{ fontWeight: 'bold' }}>
                  Tour Starting Time
                </Form.Label>
                <Form.Control
                  type='time'
                  {...register('start_time', { required: true })}
                  placeholder='Start ime'
                />
              </Form.Group>
            </Row>

            <Row className='justify-content-center mb-2 mt-4'>
              <Form.Group as={Col} md={4} sm={12}>
                <Form.Label style={{ fontWeight: 'bold' }}>
                  Tour Destination
                </Form.Label>
                <Form.Control
                  type='text'
                  {...register('destination', { required: true })}
                  placeholder='Tour Destination'
                />
              </Form.Group>

              <Form.Group as={Col} md={4} sm={12} className='mr-md-5'>
                <Form.Label style={{ fontWeight: 'bold' }}>
                  Returning Date
                </Form.Label>
                <Form.Control
                  type='date'
                  {...register('return_date', { required: true })}
                  placeholder='Tour Returning Date'
                />
              </Form.Group>
              <Form.Group as={Col} md={4} sm={12} className='mr-md-5'>
                <Form.Label style={{ fontWeight: 'bold' }}>
                  Return Time
                </Form.Label>
                <Form.Control
                  type='time'
                  {...register('return_time', { required: true })}
                  placeholder='Tour Returning Time'
                />
              </Form.Group>
            </Row>

            <Row>
              <InputGroup as={Col} className='mb-3 mt-md-3'>
                <Form.Label
                  className='d-block w-100'
                  style={{ fontWeight: 'bold' }}
                >
                  Phot URL
                </Form.Label>
                <InputGroup.Text id='basic-addon1'>
                  <i className='fas fa-link'></i>
                </InputGroup.Text>
                <FormControl
                  id='upload'
                  type='text'
                  {...register('img')}
                  placeholder='Enter tour package image'
                />
              </InputGroup>
            </Row>
            <Row>
              <Form.Group as={Col} md={12} sm={12} className='mr-md-5 mt-md-3'>
                <Form.Label style={{ fontWeight: 'bold' }}>
                  Description
                </Form.Label>
                <Form.Control
                  style={{ height: '10rem' }}
                  type='text'
                  as='textarea'
                  {...register('desc', { required: true })}
                  placeholder='Enter package description'
                />
              </Form.Group>
            </Row>

            <div className='text-center mt-4'>
              <Button type='submit' className='submit-btn btn-main'>
                Submit
              </Button>
            </div>
          </div>
        </Form>
      </section>
    </>
  );
};

export default AddProduct;

/* 
     
*/
