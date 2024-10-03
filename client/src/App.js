import React from 'react';
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
import Footer from '../src/modules/common/Footer'; // Import Footer
import AnimatedCursor from 'react-animated-cursor';

function App() {
  return (
    <div className="App">
      <AnimatedCursor
        innerSize={8}
        outerSize={35}
        innerScale={1}
        outerScale={2}
        outerAlpha={0}
        hasBlendMode={true}
        innerStyle={{
          backgroundColor: 'var(--cursor-color)',
        }}
        outerStyle={{
          border: '3px solid var(--cursor-color)',
        }}
      />{' '}
      <Router>
        <UserProvider>
          <div>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/registerOPD" element={<OPDRegistrationForm />} />
              <Route path="/success" element={<Success />} />
              <Route path="/login" element={<AuthPage />} />
              <Route path="/register" element={<AuthPage />} />
              <Route path="/hospitals" element={<HospitalsList />} />
              <Route path="/panal" element={<HospitalAppointments />} />
              <Route path="/profile" element={<ProfilePage />} />
            </Routes>
          </div>
          {/* Footer added here */}
          <Footer />
        </UserProvider>
      </Router>
      <ToastContainer />
    </div>
  );
}

export default App;
