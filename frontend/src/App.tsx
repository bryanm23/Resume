import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Resume from './pages/Resume';
import Security from './pages/Security';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Resume />} />
        <Route path="/security" element={<Security />} />
      </Routes>
    </Router>
  );
};

export default App;
