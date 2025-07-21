import React, { useState } from 'react';
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  Dumbbell, 
  ArrowRight,
  AlertCircle,
  CheckCircle,
  Loader2
} from 'lucide-react';

const SignInPage = ({ onSignInSuccess, onSwitchToSignUp }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    
    return newErrors;
  };

  const handleSignIn = async () => {
    const formErrors = validateForm();
    
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      // For demo purposes, we'll simulate a successful login
      // In a real app, you would make an API call here
      const mockUserData = {
        id: '1',
        firstName: 'John',
        lastName: 'Doe',
        email: formData.email,
        fitnessGoal: 'muscle-gain',
        experienceLevel: 'intermediate',
        profile: {
          age: 28,
          weight: 75,
          height: 180,
          gender: 'male'
        },
        connectedDevice: null,
        preferences: {
          theme: 'default',
          notifications: true,
          units: 'metric'
        }
      };

      setIsSuccess(true);
      
      // Simulate success state before redirecting
      setTimeout(() => {
        if (onSignInSuccess) {
          onSignInSuccess(mockUserData);
        }
      }, 1000);

    } catch (error) {
      console.error('Sign in error:', error);
      setErrors({
        general: 'Invalid email or password. Please try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !isLoading) {
      handleSignIn();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F172A] to-[#1E293B] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-[#8B5CF6] to-[#F472B6] rounded-xl flex items-center justify-center mr-3">
              <Dumbbell className="text-white" size={24} />
            </div>
            <h1 className="text-3xl font-bold text-white">FitnessTracker Pro</h1>
          </div>
          <p className="text-gray-400">Welcome back! Sign in to continue your fitness journey</p>
        </div>

        {/* Form container */}
        <div className="bg-gradient-to-br from-[#1E293B] to-[#0F172A] rounded-2xl shadow-2xl border border-[#334155] p-8">
          {isSuccess ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Welcome Back!</h3>
              <p className="text-gray-400">Signing you in...</p>
              <div className="mt-4">
                <Loader2 className="animate-spin text-[#8B5CF6] mx-auto" size={24} />
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Sign In</h3>
                <p className="text-gray-400">Enter your credentials to access your account</p>
              </div>

              {/* General Error */}
              {errors.general && (
                <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                  <p className="text-sm text-red-400 flex items-center">
                    <AlertCircle size={14} className="mr-2" />
                    {errors.general}
                  </p>
                </div>
              )}

              {/* Email Field */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                    className={`w-full pl-10 pr-4 py-3 bg-[#1E293B] border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                      errors.email 
                        ? 'border-red-500 focus:ring-red-500' 
                        : 'border-[#334155] focus:ring-[#8B5CF6] focus:border-[#8B5CF6]'
                    } text-white placeholder-gray-500`}
                    placeholder="Enter your email address"
                    disabled={isLoading}
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-sm text-red-400 flex items-center">
                    <AlertCircle size={14} className="mr-1" />
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                    className={`w-full pl-10 pr-12 py-3 bg-[#1E293B] border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                      errors.password 
                        ? 'border-red-500 focus:ring-red-500' 
                        : 'border-[#334155] focus:ring-[#8B5CF6] focus:border-[#8B5CF6]'
                    } text-white placeholder-gray-500`}
                    placeholder="Enter your password"
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-300 disabled:opacity-50"
                    disabled={isLoading}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1 text-sm text-red-400 flex items-center">
                    <AlertCircle size={14} className="mr-1" />
                    {errors.password}
                  </p>
                )}
              </div>

              {/* Forgot Password Link */}
              <div className="text-right">
                <button className="text-sm text-[#8B5CF6] hover:text-[#F472B6] transition-colors">
                  Forgot your password?
                </button>
              </div>

              {/* Sign In Button */}
              <button
                type="button"
                onClick={handleSignIn}
                disabled={isLoading}
                className="w-full px-8 py-3 bg-gradient-to-r from-[#8B5CF6] to-[#F472B6] text-white font-medium rounded-lg hover:shadow-lg hover:shadow-[#8B5CF6]/25 transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="animate-spin" size={20} />
                    <span>Signing In...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In</span>
                    <ArrowRight size={20} />
                  </>
                )}
              </button>

              {/* Demo Credentials */}
              <div className="p-4 bg-[#0F172A] rounded-lg border border-[#334155]">
                <p className="text-sm text-gray-400 mb-2">Demo Credentials:</p>
                <div className="space-y-1 text-xs text-gray-500">
                  <p>Email: demo@fittrack.com</p>
                  <p>Password: demo123</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-gray-500 text-sm">
            Don't have an account?{' '}
            <button 
              onClick={onSwitchToSignUp}
              className="text-[#8B5CF6] hover:text-[#F472B6] transition-colors font-medium"
            >
              Sign up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignInPage; 