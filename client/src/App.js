import React from 'react';
import OPDRegistrationForm from './modules/OPD/Registration';
import Success from './modules/OPD/Success';
import Home from './modules/OPD/Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
            <div>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/registerOPD" element={<OPDRegistrationForm />} />
                    <Route path="/success" element={<Success />} />
                </Routes>
            </div>
        </Router>
    </div>
  );
}

export default App;
