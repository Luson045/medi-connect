// Dynamically set the base URL depending on the environment (production vs local development)
let BASE_URL;

// Check if the frontend is running in production or localhost
if (window.location.hostname === 'localhost') {
  // If localhost, use the local backend
  BASE_URL = 'http://localhost:8080';
} else {
  // If deployed, use the production backend URL
  BASE_URL = 'https://medi-connect-f671.onrender.com';
}

// Helper function to dynamically replace 'localhost:8080' in any API request with the production URL when deployed
const adjustUrl = (url) => {
  if (window.location.hostname !== 'localhost' && url.includes('localhost:8080')) {
    // If the environment is production and URL contains localhost, replace it with the production URL
    return url.replace('localhost:8080', 'https://medi-connect-f671.onrender.com');
  }
  // Otherwise, return the original URL
  return url;
};

// Use adjustUrl to ensure URLs are always correct
export const databaseUrls = {
  auth: {
    login: adjustUrl(`${BASE_URL}/auth/login`),
    register: adjustUrl(`${BASE_URL}/auth/register`),
    profile: adjustUrl(`${BASE_URL}/auth/profile`),
    editProfile: adjustUrl(`${BASE_URL}/auth/profile/editprofile`),
    addDoctor: adjustUrl(`${BASE_URL}/auth/profile/adddoctor`),
  },
  hospitals: {
    all: adjustUrl(`${BASE_URL}/hospitalapi`),
    fromId: adjustUrl(`${BASE_URL}/hospitalapi/_id`),
    bookHospital: adjustUrl(`${BASE_URL}/hospitalapi/hospitals/_id/book`),
    appointments: adjustUrl(`${BASE_URL}/hospitalapi/appointments`),
    emergency: adjustUrl(`${BASE_URL}/hospitalapi/emergency`),
  },
  patient: {
    appointments: adjustUrl(`${BASE_URL}/patientapi/appointments`),
  },
};
