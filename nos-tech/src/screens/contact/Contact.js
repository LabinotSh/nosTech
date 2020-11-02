import React from 'react'
import './contact.css'
import test from '../../assets/images/test.png'
import { Formik } from 'formik'
import * as Yup from 'yup'
import Error from '../../components/error/Error.js'

const validationSchema = Yup.object().shape({
  fname: Yup.string()
    .min(3, 'Must have more characters')
    .max(30, 'Must have less characters')
    .required('Must enter your first name'),
  lname: Yup.string()
    .min(3, 'Must have more characters')
    .max(30, 'Must have less characters')
    .required('Must enter your last name'),
  email: Yup.string()
    .email('Must be a valid email address')
    .max(100, 'Must have less characters')
    .required('Must enter your valid e-mail'),
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
      <div className='row main-row'>
        <div className='left col col-sm-12 col-md-12 col-lg-6'>
          <img src={test} alt='test' />
        </div>
        {/*  right col */}
        <div className=' right col col-sm-12 col-md-12 col-lg-6'>
          <Formik
            initialValues={{
              fname: '',
              lname: '',
              email: '',
              subject: '',
              message: '',
            }}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting, resetForm }) => {
              setSubmitting(true)
              //test
              setTimeout(() => {
                alert(JSON.stringify(values, null, 2))
                resetForm()
                setSubmitting(false)
              }, 500)
            }}
          >
            {/* form inside a render props function that receives 
                "values" and functions
                which then returns the form*/}
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
            }) => (
              <form onSubmit={handleSubmit}>
                <h1>Got any concern?</h1>
                <h2>Feel free to contact us!</h2>

                <div className='row row-fields row-1'>
                  <div className='form-group frm-group mobile-col col-sm-12 col-md-6 col-lg-6'>
                    <input
                      name='fname'
                      type='text'
                      className={
                        touched.fname && errors.fname
                          ? 'form-control form-group frm-control'
                          : 'form-control form-group frm-control'
                      }
                      id='exampleInputName'
                      placeholder='First Name'
                      onChange={handleChange}
                      value={values.fname}
                      onBlur={handleBlur}
                    />
                    <Error touched={touched.fname} message={errors.fname} />
                  </div>

                  <div className='form-group frm-group mobile-col col-sm-12 col-md-6 col-lg-6'>
                    <input
                      name='lname'
                      type='text'
                      class='form-group form-control frm-control'
                      className={
                        touched.lname && errors.lname
                          ? 'form-control form-group frm-control'
                          : 'form-control form-group frm-control'
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
                  <div className='form-group frm-group mobile-col col-sm-12 col-md-6 col-lg-6'>
                    <input
                      name='email'
                      type='email'
                      class='form-group form-control frm-control'
                      className={
                        touched.email && errors.email
                          ? 'form-control form-group frm-control'
                          : 'form-control form-group frm-control'
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

                  <div className='form-group frm-group mobile-col col-sm-12 col-md-6 col-lg-6'>
                    <input
                      name='subject'
                      type='text'
                      class='form-group form-control frm-control'
                      className={
                        touched.subject && errors.subject
                          ? 'form-control form-group frm-control'
                          : 'form-control form-group frm-control'
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
                  <div
                    id='exampleInputMesage1'
                    className='form-group frm-group col-sm-12 col-md-6 col-lg-12'
                  >
                    <textarea
                      name='message'
                      type='text'
                      class='form-group form-control frm-control'
                      className={
                        touched.message && errors.message
                          ? 'form-control form-group frm-control'
                          : 'form-control form-group frm-control'
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
                    disabled={isSubmitting}
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
