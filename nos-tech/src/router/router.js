import React from 'react';
import { BrowserRouter, Route, Router as R, Switch, withRouter } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';

import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import Home from '../screens/home/Home';
import Courses from '../screens/courses/Courses';
import AddCourse from '../screens/courses/AddCourse';
import Articles from '../screens/articles/Articles';
import Forum from '../screens/forum/Forum';
import AboutUs from '../screens/aboutUs/AboutUs';
import Contact from '../screens/contact/Contact';
import Login from '../screens/login/Login';
import Registration from '../screens/registration/Registration';
import Course from '../screens/course/Course';
import MyCourses from '../screens/myCourses/MyCourses';
import MyProfile from '../screens/myProfile/MyProfile';
import Confirm from '../screens/registration/Confirm';
import { history } from '../helpers/history';
import CoursesView from '../screens/adminViews/coursesView';
import CourseEditView from '../screens/adminViews/CourseEditView';
import EditVideos from '../screens/adminViews/EditVideos';
import UsersView from '../screens/adminViews/usersView';
import UserEditView from '../screens/adminViews/UserEditView';
import { AdminRoute, SuperAdminRoute } from './adminRoute';
import PrivateRoute from './privateRoute';
import PublicRoute from './publicRoutes';
import Categories from '../components/category/PostCategories';
import Tags from '../components/tags/PostTags';
import { connect } from 'react-redux';
import CourseCategory from '../components/coursecategory/CourseCategory';
import Dashboard from '../screens/adminViews/Dashboard';
import CourseReview from '../screens/adminViews/courseReview';
import ContentReview from '../screens/adminViews/contentReview';
import Upload from '../screens/upload/Upload';

function Router({ auth }) {
	return (
		<ConnectedRouter history={history}>
			<Header auth={auth} />
			<Route path="/" component={Home} exact />
			<Route path="/courses" component={Courses} />
			<Route path="/articles" component={Articles} />
			<Route path="/forum" component={Forum} />
			<Route path="/about-us" component={AboutUs} />
			<Route path="/contact" component={Contact} />
			<Route exact path="/coursecategory/:cid" component={CourseCategory} />
			<Route path="/upload" component={Upload}></Route>
			{/* should not be shown/accesed to/by the user if the user is logged in */}
			<PublicRoute exact path="/login" component={Login} />
			<PublicRoute exact path="/registration" component={Registration} />
			<PrivateRoute path="/myCourses" component={MyCourses} />
			<PrivateRoute path="/myProfile" component={MyProfile} />
			<Route exact path="/confirm/:id" component={Confirm} />
			<Route exact path="/course/:id" component={Course}></Route>
			<AdminRoute path="/add-course" component={AddCourse} />
			<Switch>
				<AdminRoute path="/admins/courses" component={CoursesView}></AdminRoute>
				<AdminRoute path="/admins/course/:id/edit" component={CourseEditView}></AdminRoute>
				<AdminRoute path="/admins/course/:id/videos" component={EditVideos}></AdminRoute>
			</Switch>
			<AdminRoute path="/admins/dashboard" component={Dashboard}></AdminRoute>
			<SuperAdminRoute path="/tags" component={Tags} />
			<SuperAdminRoute path="/categories" component={Categories} />
			<Switch>
				<SuperAdminRoute path="/admins/users" component={UsersView}></SuperAdminRoute>
				<SuperAdminRoute path="/admins/user/:id/edit" component={UserEditView}></SuperAdminRoute>
				<SuperAdminRoute path="/admins/course-review" component={CourseReview}></SuperAdminRoute>
				<SuperAdminRoute path="/admins/content-review/:id" component={ContentReview}></SuperAdminRoute>
			</Switch>
			{history.location.pathname !== '/login' &&
			history.location.pathname !== '/registration' &&
			history.location.pathname !== '/admins/dashboard' &&
			history.location.pathname !== '/admins/users' &&
			history.location.pathname !== '/admins/courses' &&
			history.location.pathname !== '/categories' &&
			history.location.pathname !== '/add-course' &&
			history.location.pathname !== '/admins/course-review' &&
			history.location.pathname !== '/upload' &&
			history.location.pathname !== '/admins/course/:id/videos' &&
			history.location.pathname !== '/tags' ? (
				<Footer />
			) : null}
			{/* <Footer /> */}
		</ConnectedRouter>
	);
}

const mapStateToProps = (state) => ({
	auth: state.login.isLoggedIn,
});

//pa ja shtu qeto withRouter sbojke opsioni per me e hjek footer prej login edhe register
export default connect(mapStateToProps, null)(withRouter(Router));
