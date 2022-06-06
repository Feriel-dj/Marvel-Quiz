import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Header from '../Header';
import '../../App.css';
import Landing from '../Landing';
import Footer from '../Footer';
import Welcome from '../Welcome';
import Login from '../Login';
import SignUp from '../SignUp';
import ErrorPage from '../ErrorPage';
import ForgetPassword from '../ForgetPassword';
import {IconContext} from 'react-icons'


function App() {
  return (
    <Router>
      <IconContext.Provider value={{ style: { verticalAlign: 'middle' }} }>
        <Header />
        <Routes>
          <Route exact path='/' element={<Landing />} />
          <Route path='/Welcome' element={<Welcome />} />
          <Route path='/Login' element={<Login />} />
          <Route path='/SignUp' element={<SignUp />} />
          <Route path='/ForgetPassword' element={<ForgetPassword /> } />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
        <Footer />
      </IconContext.Provider>
      
    </Router>
  )
}

export default App

