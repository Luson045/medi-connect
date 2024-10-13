import React, { useState } from 'react';
import '../styles/Login.css';
import { useRecoilValue } from 'recoil'; // Import Recoil to use the dark mode state
import { mode } from '../store/atom'; // Import dark mode atom
import { motion } from 'framer-motion';
import FloatingIcons from '../components/FloatingIcons';
import PropTypes from 'prop-types';

const departments = {
  cardiology: {
    name: 'Cardiology',
    opdSchedule: [
      {
        doctorName: 'Dr. John Smith',
        monday: '9:00 AM - 3:00 PM',
        tuesday: '9:00 AM - 3:00 PM',
        wednesday: '9:00 AM - 3:00 PM',
        thursday: '9:00 AM - 3:00 PM',
        friday: '9:00 AM - 3:00 PM',
        saturday: '10:00 AM - 2:00 PM',
      },
      {
        doctorName: 'Dr. Emily Johnson',
        monday: '10:00 AM - 4:00 PM',
        tuesday: '10:00 AM - 4:00 PM',
        wednesday: '10:00 AM - 4:00 PM',
        thursday: '10:00 AM - 4:00 PM',
        friday: '10:00 AM - 4:00 PM',
        saturday: '10:00 AM - 2:00 PM',
      },
      {
        doctorName: 'Dr. David Lee',
        monday: '11:00 AM - 5:00 PM',
        tuesday: '11:00 AM - 5:00 PM',
        wednesday: '11:00 AM - 5:00 PM',
        thursday: '11:00 AM - 5:00 PM',
        friday: '11:00 AM - 5:00 PM',
        saturday: '9:00 AM - 1:00 PM',
      },
      {
        doctorName: 'Dr. Alice Thompson',
        monday: '8:00 AM - 2:00 PM',
        tuesday: '8:00 AM - 2:00 PM',
        wednesday: '8:00 AM - 2:00 PM',
        thursday: '8:00 AM - 2:00 PM',
        friday: '8:00 AM - 2:00 PM',
        saturday: '11:00 AM - 3:00 PM',
      },
      {
        doctorName: 'Dr. Robert Carter',
        monday: '9:30 AM - 3:30 PM',
        tuesday: '9:30 AM - 3:30 PM',
        wednesday: '9:30 AM - 3:30 PM',
        thursday: '9:30 AM - 3:30 PM',
        friday: '9:30 AM - 3:30 PM',
        saturday: '10:00 AM - 1:00 PM',
      },
      {
        doctorName: 'Dr. Sophia Wilson',
        monday: '10:00 AM - 4:00 PM',
        tuesday: '10:00 AM - 4:00 PM',
        wednesday: '10:00 AM - 4:00 PM',
        thursday: '10:00 AM - 4:00 PM',
        friday: '10:00 AM - 4:00 PM',
        saturday: '11:00 AM - 2:00 PM',
      },
    ],
  },
  neurology: {
    name: 'Neurology',
    opdSchedule: [
      {
        doctorName: 'Dr. Sarah Brown',
        monday: '8:00 AM - 12:00 PM',
        tuesday: '1:00 PM - 5:00 PM',
        wednesday: '8:00 AM - 12:00 PM',
        thursday: '1:00 PM - 5:00 PM',
        friday: '8:00 AM - 12:00 PM',
      },
      {
        doctorName: 'Dr. Michael Taylor',
        monday: '10:00 AM - 3:00 PM',
        tuesday: '10:00 AM - 3:00 PM',
        thursday: '10:00 AM - 3:00 PM',
        friday: '10:00 AM - 3:00 PM',
      },
      {
        doctorName: 'Dr. Daniel Scott',
        monday: '9:00 AM - 1:00 PM',
        tuesday: '2:00 PM - 6:00 PM',
        wednesday: '9:00 AM - 1:00 PM',
        thursday: '2:00 PM - 6:00 PM',
        friday: '9:00 AM - 1:00 PM',
      },
      {
        doctorName: 'Dr. Karen Green',
        monday: '11:00 AM - 4:00 PM',
        tuesday: '11:00 AM - 4:00 PM',
        thursday: '11:00 AM - 4:00 PM',
        friday: '11:00 AM - 4:00 PM',
      },
    ],
  },
  orthopedics: {
    name: 'Orthopedics',
    opdSchedule: [
      {
        doctorName: 'Dr. Robert Wilson',
        monday: '9:00 AM - 3:00 PM',
        tuesday: '9:00 AM - 3:00 PM',
        wednesday: '9:00 AM - 3:00 PM',
        thursday: '1:00 PM - 5:00 PM',
        friday: '9:00 AM - 3:00 PM',
        saturday: '10:00 AM - 1:00 PM',
      },
      {
        doctorName: 'Dr. Linda Miller',
        monday: '1:00 PM - 5:00 PM',
        tuesday: '9:00 AM - 3:00 PM',
        thursday: '9:00 AM - 3:00 PM',
        friday: '1:00 PM - 5:00 PM',
      },
      {
        doctorName: 'Dr. Ethan Hall',
        monday: '9:00 AM - 4:00 PM',
        tuesday: '9:00 AM - 4:00 PM',
        wednesday: '9:00 AM - 4:00 PM',
        thursday: '10:00 AM - 3:00 PM',
        friday: '9:00 AM - 4:00 PM',
        saturday: '11:00 AM - 2:00 PM',
      },
      {
        doctorName: 'Dr. Grace Lee',
        monday: '1:00 PM - 5:00 PM',
        tuesday: '10:00 AM - 3:00 PM',
        thursday: '10:00 AM - 3:00 PM',
        friday: '1:00 PM - 5:00 PM',
      },
    ],
  },
  pediatrics: {
    name: 'Pediatrics',
    opdSchedule: [
      {
        doctorName: 'Dr. Jennifer Davis',
        monday: '10:00 AM - 2:00 PM',
        tuesday: '10:00 AM - 2:00 PM',
        wednesday: '1:00 PM - 5:00 PM',
        thursday: '10:00 AM - 2:00 PM',
        friday: '1:00 PM - 5:00 PM',
      },
      {
        doctorName: 'Dr. James Harris',
        monday: '9:00 AM - 1:00 PM',
        tuesday: '9:00 AM - 1:00 PM',
        wednesday: '2:00 PM - 6:00 PM',
        thursday: '9:00 AM - 1:00 PM',
        friday: '2:00 PM - 6:00 PM',
      },
    ],
  },
  gynecology: {
    name: 'Gynecology',
    opdSchedule: [
      {
        doctorName: 'Dr. Jessica Garcia',
        monday: '9:00 AM - 1:00 PM',
        tuesday: '9:00 AM - 1:00 PM',
        wednesday: '1:00 PM - 5:00 PM',
        thursday: '9:00 AM - 1:00 PM',
        saturday: '9:00 AM - 1:00 PM',
      },
      {
        doctorName: 'Dr. Maria Clark',
        monday: '10:00 AM - 2:00 PM',
        tuesday: '10:00 AM - 2:00 PM',
        wednesday: '2:00 PM - 6:00 PM',
        thursday: '10:00 AM - 2:00 PM',
        saturday: '10:00 AM - 2:00 PM',
      },
    ],
  },
  dermatology: {
    name: 'Dermatology',
    opdSchedule: [
      {
        doctorName: 'Dr. Charles Martinez',
        monday: '9:00 AM - 3:00 PM',
        tuesday: '1:00 PM - 5:00 PM',
        wednesday: '9:00 AM - 3:00 PM',
        thursday: '1:00 PM - 5:00 PM',
        saturday: '10:00 AM - 2:00 PM',
      },
      {
        doctorName: 'Dr. Angela Rodriguez',
        monday: '10:00 AM - 4:00 PM',
        tuesday: '10:00 AM - 4:00 PM',
        thursday: '10:00 AM - 4:00 PM',
        friday: '10:00 AM - 4:00 PM',
      },
      {
        doctorName: 'Dr. William Lewis',
        monday: '10:00 AM - 3:00 PM',
        tuesday: '1:00 PM - 5:00 PM',
        wednesday: '10:00 AM - 3:00 PM',
        thursday: '1:00 PM - 5:00 PM',
        saturday: '11:00 AM - 3:00 PM',
      },
      {
        doctorName: 'Dr. Natalie Walker',
        monday: '9:00 AM - 2:00 PM',
        tuesday: '9:00 AM - 2:00 PM',
        thursday: '9:00 AM - 2:00 PM',
        friday: '9:00 AM - 2:00 PM',
      },
    ],
  },
};

const OPDTable = ({ departmentName }) => {
  const opdScheduleData = departments[departmentName].opdSchedule;
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
          {opdScheduleData.map((row, index) => (
            <tr
              key={index}
              className={` hover:bg-blue-100 
                  ${index % 2 === 0 ? 'bg-gray-200' : 'bg-white'} 
                  transition-colors duration-150 ease-in-out`}
            >
              <td className="ps-3 py-3 text-left">{row.doctorName}</td>
              <td>{row.monday ? row.monday : emptyFiller}</td>
              <td>{row.tuesday ? row.tuesday : emptyFiller}</td>
              <td>{row.wednesday ? row.wednesday : emptyFiller}</td>
              <td>{row.thurdsday ? row.thurdsday : emptyFiller}</td>
              <td>{row.friday ? row.friday : emptyFiller}</td>
              <td>{row.saturday ? row.saturday : emptyFiller}</td>
              <td>{row.sunday ? row.sunday : emptyFiller}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

OPDTable.propTypes = {
  departmentName: PropTypes.string.isRequired,
};

const OPDScheduleCard = ({ departmentName }) => {
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
            <>
              <OPDTable departmentName={departmentName} />
              <div className="flex w-full px-2  text-sm mt-6 text-gray-500 font-italic italic">
                <p>
                  Note: The OPD Schedule is subject to change. Please call to
                  confirm the schedule :{' '}
                  <a
                    href="tel:911800808080"
                    className="text-blue-500 hover:underline"
                  >
                    +91 1800 8080 80
                  </a>
                </p>
              </div>
            </>
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
};

function OPDSchedule() {
  const dark = useRecoilValue(mode); // Access dark mode value using Recoil
  const [departmentName, setDepartment] = useState('');

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
                    <option value="cardiology">Cardiology</option>
                    <option value="neurology">Neurology</option>
                    <option value="orthopedics">Orthopedics</option>
                    <option value="pediatrics">Pediatrics</option>
                    <option value="gynecology">Gynecology</option>
                    <option value="dermatology">Dermatology</option>
                  </select>
                </div>
              </motion.div>
              <div className="mt-4">
                <OPDScheduleCard departmentName={departmentName} />
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
