import React from "react";
import "./personal-info.css";
import { Form, Image, Button } from "react-bootstrap";
import { AiOutlineUserAdd } from "react-icons/ai";
// import ProfilePicture from "../profile-picture/ProfilePicture";

function PersonalInfo() {
  return (
    <div className="personal-info-div">
      <Form className="personal-info-form spacing">
        {/* <ProfilePicture /> */}
        {/* <Image src="holder.js/171x180" roundedCircle> */}
        <AiOutlineUserAdd roundedCircle className="aioutlineuseradd spacing" />
        <Form.Group controlId="formGroupName" className="spacing">
          {/* <Form.Label>Email address</Form.Label> */}
          <Form.Control type="text" placeholder="User's full name" />
        </Form.Group>
        <Form.Group controlId="formGroupUsername" className="spacing">
          {/* <Form.Label>Email address</Form.Label> */}
          <Form.Control type="text" placeholder="User's username" />
        </Form.Group>
        <Form.Group controlId="formGroupEmail" className="spacing">
          {/* <Form.Label>Email address</Form.Label> */}
          <Form.Control type="email" placeholder="User's email address" />
        </Form.Group>
        <div className="change-password-btn-div">
          <Button type="submit" className="change-password-btn">
            Edit my Information
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default PersonalInfo;
