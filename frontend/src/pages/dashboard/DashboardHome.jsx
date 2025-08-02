import React from 'react';
import { motion } from 'framer-motion';
import { useAuthStore } from '../../Store/AuthStore';

const DashboardHome = () => {
  const { authUser } = useAuthStore();

  return (
    <motion.div
      className="h-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-2">
            Welcome back, {authUser?.name}! 👋
          </h1>
          <p className="text-neutral-400">
            Dashboard Home - Content coming soon
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default DashboardHome; 