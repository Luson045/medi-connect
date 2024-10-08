import React, { useState } from 'react';
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

const LabTestMedipedia = () => {
   const [currentItem, setCurrentItem] = useState(3);

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
      { id: 12, imgSrc: usgImage, title: 'Ultrasonography (USG)', reportTime: '2-days' }
   ];

   const loadMore = () => {
      setCurrentItem(currentItem + 3);
   };

   return (
      <div className="container mx-auto text-center py-4 px-4">
         <h1 className="text-4xl text-gray-700 mb-8">Get your health-checkup & tests done in our lab</h1>
         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {tests.slice(0, currentItem).map(test => (
               <div className="bg-white p-4 rounded-lg shadow-lg" key={test.id}>
                  <div className="overflow-hidden h-80 rounded-lg mb-5">
                     <img src={test.imgSrc} alt={test.title} className="w-full h-full object-cover transition-transform transform hover:scale-110 duration-300"/>
                  </div>
                  <div className="content">
                     <h3 className="text-xl text-gray-700">{test.title}</h3>
                     <p className="text-sm text-gray-500 py-4">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quod, adipisci!</p>
                     <a href="#" className="inline-block px-6 py-2 border border-gray-700 text-gray-700 hover:bg-blue-600 hover:border-blue-600 hover:text-white transition-all duration-300 text-base">Read more</a>
                     <div className="flex justify-between items-center mt-5 pt-4 border-t border-gray-700">
                        <span className="text-sm text-gray-500"><i className="fas fa-calendar text-blue-600 pr-2"></i> get report within {test.reportTime}</span>
                        <span className="text-sm text-gray-500"><i className="fas fa-user text-blue-600 pr-2"></i> by Medipedia</span>
                     </div>
                  </div>
               </div>
            ))}
         </div>

         {currentItem < tests.length && (
            <div className="inline-block mt-8 px-8 py-4 border border-gray-700 text-gray-700 bg-white cursor-pointer hover:bg-blue-600 hover:border-blue-600 hover:text-white transition-all duration-300 text-base" onClick={loadMore}>
               Load more
            </div>
         )}
      </div>
   );
};

export default LabTestMedipedia;
