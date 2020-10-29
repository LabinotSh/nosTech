import React from 'react'
import './contact.css'
import test from '../../assets/images/test.jpg'
import { Formik } from 'formik'
import * as Yup from 'yup'
import Error from '../../components/error/Error.js'

const validationSchema = Yup.object().shape({
  fname: Yup.string()
    .min(3, 'Must have more characters')
    .max(30, 'Must have less characters')
    .required('Must enter a name'),
  lname: Yup.string()
    .min(3, 'Must have more characters')
    .max(30, 'Must have less characters')
    .required('Must enter a name'),
  email: Yup.string()
    .email('Must be a valid email address')
    .max(100, 'Must have less characters')
    .required('Must enter a name'),
  subject: Yup.string()
    .min(5, 'Must have more characters')
    .max(50, 'Must have less characters'),
  message: Yup.string()
    .min(10, 'Must have more characters')
    .max(255, 'Must have less characters')
    .required('Must type a message'),
})

function Contact() {
  return (
    <div className='Content container-md'>
      {/* <p className = "comment-question">For any questions, comments, or concerns, 
                please fill out the information below and we’ll make sure to reply as soon as possible
            </p> */}
      {/* left col */}
      <div className='row'>
        <div className='left col'>
          <img src={test} alt='test' />
        </div>
        {/*  right col */}
        <div className=' right col'>
          <Formik
            initialValues={{
              fname: '',
              lname: '',
              email: '',
              subject: '',
              message: '',
            }}
            validationSchema={validationSchema}
          >
            {({ values, errors, touched, handleChange, handleBlur }) => (
              <form autoComplete='off'>
                <h1>Got any concern?</h1>
                <h2>Feel free to contact us!</h2>
                <div className='row mx-auto row-fields row-1'>
                  <div className='form-group mobile-col col-sm-12 col-md-6 col-lg-6'>
                    <input
                      name='fname'
                      type='text'
                      class='form-control'
                      className={
                        touched.fname && errors.fname ? 'has-error' : null
                      }
                      id='exampleInputName'
                      placeholder='First Name'
                      onChange={handleChange}
                      value={values.fname}
                      onBlur={handleBlur}
                    />
                    <Error touched={touched.fname} message={errors.fname} />
                  </div>

                  <div className='form-group mobile-col col-sm-12 col-md-6 col-lg-6'>
                    <input
                      name='lname'
                      type='text'
                      class='form-control'
                      className={
                        touched.lname && errors.lname ? 'has-error' : null
                      }
                      id='exampleInputName'
                      placeholder='Last name'
                      onChange={handleChange}
                      value={values.lname}
                      onBlur={handleBlur}
                    />
                    <Error touched={touched.lname} message={errors.lname} />
                  </div>
                </div>
                <div className='row row-fields row-2'>
                  <div className='form-group mobile-col col-6'>
                    <input
                      name='email'
                      type='email'
                      class='form-control'
                      className={
                        touched.email && errors.email ? 'has-error' : null
                      }
                      id='exampleInputEmail1'
                      aria-describedby='emailHelp'
                      placeholder='Enter your valid email'
                      onChange={handleChange}
                      value={values.email}
                      onBlur={handleBlur}
                    />
                    <Error touched={touched.email} message={errors.email} />
                  </div>

                  <div className='form-group mobile-col col-6'>
                    <input
                      name='subject'
                      type='text'
                      class='form-control'
                      className={
                        touched.subject && errors.subject ? 'has-error' : null
                      }
                      id='exampleInputSubject'
                      placeholder='Subject'
                      onChange={handleChange}
                      value={values.subject}
                      onBlur={handleBlur}
                    />
                    <Error touched={touched.subject} message={errors.subject} />
                  </div>
                </div>
                <div className='row row-fields row-3'>
                  <div id='exampleInputMesage1' className='form-group col-12'>
                    <textarea
                      name='message'
                      type='text'
                      class='form-control'
                      className={
                        touched.message && errors.message ? 'has-error' : null
                      }
                      id='exampleInputMesage'
                      placeholder='Your Message/Question'
                      onChange={handleChange}
                      value={values.message}
                      onBlur={handleBlur}
                    />
                    <Error touched={touched.message} message={errors.message} />
                  </div>
                </div>
                <small id='emailHelp' class='form-text text-muted'>
                  We'll never share your informations with anyone else.
                </small>
                <div className='row row-fields row-4'>
                  <button
                    type='submit'
                    label='send'
                    className='btn submit-btn btn-outline-dark btn-block pseudoBtn'
                  >
                    Send
                  </button>
                </div>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  )
}

export default Contact
