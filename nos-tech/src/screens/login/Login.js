import React from "react";
import "./login.css";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import Error from "../../components/error/Error.js";

const validationSchema = Yup.object().shape({
  username: Yup.string().required("(Username is required)"),
  password: Yup.string().required("(Password is required)"),
});

function Login() {
  return (
    <Formik
      initialValues={{ username: "", password: "" }}
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
              <Card className="text-center cards two">
                <Card.Title className="title">Welcome Back</Card.Title>
                <Card.Text style={{ marginBottom: "30px", fontSize: "14px" }}>
                  Please enter your credentials
                </Card.Text>
                <Form onSubmit={handleSubmit}>
                  {/* {JSON.stringify(values)} */}
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
                    className="logInBtn"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    Login Now
                  </Button>
                  <Button className="registerBtn">Create Account</Button>
                </Form>
              </Card>
            </Col>

            <Col sm={12} md={12} lg={6}>
              {" "}
              <Card className="text-center cards one">
                {/* Background Image goes here */}
                <Card.Img
                  src="../../assets/images/loginBackground.png"
                  alt="test"
                ></Card.Img>
              </Card>
            </Col>
          </Row>
        </Container>
      )}
    </Formik>
  );
}

export default Login;
