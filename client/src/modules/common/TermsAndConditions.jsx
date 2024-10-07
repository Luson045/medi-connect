// src/components/TermsAndConditions.js
import React from 'react';

const TermsAndConditions = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center py-10">
      <div className="bg-white rounded-lg shadow-lg p-8 mx-4 md:mx-12 lg:mx-24 xl:mx-48">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">Terms and Conditions</h1>
        
        <p className="mb-6 text-gray-700 leading-relaxed">
          The Medi-Connect (Appointment Booking System) is a comprehensive web-based solution designed to streamline hospital operations by implementing efficient queuing models for Outpatient Departments (OPDs), real-time bed availability tracking, patient admission management, and more.
        </p>

        <div className="bg-blue-50 p-4 rounded-lg mb-6 border border-blue-200">
          <h2 className="text-2xl font-semibold mb-2 text-blue-500">1. Acceptance of Terms</h2>
          <p className="text-gray-700 leading-relaxed">
            By using this service, you agree to comply with these terms and conditions and acknowledge that you have read and understood them. You also acknowledge that failure to adhere to these terms may result in the suspension or termination of your account. It is your responsibility to regularly review these terms, as they may be updated periodically. Continued use of the service following any updates constitutes acceptance of the revised terms. If you do not agree with any part of these terms, you should discontinue using the service immediately.
          </p>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg mb-6 border border-blue-200">
          <h2 className="text-2xl font-semibold mb-2 text-blue-500">2. Service Usage</h2>
          <p className="text-gray-700 leading-relaxed">
            Users must utilize the service responsibly and in accordance with applicable laws and regulations. Any misuse of the platform, including but not limited to unauthorized access, data manipulation, or disruptive behavior, will not be tolerated. Users are expected to respect the rights of others and maintain the integrity of the platform. Failure to comply with legal obligations or responsible usage guidelines may result in legal action, account suspension, or termination of access to the service. It is essential to ensure that all information provided is accurate and used appropriately within the scope of the service's intended purpose.
          </p>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg mb-6 border border-blue-200">
          <h2 className="text-2xl font-semibold mb-2 text-blue-500">3. Changes to Terms</h2>
          <p className="text-gray-700 leading-relaxed">
            We reserve the right to modify these terms at any time. Changes will be communicated through the website, and it is your responsibility to review these terms periodically for any updates. Continued use of the service following the posting of changes constitutes your acceptance of the revised terms. If you do not agree with any changes made to the terms, you must stop using the service immediately. We encourage users to stay informed about our terms and conditions to ensure a clear understanding of their rights and responsibilities while using our platform.
          </p>
        </div>

        {/* Add more content as needed */}
      </div>
    </div>
  );
};

export default TermsAndConditions;
