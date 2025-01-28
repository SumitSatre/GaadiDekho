// src/App.js
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './screens/Home';
import Login from './screens/Login';
import SignUpPage from './screens/Signup';
import AboutPage from './screens/About';
import DashboardPage from './Dashboard/Dashboard';
import ProtectedRouteAdmin from './Dashboard/ProtectedRouteAdmin.js';
import VehicleInfoPage from './components/VehicleInfoPage.js';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/about" element={<AboutPage />} />

        <Route path="/dashboard" element={<ProtectedRouteAdmin />}>
          <Route index element={<DashboardPage />} />
        </Route>

        <Route path="/vehicleinfo/:id" element={<VehicleInfoPage />} />

      </Routes>
    </BrowserRouter>
  );
};

export default App;
