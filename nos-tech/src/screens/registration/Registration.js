import React from "react";
import "./registration.css";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import registerBackground from "../../assets/images/registerBackground.png";

function Registration() {
  return (
    <Container>
      <Row noGutters={true}>
        <Col sm={12} md={12} lg={6}>
          {" "}
          <Card className="text-center cards">
            {/* Background Image goes here */}
            <Card.Img src={registerBackground} alt="test"></Card.Img>
          </Card>
        </Col>
        <Col sm={12} md={12} lg={6}>
          <Card className="text-center cards registerCard">
            <Card.Title className="title">Welcome to nosTech</Card.Title>
            <Card.Text style={{ marginBottom: "30px", fontSize: "14px" }}>
              Please enter your credentials to set up an account with us
            </Card.Text>
            <Form>
              <Form.Group controlId="formBasicUsername">
                <Form.Control
                  type="text"
                  name="username"
                  id="name"
                  placeholder="Username"
                />
              </Form.Group>
              <Form.Group controlId="formBasicEmail">
                <Form.Control
                  type="text"
                  name="email"
                  id="email"
                  placeholder="Email"
                />
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Control
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                />
              </Form.Group>
              <Button className="register">Register</Button>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Registration;
