import React, { useEffect, useState } from 'react';
import './login.css';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import loginBackground from '../../assets/images/loginBackground.png';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Error from '../../components/error/Error.js';
import { login } from '../../redux/actions/auth';
import { connect, useDispatch } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

const validationSchema = Yup.object().shape({
	username: Yup.string()
		.min(4, 'Must have at least 4 characters')
		.max(255, 'Must be shorter than 255 characters')
		.required('Username is required'),
	password: Yup.string()
		.min(5, 'Must have at least 5 characters')
		.max(255, 'Must be shorter than 255 characters')
		.required('Password is required'),
});

const Login = ({ authenticated, err }) => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');

	const dispatch = useDispatch();

	useEffect(() => {
		setTimeout(() => {
			err ? setError(err) : setError('');
		}, 50);
		
	}, [err]);

	useEffect(() => {
		setTimeout(() => {
			if (error) {
				setError('');
			}
		}, 4500);
	}, [error]);

	return (
		<>
			<Formik
				initialValues={{ username: '', password: '' }}
				validationSchema={validationSchema}
				onSubmit={(values, { setSubmitting, resetForm }) => {
					setSubmitting(true);
					setLoading(true);
					// if()
					//down below is where the data should be sent to the server
					dispatch(login(values.username, values.password))
						.then((response) => {
							setError('');
							console.log('alaa ' + JSON.stringify(response.user));
							setSubmitting(true);
							setLoading(false);			
						})
						.catch((error) => {
							console.log('Error: ' + error);
							setSubmitting(false);
							setLoading(false);
							if(err){
							setError(err);
							}	
							setTimeout(() => {
								resetForm();
							}, 1500);		
						});
				}}
			>
				{({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
					<Container>
						<Row noGutters={true}>
							<Col sm={12} md={12} lg={6}>
								<Card className="text-center cards two">
									<Card.Title className="title">Welcome Back</Card.Title>
									<Card.Text style={{ marginBottom: '30px', fontSize: '14px' }}>
										Please enter your credentials
									</Card.Text>
									<Form onSubmit={handleSubmit}>
										{/* {JSON.stringify(values)} */}
										{error ? <div className="text-danger">{error}</div> : null}
										<Form.Group controlId="formBasicUsername">
											<Form.Control
												type="text"
												name="username"
												// id="name"
												placeholder="Username"
												onChange={handleChange}
												value={values.username}
												onBlur={handleBlur}
												className={touched.username && errors.username ? 'has-error' : null}
											/>
											<Error touched={touched.username} message={errors.username} />
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
												className={touched.password && errors.password ? 'has-error' : null}
											/>
											<Error touched={touched.password} message={errors.password} />
										</Form.Group>
										{loading && <span className="spinner-border spinner-border-sm"></span>}
										<Button className="logInBtn" type="submit" disabled={loading}>
											Login Now
										</Button>
										<Link to="registration">
											<Button className="registerBtn">Create Account</Button>
										</Link>
									</Form>
								</Card>
							</Col>

							<Col sm={12} md={12} lg={6}>
								{' '}
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
};

const mapStateToProps = (state) => ({
	authenticated: state.login.isLoggedIn,
	err: state.login.error,
});

export default connect(mapStateToProps, { login })(withRouter(Login));
