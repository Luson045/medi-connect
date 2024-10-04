
import React from "react";
import { Link } from "react-router-dom";
import "../../styles/Home.css";
import Navbar from "../common/Navbar";
import StaticLineChart from "./Chart";
import "../../styles/Landing.css";
import { Cards } from "./Cards";
import AOS from "aos";
import Review from "./Review";
import "aos/dist/aos.css";
import d1 from "../../assets/images/d1.jpg";
import d2 from "../../assets/images/d2.jpg";
import d3 from "../../assets/images/d3.jpg";


AOS.init({
  duration: 2000,
});

function Home() {
  let detailsOne =
    "Quickly and easily register for your OPD appointment with just a few simple steps. Save time by avoiding long waits and secure your preferred time slot hassle-free. Whether you're booking for yourself or a loved one, our streamlined process ensures a smooth and efficient experience.";
  let detailsTwo =
    "Stay updated on the latest data regarding hospital equipment to ensure you have access to the most current information. With real-time details on available devices, you can easily stay informed and fully prepared for your healthcare needs.";
  let detailsThree =
    "We are here to assist you at any time of the day, ensuring you receive the support you need whenever it’s convenient for you. Our dedicated team is available around the clock to address your questions, concerns, or requirements, providing prompt and reliable assistance.";

  return (
    <>
      <Navbar />
      <div className="home-page">
        <section className="w-full h-auto hero-box">
          <div className='flex flex-col height:100dvh p-20'>
            <h1 className='text-[2.5rem] sm:text-[3rem] md:text-[4rem] font-bold text-white'>Online OPD Registration</h1>
            <p className='text-[1rem] sm:text-[1.5rem] md:text-[2rem] text-white italic'>Skip the queue and get the care you need faster.</p>
            <div className='flex flex-col sm:flex-row gap-4 justify-center md:justify-start'>
              <button className='btn p-2 w-full sm:w-[13rem] text-[1.1rem] mt-6 bg-custom-blue text-white hover:bg-white hover:text-custom-blue cursor-pointer rounded-full z-10  py-3 px-6' data-aos="fade-up"><Link to="/registerOPD">Instant OPD</Link></button>
              <button className='btn p-2 w-full sm:w-[13rem] text-[1.1rem] mt-6 bg-custom-blue text-white hover:bg-white hover:text-custom-blue cursor-pointer rounded-full z-10  py-3 px-6' data-aos="fade-up"><Link to="/register">Explore</Link></button>
            </div>
          </div>
        </section>

        <section className="mt-20">
          <div className="flex flex-col justify-center items-center">
          <h1 className="text-center text-[2.5rem] sm:text-[3rem] md:text-[4rem]  text-custom-blue font-medium">
            Our Services
          </h1>
          <p className="text-[16px] font-normal m-4">Asperiores sunt consectetur impedit nulla molestiae delectus repellat laborum dolores doloremque accusantium</p>
          </div>
          <div className="flex flex-wrap m-4">
            <Cards Title={"Easy Registration"} Details={detailsOne} Image={d1}></Cards>
            <Cards
              Title={"Medical Resource Data Sharing"}
              Details={detailsTwo}
              Image={d2}
            ></Cards>
            <Cards Title={"24/7 Support"} Details={detailsThree} Image={d3}></Cards>
          </div>
        </section>

        <section className="mt-20">
          <h2 className="text-center text-[2.5rem] sm:text-[3rem] md:text-[4rem] font-bold text-custom-blue">
            Research and Data
          </h2>
          <div className="flex flex-col lg:flex-col justify-between items-center mt-10 gap-10">
            <img
              data-aos="fade-up"
              className="h-[200px] md:h-[350px] w-full object-contain"
              src="data1.jpg"
              alt="Data Image 1"
            />
            <div className="w-full lg:w-1/2" data-aos="fade-up">
              <StaticLineChart />
            </div>
          </div>
          <div className="flex flex-wrap justify-center gap-8 mt-10">
            <center>
              <img
                className="data h-[200px] md:h-[250px] object-cover"
                src="data2.png"
                alt="Data Image 2"
              />
            </center>
            <center>
              <img
                className="data h-[200px] md:h-[250px] object-cover"
                src="data3.png"
                alt="Data Image 3"
              />
            </center>
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
