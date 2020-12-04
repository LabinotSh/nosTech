import React, { useEffect, useState } from 'react';
import './password.css';
import Notifications, { notify } from 'react-notify-toast';
import { changePassword } from '../../redux/actions/auth';
import { connect, useDispatch } from 'react-redux';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Error from '../../components/error/Error.js';

const validationSchema = Yup.object().shape({
	current: Yup.string().min(6, 'Password must be at least 6 characters').required('Current Password is required'),
	newPass: Yup.string()
		.min(5, 'Must have at least 5 characters')
		.max(255, 'Must be shorter than 255 characters')
		.required('New Password is required'),
	confirm: Yup.string()
		.oneOf([Yup.ref('newPass'), null], 'Passwords must match')
		.required('Confirm Password is required'),
});

const Password = ({ user, pending, success, err }) => {
	const [error, setError] = useState('');
	const dispatch = useDispatch();

	useEffect(() => {
		setTimeout(() => {
			err ? setError(err) : setError('');
		}, 100);
	}, [err]);

	useEffect(() => {
		setTimeout(() => {
			if (error) {
				setError('');
			}
		}, 4500);
	}, [error]);

	useEffect(() => {
		if (success) {
			notify.show(
				<div>
					Password was updated successfully!
					<button className="btn btn-sm btn-outline-light" onClick={notify.hide}>
						Close
					</button>
				</div>,
				'success',
				-1
			);
		}
	}, [success]);

	return (
		<div className="password-div">
			<Formik
				initialValues={{ current: '', newPass: '', confirm: '' }}
				validationSchema={validationSchema}
				onSubmit={(values, { setSubmitting, resetForm }) => {
					setSubmitting(true);
					if (user) {
						dispatch(changePassword(user._id, values.current, values.newPass));
						if (err) {
							resetForm();
							setError(err);
						}
						setTimeout(() => {
							resetForm();
						}, 800);
					}
				}}
			>
				{({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
					<Container>
						<Notifications options={{ top: '10px' }} />
						<Row noGutters={true}>
							<Col lg={2}></Col>
							<Col sm={6} lg={7}>
								<Form onSubmit={handleSubmit} className="text-center">
									<Form.Label className="req-inf spacing">
										To change your password, please enter the required information below:
									</Form.Label>
									{error ? <div className="text-danger">{error}</div> : null}
									<Form.Group controlId="formGroupPassword">
										<Form.Control
											type="password"
											name="current"
											placeholder="Enter current password"
											value={values.current}
											onChange={handleChange}
											onBlur={handleBlur}
											className={touched.current && errors.current ? 'has-error' : null}
										/>
										<Error touched={touched.current} message={errors.current} />
									</Form.Group>
									<Form.Group controlId="formGroupPassword">
										<Form.Control
											type="password"
											name="newPass"
											placeholder="Enter new password"
											onChange={handleChange}
											value={values.newPass}
											onBlur={handleBlur}
											className={touched.newPass && errors.newPass ? 'has-error' : null}
										/>
										<Error touched={touched.newPass} message={errors.newPass} />
									</Form.Group>
									<Form.Group controlId="formGroupPassword" className="spacing">
										<Form.Control
											type="password"
											name="confirm"
											placeholder="Confirm your new password"
											onChange={handleChange}
											value={values.confirm}
											onBlur={handleBlur}
											className={touched.confirm && errors.confirm ? 'has-error' : null}
										/>
										<Error touched={touched.confirm} message={errors.confirm} />
									</Form.Group>
									<div className="change-password-btn-div">
										{pending && <span className="spinner-border spinner-border-sm"></span>}
										<Button type="submit" className="change-password-btn">
											Change Password
										</Button>
									</div>
								</Form>
							</Col>
						</Row>
					</Container>
				)}
			</Formik>
		</div>
	);
};

const mapStateToProps = (state) => ({
	user: state.login.user,
	pending: state.login.pending,
	success: state.login.updateSuccess,
	err: state.login.error,
});

export default connect(mapStateToProps, { changePassword })(Password);
