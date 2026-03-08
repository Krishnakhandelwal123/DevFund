import React from 'react';
import { motion } from 'framer-motion';
import { Settings, UploadCloud } from 'lucide-react';
import { useAuthStore } from '../../Store/AuthStore';

const CreatorSettings = () => {
  const { authUser } = useAuthStore();
  const displayName = authUser?.creatorProfile?.displayName || authUser?.name || 'Creator';
  const avatarUrl =
    authUser?.creatorProfile?.avatar ||
    authUser?.profileImage ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=8b5cf6&color=fff&size=96`;

  return (
    <motion.div
      className="h-full"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Settings className="w-6 h-6 text-purple-400" />
          <div>
            <h1 className="text-2xl font-bold text-white">Creator Settings</h1>
            <p className="text-neutral-400 text-sm">
              Manage your creator profile and appearance.
            </p>
          </div>
        </div>

        {/* Profile Picture Section (UI only for now) */}
        <div className="border border-white/10 rounded-xl p-6 bg-neutral-900/60">
          <h2 className="text-lg font-semibold text-white mb-4">Profile Picture</h2>
          <div className="flex items-center gap-6">
            <img
              src={avatarUrl}
              alt="Creator avatar"
              className="w-20 h-20 rounded-full border-2 border-purple-500/40 object-cover"
            />
            <div className="space-y-2">
              <button
                type="button"
                disabled
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-600/60 text-sm font-medium text-white cursor-not-allowed opacity-70"
              >
                <UploadCloud size={18} />
                Upload new picture (coming soon)
              </button>
              <p className="text-xs text-neutral-400">
                We&apos;ll soon let you upload a custom image. For now, your avatar is
                generated from your name.
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CreatorSettings;

