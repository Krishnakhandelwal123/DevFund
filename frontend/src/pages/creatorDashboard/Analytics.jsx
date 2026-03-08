import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3 } from 'lucide-react';

const CreatorAnalytics = () => {
  return (
    <motion.div
      className="h-full"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <BarChart3 className="w-6 h-6 text-cyan-400" />
          <div>
            <h1 className="text-2xl font-bold text-white">Analytics</h1>
            <p className="text-neutral-400 text-sm">
              Track how your content and earnings are performing over time.
            </p>
          </div>
        </div>

        <div className="border border-white/10 rounded-xl p-6 bg-neutral-900/60">
          <p className="text-neutral-400 text-sm">
            Detailed analytics are coming soon. You&apos;ll be able to see views,
            earnings trends, and supporter insights here.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default CreatorAnalytics;

