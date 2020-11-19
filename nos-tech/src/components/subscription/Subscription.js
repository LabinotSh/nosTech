import React from "react";
import "./subscription.css";
import { Form, Button, FormControl, InputGroup } from "react-bootstrap";

const Subscription = () => {
  return (
    <div className="subscription">
      <p style={{ color: "white" }}>
        <b>Subscribe</b> for the latest from nosTech:
      </p>

      <Form className="subscription-form">
        <InputGroup
          size="sm"
          className="mt-2 mb-3 ml-5 subscription-input-group"
        >
          <FormControl
            aria-label="Small"
            placeholder="Your name.."
            aria-describedby="inputGroup-sizing-sm"
            required
          />
        </InputGroup>
        <InputGroup
          size="sm"
          className="mt-1 mb-4 ml-5 subscription-input-group"
        >
          <FormControl
            aria-label="Small"
            placeholder="Your email address.."
            aria-describedby="inputGroup-sizing-sm"
            required
          />
        </InputGroup>
        <br />
        <div>
          <Button className="submit-btn" type="submit">
            Submit
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default Subscription;
