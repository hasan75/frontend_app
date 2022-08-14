import React from 'react';
import '../assets/css/header.css';
import { Container, Nav, Navbar, Spinner } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';
import useContexts from './../hooks/useContexts';
import logo from '../assets/images/logo.png';

const Header = () => {
  const { email, logout, loading } = useContexts();
  return (
    <div className='bg-dark'>
      <Navbar className='navBar' variant='dark' expand='lg'>
        <Container>
          <Navbar.Brand as={Link} to='/'>
            <img width='80px' height='80px' src={logo} alt='' />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ms-auto'>
              <Nav.Link activeClassName='current' as={NavLink} to='/home'>
                Home
              </Nav.Link>
              <Nav.Link activeClassName='current' as={NavLink} to='/about'>
                About
              </Nav.Link>

              <Nav.Link activeClassName='current' as={NavLink} to='/products'>
                Packages
              </Nav.Link>
              <Nav.Link activeClassName='current' as={NavLink} to='/blogs'>
                Blogs
              </Nav.Link>
              <Nav.Link activeClassName='current' as={NavLink} to='/dashboard'>
                Dashboard
              </Nav.Link>
              {email ? (
                <Nav.Link as={NavLink} to='/'>
                  <button onClick={logout} className='login-button'>
                    {loading ? (
                      <Spinner animation='border' role='status'>
                        <span className='visually-hidden'>Loading...</span>
                      </Spinner>
                    ) : (
                      'Logout'
                    )}
                  </button>
                </Nav.Link>
              ) : (
                <Nav.Link activeClassName='current' as={NavLink} to='/login'>
                  <button className='login-button'>
                    {loading ? (
                      <Spinner animation='border' role='status'>
                        <span className='visually-hidden'>Loading...</span>
                      </Spinner>
                    ) : (
                      'Login'
                    )}
                  </button>
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
