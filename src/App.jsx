import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// Correcting import paths to be relative to the 'src' directory
import { AuthProvider } from './context/authContext/Index.jsx';
import TeachMateLanding from "./TeachMateLanding.jsx";
import StudentRegistration from "./StudentRegistration.jsx";
import TeacherRegistration from "./TeacherRegistration.jsx";
import StudentDashboard from "./StudentDashboard.jsx";
import TeacherDashboard from "./TeacherDashboard.jsx";
import PrivateRoute from './components/routes/PrivateRoute.jsx';

function App() {
  return (
    // The AuthProvider now wraps your entire application, providing auth state
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<TeachMateLanding />} />
          <Route path="/StudentRegistration" element={<StudentRegistration />} />
          <Route path="/TeacherRegistration" element={<TeacherRegistration />} />

          {/* The new PrivateRoute component protects your dashboards */}
          <Route 
            path="/student-dashboard" 
            element={<PrivateRoute><StudentDashboard /></PrivateRoute>} 
          />
          <Route 
            path="/teacher-dashboard" 
            element={<PrivateRoute><TeacherDashboard /></PrivateRoute>} 
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;

