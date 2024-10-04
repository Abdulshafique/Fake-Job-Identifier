import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';
import { useAuth } from './AuthContext';

const NavBar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const [isLogin, setIsLogin] = useState(true);

  const handleButtonClick = () => {
    setIsLogin(!isLogin);
  };

  return (
    <section className="menu menu2 header-container" once="menu" id="menu-5-u84ruZQUtE">
      <nav className="navbar navbar-dropdown navbar-fixed-top navbar-expand-lg">
        <div className="container">
          <div className="navbar-brand">
            <span className="navbar-caption-wrap">
              <Link to="/" className="navbar-caption text-black display-4">Fake Job Identifier</Link>
            </span>
          </div>
          <button className="navbar-toggler" type="button" data-toggle="collapse"
            data-bs-toggle="collapse" data-target="#navbarSupportedContent"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarNavAltMarkup" aria-expanded="false"
            aria-label="Toggle navigation">
            <div className="hamburger">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav nav-dropdown" data-app-modern-menu="true">
              <li className="nav-item">
              <Link to="./PostJob" className="nav-link link text-black display-4" >Post Job</Link>
              </li>
              <li className="nav-item">
               <Link to="./PredictJob" className="nav-link link text-black display-4" >Predict a Job</Link>
              </li>
              <li className="nav-item">
                <a className="nav-link link text-black display-4" href="#faq-1-u84ruZTXAq">About us</a>
              </li>
              <li className="nav-item">
                <a className="nav-link link text-black display-4" href="#contacts-1-u84ruZUStJ">Contact us</a>
              </li>
            </ul>
            <div className="navbar-buttons mbr-section-btn">
              {isAuthenticated ? (
                <>
                  <li><a href="/profile">User Profile</a></li>
                  <li><button onClick={logout} className='btn btn-primary display-4 Logoutbtn'>Logout</button></li>
                </>
              ) : (
                <Link 
                  to={isLogin ? "./Login" : "./Registration"} 
                  className="btn btn-primary display-4" 
                  onClick={handleButtonClick}
                >
                  {isLogin ? "Log In" : "Sign Up"}
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>
    </section>
  );
};

export default NavBar;
