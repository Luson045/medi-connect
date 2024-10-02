import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

const reviews = [
  {
    id: 1,
    name: "Emily Johnson",
    role: "Patient",
    review: "The care I received was exceptional. The staff was attentive, and the facilities were top-notch.",
    rating: 5,
    image: "https://i.pravatar.cc/150?img=1"
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Family Member",
    review: "I was impressed by the clear communication from the doctors and the compassionate care my mother received.",
    rating: 5,
    image: "https://i.pravatar.cc/150?img=3"
  },
  {
    id: 3,
    name: "Sarah Thompson",
    role: "Outpatient",
    review: "The online appointment system was so convenient, and I hardly had to wait when I arrived.",
    rating: 4,
    image: "https://i.pravatar.cc/150?img=5"
  },
  {
    id: 4,
    name: "David Rodriguez",
    role: "Patient",
    review: "The physical therapy team helped me recover faster than I expected. I'm grateful for their expertise.",
    rating: 5,
    image: "https://i.pravatar.cc/150?img=7"
  },
  {
    id: 5,
    name: "Linda Kim",
    role: "Nurse",
    review: "As a healthcare professional, I can say this hospital maintains high standards of patient care.",
    rating: 5,
    image: "https://i.pravatar.cc/150?img=9"
  },
  {
    id: 6,
    name: "Robert Taylor",
    role: "Patient",
    review: "The emergency room staff was quick and professional. They put me at ease during a stressful time.",
    rating: 4,
    image: "https://i.pravatar.cc/150?img=11"
  }
];

const ReviewCard = ({ review }) => (
    <div className="bg-slate-100 border-2 border-indigo-300 rounded-lg shadow-lg p-6 flex flex-col justify-between h-full transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
      <div>
        <div className="flex items-center mb-4">
          <img src={review.image} alt={review.name} className="w-12 h-12 rounded-full mr-4 object-cover" />
          <div>
            <h3 className="font-semibold text-lg text-indigo-600">{review.name}</h3>
            <p className="text-gray-600 text-sm">{review.role}</p>
          </div>
        </div>
        <p className="text-gray-700 mb-4 italic">"{review.review}"</p>
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
  const [transitionEnabled, setTransitionEnabled] = useState(true);

  const nextReview = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length);
  }, []);

  const prevReview = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + reviews.length) % reviews.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      nextReview();
    }, 5000);

    return () => clearInterval(timer);
  }, [nextReview]);

  useEffect(() => {
    if (currentIndex === reviews.length - 1) {
      setTimeout(() => {
        setTransitionEnabled(false);
        setCurrentIndex(0);
      }, 500);
      setTimeout(() => {
        setTransitionEnabled(true);
      }, 100);
    }
  }, [currentIndex]);

  return (
    <section className=" py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-extrabold text-indigo-800 text-center mb-12">
          What Our Patients Say
        </h2>
        <div className="relative">
          <div className="overflow-hidden">
            <div 
              className={`flex ${transitionEnabled ? 'transition-transform duration-500 ease-in-out' : ''}`}
              style={{ transform: `translateX(-${currentIndex * (100 / 3)}%)` }}
            >
              {[...reviews, ...reviews.slice(0, 3)].map((review) => (
                <div key={review.id} className="w-1/3 flex-shrink-0 px-4">
                  <ReviewCard review={review} />
                </div>
              ))}
            </div>
          </div>
          <button
            onClick={prevReview}
            className="absolute top-1/2 -left-4 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300"
          >
            <ChevronLeft className="w-6 h-6 text-indigo-600" />
          </button>
          <button
            onClick={nextReview}
            className="absolute top-1/2 -right-4 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300"
          >
            <ChevronRight className="w-6 h-6 text-indigo-600" />
          </button>
        </div>
        <div className="flex justify-center mt-8">
  {reviews.map((_, index) => (
    <div
      key={index}
      className={`w-2 h-2 mx-1 rounded-full cursor-pointer ${
        index === currentIndex ? 'bg-indigo-600' : 'bg-indigo-300'
      }`}
      onClick={() => setCurrentIndex(index)}
    />
  ))}
</div>

      </div>
    </section>
  );
};

export default Review;