import React from "react";
import { Media } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./footer-list.css";

function FooterList() {
  const list = [
    {
      title: "Content",
      one: "Home",
      two: "Courses",
      three: "Articles",
      four: "Forum",
      five: "About Us",
      six: "Contact",
      seven: "Login",
      eight: "Register",
    },
    {
      title: "Get in Touch",
      one: "232 Lovatt Crescent",
      two: "(022) 2967-261",
      three: "nostech@contact.info",
      four: "babloki hahahaksaodund",
    },
  ];

  const renderFooterList = (li, index) => {
    return (
      <ul key={index}>
        <Media className="list-title">{li.title}</Media>
        <div className="list-item-container">
          <Media className="list-item">
            <Link to="/home" className="list-item-link">{li.one}</Link>
          </Media>
          <Media className="list-item">
            <Link to="/courses" className="list-item-link">{li.two}</Link>
          </Media>
          <Media className="list-item">
            <Link to="/articles" className="list-item-link">{li.three}</Link>
          </Media>
          <Media className="list-item">
            <Link to="/forum" className="list-item-link">{li.four}</Link>
          </Media>
          <Media className="list-item">
            <Link to="/about-us" className="list-item-link">{li.five}</Link>
          </Media>
          <Media className="list-item">
            <Link to="/contact" className="list-item-link">{li.six}</Link>
          </Media>
        </div>
      </ul>
    );
  };

  return <div className="listProperties">
    <div className="testim">
      {list.map(renderFooterList)}
    </div>
  </div>;
}

export default FooterList;
