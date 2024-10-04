import React from 'react';
import { useLocation } from 'react-router-dom';
import { Table, Container } from 'react-bootstrap';
import './JobResults.css'; // Ensure this CSS file is set up correctly

const JobResults = () => {
  const location = useLocation();
  const results = location.state?.results || [];

  return (
    <Container>
       
      <div className="table-header">
        <h2>Search Results</h2>
      </div>
      <Table striped bordered hover className="custom-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Company</th>
            <th>Department</th>
            <th>Industry</th>
            <th>Description</th>
            <th>Type</th>
            <th>Location</th>
            <th>Posted At</th>
            <th>Education</th>
            <th>Experience</th>
            <th>Requirements</th>
            <th>Salary Range</th>
          </tr>
        </thead>
        <tbody>
          {results.map((job, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{job.Title}</td>
              <td>{job.company_name}</td>
              <td>{job.department}</td>
              <td>{job.industry}</td>
              <td>{job.job_description}</td>
              <td>{job.job_type}</td>
              <td>{job.location}</td>
              <td>{new Date(job.posted_at).toLocaleDateString()}</td>
              <td>{job.required_education}</td>
              <td>{job.required_experience}</td>
              <td>{job.requirement}</td>
              <td>{job.salary_range}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default JobResults;
