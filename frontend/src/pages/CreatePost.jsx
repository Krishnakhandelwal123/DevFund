import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ImagePlus, LoaderCircle } from 'lucide-react';
import FloatingShape from '../components/FloatingShape';
import { axiosInstance } from '../lib/Axios';
import toast from 'react-hot-toast';

const CreatePost = () => {
  const navigate = useNavigate();
  const [caption, setCaption] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const allowed = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    if (!allowed.includes(file.type)) {
      setError('Please choose a JPEG, PNG, WebP, or GIF image.');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError('Image must be under 5MB.');
      return;
    }
    setError('');
    setImageFile(file);
    const reader = new FileReader();
    reader.onload = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!imageFile) {
      setError('Please select an image.');
      return;
    }
    setIsLoading(true);
    setError('');
    try {
      const formData = new FormData();
      formData.append('image', imageFile);
      formData.append('caption', caption);
      await axiosInstance.post('/posts', formData, {
        headers: { 'Content-Type': undefined },
      });
      toast.success('Post created!');
      navigate('/c/posts');
    } catch (err) {
      const msg =
        err?.response?.data?.message || err?.message || 'Failed to create post.';
      setError(msg);
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center bg-gradient-to-b from-neutral-950 via-zinc-900 to-neutral-950 text-white overflow-hidden p-4">
      <FloatingShape size="w-64 h-64" top="-5%" left="10%" delay={0} />
      <FloatingShape size="w-48 h-48" top="70%" left="80%" delay={5} />
      <FloatingShape size="w-32 h-32" top="40%" left="-10%" delay={2} />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-lg rounded-2xl border border-white/10 bg-neutral-900/50 p-8 shadow-2xl backdrop-blur-sm"
      >
        <h1 className="text-2xl font-bold text-white mb-2">Create New Post</h1>
        <p className="text-neutral-400 text-sm mb-6">
          Share an image and caption with your supporters.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-2">
              Image *
            </label>
            <div className="border border-dashed border-neutral-600 rounded-xl p-6 text-center hover:border-neutral-500 transition-colors">
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif"
                onChange={handleImageChange}
                className="hidden"
                id="post-image"
              />
              <label
                htmlFor="post-image"
                className="cursor-pointer flex flex-col items-center gap-2"
              >
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="max-h-48 rounded-lg object-contain"
                  />
                ) : (
                  <ImagePlus className="w-12 h-12 text-neutral-500" />
                )}
                <span className="text-sm text-neutral-400">
                  {imageFile ? imageFile.name : 'Click to upload image (JPEG, PNG, WebP, GIF · max 5MB)'}
                </span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-2">
              Caption
            </label>
            <textarea
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Write a caption..."
              rows={4}
              maxLength={2000}
              className="w-full rounded-xl border border-neutral-700 bg-neutral-800/80 px-4 py-3 text-white placeholder-neutral-500 focus:border-purple-500 focus:ring-1 focus:ring-purple-500/50 focus:outline-none resize-none"
            />
            <p className="text-xs text-neutral-500 mt-1">{caption.length}/2000</p>
          </div>

          {error && (
            <p className="text-sm text-red-400">{error}</p>
          )}

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => navigate('/c/posts')}
              className="flex-1 py-3 rounded-xl border border-neutral-600 text-neutral-300 hover:bg-neutral-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading || !imageFile}
              className="flex-1 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <LoaderCircle className="w-5 h-5 animate-spin" />
              ) : (
                'Create Post'
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default CreatePost;
