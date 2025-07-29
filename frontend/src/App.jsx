import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import { Toaster } from "react-hot-toast";
import Signup from './pages/Signup'
import Initial from './pages/Initial'
import { useAuthStore } from "./Store/AuthStore";
import { useEffect } from 'react';
import { Loader } from "lucide-react";
import EmailVerification from './pages/EmailVerification';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';


const ProtectedRoute = ({ children }) => {
  const { authUser } = useAuthStore();

  if (!authUser) {
    return <Navigate to='/login' replace />;
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
    return <Navigate to='/' replace />;
  }

  return children;
};

const App = () => {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth && !authUser)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  return (
    <>
      <Routes>
        <Route path='/' element={<ProtectedRoute>
          <Initial />
        </ProtectedRoute>} />
        <Route path='/login' element={<RedirectAuthenticatedUser>
          <Login />
        </RedirectAuthenticatedUser>} />
        <Route path='/signup' element={<RedirectAuthenticatedUser>
          <Signup />
        </RedirectAuthenticatedUser>} />
        <Route path='/verifyemail' element={<EmailVerification />} />
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
				<Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
      <Toaster />
    </>
  )
}

export default App
