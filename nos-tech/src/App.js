import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";

// screens
import Home from "./screens/home/Home";
import Courses from "./screens/courses/Courses";
import Articles from "./screens/articles/Articles";
import Forum from "./screens/forum/Forum";
import AboutUs from "./screens/aboutUs/AboutUs";
import Contact from "./screens/contact/Contact";
import Login from "./screens/login/Login";
import Registration from "./screens/registration/Registration";

const App = () => {
  return (
    <Router>
      <Header />
      <Route path="/" component={Home} exact />
      <Route path="/courses" component={Courses} />
      <Route path="/articles" component={Articles} />
      <Route path="/forum" component={Forum} />
      <Route path="/about-us" component={AboutUs} />
      <Route path="/contact" component={Contact} />
      <Route path="/login" component={Login} />
      <Route path="/registration" component={Registration} />
      <Footer />
    </Router>
  );
};

export default App;
