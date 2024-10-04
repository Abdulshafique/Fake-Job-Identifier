import React, { useState } from 'react';
import './Registration.css';

function Registration() {
  const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    email: '',
    phoneNumber: '',
    password: '',
    repeatPassword: ''
  });

  const [dialogue, setDialogue] = useState({
    isOpen: false,
    message: '',
    isSuccess: false
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      validatefname() &&
      validatelname() &&
      validateEmail() &&
      validatePhoneNumber() &&
      validatePassword() &&
      validateRepeatPassword()
    ) {
      try {
        const response = await fetch('http://localhost:8080/usersignup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
        const data = await response.json();
        if (response.ok) {
          // Registration successful
          setDialogue({
            isOpen: true,
            message: 'Registration successful!',
            isSuccess: true
          });
          // Optionally, redirect to homepage or another page
          setTimeout(() => {
            window.location.href = '/'; // Redirect to homepage
          }, 3000); // Redirect after 3 seconds
        } else {
          // Registration failed
          setDialogue({
            isOpen: true,
            message: data.error || 'Registration failed. Please try again.',
            isSuccess: false
          });
        }
      } catch (error) {
        console.error('Error:', error);
        setDialogue({
          isOpen: true,
          message: 'Registration failed due to an error. Please try again later.',
          isSuccess: false
        });
      }
    }
  };

  function validatefname() {
    let fname = formData.fname.trim();
    if (fname === "") {
      setDialogue({
        isOpen: true,
        message: 'Please enter your full name.',
        isSuccess: false
      });
      return false;
    }
    return true;
  }

  function validatelname() {
    let lname = formData.lname.trim();
    if (lname === "") {
      setDialogue({
        isOpen: true,
        message: 'Please enter your last name.',
        isSuccess: false
      });
      return false;
    }
    return true;
  }

  function validateEmail() {
    let email = formData.email.trim();
    if (email === "") {
      setDialogue({
        isOpen: true,
        message: 'Please enter your email address.',
        isSuccess: false
      });
      return false;
    } else if (!isValidEmail(email)) {
      setDialogue({
        isOpen: true,
        message: 'Please enter a valid email address.',
        isSuccess: false
      });
      return false;
    }
    return true;
  }

  function isValidEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  }

  function validatePhoneNumber() {
    let phoneNumber = formData.phoneNumber.trim();
    if (phoneNumber === "") {
      setDialogue({
        isOpen: true,
        message: 'Please enter your phone number.',
        isSuccess: false
      });
      return false;
    } else if (!isValidPhoneNumber(phoneNumber)) {
      setDialogue({
        isOpen: true,
        message: 'Please enter a valid phone number.',
        isSuccess: false
      });
      return false;
    }
    return true;
  }

  function isValidPhoneNumber(phoneNumber) {
    const phonePattern = /^\d{11}$/; // Assumes 11-digit phone number
    return phonePattern.test(phoneNumber);
  }

  function validatePassword() {
    let password = formData.password;
    if (password === "") {
      setDialogue({
        isOpen: true,
        message: 'Please enter your password.',
        isSuccess: false
      });
      return false;
    } else if (password.length < 6) {
      setDialogue({
        isOpen: true,
        message: 'Password must be at least 6 characters long.',
        isSuccess: false
      });
      return false;
    }
    return true;
  }

  function validateRepeatPassword() {
    let password = formData.password;
    let repeatPassword = formData.repeatPassword;
    if (repeatPassword === "") {
      setDialogue({
        isOpen: true,
        message: 'Please repeat your password.',
        isSuccess: false
      });
      return false;
    } else if (password !== repeatPassword) {
      setDialogue({
        isOpen: true,
        message: 'Passwords do not match.',
        isSuccess: false
      });
      return false;
    }
    return true;
  }

  return (
    <div className="container-2">
      <div className="center">
        <h1>
          <strong>Registration</strong>
        </h1>
        <form id="registrationForm" onSubmit={handleSubmit}>
          <div className="row">
            <div className="form-group col-md-6">
              <div className="txt_field">
                <input
                  type="text"
                  id="fname"
                  name="fname"
                  value={formData.fname}
                  onChange={handleChange}
                  required
                />
                <label htmlFor="fname">First Name</label>
              </div>
            </div>
            <div className="form-group col-md-6">
              <div className="txt_field">
                <input
                  type="text"
                  id="lname"
                  name="lname"
                  value={formData.lname}
                  onChange={handleChange}
                  required
                />
                <label htmlFor="lname">Last Name</label>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="form-group col-md-6">
              <div className="txt_field">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <label htmlFor="email">Email</label>
              </div>
            </div>
            <div className="form-group col-md-6">
              <div className="txt_field">
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  required
                />
                <label htmlFor="phoneNumber">Phone Number</label>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="form-group col-md-6">
              <div className="txt_field">
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <label htmlFor="password">Password</label>
              </div>
            </div>
            <div className="form-group col-md-6">
              <div className="txt_field">
                <input
                  type="password"
                  id="repeatPassword"
                  name="repeatPassword"
                  value={formData.repeatPassword}
                  onChange={handleChange}
                  required
                />
                <label htmlFor="repeatPassword">Repeat Password</label>
              </div>
            </div>
          </div>
          {dialogue.isOpen ? (
            <div className={`dialogue-box ${dialogue.isSuccess ? 'success' : 'error'}`}>
              <p>{dialogue.message}</p>
              {dialogue.isSuccess && (
                <button onClick={() => window.location.href = '/'} className="btn btn-primary btn-block mt-4 button">
                  Go back / Go home
                </button>
              )}
            </div>
          ) : (
            <button type="submit" className="btn btn-primary btn-block mt-4 button">
              Submit
            </button>
          )}
        </form>
      </div>
    </div>
  );
}

export default Registration;
