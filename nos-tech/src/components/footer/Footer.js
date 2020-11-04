import React from "react";
import "./footer.css";
import FooterList from "../footer-list/FooterList";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";

const Footer = () => {
    return (
        <div className="footeri">
            <div className="container">
                <div className="footer-content">

                    <div className="the-list">
                        <FooterList />
                    </div>

                    <div className="subscription">
                        <p>
                            <b>Subscribe</b> to stay up to date with the latest from nosTech:
                        </p>

                        <form>
                            <input className="text-box" type="text" placeholder="Your email here..."></input>
                        </form>

                        <div>
                            <Button className="submit-btn">
                                Submit
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;
