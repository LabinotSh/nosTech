import React from 'react';
import './password.css';
import { Form, Button } from 'react-bootstrap';

function Password() {
	return (
		<div className="password-div">
			<Form className="text-center">
				<Form.Label className="req-inf spacing">Please enter the required information below:</Form.Label>
				<Form.Group controlId="formGroupPassword" className="spacing">
					{/* <Form.Label>Enter current password</Form.Label> */}
					<Form.Control type="password" placeholder="Enter current password" />
				</Form.Group>
				<Form.Group controlId="formGroupPassword" className="spacing">
					{/* <Form.Label>Enter new password</Form.Label> */}
					<Form.Control type="password" placeholder="Enter new password" />
				</Form.Group>
				<Form.Group controlId="formGroupPassword" className="spacing">
					{/* <Form.Label>Re-enter new password</Form.Label> */}
					<Form.Control type="password" placeholder="Re-enter new password" />
				</Form.Group>
				<div className="change-password-btn-div">
					<Button type="submit" className="change-password-btn">
						Change Password
					</Button>
				</div>
			</Form>
		</div>
	);
}

export default Password;
