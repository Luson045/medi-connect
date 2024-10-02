import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FaStar } from 'react-icons/fa';
import { Avatar } from 'flowbite-react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import profilePic from '../../assets/profile.jpg';
import profilePic2 from '../../assets/profile2.jpg';

function Review() {
    return (
        <div className='my-2 px-4 lg:px-24'>
            <h2 className='text-5xl font-bold text-center mb-10 leading-snug text-pink-500'>
                What Our Patients Say
            </h2>
            <Swiper
                slidesPerView={1}
                spaceBetween={30}
                pagination={{ clickable: true }}
                breakpoints={{
                    640: { slidesPerView: 1, spaceBetween: 20 },
                    768: { slidesPerView: 2, spaceBetween: 40 },
                    1024: { slidesPerView: 3, spaceBetween: 50 },
                }}
                modules={[Pagination]}
                className="mySwiper"
            >
                <SwiperSlide className='shadow-2xl bg-white py-8 px-4 md:m-5 rounded-lg border'>
                    <Testimonial
                        name="John Doe"
                        role="Worker"
                        review="The online registration process was so easy and convenient. I didn't have to wait in line at all!"
                        imgSrc={profilePic}
                        place="Indore, India"
                        date="25/07/2024"
                    />
                </SwiperSlide>

                <SwiperSlide className='shadow-2xl bg-white py-8 px-4 md:m-5 rounded-lg border'>
                    <Testimonial
                        name="Thor"
                        role="Customer"
                        review="I was very impressed with the online registration system. It made everything smooth and fast."
                        imgSrc={profilePic2}
                        place="Bhopal, India"
                        date="05/07/2024"
                    />
                </SwiperSlide>

                <SwiperSlide className='shadow-2xl bg-white py-8 px-4 md:m-5 rounded-lg border'>
                    <Testimonial
                        name="Spiderman"
                        role="Trainee"
                        review="The staff was really friendly and the process was efficient. Highly recommend!"
                        imgSrc={profilePic}
                        place="Mumbai, India"
                        date="19/09/2024"
                    />
                </SwiperSlide>

                <SwiperSlide className='shadow-2xl bg-white py-8 px-4 md:m-5 rounded-lg border'>
                    <Testimonial
                        name="Iron Man"
                        role="Customer"
                        review="Top-notch service! The registration system was intuitive and saved me a lot of time."
                        imgSrc={profilePic2}
                        place="Indore, India"
                        date="15/08/2024"
                    />
                </SwiperSlide>


                {/* Add more SwiperSlides as needed */}
            </Swiper>
        </div>
    );
}

function Testimonial({ name, role, review, imgSrc, place, date }) {
    return (
        <div className='space-y-6'>
            <div className='text-amber-500 flex gap-2'>
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
            </div>

            <div className='mt-7'>
                <p className='mb-5'>{review}</p>
                <Avatar img={imgSrc} alt={`avatar of ${name}`} rounded className='w-10 mb-4' />
                <h5 className='text-lg font-medium'>{name}</h5>
                <p className='text-base'>{place}</p>
                <span >{role}</span> <span>| {date}</span>
            </div>
        </div>
    );
}

export default Review;
