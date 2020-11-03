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
      one: "232 Lovatt Crescent, Kensington",
      two: "(022) 2967-261",
      three: "nostech@contact.info",
    },
  ];

  const renderFooterList = (li, index) => {
    return (
      <ul key={index}>
        <Media className="footer-list">{li.title}</Media>
        <Media className="footer-list">
          <Link>{li.one}</Link>
        </Media>
        <Media className="footer-list">
          <Link>{li.two}</Link>
        </Media>
        <Media className="footer-list">
          <Link>{li.three}</Link>
        </Media>
        <Media className="footer-list">
          <Link>{li.four}</Link>
        </Media>
        <Media className="footer-list">
          <Link>{li.five}</Link>
        </Media>
        <Media className="footer-list">
          <Link>{li.six}</Link>
        </Media>
      </ul>
    );
  };
  return <div className="listProperties">{list.map(renderFooterList)}</div>;
}

export default FooterList;
