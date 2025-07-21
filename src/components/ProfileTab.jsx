import React, { useState } from 'react';
import { 
  User, 
  Settings, 
  Edit, 
  Camera, 
  ChevronRight, 
  Calendar, 
  Heart, 
  Clock, 
  Activity, 
  LineChart, 
  BarChart3,
  Moon,
  Bell,
  BookOpen,
  LogOut,
  Upload,
  Ruler,
  ChevronDown,
  PlusCircle,
  Save,
  AlertTriangle
} from 'lucide-react';
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import {
  userProfile,
  bodyMeasurements,
  progressPhotos,
  healthMetrics,
  goalPreferences,
  timePreferences,
  daysOfWeek,
  workoutLengthOptions,
  measurementProgressData
} from './profileData.js';

const ProfileTab = () => {
  const [activeView, setActiveView] = useState('profile');
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [editProfile, setEditProfile] = useState(false);
  const [editMeasurements, setEditMeasurements] = useState(false);
  const [measurementTimeframe, setMeasurementTimeframe] = useState('6months');
  const [metricType, setMetricType] = useState('weight');
  
  // Format date to readable string
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };
  
  // Group photos by date
  const photosByDate = progressPhotos.reduce((acc, photo) => {
    if (!acc[photo.date]) {
      acc[photo.date] = [];
    }
    acc[photo.date].push(photo);
    return acc;
  }, {});
  
  // Handle photo selection
  const handlePhotoSelect = (photo) => {
    setSelectedPhoto(photo);
  };
  
  // Close photo details
  const closePhotoDetails = () => {
    setSelectedPhoto(null);
  };
  
  // Calculate weight change
  const calculateWeightChange = () => {
    const history = bodyMeasurements.history;
    if (history.length < 2) return { value: 0, percentage: 0 };
    
    const current = history[0].weight;
    const previous = history[history.length - 1].weight;
    const difference = previous - current;
    const percentage = ((difference / previous) * 100).toFixed(1);
    
    return {
      value: difference.toFixed(1),
      percentage: percentage
    };
  };
  
  const weightChange = calculateWeightChange();

  return (
    <div className="container mx-auto max-w-7xl">
      {/* Page header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-white">Profile</h2>
          <p className="text-gray-400">Manage your account, measurements, and health metrics</p>
        </div>
        <button className="mt-4 md:mt-0 flex items-center justify-center px-4 py-2 bg-[#8B5CF6] text-white rounded-lg hover:bg-[#7C3AED] transition-colors">
          <Settings size={18} className="mr-2" />
          <span>Settings</span>
        </button>
      </div>

      {/* Tab navigation */}
      <div className="bg-[#1E293B] rounded-lg mb-6 p-1 flex space-x-1">
        <button 
          onClick={() => setActiveView('profile')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${activeView === 'profile' ? 'bg-[#0F172A] text-white' : 'text-gray-400 hover:text-white'}`}
        >
          Personal Info
        </button>
        {/* <button 
          onClick={() => setActiveView('measurements')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${activeView === 'measurements' ? 'bg-[#0F172A] text-white' : 'text-gray-400 hover:text-white'}`}
        >
          Measurements
        </button> */}
        {/* <button 
          onClick={() => setActiveView('photos')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${activeView === 'photos' ? 'bg-[#0F172A] text-white' : 'text-gray-400 hover:text-white'}`}
        >
          Progress Photos
        </button>
        <button 
          onClick={() => setActiveView('health')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${activeView === 'health' ? 'bg-[#0F172A] text-white' : 'text-gray-400 hover:text-white'}`}
        >
          Health Metrics
        </button> */}
      </div>

      {/* Personal Info View */}
      {activeView === 'profile' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-[#1E293B] to-[#0F172A] rounded-xl shadow-lg border border-[#334155] p-5 mb-6">
              <div className="flex flex-col items-center mb-6">
                <div className="relative mb-4">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#8B5CF6] to-[#6D28D9] flex items-center justify-center text-white text-3xl font-semibold">
                    {userProfile.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <button className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-[#8B5CF6] flex items-center justify-center text-white shadow-lg">
                    <Edit size={14} />
                  </button>
                </div>
                <h3 className="text-xl font-bold text-white">{userProfile.name}</h3>
                <p className="text-gray-400">{userProfile.email}</p>
                
                <div className="mt-3 px-3 py-1 bg-[#8B5CF6]/20 text-[#8B5CF6] text-xs font-medium rounded-full">
                  {userProfile.plan} Plan
                </div>
              </div>
              
              <div className="border-t border-[#334155] pt-4 mb-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm">Member since</span>
                  <span className="text-white text-sm">{formatDate(userProfile.joinDate)}</span>
                </div>
              </div>
              
              <div className="space-y-4">
                <button className="w-full py-2 border border-[#334155] text-[#8B5CF6] rounded-lg hover:bg-[#8B5CF6]/10 transition-colors flex items-center justify-center">
                  <Bell size={16} className="mr-2" />
                  <span>Notification Settings</span>
                </button>
                <button className="w-full py-2 border border-[#334155] text-[#8B5CF6] rounded-lg hover:bg-[#8B5CF6]/10 transition-colors flex items-center justify-center">
                  <BookOpen size={16} className="mr-2" />
                  <span>Privacy Policy</span>
                </button>
                <button className="w-full py-2 border border-red-500/30 text-red-400 rounded-lg hover:bg-red-500/10 transition-colors flex items-center justify-center">
                  <LogOut size={16} className="mr-2" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          </div>
          
          {/* Personal Information */}
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-br from-[#1E293B] to-[#0F172A] rounded-xl shadow-lg border border-[#334155] p-5 mb-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-white">Personal Information</h3>
                <button 
                  onClick={() => setEditProfile(!editProfile)}
                  className="text-[#8B5CF6] flex items-center text-sm font-medium"
                >
                  {editProfile ? (
                    <>
                      <Save size={16} className="mr-1" />
                      <span>Save Changes</span>
                    </>
                  ) : (
                    <>
                      <Edit size={16} className="mr-1" />
                      <span>Edit Profile</span>
                    </>
                  )}
                </button>
              </div>
              
              {editProfile ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-400 mb-1">Full Name</label>
                      <input 
                        type="text" 
                        className="w-full bg-[#0F172A] border border-[#334155] text-white rounded-lg py-2 px-4 focus:outline-none focus:ring-1 focus:ring-[#8B5CF6] focus:border-[#8B5CF6]"
                        defaultValue={userProfile.name}
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-1">Email</label>
                      <input 
                        type="email" 
                        className="w-full bg-[#0F172A] border border-[#334155] text-white rounded-lg py-2 px-4 focus:outline-none focus:ring-1 focus:ring-[#8B5CF6] focus:border-[#8B5CF6]"
                        defaultValue={userProfile.email}
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-400 mb-1">Age</label>
                      <input 
                        type="number" 
                        className="w-full bg-[#0F172A] border border-[#334155] text-white rounded-lg py-2 px-4 focus:outline-none focus:ring-1 focus:ring-[#8B5CF6] focus:border-[#8B5CF6]"
                        defaultValue={userProfile.age}
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-1">Gender</label>
                      <select className="w-full bg-[#0F172A] border border-[#334155] text-white rounded-lg py-2 px-4 focus:outline-none focus:ring-1 focus:ring-[#8B5CF6] focus:border-[#8B5CF6]">
                        <option value="male" selected={userProfile.gender === 'Male'}>Male</option>
                        <option value="female" selected={userProfile.gender === 'Female'}>Female</option>
                        <option value="other" selected={userProfile.gender === 'Other'}>Other</option>
                        <option value="prefer-not-to-say" selected={userProfile.gender === 'Prefer not to say'}>Prefer not to say</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Preferred Units</label>
                    <div className="flex space-x-4">
                      <label className="flex items-center">
                        <input 
                          type="radio" 
                          name="units" 
                          className="w-4 h-4 mr-2 accent-[#8B5CF6]" 
                          defaultChecked={userProfile.appSettings.units === 'metric'}
                        />
                        <span className="text-white">Metric (kg, cm)</span>
                      </label>
                      <label className="flex items-center">
                        <input 
                          type="radio" 
                          name="units" 
                          className="w-4 h-4 mr-2 accent-[#8B5CF6]" 
                          defaultChecked={userProfile.appSettings.units === 'imperial'}
                        />
                        <span className="text-white">Imperial (lbs, inches)</span>
                      </label>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-gray-400 mb-1">Full Name</p>
                        <p className="text-white">{userProfile.name}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400 mb-1">Email</p>
                        <p className="text-white">{userProfile.email}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400 mb-1">Age</p>
                        <p className="text-white">{userProfile.age}</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-gray-400 mb-1">Gender</p>
                        <p className="text-white">{userProfile.gender}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400 mb-1">Preferred Units</p>
                        <p className="text-white capitalize">{userProfile.appSettings.units}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400 mb-1">Plan Expiration</p>
                        <p className="text-white">{formatDate(userProfile.planExpiration)}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="bg-gradient-to-br from-[#1E293B] to-[#0F172A] rounded-xl shadow-lg border border-[#334155] p-5">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-white">Workout Preferences</h3>
              </div>
              
              <div className="space-y-6">
                <div>
                  <p className="text-sm text-gray-400 mb-3">Primary Goal</p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {goalPreferences.map((goal) => {
                      const isSelected = userProfile.preferences.primaryGoal === goal.id;
                      return (
                        <div 
                          key={goal.id}
                          className={`p-3 rounded-lg border cursor-pointer transition-colors ${isSelected ? 'bg-[#8B5CF6]/20 border-[#8B5CF6]' : 'bg-[#0F172A] border-[#334155] hover:border-[#8B5CF6]'}`}
                        >
                          <div className="flex flex-col items-center text-center">
                            <span className="text-2xl mb-1">{goal.icon}</span>
                            <span className={`text-sm ${isSelected ? 'text-white' : 'text-gray-400'}`}>{goal.name}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm text-gray-400 mb-3">Preferred Workout Days</p>
                    <div className="flex flex-wrap gap-2">
                      {daysOfWeek.map((day) => {
                        const isSelected = userProfile.preferences.workoutDays.includes(day.id);
                        return (
                          <div 
                            key={day.id}
                            className={`px-3 py-1 rounded-lg border cursor-pointer transition-colors ${isSelected ? 'bg-[#8B5CF6]/20 border-[#8B5CF6] text-white' : 'bg-[#0F172A] border-[#334155] text-gray-400 hover:border-[#8B5CF6]'}`}
                          >
                            {day.shortName}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 mb-3">Preferred Workout Time</p>
                    <div className="space-y-2">
                      {timePreferences.map((time) => {
                        const isSelected = userProfile.preferences.preferredWorkoutTime === time.id;
                        return (
                          <div 
                            key={time.id}
                            className={`px-3 py-2 rounded-lg border cursor-pointer transition-colors ${isSelected ? 'bg-[#8B5CF6]/20 border-[#8B5CF6] text-white' : 'bg-[#0F172A] border-[#334155] text-gray-400 hover:border-[#8B5CF6]'}`}
                          >
                            {time.name}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm text-gray-400 mb-3">Workout Duration</p>
                  <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
                    {workoutLengthOptions.map((option) => {
                      const isSelected = userProfile.preferences.workoutDuration === option.value;
                      return (
                        <div 
                          key={option.value}
                          className={`px-3 py-2 rounded-lg border cursor-pointer transition-colors text-center ${isSelected ? 'bg-[#8B5CF6]/20 border-[#8B5CF6] text-white' : 'bg-[#0F172A] border-[#334155] text-gray-400 hover:border-[#8B5CF6]'}`}
                        >
                          {option.label}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
     {/* Health Metrics View */}
     {activeView === 'health' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Health metrics summary */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-[#1E293B] to-[#0F172A] rounded-xl shadow-lg border border-[#334155] p-5 mb-6">
              <h3 className="text-lg font-semibold text-white mb-6">Current Health Metrics</h3>
              
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <Heart size={16} className="text-[#F472B6] mr-2" />
                      <p className="text-sm font-medium text-white">Resting Heart Rate</p>
                    </div>
                    <p className="text-xl font-semibold text-white">{healthMetrics.restingHeartRate[0].value} <span className="text-gray-400 text-sm">bpm</span></p>
                  </div>
                  <div className="text-xs text-gray-400 mb-1">Normal range: 60-100 bpm</div>
                  <div className="w-full bg-[#334155] rounded-full h-2">
                    <div className="bg-[#F472B6] h-2 rounded-full" style={{ width: `${((healthMetrics.restingHeartRate[0].value - 40) / 100) * 100}%` }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <Activity size={16} className="text-[#8B5CF6] mr-2" />
                      <p className="text-sm font-medium text-white">Blood Pressure</p>
                    </div>
                    <p className="text-xl font-semibold text-white">{healthMetrics.bloodPressure[0].systolic}/{healthMetrics.bloodPressure[0].diastolic} <span className="text-gray-400 text-sm">mmHg</span></p>
                  </div>
                  <div className="text-xs text-gray-400 mb-1">Normal range: 120/80 mmHg</div>
                  <div className="w-full bg-[#334155] rounded-full h-2 mb-1">
                    <div 
                      className={`h-2 rounded-full ${
                        healthMetrics.bloodPressure[0].systolic < 120 && healthMetrics.bloodPressure[0].diastolic < 80
                          ? 'bg-green-500' 
                          : healthMetrics.bloodPressure[0].systolic < 140 && healthMetrics.bloodPressure[0].diastolic < 90
                            ? 'bg-yellow-500' 
                            : 'bg-red-500'
                      }`} 
                      style={{ width: `${((healthMetrics.bloodPressure[0].systolic - 90) / 80) * 100}%` }}
                    ></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <Moon size={16} className="text-[#F59E0B] mr-2" />
                      <p className="text-sm font-medium text-white">Sleep Quality</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-semibold text-white">{healthMetrics.sleepQuality[0].quality}<span className="text-gray-400 text-sm">/100</span></p>
                      <p className="text-xs text-gray-400">{healthMetrics.sleepQuality[0].hours} hours</p>
                    </div>
                  </div>
                  <div className="w-full bg-[#334155] rounded-full h-2 mb-1">
                    <div 
                      className={`h-2 rounded-full ${
                        healthMetrics.sleepQuality[0].quality > 80 ? 'bg-green-500' :
                        healthMetrics.sleepQuality[0].quality > 60 ? 'bg-yellow-500' : 'bg-red-500'
                      }`} 
                      style={{ width: `${healthMetrics.sleepQuality[0].quality}%` }}
                    ></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <Activity size={16} className="text-[#10B981] mr-2" />
                      <p className="text-sm font-medium text-white">Energy Level</p>
                    </div>
                    <p className="text-xl font-semibold text-white">{healthMetrics.energyLevels[0].level}<span className="text-gray-400 text-sm">/10</span></p>
                  </div>
                  <div className="w-full bg-[#334155] rounded-full h-2 mb-1">
                    <div 
                      className="bg-[#10B981] h-2 rounded-full" 
                      style={{ width: `${(healthMetrics.energyLevels[0].level / 10) * 100}%` }}
                    ></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <Activity size={16} className="text-[#F472B6] mr-2" />
                      <p className="text-sm font-medium text-white">Stress Level</p>
                    </div>
                    <p className="text-xl font-semibold text-white">{healthMetrics.stressLevels[0].level}<span className="text-gray-400 text-sm">/10</span></p>
                  </div>
                  <div className="w-full bg-[#334155] rounded-full h-2 mb-1">
                    <div 
                      className={`h-2 rounded-full ${
                        healthMetrics.stressLevels[0].level < 4 ? 'bg-green-500' :
                        healthMetrics.stressLevels[0].level < 7 ? 'bg-yellow-500' : 'bg-red-500'
                      }`} 
                      style={{ width: `${(healthMetrics.stressLevels[0].level / 10) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
              
              <button className="w-full mt-6 py-2 border border-[#334155] text-[#8B5CF6] rounded-lg hover:bg-[#8B5CF6]/10 transition-colors flex items-center justify-center">
                <PlusCircle size={16} className="mr-2" />
                <span>Log New Health Data</span>
              </button>
            </div>
          </div>
          
          {/* Health metrics trends */}
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-br from-[#1E293B] to-[#0F172A] rounded-xl shadow-lg border border-[#334155] p-5 mb-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-white">Resting Heart Rate Trend</h3>
                <div className="relative">
                  <select className="appearance-none bg-[#0F172A] border border-[#334155] text-gray-400 text-sm rounded-lg p-2 pr-8 focus:outline-none focus:ring-1 focus:ring-[#8B5CF6] focus:border-[#8B5CF6]">
                    <option>Last 8 weeks</option>
                    <option>Last 3 months</option>
                    <option>Last 6 months</option>
                  </select>
                  <ChevronDown size={14} className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>
              
              <div className="h-64 mb-4">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={healthMetrics.restingHeartRate}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis 
                      dataKey="date" 
                      tickFormatter={(date) => {
                        const d = new Date(date);
                        return `${d.getDate()}/${d.getMonth()+1}`;
                      }}
                      stroke="#64748B" 
                    />
                    <YAxis stroke="#64748B" domain={['dataMin - 5', 'dataMax + 5']} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1E293B', 
                        borderColor: '#334155',
                        color: 'white'
                      }} 
                      labelStyle={{ color: 'white' }}
                      labelFormatter={(date) => formatDate(date)}
                      formatter={(value) => [`${value} bpm`, 'Heart Rate']}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="value" 
                      stroke="#F472B6" 
                      strokeWidth={2}
                      dot={{ fill: '#F472B6', r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              
              <div className="flex justify-between">
                <div className="text-center p-2 bg-[#0F172A] rounded-lg flex-1 mx-1">
                  <p className="text-xs text-gray-400 mb-1">Average</p>
                  <p className="text-sm font-medium text-white">
                    {Math.round(healthMetrics.restingHeartRate.reduce((acc, item) => acc + item.value, 0) / healthMetrics.restingHeartRate.length)} bpm
                  </p>
                </div>
                <div className="text-center p-2 bg-[#0F172A] rounded-lg flex-1 mx-1">
                  <p className="text-xs text-gray-400 mb-1">Min</p>
                  <p className="text-sm font-medium text-white">
                    {Math.min(...healthMetrics.restingHeartRate.map(item => item.value))} bpm
                  </p>
                </div>
                <div className="text-center p-2 bg-[#0F172A] rounded-lg flex-1 mx-1">
                  <p className="text-xs text-gray-400 mb-1">Max</p>
                  <p className="text-sm font-medium text-white">
                    {Math.max(...healthMetrics.restingHeartRate.map(item => item.value))} bpm
                  </p>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-gradient-to-br from-[#1E293B] to-[#0F172A] rounded-xl shadow-lg border border-[#334155] p-5">
                <h3 className="text-lg font-semibold text-white mb-4">Blood Pressure History</h3>
                
                <div className="space-y-3">
                  {healthMetrics.bloodPressure.map((entry) => (
                    <div key={entry.date} className="flex justify-between items-center p-3 bg-[#0F172A] rounded-lg">
                      <div>
                        <p className="text-xs text-gray-400">{formatDate(entry.date)}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-white">{entry.systolic}/{entry.diastolic} <span className="text-xs text-gray-400">mmHg</span></p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-[#1E293B] to-[#0F172A] rounded-xl shadow-lg border border-[#334155] p-5">
                <h3 className="text-lg font-semibold text-white mb-4">Sleep Quality</h3>
                
                <div className="h-48 mb-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={healthMetrics.sleepQuality}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                      <XAxis 
                        dataKey="date" 
                        tickFormatter={(date) => {
                          const d = new Date(date);
                          return `${d.getDate()}/${d.getMonth()+1}`;
                        }}
                        stroke="#64748B" 
                      />
                      <YAxis stroke="#64748B" domain={[0, 100]} />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#1E293B', 
                          borderColor: '#334155',
                          color: 'white'
                        }} 
                        labelStyle={{ color: 'white' }}
                        labelFormatter={(date) => formatDate(date)}
                        formatter={(value, name) => [
                          name === 'quality' ? `${value}/100` : `${value} hours`,
                          name === 'quality' ? 'Quality' : 'Hours'
                        ]}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="quality" 
                        stroke="#F59E0B" 
                        fill="#F59E0B" 
                        fillOpacity={0.2} 
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-[#1E293B] to-[#0F172A] rounded-xl shadow-lg border border-[#334155] p-5">
              <h3 className="text-lg font-semibold text-white mb-4">Health Insights</h3>
              
              <div className="space-y-4">
                <div className="p-4 bg-[#0F172A] rounded-lg">
                  <div className="flex items-start">
                    <Heart size={20} className="text-[#F472B6] mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="text-sm font-medium text-white mb-1">Improved Resting Heart Rate</h4>
                      <p className="text-xs text-gray-400">Your resting heart rate has decreased by 7 bpm over the last 3 months, indicating improved cardiovascular fitness.</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 bg-[#0F172A] rounded-lg">
                  <div className="flex items-start">
                    <Moon size={20} className="text-[#F59E0B] mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="text-sm font-medium text-white mb-1">Sleep Pattern Inconsistency</h4>
                      <p className="text-xs text-gray-400">Your sleep duration has varied significantly over the past week. Aim for consistent sleep and wake times to improve overall sleep quality.</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 bg-[#0F172A] rounded-lg">
                  <div className="flex items-start">
                    <Activity size={20} className="text-[#8B5CF6] mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="text-sm font-medium text-white mb-1">Blood Pressure Trend</h4>
                      <p className="text-xs text-gray-400">Your blood pressure readings are showing a positive downward trend, now within the normal range. Continue with your current exercise and dietary habits.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Photo detail modal */}
      {selectedPhoto && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/80 p-4">
          <div className="bg-[#1E293B] rounded-xl shadow-xl border border-[#334155] w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold text-white capitalize">{selectedPhoto.category} View</h3>
                  <p className="text-sm text-gray-400">{formatDate(selectedPhoto.date)}</p>
                </div>
                <button 
                  onClick={closePhotoDetails}
                  className="text-gray-400 hover:text-white transition-colors text-xl"
                >
                  &times;
                </button>
              </div>
              
              <div className="mb-6">
                <div className="h-96 bg-gradient-to-br from-[#1E293B] to-[#0F172A] rounded-lg flex items-center justify-center">
                  {/* Placeholder for actual photo */}
                  <div className="text-center">
                    <User size={96} className="text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-500">Progress photo preview</p>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between pt-6 border-t border-[#334155]">
                <div>
                  <button className="py-2 px-4 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors">
                    Delete Photo
                  </button>
                </div>
                <div>
                  <button 
                    onClick={closePhotoDetails}
                    className="py-2 px-4 border border-[#334155] text-gray-400 rounded-lg hover:bg-[#1E293B] transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileTab; 