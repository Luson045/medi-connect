import { Route, Routes, Navigate, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import ServicePage from '../pages/Service';
import Registration from '../pages/Registration';
import TermsAndConditions from '../pages/TermsAndConditions';
import NotFound from '../pages/NotFound';
import ScrollToTop from './ScrollToTop';
import LabTestMedipedia from '../pages/LabTest';
import BlogPage from '../pages/Blog';
import BlogDetailsPage from '../pages/BlogDetailsPage';
import HospitalsAround from '../pages/HospitalsAround';
import Chatbot from '../Medical-Chatbot/Chatbot';
import Footer from './Footer';
import ProfilePage from '../pages/Profile';
import AboutPage from '../pages/About';
import AuthPage from '../pages/AuthForm';
import OPDSchedule from '../pages/OPDSchedule';
import OPDRegistrationForm from '../pages/OPDRegistration';
import HospitalsList from '../pages/HospitalList';
import Success from '../pages/Success';
import Home from '../pages/Home';
import HospitalDetails from '../pages/HospitalDetail';
import HospitalAppointments from '../pages/HospitalPanal';
import BusinessContactForm from './BusinessContactForm';
import ForgotPassword from './ForgotPassword';
import PrivateRoute from '../privateroute/privateroute';
import Newsletters from '../pages/Newsletters';

function Layout() {
  const location = useLocation();
  let showNavAndFooter = false;
  const path = location.pathname;

  // Define when to show the Navbar and Footer
  if (
    path === '/' ||
    path === '/about' ||
    path === '/registerOPD' ||
    path === '/checkOPDschedule' ||
    path === '/success' ||
    path === '/login' ||
    path === '/register' ||
    path === '/hospitals' ||
    path === '/hospitalDetails' ||
    path === '/panal' ||
    path === '/profile' ||
    path === '/services' ||
    path === '/terms-and-conditions' ||
    path === '/Labtest' ||
    path === '/blog' ||

    path === '/business'||
    path === '/forgot-password'||

    path === '/newsletter-dashboard'
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
          <Route exact path="/checkOPDschedule" element={<OPDSchedule />} />
          <Route exact path="/success" element={<Success />} />
          <Route exact path="/login" element={<AuthPage />} />
          <Route exact path="/register" element={<Registration />} />
          <Route exact path="/hospitals" element={<HospitalsList />} />
          <Route exact path="/hospitalDetails" element={<HospitalDetails />} />
          <Route exact path="/panal" element={<HospitalAppointments />} />

          {/* private route for profile page  */}
          <Route element={<PrivateRoute />}>
            <Route exact path="/profile" element={<ProfilePage />} />
            {/* Add more protected routes here */}
          </Route>

          <Route exact path="/services" element={<ServicePage />} />
          <Route exact path="/blog" element={<BlogPage />} />
          <Route path="/blog/:id" element={<BlogDetailsPage />} />
          <Route exact path="/Labtest" element={<LabTestMedipedia />} />
          <Route path="/not-found" element={<NotFound />} />
          <Route exact path="/" element={<Home />} />
          <Route exact path="/about" element={<AboutPage />} />
          <Route exact path="/registerOPD" element={<OPDRegistrationForm />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route
            exact
            path="/terms-and-conditions"
            element={<TermsAndConditions />}
          />
          <Route path="/hospitals-around" element={<HospitalsAround />} />
          <Route path="/business" element={<BusinessContactForm />}></Route>
          <Route path="/not-found" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/not-found" />} />

          <Route path="/newsletter-dashboard" element={<Newsletters/>} />

        </Routes>
      </div>
      <Chatbot />
      {/* Conditionally render Footer */}
      {showNavAndFooter && <Footer />}
      {!showNavAndFooter && (
        // chat bot it now in footer, if the footer does not shown, then chat bot will render standalone
        <div className="fixed bottom-4 right-6 flex flex-col gap-3">
          <Chatbot />
        </div>
      )}
    </>
  );
}

export default Layout;
