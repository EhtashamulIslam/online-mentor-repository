import React from 'react';
import Navbar from './Navbar';
import LoginForm from '../components/LoginForm';
import {useIsAuthenticated} from 'react-auth-kit';
import {useAuthUser} from 'react-auth-kit'
import {Link} from 'react-router-dom'

const Login = () => {
  const isAuthenticated = useIsAuthenticated()
  const auth = useAuthUser()
  return (
    <div>
      
      <div className="hero min-h-screen  bg-gradient-to-r  from-red-200 to-blue-400 shadow-2xl">
  <div className="hero-content flex-col lg:flex-row-reverse">
    <div className="text-center lg:text-left">
      <h1 className="text-5xl font-bold">{isAuthenticated() == true ? `Welcome, ${auth().name}` : 'Login now!'}</h1>
      <p className="py-6"> Let's explore the world of mentors. Get your favourite courses, materials and reviews </p>
      {
        isAuthenticated() &&
        <Link to={'/Profile'} className="btn normal-case">Explore</Link>
      }
     
    </div>
    {
      !isAuthenticated() &&
      <LoginForm className=''></LoginForm>
    }
   
 
  </div>
  
</div>

    </div>
  );
};

export default Login;