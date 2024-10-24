'use client';

import React, { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import cbcImage from '../assets/cbc.png';
import lipidProfileImage from '../assets/lipid-profile.png';
import bloodGlucoseImage from '../assets/bloodglucose.png';
import thyroidImage from '../assets/thyroid.png';
import hemoglobinImage from '../assets/Hemoglobin.png';
import urineTestImage from '../assets/urinetest.png';
import sodiumImage from '../assets/sodium.png';
import hepatitisBImage from '../assets/hepatitis-B.png';
import potassiumImage from '../assets/potassium.png';
import raImage from '../assets/ra.png';
import ecgImage from '../assets/ecg.png';
import usgImage from '../assets/usg.png';
import Navbar from '../components/Navbar';
import { mode } from '../store/atom'; // Importing the atom for mode
import Footer from '../components/Footer';
import { Rating } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const LabTestMedipedia = () => {
  const [currentItem, setCurrentItem] = useState(3);
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dark = useRecoilValue(mode); // Using Recoil state for dark mode

  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      setIsVisible(true);
    }, 100);
  }, []);

  const tests = [
    {
      id: 1,
      imgSrc: cbcImage,
      title: 'Complete Blood Count (CBC)',
      reportTime: '2-days',
      cost: '$25',
      rating: 4,
      testType: 'Blood Test',
      description:
        'A Complete Blood Count (CBC) is a common blood test that measures the levels of different types of cells in your blood. This test Measures count of red blood cells, white blood cells, hemoglobin, hematocrit, and platelets.',
    },
    {
      id: 2,
      imgSrc: lipidProfileImage,
      title: 'Lipid Profile',
      reportTime: '3-days',
      cost: '$35',
      rating: 3,
      testType: 'Blood Test',
      description:
        'A Lipid Profile measures the levels of cholesterol and triglycerides in your blood. It includes total cholesterol, HDL (good cholesterol), LDL (bad cholesterol), and triglycerides. This test helps assess your risk of developing cardiovascular disease.',
    },
    {
      id: 3,
      imgSrc: bloodGlucoseImage,
      title: 'Blood Glucose Test',
      reportTime: '1-day',
      cost: '$20',
      rating: 5,
      testType: 'Blood Test',
      description:
        'The Blood Glucose Test measures the level of glucose (sugar) in your blood. It is vital for diagnosing and managing diabetes or prediabetes. Regular monitoring of blood glucose levels can prevent severe complications from diabetes.',
    },
    {
      id: 4,
      imgSrc: thyroidImage,
      title: 'Thyroid Test',
      reportTime: '2-days',
      cost: '$30',
      rating: 5,
      testType: 'Blood Test',
      description:
        'The Thyroid Test checks your thyroid function by measuring levels of T3, T4, and TSH hormones in your blood. This test can detect conditions such as hyperthyroidism or hypothyroidism.',
    },
    {
      id: 5,
      imgSrc: hemoglobinImage,
      title: 'Hemoglobin Blood Test',
      reportTime: '2-days',
      cost: '$18',
      rating: 4,
      testType: 'Blood Test',
      description:
        'The Hemoglobin Test measures the amount of hemoglobin, a protein in red blood cells that carries oxygen to tissues. It is often used to diagnose anemia and assess the overall health of your red blood cells.',
    },
    {
      id: 6,
      imgSrc: urineTestImage,
      title: 'Urine Test',
      reportTime: '3-days',
      cost: '$15',
      rating: 3,
      testType: 'Urine Test',
      description:
        'A Urine Test analyzes various components of your urine, such as glucose, proteins, and ketones, to detect abnormalities that may indicate conditions like kidney disease, diabetes, or urinary tract infections.',
    },
    {
      id: 7,
      imgSrc: sodiumImage,
      title: 'Sodium Test',
      reportTime: '1-day',
      cost: '$22',
      rating: 3,
      testType: 'Blood Test',
      description:
        'The Sodium Test measures the sodium level in your blood, which is crucial for maintaining fluid balance, nerve function, and muscle activity. Abnormal levels can indicate dehydration or kidney problems.',
    },
    {
      id: 8,
      imgSrc: hepatitisBImage,
      title: 'Hepatitis-B Test',
      reportTime: '2-days',
      cost: '$40',
      rating: 5,
      testType: 'Blood Test',
      description:
        'The Hepatitis B Test detects the presence of Hepatitis B virus (HBV) in the blood. This test is important for diagnosing acute or chronic Hepatitis B infections, which can lead to liver damage.',
    },
    {
      id: 9,
      imgSrc: potassiumImage,
      title: 'Potassium Test',
      reportTime: '2-days',
      cost: '$25',
      rating: 4,
      testType: 'Blood Test',
      description:
        'The Potassium Test measures the potassium level in your blood, which is essential for heart function and muscle contraction. Abnormal levels can cause irregular heartbeats or muscle weakness.',
    },
    {
      id: 10,
      imgSrc: raImage,
      title: 'Rheumatoid Arthritis (RA) Test',
      reportTime: '2-days',
      cost: '$45',
      rating: 4,
      testType: 'Blood Test',
      description:
        'The Rheumatoid Arthritis Test detects rheumatoid factor (RF) or anti-cyclic citrullinated peptide (anti-CCP) antibodies in the blood. Rheumatoid arthritis is a long-term autoimmune disease that causes inflammation of joints and tissues.',
    },
    {
      id: 11,
      imgSrc: ecgImage,
      title: 'Electrocardiogram (ECG)',
      reportTime: '2-days',
      cost: '$50',
      rating: 5,
      testType: 'Non-invasive',
      description:
        "An Electrocardiogram (ECG) records the electrical activity of the heart over time. It is one of the first heart tests you 'll have. It helps detect arrhythmias, heart attacks, and other heart conditions. ECG results can help diagnose an unusually fast heart rate, called tachycardia, or an unusually slow heart rate,",
    },
    {
      id: 12,
      imgSrc: usgImage,
      title: 'Ultrasonography (USG)',
      reportTime: '2-days',
      cost: '$60',
      rating: 3,
      testType: 'Imaging',
      description:
        'Ultrasonography (USG) uses high-frequency sound waves to create images of internal organs, muscles, and other soft tissues. It is commonly used for diagnosing a wide range of medical conditions, including those affecting the abdomen, pelvis, and heart.',
    },
  ];

  const loadMore = () => {
    if (currentItem < tests.length) {
      setIsLoading(true);
    }
    setTimeout(() => {
      setCurrentItem(currentItem + 3);
      setIsLoading(false);
    }, 300);
  };

  return (
    <>
      <Navbar />
      <div
        className={`container mx-auto text-center py-4 px-4 transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}
          ${dark === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-700'}
        `}
      >
        <h1
          className={`text-4xl mb-8 mt-5 ${dark === 'dark' ? 'text-yellow-400' : 'text-gray-700'}`}
        >
          Get your health-checkup & tests done in our lab
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {tests.slice(0, currentItem).map((test, index) => (
            <div
              key={test.id}
              className={`p-4 rounded-lg shadow-lg transition-opacity duration-1000 ${dark === 'dark' ? 'bg-gray-800' : 'bg-white'}
                ${isLoading && index >= currentItem - 3 ? 'opacity-0' : 'opacity-100'}`}
            >
              <div className="overflow-hidden h-80 rounded-lg mb-5">
                <img
                  src={test.imgSrc}
                  alt={test.title}
                  className="w-full h-full object-cover transition-transform transform hover:scale-110 duration-300"
                />
              </div>
              <div className="content">
                <h3
                  className={`text-xl ${dark === 'dark' ? 'text-yellow-400' : 'text-gray-700'}`}
                >
                  {test.title}
                </h3>
                <p
                  className={`text-sm py-4 ${dark === 'dark' ? 'text-gray-300' : 'text-gray-500'}`}
                >
                  {test.description}
                </p>

                <div className="flex justify-between items-center">
                  <p>{test.cost}</p>
                  <p>{test.reportTime}</p>
                </div>
                <div className="flex justify-between items-center mt-3 pt-2 border-t border-gray-700">
                  {/* <span
                    className={`text-sm ${dark === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}
                  >
                    <i className="fas fa-calendar text-blue-600 pr-2"></i> get
                    report within {test.reportTime}
                  </span> */}
                  <span
                    className={`text-sm ${dark === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}
                  >
                    <Rating
                      name="read-only"
                      value={test.rating}
                      sx={{
                        '& .MuiRating-iconFilled': { color: '#FFD700' },
                        '& .MuiRating-iconEmpty': { color: '#FFD700' },
                      }}
                    />
                  </span>
                  <span
                    className={`text-sm ${dark === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}
                  >
                    <i className="fas fa-user text-blue-600 pr-2"></i> by
                    Med-Space
                  </span>
                </div>
                <button
                  onClick={() => navigate('/hospitals-around')}
                  className={`inline-block px-6 py-2 border ${dark === 'dark' ? 'border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-gray-900' : 'border-gray-700 mt-3 pt-2 text-gray-700 hover:bg-blue-600 hover:text-white'} transition-all duration-300 text-base rounded-[5px]`}
                >
                  Read more
                </button>
              </div>
            </div>
          ))}
        </div>

        {currentItem < tests.length && (
          <button
            className={`inline-block mt-8 px-8 py-4 border ${dark === 'dark' ? 'border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-gray-900' : 'border-gray-700 text-gray-700  hover:bg-blue-600 hover:text-white'} cursor-pointer rounded-[5px] transition-all duration-300 text-base`}
            onClick={loadMore}
          >
            Load more
          </button>
        )}
      </div>
      <Footer />
    </>
  );
};

export default LabTestMedipedia;
