import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './Components/NavBar';
import HeaderSection from './Components/HeaderSection';
import ExploreOpportunities from './Components/ExploreOpportunities';
import FqaSection from './Components/FqaSection';
import DiscoverJob from './Components/DiscoverJob';
import JobHunt from './Components/JobHunt';
import StayConnect from './Components/StayConnect';
import Get_InTouch from './Components/Get_InTouch';
import SocialMedia from './Components/SocialMedia';
import Login from './Components/Login'; 
import Registration from './Components/Registration';
import { AuthProvider } from './Components/AuthContext';
import PredictJob from './Components/PredictJob';
import PostJob from './Components/PostJob';
import PrivateRoute from './Components/PrivateRoute';
import JobResults from './Components/JobResult';

function App() {
  return (
    <AuthProvider>
    <Router>
      <div className="App">
        <NavBar />
        <Routes>
          <Route path="/" element={<> 
            <HeaderSection />
            <ExploreOpportunities />
            <FqaSection />
            <DiscoverJob />
            <JobHunt />
            <StayConnect />
            <Get_InTouch />
            <SocialMedia />
          </>} />
          <Route path="/login" element={<Login />} />
          <Route path="/Registration" element={<Registration />} />
          <Route path="/PredictJob" element={<PredictJob />} />
          <Route path="/postjob" element={<PrivateRoute element={<PostJob />} />} /> {/* Protected Route */}
           <Route path="/JobResults" element={<JobResults />} />
        </Routes>
      </div>
    </Router>
    </AuthProvider>
  );
};

export default App;
