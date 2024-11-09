import React, { useState } from 'react';
import { Steps, message } from 'antd';
import StepOne from './StepOne';
import { Provider } from '../store/RegistrationContext';
import StepTwo from './StepTwo';
import '../styles/Login.css';
import ReviewDetails from './ReviewDetails';
import { useRecoilValue } from 'recoil'; // Import Recoil for dark mode state
import { mode } from '../store/atom'; // Import the dark mode atom

const { Step } = Steps;

const mainStyle = {
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
};

const basicDetailsInitial = {
  type: 'hospital',
  name: '',
  phone: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const otherDetailsInitial = {
  address: {
    street: '',
    city: '',
    state: '',
    postalCode: '',
  },
  gender: '',
  dob: '',
  medicalHistory: [],
  website: '',
  department: [],
  availableServices: [],
};

const validateOtherDetails = (details, userType) => {
  let missingFields = [];

  // Check address fields
  if (!details.address.street) missingFields.push('Street');
  if (!details.address.city) missingFields.push('City');
  if (!details.address.state) missingFields.push('State');
  if (!details.address.postalCode) missingFields.push('Postal Code');

  // User type-specific checks
  if (userType === 'user') {
    if (!details.gender) missingFields.push('Gender');
    if (!details.dob) missingFields.push('Date of Birth');
  } else if (userType === 'hospital') {
    if (details.department.length === 0) missingFields.push('Department');
    if (details.availableServices.length === 0)
      missingFields.push('Available Services');
  }
  console.log(missingFields);

  // If any fields are missing, alert the user
  return missingFields.length > 0;
};

const stepToShow = (step) => {
  switch (step) {
    case 0:
      return <StepOne />;
    case 1:
      return <StepTwo />;
    case 2:
      return <ReviewDetails />;
    default:
      return null;
  }
};

function MultiStepRegistration() {
  const [basicDetails, setBasicDetails] = useState(basicDetailsInitial);
  const [otherDetails, setOtherDetails] = useState(otherDetailsInitial);
  const [currentStep, setCurrentStep] = useState(0);
  const [stepStatus, setStepStatus] = useState({
    0: 'process',
    1: 'wait',
    2: 'wait',
  });

  const dark = useRecoilValue(mode); // Access the dark mode state

  const nextStep = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const handleNextStepValidation = (value) => {
    console.log(value, 'val');
    if (value > currentStep) {
      switch (currentStep) {
        case 0:
          console.log('In step 1', stepStatus, value, currentStep);

          if (Object.values(basicDetails).every((val) => val !== '')) {
            setStepStatus((prev) => ({
              ...prev,
              [currentStep]: 'finish',
              [value]: 'process',
            }));
            nextStep();
          } else {
            message.warning('Please fill all required  basic datails.', 2);
          }

          break;
        case 1:
          console.log('In step 2', stepStatus, value, currentStep);
          if (!validateOtherDetails(otherDetails, basicDetails.type)) {
            setStepStatus((prev) => ({
              ...prev,
              [currentStep]: 'finish',
              [value]: 'process',
            }));
            nextStep();
          } else {
            message.warning('Please fill all required  datails.', 2);
          }
          break;
        default:
          break;
      }
    } else {
      setCurrentStep(value);
    }
  };

  return (
    <Provider
      value={{
        basicDetails,
        setBasicDetails,
        otherDetails,
        setOtherDetails,
        nextStep,
        prevStep,
      }}
    >
      <div
        className={`steps-container ${dark === 'dark'
          ? 'bg-gray-900 text-purple-400'
          : 'bg-gray-200 text-gray-900'} transition-colors duration-300 p-4 rounded-lg`}
      >
        <Steps current={currentStep} onChange={handleNextStepValidation}>
          <Step
            title={
              <span
                className={
                  dark === 'dark'
          ? ' font-bold text-purple-400'
          : ' font-bold text-gray-900'
                }
              >
                Basic details
              </span>
            }
            status={stepStatus[0]}
          />
          <Step
            title={
              <span
                className={
                  dark === 'dark'
          ? ' font-bold text-purple-400'
          : ' font-bold text-gray-900'
                }
              >
                Other details
              </span>
            }
            status={stepStatus[1]}
          />
          <Step
            title={
              <span
                className={
                  dark === 'dark'
          ? ' font-bold text-purple-400'
          : ' font-bold text-gray-900'
                }
              >
                Review and Register
              </span>
            }
            status={stepStatus[2]}
          />
        </Steps>

        <main style={mainStyle}>{stepToShow(currentStep)}</main>
      </div>
    </Provider>
  );
}

export default MultiStepRegistration;
