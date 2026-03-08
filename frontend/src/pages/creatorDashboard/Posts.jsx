import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { PlusCircle, Heart, LoaderCircle } from 'lucide-react';
import { axiosInstance } from '../../lib/Axios';

const CreatorPosts = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPosts = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const res = await axiosInstance.get('/posts/creator/me');
      setPosts(res.data || []);
    } catch (err) {
      console.error('Error fetching posts:', err);
      setError(err?.response?.data?.message || 'Failed to load posts.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleLike = async (postId) => {
    try {
      const res = await axiosInstance.post(`/posts/${postId}/like`);
      setPosts((prev) =>
        prev.map((p) =>
          p._id === postId
            ? {
                ...p,
                likeCount: res.data.likeCount,
                likedByCurrentUser: res.data.likedByCurrentUser,
              }
            : p
        )
      );
    } catch (err) {
      console.error('Like failed:', err);
    }
  };

  return (
    <motion.div
      className="h-full"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Your Posts</h1>
            <p className="text-neutral-400 text-sm">
              Create and manage the posts your supporters see.
            </p>
          </div>
          <button
            onClick={() => navigate('/c/posts/new')}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 text-sm font-medium text-white"
          >
            <PlusCircle size={18} />
            Create New Post
          </button>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-12 text-neutral-400">
            <LoaderCircle className="w-8 h-8 animate-spin" />
          </div>
        ) : error ? (
          <p className="text-sm text-red-400">{error}</p>
        ) : posts.length === 0 ? (
          <div className="border border-white/10 rounded-xl p-8 bg-neutral-900/60 text-center">
            <p className="text-neutral-400 mb-4">You haven’t shared any posts yet.</p>
            <button
              onClick={() => navigate('/c/posts/new')}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 text-sm font-medium text-white"
            >
              <PlusCircle size={18} />
              Create your first post
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {posts.map((post) => (
              <motion.div
                key={post._id}
                className="rounded-xl border border-white/10 bg-neutral-900/60 overflow-hidden"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <img
                  src={post.image}
                  alt="Post"
                  className="w-full max-h-96 object-cover"
                />
                <div className="p-4">
                  {post.caption && (
                    <p className="text-neutral-200 text-sm mb-3 whitespace-pre-wrap">
                      {post.caption}
                    </p>
                  )}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleLike(post._id)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm transition-colors ${
                        post.likedByCurrentUser
                          ? 'text-red-400 bg-red-500/10'
                          : 'text-neutral-400 hover:bg-white/5'
                      }`}
                    >
                      <Heart
                        size={18}
                        className={post.likedByCurrentUser ? 'fill-current' : ''}
                      />
                      {post.likeCount}
                    </button>
                    <span className="text-xs text-neutral-500">
                      {post.createdAt
                        ? new Date(post.createdAt).toLocaleDateString()
                        : ''}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default CreatorPosts;
