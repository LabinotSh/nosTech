import React from 'react'
import { Nav, Button } from 'react-bootstrap';
import './header.css';

function Header() {
  return (
    <div className="all">
      <div className="logo mar">nosTech</div>
      <div className="navi">
       <Nav defaultActiveKey="/home" as="ul" className="navigation-menu justify-content-center">
  <Nav.Item as="li">
    <Nav.Link href="/" className="navigation">Home</Nav.Link>
  </Nav.Item>
  <Nav.Item as="li">
    <Nav.Link href="/" className="navigation">Courses</Nav.Link>
  </Nav.Item>
  <Nav.Item as="li">
    <Nav.Link href="/" className="navigation">Articles</Nav.Link>
  </Nav.Item>
  <Nav.Item as="li">
    <Nav.Link href="/" className="navigation">Forum</Nav.Link>
  </Nav.Item>
  <Nav.Item as="li">
    <Nav.Link href="/" className="navigation">About Us</Nav.Link>
  </Nav.Item>
  <Nav.Item as="li">
    <Nav.Link href="/" className="navigation">Contact</Nav.Link>
  </Nav.Item>
 
</Nav>
</div>
<div className="auth-buttons">  
<Button className="auth-button mar" variant="link">Login</Button>
<Button className="auth-button mar" variant="link">Register</Button>
</div>
    </div>
  )
}

export default Header
