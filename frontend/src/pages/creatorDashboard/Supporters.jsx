import React from 'react';
import { motion } from 'framer-motion';
import { Users } from 'lucide-react';

const CreatorSupporters = () => {
  return (
    <motion.div
      className="h-full"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Users className="w-6 h-6 text-emerald-400" />
          <div>
            <h1 className="text-2xl font-bold text-white">Supporters</h1>
            <p className="text-neutral-400 text-sm">
              See who&apos;s backing your work and how they&apos;re engaging.
            </p>
          </div>
        </div>

        <div className="border border-white/10 rounded-xl p-6 bg-neutral-900/60">
          <p className="text-neutral-400 text-sm">
            Supporter insights are coming soon. You&apos;ll be able to see your top
            supporters and recent activity here.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default CreatorSupporters;

