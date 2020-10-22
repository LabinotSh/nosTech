import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import Home from "../screens/home/Home";
import Courses from "../screens/courses/Courses";
import Articles from "../screens/articles/Articles";
import Forum from "../screens/forum/Forum";
import AboutUs from "../screens/aboutUs/AboutUs";
import Contact from "../screens/contact/Contact";
import Login from "../screens/login/Login";
import Registration from "../screens/registration/Registration";
import Admin from "../screens/admin/Admin";

function Router() {
  return (
    <BrowserRouter>
      <Header />
      <Route path="/" component={Home} exact />
      <Route path="/courses" component={Courses} />
      <Route path="/articles" component={Articles} />
      <Route path="/forum" component={Forum} />
      <Route path="/about-us" component={AboutUs} />
      <Route path="/contact" component={Contact} />
      <Route path="/login" component={Login} />
      <Route path="/registration" component={Registration} />
      <Route path="/admin" component={Admin} />
      <Footer />
    </BrowserRouter>
  );
}

export default Router;
