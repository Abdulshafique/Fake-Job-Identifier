import React, { useState } from 'react';
import { TextField, Checkbox, FormControlLabel, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './PredictJob.css'; // Ensure this CSS file is in the same directory

const PostJob = () => {
  const [formData, setFormData] = useState({
    job_id: 5,
    Title: '',
    location: '',
    department: '',
    salary_range: '',
    company_name: '',
    description: '',
    requirenment: '',
    benefits: '',
    telecommunication: 0,
    has_company: 0,
    has_question: 0,
    employment: '',
    required_experience: '',
    required_equcation: '',
    industry: '',
    Function: '',
    question: ''
  });

  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === 'checkbox' ? (checked ? 1 : 0) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send data to predict API
      const predictResponse = await fetch('http://127.0.0.1:5000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const predictData = await predictResponse.json();

      if (predictResponse.ok && predictData.prediction[0] === 0) {
        setDialogContent('This job is not a scam!');
        setDialogOpen(true);

        // If prediction is 0, send data to post API
        const postResponse = await fetch('http://localhost:8080/postjob', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (postResponse.ok) {
          setDialogContent('Job posted successfully');
          setDialogOpen(true);
          // Reset form or navigate to another page if needed
        } else {
          const errorData = await postResponse.json();
          console.error('Job posting failed', errorData);
          setDialogContent('Failed to post job');
          setDialogOpen(true);
        }
      } else {
        setDialogContent('Job is fake. Do you want to go back to the home page?');
        setDialogOpen(true);
      }
    } catch (error) {
      console.error('Network error:', error);
      setDialogContent('Network error: ' + error.message);
      setDialogOpen(true);
    }
  };

  const closeDialog = () => {
    setDialogOpen(false);
    if (dialogContent.includes('fake')) {
      navigate('/');
    }
  };

  return (
    <section className="search-job">
<div className="container-2">
      <div className="center">
        <h1>
          <strong>
          Post a Job
          </strong>
        </h1>
        <form id="PostJobForm" onSubmit={handleSubmit}>
          <div className="row">
            <div className="form-group col-md-6">
              <div className="txt_field">
                <input
                  type="text"
                  name="Title"
                  value={formData.Title}
                  onChange={handleChange}
                  placeholder="Job Title"
                  required
                />
              </div>
            </div>
            <div className="form-group col-md-6">
              <div className="txt_field">
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Location"
                  required
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="form-group col-md-6">
              <div className="txt_field">
                <input
                  type="text"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  placeholder="Department"
                  required
                />
              </div>
            </div>
            <div className="form-group col-md-6">
              <div className="txt_field">
                <input
                  type="text"
                  name="salary_range"
                  value={formData.salary_range}
                  onChange={handleChange}
                  placeholder="Salary Range"
                  required
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="form-group col-md-6">
              <div className="txt_field">
                <input
                  type="text"
                  name="company_name"
                  value={formData.company_name}
                  onChange={handleChange}
                  placeholder="Company Name"
                  required
                />
              </div>
            </div>
            <div className="form-group col-md6">
              <div className="txt_field">
                <input
                  type="text"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Description"
                  required
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="form-group col-md-6">
              <div className="txt_field">
                <input
                  type="text"
                  name="requirenment"
                  value={formData.requirenment}
                  onChange={handleChange}
                  placeholder="requirenments"
                  required
                />
              </div>
            </div>
            <div className="form-group col-md-6">
              <div className="txt_field">
                <input
                  type="text"
                  name="benefits"
                  value={formData.benefits}
                  onChange={handleChange}
                  placeholder="Benefits"
                  required
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="form-group col-md-6">
              <div className="txt_field">
                <input
                  type="text"
                  name="employment"
                  value={formData.employment}
                  onChange={handleChange}
                  placeholder="Employment"
                  required
                />
              </div>
            </div>
            <div className="form-group col-md-6">
              <div className="txt_field">
                <input
                  type="number"
                  name="required_experience"
                  value={formData.required_experience}
                  onChange={handleChange}
                  placeholder="Required Experience"
                  required
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="form-group col-md-6">
              <div className="txt_field">
                <input
                  type="text"
                  name="required_equcation"
                  value={formData.required_equcation}
                  onChange={handleChange}
                  placeholder="Required Education"
                  required
                />
              </div>
            </div>
            <div className="form-group col-md-6">
              <div className="txt_field">
                <input
                  type="text"
                  name="industry"
                  value={formData.industry}
                  onChange={handleChange}
                  placeholder="Industry"
                  required
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="form-group col-md-12">
              <div className="txt_field">
                <input
                  type="text"
                  name="Function"
                  value={formData.Function}
                  onChange={handleChange}
                  placeholder="Function"
                  required
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="form-group col-md-4">
              <div className="checkbox_field">
                <label>
                  <input
                    type="checkbox"
                    name="telecommunication"
                    checked={formData.telecommunication === 1}
                    onChange={handleChange}
                  />
                  Telecommunication
                </label>
              </div>
            </div>
            <div className="form-group col-md-4">
              <div className="checkbox_field">
                <label>
                  <input
                    type="checkbox"
                    name="has_company"
                    checked={formData.has_company === 1}
                    onChange={handleChange}
                  />
                  Has Company
                </label>
              </div>
            </div>
            <div className="form-group col-md-4">
              <div className="checkbox_field">
                <label>
                  <input
                    type="checkbox"
                    name="has_question"
                    checked={formData.has_question === 1}
                    onChange={handleChange}
                  />
                  Has Question
                </label>
              </div>
            </div>
          </div>
          {formData.has_question === 1 && (
            <div className="row">
              <div className="form-group col-md-12">
                <div className="txt_field">
                  <input
                    type="text"
                    name="question"
                    value={formData.question}
                    onChange={handleChange}
                    placeholder="Enter your question"
                    required
                  />
                </div>
              </div>
            </div>
          )}
         <button type="submit" className="btn btn-primary btn-block mt-4 button">
              Submit
          </button>
        </form>
         <Dialog open={dialogOpen} onClose={closeDialog}>
          <DialogTitle>Job Posting Status</DialogTitle>
         <DialogContent>
             <DialogContentText>{dialogContent}</DialogContentText>
         </DialogContent>
         <DialogActions>
          <Button onClick={closeDialog} color="primary">
           Close
           </Button>
          </DialogActions>
         </Dialog>
      </div>
    </div>
    </section>
    
  );
};

export default PostJob;
