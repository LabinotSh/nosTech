import React from 'react'
import { Nav, Button } from 'react-bootstrap';
import './header.css'

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
    <Nav.Link href="/courses" className="navigation">Courses</Nav.Link>
  </Nav.Item>
  <Nav.Item as="li">
    <Nav.Link href="/articles" className="navigation">Articles</Nav.Link>
  </Nav.Item>
  <Nav.Item as="li">
    <Nav.Link href="/forum" className="navigation">Forum</Nav.Link>
  </Nav.Item>
  <Nav.Item as="li">
    <Nav.Link href="/about-us" className="navigation">About Us</Nav.Link>
  </Nav.Item>
  <Nav.Item as="li">
    <Nav.Link href="/contact" className="navigation">Contact</Nav.Link>
  </Nav.Item>
 
</Nav>
</div>
<div className="auth-buttons">  
<Button className="auth-button mar" variant="link" href="/login">Login</Button>
<Button className="auth-button mar" variant="link" href="/registration">Register</Button>
</div>
    </div>
  )
}

export default Header
