import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { UserProvider } from './store/userContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from './components/Layout';
import NewWelcome from './pages/newelcome';
import Testimonials from './pages/Testimonials';
import { useState, useEffect } from 'react';
import Preloader from './components/PreLoader';

function App() {
  // Preloader state
  const [isPreloaderVisible, setIsPreloaderVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsPreloaderVisible(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="App">
      {isPreloaderVisible ? (
        <Preloader />
      ) : (
        <>
          <Router>
            <UserProvider>
              <nav>
                <ul>
                  <li>
                    <Link to="/newwelcome">Welcome</Link>
                  </li>
                  <li>
                    <Link to="/testimonials">Testimonials</Link>
                  </li>
                </ul>
              </nav>

              <Switch>
                <Route path="/testimonials">
                  <Testimonials />
                </Route>
                <Route path="/newwelcome">
                  <NewWelcome />
                </Route>
              </Switch>
            </UserProvider>
          </Router>
          <ToastContainer />
        </>
      )}
    </div>
  );
}

export default App;