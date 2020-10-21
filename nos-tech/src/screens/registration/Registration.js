import React from "react";
import "./registration.css";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import registerBackground from "../../assets/images/registerBackground.png";
import { Formik } from "formik";
import * as Yup from "yup";
import Error from "../../components/error/Error.js";

const validationSchema = Yup.object().shape({
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
});

function Registration() {
  return (
    <Formik
      initialValues={{ username: "", email: "", password: "" }}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        setSubmitting(true);
        //down below is where the data should be sent to the server
        setTimeout(() => {
          //will put a spinner instead of the alert for logging in kur t'shtohet auth
          alert(JSON.stringify(values, null, 2));
          resetForm();
          setSubmitting(false);
        }, 500);
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
        <Container>
          <Row noGutters={true}>
            <Col sm={12} md={12} lg={6}>
              {" "}
              <Card className="text-center cards">
                <Card.Img src={registerBackground} alt="test"></Card.Img>
              </Card>
            </Col>
            <Col sm={12} md={12} lg={6}>
              <Card className="text-center cards registerCard">
                <Card.Title className="title">Welcome to nosTech</Card.Title>
                <Card.Text style={{ marginBottom: "30px", fontSize: "14px" }}>
                  Please enter your credentials to set up an account with us
                </Card.Text>
                <Form onSubmit={handleSubmit}>
                  <Form.Group controlId="formBasicUsername">
                    <Form.Control
                      type="text"
                      name="username"
                      id="name"
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
                      id="email"
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
                      id="password"
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
                  <Button
                    className="register"
                    type="submit"
                    disabled={isSubmitting}
                  >
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
}

export default Registration;
