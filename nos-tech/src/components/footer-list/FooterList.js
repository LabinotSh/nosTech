import React from "react";
import { Media } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./footer-list.css";
import { RiMapPinFill } from "react-icons/ri";
import { ImPhone } from "react-icons/im";
import { GrMail } from "react-icons/gr";
import { MdLocationCity } from "react-icons/md";

function FooterList() {
  const list = [
    // {
    //   title: "Content",
    //   one: "Home",
    //   two: "Courses",
    //   three: "Articles",
    //   four: "Forum",
    //   five: "About Us",
    //   six: "Contact",
    //   seven: "Login",
    //   eight: "Register",
    // },
    {
      title: "Get in Touch",
      one: "232 Lovatt Crescent",
      two: "New Zealand, 0112",
      three: "(022) 2967-261",
      four: "nostech@contact.info",
    },
  ];

  const renderFooterList = (li, index) => {
    return (
      <ul key={index}>
        {/* <Media className="list-title">{li.title}</Media> */}
        <div className="list-item-container">
          <div className="list-item">
            <Link to='' className="list-item-link">
              <RiMapPinFill className="footer-icons" />
              {li.one}
            </Link>
          </div>
          <div className="list-item">
            <Link to='' className="list-item-link">
              <MdLocationCity className="footer-icons" />
              {li.two}
            </Link>
          </div>
          <div className="list-item">
            <Link to='' className="list-item-link">
              <ImPhone className="footer-icons" />
              {li.three}
            </Link>
          </div>
          <div className="list-item">
            <Link to='' className="list-item-link">
              <GrMail className="footer-icons" />
              {li.four}
            </Link>
          </div>
        </div>
      </ul>
    );
  };

  return (
    <div className="listProperties">
      <div className="testim">{list.map(renderFooterList)}</div>
    </div>
  );
}

export default FooterList;
