import React, { useState } from 'react';
import './Registration.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();
  const { login } = useAuth();
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
    const { email, password } = formData;

    if (!validateForm(email, password)) return;

    try {
      const response = await axios.post('http://localhost:8080/userlogin', { email, password });

      if (response.data && response.data.token) {
        login(response.data.token);
        setDialogue({
          isOpen: true,
          message: 'Login successful!',
          isSuccess: true
        });
        setTimeout(() => {
          navigate('/');
        }, 1000); // Redirect after 2  seconds
      } else {
        setDialogue({
          isOpen: true,
          message: 'Invalid email or password.',
          isSuccess: false
        });
      }
    } catch (error) {
      console.error('Login error:', error);
      setDialogue({
        isOpen: true,
        message: 'Login failed. Invalid email or password',
        isSuccess: false
      });
    }
  };

  return (
    <div className="container-2">
      <div className="center">
        <h1>
        <strong>Login</strong></h1>
        <form id="loginForm" onSubmit={handleSubmit}>
          <TextField
            type="email"
            name="email"
            value={formData.email}
            handleChange={handleChange}
            label="Email"
          />
          <TextField
            type="password"
            name="password"
            value={formData.password}
            handleChange={handleChange}
            label="Password"
          />
          <div className="pass">Forgot Password?</div>
          <button type="submit" className="btn btn-primary btn-block mt-4 button">
              LoginIn
          </button>
          <div className="signup_link">
            Not a member? <a href="/Registration">Signup</a>
          </div>
        </form>
        {dialogue.isOpen && (
          <div className={`dialogue-box ${dialogue.isSuccess ? 'success' : 'error'}`}>
            <p>{dialogue.message}</p>
          </div>
        )}
      </div>
    </div>
  );
};

const TextField = ({ type, name, value, handleChange, label }) => (
  <div className="txt_field">
    <input
      type={type}
      name={name}
      value={value}
      onChange={handleChange}
      required
    />
    <label>{label}</label>
  </div>
);

const validateForm = (email, password) => {
  if (email.trim() === '') {
    alert('Please enter your email.');
    return false;
  }

  if (password.trim() === '') {
    alert('Please enter your password.');
    return false;
  }

  if (password.length < 6) {
    alert('Password must be at least 6 characters long.');
    return false;
  }

  return true;
};

export default Login;
