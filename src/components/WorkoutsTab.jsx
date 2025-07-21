import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  Flame, 
  ChevronRight, 
  Plus, 
  ChevronDown, 
  ArrowRight, 
  BarChart3, 
  Activity,
  Heart,
  Award,
  Star
} from 'lucide-react';
import { workoutData } from './workoutdata.js';

const WorkoutsTab = () => {
  const [activeView, setActiveView] = useState('schedule');
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const { scheduledWorkouts, completedWorkouts, categories, recommendations, performanceMetrics, workoutTemplates } = workoutData;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  const getCategoryColor = (categoryId) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.color : '#8B5CF6';
  };

  const getCategoryIcon = (categoryId) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.icon : '🏋️';
  };

  // Function to show workout details
  const showWorkoutDetails = (workout) => {
    setSelectedWorkout(workout);
  };

  // Function to close workout details
  const closeWorkoutDetails = () => {
    setSelectedWorkout(null);
  };

  // Get today's date for schedule highlighting
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="container mx-auto max-w-7xl">
      {/* Page header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-white">Workouts</h2>
          <p className="text-gray-400">Plan, track, and analyze your fitness routine</p>
        </div>
        {/* <button className="mt-4 md:mt-0 flex items-center justify-center px-4 py-2 bg-[#8B5CF6] text-white rounded-lg hover:bg-[#7C3AED] transition-colors">
          <Plus size={18} className="mr-2" />
          <span>Create Workout</span>
        </button> */}
      </div>

      {/* Tab navigation */}
      <div className="bg-[#1E293B] rounded-lg mb-6 p-1 flex space-x-1">
        <button 
          onClick={() => setActiveView('schedule')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${activeView === 'schedule' ? 'bg-[#0F172A] text-white' : 'text-gray-400 hover:text-white'}`}
        >
          Schedule
        </button>
        <button 
          onClick={() => setActiveView('history')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${activeView === 'history' ? 'bg-[#0F172A] text-white' : 'text-gray-400 hover:text-white'}`}
        >
          History
        </button>
        <button 
          onClick={() => setActiveView('categories')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${activeView === 'categories' ? 'bg-[#0F172A] text-white' : 'text-gray-400 hover:text-white'}`}
        >
          Categories
        </button>
        <button 
          onClick={() => setActiveView('recommended')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${activeView === 'recommended' ? 'bg-[#0F172A] text-white' : 'text-gray-400 hover:text-white'}`}
        >
          Recommended
        </button>
        {/* <button 
          onClick={() => setActiveView('analysis')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${activeView === 'analysis' ? 'bg-[#0F172A] text-white' : 'text-gray-400 hover:text-white'}`}
        >
          Analysis
        </button> */}
      </div>

      {/* Content based on active view */}
      {activeView === 'schedule' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calendar section */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-[#1E293B] to-[#0F172A] rounded-xl shadow-lg border border-[#334155] p-5 mb-6">
              <h3 className="text-lg font-semibold text-white mb-4">March 2025</h3>
              
              <div className="grid grid-cols-7 gap-1 mb-2">
                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
                  <div key={index} className="text-center text-xs font-medium text-gray-400 py-1">
                    {day}
                  </div>
                ))}
              </div>
              
              <div className="grid grid-cols-7 gap-1">
                {/* Generate placeholder for dates before the 1st of the month */}
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={`empty-${i}`} className="h-10 text-center py-2"></div>
                ))}
                
                {/* Actual calendar dates */}
                {workoutData.calendarDates.map((date) => (
                  <div 
                    key={date.date} 
                    className={`h-10 rounded-full flex items-center justify-center text-sm cursor-pointer
                      ${date.hasWorkout ? 'relative' : ''}
                      ${date.date === 28 ? 'bg-[#8B5CF6]/20 text-white font-semibold' : 'hover:bg-[#334155] text-gray-400 hover:text-white'}
                    `}
                  >
                    {date.date}
                    {date.hasWorkout && (
                      <span className="absolute bottom-1 h-1 w-1 rounded-full bg-[#8B5CF6]"></span>
                    )}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-[#1E293B] to-[#0F172A] rounded-xl shadow-lg border border-[#334155] p-5">
              <h3 className="text-lg font-semibold text-white mb-4">Workout Categories</h3>
              
              <div className="space-y-3">
                {categories.slice(0, 4).map((category) => (
                  <div key={category.id} className="flex items-center p-3 bg-[#1E293B]/70 rounded-lg border border-[#334155] hover:border-[#8B5CF6] transition-colors cursor-pointer">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center text-xl" style={{ backgroundColor: `${category.color}20` }}>
                      {category.icon}
                    </div>
                    <div className="ml-3 flex-grow">
                      <h4 className="text-sm font-medium text-white">{category.name}</h4>
                      <p className="text-xs text-gray-400">{category.examples.slice(0, 2).join(', ')}...</p>
                    </div>
                    <ChevronRight size={16} className="text-gray-400" />
                  </div>
                ))}
                
                {/* <button className="w-full py-2 text-sm text-[#8B5CF6] hover:text-[#A78BFA] transition-colors">
                  View All Categories
                </button> */}
              </div>
            </div>
          </div>

          {/* Scheduled workouts */}
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-br from-[#1E293B] to-[#0F172A] rounded-xl shadow-lg border border-[#334155] p-5">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-white">Upcoming Workouts</h3>
                {/* <button className="text-sm font-medium text-[#8B5CF6] hover:text-[#A78BFA] transition-colors flex items-center">
                  <span>View Calendar</span>
                  <ChevronRight size={16} className="ml-1" />
                </button> */}
              </div>
              
              <div className="space-y-4">
                {scheduledWorkouts.filter(workout => workout.date >= today).slice(0, 4).map((workout) => (
                  <div 
                    key={workout.id} 
                    className="p-4 bg-[#1E293B]/70 rounded-lg border border-[#334155] hover:border-[#8B5CF6] transition-colors cursor-pointer"
                    onClick={() => showWorkoutDetails(workout)}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center">
                        <div 
                          className="w-10 h-10 rounded-lg flex items-center justify-center mr-3" 
                          style={{ backgroundColor: `${getCategoryColor(workout.category)}20` }}
                        >
                          <span className="text-xl">{getCategoryIcon(workout.category)}</span>
                        </div>
                        <div>
                          <h4 className="text-white font-medium">{workout.title}</h4>
                          <p className="text-xs text-gray-400">{formatDate(workout.date)} · {workout.time}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <div className="flex items-center text-gray-400 text-sm">
                            <Clock size={14} className="mr-1" />
                            <span>{workout.duration} min</span>
                          </div>
                          <div className="flex items-center text-gray-400 text-sm">
                            <Flame size={14} className="mr-1" />
                            <span>{workout.calories} kcal</span>
                          </div>
                        </div>
                        <ChevronRight size={16} className="text-gray-400" />
                      </div>
                    </div>
                    <div className="mt-2 text-xs text-gray-400">
                      <p className="line-clamp-2">{workout.notes}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#1E293B] to-[#0F172A] rounded-xl shadow-lg border border-[#334155] p-5 mt-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-white">Quick Start</h3>
                <button className="text-sm font-medium text-[#8B5CF6] hover:text-[#A78BFA] transition-colors flex items-center">
                  <span>All Templates</span>
                  <ChevronRight size={16} className="ml-1" />
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {workoutTemplates.slice(0, 4).map((template) => {
                  const category = categories.find(cat => cat.id === template.category);
                  return (
                    <div 
                      key={template.id} 
                      className="p-4 bg-[#1E293B]/70 rounded-lg border border-[#334155] hover:border-[#8B5CF6] transition-colors cursor-pointer"
                    >
                      <div className="flex items-center mb-3">
                        <div 
                          className="w-8 h-8 rounded-lg flex items-center justify-center mr-3" 
                          style={{ backgroundColor: `${getCategoryColor(template.category)}20` }}
                        >
                          <span className="text-lg">{getCategoryIcon(template.category)}</span>
                        </div>
                        <h4 className="text-white font-medium text-sm">{template.title}</h4>
                      </div>
                      <div className="flex justify-between items-center text-xs text-gray-400">
                        <span>{template.duration} min</span>
                        <span>{category ? category.name : 'Workout'}</span>
                        <button className="text-[#8B5CF6] hover:text-[#A78BFA] transition-colors">
                          Start
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeView === 'history' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Workout stats */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-[#1E293B] to-[#0F172A] rounded-xl shadow-lg border border-[#334155] p-5 mb-6">
              <h3 className="text-lg font-semibold text-white mb-4">Workout Stats</h3>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-400">Weekly workouts</span>
                    <span className="text-lg font-semibold text-white">5</span>
                  </div>
                  <div className="w-full h-2 bg-[#334155] rounded-full">
                    <div className="h-2 bg-[#8B5CF6] rounded-full" style={{ width: '71%' }}></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>Goal: 7</span>
                    <span>71%</span>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-400">Weekly time</span>
                    <span className="text-lg font-semibold text-white">180 min</span>
                  </div>
                  <div className="w-full h-2 bg-[#334155] rounded-full">
                    <div className="h-2 bg-[#F472B6] rounded-full" style={{ width: '90%' }}></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>Goal: 200 min</span>
                    <span>90%</span>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-400">Weekly calories</span>
                    <span className="text-lg font-semibold text-white">1850 kcal</span>
                  </div>
                  <div className="w-full h-2 bg-[#334155] rounded-full">
                    <div className="h-2 bg-[#F59E0B] rounded-full" style={{ width: '82%' }}></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>Goal: 2250 kcal</span>
                    <span>82%</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t border-[#334155]">
                <h4 className="text-sm font-semibold text-white mb-3">Category Breakdown</h4>
                
                <div className="space-y-3">
                  {performanceMetrics.categoryBreakdown.slice(0, 4).map((item, index) => (
                    <div key={index}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs text-gray-400">{item.category}</span>
                        <span className="text-xs font-medium text-white">{item.percentage}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-[#334155] rounded-full">
                        <div 
                          className="h-1.5 rounded-full" 
                          style={{ 
                            width: `${item.percentage}%`, 
                            backgroundColor: getCategoryColor(item.category.toLowerCase())
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Workout history */}
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-br from-[#1E293B] to-[#0F172A] rounded-xl shadow-lg border border-[#334155] p-5">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-white">Workout History</h3>
                <div className="relative">
                  <select className="appearance-none bg-[#0F172A] border border-[#334155] text-gray-400 text-sm rounded-lg p-2 pr-8 focus:outline-none focus:ring-1 focus:ring-[#8B5CF6] focus:border-[#8B5CF6]">
                    <option>Last 7 days</option>
                    <option>Last 30 days</option>
                    <option>Last 90 days</option>
                  </select>
                  <ChevronDown size={14} className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>
              
              <div className="space-y-4">
                {completedWorkouts.slice(0, 5).map((workout) => (
                  <div 
                    key={workout.id} 
                    className="p-4 bg-[#1E293B]/70 rounded-lg border border-[#334155] hover:border-[#8B5CF6] transition-colors cursor-pointer"
                    onClick={() => showWorkoutDetails(workout)}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center">
                        <div 
                          className="w-10 h-10 rounded-lg flex items-center justify-center mr-3" 
                          style={{ backgroundColor: `${getCategoryColor(workout.category)}20` }}
                        >
                          <span className="text-xl">{getCategoryIcon(workout.category)}</span>
                        </div>
                        <div>
                          <h4 className="text-white font-medium">{workout.title}</h4>
                          <p className="text-xs text-gray-400">{formatDate(workout.date)} · {workout.time}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center justify-end space-x-4">
                          <div>
                            <div className="flex items-center justify-end text-gray-400 text-sm">
                              <Clock size={14} className="mr-1" />
                              <span>{workout.duration} min</span>
                            </div>
                            <div className="flex items-center justify-end text-gray-400 text-sm">
                              <Flame size={14} className="mr-1" />
                              <span>{workout.calories} kcal</span>
                            </div>
                          </div>
                          
                          <div className="flex">
                            {Array.from({ length: workout.rating }).map((_, i) => (
                              <Star key={i} size={14} className="text-[#F59E0B] fill-[#F59E0B]" />
                            ))}
                            {Array.from({ length: 5 - workout.rating }).map((_, i) => (
                              <Star key={i} size={14} className="text-gray-600" />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-2 mt-3">
                      {workout.avgHeartRate && (
                        <div className="p-2 bg-[#0F172A] rounded-lg">
                          <div className="flex items-center text-xs text-gray-400">
                            <Heart size={12} className="mr-1 text-[#F472B6]" />
                            <span>Avg HR</span>
                          </div>
                          <p className="text-sm font-medium text-white mt-1">{workout.avgHeartRate} bpm</p>
                        </div>
                      )}
                      
                      {workout.distance && (
                        <div className="p-2 bg-[#0F172A] rounded-lg">
                          <div className="flex items-center text-xs text-gray-400">
                            <Activity size={12} className="mr-1 text-[#8B5CF6]" />
                            <span>Distance</span>
                          </div>
                          <p className="text-sm font-medium text-white mt-1">{workout.distance} km</p>
                        </div>
                      )}
                      
                      <div className="p-2 bg-[#0F172A] rounded-lg">
                        <div className="flex items-center text-xs text-gray-400">
                          <Flame size={12} className="mr-1 text-[#F59E0B]" />
                          <span>Calories</span>
                        </div>
                        <p className="text-sm font-medium text-white mt-1">{workout.calories} kcal</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <button className="w-full mt-4 py-2 border border-[#334155] text-[#8B5CF6] rounded-lg hover:bg-[#8B5CF6]/10 transition-colors">
                Load More
              </button>
            </div>
          </div>
        </div>
      )}

      {activeView === 'categories' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <div 
              key={category.id} 
              className="bg-gradient-to-br from-[#1E293B] to-[#0F172A] rounded-xl shadow-lg border border-[#334155] p-5 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center mb-4">
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center mr-4" 
                  style={{ backgroundColor: `${category.color}20` }}
                >
                  <span className="text-2xl">{category.icon}</span>
                </div>
                <h3 className="text-lg font-semibold text-white">{category.name}</h3>
              </div>
              
              <p className="text-sm text-gray-400 mb-4">{category.description}</p>
              
              <div className="mt-2">
                <h4 className="text-sm font-medium text-white mb-2">Popular Workouts</h4>
                <div className="space-y-2">
                  {category.examples.slice(0, 3).map((example, index) => (
                    <div key={index} className="flex items-center p-2 bg-[#0F172A] rounded-lg">
                      <div 
                        className="w-6 h-6 rounded-md flex items-center justify-center mr-2" 
                        style={{ backgroundColor: `${category.color}20` }}
                      >
                        <span className="text-xs">{category.icon}</span>
                      </div>
                      <span className="text-sm text-gray-200">{example}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <button className="w-full mt-4 py-2 border border-[#334155] text-[#8B5CF6] rounded-lg hover:bg-[#8B5CF6]/10 transition-colors">
                Browse Workouts
              </button>
            </div>
          ))}
        </div>
      )}

      {activeView === 'recommended' && (
        <div>
          <div className="bg-gradient-to-br from-[#1E293B] to-[#0F172A] rounded-xl shadow-lg border border-[#334155] p-5 mb-6">
            <h3 className="text-lg font-semibold text-white mb-1">Personalized For You</h3>
            <p className="text-sm text-gray-400 mb-6">Workouts tailored to your goals and preferences</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {recommendations.map((workout) => {
                const category = categories.find(cat => cat.id === workout.category);
                return (
                  <div 
                    key={workout.id} 
                    className="p-4 bg-[#1E293B]/70 rounded-lg border border-[#334155] hover:border-[#8B5CF6] transition-colors cursor-pointer"
                  >
                    <div className="flex items-center mb-3">
                      <div 
                        className="w-10 h-10 rounded-lg flex items-center justify-center mr-3" 
                        style={{ backgroundColor: `${category ? category.color : '#8B5CF6'}20` }}
                      >
                        <span className="text-xl">{category ? category.icon : '🏋️'}</span>
                      </div>
                      <div>
                        <h4 className="text-white font-medium">{workout.title}</h4>
                        <p className="text-xs text-gray-400">{workout.difficulty} · {workout.duration} min</p>
                      </div>
                    </div>
                    
                    <p className="text-xs text-gray-400 mb-3 line-clamp-2">{workout.description}</p>
                    
                    <div className="flex justify-between items-center">
                      <div className="flex items-center text-xs text-gray-400">
                        <Flame size={14} className="mr-1" />
                        <span>{workout.calories} kcal</span>
                      </div>
                      
                      <div className="flex flex-wrap">
                        {workout.tags.slice(0, 2).map((tag, index) => (
                          <span 
                            key={index} 
                            className="text-xs bg-[#0F172A] text-gray-400 rounded-full px-2 py-1 ml-1 mb-1"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-[#1E293B] to-[#0F172A] rounded-xl shadow-lg border border-[#334155] p-5">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-white">Weekly Challenge</h3>
                <p className="text-sm text-gray-400">Complete this week's featured workout</p>
              </div>
              <div className="p-2 rounded-full bg-[#F59E0B]/20">
                <Award className="text-[#F59E0B]" size={24} />
              </div>
            </div>
            
            <div className="p-4 bg-[#0F172A] rounded-lg border border-[#334155]">
              <div className="flex items-center mb-3">
                <div className="w-12 h-12 rounded-lg bg-[#F59E0B]/20 flex items-center justify-center mr-4">
                  <span className="text-2xl">⚡</span>
                </div>
                <div>
                  <h4 className="text-white font-medium">HIIT Cardio Challenge</h4>
                  <p className="text-xs text-gray-400">30 min · High Intensity · 350 kcal</p>
                </div>
              </div>
              
              <p className="text-sm text-gray-400 mb-4">Challenge yourself with this high-intensity interval training workout designed to boost your metabolism and improve cardiovascular fitness.</p>
              
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-gray-400">Community progress</span>
                <span className="text-xs text-gray-400">326 completions</span>
              </div>
              
              <div className="w-full h-2 bg-[#334155] rounded-full mb-4">
                <div className="h-2 bg-[#F59E0B] rounded-full" style={{ width: '65%' }}></div>
              </div>
              
              <div className="flex justify-between">
                <button className="py-2 px-4 bg-[#F59E0B] text-white rounded-lg hover:bg-[#F59E0B]/90 transition-colors flex items-center">
                  <span>Start Challenge</span>
                  <ArrowRight size={16} className="ml-2" />
                </button>
                
                <button className="py-2 px-4 border border-[#334155] text-gray-400 rounded-lg hover:bg-[#1E293B] transition-colors">
                  View Details
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeView === 'analysis' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Performance metrics */}
          <div className="lg:col-span-2 bg-gradient-to-br from-[#1E293B] to-[#0F172A] rounded-xl shadow-lg border border-[#334155] p-5">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-white">Performance Trends</h3>
              <div className="relative">
                <select className="appearance-none bg-[#0F172A] border border-[#334155] text-gray-400 text-sm rounded-lg p-2 pr-8 focus:outline-none focus:ring-1 focus:ring-[#8B5CF6] focus:border-[#8B5CF6]">
                  <option>Last 8 weeks</option>
                  <option>Last 6 months</option>
                  <option>Last year</option>
                </select>
                <ChevronDown size={14} className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>
            
            <div className="h-64 mb-6">
              <div className="w-full h-full bg-[#0F172A] rounded-lg border border-[#334155] p-4 flex items-center justify-center">
                <p className="text-gray-400">Weekly Training Volume Chart</p>
                {/* This would be a chart in a real implementation */}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-[#0F172A] rounded-lg border border-[#334155] p-4">
                <h4 className="text-sm font-medium text-white mb-4">Category Distribution</h4>
                
                <div className="space-y-3">
                  {performanceMetrics.categoryBreakdown.map((item, index) => (
                    <div key={index}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs text-gray-400">{item.category}</span>
                        <span className="text-xs font-medium text-white">{item.percentage}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-[#1E293B] rounded-full">
                        <div 
                          className="h-1.5 rounded-full" 
                          style={{ 
                            width: `${item.percentage}%`, 
                            backgroundColor: getCategoryColor(item.category.toLowerCase())
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-[#0F172A] rounded-lg border border-[#334155] p-4">
                <h4 className="text-sm font-medium text-white mb-4">Key Improvements</h4>
                
                <div className="space-y-4">
                  {performanceMetrics.improvements.map((improvement, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-xs text-gray-400">{improvement.metric}</span>
                      <div className={`flex items-center text-xs ${improvement.trending === 'up' ? 'text-green-400' : 'text-[#F472B6]'}`}>
                        {improvement.trending === 'up' ? '+' : ''}{improvement.change} {improvement.unit}
                        <ChevronRight size={14} className="ml-1" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Workout insights */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-[#1E293B] to-[#0F172A] rounded-xl shadow-lg border border-[#334155] p-5 mb-6">
              <h3 className="text-lg font-semibold text-white mb-4">Workout Insights</h3>
              
              <div className="space-y-4">
                <div className="p-3 bg-[#0F172A] rounded-lg border border-[#334155]">
                  <div className="flex items-center mb-2">
                    <div className="p-2 rounded-full bg-[#8B5CF6]/20 mr-3">
                      <BarChart3 size={16} className="text-[#8B5CF6]" />
                    </div>
                    <h4 className="text-sm font-medium text-white">Consistency Score</h4>
                  </div>
                  <div className="flex items-center">
                    <div className="w-16 h-16 relative mr-3">
                      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                        <circle cx="18" cy="18" r="16" fill="none" className="stroke-[#334155]" strokeWidth="3"></circle>
                        <circle 
                          cx="18" cy="18" r="16" 
                          fill="none" 
                          className="stroke-[#8B5CF6]" 
                          strokeWidth="3" 
                          strokeDasharray="85 100"
                          strokeLinecap="round"
                        ></circle>
                      </svg>
                      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                        <span className="text-sm font-medium text-white">85%</span>
                      </div>
                    </div>
                    <p className="text-xs text-gray-400">You've maintained a strong workout schedule. Keep it up!</p>
                  </div>
                </div>
                
                <div className="p-3 bg-[#0F172A] rounded-lg border border-[#334155]">
                  <h4 className="text-sm font-medium text-white mb-2">Suggested Focus Areas</h4>
                  <ul className="space-y-2 text-xs text-gray-400">
                    <li className="flex items-start">
                      <div className="p-1 rounded-full bg-[#F472B6]/20 mr-2 mt-0.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#F472B6]"></div>
                      </div>
                      <span>Increase flexibility workouts</span>
                    </li>
                    <li className="flex items-start">
                      <div className="p-1 rounded-full bg-[#F59E0B]/20 mr-2 mt-0.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#F59E0B]"></div>
                      </div>
                      <span>Add more lower body strength training</span>
                    </li>
                    <li className="flex items-start">
                      <div className="p-1 rounded-full bg-[#10B981]/20 mr-2 mt-0.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#10B981]"></div>
                      </div>
                      <span>Include more recovery days between HIIT sessions</span>
                    </li>
                  </ul>
                </div>
                
                <div className="p-3 bg-[#0F172A] rounded-lg border border-[#334155]">
                  <h4 className="text-sm font-medium text-white mb-2">Recent Achievement</h4>
                  <div className="flex items-center">
                    <div className="p-2 rounded-full bg-[#F59E0B]/20 mr-3">
                      <Award size={24} className="text-[#F59E0B]" />
                    </div>
                    <div>
                      <p className="text-sm text-white">10 Workouts Completed</p>
                      <p className="text-xs text-gray-400">You've reached a new milestone!</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <button className="w-full mt-4 py-2 border border-[#334155] text-[#8B5CF6] rounded-lg hover:bg-[#8B5CF6]/10 transition-colors">
                View All Insights
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Workout details modal */}
      {selectedWorkout && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/70 p-4">
          <div className="bg-[#1E293B] rounded-xl shadow-xl border border-[#334155] w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <div 
                    className="w-12 h-12 rounded-lg flex items-center justify-center mr-4" 
                    style={{ backgroundColor: `${getCategoryColor(selectedWorkout.category)}20` }}
                  >
                    <span className="text-2xl">{getCategoryIcon(selectedWorkout.category)}</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{selectedWorkout.title}</h3>
                    <p className="text-sm text-gray-400">{formatDate(selectedWorkout.date)} · {selectedWorkout.time}</p>
                  </div>
                </div>
                <button 
                  onClick={closeWorkoutDetails}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  &times;
                </button>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
                <div className="p-3 bg-[#0F172A] rounded-lg">
                  <p className="text-xs text-gray-400 mb-1">Duration</p>
                  <div className="flex items-center">
                    <Clock size={16} className="text-[#8B5CF6] mr-2" />
                    <p className="text-md font-semibold text-white">{selectedWorkout.duration} min</p>
                  </div>
                </div>
                
                <div className="p-3 bg-[#0F172A] rounded-lg">
                  <p className="text-xs text-gray-400 mb-1">Calories</p>
                  <div className="flex items-center">
                    <Flame size={16} className="text-[#F472B6] mr-2" />
                    <p className="text-md font-semibold text-white">{selectedWorkout.calories} kcal</p>
                  </div>
                </div>
                
                <div className="p-3 bg-[#0F172A] rounded-lg">
                  <p className="text-xs text-gray-400 mb-1">Intensity</p>
                  <div className="flex items-center">
                    <Activity size={16} className="text-[#F59E0B] mr-2" />
                    <p className="text-md font-semibold text-white">{selectedWorkout.intensity || 'Moderate'}</p>
                  </div>
                </div>
                
                {selectedWorkout.distance && (
                  <div className="p-3 bg-[#0F172A] rounded-lg">
                    <p className="text-xs text-gray-400 mb-1">Distance</p>
                    <div className="flex items-center">
                      <Activity size={16} className="text-[#10B981] mr-2" />
                      <p className="text-md font-semibold text-white">{selectedWorkout.distance} km</p>
                    </div>
                  </div>
                )}
                
                {selectedWorkout.avgHeartRate && (
                  <div className="p-3 bg-[#0F172A] rounded-lg">
                    <p className="text-xs text-gray-400 mb-1">Avg Heart Rate</p>
                    <div className="flex items-center">
                      <Heart size={16} className="text-[#F472B6] mr-2" />
                      <p className="text-md font-semibold text-white">{selectedWorkout.avgHeartRate} bpm</p>
                    </div>
                  </div>
                )}
                
                {selectedWorkout.maxHeartRate && (
                  <div className="p-3 bg-[#0F172A] rounded-lg">
                    <p className="text-xs text-gray-400 mb-1">Max Heart Rate</p>
                    <div className="flex items-center">
                      <Heart size={16} className="text-[#F472B6] mr-2" />
                      <p className="text-md font-semibold text-white">{selectedWorkout.maxHeartRate} bpm</p>
                    </div>
                  </div>
                )}
              </div>
              
              {selectedWorkout.notes && (
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-white mb-2">Notes</h4>
                  <p className="text-sm text-gray-400 bg-[#0F172A] p-3 rounded-lg border border-[#334155]">
                    {selectedWorkout.notes}
                  </p>
                </div>
              )}
              
              {/* Only show for completed workouts */}
              {selectedWorkout.rating && (
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-white mb-2">Rating</h4>
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star 
                        key={i} 
                        size={20} 
                        className={i < selectedWorkout.rating ? 'text-[#F59E0B] fill-[#F59E0B]' : 'text-gray-600'} 
                      />
                    ))}
                  </div>
                </div>
              )}
              
              <div className="flex justify-between mt-6 pt-6 border-t border-[#334155]">
                {/* Different buttons for scheduled vs completed workouts */}
                {selectedWorkout.completed !== undefined ? (
                  selectedWorkout.completed ? (
                    <button className="py-2 px-4 bg-[#0F172A] text-gray-400 rounded-lg hover:bg-[#1A2234] transition-colors">
                      View Details
                    </button>
                  ) : (
                    <>
                      <button className="py-2 px-4 bg-[#8B5CF6] text-white rounded-lg hover:bg-[#7C3AED] transition-colors">
                        Start Workout
                      </button>
                      <button className="py-2 px-4 bg-[#0F172A] text-gray-400 rounded-lg hover:bg-[#1A2234] transition-colors">
                        Reschedule
                      </button>
                    </>
                  )
                ) : (
                  <button className="py-2 px-4 bg-[#8B5CF6] text-white rounded-lg hover:bg-[#7C3AED] transition-colors">
                    {selectedWorkout.date >= today ? 'Start Workout' : 'View Details'}
                  </button>
                )}
                <button 
                  onClick={closeWorkoutDetails}
                  className="py-2 px-4 border border-[#334155] text-gray-400 rounded-lg hover:bg-[#1E293B] transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkoutsTab;