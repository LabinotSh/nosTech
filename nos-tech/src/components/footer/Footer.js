import React from "react";
import "./footer.css";
import FooterList from "../footer-list/FooterList";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import { history } from "../../helpers/history";
import Subscription from "../subscription/Subscription";
import CompanyDescription from "../company-description/CompanyDescription";

const Footer = () => {
  //   if (history.location.pathname === '/confirm/:id') return null;
  return (
    <div className="footer-child-content">
      <div className="sep-test">
        <div className="footer-list-div">
          <FooterList />
        </div>

        <div className="subscription">
          <Subscription />
        </div>
        <div className="company-description">
          <CompanyDescription />
        </div>
      </div>
    </div>
  );
};

export default Footer;
