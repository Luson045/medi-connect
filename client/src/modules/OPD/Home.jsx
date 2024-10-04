import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/Home.css';
import Navbar from '../common/Navbar';
import StaticLineChart from './Chart';
import "../../styles/Landing.css";
import { Cards } from './Cards';
import AOS from 'aos';
import Review from './Review';
import 'aos/dist/aos.css';
import { Calendar, Clock } from 'lucide-react';

AOS.init({
  duration: 2000,
});

function Home() {
  let detailsOne = "Quickly and easily register for your OPD appointment with just a few simple steps. Save time by avoiding long waits and secure your preferred time slot hassle-free. Whether you're booking for yourself or a loved one, our streamlined process ensures a smooth and efficient experience.";
  let detailsTwo = "Stay updated on the latest data regarding hospital equipment to ensure you have access to the most current information. With real-time details on available devices, you can easily stay informed and fully prepared for your healthcare needs.";
  let detailsThree = "We are here to assist you at any time of the day, ensuring you receive the support you need whenever it’s convenient for you. Our dedicated team is available around the clock to address your questions, concerns, or requirements, providing prompt and reliable assistance.";

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-50"> {/* Apply gradient to this div */}
        <Navbar />
        <div className="home-page">

          <section className="w-full min-h-screen flex items-center justify-center mt-[-60px]">
            <div className="container mx-auto px-6 py-16 flex flex-col md:flex-row items-center justify-between">
              {/* Text Section */}
              <div className="md:w-1/2 mb-12 md:mb-0 text-center md:text-left">
                <h1 className="text-5xl md:text-6xl font-bold text-blue-800 mb-6" data-aos="fade-up">
                  Online OPD Registration
                </h1>
                <p className="text-2xl md:text-3xl text-gray-700 mb-10" data-aos="fade-up">
                  Skip the queue and get the care you need faster.
                </p>
                <div className="flex flex-col sm:flex-row gap-6 justify-center md:justify-start">
                  <Link
                    to="/registerOPD"
                    className="flex items-center justify-center px-8 py-4 text-xl font-semibold rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition duration-300 ease-in-out"
                    data-aos="fade-up"
                  >
                    <Calendar className="mr-2" /> Instant OPD
                  </Link>
                  <Link
                    to="/register"
                    className="flex items-center justify-center px-8 py-4 text-xl font-semibold rounded-lg bg-green-600 text-white hover:bg-green-700 transition duration-300 ease-in-out"
                    data-aos="fade-up"
                  >
                    <Clock className="mr-2" /> Explore Services
                  </Link>
                </div>
              </div>

              {/* Image Section */}
              <div className="md:w-1/2 flex justify-center">
                <img
                  src="doctor.png"
                  alt="Doctor with patient"
                  className="object-cover rounded-2xl w-full max-w-2xl h-auto"
                  data-aos="fade-left"
                />
              </div>
            </div>
          </section>

          <section className="mt-20">
            <h1 className='text-center text-[2.5rem] sm:text-[3rem] md:text-[4rem] font-bold text-blue-800'>Our Services</h1>

            <div className='flex flex-col md:flex-row flex-wrap items-center justify-center gap-8 mt-10'>
              <Cards Title={"Easy Registration"} Details={detailsOne}></Cards>
              <Cards Title={"Medical Resource Data Sharing"} Details={detailsTwo}></Cards>
              <Cards Title={"24/7 Support"} Details={detailsThree}></Cards>
            </div>
          </section>

          <section className="mt-20">
            <h2 className='text-center text-[2.5rem] sm:text-[3rem] md:text-[4rem] font-bold text-blue-800'>Research and Data</h2>
            <div className='flex flex-col lg:flex-col justify-between items-center mt-10 gap-10'>
              <img data-aos="fade-up" className="h-[200px] md:h-[350px] w-full object-contain" src="data1.jpg" alt="Data Image 1" />
              <div className='w-full lg:w-1/2' data-aos="fade-up">
                <StaticLineChart />
              </div>
            </div>
            <div className='flex flex-wrap justify-center gap-8 mt-10'>
              <center><img className="data h-[200px] md:h-[250px] object-cover" src="data2.png" alt="Data Image 2" /></center>
              <center><img className="data h-[200px] md:h-[250px] object-cover" src="data3.png" alt="Data Image 3" /></center>
            </div>
          </section>

          <section className="py-20 mt-20">
            <Review />
          </section>

        </div>
      </div>
    </>
  );
}

export default Home;
