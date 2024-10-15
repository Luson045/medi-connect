const BASE_URL = `https://medi-connect-f671.onrender.com`;

export const databaseUrls = {
  auth: {
    login: `${BASE_URL}/auth/login`,
    register: `${BASE_URL}/auth/register`,
    profile: `${BASE_URL}/auth/profile`,
    editProfile: `${BASE_URL}/auth/profile/editprofile`,
    addDoctor: `${BASE_URL}/auth/profile/adddoctor`,
  },
  hospitals: {
    all: `${BASE_URL}/hospitalapi`,
    fromId: `${BASE_URL}/hospitalapi/_id`,
    bookHospital: `${BASE_URL}/hospitalapi/hospitals/_id/book`,
    appointments: `${BASE_URL}/hospitalapi/appointments`,
    emergency: `${BASE_URL}/hospitalapi/emergency`,
  },
  patient: {
    appointments: `${BASE_URL}/patientapi/appointments`,
  },
};
