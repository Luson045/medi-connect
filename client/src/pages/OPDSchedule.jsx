import React, { useEffect, useState } from 'react';
import '../styles/Login.css';
import { useRecoilValue } from 'recoil'; // Import Recoil to use the dark mode state
import { mode } from '../store/atom'; // Import dark mode atom
import { motion } from 'framer-motion';
import FloatingIcons from '../components/FloatingIcons';
import PropTypes from 'prop-types';
import { useLocation, useNavigate } from 'react-router-dom';
import { databaseUrls } from '../data/databaseUrls';

const departments = {
  cardiology: {
    name: 'Cardiology'
  },
  neurology: {
    name: 'Neurology'
  },
  orthopedics: {
    name: 'Orthopedics'
  },
  pediatrics: {
    name: 'Pediatrics'
  },
  gynecology: {
    name: 'Gynecology'
  },
  dermatology: {
    name: 'Dermatology'
  },
};

const OPDTable = ({ doctorsSchedule }) => {
  const emptyFiller = '-';

  return (
    <div className="overflow-x-auto w-full">
      <table className="min-w-full bg-white border border-gray-200 text-sm rounded-lg">
        <thead>
          <tr className="bg-gray-50">
            <th className="py-3 px-4 border-b font-semibold text-gray-700">
              Doctor
            </th>
            <th className="py-3 px-4 border-b font-semibold text-gray-700">
              Monday
            </th>
            <th className="py-3 px-4 border-b font-semibold text-gray-700">
              Tuesday
            </th>
            <th className="py-3 px-4 border-b font-semibold text-gray-700">
              Wednesday
            </th>
            <th className="py-3 px-4 border-b font-semibold text-gray-700">
              Thursday
            </th>
            <th className="py-3 px-4 border-b font-semibold text-gray-700">
              Friday
            </th>
            <th className="py-3 px-4 border-b font-semibold text-gray-700">
              Saturday
            </th>
            <th className="py-3 px-4 border-b font-semibold text-gray-700">
              Sunday
            </th>
          </tr>
        </thead>
        <tbody>
          {
          doctorsSchedule
          .map((doc) =>
            <tr
              key={doc._id}
              className={` hover:bg-blue-100 
                  ${doc._id % 2 === 0 ? 'bg-gray-200' : 'bg-white'} 
                  transition-colors duration-150 ease-in-out`}
            >
              <td className="ps-3 py-3 text-left">{doc.name}</td>
              <td>{doc.opdSchedule.monday ? doc.opdSchedule.monday : emptyFiller}</td>
              <td>{doc.opdSchedule.tuesday ? doc.opdSchedule.tuesday : emptyFiller}</td>
              <td>{doc.opdSchedule.wednesday ? doc.opdSchedule.wednesday : emptyFiller}</td>
              <td>{doc.opdSchedule.thurdsday ? doc.opdSchedule.thurdsday : emptyFiller}</td>
              <td>{doc.opdSchedule.friday ? doc.opdSchedule.friday : emptyFiller}</td>
              <td>{doc.opdSchedule.saturday ? doc.opdSchedule.saturday : emptyFiller}</td>
              <td>{doc.opdSchedule.sunday ? doc.opdSchedule.sunday : emptyFiller}</td>
            </tr>
        )}
        </tbody>
      </table>
    </div>
  );
};

OPDTable.propTypes = {
  doctorsSchedule: PropTypes.array.isRequired
};

const OPDScheduleCard = ({ departmentName, doctorsSchedule, hospitalPhone }) => {
  return (
    <>
      <motion.div
        className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-end justify-between hover:shadow-sm transition-transform w-full"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ type: 'spring', stiffness: 500 }}
      >
        {departmentName ? (
          <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-center w-full mb-6 text-grey-500">
            {departments[departmentName].name}
          </p>
        ) : (
          <></>
        )}
        <div className="flex flex-col items-center text-center w-full">
          {departmentName ? (
            doctorsSchedule.length !== 0 ?
            (<>
              <OPDTable doctorsSchedule={doctorsSchedule} />
              <div className="flex w-full px-2  text-sm mt-6 text-gray-500 font-italic italic">
                <p>
                  Note: The OPD Schedule is subject to change. Please call to
                  confirm the schedule :{' '}
                  <a
                    href="tel:911800808080"
                    className="text-blue-500 hover:underline"
                  >
                    {hospitalPhone}
                  </a>
                </p>
              </div>
            </>) : (
              <div className="flex flex-col items-center text-center w-full">
                <p className="text-lg italic text-center w-full mb-6 text-grey-800">
                  No doctors available in this department
                </p>
             </div>
            )
          ) : (
            <>Select a department to view the schedule.</>
          )}
        </div>
      </motion.div>
    </>
  );
};

OPDScheduleCard.propTypes = {
  departmentName: PropTypes.string.isRequired,
  doctorsSchedule: PropTypes.array.isRequired,
  hospitalPhone: PropTypes.string.isRequired
};

function OPDSchedule() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const hospitalId = queryParams.get('id');
  const dark = useRecoilValue(mode); // Access dark mode value using Recoil
  const [departmentName, setDepartment] = useState('');
  const [hospitalData, setHospitalData] = useState(null);

  useEffect(() => {
    if (!hospitalId) {
      navigate('/not-found');
    }else{
      // fetch
      fetch(databaseUrls.hospitals.fromId.replace('_id', hospitalId))
      .then((data) => data.json())
      .then((data) => {setHospitalData(data)})
    }
  },[]);

  if (!hospitalId) {
    return <></>;
  }

  if (hospitalData === null) {
    return <></>;
  }   

  return (
    <>
      <header className="relative text-black py-16 sm:py-24 md:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-100 to-white overflow-hidden">
        <div className="absolute inset-0">
          <svg
            className="absolute bottom-0 left-0 right-0"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
          >
            <path
              fill="#e1f3f7"
              fillOpacity="1"
              d="M0,64L48,80C96,96,192,128,288,128C384,128,480,96,576,90.7C672,85,768,107,864,128C960,149,1056,171,1152,165.3C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ></path>
          </svg>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="department_container">
            <div className="container ">
              <div className="heading_container heading_center">
                <motion.h2
                  className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight"
                  initial={{ opacity: 0, y: -50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, type: 'spring' }}
                >
                  <span>Check OPD Schedule</span>
                </motion.h2>
                <motion.p className="flex flex-col items-center text-center mb-12 mx-2">
                  <span>
                    Hospital : {hospitalData.name}
                  </span>
                </motion.p>
                <motion.p className="flex flex-col items-center text-center mb-12 mx-2">
                  <span>
                    If you are in an emergency and can not wait for an
                    appointment to be approved, you can check the available time
                    slots for a specific doctor or specialist right away. If you
                    prefer a particular doctor based on previous visits and
                    effective treatments, you can also see their schedule and
                    book a accordingly.
                  </span>
                </motion.p>
              </div>
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false }}
                transition={{ staggerChildren: 0.2 }}
              >
                <div>
                  <label htmlFor="department">Department:</label>
                  <select
                    id="department"
                    name="department"
                    required
                    onChange={(it) => {
                      setDepartment(it.target.value);
                    }}
                    value={departmentName}
                    className={`
                      ${dark === 'dark' ? 'input-dark' : ''}
                       rounded py-1 px-2 ms-2`}
                  >
                    <option value="" disabled>
                      Select Department
                    </option>
                    {
                      Object.keys(departments)
                      .map((department) => (
                        <option key={department} value={department}>
                          {departments[department].name}
                        </option>
                      ))
                    }
                  </select>
                </div>
              </motion.div>
              <div className="mt-4">
                <OPDScheduleCard departmentName={departmentName} doctorsSchedule={
                  hospitalData.doctors.filter((doc) => doc.department === departmentName)
                } hospitalPhone={hospitalData.phone}/>
              </div>
            </div>
          </div>
        </div>
        <FloatingIcons />
      </header>
    </>
  );
}

export default OPDSchedule;
