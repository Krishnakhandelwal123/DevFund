import React from 'react';
import { motion } from 'framer-motion';

const Notifications = () => {
  return (
    <motion.div
      className="h-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-2">Notifications</h1>
          <p className="text-neutral-400">
            Stay updated with your activity and creator updates
          </p>
          <p className="text-neutral-500 mt-4">Content coming soon</p>
        </div>
      </div>
    </motion.div>
  );
};

export default Notifications; 