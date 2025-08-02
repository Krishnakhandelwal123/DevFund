import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Zap, Home as HomeIcon, Compass, Bell, Settings as SettingsIcon, PlusCircle,
  MoreHorizontal, LogOut, Edit, DollarSign, Users, Eye
} from 'lucide-react';
import { useAuthStore } from '../Store/AuthStore';
import DashboardHome from './dashboard/DashboardHome';
import Explore from './dashboard/Explore';
import Notifications from './dashboard/Notifications';
import Settings from './dashboard/Settings';

const NavItem = ({ icon, children, isActive = false, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-colors duration-200 ${isActive ? 'bg-blue-500/20 text-blue-300' : 'text-neutral-400 hover:bg-white/5 hover:text-white'}`}
   >
    {icon}
    <span className="font-semibold">{children}</span>
  </button>
);

const ProfileMenu = ({ logout }) => (
  <motion.div
    className="absolute bottom-full left-0 mb-3 w-60 bg-neutral-800/90 backdrop-blur-lg border border-white/10 rounded-xl shadow-2xl"
    initial={{ opacity: 0, y: 10, scale: 0.95 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    exit={{ opacity: 0, y: 10, scale: 0.95 }}
    transition={{ duration: 0.2, ease: 'easeOut' }}
  >
    <div className="p-2">
      <button className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-neutral-300 hover:bg-white/5 rounded-md">
        <Settings size={16} /> Account Settings
      </button>
      <div className="h-px bg-white/10 my-1"></div>
      <button
        onClick={logout}
        className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-red-400 hover:bg-red-500/10 rounded-md"
      >
        <LogOut size={16} /> Logout
      </button>
    </div>
  </motion.div>
);

const Home = () => {
  const { authUser, logout } = useAuthStore();
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [activeNav, setActiveNav] = useState('Home');
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { name: 'Home', icon: <HomeIcon size={22} />, path: '/s/home' },
    { name: 'Explore', icon: <Compass size={22} />, path: '/s/explore' },
    { name: 'Notifications', icon: <Bell size={22} />, path: '/s/notifications' },
    { name: 'Settings', icon: <SettingsIcon size={22} />, path: '/s/settings' },
  ];

  // Sync active navigation with URL
  useEffect(() => {
    const path = location.pathname;
    const currentNav = navItems.find(item => item.path === path);
    if (currentNav) {
      setActiveNav(currentNav.name);
    }
  }, [location.pathname]);

  const handleNavClick = (navItem) => {
    setActiveNav(navItem.name);
    navigate(navItem.path);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  // Render content based on active navigation
  const renderContent = () => {
    switch (activeNav) {
      case 'Home':
        return <DashboardHome />;
      case 'Explore':
        return <Explore />;
      case 'Notifications':
        return <Notifications />;
      case 'Settings':
        return <Settings />;
      default:
        return <DashboardHome />;
    }
  };

  return (
    <div className='relative min-h-screen bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral-950'>
      <div className="absolute inset-0" style={{
        backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)',
        backgroundSize: '4rem 4rem'
      }}></div>

      <motion.div
        className='relative z-10 text-white gap-8 flex min-h-screen p-8'
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Left Sidebar Panel */}
        <motion.div
          className='w-[22%] rounded-3xl border border-white/10 bg-black/20 backdrop-blur-xl shadow-2xl flex flex-col'
          variants={itemVariants}
        >
          <div className="flex-grow p-6">
            <div className="flex items-center gap-3 mb-12 px-2">
              <Zap className="text-blue-500 h-9 w-9" />
              <span className="text-3xl font-bold tracking-wider text-white">DevFund</span>
            </div>
            <nav className="flex flex-col gap-3">
              {navItems.map((item) => (
                <NavItem
                  key={item.name}
                  icon={item.icon}
                  isActive={activeNav === item.name}
                  onClick={() => handleNavClick(item)}
                >
                  {item.name}
                </NavItem>
              ))}
            </nav>
          </div>
          <div className="p-6">
            <button className="w-full flex items-center justify-center gap-3 px-4 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold hover:opacity-90 transition-opacity shadow-lg">
              <PlusCircle size={22} />
              Become a Creator
            </button>
            <div className="h-px bg-white/10 my-6"></div>
            <div className="relative">
              <AnimatePresence>
                {isProfileMenuOpen && <ProfileMenu logout={logout} />}
              </AnimatePresence>
              <div className='flex items-center justify-between'>
                <div className="flex items-center gap-4">
                  <img src="https://static.vecteezy.com/system/resources/thumbnails/005/544/718/small_2x/profile-icon-design-free-vector.jpg" alt="User Avatar" className="w-12 h-12 rounded-full border-2 border-white/20" />
                  <div>
                    <p className="font-semibold">{authUser.name}</p>
                    <p className="text-xs text-neutral-400">Supporter</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                  className="p-2 text-neutral-400 hover:text-white hover:bg-white/10 rounded-full"
                >
                  <MoreHorizontal size={20} />
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Main Content Panel */}
        <motion.div
          className='w-[78%] rounded-3xl border border-white/10 bg-black/20 backdrop-blur-xl shadow-2xl p-8 overflow-y-auto'
          variants={itemVariants}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeNav}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="h-full"
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default Home;
