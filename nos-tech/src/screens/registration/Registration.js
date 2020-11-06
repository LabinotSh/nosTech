import React, {useEffect, useState} from "react";
import "./registration.css";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import registerBackground from "../../assets/images/registerBackground.png";
import { Formik } from "formik";
import * as Yup from "yup";
import Error from "../../components/error/Error.js";
import {register} from '../../redux/actions/auth';
import { connect, useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import { history } from "../../helpers/history";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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

const Registration = ({successRegister, err}) => {

  const dispatch = useDispatch();

  const [registered, setRegister]  = useState(false);
  const [role, setRole] = useState('');

  const notify = () => toast.success("You are signed up now!",  {
    position: "top-center",
    autoClose: 7000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });

  useEffect(() => {
    if(successRegister){
      //history.push('/login')
      //notify();
      //history.push('/login');
     
    }
  },[notify])
  

  return (
    <Formik
      initialValues={{
        name: "",
        username: "",
        email: "",
        password: "",
        roles: '',
      }}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        setSubmitting(true);
        var fullname = values.name.lastIndexOf(' ');
        var name = values.name.substring(0,fullname);
        var surname = values.name.substring(fullname+1);
      
        //down below is where the data should be sent to the server
        dispatch(register(name ,surname, 
          values.email, values.password, role, values.username))
          .then(response =>{
            setSubmitting(true);
            setRegister(true);
            
           
            console.log('Data ' + response.data);

            if(response.data){
              setTimeout(() => {
              //will put a spinner instead of the alert for logging in kur t'shtohet auth
              //alert(JSON.stringify(values, null, 2));
               notify();
               resetForm();
               setSubmitting(false);
               setRegister(false);
              }, 500);
            }

          }).catch(err => {
            setRegister(false);
            setSubmitting(false);
            console.log("Error: " + err);
          });
      
        // setTimeout(() => {
        //   //will put a spinner instead of the alert for logging in kur t'shtohet auth
        //   alert(JSON.stringify(values, null, 2));
        //   resetForm();
        //   setSubmitting(false);
        // }, 500);
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
          <ToastContainer position="top-center"
                          autoClose={5000}
                          newestOnTop={false}
                          closeOnClick
                           /> 
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
                  {err && (
                    <div className="text-danger">
                      {err}
                    </div>
                  )}
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
                    console.log('ROLE ' + roli)}}
                    value={role}
                    onBlur={handleBlur}
                    required={true}
                    custom 
                    >
                      <option hidden value="choose">---Choose one---</option>
                      <option value="user">Student</option>
                      <option value="admin">Teacher</option>
                    </Form.Control>
                    {role=='' && (<div className="text-danger">This is required!</div>)}
                  </Form.Group>
                  </Form.Group>

                  {registered && (
                    <span className="spinner-border spinner-border-sm"></span>
                  )}
                  <Button
                    className="register"
                    type="submit"
                    //disabled={isSubmitting}
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

function mapStateToProps(state){
  return {
    successRegister: state.login.registered,
    err: state.login.error
  };
}

export default connect(mapStateToProps, {register})(withRouter(Registration));
