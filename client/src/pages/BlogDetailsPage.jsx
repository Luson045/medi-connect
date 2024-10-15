import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { blogPosts } from '../data/blog-posts';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const BlogDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const post = blogPosts.find((p) => p.id === parseInt(id));
  console.log(post);

  if (!post) {
    return <div>Blog post not found!</div>;
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4 mt-24">
        <div className="content-container bg-white rounded-lg shadow-md p-6">
          <img
            src="https://pocketstop.com/wp-content/uploads/2021/07/Members%20of%20a%20medical%20team%20looking%20at%20the%20camera%20while%20working%20on%20a%20laptop.jpeg"
            alt={post.title}
            className="w-full h-64 object-cover rounded-lg mb-4"
          />
          <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
          <div className="flex justify-between text-sm text-gray-500 mb-4">
            <span>{post.date}</span>
            <span>by {post.author}</span>
          </div>
          <p className="text-lg mb-4">{post.excerpt}</p>
          <p className="text-lg">{post.description}</p>
          <div className="flex justify-center items-center mt-4"> {/* Centering the button */}
            <button
              className="btn d-inline-block"
              onClick={() => navigate(-1)}
              style={{
                backgroundColor: "#2563EB", // Blue background
                color: "#ffffff", // White text color
                borderRadius: "8px",
                fontFamily: '"Readex Pro", sans-serif',
                fontWeight: "bold",
                width: "200px",
                padding: "10px",
                border: "none" // Optional: remove border if you want a clean look
              }}
            >
              &larr; Go back
            </button>
          </div>

        </div>

      </div>
      <Footer />
    </>
  );
};

export default BlogDetailsPage;
