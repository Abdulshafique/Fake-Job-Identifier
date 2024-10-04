import React from 'react';
import './HeaderSection.css';
import SearchJob from './SearchJob';


const HeaderSection = () => {
  return (
    <section className="header18 fullscreen-header-section mbr-fullscreen">
      <div className="mbr-overlay" style={{ opacity: 0.3, backgroundColor: 'rgb(0, 0, 0)' }}></div>
      <div className="container-fluid">
        <div className="row">
          <div className="content-wrap col-12 col-md-8">
            <h1 className="mbr-section-title mbr-fonts-style mbr-white mb-4 display-1 animate__animated animate__delay-1s animate__fadeInUp">
              <strong>Find the most Authentic Jobs That Fit</strong>
            </h1>
            <SearchJob />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeaderSection;
