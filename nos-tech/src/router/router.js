import React from "react";
import { BrowserRouter, Route, Router as R , withRouter} from "react-router-dom";
import {ConnectedRouter} from 'connected-react-router';

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
import Course from "../screens/course/Course";
import { history } from "../helpers/history";


function Router() {
  return (
    <ConnectedRouter history={history}>
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
      <Route path="/course/:id" component={Course}></Route>
      {
      (history.location.pathname!=='/login' && history.location.pathname!=='/registration') ? <Footer/>:null
      }
      {/* <Footer /> */}
    </ConnectedRouter>
  );
}

//pa ja shtu qeto withRouter sbojke opsioni per me e hjek footer prej login edhe register
export default withRouter(Router);
