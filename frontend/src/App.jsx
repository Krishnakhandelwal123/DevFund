import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import { Toaster } from "react-hot-toast";
import Signup from './pages/Signup'
import Initial from './pages/Initial'
import { useAuthStore } from "./Store/AuthStore";
import { useEffect, useCallback } from 'react';
import { Loader } from "lucide-react";
import EmailVerification from './pages/EmailVerification';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import Home from './pages/Home';
import CustomCursor from './components/CustomCursor';


const ProtectedRoute = ({ children }) => {
  const { authUser } = useAuthStore();

  if (!authUser) {
    return <Navigate to='/' replace />;
  }

  if (!authUser.isVerified) {
    return <Navigate to='/verifyemail' replace />;
  }

  return children;
};

// redirect authenticated users to the home page
const RedirectAuthenticatedUser = ({ children }) => {
  const { authUser } = useAuthStore();

  if (authUser && authUser.isVerified) {
    return <Navigate to='/s/home' replace />;
  }
  if (authUser && authUser.isVerified) {
    return <Navigate to='/s/home' replace />;
  }

  return children;
};

// Protect email verification route - only for authenticated but unverified users
const EmailVerificationRoute = ({ children }) => {
  const { authUser } = useAuthStore();

  if (!authUser) {
    return <Navigate to='/' replace />;
  }

  if (authUser.isVerified) {
    return <Navigate to='/s/home' replace />;
  }

  return children;
};

const App = () => {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();

  const stableCheckAuth = useCallback(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    stableCheckAuth();
  }, [stableCheckAuth]);

  // Show loading only when checking auth and no user exists
  if (isCheckingAuth && !authUser) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  return (
    <>
      <CustomCursor />
      <Routes>
        <Route
          path="/"
          element={
            !authUser || !authUser.isVerified
              ? <Initial />
              : <Navigate to="/s/home" replace />
          }
        />
        <Route path='/s/home' element={<ProtectedRoute>
          <Home />
        </ProtectedRoute>} />
        <Route path='/s/explore' element={<ProtectedRoute>
          <Home />
        </ProtectedRoute>} />
        <Route path='/s/notifications' element={<ProtectedRoute>
          <Home />
        </ProtectedRoute>} />
        <Route path='/s/settings' element={<ProtectedRoute>
          <Home />
        </ProtectedRoute>} />
        <Route path='/login' element={<RedirectAuthenticatedUser>
          <Login />
        </RedirectAuthenticatedUser>} />
        <Route path='/signup' element={<RedirectAuthenticatedUser>
          <Signup />
        </RedirectAuthenticatedUser>} />
        <Route path='/verifyemail' element={<EmailVerificationRoute>
          <EmailVerification />
        </EmailVerificationRoute>} />
        <Route path='/forgotpassword' element={<RedirectAuthenticatedUser>
          <ForgotPasswordPage />
        </RedirectAuthenticatedUser>} />
        <Route
          path='/resetpassword/:token'
          element={
            <RedirectAuthenticatedUser>
              <ResetPasswordPage />
            </RedirectAuthenticatedUser>
          }
        />
        {/* catch all routes */}
        <Route path='/s' element={<Navigate to='/s/home' replace />} />
        <Route path='*' element={<Navigate to='/s/home' replace />} />
      </Routes>
      <Toaster />
    </>
  )
}

export default App
