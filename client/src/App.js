import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useLocation,
} from 'react-router-dom';
import AuthPage from './modules/common/AuthForm';
import OPDRegistrationForm from './modules/OPD/Registration';
import HospitalsList from './modules/OPD/HospitalList';
import Success from './modules/OPD/Success';
import Home from './modules/OPD/Home';
import HospitalAppointments from './modules/OPD/HospitalPanal';
import { UserProvider } from './modules/common/userContext';
import ProfilePage from './modules/common/Profile';
import AboutPage from './modules/common/About';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from './modules/common/Footer';
import Navbar from './modules/common/Navbar';
import ServicePage from './modules/common/Service';
import Registration from './modules/Registration/Registration';
import TermsAndConditions from './modules/common/TermsAndConditions';
import NotFound from './modules/OPD/NotFound';
import ScrollToTop from './modules/comps/ScrollToTop';
import LabTestMedipedia from './modules/LabTest/LabTest';
import BlogPage from './modules/common/Blog';
import BlogDetailsPage from './modules/common/BlogDetailsPage';
import HospitalsAround from './modules/common/HospitalsAround';
import Chatbot from './modules/common/Medical-Chatbot/Chatbot';

function Layout() {
  const location = useLocation();
  let showNavAndFooter = false;
  const path = location.pathname;

  // Define when to show the Navbar and Footer
  if (
    path === '/' ||
    path === '/about' ||
    path === '/registerOPD' ||
    path === '/success' ||
    path === '/login' ||
    path === '/register' ||
    path === '/hospitals' ||
    path === '/panal' ||
    path === '/profile' ||
    path === '/services' ||
    path === '/terms-and-conditions' ||
    path === '/Labtest' ||
    path === '/blog'
  ) {
    showNavAndFooter = true;
  }

  return (
    <>
      {/* Conditionally render Navbar */}
      {showNavAndFooter && <Navbar />}
      <div className="mt-14">
        <ScrollToTop />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/about" element={<AboutPage />} />
          <Route exact path="/registerOPD" element={<OPDRegistrationForm />} />
          <Route exact path="/success" element={<Success />} />
          <Route exact path="/login" element={<AuthPage />} />
          <Route exact path="/register" element={<Registration />} />
          <Route exact path="/hospitals" element={<HospitalsList />} />
          <Route exact path="/panal" element={<HospitalAppointments />} />
          <Route exact path="/profile" element={<ProfilePage />} />
          <Route exact path="/services" element={<ServicePage />} />
          <Route exact path="/blog" element={<BlogPage />} />
          <Route path="/blog/:id" element={<BlogDetailsPage />} />
          <Route exact path="/Labtest" element={<LabTestMedipedia />} />
          <Route
            exact
            path="/terms-and-conditions"
            element={<TermsAndConditions />}
          />
          <Route path="/hospitals-around" element={<HospitalsAround />} />
          <Route path="/not-found" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/not-found" />} />
        </Routes>
      </div>
      <Chatbot/>
      {/* Conditionally render Footer */}
      {showNavAndFooter && <Footer />}
    </>
  );
}

function App() {
  return (
    <div className="App">
      <Router>
        <UserProvider>
          <Layout />
        </UserProvider>
      </Router>
      <ToastContainer />
    </div>
  );
}

export default App;
