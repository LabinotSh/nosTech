import React from "react";
import "./registration.css";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import registerBackground from "../../assets/images/registerBackground.png";
import { Formik } from "formik";
import * as Yup from "yup";
import Error from "../../components/error/Error.js";
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
  roles: Yup.string().required("Please select an account type"),
  // role: Yup.string().required("Please select an account type"),
  // .oneOf(["Student", "Teacher"], "Please select an account type")
});

function Registration() {
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
        <Container style={{ marginBottom: "150px" }}>
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
                  Please enter your credentials to set up an account with us
                </Card.Text>
                <Form onSubmit={handleSubmit}>
                  <Form.Group controlId="formBasicName">
                    <Form.Control
                      type="text"
                      name="name"
                      id="name"
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
                  <Form.Group controlId="exampleForm.SelectCustom">
                    <Form.Label style={{ fontSize: "14px" }}>
                      You are registering as a:
                    </Form.Label>
                    <Form.Group controlId="exampleForm.SelectCustom">
                    <Form.Control 
                    as="select" 
                    custom>
                      <option>Student</option>
                      <option>Teacher</option>
                    </Form.Control>
                  </Form.Group>
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
