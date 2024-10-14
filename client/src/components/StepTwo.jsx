import { useState, useContext } from 'react';
import { useRecoilValue } from 'recoil';
import RegistrationContext from '../store/RegistrationContext';
import { isEmpty } from 'lodash';
import { mode } from '../store/atom'; // Importing the atom for mode

const btnDivStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  marginTop: '5px',
};

function StepTwo() {
  const { basicDetails, otherDetails, setOtherDetails, nextStep, prevStep } =
    useContext(RegistrationContext);
  const { street, city, state, postalCode } = otherDetails.address;
  const [errors, setErrors] = useState({
    frontend: {},
    backend: {},
  });

  const dark = useRecoilValue(mode); // Using Recoil state for dark mode

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name in otherDetails.address) {
      // Update the address field
      setOtherDetails((prevDetails) => ({
        ...prevDetails,
        address: {
          ...prevDetails.address,
          [name]: value,
        },
      }));
    } else {
      setOtherDetails({
        ...otherDetails,
        [name]: value,
      });
    }

    setErrors((prev) => ({
      ...prev,
      frontend: {
        ...prev.frontend,
        [name]: '', // Clear frontend error for the field being edited
      },
    }));
  };

  const handleCommaSeparatedValues = (e) => {
    const { name, value } = e.target;

    setOtherDetails((prevDetails) => ({
      ...prevDetails,
      [name]: [...prevDetails.medicalHistory, ...value.split(',')],
    }));
  };

  const validateForm = () => {
    const { street, city, state, postalCode } = otherDetails.address;

    const newErrors = {};

    if (!street) newErrors.street = 'Street is required';
    if (!city) newErrors.city = 'City is required';
    if (!state) newErrors.state = 'State is required';
    if (!postalCode) newErrors.postalCode = 'Pin Code is required';

    // Checking error for other user details
    if (basicDetails.type === 'user') {
      if (!otherDetails.gender) newErrors.gender = 'Gender is required';
      if (!otherDetails.dob) newErrors.dob = 'DOB is required';
    }

    if (basicDetails.type === 'hospital') {
      if (isEmpty(otherDetails.department)) {
        newErrors.department = 'Departments is required';
      }
      if (isEmpty(otherDetails.availableServices))
        newErrors.availableServices = 'At least one service is required';
    }
    return newErrors;
  };

  const handleContinue = () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors((prev) => ({
        ...prev,
        frontend: validationErrors,
      }));
      return;
    }
    nextStep();
  };

  return (
    <form
      className={`auth-form ${dark === 'dark' ? 'bg-gray-900 text-yellow-400' : 'bg-white text-gray-700'}`}
    >
      <h5>Address</h5>
      <hr />
      <div className="form-section">
        <label
          htmlFor="street"
          className={`auth-form ${
            dark === 'dark'
              ? 'bg-gray-900 text-yellow-400'
              : 'bg-white text-gray-700'
          }`}
          style={{ display: 'inline' }}
        >
          Street: <span style={{ color: 'red' }}>*</span>
        </label>
        <input
          id="street"
          type="text"
          name="street"
          placeholder="Enter street details"
          value={street}
          onChange={handleChange}
          required
          className={`${dark === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-700'}`}
        />
        {errors.frontend.street && (
          <span className="error">{errors.frontend.street}</span>
        )}
        {errors.backend.street && (
          <span className="error">{errors.backend.street}</span>
        )}
      </div>
      <div className="form-section">
        <label
          htmlFor="city"
          className={`auth-form ${
            dark === 'dark'
              ? 'bg-gray-900 text-yellow-400'
              : 'bg-white text-gray-700'
          }`}
          style={{ display: 'inline' }}
        >
          City: <span style={{ color: 'red' }}>*</span>
        </label>
        <input
          id="city"
          type="text"
          name="city"
          placeholder="Enter your city"
          value={city}
          onChange={handleChange}
          required
          className={`${dark === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-700'}`}
        />
        {errors.frontend.city && (
          <span className="error">{errors.frontend.city}</span>
        )}
        {errors.backend.city && (
          <span className="error">{errors.backend.city}</span>
        )}
      </div>

      <div className="form-section">
        <label
          htmlFor="state"
          className={`auth-form ${
            dark === 'dark'
              ? 'bg-gray-900 text-yellow-400'
              : 'bg-white text-gray-700'
          }`}
          style={{ display: 'inline' }}
        >
          State: <span style={{ color: 'red' }}>*</span>
        </label>
        <input
          id="state"
          type="text"
          name="state"
          placeholder="Enter your state"
          value={state}
          onChange={handleChange}
          required
          className={`${dark === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-700'}`}
        />
        {errors.frontend.state && (
          <span className="error">{errors.frontend.state}</span>
        )}
        {errors.backend.state && (
          <span className="error">{errors.backend.state}</span>
        )}
      </div>
      <div className="form-section">
        <label
          htmlFor="postalCode"
          className={`auth-form ${
            dark === 'dark'
              ? 'bg-gray-900 text-yellow-400'
              : 'bg-white text-gray-700'
          }`}
          style={{ display: 'inline' }}
        >
          Pin Code: <span style={{ color: 'red' }}>*</span>
        </label>
        <input
          id="postalCode"
          type="text"
          name="postalCode"
          placeholder="Enter Pin code"
          value={postalCode}
          onChange={handleChange}
          required
          className={`${dark === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-700'}`}
        />
        {errors.frontend.postalCode && (
          <span className="error">{errors.frontend.postalCode}</span>
        )}
        {errors.backend.postalCode && (
          <span className="error">{errors.backend.postalCode}</span>
        )}
      </div>
      {basicDetails.type === 'hospital' && (
        <>
          <h5>Other Info</h5>
          <hr />
          <div className="form-section">
            <label
              htmlFor="department"
              className={`auth-form ${
                dark === 'dark'
                  ? 'bg-gray-900 text-yellow-400'
                  : 'bg-white text-gray-700'
              }`}
              style={{ display: 'inline' }}
            >
              Department: <span style={{ color: 'red' }}>*</span>
            </label>
            <select
              id="department"
              name="department"
              value={otherDetails.department}
              onChange={handleChange}
              required
              className={`auth-form ${
                dark === 'dark'
                  ? 'bg-gray-900 text-yellow-400'
                  : 'bg-white text-gray-700'
              }`}
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
            {errors.frontend.department && (
              <span className="error">{errors.frontend.department}</span>
            )}
            {errors.backend.department && (
              <span className="error">{errors.backend.department}</span>
            )}
          </div>
          <div className="form-section">
            <label
              htmlFor="availableServices"
              className={`auth-form ${
                dark === 'dark'
                  ? 'bg-gray-900 text-yellow-400'
                  : 'bg-white text-gray-700'
              }`}
              style={{ display: 'inline' }}
            >
              Available Services: <span style={{ color: 'red' }}>*</span>
            </label>
            <input
              id="availableServices"
              type="text"
              name="availableServices"
              placeholder="OPD, Cancer Treatment, etc.. "
              value={otherDetails.availableServices}
              onChange={handleCommaSeparatedValues}
              className={`${dark === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-700'}`}
            />
            {errors.frontend.availableServices && (
              <span className="error">{errors.frontend.availableServices}</span>
            )}
            {errors.backend.availableServices && (
              <span className="error">{errors.backend.availableServices}</span>
            )}
          </div>
        </>
      )}
      {basicDetails.type === 'user' && (
        <>
          <h5>Other Info</h5>
          <hr />
          <div className="form-section">
            <label
              htmlFor="dob"
              className={`auth-form ${
                dark === 'dark'
                  ? 'bg-gray-900 text-yellow-400'
                  : 'bg-white text-gray-700'
              }`}
              style={{ display: 'inline' }}
            >
              DOB: <span style={{ color: 'red' }}>*</span>
            </label>
            <input
              id="dob"
              type="date"
              name="dob"
              placeholder="DD/MM/YYYY"
              required
              value={otherDetails.dob}
              onChange={handleChange}
              className={`${dark === 'dark' ? 'bg-gray-800 text-yellow-400' : 'bg-white text-gray-700'}`}
            />
            {errors.frontend.dob && (
              <span className="error">{errors.frontend.dob}</span>
            )}
            {errors.backend.dob && (
              <span className="error">{errors.backend.dob}</span>
            )}
          </div>
          <div className="form-section">
            <label
              htmlFor="gender"
              className={`auth-form ${
                dark === 'dark'
                  ? 'bg-gray-900 text-yellow-400'
                  : 'bg-white text-gray-700'
              }`}
              style={{ display: 'inline' }}
            >
              Gender: <span style={{ color: 'red' }}>*</span>
            </label>
            <select
              id="gender"
              name="gender"
              value={otherDetails.gender}
              onChange={handleChange}
              required
              className={`${dark === 'dark' ? 'bg-gray-800 text-yellow-400' : 'bg-white text-gray-700'}`}
            >
              <option value="" disabled>
                Select Gender
              </option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            {errors.frontend.gender && (
              <span className="error">{errors.frontend.gender}</span>
            )}
            {errors.backend.gender && (
              <span className="error">{errors.backend.gender}</span>
            )}
          </div>
        </>
      )}
      <div style={btnDivStyle}>
        <button
          type="button"
          onClick={prevStep}
          className={`btn btn-secondary ${dark === 'dark' ? 'bg-gray-800 text-yellow-400' : 'bg-white text-gray-700'}`}
        >
          Back
        </button>
        <button
          type="button"
          onClick={handleContinue}
          className={`btn btn-primary ${dark === 'dark' ? 'bg-gray-800 text-yellow-400' : 'bg-white text-gray-700'}`}
        >
          Continue
        </button>
      </div>
    </form>
  );
}

export default StepTwo;
