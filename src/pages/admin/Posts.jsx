import React, { useState, useEffect } from 'react';
import api from '../../api/axios';

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [confirmDelete, setConfirmDelete] = useState(null);

  // Example data for testing
  const examplePosts = [
    {
      _id: '1',
      title: 'Welcome to the Logic Church Forum',
      body: 'This is a sample post to demonstrate the forum functionality. Feel free to explore and engage with the community!',
      author: {
        firstName: 'Admin',
        lastName: 'User'
      },
      createdAt: new Date().toISOString(),
      comments: [
        {
          _id: 'c1',
          body: 'Thanks for creating this forum! Looking forward to great discussions.',
          author: {
            firstName: 'John',
            lastName: 'Doe'
          },
          createdAt: new Date(Date.now() - 3600000).toISOString()
        },
        {
          _id: 'c2',
          body: 'This is really helpful. How do I post a new question?',
          author: {
            firstName: 'Jane',
            lastName: 'Smith'
          },
          createdAt: new Date(Date.now() - 1800000).toISOString()
        }
      ]
    },
    {
      _id: '2',
      title: 'Upcoming Church Events',
      body: 'Join us this Sunday for our weekly service at 10 AM. We will be discussing the importance of community in faith.',
      author: {
        firstName: 'Pastor',
        lastName: 'Johnson'
      },
      createdAt: new Date(Date.now() - 86400000).toISOString(),
      comments: [
        {
          _id: 'c3',
          body: 'Looking forward to it!',
          author: {
            firstName: 'Sarah',
            lastName: 'Williams'
          },
          createdAt: new Date(Date.now() - 82800000).toISOString()
        }
      ]
    }
  ];

  // Fetch all forum posts
  const fetchPosts = async () => {
    try {
      setLoading(true);
      // Uncomment this line when your backend is ready
      // const response = await api.get('/questions');
      // setPosts(response.data.questions || examplePosts);
      
      // For now, use example data
      setPosts(examplePosts);
    } catch (err) {
      console.error('Error fetching posts:', err);
      // If there's an error, show example data
      setPosts(examplePosts);
      setError('Using example data. Could not connect to the server.');
    } finally {
      setLoading(false);
    }
  };

  // Delete a post
  const handleDeletePost = async (postId) => {
    try {
      await api.delete(`/questions/${postId}`);
      setPosts(posts.filter(post => (post.id || post._id) !== postId));
      setConfirmDelete(null);
    } catch (err) {
      console.error('Error deleting post:', err);
      setError('Failed to delete post. Please try again.');
    }
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Fetch posts on component mount
  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white p-6 md:p-8">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-white">Forum Posts</h1>
        <p className="text-gray-400 mt-2">
          Manage all forum posts and comments.
        </p>
      </header>

      {/* Error message */}
      {error && (
        <div className="mb-6 p-4 bg-red-900/50 border border-red-700 rounded-lg text-red-200">
          {error}
        </div>
      )}

      {/* Loading state */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
        </div>
      ) : (
        /* Posts list */
        <div className="space-y-6">
          {posts.length === 0 ? (
            <div className="text-center py-12 bg-gray-900/50 rounded-xl">
              <p className="text-gray-400">No posts found.</p>
            </div>
          ) : (
            posts.map((post) => (
              <div key={post.id || post._id} className="bg-gray-900 rounded-xl p-6 hover:bg-gray-800/50 transition-colors">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-white">{post.title}</h3>
                    <p className="mt-2 text-gray-300">{post.body}</p>
                    
                    {/* Post meta */}
                    <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-gray-400">
                      <span>Posted by: {post.author?.firstName} {post.author?.lastName}</span>
                      <span>•</span>
                      <span>{formatDate(post.createdAt)}</span>
                      <span>•</span>
                      <span>{post.comments?.length || 0} comments</span>
                    </div>
                    
                    {/* Comments preview */}
                    {post.comments?.length > 0 && (
                      <div className="mt-4 border-t border-gray-800 pt-4">
                        <h4 className="text-sm font-medium text-gray-300 mb-2">Recent Comments:</h4>
                        <div className="space-y-3">
                          {post.comments.slice(0, 2).map((comment) => (
                            <div key={comment._id} className="bg-gray-800/50 p-3 rounded-lg">
                              <div className="flex items-center gap-2 text-sm">
                                <span className="font-medium text-gray-200">
                                  {comment.author?.firstName} {comment.author?.lastName}:
                                </span>
                                <span className="text-gray-400">{comment.body}</span>
                              </div>
                              <div className="text-xs text-gray-500 mt-1">
                                {formatDate(comment.createdAt)}
                              </div>
                            </div>
                          ))}
                          {post.comments.length > 2 && (
                            <div className="text-sm text-gray-400">
                              +{post.comments.length - 2} more comments...
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Delete button */}
                  <div className="ml-4">
                    <button
                      onClick={() => setConfirmDelete(post.id || post._id)}
                      className="text-red-500 hover:text-red-400 transition-colors"
                      title="Delete post"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </div>
                
                {/* Delete confirmation */}
                {confirmDelete === (post.id || post._id) && (
                  <div className="mt-4 p-4 bg-gray-800 rounded-lg">
                    <p className="text-gray-300 mb-3">Are you sure you want to delete this post? This action cannot be undone.</p>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleDeletePost(post.id || post._id)}
                        className="px-3 py-1.5 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => setConfirmDelete(null)}
                        className="px-3 py-1.5 bg-gray-700 text-white rounded-md hover:bg-gray-600 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Posts;
