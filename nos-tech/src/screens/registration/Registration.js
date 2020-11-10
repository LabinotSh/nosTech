import React, { useEffect, useState } from "react";
import "./registration.css";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import registerBackground from "../../assets/images/registerBackground.png";
import { Formik } from "formik";
import * as Yup from "yup";
import Error from "../../components/error/Error.js";
import { register } from "../../redux/actions/auth";
import { connect, useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import { history } from "../../helpers/history";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Notifications, { notify } from "react-notify-toast";
import Spinner from "../../components/icons/Spinner";
import Loader from '../../components/icons/Loader';
// import SelectComp from "../../components/select/SelectComp.js";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Full name is required"),
  username: Yup.string()
    .min(4, "Must have at least 4 characters")
    .max(255, "Must be shorter than 255 characters")
    .required("Username is required"),
  email: Yup.string()
    .email("Must be a valid email address")
    .max(255, "Must be shorter than 255 characters")
    .required("Email is required"),
  password: Yup.string()
    .min(5, "Must have at least 5 characters")
    .max(255, "Must be shorter than 255 characters")
    .required("Password is required"),
  // roles: Yup.string().required("Please select an account type"),
  // role: Yup.string().required("Please select an account type"),
  // .oneOf(["Student", "Teacher"], "Please select an account type")
});

const Registration = ({ successRegister, err }) => {
  const dispatch = useDispatch();

  const [registered, setRegister] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [role, setRole] = useState("");

  let toastColor = { background: "#6279AB", text: "#FFFFFF" };

  useEffect(() => {
    if (successRegister) {

    }
  }, [notify]);

  return (
    <Formik
      initialValues={{
        name: "",
        username: "",
        email: "",
        password: "",
        roles: "",
      }}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        setSubmitting(true);
        var fullname = values.name.lastIndexOf(" ");
        var name = values.name.substring(0, fullname);
        var surname = values.name.substring(fullname + 1);
        setEmailSent(true);

        //down below is where the data should be sent to the server
        dispatch(
          register(
            name,
            surname,
            values.email,
            values.password,
            role,
            values.username
          )
        )
          .then((response) => {
            setSubmitting(true);
            setRegister(true);
            setEmailSent(false);

            console.log("Data " + JSON.stringify(response.data));

            notify.show(
              <div>
                {response.data.msg}
                <button
                  className="btn btn-sm btn-outline-light"
                  onClick={notify.hide}
                >
                  Close
                </button>
              </div>,
              "custom",
              -1,
              toastColor
            );
          })
          .catch((err) => {
            setRegister(false);
            setSubmitting(false);
            console.log("Error: " + err);
          });

        setTimeout(() => {
          setRegister(false);
          err=null;
          resetForm();
          setSubmitting(false);
        }, 1000);
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
        <Container style={{ marginBottom: "150px" }}>
          {/* The notification when the user registers */}
          <Notifications options={{ top: "10px" }} />
          <Row noGutters={true}>
            <Col sm={12} md={12} lg={6}>
              <Card className="text-center cards">
                <Card.Img src={registerBackground} alt="test"></Card.Img>
              </Card>
            </Col>
            <Col sm={12} md={12} lg={6}>
              <Card className="text-center cards registerCard">
                <Card.Title className="title">Welcome to nosTech</Card.Title>
                <Card.Text style={{ marginBottom: "30px", fontSize: "14px" }}>
                  Please enter your credentials to set up an account with us!
                </Card.Text>
                <Form onSubmit={handleSubmit}>
                  {err && <div className="text-danger">{err}</div>}
                  <Form.Group controlId="formBasicName">
                    <Form.Control
                      type="text"
                      name="name"
                      // id="name"
                      placeholder="Full Name"
                      onChange={handleChange}
                      value={values.name}
                      onBlur={handleBlur}
                      className={
                        touched.name && errors.name ? "has-error" : null
                      }
                    />
                    <Error touched={touched.name} message={errors.name} />
                  </Form.Group>

                  <Form.Group controlId="formBasicUsername">
                    <Form.Control
                      type="text"
                      name="username"
                      //id="username"
                      placeholder="Username"
                      onChange={handleChange}
                      value={values.username}
                      onBlur={handleBlur}
                      className={
                        touched.username && errors.username ? "has-error" : null
                      }
                    />
                    <Error
                      touched={touched.username}
                      message={errors.username}
                    />
                  </Form.Group>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Control
                      type="text"
                      name="email"
                      //id="email"
                      placeholder="Email"
                      onChange={handleChange}
                      value={values.email}
                      onBlur={handleBlur}
                      className={
                        touched.email && errors.email ? "has-error" : null
                      }
                    />
                    <Error touched={touched.email} message={errors.email} />
                  </Form.Group>
                  <Form.Group controlId="formBasicPassword">
                    <Form.Control
                      type="password"
                      name="password"
                      //id="password"
                      placeholder="Password"
                      onChange={handleChange}
                      value={values.password}
                      onBlur={handleBlur}
                      className={
                        touched.password && errors.password ? "has-error" : null
                      }
                    />
                    <Error
                      touched={touched.password}
                      message={errors.password}
                    />
                  </Form.Group>
                  <Form.Group controlId="exampleForm.SelectCustom">
                    <Form.Label style={{ fontSize: "14px" }}>
                      You are registering as a:
                    </Form.Label>
                    <Form.Group controlId="exampleForm.SelectCustom">
                      <Form.Control
                        as="select"
                        onChange={(e) => {
                          const roli = e.target.value;
                          setRole(roli);
                          console.log("ROLE " + roli);
                        }}
                        value={role}
                        onBlur={handleBlur}
                        required={true}
                        custom
                      >
                        <option hidden value="choose">
                          ---Choose one---
                        </option>
                        <option value="user">Student</option>
                        <option value="admin">Teacher</option>
                      </Form.Control>
                      {role == "" && (
                        <div className="text-danger">This is required!</div>
                      )}
                    </Form.Group>
                  </Form.Group>

                  <Button
                    className="register"
                    type="submit"
                    disabled={emailSent}
                  >
                  {emailSent && (
                    <Spinner size='1x' spinning="spinning" />
                  )}
                   Register
                  </Button>
                </Form>
              </Card>
            </Col>
          </Row>
        </Container>
      )}
    </Formik>
  );
};

function mapStateToProps(state) {
  return {
    successRegister: state.login.registered,
    err: state.login.error,
  };
}

export default connect(mapStateToProps, { register })(withRouter(Registration));
