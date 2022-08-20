import React from 'react';
import './Contact.css';
const Contact = () => {
  return (
    // <div className='container'>
    //     <div className="row">
    //         <div className="col-12 col-md-6">
    //             <img src="" alt="" />
    //         </div>
    //         <div className="col-12 col-md-6">

    //         </div>
    //     </div>
    // </div>
    <section id='contact'>
      <div className='container mb-4 mt-4'>
        <div className='row justify-content-center'>
          <div className='col-md-6 text-center mb-5'>
            <h2 className='heading-section fw-bold'>Contact Us</h2>
            <p className='fw-bold text-secondary'>
              Any Question or remarks? Just Write us a message!
            </p>
          </div>
        </div>
        <div className='row justify-content-center'>
          <div className='col-md-12'>
            <div className='wrapper'>
              <div className='row g-0'>
                <div className='col-lg-8 col-md-7 order-md-last d-flex align-items-stretch '>
                  <div className='contact-wrap w-100 p-md-5 p-4 columContact'>
                    <h3 className='mb-4'>Get in touch</h3>
                    <form
                      id='contactForm'
                      name='contactForm'
                      className='contactForm'
                    >
                      <div className='row'>
                        <div className='col-md-6'>
                          <div className='form-group my-2'>
                            <label
                              className='label contactLabel'
                              htmlFor='name'
                            >
                              Full Name
                            </label>
                            <input
                              type='text'
                              className='form-control px-2 py-1 my-1'
                              name='name'
                              id='name'
                              placeholder='Name'
                            />
                          </div>
                        </div>
                        <div className='col-md-6'>
                          <div className='form-group my-2'>
                            <label
                              className='label contactLabel'
                              htmlFor='email'
                            >
                              Email Address
                            </label>
                            <input
                              type='email'
                              className='form-control px-2 py-1 my-1'
                              name='email'
                              id='email'
                              placeholder='Email'
                              required
                            />
                          </div>
                        </div>
                        <div className='col-md-12'>
                          <div className='form-group my-2'>
                            <label
                              className='label contactLabel radioLabel'
                              htmlFor='website'
                            >
                              How Can We Assist You?
                            </label>
                            <div>
                              <div className='form-check form-check-inline me-4 mt-2'>
                                <input
                                  className='form-check-input text-success'
                                  type='radio'
                                  name='inlineRadioOptions'
                                  id='Relax Tour'
                                  value='Relax Tour Management'
                                />
                                <label
                                  className='form-check-label'
                                  htmlFor='webDesign'
                                >
                                  Relax TOur Packages
                                </label>
                              </div>
                              <div className='form-check form-check-inline me-4 mt-2'>
                                <input
                                  className='form-check-input'
                                  type='radio'
                                  name='inlineRadioOptions'
                                  id='customApp'
                                  value='Trekking Tours'
                                />
                                <label
                                  className='form-check-label'
                                  htmlFor='customApp'
                                >
                                  Trekking Tours
                                </label>
                              </div>
                              <div className='form-check form-check-inline mt-2'>
                                <input
                                  className='form-check-input'
                                  type='radio'
                                  name='inlineRadioOptions'
                                  id='ECommerce'
                                  value='Abroad Tours'
                                />
                                <label
                                  className='form-check-label'
                                  htmlFor='ECommerce'
                                >
                                  Abroad Tours
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className='col-md-12'>
                          <div className='form-group my-2'>
                            <label
                              className='label contactLabel'
                              htmlFor='subject'
                            >
                              Subject
                            </label>
                            <input
                              type='text'
                              className='form-control px-2 py-1 my-1'
                              name='subject'
                              id='subject'
                              placeholder='Subject'
                            />
                          </div>
                        </div>
                        <div className='col-md-12'>
                          <div className='form-group my-2'>
                            <label className='label contactLabel' htmlFor='#'>
                              Message
                            </label>
                            <textarea
                              name='message'
                              className='form-control px-2 py-1 my-1'
                              id='message'
                              cols='30'
                              rows='4'
                              placeholder='Message'
                              required
                            ></textarea>
                          </div>
                        </div>
                        <div className='col-md-12'>
                          <div className='form-group my-2'>
                            <input
                              type='submit'
                              value='Send Message'
                              className='btn btn-info mt-4'
                            />
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
                <div className='col-lg-4 col-md-5 d-flex align-items-stretch contactBorder'>
                  <div className='info-wrap  w-100 p-md-5 p-4'>
                    <h3>Contact Information</h3>
                    <p className='mb-4'>
                      Fill Up the form and our team will get back to you within
                      12 hours.
                    </p>
                    <div className='dbox w-100 d-flex align-items-start'>
                      <div className='icon d-flex align-items-center justify-content-center'>
                        <span className='fa fa-map-marker'></span>
                      </div>
                      <div className='text pl-3 ms-2'>
                        <p>Bongshal Mor, BUET Palashi Cattar, Dhaka</p>
                      </div>
                    </div>
                    <div className='dbox w-100 d-flex align-items-center'>
                      <div className='icon d-flex align-items-center justify-content-center'>
                        <span className='fa fa-phone'></span>
                      </div>
                      <div className='text pl-3 ms-2'>
                        <p>
                          {' '}
                          <a className='anchors' href='tel://1234567920'>
                            +8801631899938
                          </a>
                        </p>
                      </div>
                    </div>
                    <div className='dbox w-100 d-flex align-items-center'>
                      <div className='icon d-flex align-items-center justify-content-center'>
                        <span className='fa fa-paper-plane'></span>
                      </div>
                      <div className='text pl-3 ms-2'>
                        <p>
                          {' '}
                          <a
                            className='anchors'
                            href='mailto:info@yoursite.com'
                          >
                            info@baundule.com
                          </a>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
