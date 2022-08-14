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
import '../assets/css/AddBlog.css';

const AddBlogs = () => {
  const history = useHistory();
  const { register, handleSubmit, reset } = useForm();

  // for adding blogs
  const onSubmit = async (data) => {
    data.isLiked = true;
    Swal.fire({
      icon: 'warning',
      title: 'Are you sure to add this blog?',
      showCancelButton: true,
      confirmButtonText: 'Yes',
    }).then((result) => {
      if (result.isConfirmed) {
        fetch('http://localhost:5001/addBlog', {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify(data),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.insertedId) {
              reset();
              Swal.fire('Confirmed!', '', 'success');
              history.replace('/home');
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
    <section className='add-service'>
      <h3 className='text-center mb-3 fw-bold'>Add a new Blog</h3>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <div
          className='pb-5 mx-auto  bg-white form-main'
          style={{ borderRadius: '15px', maxWidth: '85rem' }}
        >
          <Row className='justify-content-center'>
            <Form.Group as={Col} md={6} sm={12} className='mr-md-5'>
              <Form.Label style={{ fontWeight: 'bold' }}>Blog Title</Form.Label>
              <Form.Control
                type='text'
                {...register('title', { required: true })}
                placeholder='Blog Title'
              />
            </Form.Group>
            <Form.Group as={Col} md={6} sm={12} className='mr-md-5'>
              <Form.Label style={{ fontWeight: 'bold' }}>Tour Tag</Form.Label>
              <Form.Control
                type='text'
                {...register('tag', { required: false })}
                placeholder='Tour Tag'
              />
            </Form.Group>
          </Row>

          <Row className='justify-content-center mb-2 mt-4'>
            <Form.Group as={Col} md={6} sm={12}>
              <Form.Label style={{ fontWeight: 'bold' }}>
                Blog Author
              </Form.Label>
              <Form.Control
                type='text'
                {...register('storyAuthor', { required: true })}
                placeholder='Enter Author Name'
              />
            </Form.Group>
            <Form.Group as={Col} md={6} sm={12}>
              <Form.Label style={{ fontWeight: 'bold' }}>Date</Form.Label>
              <Form.Control
                type='date'
                {...register('date', { required: true })}
                placeholder='Blog Whiting Date'
              />
            </Form.Group>
          </Row>
          <Row className='justify-content-center mb-2 mt-4'>
            <Form.Group as={Col} md={6} sm={12}>
              <Form.Label style={{ fontWeight: 'bold' }}>Liked By</Form.Label>
              <Form.Control
                type='number'
                {...register('like', { required: true })}
                placeholder='Enter People Number'
              />
            </Form.Group>
            <Form.Group as={Col} md={6} sm={12}>
              <Form.Label style={{ fontWeight: 'bold' }}>Tour Place</Form.Label>
              <Form.Control
                type='text'
                {...register('tourPlace', { required: false })}
                placeholder='Blog Whiting Date'
              />
            </Form.Group>
          </Row>

          <Row>
            <InputGroup as={Col} className='mb-3 mt-md-3'>
              <Form.Label
                className='d-block w-100'
                style={{ fontWeight: 'bold' }}
              >
                Photo URL
              </Form.Label>
              <InputGroup.Text id='basic-addon1'>
                <i className='fas fa-link'></i>
              </InputGroup.Text>
              <FormControl
                id='upload'
                type='text'
                {...register('image')}
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
                {...register('description', { required: true })}
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
  );
};

export default AddBlogs;
