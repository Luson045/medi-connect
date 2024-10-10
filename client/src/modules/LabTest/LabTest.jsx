import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import cbcImage from '../../assets/cbc.png';
import lipidProfileImage from '../../assets/lipid-profile.png';
import bloodGlucoseImage from '../../assets/bloodglucose.png';
import thyroidImage from '../../assets/thyroid.png';
import hemoglobinImage from '../../assets/Hemoglobin.png';
import urineTestImage from '../../assets/urinetest.png';
import sodiumImage from '../../assets/sodium.png';
import hepatitisBImage from '../../assets/hepatitis-B.png';
import potassiumImage from '../../assets/potassium.png';
import raImage from '../../assets/ra.png';
import ecgImage from '../../assets/ecg.png';
import usgImage from '../../assets/usg.png';
import Navbar from '../common/Navbar';
import { mode } from '../../store/atom'; // Importing the atom for mode

const LabTestMedipedia = () => {
  const [currentItem, setCurrentItem] = useState(3);
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dark = useRecoilValue(mode); // Using Recoil state for dark mode

  useEffect(() => {
    setTimeout(() => {
      setIsVisible(true);
    }, 100);
  }, []);

  const tests = [
    { id: 1, imgSrc: cbcImage, title: 'Complete Blood Count (CBC)', reportTime: '2-days' },
    { id: 2, imgSrc: lipidProfileImage, title: 'Lipid Profile', reportTime: '3-days' },
    { id: 3, imgSrc: bloodGlucoseImage, title: 'Blood Glucose Test', reportTime: '1-day' },
    { id: 4, imgSrc: thyroidImage, title: 'Thyroid Test', reportTime: '2-days' },
    { id: 5, imgSrc: hemoglobinImage, title: 'Haemoglobin Blood Test', reportTime: '2-days' },
    { id: 6, imgSrc: urineTestImage, title: 'Urine Test', reportTime: '3-days' },
    { id: 7, imgSrc: sodiumImage, title: 'Sodium Test', reportTime: '1-day' },
    { id: 8, imgSrc: hepatitisBImage, title: 'Hepatitis-B Test', reportTime: '2-days' },
    { id: 9, imgSrc: potassiumImage, title: 'Potassium Test', reportTime: '2-days' },
    { id: 10, imgSrc: raImage, title: 'Rheumatoid Arthritis (RA) Test', reportTime: '2-days' },
    { id: 11, imgSrc: ecgImage, title: 'Electrocardiogram (ECG)', reportTime: '2-days' },
    { id: 12, imgSrc: usgImage, title: 'Ultrasonography (USG)', reportTime: '2-days' },
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
        <h1 className={`text-4xl mb-8 mt-5 ${dark === 'dark' ? 'text-yellow-400' : 'text-gray-700'}`}>
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
                <h3 className={`text-xl ${dark === 'dark' ? 'text-yellow-400' : 'text-gray-700'}`}>{test.title}</h3>
                <p className={`text-sm py-4 ${dark === 'dark' ? 'text-gray-300' : 'text-gray-500'}`}>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quod, adipisci!
                </p>
                <a
                  href="#"
                  className={`inline-block px-6 py-2 border ${dark === 'dark' ? 'border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-gray-900' : 'border-gray-700 text-gray-700 hover:bg-blue-600 hover:text-white'} transition-all duration-300 text-base rounded-[5px]`}
                >
                  Read more
                </a>
                <div className="flex justify-between items-center mt-5 pt-4 border-t border-gray-700">
                  <span className={`text-sm ${dark === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                    <i className="fas fa-calendar text-blue-600 pr-2"></i> get report within {test.reportTime}
                  </span>
                  <span className={`text-sm ${dark === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                    <i className="fas fa-user text-blue-600 pr-2"></i> by Med-Space
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {currentItem < tests.length && (
          <div
            className={`inline-block mt-8 px-8 py-4 border ${dark === 'dark' ? 'border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-gray-900' : 'border-gray-700 text-gray-700  hover:bg-blue-600 hover:text-white'} cursor-pointer rounded-[5px] transition-all duration-300 text-base`}
            onClick={loadMore}
          >
            Load more
          </div>
        )}
      </div>
    </>
  );
};
export default LabTestMedipedia;
