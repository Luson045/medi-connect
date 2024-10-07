import React, { useState } from 'react';
import { Steps } from 'antd';
import StepOne from './StepOne';
import { Provider } from './RegistrationContext';
import StepTwo from './StepTwo';
import ReviewDetails from './ReviewDetails';

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
  const [basicDetails, setBasicDetials] = useState(basicDetailsInitial);
  const [otherDetails, setOtherDetails] = useState(otherDetailsInitial);
  const [currentStep, setCurrentStep] = useState(0);

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
        setBasicDetials,
        otherDetails,
        setOtherDetails,
        nextStep,
        prevStep,
      }}
    >
      <Steps current={currentStep} onChange={(value) => setCurrentStep(value)}>
        <Step title={'Basic details'} className="font-bold" />
        <Step title={'Other details'} className="font-bold" />
        <Step title={'Review and Register'} className="font-bold" />
      </Steps>
      <main style={mainStyle}>{stepToShow(currentStep)}</main>
    </Provider>
  );
}

export default MultiStepRegistration;
