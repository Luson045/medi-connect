import React, { useState } from 'react';
import { Steps } from 'antd';
import StepOne from './StepOne';
import { Provider } from './RegistrationContext';
import StepTwo from './StepTwo';
import ReviewDetails from './ReviewDetails';
import { useRecoilValue } from 'recoil'; // Import Recoil for dark mode state
import { mode } from '../../store/atom'; // Import the dark mode atom

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

  const dark = useRecoilValue(mode); // Access the dark mode state

  const nextStep = () => {
    if (currentStep === 2) {
    }
    setCurrentStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setCurrentStep((prev) => prev - 1);
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
        className={`steps-container ${dark === 'dark' ? 'bg-gray-900 text-yellow-400' : 'bg-white text-gray-700'} transition-colors duration-300 p-4 rounded-lg`}
      >
        <Steps
          current={currentStep}
          onChange={(value) => setCurrentStep(value)}
        >
          <Step
            title={
              <span
                className={
                  dark === 'dark'
                    ? 'font-bold text-yellow-400'
                    : 'font-bold text-gray-700'
                }
              >
                Basic details
              </span>
            }
          />
          <Step
            title={
              <span
                className={
                  dark === 'dark'
                    ? 'font-bold text-yellow-400'
                    : 'font-bold text-gray-700'
                }
              >
                Other details
              </span>
            }
          />
          <Step
            title={
              <span
                className={
                  dark === 'dark'
                    ? 'font-bold text-yellow-400'
                    : 'font-bold text-gray-700'
                }
              >
                Review and Register
              </span>
            }
          />
        </Steps>

        <main style={mainStyle}>{stepToShow(currentStep)}</main>
      </div>
    </Provider>
  );
}

export default MultiStepRegistration;
