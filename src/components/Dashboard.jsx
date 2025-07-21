import React, { useState, useEffect } from 'react';
import { 
  Activity, 
  BarChart3, 
  Heart, 
  Calendar, 
  User, 
  Moon, 
  Bell, 
  Droplets, 
  Dumbbell, 
  Trophy, 
  CircleEllipsis,
  Settings,
  ChevronRight,
  LogOut,
  Watch,
  Wifi,
  WifiOff,
  Battery,
  Signal,
  Palette,
  MessageCircle
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { 
  activityData, 
  dailyMetrics, 
  workoutHistory, 
  nutritionData, 
  macroBreakdown,
  goalsAndChallenges,
  bodyMetrics,
  userInfo
} from './data.js';
import { useTheme } from '../context/ThemeContext';
import ThemeCustomizer from './ThemeCustomizer';
import FitnessChatbot from './FitnessChatbot';

// Import tab components
import WorkoutsTab from './WorkoutsTab';
import NutritionTab from './NutritionTab';
import GoalsTab from './GoalsDashboard.jsx';
import ProfileTab from './ProfileTab.jsx';

const Dashboard = ({ onSignOut, userData, connectedDevice }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [metrics, setMetrics] = useState(dailyMetrics);
  const [isDeviceConnected, setIsDeviceConnected] = useState(!!connectedDevice);
  const [deviceStatus, setDeviceStatus] = useState(connectedDevice ? 'connected' : 'disconnected');
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [showThemeCustomizer, setShowThemeCustomizer] = useState(false);
  const [showChatbot, setShowChatbot] = useState(false);
  
  const { currentTheme, changeTheme } = useTheme();

  // Simulate real-time updates when device is connected
  useEffect(() => {
    let interval;
    
    if (isDeviceConnected && connectedDevice) {
      interval = setInterval(() => {
        try {
          setMetrics(prev => ({
            ...prev,
            steps: {
              ...prev.steps,
              current: prev.steps.current + Math.floor(Math.random() * 10)
            },
            heartRate: {
              ...prev.heartRate,
              current: 65 + Math.floor(Math.random() * 20)
            }
          }));
          setLastUpdate(new Date());
        } catch (error) {
          console.error('Error updating metrics:', error);
        }
      }, 5000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isDeviceConnected, connectedDevice]);

  // Simulate device connection status changes
  useEffect(() => {
    let deviceInterval;
    
    if (connectedDevice) {
      deviceInterval = setInterval(() => {
        try {
          setDeviceStatus(prev => {
            if (Math.random() > 0.95) { // 5% chance of disconnection
              setIsDeviceConnected(false);
              return 'disconnected';
            }
            return 'connected';
          });
        } catch (error) {
          console.error('Error updating device status:', error);
        }
      }, 30000);
    }

    return () => {
      if (deviceInterval) clearInterval(deviceInterval);
    };
  }, [connectedDevice]);

  const { steps, calories, water, heartRate, sleep, activeMinutes } = metrics;

  // Calculate percentages for progress rings
  const stepsPercentage = Math.min(Math.round((steps.current / steps.goal) * 100), 100);
  const caloriesPercentage = Math.min(Math.round((calories.burned / calories.goal) * 100), 100);
  const waterPercentage = Math.min(Math.round((water.intake / water.goal) * 100), 100);

  // Render the appropriate tab content based on activeTab
  const renderTabContent = () => {
    try {
      switch(activeTab) {
        case 'workouts':
          return <WorkoutsTab />;
        case 'nutrition':
          return <NutritionTab />;
        case 'goals':
          return <GoalsTab />;
        case 'profile':
          return <ProfileTab />;
        default:
          return renderOverviewTab();
      }
    } catch (error) {
      console.error('Error rendering tab content:', error);
      return <div className="text-center text-red-400">Error loading content</div>;
    }
  };

  const getDeviceStatusIcon = () => {
    if (!connectedDevice) return null;
    
    switch (deviceStatus) {
      case 'connected':
        return <Wifi className="text-green-400" size={16} />;
      case 'disconnected':
        return <WifiOff className="text-red-400" size={16} />;
      default:
        return <Wifi className="text-gray-400" size={16} />;
    }
  };

  const getBatteryColor = (battery) => {
    if (!battery) return 'text-gray-400';
    if (battery > 80) return 'text-green-400';
    if (battery > 50) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getSignalIcon = (signal) => {
    if (!signal) return <Signal className="text-gray-400" size={16} />;
    
    switch (signal) {
      case 'strong':
        return <Signal className="text-green-400" size={16} />;
      case 'medium':
        return <Signal className="text-yellow-400" size={16} />;
      case 'weak':
        return <Signal className="text-red-400" size={16} />;
      default:
        return <Signal className="text-gray-400" size={16} />;
    }
  };

  const formatLastUpdate = (date) => {
    try {
      const now = new Date();
      const diff = Math.floor((now - date) / 1000);
      if (diff < 60) return 'Just now';
      if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
      return `${Math.floor(diff / 3600)}h ago`;
    } catch (error) {
      return 'Unknown';
    }
  };

  // Overview tab content (existing dashboard layout)
  const renderOverviewTab = () => {
    return (
      <div className="container mx-auto max-w-7xl">
        {/* Date selector and welcome message */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-white">Dashboard</h2>
            <p className="text-gray-400">Welcome back, {userInfo.name}! Here's your fitness summary.</p>
          </div>
          {/* <div className="mt-4 md:mt-0 flex items-center space-x-2 bg-[#1E293B] rounded-lg px-4 py-2 border border-[#334155] shadow-sm">
            <Calendar size={18} className="text-[#8B5CF6]" />
            <span className="text-sm font-medium text-gray-300">March 28, 2025</span>
            <button className="ml-2 text-gray-400 hover:text-gray-300">
              <CircleEllipsis size={18} />
            </button>
          </div> */}
        </div>

        {/* Top metrics row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Steps card */}
          <div className="bg-gradient-to-br from-[#2a7e35] to-[#0F172A] rounded-xl shadow-lg border border-[#334155] p-5 hover:shadow-[0_8px_30px_rgba(139,92,246,0.15)] transition-shadow duration-300">
            <div className="flex items-center justify-between mb-4">
              <div>
                                <div className="flex items-center space-x-2">
                  <p className="text-sm font-medium text-gray-400">Daily Steps</p>
                  {isDeviceConnected && (
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  )}
                </div>
                <h3 className="text-2xl font-bold text-white">{steps.current.toLocaleString()}</h3>
              </div>
              <div className="relative w-16 h-16">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  <circle cx="18" cy="18" r="16" fill="none" className="stroke-[#334155]" strokeWidth="3"></circle>
                  <circle 
                    cx="18" cy="18" r="16" 
                    fill="none" 
                    strokeWidth="3" 
                    strokeDasharray={`${stepsPercentage} 100`}
                    strokeLinecap="round"
                    style={{ stroke: currentTheme.colors.primary }}
                  ></circle>
                </svg>
                <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                  <span className="text-xs font-medium text-white">{stepsPercentage}%</span>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-400">Goal: {steps.goal.toLocaleString()}</span>
              <span className={`font-medium ${stepsPercentage >= 75 ? 'text-green-400' : stepsPercentage >= 50 ? 'text-yellow-400' : 'text-red-400'}`}>
                {stepsPercentage >= 100 ? 'Completed!' : `${steps.goal - steps.current} to go`}
              </span>
            </div>
          </div>

          {/* Calories card */}
          <div className="bg-gradient-to-br from-[#2a7e35] to-[#0F172A] rounded-xl shadow-lg border border-[#334155] p-5 hover:shadow-[0_8px_30px_rgba(244,114,182,0.15)] transition-shadow duration-300">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm font-medium text-gray-400">Calories Burned</p>
                <h3 className="text-2xl font-bold text-white">{calories.burned}</h3>
              </div>
              <div className="relative w-16 h-16">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  <circle cx="18" cy="18" r="16" fill="none" className="stroke-[#334155]" strokeWidth="3"></circle>
                  <circle 
                    cx="18" cy="18" r="16" 
                    fill="none" 
                    strokeWidth="3" 
                    strokeDasharray={`${caloriesPercentage} 100`}
                    strokeLinecap="round"
                    style={{ stroke: currentTheme.colors.secondary }}
                  ></circle>
                </svg>
                <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                  <span className="text-xs font-medium text-white">{caloriesPercentage}%</span>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-400">Goal: {calories.goal} kcal</span>
              <span className={`font-medium ${caloriesPercentage >= 75 ? 'text-green-400' : caloriesPercentage >= 50 ? 'text-yellow-400' : 'text-red-400'}`}>
                {caloriesPercentage >= 100 ? 'Completed!' : `${calories.goal - calories.burned} to go`}
              </span>
            </div>
          </div>

          {/* Heart rate card */}
          <div className="bg-gradient-to-br from-[#2a7e35] to-[#0F172A] rounded-xl shadow-lg border border-[#334155] p-5 hover:shadow-[0_8px_30px_rgba(244,114,182,0.15)] transition-shadow duration-300">
            <div className="flex items-center justify-between mb-4">
              <div>
                                <div className="flex items-center space-x-2">
                  <p className="text-sm font-medium text-gray-400">Heart Rate</p>
                  {isDeviceConnected && (
                    <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
                  )}
                </div>
                <h3 className="text-2xl font-bold text-white">
                  {heartRate.current} 
                  <span className="text-sm text-gray-400 font-normal"> bpm</span>
                </h3>
              </div>
                              <div className="w-16 h-16 flex items-center justify-center">
                  <Heart className={`w-10 h-10 ${isDeviceConnected ? 'text-[#F472B6] animate-pulse' : heartRate.current > 100 ? 'text-red-400' : heartRate.current > 80 ? 'text-yellow-400' : 'text-green-400'}`} />
                </div>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-400">Resting: {heartRate.average} bpm</span>
              <span className={`font-medium ${heartRate.current > 100 ? 'text-red-400' : heartRate.current > 80 ? 'text-yellow-400' : 'text-green-400'}`}>
                {heartRate.current > 100 ? 'High' : heartRate.current > 80 ? 'Elevated' : 'Normal'}
              </span>
            </div>
          </div>
        </div>

        {/* Main content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Left column - Activity chart */}
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-br from-[#1E293B] to-[#0F172A] rounded-xl shadow-lg border border-[#334155] p-5 mb-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-white">Weekly Activity</h3>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <span className="w-3 h-3 rounded-full bg-[#8B5CF6] mr-2"></span>
                    <span className="text-xs text-gray-400">Steps</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-3 h-3 rounded-full bg-[#F472B6] mr-2"></span>
                    <span className="text-xs text-gray-400">Calories</span>
                  </div>
                </div>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={activityData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis dataKey="name" tick={{fontSize: 12}} stroke="#64748B" />
                    <YAxis yAxisId="left" stroke="#7DFF8A" tickFormatter={(value) => `${value}`} tick={{fontSize: 12}} />
                    <YAxis yAxisId="right" orientation="right" stroke="#FFB703" tickFormatter={(value) => `${value}`} tick={{fontSize: 12}} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1E293B', 
                        borderColor: '#334155',
                        color: 'white'
                      }} 
                      labelStyle={{ color: 'white' }}
                    />
                    <Line yAxisId="left" type="monotone" dataKey="steps" stroke="#7DFF8A" strokeWidth={3} dot={{ fill: '#8B5CF6', r: 5 }} activeDot={{ r: 7 }} />
                    <Line yAxisId="right" type="monotone" dataKey="calories" stroke="#FFB703" strokeWidth={3} dot={{ fill: '#F472B6', r: 5 }} activeDot={{ r: 7 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Recent workouts */}
            <div className="bg-gradient-to-br from-[#1E293B] to-[#0F172A] rounded-xl shadow-lg border border-[#334155] p-5">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-white">Recent Workouts</h3>
                <button 
                  className="text-sm font-medium text-[#8B5CF6] hover:text-[#A78BFA] transition-colors"
                  onClick={() => setActiveTab('workouts')}
                >
                  See All
                </button>
              </div>
              <div className="space-y-4">
                {workoutHistory.map((workout) => (
                  <div key={workout.id} className="flex items-center justify-between p-3 bg-[#1E293B]/70 rounded-lg border border-[#334155]">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 ${workout.completed ? 'bg-[#8B5CF6]/20' : 'bg-yellow-500/20'} rounded-lg`}>
                        <Dumbbell className={workout.completed ? 'text-[#8B5CF6]' : 'text-yellow-500'} size={18} />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">{workout.type}</p>
                        <p className="text-xs text-gray-400">{workout.duration} · {workout.calories} kcal</p>
                      </div>
                    </div>
                    <span className={`text-xs font-medium px-3 py-1 rounded-full ${workout.completed ? 'bg-[#8B5CF6]/20 text-[#8B5CF6]' : 'bg-yellow-500/20 text-yellow-500'}`}>
                      {workout.completed ? 'Completed' : 'Scheduled'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right column - Body visualization and metrics */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-[#1E293B] to-[#0F172A] rounded-xl shadow-lg border border-[#334155] p-5 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">Body Metrics</h3>
                <div className="flex space-x-1">
                  <button className="px-2 py-1 text-xs rounded-md bg-[#8B5CF6] text-white">Body</button>
                  <button className="px-2 py-1 text-xs rounded-md bg-[#1E293B] text-gray-400 hover:bg-[#334155] transition-colors">Stats</button>
                </div>
              </div>
              
              {/* Body visualization */}
              
              
              {/* Body stats */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Weight</span>
                  <div className="text-right">
                    <span className="text-sm font-semibold text-white">{bodyMetrics.weight.current} {bodyMetrics.weight.unit}</span>
                    <span className="text-xs text-green-400 ml-2">-0.8</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Height</span>
                  <span className="text-sm font-semibold text-white">{bodyMetrics.height.value} {bodyMetrics.height.unit}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">BMI</span>
                  <div className="text-right">
                    <span className="text-sm font-semibold text-white">{bodyMetrics.bmi.value}</span>
                    <span className="text-xs text-gray-400 ml-2">({bodyMetrics.bmi.category})</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Body Fat</span>
                  <span className="text-sm font-semibold text-white">{bodyMetrics.bodyFat.value}{bodyMetrics.bodyFat.unit}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Muscle Mass</span>
                  <span className="text-sm font-semibold text-white">{bodyMetrics.muscleMass.value}{bodyMetrics.muscleMass.unit}</span>
                </div>
              </div>
            </div>
            
            {/* Water intake */}
            <div className="bg-gradient-to-br from-[#1E293B] to-[#0F172A] rounded-xl shadow-lg border border-[#334155] p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">Water Intake</h3>
                <button className="text-[#0EA5E9] bg-[#0EA5E9]/20 p-2 rounded-lg">
                  <Droplets size={16} />
                </button>
              </div>
              
              <div className="flex items-center justify-center mb-4">
                <div className="relative w-32 h-32">
                  <svg className="w-full h-full" viewBox="0 0 100 100">
                    <circle 
                      cx="50" cy="50" r="45" 
                      fill="none" 
                      stroke="#334155" 
                      strokeWidth="8"
                    />
                    <circle 
                      cx="50" cy="50" r="45" 
                      fill="none" 
                      stroke="#0EA5E9" 
                      strokeWidth="8" 
                      strokeDasharray={`${waterPercentage} 100`} 
                      strokeLinecap="round"
                      transform="rotate(-90 50 50)"
                    />
                  </svg>
                  <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center">
                    <span className="text-2xl font-bold text-white">{water.intake}L</span>
                    <span className="text-xs text-gray-400">of {water.goal}L</span>
                  </div>
                </div>
              </div>
              
              
            </div>
          </div>
        </div>

        {/* Nutrition tracker */}
        <div className="bg-gradient-to-br from-[#1E293B] to-[#0F172A] rounded-xl shadow-lg border border-[#334155] p-5 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">Today's Nutrition</h3>
            {/* <button className="text-sm font-medium text-[#8B5CF6] hover:text-[#A78BFA] transition-colors flex items-center">
              <span>Add Meal</span>
              <ChevronRight size={16} className="ml-1" />
            </button> */}
          </div>
          
          <div className="space-y-4">
            {nutritionData.map((meal) => (
              <div key={meal.id} className="flex items-center justify-between p-4 bg-[#1E293B]/70 rounded-lg border border-[#334155]">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-lg bg-[#8B5CF6]/20 flex items-center justify-center text-xl">
                    {meal.icon}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">{meal.meal}</p>
                    <p className="text-xs text-gray-400">{meal.food}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-white">{meal.calories} kcal</p>
                  <p className="text-xs text-gray-400">{meal.protein}g protein · {meal.time}</p>
                </div>
              </div>
            ))}
            
            {/* Macro breakdown */}
            <div className="mt-6 pt-6 border-t border-[#334155]">
              <h4 className="text-sm font-semibold text-white mb-4">Macro Breakdown</h4>
              <div className="grid grid-cols-4 gap-4">
                <div className="flex flex-col">
                  <span className="text-xs text-gray-400 mb-1">Protein</span>
                  <div className="w-full bg-[#334155] rounded-full h-1.5 mb-1">
                    <div className="bg-[#8B5CF6] h-1.5 rounded-full" 
                      style={{ width: `${(macroBreakdown.protein.amount / macroBreakdown.protein.goal) * 100}%` }}>
                    </div>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-white font-medium">{macroBreakdown.protein.amount}{macroBreakdown.protein.unit}</span>
                    <span className="text-gray-400">{macroBreakdown.protein.goal}{macroBreakdown.protein.unit}</span>
                  </div>
                </div>
                
                <div className="flex flex-col">
                  <span className="text-xs text-gray-400 mb-1">Carbs</span>
                  <div className="w-full bg-[#334155] rounded-full h-1.5 mb-1">
                    <div className="bg-[#F472B6] h-1.5 rounded-full" 
                      style={{ width: `${(macroBreakdown.carbs.amount / macroBreakdown.carbs.goal) * 100}%` }}>
                    </div>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-white font-medium">{macroBreakdown.carbs.amount}{macroBreakdown.carbs.unit}</span>
                    <span className="text-gray-400">{macroBreakdown.carbs.goal}{macroBreakdown.carbs.unit}</span>
                  </div>
                </div>
                
                <div className="flex flex-col">
                  <span className="text-xs text-gray-400 mb-1">Fat</span>
                  <div className="w-full bg-[#334155] rounded-full h-1.5 mb-1">
                    <div className="bg-[#FBBF24] h-1.5 rounded-full" 
                      style={{ width: `${(macroBreakdown.fat.amount / macroBreakdown.fat.goal) * 100}%` }}>
                    </div>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-white font-medium">{macroBreakdown.fat.amount}{macroBreakdown.fat.unit}</span>
                    <span className="text-gray-400">{macroBreakdown.fat.goal}{macroBreakdown.fat.unit}</span>
                  </div>
                </div>
                
                <div className="flex flex-col">
                  <span className="text-xs text-gray-400 mb-1">Water</span>
                  <div className="w-full bg-[#334155] rounded-full h-1.5 mb-1">
                    <div className="bg-[#0EA5E9] h-1.5 rounded-full" 
                      style={{ width: `${(macroBreakdown.water.amount / macroBreakdown.water.goal) * 100}%` }}>
                    </div>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-white font-medium">{macroBreakdown.water.amount}{macroBreakdown.water.unit}</span>
                    <span className="text-gray-400">{macroBreakdown.water.goal}{macroBreakdown.water.unit}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Goals and challenges */}
        <div className="bg-gradient-to-br from-[#1E293B] to-[#0F172A] rounded-xl shadow-lg border border-[#334155] p-5">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">Goals & Challenges</h3>
            <button 
              className="text-sm font-medium text-[#8B5CF6] hover:text-[#A78BFA] transition-colors flex items-center"
              onClick={() => setActiveTab('goals')}
            >
              <span>View All</span>
              <ChevronRight size={16} className="ml-1" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {goalsAndChallenges.map(goal => (
              <div 
                key={goal.id} 
                className={`border rounded-lg p-5 ${
                  goal.type === 'steps' 
                    ? 'border-[#8B5CF6]/30 bg-[#8B5CF6]/10' 
                    : 'border-[#F472B6]/30 bg-[#F472B6]/10'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium text-white">{goal.title}</p>
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                    goal.status === 'In Progress' 
                      ? 'bg-yellow-500/20 text-yellow-500' 
                      : 'bg-green-500/20 text-green-500'
                  }`}>
                    {goal.status}
                  </span>
                </div>
                <p className="text-xs text-gray-400 mb-4">{goal.description}</p>
                <div className="w-full bg-[#334155] rounded-full h-2 mb-1">
                  <div 
                    className={`h-2 rounded-full ${
                      goal.type === 'steps' ? 'bg-[#8B5CF6]' : 'bg-[#F472B6]'
                    }`} 
                    style={{ 
                      width: `${(goal.progress / goal.total) * 100}%` 
                    }}
                  ></div>
                </div>
                <p className="text-xs text-right text-gray-400">
                  {typeof goal.progress === 'number' && typeof goal.total === 'number'
                    ? goal.progress >= 1000
                      ? `${goal.progress.toLocaleString()}/${goal.total.toLocaleString()}`
                      : `${goal.progress}/${goal.total}`
                    : `${goal.progress}/${goal.total}`
                  }
                  {goal.type === 'calories' ? ' kcal' : ' days'}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    // Background with a subtle gradient
    <div className="min-h-screen bg-gradient-to-br from-[#ecedee] to-[#0B1325] p-4 md:p-8 flex items-center justify-center">
      {/* Main floating container */}
      <div className="flex flex-col w-full max-w-7xl bg-[#0F172A] text-white font-sans rounded-2xl shadow-[0_0_50px_rgba(139,92,246,0.1)]">
        {/* Top navigation */}
        <header className="bg-[#1E293B] border-b border-[#334155] shadow-md rounded-t-2xl">
          <div className="container mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#6D28D9] flex items-center justify-center shadow-md">
                <Dumbbell className="text-white" size={20} />
              </div>
              <h1 className="text-xl font-bold text-white tracking-wide">FitnessTracker Pro</h1>
            </div>
            <div className="flex items-center space-x-4">
              {/* Device Status Indicator */}
              {connectedDevice && (
                <div className="flex items-center space-x-2 px-3 py-1 bg-[#0F172A] rounded-lg border border-[#334155]">
                  <Watch style={{ color: currentTheme.colors.primary }} size={16} />
                  <div className="flex items-center space-x-1">
                    {getDeviceStatusIcon()}
                    <span className="text-xs text-gray-300">{connectedDevice.name}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Battery className={getBatteryColor(connectedDevice.battery)} size={14} />
                    <span className="text-xs text-gray-400">{connectedDevice.battery}%</span>
                  </div>
                  {getSignalIcon(connectedDevice.signal)}
                </div>
              )}
              
              <button className="p-2 rounded-full hover:bg-[#334155] transition-colors">
                <Bell size={20} className="text-gray-300" />
              </button>
              
              <button
                onClick={() => setShowChatbot(true)}
                className="p-2 rounded-full hover:bg-[#334155] transition-colors text-gray-300 hover:text-white"
                title="AI Fitness Coach"
              >
                <MessageCircle size={18} />
              </button>
              
              <button
                onClick={() => setShowThemeCustomizer(true)}
                className="p-2 rounded-full hover:bg-[#334155] transition-colors text-gray-300 hover:text-white"
                title="Customize Theme"
              >
                <Palette size={18} />
              </button>
              
              <div 
                className="w-9 h-9 rounded-full flex items-center justify-center shadow-md"
                style={{
                  background: `linear-gradient(135deg, ${currentTheme.colors.primary}, ${currentTheme.colors.secondary})`
                }}
              >
                <span className="text-sm font-medium text-white">
                  {userData?.firstName?.charAt(0) || userInfo.name?.charAt(0) || 'U'}
                </span>
              </div>
              <button 
                onClick={onSignOut}
                className="p-2 rounded-full hover:bg-[#334155] transition-colors text-gray-300 hover:text-white"
                title="Sign Out"
              >
                <LogOut size={18} />
              </button>
            </div>
          </div>
        </header>

        <div className="flex flex-1">
          <aside className="hidden md:flex w-16 flex-col items-center px-2 py-8 bg-[#1E293B] border-r border-[#334155]">
            <nav className="flex flex-col items-center space-y-6">
              <button 
                onClick={() => setActiveTab('overview')} 
                className={`p-2 rounded-lg transition-colors ${activeTab === 'overview' ? 'text-white shadow-md' : 'text-gray-400 hover:bg-[#334155] hover:text-white'}`}
                style={{
                  backgroundColor: activeTab === 'overview' ? currentTheme.colors.primary : 'transparent'
                }}
              >
                <Activity size={20} />
              </button>
              <button 
                onClick={() => setActiveTab('workouts')} 
                className={`p-2 rounded-lg transition-colors ${activeTab === 'workouts' ? 'text-white shadow-md' : 'text-gray-400 hover:bg-[#334155] hover:text-white'}`}
                style={{
                  backgroundColor: activeTab === 'workouts' ? currentTheme.colors.primary : 'transparent'
                }}
              >
                <Dumbbell size={20} />
              </button>
              <button 
                onClick={() => setActiveTab('nutrition')} 
                className={`p-2 rounded-lg transition-colors ${activeTab === 'nutrition' ? 'text-white shadow-md' : 'text-gray-400 hover:bg-[#334155] hover:text-white'}`}
                style={{
                  backgroundColor: activeTab === 'nutrition' ? currentTheme.colors.primary : 'transparent'
                }}
              >
                <BarChart3 size={20} />
              </button>
              <button 
                onClick={() => setActiveTab('goals')} 
                className={`p-2 rounded-lg transition-colors ${activeTab === 'goals' ? 'text-white shadow-md' : 'text-gray-400 hover:bg-[#334155] hover:text-white'}`}
                style={{
                  backgroundColor: activeTab === 'goals' ? currentTheme.colors.primary : 'transparent'
                }}
              >
                <Trophy size={20} />
              </button>
              <button 
                onClick={() => setActiveTab('profile')} 
                className={`p-2 rounded-lg transition-colors ${activeTab === 'profile' ? 'text-white shadow-md' : 'text-gray-400 hover:bg-[#334155] hover:text-white'}`}
                style={{
                  backgroundColor: activeTab === 'profile' ? currentTheme.colors.primary : 'transparent'
                }}
              >
                <User size={20} />
              </button>
              <div className="flex-1"></div>
              {/* <button className="p-2 rounded-lg text-gray-400 hover:bg-[#334155] hover:text-white transition-colors">
                <Settings size={20} />
              </button> */}
            </nav>
          </aside>

          <main className="flex-1 p-6 overflow-auto">
            {renderTabContent()}
          </main>
        </div>

        {/* Mobile bottom navigation */}
        <nav className="md:hidden flex items-center justify-around bg-[#1E293B] border-t border-[#334155] px-4 py-3 rounded-b-2xl">
          <button 
            onClick={() => setActiveTab('overview')} 
            className={`p-1 flex flex-col items-center ${activeTab === 'overview' ? '' : 'text-gray-400'}`}
            style={{
              color: activeTab === 'overview' ? currentTheme.colors.primary : undefined
            }}
          >
            <Activity size={20} />
            <span className="text-xs mt-1">Overview</span>
          </button>
          <button 
            onClick={() => setActiveTab('workouts')} 
            className={`p-1 flex flex-col items-center ${activeTab === 'workouts' ? '' : 'text-gray-400'}`}
            style={{
              color: activeTab === 'workouts' ? currentTheme.colors.primary : undefined
            }}
          >
            <Dumbbell size={20} />
            <span className="text-xs mt-1">Workouts</span>
          </button>
          <button 
            onClick={() => setActiveTab('nutrition')} 
            className={`p-1 flex flex-col items-center ${activeTab === 'nutrition' ? '' : 'text-gray-400'}`}
            style={{
              color: activeTab === 'nutrition' ? currentTheme.colors.primary : undefined
            }}
          >
            <BarChart3 size={20} />
            <span className="text-xs mt-1">Nutrition</span>
          </button>
          <button 
            onClick={() => setActiveTab('profile')} 
            className={`p-1 flex flex-col items-center ${activeTab === 'profile' ? '' : 'text-gray-400'}`}
            style={{
              color: activeTab === 'profile' ? currentTheme.colors.primary : undefined
            }}
          >
            <User size={20} />
            <span className="text-xs mt-1">Profile</span>
          </button>
        </nav>
      </div>
      
      {/* Theme Customizer Modal */}
      {showThemeCustomizer && (
        <ThemeCustomizer
          currentTheme={currentTheme}
          onThemeChange={changeTheme}
          onClose={() => setShowThemeCustomizer(false)}
        />
      )}
      
      {/* Fitness Chatbot Modal */}
      <FitnessChatbot
        isOpen={showChatbot}
        onClose={() => setShowChatbot(false)}
      />
    </div>
  );
};

export default Dashboard;