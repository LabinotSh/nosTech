import React from "react";
import { BrowserRouter, Route, Router as R , withRouter} from "react-router-dom";
import {ConnectedRouter} from 'connected-react-router';

import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import Home from "../screens/home/Home";
import Courses from "../screens/courses/Courses";
import AddCourse from "../screens/courses/AddCourse";
import Articles from "../screens/articles/Articles";
import Forum from "../screens/forum/Forum";
import AboutUs from "../screens/aboutUs/AboutUs";
import Contact from "../screens/contact/Contact";
import Login from "../screens/login/Login";
import Registration from "../screens/registration/Registration";
import Admin from "../screens/admin/Admin";
import Course from "../screens/course/Course";
import CoursesView from "../screens/adminViews/coursesView"
import { history } from "../helpers/history";
import CourseEditView from "../screens/adminViews/CourseEditView";
import UsersView from "../screens/adminViews/usersView";
import UserEditView from "../screens/adminViews/UserEditView";
import Category from '../screens/category/Category';
import AdminRoute from './adminRoute';
import PrivateRoute from './privateRoute';
import PublicRoute from './publicRoutes';

function Router() {
  return (
    <ConnectedRouter history={history}>
      <Header />
      <Route path="/" component={Home} exact />
      <Route path="/courses" component={Courses} />
      <Route path="/addcourse" component={AddCourse} />
      <Route path="/articles" component={Articles} />
      <Route path="/forum" component={Forum} />
      <Route path="/about-us" component={AboutUs} />
      <Route path="/contact" component={Contact} />
      <PublicRoute path="/login" component={Login} />
      <PublicRoute path="/registration" component={Registration} />
      <Route path="/admin" component={Admin} />
      <Route path="/course/:id" component={Course}></Route>
      <Route path="/admins/courses" component={CoursesView}></Route>
      <Route path="/admins/course/:id/edit" component={CourseEditView}></Route>
      <Route path="/admins/users" component={UsersView}></Route>
      <Route path="/admins/user/:id/edit" component={UserEditView}></Route>
      <Route path="/category" component={Category} />
      {
      (history.location.pathname!=='/login' && history.location.pathname!=='/registration') ? <Footer/>:null
      }
      {/* <Footer /> */}
    </ConnectedRouter>
      
    
    
  )
}

//pa ja shtu qeto withRouter sbojke opsioni per me e hjek footer prej login edhe register
export default withRouter(Router);
