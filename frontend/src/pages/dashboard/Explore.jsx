import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  Filter,
  Heart,
  Eye,
  Grid,
  List,
  Sparkles,
  Star,
} from 'lucide-react';
import { axiosInstance } from '../../lib/Axios';
import { useNavigate } from 'react-router-dom';

const Explore = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [creators, setCreators] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const categories = [
    { id: 'all', name: 'All Creators', icon: '🌟' },
    { id: 'Developer', name: 'Developer', icon: '💻' },
    { id: 'Data Scientist', name: 'Data Science', icon: '📊' },
    { id: 'Designer', name: 'Designer', icon: '🎨' },
    { id: 'Other', name: 'Others', icon: '✨' },
  ];

  const normalizedQuery = searchQuery.trim().toLowerCase();

  const filteredCreators = creators.filter((creator) => {
    const matchesCategory =
      selectedCategory === 'all' || creator.category === selectedCategory;

    if (!normalizedQuery) {
      return matchesCategory;
    }

    const inName = creator.name.toLowerCase().includes(normalizedQuery);
    const inUsername = creator.username.toLowerCase().includes(normalizedQuery);
    const inDescription = creator.description
      .toLowerCase()
      .includes(normalizedQuery);
    const inTags = creator.tags.some((tag) =>
      tag.toLowerCase().includes(normalizedQuery)
    );

    return matchesCategory && (inName || inUsername || inDescription || inTags);
  });

  const visibleCreators = filteredCreators;

  useEffect(() => {
    const fetchCreators = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const res = await axiosInstance.get('/creator/explore');
        setCreators(res.data || []);
      } catch (err) {
        console.error('Error fetching creators for Explore:', err);
        setError(
          err?.response?.data?.message ||
            'Failed to load creators. Please try again.'
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchCreators();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      className="h-full p-6 overflow-y-auto scrollbar-hide"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Explore Creators</h1>
            <p className="text-neutral-400">
              Discover amazing developers, designers, and creators to support
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'grid' 
                  ? 'bg-neutral-700 text-white' 
                  : 'bg-neutral-800 text-neutral-400 hover:text-white'
              }`}
            >
              <Grid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'list' 
                  ? 'bg-neutral-700 text-white' 
                  : 'bg-neutral-800 text-neutral-400 hover:text-white'
              }`}
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
          <input
            type="text"
            placeholder="Search creators or skills..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-neutral-800 border border-neutral-700 rounded-xl text-white placeholder-neutral-400 focus:outline-none focus:border-neutral-600 focus:ring-1 focus:ring-neutral-600 transition-colors"
          />
        </div>
      </motion.div>

      {/* Filters */}
      <motion.div variants={itemVariants} className="mb-8">
        <div className="flex flex-wrap items-center gap-4">
          {/* Categories */}
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-neutral-400" />
            <span className="text-sm text-neutral-400">Categories:</span>
          </div>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedCategory === category.id
                  ? 'bg-neutral-700 text-white'
                  : 'bg-neutral-800 text-neutral-400 hover:text-white hover:bg-neutral-700'
              }`}
            >
              <span className="mr-2">{category.icon}</span>
              {category.name}
            </button>
          ))}
        </div>

      </motion.div>

      {/* Results Count */}
      <motion.div variants={itemVariants} className="mb-6">
        {isLoading ? (
          <p className="text-neutral-400">Loading creators...</p>
        ) : error ? (
          <p className="text-sm text-red-400">{error}</p>
        ) : (
          <p className="text-neutral-400">
            Found {visibleCreators.length} creator
            {visibleCreators.length !== 1 ? 's' : ''}
          </p>
        )}
      </motion.div>

      {/* Creators Grid/List */}
      <motion.div variants={itemVariants}>
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {visibleCreators.map((creator) => (
              <motion.div
                key={creator.id}
                className="bg-neutral-800 rounded-2xl p-6 border border-neutral-700 hover:border-neutral-600 transition-all duration-300 hover:shadow-lg hover:shadow-neutral-900/50"
                whileHover={{ y: -4 }}
              >
                {/* Creator Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <img
                        src={creator.avatar}
                        alt={creator.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      {creator.isVerified && (
                        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                          <Star className="w-3 h-3 text-white fill-current" />
                        </div>
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">{creator.name}</h3>
                      <p className="text-sm text-neutral-400">{creator.username}</p>
                    </div>
                  </div>
                  {creator.featured && (
                    <div className="px-2 py-1 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full">
                      <Sparkles className="w-3 h-3 text-white" />
                    </div>
                  )}
                </div>

                {/* Creator Info */}
                <div className="mb-4">
                  <span className="inline-flex items-center rounded-full bg-neutral-700/60 px-3 py-1 text-xs font-medium text-neutral-200 mb-2">
                    {creator.category === 'developer' && 'Developer'}
                    {creator.category === 'data-science' && 'Data Science'}
                    {creator.category === 'designer' && 'Designer'}
                    {creator.category === 'other' && 'Other'}
                  </span>
                  <p className="text-sm text-neutral-300 line-clamp-3">
                    {creator.description}
                  </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {creator.tags.slice(0, 3).map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-neutral-700 text-xs text-neutral-300 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                  {creator.tags.length > 3 && (
                    <span className="px-2 py-1 bg-neutral-700 text-xs text-neutral-400 rounded-full">
                      +{creator.tags.length - 3}
                    </span>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-2">
                  <button
                    className="flex-1 flex items-center justify-center space-x-2 py-2 bg-neutral-700 hover:bg-neutral-600 rounded-lg transition-colors"
                    onClick={() => navigate(`/creator/${creator.id}`)}
                  >
                    <Eye className="w-4 h-4" />
                    <span className="text-sm">View Profile</span>
                  </button>
                  <button className="flex-1 flex items-center justify-center space-x-2 py-2 bg-purple-600 hover:bg-purple-500 rounded-lg transition-colors">
                    <Heart className="w-4 h-4" />
                    <span className="text-sm">Fund Me</span>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {visibleCreators.map((creator) => (
              <motion.div
                key={creator.id}
                className="bg-neutral-800 rounded-xl p-6 border border-neutral-700 hover:border-neutral-600 transition-all duration-300"
                whileHover={{ x: 4 }}
              >
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <img
                      src={creator.avatar}
                      alt={creator.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    {creator.isVerified && (
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                        <Star className="w-3 h-3 text-white fill-current" />
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="font-semibold text-white">{creator.name}</h3>
                      <span className="text-sm text-neutral-400">{creator.username}</span>
                      {creator.featured && (
                        <div className="px-2 py-1 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full">
                          <Sparkles className="w-3 h-3 text-white" />
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center space-x-4 text-sm text-neutral-400 mb-2">
                      <span>
                        {creator.category === 'developer' && 'Developer'}
                        {creator.category === 'data-science' && 'Data Science'}
                        {creator.category === 'designer' && 'Designer'}
                        {creator.category === 'other' && 'Other'}
                      </span>
                    </div>

                    <p className="text-sm text-neutral-300 mb-3">
                      {creator.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mt-2">
                      {creator.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-neutral-700 text-xs text-neutral-300 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button
                      className="px-4 py-2 bg-neutral-700 hover:bg-neutral-600 rounded-lg transition-colors flex items-center gap-2 text-sm"
                      onClick={() => navigate(`/creator/${creator.id}`)}
                    >
                      <Eye className="w-4 h-4" />
                      <span>View Profile</span>
                    </button>
                    <button className="px-4 py-2 bg-purple-600 hover:bg-purple-500 rounded-lg transition-colors flex items-center gap-2 text-sm">
                      <Heart className="w-4 h-4" />
                      <span>Fund Me</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default Explore; 