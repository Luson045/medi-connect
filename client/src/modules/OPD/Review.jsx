import React, { Fragment, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faAngleLeft,
	faAngleRight,
	faStar,
	faStarHalfAlt,
} from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames";
import PropTypes from "prop-types";

// Data for reviews, consisting of multiple arrays to create the sliding effect
const reviews = [
	[
		{
      id: 1,
      name: "Emily Johnson",
      role: "Patient",
      review: "The staff was attentive, and the facilities were top-notch. I couldn't have asked for better care.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&q=80&fm=jpg&crop=faces&fit=crop&w=150&h=150"
    },
    {
      id: 2,
      name: "Dr. Michael Chen",
      role: "Doctor",
      review: "As a doctor, I'm impressed by the hospital's commitment to providing the best care possible.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?ixlib=rb-4.0.3&q=80&fm=jpg&crop=faces&fit=crop&w=150&h=150"
    },
	],
	[
		{
      id: 3,
      name: "Sarah Thompson",
      role: "Nurse",
      review: "Our nursing staff works tirelessly to ensure patient comfort and quick recovery.",
      rating: 4.5,
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&q=80&fm=jpg&crop=faces&fit=crop&w=150&h=150"
    },
    {
      id: 4,
      name: "David Rodriguez",
      role: "Patient",
      review: "The physical therapy team helped me recover faster than I expected. I'm grateful for their expertise.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?ixlib=rb-4.0.3&q=80&fm=jpg&crop=faces&fit=crop&w=150&h=150"
    },
	],
  [
    {
      id: 5,
      name: "Linda Kim",
      role: "Administrator",
      review: "Our hospital maintains the highest standards of patient care and safety.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=2861&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      id: 6,
      name: "Robert Taylor",
      role: "Patient",
      review: "The emergency room staff was quick and professional. They put me at ease during a stressful time.",
      rating: 4,
      image: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?ixlib=rb-4.0.3&q=80&fm=jpg&crop=faces&fit=crop&w=150&h=150"
    }
  ]
];

// Functional component for displaying a star rating, allowing half-stars and empty stars
const Rating = ({ rating, showLabel, className, ...rest }) => (
	<p className={classNames("flex flex-wrap gap-0.5", className)} {...rest}>
		<span>
			{[...Array(5)].map((_, i) => {
				const index = i + 1;
				let review = "";
				if (index <= Math.floor(rating))
					review = (
						<FontAwesomeIcon
							icon={faStar}
							className="text-[22px] text-yellow-500"
						/>
					);
				else if (rating > i && rating < index + 1)
					review = (
						<FontAwesomeIcon
							icon={faStarHalfAlt}
							className="text-[22px] text-yellow-500"
						/>
					);
				else if (index > rating)
					review = (
						<FontAwesomeIcon
							icon={faStar}
							className="text-[22px] text-yellow-300 "
						/>
					);

				return <Fragment key={i}>{review}</Fragment>;
			})}
		</span>
		{showLabel && <span>{rating.toFixed(1)}</span>}
	</p>
);

Rating.propTypes = {
	rating: PropTypes.number.isRequired,
	showLabel: PropTypes.bool,
	className: PropTypes.string,
};

// Component to display each review card with image, name, role, and review content
const ReviewCard = ({ item }) => {
	const { rating, review, image, name, role } = item;
	return (
		<div className="bg-white text-black shadow-xl rounded-xl hover:-translate-y-1 h-full duration-300 p-6">
			<div className="mt-4">
				<div className="flex justify-between items-center mb-6">
					<div className="flex items-center">
						<div className="mr-2">
							<img
								src={image}
								alt={name}
								className="max-w-full h-auto rounded-full border"
								width="47"
							/>
						</div>
						<div>
							<h5 className="text-xl break-all font-medium">{name}</h5>
							<p className="text-indigo-600 text-sm">{role}</p>
						</div>
					</div>
					<Rating rating={rating} showLabel={false} />
				</div>
				<p className="leading-[1.8] opacity-80 mb-6">{review}</p>
			</div>
		</div>
	);
};
ReviewCard.propTypes = {
	item: PropTypes.object.isRequired,
};

// Main Reviews component for displaying the review slider with next and previous buttons
const Reviews = () => {
	const [index, setIndex] = useState(0); // Keeps track of current review index
	const [isTransitioning, setIsTransitioning] = useState(false); // Tracks if slide is transitioning
	const [slideDirection, setSlideDirection] = useState("right"); // Stores slide direction for animations
  
	// Handles the end of the transition animation
	useEffect(() => {
		if (isTransitioning) {
			const timer = setTimeout(() => {
				setIsTransitioning(false);
			}, 10); // Adjusted delay for the effect
  
			return () => clearTimeout(timer);
		}
	}, [isTransitioning]);
  
	// Handle control clicks to change the review index and direction
	const handleControl = (type) => {
		setIsTransitioning(true); // Start the transition
		setSlideDirection(type);  // Set direction for the slide
		if (type === "prev") {
			setIndex(index <= 0 ? reviews.length - 1 : index - 1);
		} else if (type === "next") {
			setIndex(index >= reviews.length - 1 ? 0 : index + 1);
		}
	};
  
	return (
		<section className="py-14 md:py-24 text-zinc-900">
			<div className="container px-4 mx-auto relative">
				<div className="flex justify-center text-center mb-6 lg:mb-12">
					<div className="max-w-lg">
						<h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
							What Our Community Says
						</h2>
					</div>
				</div>
  
				{/* Apply transition styles to the review grid */}
				<div
					className={`grid grid-cols-2 gap-6 mt-12 transition-transform duration-400 ease-in-out ${
						isTransitioning ? "opacity-0" : "opacity-100"
					}`}
					style={{
						transform: isTransitioning
							? slideDirection === "prev"
								? "translateX(-100%)" // Slide in from the left for prev
								: "translateX(100%)"  // Slide in from the right for next
							: "translateX(0)",
					}}
				>
					{/* Loop through the reviews based on the current index */}
					{reviews[index].map((item) => (
						<div
							className="col-span-2 md:col-span-1 transform transition-transform duration-400 ease-in-out"
							style={{
								transform: isTransitioning
									? slideDirection === "prev"
										? "translateX(-10px)" // Slightly shift left for prev
										: "translateX(10px)"  // Slightly shift right for next
									: "translateX(0)",
							}}
							key={item.id}
						>
							<ReviewCard item={item} />
						</div>
					))}
				</div>
  
				{/* Control buttons to navigate reviews */}
				<div className="relative flex justify-center items-center my-12">
					<button
						className="text-lg text-black bg-white shadow-2xl opacity-60 hover:opacity-100 w-12 h-12 flex justify-center items-center rounded-full mr-4"
						onClick={() => handleControl("prev")}
					>
						<FontAwesomeIcon icon={faAngleLeft} />
					</button>
					<button
						className="text-lg text-black bg-white shadow-2xl opacity-60 hover:opacity-100 w-12 h-12 flex justify-center items-center rounded-full mr-4"
						onClick={() => handleControl("next")}
					>
						<FontAwesomeIcon icon={faAngleRight} />
					</button>
				</div>
			</div>
		</section>
	);
};
  
export default Reviews;
