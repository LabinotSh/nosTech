import React from "react";
import "./footer.css";
import FooterList from "../footer-list/FooterList";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import { history } from "../../helpers/history";
import Subscription from "../subscription/Subscription";

const Footer = () => {
  //   if (history.location.pathname === '/confirm/:id') return null;
  return (
    <div className="footeri">
      <div className="container">
        <div className="footer-content">
          <div className="the-list">
            <FooterList />
          </div>

          <div className="subscription">
            <Subscription />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
