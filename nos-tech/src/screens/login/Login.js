import React, { useCallback, useEffect, useRef, useState } from "react";
import "./login.css";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import loginBackground from "../../assets/images/loginBackground.png";
import { Formik } from "formik";
import * as Yup from "yup";
import Error from "../../components/error/Error.js";
import store from '../../store';
import { login } from '../../redux/actions/auth';
import {history} from '../../helpers/history';
import {connect, useSelector, useDispatch} from 'react-redux';
import {Link, Redirect, withRouter} from 'react-router-dom';
import jwt_decode from 'jwt-decode';

const validationSchema = Yup.object().shape({
  username: Yup.string().required("(Username is required)"),
  password: Yup.string().required("(Password is required)"),
});

const Login = ({authenticated, user, err}) => {

  const [loading, setLoading] = useState(false);
  const [ro, setRole] = useState("");
  const [error, setError] = useState("");
  const [unMounted, setUnmounted] = useState(false);

  const dispatch = useDispatch();


  useEffect(() => {  
    if(user && authenticated){
      const role = user.role;
      role==="user" ? history.push('/') : history.push('/admins/users')
      //window.location.reload(); 
    }
  }, [user])

  useEffect(() => {
    setTimeout(() => {
      err ? setError(err) : setError('');
    }, 800); 
  }, [err])

  useEffect(() => {
    setTimeout(() => {
      if(error){
        setError('')
      }
    }, 4000); 
  },[error])

  return (
    <>
    
    <Formik
      initialValues={{ username: "", password: "" }}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        // setSubmitting(true);
        // setLoading(true);
        //down below is where the data should be sent to the server 
        dispatch(login(values.username, values.password))
        .then(response => {
          setSubmitting(true);
          setLoading(false);
          setError('');
          setTimeout(() => {
            resetForm();
            setLoading(false);
          },500)

        }).catch(error => {
          setLoading(true);
          console.log('Error: ' + error);
          setSubmitting(false);
          setError(err)
          setTimeout(() => {
            setLoading(false);
            resetForm();
          }, 1500)
  
        });
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
                  {error && (
                      <div className="text-danger">
                        {error}
                      </div>
                    )} 
                  <Form.Group controlId="formBasicUsername">
                    <Form.Control
                      type="text"
                      name="username"
                      // id="name"
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
                      // id="password"
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
                  {loading && (
                    <span className="spinner-border spinner-border-sm"></span>
                  )}
                  <Button
                    className="logInBtn"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    Login Now
                  </Button>
                  <Link to='registration'>
                  <Button className="registerBtn">Create Account</Button>
                  </Link>
                </Form>
              </Card>
            </Col>

            <Col sm={12} md={12} lg={6}>
              {" "}
              <Card className="text-center cards one">
                {/* Background Image goes here */}
                <Card.Img src={loginBackground} alt="test"></Card.Img>
              </Card>
            </Col>
          </Row>
        </Container>
      )}
    </Formik>
    </>
  );
}

const mapStateToProps = state => ({
  user: state.login.user,
  authenticated: state.login.isLoggedIn,
   err: state.login.error
});

export default connect(mapStateToProps ,{login})(withRouter(Login));
