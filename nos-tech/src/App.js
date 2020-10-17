import React from 'react';
import './css/App.css'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'

// screens
import Home from './components/Home'
import Courses from './components/Courses'
import Articles from './components/Articles'
import Forum from './components/Forum'
import AboutUs from './components/AboutUs'
import Contact from './components/Contact'
import Login from './components/Login'
import Registration from './components/Registration'


const App = () => {
  return (
    <Router>
        <Header/> 
      <Route path='/' component={Home} exact/>
      <Route path='/courses' component={Courses} />
      <Route path='/articles' component={Articles} />
      <Route path='/forum' component={Forum} />
      <Route path='/about-us' component={AboutUs} />
      <Route path='/contact' component={Contact} />
      <Route path='/login' component={Login} />
      <Route path='/registration' component={Registration} />
        <Footer/>
    </Router>
  );
}

export default App;
