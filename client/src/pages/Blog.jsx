import React from 'react';
import { motion } from 'framer-motion';
import FloatingIcons from '../components/FloatingIcons';
import { Link } from 'react-router-dom';
import { blogPosts } from '../data/blog-posts';
import { useRecoilValue } from 'recoil';  // Import Recoil
import { mode } from '../store/atom';  // Import the dark mode atom

const BlogCard = ({ title, excerpt, date, author, image, id, name }) => (
  <Link to={`/blog/${id}`}>
    <motion.div
      className="bg-white rounded-lg shadow-lg p-6 flex flex-col justify-between hover:shadow-xl transition-transform transform-gpu "
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ type: 'spring', stiffness: 500 }}
    >
      <img
        src={image}
        alt={title}
        className="w-full h-48 object-cover rounded-t-lg mb-4"
      />
      <div className={`flex flex-col text-center ${name}`}>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className={`text-gray-600 mb-4 ${name}`}>{excerpt}</p>
        <div className="flex justify-between text-sm text-gray-500">
          <span className={`${name}`}>{date}</span>
          <span className={`${name}`}>by {author}</span>
        </div>
      </div>
    </motion.div>
  </Link>
);

export default function BlogPage() {
  const dark = useRecoilValue(mode); // Reading dark mode state
  return (
    <>
      <header className={`relative py-16 sm:py-24 md:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden ${dark === 'dark' ? 'border-yellow-400 text-yellow-400 bg-gray-600 ' : 'border-gray-700 text-gray-700  '
        }`}>
        <div className="absolute inset-0">
          <svg
            className="absolute bottom-0 left-0 right-0"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
          >
            <path
              fill="#d1fae5"
              fillOpacity="1"
              d="M0,64L48,80C96,96,192,128,288,128C384,128,480,96,576,90.7C672,85,768,107,864,128C960,149,1056,171,1152,165.3C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ></path>
          </svg>
        </div>

        <div className={`max-w-7xl mx-auto relative z-10 ${dark === 'dark' ? 'border-yellow-400 text-yellow-400 ' : 'border-gray-700 text-gray-700  '
          }`}>
          <div className="department_container">
            <div className="container ">
              <div className="heading_container heading_center">
                <motion.h2
                  className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight"
                  initial={{ opacity: 0, y: -50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, type: 'spring' }}
                >
                  <span className={`${dark === 'dark' ? 'border-yellow-400 text-yellow-400 ' : 'border-gray-700 text-gray-700  '
                    }`}>Medical Blog</span>
                </motion.h2>
                <motion.p className="flex flex-col items-center text-center mb-12">
                  <span>Your source for health and wellness information</span>
                </motion.p>
              </div>
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false }}
                transition={{ staggerChildren: 0.2 }}
              >
                {blogPosts.map((post) => (
                  <BlogCard name={`${dark === 'dark' ? 'border-yellow-400 text-gray-800 ' : 'border-gray-700 text-gray-900  '
                    }`} key={post.id} {...post} />
                ))}
              </motion.div>
            </div>
          </div>
        </div>
        <FloatingIcons />
      </header>
    </>
  );
}
