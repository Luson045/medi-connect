import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

const reviews = [
  {
    id: 1,
    name: "Emily Johnson",
    role: "Patient",
    quote: "Exceptional care and attention.",
    review: "The staff was attentive, and the facilities were top-notch. I couldn't have asked for better care.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&q=80&fm=jpg&crop=faces&fit=crop&w=150&h=150"
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    role: "Doctor",
    quote: "State-of-the-art facilities.",
    review: "As a doctor, I'm impressed by the hospital's commitment to providing the best care possible.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?ixlib=rb-4.0.3&q=80&fm=jpg&crop=faces&fit=crop&w=150&h=150"
  },
  {
    id: 3,
    name: "Sarah Thompson",
    role: "Nurse",
    quote: "Efficient and caring team.",
    review: "Our nursing staff works tirelessly to ensure patient comfort and quick recovery.",
    rating: 4,
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&q=80&fm=jpg&crop=faces&fit=crop&w=150&h=150"
  },
  {
    id: 4,
    name: "David Rodriguez",
    role: "Patient",
    quote: "Speedy recovery thanks to great care.",
    review: "The physical therapy team helped me recover faster than I expected. I'm grateful for their expertise.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?ixlib=rb-4.0.3&q=80&fm=jpg&crop=faces&fit=crop&w=150&h=150"
  },
  {
    id: 5,
    name: "Linda Kim",
    role: "Administrator",
    quote: "Proud of our high standards.",
    review: "Our hospital maintains the highest standards of patient care and safety.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1517363898878-5a15f2384404?ixlib=rb-4.0.3&q=80&fm=jpg&crop=faces&fit=crop&w=150&h=150"
  },
  {
    id: 6,
    name: "Robert Taylor",
    role: "Patient",
    quote: "Felt safe and cared for.",
    review: "The emergency room staff was quick and professional. They put me at ease during a stressful time.",
    rating: 4,
    image: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?ixlib=rb-4.0.3&q=80&fm=jpg&crop=faces&fit=crop&w=150&h=150"
  }
];

const ReviewCard = ({ review }) => (
  <div className="bg-white rounded-lg hover:shadow-xl p-4 flex flex-col justify-between h-full transition-shadow duration-300 transform hover:scale-105 shadow-[0_2px_10px_rgba(0,0,0,0.3)]">
    <div>
      <div className="flex items-center mb-4">
        <img src={review.image} alt={review.name} className="w-16 h-16 rounded-full border-2 border-indigo-600 mr-4 object-cover" />
        <div>
          <h3 className="font-semibold text-lg text-gray-800">{review.name}</h3>
          <p className="text-indigo-600 text-sm">{review.role}</p>
        </div>
      </div>
      <p className="text-xl font-bold mb-2 text-gray-800">"{review.quote}"</p>
      <p className="text-gray-600 mb-4">{review.review}</p>
    </div>
    <div className="flex items-center">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`w-5 h-5 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
        />
      ))}
    </div>
  </div>
);

const Review = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextReview = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length);
  }, []);

  const prevReview = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + reviews.length) % reviews.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(nextReview, 5000);
    return () => clearInterval(timer);
  }, [nextReview]);

  const getReviewIndex = (index) => {
    return (index + reviews.length) % reviews.length;
  };

  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">What Our Community Says</h2>
        <div className="relative">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * (100 / 3)}%)` }}
            >
              {[...Array(reviews.length * 3)].map((_, index) => (
                <div key={index} className="w-full sm:w-1/3 flex-shrink-0 px-4">
                  <ReviewCard review={reviews[getReviewIndex(index)]} />
                </div>
              ))}
            </div>
          </div>
          <button
            onClick={prevReview}
            className="absolute top-1/2 -left-4 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200 hover:shadow-lg"
          >
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </button>
          <button
            onClick={nextReview}
            className="absolute top-1/2 -right-4 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200 hover:shadow-lg"
          >
            <ChevronRight className="w-6 h-6 text-gray-600" />
          </button>
        </div>
        <div className="flex justify-center mt-8">
          {reviews.map((_, index) => (
            <div
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 mx-1 rounded-full cursor-pointer transition-colors duration-200 ${
                index === currentIndex ? 'bg-indigo-600' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Review;
