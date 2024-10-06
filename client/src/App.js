import React, { useState } from 'react';
import AuthPage from './modules/common/AuthForm';
import OPDRegistrationForm from './modules/OPD/Registration';
import HospitalsList from './modules/OPD/HospitalList';
import Success from './modules/OPD/Success';
import Home from './modules/OPD/Home';
import HospitalAppointments from './modules/OPD/HospitalPanal';
import { UserProvider } from './modules/common/userContext';
import ProfilePage from './modules/common/Profile';
import AboutPage from './modules/common/About';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from './modules/common/Footer'; // Import Footer
import Navbar from './modules/common/Navbar';
import ServicePage from './modules/common/Service';
import AnimatedCursor from './modules/common/AnimatedCursor';

function App() {
  const [loaderVisible, setLoaderVisible] = useState(true);

  return (
    <div className="App">
      <AnimatedCursor />
      <Router>
        <UserProvider>
          {/* Conditionally render the Navbar based on loaderVisible state */}
          {!loaderVisible && <Navbar />}
          <div className="mt-14">
            <Routes>
              <Route
                path="/"
                element={
                  <Home
                    loaderVisible={loaderVisible}
                    setLoaderVisible={setLoaderVisible}
                  />
                }
              />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/registerOPD" element={<OPDRegistrationForm />} />
              <Route path="/success" element={<Success />} />
              <Route path="/login" element={<AuthPage />} />
              <Route path="/register" element={<AuthPage />} />
              <Route path="/hospitals" element={<HospitalsList />} />
              <Route path="/panal" element={<HospitalAppointments />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/services" element={<ServicePage />} />
            </Routes>
          </div>
          {/* Footer added here */}
          {!loaderVisible && <Footer />}
        </UserProvider>
      </Router>
      <ToastContainer />
    </div>
  );
}

export default App;
