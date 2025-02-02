import {
  BrowserRouter as Router,
} from 'react-router-dom';
import { UserProvider } from './store/userContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from './components/Layout';
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
    <>
    {/*--google-site-verification: google702f0a7aa8f19d22.html--*/}
    <div className="App">
      {isPreloaderVisible ? (
        <Preloader />
      ) : (
        <>
          <Router>
            <UserProvider>
              <Layout />
            </UserProvider>
          </Router>
          <ToastContainer />
        </>
      )}
    </div>
    </>
  );
}

export default App;
