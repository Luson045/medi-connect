import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/Home.css';
import Navbar from '../common/Navbar';
import StaticLineChart from './Chart';
import "../../styles/Landing.css"
import { Cards } from './Cards';
import AOS from 'aos';
import Review from './Review';
import 'aos/dist/aos.css';
AOS.init({
  duration: 2000,
});



function Home() {

  let detailsOne = "Quickly and easily register for your OPD appointment with just a few simple steps. Save time by avoiding long waits and secure your preferred time slot hassle-free. Whether you're booking for yourself or a loved one, our streamlined process ensures a smooth and efficient experience."
  let detailsTwo = "Stay updated on the latest data regarding hospital equipment to ensure you have access to the most current information. With real-time details on available devices, you can easily stay informed and fully prepared for your healthcare needs."
  let detailsThree = "We are here to assist you at any time of the day, ensuring you receive the support you need whenever it’s convenient for you. Our dedicated team is available around the clock to address your questions, concerns, or requirements, providing prompt and reliable assistance."

  return (
    <>
      <Navbar />
      <div className="home-page">


        <section className="w-full h-auto md:h-[40rem] navbar-glow">
          <div className='flex flex-col p-6 md:p-[10rem] text-center md:text-left'>
            <h1 className='text-[2.5rem] sm:text-[3rem] md:text-[4rem] font-extrabold text-violet-500 z-20' data-aos="fade-up">Online OPD Registration</h1>
            <p className='text-[1.2rem] sm:text-[1.5rem] md:text-[2rem] text-pink-600' data-aos="fade-up">Skip the queue and get the care you need faster.</p>
            <div className='flex flex-col sm:flex-row gap-4 justify-center md:justify-start'>
              <button className='btn p-2 w-full sm:w-[13rem] text-[1.1rem] mt-6 hover:bg-slate-800 cursor-pointer z-10' data-aos="fade-up"><Link to="/registerOPD">Instant OPD</Link></button>
              <button className='btn p-2 w-full sm:w-[13rem] text-[1.1rem] mt-6 bg-pink-600 hover:bg-green-600 cursor-pointer z-10' data-aos="fade-up"><Link to="/register">Explore</Link></button>
            </div>
          </div>
        </section>


        <section className="mt-20">
          <h1 className='text-center text-[2.5rem] sm:text-[3rem] md:text-[4rem] font-bold text-pink-500'>Our Services</h1>

          <div className='flex flex-col md:flex-row flex-wrap items-center justify-center gap-8 mt-10'>
            <Cards Title={"Easy Registration"} Details={detailsOne}></Cards>
            <Cards Title={"Medical Resource Data Sharing"} Details={detailsTwo}></Cards>
            <Cards Title={"24/7 Support"} Details={detailsThree}></Cards>
          </div>
        </section>


        <section className="mt-20">
          <h2 className='text-center text-[2.5rem] sm:text-[3rem] md:text-[4rem] font-bold text-pink-500'>Research and Data</h2>
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
    </>
  );
}

export default Home;
