import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './DisplayJob.css'; // Example CSS file for animations

const RecentJobs = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('http://localhost:8080/jobs');
        setJobs(response.data.slice(0, 6));
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    fetchJobs();
  }, []);

  return (
    <section className="job-tips">
      <div className="container-fluid">
        <div className="row justify-content-center mb-5">
          <div className="col-12 content-head">
            <div className="mbr-section-head">
              <h4 className="mbr-section-title mbr-fonts-style align-center mb-0 display-2">
                <strong>Recent Jobs</strong>
              </h4>
            </div>
          </div>
        </div>
        <div className="row job-slider">
          {jobs.map((job) => (
            <div key={job.job_id} className="item features-image col-12 col-md-6 col-lg-3">
              <div className="card simple-card">
                <div className="card-body">
                  <h5 className="card-title">{job.title}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">{job.company_name}</h6>
                  <p className="card-text">{job.location}</p>
                  <p className="card-text">{job.salary_range}</p>
                  {/* Add more job details as needed */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecentJobs;
