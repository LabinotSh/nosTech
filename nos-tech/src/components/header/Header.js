import React from 'react'
import { Nav, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom'; 
import './header.css'
import nosTech from '../../assets/images/nostech.png'

function Header() {
  return (
    <div>
	
      <nav className="navbar navbar-expand-lg navbar-dark static-top font header">
      <div className="container">
      <a className="logo mar" style={{fontSize:"24px" , padding:"0"}}><img src={nosTech} style={{width:"60px"}}></img> </a>
      <button className="navbar-toggler test" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarResponsive">
<div className="col-md-12 mx-auto">



          <div className="d-flex float-left col-md-10">
          <div className="mx-auto">
          <ul class="navbar-nav ml-auto">
          <li className="nav-item">
      <Link to="/" tag="li" active-class="active" className="navigation" exact><a className="nav-link navigation">Home</a></Link>
      </li>
      <li className="nav-item">
      <Link to="/courses" tag="li" active-class="active" className="navigation" exact ><a className="nav-link navigation">Courses</a></Link>
      </li>
	    <li className="nav-item">
      <Link to="/articles" tag="li" active-class="active" className="navigation" exact><a className="nav-link navigation">Articles</a></Link>
      </li>
      <li className="nav-item">
      <Link to="/forum" tag="li" active-class="active" className="navigation" exact><a className="nav-link navigation">Forum</a></Link>
      </li>
      <li className="nav-item">
      <Link to="/about-us" tag="li" active-class="active" className="navigation" exact><a className="nav-link navigation">About Us</a></Link>
      </li>
      <li className="nav-item">
      <Link to="/contact" tag="li" active-class="active" className="navigation" exact><a className="nav-link navigation">Contact</a></Link>
      </li>
      </ul>
      </div>
      </div>

      <div className="float-left d-flex col-md-2">
      <div id="c">
          <ul class="navbar-nav ml-auto">
      <li className="nav-item">
      <Link to="/login" tag="li" active-class="active" className="navigation" exact ><a className="nav-link navigation">login</a></Link>
      </li>
      <li className="nav-item">
      <Link to="/registration" tag="li" active-class="active" className="navigation" exact ><a className="nav-link navigation">register</a></Link>
      </li>
      </ul>
      </div>
      </div>
      </div>   
      </div>
      </div>
      </nav>
      </div>
    
  );
}

export default Header
