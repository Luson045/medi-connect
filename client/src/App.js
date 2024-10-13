import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from 'react-router-dom'; // Import Route and Routes
import { UserProvider } from './store/userContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from './components/Layout';
import ContactUs from './components/ContactUs'; // Import your ContactUs component

function App() {
  return (
    <div className="App">
      <Router>
        <UserProvider>
          <Routes>
            {/* Define route for the ContactUs page */}
            <Route exact path="/ContactUs" element={<ContactUs />} />
            
            {/* Other routes can go here */}
            <Route path="/" element={<Layout />} />
          </Routes>
        </UserProvider>
      </Router>
      <ToastContainer />
    </div>
  );
}

export default App;
