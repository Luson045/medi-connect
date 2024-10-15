import React, { useState } from 'react';

export default function MediConnectBusinessContactForm() {
  const [step, setStep] = useState(1);
  const [lastName , setLastName] = useState("");
  const [firstName , setFirstName] = useState("");
  const [email , setEmail] = useState("");
  const [phone , setPhone] = useState("");

  const handleContinue = (e) => {

    if(!firstName){
      return;
    }

    if(!email){
      return;
    }

    if(!phone){
      return;
    }

    if(!lastName){
      return;
    }

    e.preventDefault();
    setStep(2);

  };

  return (
    <div className="bg-white shadow-md rounded-lg p-8 max-w-2xl mx-auto mb-5 mt-36">
      <h2 className="text-2xl font-bold mb-2 text-gray-800">Contact Medi-Connect for Business</h2>
      <p className="text-gray-600 mb-6">Interested in our healthcare management solutions? Let's connect!</p>
      
      <form className="space-y-6">
        {step === 1 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                <input type="text" onChange={(e) => {setFirstName(e.target.value)}} id="firstName" name="firstName" required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Medi"
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                <input type="text" onChange={(e) => {setLastName(e.target.value)}} id="lastName" name="lastName" required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Connect"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Business Email</label>
              <input type="email" onChange={(e) => {setEmail(e.target.value)}} id="email" name="email" required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="you@example.com"
              />
            </div>
            
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <input type="tel" onChange={(e) => {setPhone(e.target.value)}} id="phone" name="phone" required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="+91 1234567890"
              />
            </div>

            <button onClick={handleContinue}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-150 ease-in-out"
            >
              Continue
            </button>
          </>
        ) : (
          <>
            <div>
              <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">Company/Organization</label>
              <input type="text" id="company" name="company" required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Healthcare Systems Inc."
              />
            </div>
            
            <div>
              <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
              <input type="text" id="jobTitle" name="jobTitle" required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Chief Medical Officer"
              />
            </div>
            
            <div>
              <label htmlFor="organizationType" className="block text-sm font-medium text-gray-700 mb-1">Organization Type</label>
              <select id="organizationType" name="organizationType" required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select organization type</option>
                <option value="hospital">Hospital</option>
                <option value="clinic">Clinic</option>
                <option value="healthSystem">Health System</option>
                <option value="government">Government Health Department</option>
                <option value="technology">Healthcare Technology Provider</option>
                <option value="other">Other</option>
              </select>
            </div>
            
            <div>
              <span className="block text-sm font-medium text-gray-700 mb-2">Interested Solutions</span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {['OPD Queuing System', 'Bed Availability Tracking', 'Patient Admission Management', 
                  'Inventory Management', 'City-wide Integration', 'Custom Solution'].map((solution) => (
                  <div key={solution} className="flex items-center">
                    <input type="checkbox" id={solution.replace(/\s+/g, '')} name="solutions" value={solution}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor={solution.replace(/\s+/g, '')} className="ml-2 block text-sm text-gray-900">
                      {solution}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Additional Information</label>
              <textarea id="message" name="message" rows="4"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Please provide any specific requirements, questions, or details about your project"
              ></textarea>
            </div>
            
            <div className="flex items-center">
              <input type="checkbox" id="consent" name="consent" required
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="consent" className="ml-2 block text-sm text-gray-900">
                I agree to be contacted about Medi-Connect solutions
              </label>
            </div>
            
            <button type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-150 ease-in-out"
            >
              Submit Inquiry
            </button>
          </>
        )}
      </form>
    </div>
  );
}