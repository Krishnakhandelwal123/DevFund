import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { axiosInstance } from '../lib/Axios';
import { Crown, Users, FileText, DollarSign, Github, Twitter, Linkedin, Globe2, Heart, LoaderCircle } from 'lucide-react';

const CreatorProfile = () => {
  const { id } = useParams();
  const [creator, setCreator] = useState(null);
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [postsLoading, setPostsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCreator = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const res = await axiosInstance.get(`/creator/${id}`);
        setCreator(res.data);
      } catch (err) {
        console.error('Error fetching creator profile:', err);
        setError(
          err?.response?.data?.message || 'Failed to load creator profile.'
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchCreator();
  }, [id]);

  useEffect(() => {
    if (!id) return;
    const fetchPosts = async () => {
      try {
        setPostsLoading(true);
        const res = await axiosInstance.get(`/posts/creator/${id}`);
        setPosts(res.data || []);
      } catch (err) {
        console.error('Error fetching creator posts:', err);
      } finally {
        setPostsLoading(false);
      }
    };
    fetchPosts();
  }, [id]);

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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-neutral-950 text-neutral-300">
        Loading creator...
      </div>
    );
  }

  if (error || !creator) {
    return (
      <div className="flex items-center justify-center h-screen bg-neutral-950 text-red-400">
        {error || 'Creator not found'}
      </div>
    );
  }

  const { name, username, avatar, category, description, socialLinks, stats } =
    creator;

  const displayAvatar =
    avatar ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(
      name || 'Creator'
    )}&background=8b5cf6&color=fff&size=128`;

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      {/* Header / Hero */}
      <div className="relative h-64 bg-gradient-to-r from-blue-700 via-purple-700 to-amber-600">
        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_top,_#ffffff33,_transparent_60%)]" />
      </div>

      {/* Main card overlapping header */}
      <div className="-mt-24 px-6 pb-12 max-w-5xl mx-auto">
        <div className="bg-neutral-900/90 border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="relative">
                <img
                  src={displayAvatar}
                  alt={name}
                  className="w-24 h-24 md:w-28 md:h-28 rounded-full border-4 border-neutral-950 shadow-xl object-cover bg-neutral-900"
                />
                <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-purple-600 flex items-center justify-center border-2 border-neutral-950">
                  <Crown className="w-4 h-4 text-amber-300" />
                </div>
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold">{name}</h1>
                <p className="text-sm text-neutral-400">{username}</p>
                <p className="mt-2 text-sm text-neutral-300">
                  {category} • Creator
                </p>
              </div>
            </div>

            <div className="flex flex-col items-stretch gap-3 w-full md:w-auto md:items-end">
              <div className="flex gap-4 text-sm text-neutral-300">
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4 text-emerald-400" />
                  <span>{stats?.supportersCount ?? 0} supporters</span>
                </div>
                <div className="flex items-center gap-1">
                  <FileText className="w-4 h-4 text-sky-400" />
                  <span>{stats?.totalPostsShared ?? 0} posts</span>
                </div>
              </div>
              <button className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-blue-600 hover:bg-blue-500 text-sm font-semibold">
                <DollarSign className="w-4 h-4" />
                Fund Me
              </button>
            </div>
          </div>

          {/* Bio */}
          {description && (
            <p className="mt-6 text-sm md:text-base text-neutral-200">
              {description}
            </p>
          )}

          {/* Social links */}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            {socialLinks?.github && (
              <a
                href={socialLinks.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-800 hover:bg-neutral-700 text-sm text-neutral-200"
              >
                <Github className="w-4 h-4" />
                <span>GitHub</span>
              </a>
            )}
            {socialLinks?.twitter && (
              <a
                href={socialLinks.twitter}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-800 hover:bg-neutral-700 text-sm text-neutral-200"
              >
                <Twitter className="w-4 h-4" />
                <span>Twitter</span>
              </a>
            )}
            {socialLinks?.linkedin && (
              <a
                href={socialLinks.linkedin}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-800 hover:bg-neutral-700 text-sm text-neutral-200"
              >
                <Linkedin className="w-4 h-4" />
                <span>LinkedIn</span>
              </a>
            )}
            {socialLinks?.website && (
              <a
                href={socialLinks.website}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-800 hover:bg-neutral-700 text-sm text-neutral-200"
              >
                <Globe2 className="w-4 h-4" />
                <span>Website</span>
              </a>
            )}
          </div>
        </div>

        {/* Posts section */}
        <div className="mt-8 bg-neutral-900/90 border border-white/10 rounded-3xl p-6 md:p-8">
          <h2 className="text-xl font-semibold mb-4">Posts</h2>
          {postsLoading ? (
            <div className="flex items-center justify-center py-8 text-neutral-400">
              <LoaderCircle className="w-6 h-6 animate-spin" />
            </div>
          ) : posts.length === 0 ? (
            <p className="text-sm text-neutral-400">
              This creator hasn&apos;t shared any posts yet.
            </p>
          ) : (
            <div className="space-y-6">
              {posts.map((post) => (
                <motion.div
                  key={post._id}
                  className="rounded-xl border border-white/10 bg-neutral-800/50 overflow-hidden"
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
      </div>
    </div>
  );
};

export default CreatorProfile;

