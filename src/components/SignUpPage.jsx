import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  Dumbbell, 
  Heart, 
  Target,
  ArrowRight,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

const SignUpPage = ({ onSignUpSuccess, onSwitchToSignIn }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    fitnessGoal: '',
    experienceLevel: '',
    age: '',
    weight: '',
    height: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState({});

  const fitnessGoals = [
    { id: 'weight-loss', label: 'Weight Loss', icon: Target },
    { id: 'muscle-gain', label: 'Muscle Gain', icon: Dumbbell },
    { id: 'endurance', label: 'Endurance', icon: Heart },
    { id: 'general-fitness', label: 'General Fitness', icon: Target }
  ];

  const experienceLevels = [
    { id: 'beginner', label: 'Beginner', description: 'New to fitness' },
    { id: 'intermediate', label: 'Intermediate', description: 'Some experience' },
    { id: 'advanced', label: 'Advanced', description: 'Experienced athlete' }
  ];

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

  const validateStep1 = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
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
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    return newErrors;
  };

  const validateStep2 = () => {
    const newErrors = {};
    if (!formData.fitnessGoal) newErrors.fitnessGoal = 'Please select a fitness goal';
    if (!formData.experienceLevel) newErrors.experienceLevel = 'Please select your experience level';
    if (!formData.age) newErrors.age = 'Age is required';
    if (!formData.weight) newErrors.weight = 'Weight is required';
    if (!formData.height) newErrors.height = 'Height is required';
    return newErrors;
  };

  const handleNext = () => {
    const stepErrors = currentStep === 1 ? validateStep1() : validateStep2();
    if (Object.keys(stepErrors).length === 0) {
      if (currentStep === 1) {
        setCurrentStep(2);
      } else {
        // Handle final submission
        handleSignUp();
      }
    } else {
      setErrors(stepErrors);
    }
  };

  const handleSignUp = () => {
    // Here you would typically make an API call to register the user
    console.log('Sign up data:', formData);
    // For now, we'll just call the success callback
    if (onSignUpSuccess) {
      onSignUpSuccess(formData);
    }
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold text-white mb-2">Create Your Account</h3>
        <p className="text-gray-400">Start your fitness journey with FitTrack</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">First Name</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            className={`w-full px-4 py-3 bg-[#1E293B] border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
              errors.firstName 
                ? 'border-red-500 focus:ring-red-500' 
                : 'border-[#334155] focus:ring-[#8B5CF6] focus:border-[#8B5CF6]'
            } text-white placeholder-gray-500`}
            placeholder="Enter your first name"
          />
          {errors.firstName && (
            <p className="mt-1 text-sm text-red-400 flex items-center">
              <AlertCircle size={14} className="mr-1" />
              {errors.firstName}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Last Name</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            className={`w-full px-4 py-3 bg-[#1E293B] border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
              errors.lastName 
                ? 'border-red-500 focus:ring-red-500' 
                : 'border-[#334155] focus:ring-[#8B5CF6] focus:border-[#8B5CF6]'
            } text-white placeholder-gray-500`}
            placeholder="Enter your last name"
          />
          {errors.lastName && (
            <p className="mt-1 text-sm text-red-400 flex items-center">
              <AlertCircle size={14} className="mr-1" />
              {errors.lastName}
            </p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className={`w-full pl-10 pr-4 py-3 bg-[#1E293B] border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
              errors.email 
                ? 'border-red-500 focus:ring-red-500' 
                : 'border-[#334155] focus:ring-[#8B5CF6] focus:border-[#8B5CF6]'
            } text-white placeholder-gray-500`}
            placeholder="Enter your email address"
          />
        </div>
        {errors.email && (
          <p className="mt-1 text-sm text-red-400 flex items-center">
            <AlertCircle size={14} className="mr-1" />
            {errors.email}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className={`w-full pl-10 pr-12 py-3 bg-[#1E293B] border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
              errors.password 
                ? 'border-red-500 focus:ring-red-500' 
                : 'border-[#334155] focus:ring-[#8B5CF6] focus:border-[#8B5CF6]'
            } text-white placeholder-gray-500`}
            placeholder="Create a strong password"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-300"
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

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Confirm Password</label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            className={`w-full pl-10 pr-12 py-3 bg-[#1E293B] border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
              errors.confirmPassword 
                ? 'border-red-500 focus:ring-red-500' 
                : 'border-[#334155] focus:ring-[#8B5CF6] focus:border-[#8B5CF6]'
            } text-white placeholder-gray-500`}
            placeholder="Confirm your password"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-300"
          >
            {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
        {errors.confirmPassword && (
          <p className="mt-1 text-sm text-red-400 flex items-center">
            <AlertCircle size={14} className="mr-1" />
            {errors.confirmPassword}
          </p>
        )}
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold text-white mb-2">Personalize Your Experience</h3>
        <p className="text-gray-400">Help us tailor your fitness journey</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-3">What's your primary fitness goal?</label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {fitnessGoals.map((goal) => {
            const Icon = goal.icon;
            return (
              <button
                key={goal.id}
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, fitnessGoal: goal.id }))}
                className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                  formData.fitnessGoal === goal.id
                    ? 'border-[#8B5CF6] bg-[#8B5CF6]/10'
                    : 'border-[#334155] bg-[#1E293B] hover:border-[#475569]'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon className={`w-6 h-6 ${
                    formData.fitnessGoal === goal.id ? 'text-[#8B5CF6]' : 'text-gray-400'
                  }`} />
                  <span className={`font-medium ${
                    formData.fitnessGoal === goal.id ? 'text-white' : 'text-gray-300'
                  }`}>
                    {goal.label}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
        {errors.fitnessGoal && (
          <p className="mt-2 text-sm text-red-400 flex items-center">
            <AlertCircle size={14} className="mr-1" />
            {errors.fitnessGoal}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-3">What's your fitness experience level?</label>
        <div className="space-y-3">
          {experienceLevels.map((level) => (
            <button
              key={level.id}
              type="button"
              onClick={() => setFormData(prev => ({ ...prev, experienceLevel: level.id }))}
              className={`w-full p-4 rounded-lg border-2 transition-all duration-200 text-left ${
                formData.experienceLevel === level.id
                  ? 'border-[#8B5CF6] bg-[#8B5CF6]/10'
                  : 'border-[#334155] bg-[#1E293B] hover:border-[#475569]'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className={`font-medium ${
                    formData.experienceLevel === level.id ? 'text-white' : 'text-gray-300'
                  }`}>
                    {level.label}
                  </div>
                  <div className="text-sm text-gray-500">{level.description}</div>
                </div>
                {formData.experienceLevel === level.id && (
                  <CheckCircle className="text-[#8B5CF6]" size={20} />
                )}
              </div>
            </button>
          ))}
        </div>
        {errors.experienceLevel && (
          <p className="mt-2 text-sm text-red-400 flex items-center">
            <AlertCircle size={14} className="mr-1" />
            {errors.experienceLevel}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Age</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleInputChange}
            className={`w-full px-4 py-3 bg-[#1E293B] border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
              errors.age 
                ? 'border-red-500 focus:ring-red-500' 
                : 'border-[#334155] focus:ring-[#8B5CF6] focus:border-[#8B5CF6]'
            } text-white placeholder-gray-500`}
            placeholder="25"
            min="13"
            max="100"
          />
          {errors.age && (
            <p className="mt-1 text-sm text-red-400 flex items-center">
              <AlertCircle size={14} className="mr-1" />
              {errors.age}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Weight (kg)</label>
          <input
            type="number"
            name="weight"
            value={formData.weight}
            onChange={handleInputChange}
            className={`w-full px-4 py-3 bg-[#1E293B] border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
              errors.weight 
                ? 'border-red-500 focus:ring-red-500' 
                : 'border-[#334155] focus:ring-[#8B5CF6] focus:border-[#8B5CF6]'
            } text-white placeholder-gray-500`}
            placeholder="70"
            min="30"
            max="300"
          />
          {errors.weight && (
            <p className="mt-1 text-sm text-red-400 flex items-center">
              <AlertCircle size={14} className="mr-1" />
              {errors.weight}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Height (cm)</label>
          <input
            type="number"
            name="height"
            value={formData.height}
            onChange={handleInputChange}
            className={`w-full px-4 py-3 bg-[#1E293B] border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
              errors.height 
                ? 'border-red-500 focus:ring-red-500' 
                : 'border-[#334155] focus:ring-[#8B5CF6] focus:border-[#8B5CF6]'
            } text-white placeholder-gray-500`}
            placeholder="175"
            min="100"
            max="250"
          />
          {errors.height && (
            <p className="mt-1 text-sm text-red-400 flex items-center">
              <AlertCircle size={14} className="mr-1" />
              {errors.height}
            </p>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F172A] to-[#1E293B] flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-[#8B5CF6] to-[#F472B6] rounded-xl flex items-center justify-center mr-3">
              <Dumbbell className="text-white" size={24} />
            </div>
            <h1 className="text-3xl font-bold text-white">FitnessTracker Pro</h1>
          </div>
          <p className="text-gray-400">Join thousands of users on their fitness journey</p>
        </div>

        {/* Progress indicator */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center space-x-4">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              currentStep >= 1 ? 'bg-[#8B5CF6]' : 'bg-[#334155]'
            }`}>
              <span className="text-sm font-medium text-white">1</span>
            </div>
            <div className={`w-16 h-1 rounded ${
              currentStep >= 2 ? 'bg-[#8B5CF6]' : 'bg-[#334155]'
            }`}></div>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              currentStep >= 2 ? 'bg-[#8B5CF6]' : 'bg-[#334155]'
            }`}>
              <span className="text-sm font-medium text-white">2</span>
            </div>
          </div>
        </div>

        {/* Form container */}
        <div className="bg-gradient-to-br from-[#1E293B] to-[#0F172A] rounded-2xl shadow-2xl border border-[#334155] p-8">
          {currentStep === 1 ? renderStep1() : renderStep2()}

          {/* Navigation buttons */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-[#334155]">
            {currentStep > 1 && (
              <button
                type="button"
                onClick={() => setCurrentStep(currentStep - 1)}
                className="px-6 py-3 text-gray-400 hover:text-white transition-colors"
              >
                Back
              </button>
            )}
            <button
              type="button"
              onClick={handleNext}
              className="ml-auto px-8 py-3 bg-gradient-to-r from-[#8B5CF6] to-[#F472B6] text-white font-medium rounded-lg hover:shadow-lg hover:shadow-[#8B5CF6]/25 transition-all duration-200 flex items-center space-x-2"
            >
              <span>{currentStep === 1 ? 'Next' : 'Create Account'}</span>
              <ArrowRight size={20} />
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-gray-500 text-sm">
            Already have an account?{' '}
            <button 
              onClick={onSwitchToSignIn}
              className="text-[#8B5CF6] hover:text-[#F472B6] transition-colors font-medium"
            >
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage; 