import React from "react";
import "./company-description.css";
import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";

const CompanyDescription = () => {
  return (
    <div className="company-description-div mt-3">
      <h5>Our Services</h5>
      <p style={{ fontStyle: "italic" }}>
        We aspire to offer accessible learning methods and materials for
        students, anytime and anywhere, and in all fields of software and web
        development, available in different formats.
      </p>
      <div className="company-description-icons">
        <FaFacebook className="footer-icons facebook-footer" />
        <FaTwitter className="footer-icons twitter-footer" />
        <FaLinkedin className="footer-icons linkedin-footer" />
        <FaGithub className="footer-icons" />
      </div>
    </div>
  );
};

export default CompanyDescription;
