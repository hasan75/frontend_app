import React, { useEffect, useState } from 'react';
import { Container, Row, Spinner } from 'react-bootstrap';
import useProducts from '../hooks/useProducts.js';
import Product from './Product.js';
import Bounce from 'react-reveal/Bounce';
import Swal from 'sweetalert2';
import servicesStyle from '../assets/css/services.module.css';
import { Fade } from 'react-reveal';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [displayServices, setDisplayServices] = useState([]);
  const size = 6;
  // console.log(displayServices);
  // console.log(products);

  useEffect(() => {
    fetch(`http://localhost:5001/products?page=${page}&&size=${size}`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
        setDisplayServices(data.products);
        const countService = data.count;
        const pageNumber = Math.ceil(countService / size);
        setPageCount(pageNumber);
      })
      .catch((err) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
          footer: 'Please, try again',
        });
      });
  }, [page]);
  const count = products.length;

  const handleSearch = (e) => {
    const searchText = e.target.value;
    // const matchedProducts = products.filter(pro);
    const matchedProducts = products.filter(
      (product) =>
        product.title.toLowerCase().includes(searchText.toLowerCase()) ||
        product.desc.toLowerCase().includes(searchText.toLowerCase())
    );
    setDisplayServices(matchedProducts);
  };

  return (
    <>
      {!count ? (
        <div className='text-center my-5 private-spinner py-5'>
          <Spinner variant='danger' animation='border' role='status'>
            <span className='visually-hidden'>Loading...</span>
          </Spinner>
          <h6>Loading...</h6>
        </div>
      ) : (
        <Container className='mb-5'>
          <Fade top cascade>
            <h2 className='text-center text-uppercase mt-5 mb-4 feature'>
              Tour Packages
            </h2>
            <p
              style={{ maxWidth: '650px' }}
              className='text-center mx-auto mt-3'
            >
              {' '}
              Baundule Travellers, trusted by thousands of travellers and people
              around the country tries it's best to be with you, to assist you.
            </p>
          </Fade>
          <div className={`${servicesStyle.searchContainer} my-2`}>
            <input
              type='text'
              onChange={handleSearch}
              placeholder='Search Your Desire Package'
            />
          </div>
          <Row>
            {displayServices?.map((product) => (
              <Product kay={product._id} product={product} />
            ))}
          </Row>
          <div className={`${servicesStyle.pagination} text-center`}>
            <span className='me-2 text-primary fw-bold'>Go to Page: </span>
            {[...Array(pageCount).keys()].map((number) => (
              <button
                className={
                  number === page
                    ? [
                        servicesStyle['selected'],
                        'btn',
                        'btn-outline-primary',
                      ].join(' ')
                    : 'btn btn-outline-primary'
                }
                key={number}
                onClick={() => setPage(number)}
              >
                {number + 1}
              </button>
            ))}
          </div>
        </Container>
      )}
    </>
  );
};

export default Products;
