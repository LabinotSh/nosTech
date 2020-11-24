import React from "react";
import "./subscription.css";
import {
  Form,
  Button,
  FormControl,
  InputGroup,
  FormGroup,
} from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";

// import { API_URL } from '../../constants/Constants'
import Notifications, { notify } from "react-notify-toast";
import { Formik } from "formik";
import * as Yup from "yup";
import Error from "../../components/error/Error.js";
import SubscriptionMessage from "../../components/subscriptionMessage/SubscriptionMessage";
import Spinner from "../../components/icons/Spinner";
import { API_URL } from "../../constants/Constants";

// import email from '../../../../server/mail_server/email'

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Must enter a name"),
  email: Yup.string()
    .email("Must be a valid email address")
    .max(255, "Must be shorter than 255")
    .required("Must enter an email"),
});

const Subscription = () => {
  const [emailSent, setEmailSent] = useState(false);
  let toastColor = { background: "#e2dcf4", text: "#000" };

  const sendEmail = (name, email) => {
    console.log(name + email);
    axios
      .post(`${API_URL}/newsletter`, {
        name,
        email,
      })
      .then((res) => {
        console.log("res " + JSON.stringify(res.data));
      })
      .catch((err) => console.log(err.response));
  };

  return (
    <div className="subscription">
      {/*  <Notifications /> */}

      {emailSent ? (
        <SubscriptionMessage />
      ) : (
        <p style={{ color: "white", fontSize: "15px" }}>
          <b>Subscribe</b> for the latest from nosTech:
        </p>
      )}

      <Formik
        initialValues={{ name: "", email: "" }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setSubmitting(true);
          sendEmail(values.name, values.email);
          setEmailSent(true);

          setTimeout(() => {
            // alert(JSON.stringify(values, null, 2));
            setEmailSent(false);
            resetForm(true);
            setSubmitting(false);

            // notify.show(
            //   <div>
            //     <span>
            //       You have been subscribed! <br />
            //       You are a part of our family now!
            //     </span>
            //     <button
            //       className="btn btn-sm btn-outline-light"
            //       onClick={notify.hide}
            //     >
            //       {" "}
            //       X{" "}
            //     </button>
            //   </div>,
            //   "custom",
            //   4000,
            //   toastColor
            // );
          }, 1700);
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
          <Form
            className="subscription-form"
            onSubmit={handleSubmit}
            id="subs-form"
          >
            <InputGroup id="testinput">
              <Form.Group>
                <FormControl
                  size="sm"
                  placeholder="Your full name.."
                  name="name"
                  id="formcontroltest"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                  className={touched.name && errors.name ? "has-errors" : null}
                />
                <Error touched={touched.name} message={errors.name} />
              </Form.Group>
            </InputGroup>
            <InputGroup id="testinput">
              <Form.Group>
                <FormControl
                  size="sm"
                  placeholder="Your email address.."
                  name="email"
                  id="formcontroltest"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  className={
                    touched.email && errors.email ? "has-errors" : null
                  }
                />
                <Error touched={touched.email} message={errors.email} />
              </Form.Group>
            </InputGroup>

            <Button
              className="submit-btn"
              type="submit"
              disabled={isSubmitting}
            >
              {emailSent ? <Spinner size="1x" spinning="spinning" /> : "Submit"}
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Subscription;
