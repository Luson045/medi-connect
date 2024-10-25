import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { useMediaQuery } from 'react-responsive';
import { useRecoilValue } from 'recoil';
import { mode } from '../store/atom';

const reviews = [
  {
    id: 1,
    name: 'Emily Johnson',
    role: 'Patient',
    quote: 'Exceptional care and attention.',
    review:
      "The staff was attentive, and the facilities were top-notch. I couldn't have asked for better care.",
    rating: 5,
    image:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&q=80&fm=jpg&crop=faces&fit=crop&w=150&h=150',
  },
  {
    id: 2,
    name: 'Dr. Michael Chen',
    role: 'Doctor',
    quote: 'State-of-the-art facilities.',
    review:
      "As a doctor, I'm impressed by the hospital's commitment to providing the best care possible.",
    rating: 5,
    image:
      'https://images.unsplash.com/photo-1537368910025-700350fe46c7?ixlib=rb-4.0.3&q=80&fm=jpg&crop=faces&fit=crop&w=150&h=150',
  },
  {
    id: 3,
    name: 'Sarah Thompson',
    role: 'Nurse',
    quote: 'Efficient and caring team.',
    review:
      'Our nursing staff works tirelessly to ensure patient comfort and quick recovery.',
    rating: 4,
    image:
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&q=80&fm=jpg&crop=faces&fit=crop&w=150&h=150',
  },
  {
    id: 4,
    name: 'David Rodriguez',
    role: 'Patient',
    quote: 'Speedy recovery thanks to great care.',
    review:
      "The physical therapy team helped me recover faster than I expected. I'm grateful for their expertise.",
    rating: 5,
    image:
      'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?ixlib=rb-4.0.3&q=80&fm=jpg&crop=faces&fit=crop&w=150&h=150',
  },
  {
    id: 5,
    name: 'Linda Kim',
    role: 'Administrator',
    quote: 'Proud of our high standards.',
    review:
      'Our hospital maintains the highest standards of patient care and safety.',
    rating: 5,
    image:
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=2864&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 6,
    name: 'Robert Taylor',
    role: 'Patient',
    quote: 'Felt safe and cared for.',
    review:
      'The emergency room staff was quick and professional. They put me at ease during a stressful time.',
    rating: 4,
    image:
      'https://images.unsplash.com/photo-1527980965255-d3b416303d12?ixlib=rb-4.0.3&q=80&fm=jpg&crop=faces&fit=crop&w=150&h=150',
  },
];

// Duplicate the first and last reviews for infinite scroll effect
const infiniteReviews = [reviews[reviews.length - 1], ...reviews, reviews[0]];

const ReviewCard = ({ review, dark }) => (
  <div
    className={`rounded-lg hover:shadow-xl p-4 flex flex-col justify-between h-full transition-shadow duration-300 transform hover:scale-105 shadow-[0_2px_10px_rgba(0,0,0,0.3)] ${dark === 'dark' ? 'bg-gray-800' : 'bg-white'}`}
  >
    <div>
      <div className="flex items-center mb-4">
        <img
          src={review.image}
          alt={review.name}
          className="w-16 h-16 rounded-full border-2 mr-4 object-cover"
        />
        <div>
          <h3 className={`font-semibold text-lg ${dark === 'dark' ? 'text-gray-300' : 'text-gray-800'}`}>
            {review.name}
          </h3>
          <p className={`text-sm ${dark === 'dark' ? 'text-yellow-400' : 'text-blue-500'}`}>
            {review.role}
          </p>
        </div>
      </div>
      <p className={`text-xl font-bold mb-2 ${dark === 'dark' ? 'text-gray-300' : 'text-gray-800'}`}>
        "{review.quote}"
      </p>
      <p className={`mb-4 ${dark === 'dark' ? 'text-gray-200' : 'text-gray-600'}`}>{review.review}</p>
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
  const [currentIndex, setCurrentIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const isSmallScreen = useMediaQuery({ query: '(max-width: 640px)' });
  const dark = useRecoilValue(mode);

  const reviewWidth = isSmallScreen ? 100 : 100 / 3;

  const nextReview = useCallback(() => {
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => prevIndex + 1);
  }, []);

  const prevReview = useCallback(() => {
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => prevIndex - 1);
  }, []);

  const handleTransitionEnd = () => {
    setIsTransitioning(false);
    if (currentIndex === infiniteReviews.length - 1) {
      setCurrentIndex(1); // Reset to the first real review
    } else if (currentIndex === 0) {
      setCurrentIndex(infiniteReviews.length - 2); // Reset to the last real review
    }
  };

  useEffect(() => {
    const timer = setInterval(nextReview, 5000);
    return () => clearInterval(timer);
  }, [nextReview]);

  return (
    <section className="py-16 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <h2 className={`text-4xl font-bold text-center mb-12 text-gray-800 ${dark === 'dark' ? 'text-yellow-400' : 'text-blue-600'}`}>
          What Our Community Says
        </h2>
        <div className="relative">
          <div className="overflow-visible">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${currentIndex * reviewWidth}%)`,
                transition: isTransitioning ? 'transform 0.5s ease-in-out' : 'none',
              }}
              onTransitionEnd={handleTransitionEnd}
            >
              {infiniteReviews.map((review, index) => (
                <div key={index} className={`w-full ${isSmallScreen ? 'flex-shrink-0' : 'sm:w-1/3 flex-shrink-0'} px-2`}>
                  <ReviewCard review={review} dark={dark} />
                </div>
              ))}
            </div>
          </div>
          <button
            onClick={prevReview}
            className={`absolute top-1/2 -left-4 transform -translate-y-1/2 rounded-full p-2 shadow-md ml-1 ${dark === 'dark' ? 'bg-gray-600 hover:bg-gray-500' : 'bg-white hover:bg-gray-100'}`}
          >
            <ChevronLeft className={`w-6 h-6 ${dark === 'dark' ? 'text-white' : 'text-gray-600'}`} />
          </button>
          <button
            onClick={nextReview}
            className={`absolute top-1/2 -right-4 transform -translate-y-1/2 rounded-full p-2 shadow-md mr-1 ${dark === 'dark' ? 'bg-gray-600 hover:bg-gray-500' : 'bg-white hover:bg-gray-100'}`}
          >
            <ChevronRight className={`w-6 h-6 ${dark === 'dark' ? 'text-white' : 'text-gray-600'}`} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Review;
