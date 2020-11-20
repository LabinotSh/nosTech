import React from 'react'
import './subscription.css'
import {
  Form,
  Button,
  FormControl,
  InputGroup,
  FormGroup,
} from 'react-bootstrap'
import { useEffect, useState } from 'react'
import axios from 'axios'

// import { API_URL } from '../../constants/Constants'
import Notifications, { notify } from 'react-notify-toast'
import { Formik } from 'formik'
import * as Yup from 'yup'
import Error from '../../components/error/Error.js'
import Spinner from '../../components/icons/Spinner'
import { API_URL } from '../../constants/Constants'

// import email from '../../../../server/mail_server/email'

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Must have a character')
    .max(255, 'Must be shorter than 255')
    .required('Must enter a name'),
  email: Yup.string()
    .email('Must be a valid email address')
    .max(255, 'Must be shorter than 255')
    .required('Must enter an email'),
})

const Subscription = () => {
  const [emailSent, setEmailSent] = useState(false)
  let toastColor = { background: '#e2dcf4', text: '#000' }

  const sendEmail = (name, email) => {
    console.log(name + email)
    axios
      .post(`${API_URL}/newsletter`, {
        name,
        email,
      })
      .then((res) => {
        console.log('res ' + JSON.stringify(res.data))
      })
      .catch((err) => console.log(err.response))
  }

  return (
    <div className='subscription'>
      <Notifications />
      <p>
        <b>Subscribe</b> for the latest from nosTech:
      </p>

      <Formik
        initialValues={{ name: '', email: '' }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setSubmitting(true)
          sendEmail(values.name, values.email)
          setEmailSent(true)

          setTimeout(() => {
            // alert(JSON.stringify(values, null, 2))
            setEmailSent(false)
            resetForm(true)
            setSubmitting(false)

            notify.show(
              <div>
                <span>
                  You have been subscribed! <br />
                  You are a part of our family now!
                </span>
                <button
                  className='btn btn-sm btn-outline-light'
                  onClick={notify.hide}
                >
                  {' '}
                  X{' '}
                </button>
              </div>,
              'custom',
              4000,
              toastColor
            )
          }, 500)
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <Form className='subscription-form' onSubmit={handleSubmit}>
            <InputGroup
              size='sm'
              className='mt-2 mb-3 ml-5 subscription-input-group'
            >
              <Form.Group>
                <FormControl
                  aria-label='Small'
                  placeholder='Your full name..'
                  aria-describedby='inputGroup-sizing-sm'
                  required
                  name='name'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                  className={touched.name && errors.name ? 'has-errors' : null}
                />

                <Error>
                  touched={touched.name}
                  message={errors.name}
                </Error>
              </Form.Group>
            </InputGroup>
            <InputGroup
              size='sm'
              className='mt-1 mb-4 ml-5 subscription-input-group'
            >
              <Form.Group>
                <FormControl
                  aria-label='Small'
                  placeholder='Your email address..'
                  aria-describedby='inputGroup-sizing-sm'
                  required
                  name='email'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  className={
                    touched.email && errors.email ? 'has-errors' : null
                  }
                />
                <Error>
                  touched={touched.email}
                  message={errors.email}
                </Error>
              </Form.Group>
            </InputGroup>
            <br />
            <div>
              <Button
                className='submit-btn'
                type='submit'
                disabled={isSubmitting}
              >
                {emailSent ? (
                  <Spinner size='1x' spinning='spinning' />
                ) : (
                  'Submit'
                )}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default Subscription
