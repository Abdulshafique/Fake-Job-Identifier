import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import './SearchJob.css'; // Ensure this CSS file is set up correctly

const SearchJob = () => {
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    salary_range: '',
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, location, salary_range } = formData;

    if (!title && !location && !salary_range) {
      alert('Please fill at least one field.');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get('http://localhost:8080/searchjob', { params: formData });
      navigate('/jobresults', { state: { results: response.data } });
    } catch (error) {
      console.error('Error fetching search results:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-inline">
      <div className="input-field">
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder='Job Title'
          
        />
      </div>
      <div className="input-field">
        <input
          type="text"
          id="location"
          name="location"
          placeholder='location'
          value={formData.location}
          onChange={handleChange}
          
        />
      </div>
      <div className="input-field">
        <input
          type="text"a
          id="salary_range"
          name="salary_range"
          placeholder='Salary Range'
          value={formData.salary_range}
          onChange={handleChange}
          
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Search
      </button>
    </form>
  );
};

export default SearchJob;
