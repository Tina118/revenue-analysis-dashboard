import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from 'container/Login';

// Use React.lazy to dynamically import the Registration and Dashboard components
const Registration = lazy(() => import('container/Registration'));
const Dashboard = lazy(() => import('container/Dashboard'));

/**
 * App
 * Handles routes for all pages
 */
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/register"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <Registration />
            </Suspense>
          }
        />
        <Route
          path="/dashboard"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <Dashboard />
            </Suspense>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
