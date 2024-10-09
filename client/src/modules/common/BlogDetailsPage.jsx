import React from 'react';
import { useParams } from 'react-router-dom';
import { blogPosts } from '../../data/blog-posts';

const BlogDetailsPage = () => {
  const { id } = useParams();
  const post = blogPosts.find((p) => p.id === parseInt(id));
  console.log(post)

  if (!post) {
    return <div>Blog post not found!</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <img
        src={"https://pocketstop.com/wp-content/uploads/2021/07/Members%20of%20a%20medical%20team%20looking%20at%20the%20camera%20while%20working%20on%20a%20laptop.jpeg"}
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
    </div>
  );
};

export default BlogDetailsPage;
