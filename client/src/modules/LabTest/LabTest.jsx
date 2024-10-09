'use client';

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
      { 
         id: 1, 
         imgSrc: cbcImage, 
         title: 'Complete Blood Count (CBC)', 
         reportTime: '2-days', 
         cost: '$25', 
         rating: 4.5, 
         testType: 'Blood Test', 
         description: 'A Complete Blood Count (CBC) is a common blood test that measures the levels of different types of cells in your blood, including red blood cells, white blood cells, hemoglobin, hematocrit, and platelets. This test is essential for diagnosing various conditions like infections, anemia, and other blood disorders.'
      },
      { 
         id: 2, 
         imgSrc: lipidProfileImage, 
         title: 'Lipid Profile', 
         reportTime: '3-days', 
         cost: '$35', 
         rating: 4.7, 
         testType: 'Blood Test', 
         description: 'A Lipid Profile measures the levels of cholesterol and triglycerides in your blood. It includes total cholesterol, HDL (good cholesterol), LDL (bad cholesterol), and triglycerides. This test helps assess your risk of developing cardiovascular disease.'
      },
      { 
         id: 3, 
         imgSrc: bloodGlucoseImage, 
         title: 'Blood Glucose Test', 
         reportTime: '1-day', 
         cost: '$20', 
         rating: 4.6, 
         testType: 'Blood Test', 
         description: 'The Blood Glucose Test measures the level of glucose (sugar) in your blood. It is vital for diagnosing and managing diabetes or prediabetes. Regular monitoring of blood glucose levels can prevent severe complications from diabetes.'
      },
      { 
         id: 4, 
         imgSrc: thyroidImage, 
         title: 'Thyroid Test', 
         reportTime: '2-days', 
         cost: '$30', 
         rating: 4.8, 
         testType: 'Blood Test', 
         description: 'The Thyroid Test checks your thyroid function by measuring levels of T3, T4, and TSH hormones in your blood. Thyroid hormones regulate your metabolism, energy levels, and mood. This test can detect conditions such as hyperthyroidism or hypothyroidism.'
      },
      { 
         id: 5, 
         imgSrc: hemoglobinImage, 
         title: 'Hemoglobin Blood Test', 
         reportTime: '2-days', 
         cost: '$18', 
         rating: 4.4, 
         testType: 'Blood Test', 
         description: 'The Hemoglobin Test measures the amount of hemoglobin, a protein in red blood cells that carries oxygen to tissues. It is often used to diagnose anemia and assess the overall health of your red blood cells.'
      },
      { 
         id: 6, 
         imgSrc: urineTestImage, 
         title: 'Urine Test', 
         reportTime: '3-days', 
         cost: '$15', 
         rating: 4.3, 
         testType: 'Urine Test', 
         description: 'A Urine Test analyzes various components of your urine, such as glucose, proteins, and ketones, to detect abnormalities that may indicate conditions like kidney disease, diabetes, or urinary tract infections.'
      },
      { 
         id: 7, 
         imgSrc: sodiumImage, 
         title: 'Sodium Test', 
         reportTime: '1-day', 
         cost: '$22', 
         rating: 4.5, 
         testType: 'Blood Test', 
         description: 'The Sodium Test measures the sodium level in your blood, which is crucial for maintaining fluid balance, nerve function, and muscle activity. Abnormal levels can indicate dehydration, kidney problems, or adrenal issues.'
      },
      { 
         id: 8, 
         imgSrc: hepatitisBImage, 
         title: 'Hepatitis-B Test', 
         reportTime: '2-days', 
         cost: '$40', 
         rating: 4.7, 
         testType: 'Blood Test', 
         description: 'The Hepatitis B Test detects the presence of Hepatitis B virus (HBV) in the blood. This test is important for diagnosing acute or chronic Hepatitis B infections, which can lead to liver damage.'
      },
      { 
         id: 9, 
         imgSrc: potassiumImage, 
         title: 'Potassium Test', 
         reportTime: '2-days', 
         cost: '$25', 
         rating: 4.4, 
         testType: 'Blood Test', 
         description: 'The Potassium Test measures the potassium level in your blood, which is essential for heart function and muscle contraction. Abnormal levels can cause irregular heartbeats or muscle weakness.'
      },
      { 
         id: 10, 
         imgSrc: raImage, 
         title: 'Rheumatoid Arthritis (RA) Test', 
         reportTime: '2-days', 
         cost: '$45', 
         rating: 4.6, 
         testType: 'Blood Test', 
         description: 'The Rheumatoid Arthritis Test detects rheumatoid factor (RF) or anti-cyclic citrullinated peptide (anti-CCP) antibodies in the blood. These are commonly present in people with rheumatoid arthritis, an autoimmune condition affecting joints.'
      },
      { 
         id: 11, 
         imgSrc: ecgImage, 
         title: 'Electrocardiogram (ECG)', 
         reportTime: '2-days', 
         cost: '$50', 
         rating: 4.8, 
         testType: 'Non-invasive', 
         description: 'An Electrocardiogram (ECG) records the electrical activity of the heart over time. It helps detect arrhythmias, heart attacks, and other heart conditions.'
      },
      { 
         id: 12, 
         imgSrc: usgImage, 
         title: 'Ultrasonography (USG)', 
         reportTime: '2-days', 
         cost: '$60', 
         rating: 4.7, 
         testType: 'Imaging', 
         description: 'Ultrasonography (USG) uses high-frequency sound waves to create images of internal organs, muscles, and other soft tissues. It is commonly used for diagnosing a wide range of medical conditions, including those affecting the abdomen, pelvis, and heart.'
      }
   ];

   const loadMore = () => {
      setCurrentItem(currentItem + 3);
   };

   return (
      <div className="container mx-auto text-center py-4 px-4 bg-lightblue-100">
         <h1 className="text-4xl text-gray-800 mb-8 font-bold">Get your health-checkup & tests done in our lab</h1>
         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {tests.slice(0, currentItem).map(test => (
               <div className="relative bg-white p-6 rounded-xl shadow-xl transition-transform transform hover:scale-105 hover:shadow-2xl hover:bg-blue-50 hover:backdrop-blur-lg hover:border hover:border-blue-300" key={test.id}>
                  <div className="overflow-hidden h-80 rounded-lg mb-4 relative">
                     <img src={test.imgSrc} alt={test.title} className="w-full h-full object-cover transition-transform transform hover:scale-110 duration-500"/>
                     <div className="absolute inset-0 bg-blue-500 opacity-0 hover:opacity-20 transition-opacity duration-300"></div>
                  </div>
                  <div className="content">
                     <h3 className="text-xl font-semibold text-gray-700 mb-2">{test.title}</h3>
                     <p className="text-sm text-gray-600 mb-4 line-clamp-3">{test.description}</p>
                     <p className="text-sm text-gray-600 mb-2"><strong>Cost:</strong> {test.cost}</p>
                     <p className="text-sm text-gray-600 mb-2"><strong>Rating:</strong> {test.rating} / 5</p>
                     <p className="text-sm text-gray-600 mb-4"><strong>Type:</strong> {test.testType}</p>
                     <a href="#" className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300">Read more</a>
                     <div className="flex justify-between items-center mt-5 pt-4 border-t border-gray-300">
                        <span className="text-sm text-gray-500"><i className="fas fa-calendar text-blue-600 pr-2"></i> get report within {test.reportTime}</span>
                        <span className="text-sm text-gray-500"><i className="fas fa-user text-blue-600 pr-2"></i> by Med-Space</span>
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
