import React, { useState } from 'react';
import { 
  Trophy, 
  Plus, 
  ChevronRight, 
  ChevronDown, 
  CheckCircle, 
  Calendar, 
  ArrowUp, 
  ArrowDown, 
  Clock,
  Award,
  Users,
  Target,
  BarChart3,
  Search,
  Filter,
  Trash,
  Edit,
  Flag,
  AlertCircle,
  Star
} from 'lucide-react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { 
  activeGoals,
  completedGoals,
  goalStatistics,
  goalTemplates,
  achievements,
  communityChallenges,
  goalCategories,
  achievementCategories,
  rarityColors,
  goalCompletionData
} from './goalsData.js';

const GoalsTab = () => {
  const [activeView, setActiveView] = useState('dashboard');
  const [showCreateGoal, setShowCreateGoal] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [selectedAchievement, setSelectedAchievement] = useState(null);
  const [selectedChallenge, setSelectedChallenge] = useState(null);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [goalCategoryFilter, setGoalCategoryFilter] = useState('all');
  const [achievementCategoryFilter, setAchievementCategoryFilter] = useState('all');
  
  // Helper function to get color for a category
  const getCategoryColor = (categoryId) => {
    const category = goalCategories.find(cat => cat.id === categoryId);
    return category ? category.color : "#8B5CF6"; // Default to violet if not found
  };
  
  // Helper function to get icon for a category
  const getCategoryIcon = (categoryId) => {
    const category = goalCategories.find(cat => cat.id === categoryId);
    return category ? category.icon : "🎯"; // Default if not found
  };
  
  // Calculate days remaining for a goal
  const getDaysRemaining = (deadlineDate) => {
    const deadline = new Date(deadlineDate);
    const today = new Date();
    const diffTime = deadline - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };
  
  // Format date to readable string
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };
  
  // Calculate time period between two dates
  const getTimePeriod = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = endDate ? new Date(endDate) : new Date();
    const diffTime = end - start;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 30) {
      return `${diffDays} days`;
    } else if (diffDays < 365) {
      const months = Math.floor(diffDays / 30);
      return `${months} month${months > 1 ? 's' : ''}`;
    } else {
      const years = Math.floor(diffDays / 365);
      const remainingMonths = Math.floor((diffDays % 365) / 30);
      return `${years} year${years > 1 ? 's' : ''}${remainingMonths > 0 ? `, ${remainingMonths} month${remainingMonths > 1 ? 's' : ''}` : ''}`;
    }
  };
  
  // Goal selection handlers
  const handleGoalSelect = (goal) => {
    setSelectedGoal(goal);
  };
  
  const closeGoalDetails = () => {
    setSelectedGoal(null);
  };
  
  // Achievement selection handlers
  const handleAchievementSelect = (achievement) => {
    setSelectedAchievement(achievement);
  };
  
  const closeAchievementDetails = () => {
    setSelectedAchievement(null);
  };
  
  // Challenge selection handlers
  const handleChallengeSelect = (challenge) => {
    setSelectedChallenge(challenge);
  };
  
  const closeChallengeDetails = () => {
    setSelectedChallenge(null);
  };
  
  // Template selection for creating a goal
  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
    setShowCreateGoal(true);
  };
  
  // Return to template selection
  const backToTemplates = () => {
    setSelectedTemplate(null);
  };
  
  // Filter achievements by category
  const filteredAchievements = achievementCategoryFilter === 'all' 
    ? achievements 
    : achievements.filter(achievement => achievement.category === achievementCategoryFilter);
  
  // Filter goals by category
  const filteredActiveGoals = goalCategoryFilter === 'all'
    ? activeGoals
    : activeGoals.filter(goal => goal.category === goalCategoryFilter);
  
  return (
    <div className="container mx-auto max-w-7xl">
      {/* Page header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-white">Goals & Achievements</h2>
          <p className="text-gray-400">Set, track, and accomplish your fitness goals</p>
        </div>
        <button 
          onClick={() => setShowCreateGoal(true)}
          className="mt-4 md:mt-0 flex items-center justify-center px-4 py-2 bg-[#8B5CF6] text-white rounded-lg hover:bg-[#7C3AED] transition-colors"
        >
          <Plus size={18} className="mr-2" />
          <span>Create Goal</span>
        </button>
      </div>

      {/* Tab navigation */}
      <div className="bg-[#1E293B] rounded-lg mb-6 p-1 flex space-x-1">
        <button 
          onClick={() => setActiveView('dashboard')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${activeView === 'dashboard' ? 'bg-[#0F172A] text-white' : 'text-gray-400 hover:text-white'}`}
        >
          Dashboard
        </button>
        <button 
          onClick={() => setActiveView('goals')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${activeView === 'goals' ? 'bg-[#0F172A] text-white' : 'text-gray-400 hover:text-white'}`}
        >
          My Goals
        </button>
        <button 
          onClick={() => setActiveView('achievements')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${activeView === 'achievements' ? 'bg-[#0F172A] text-white' : 'text-gray-400 hover:text-white'}`}
        >
          Achievements
        </button>
        <button 
          onClick={() => setActiveView('challenges')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${activeView === 'challenges' ? 'bg-[#0F172A] text-white' : 'text-gray-400 hover:text-white'}`}
        >
          Challenges
        </button>
      </div>

      {/* Content based on active view */}
      {activeView === 'dashboard' && (
        <div>
          {/* Goals summary */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-gradient-to-br from-[#1E293B] to-[#0F172A] rounded-xl shadow-lg border border-[#334155] p-5 hover:shadow-[0_8px_30px_rgba(139,92,246,0.15)] transition-shadow duration-300">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium text-gray-400">Active Goals</p>
                <Trophy size={18} className="text-[#8B5CF6]" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-1">{goalStatistics.currentMonth.inProgress}</h3>
              <div className="flex items-center text-xs">
                <ArrowUp size={12} className="text-green-500 mr-1" />
                <span className="text-green-500">
                  {goalStatistics.currentMonth.inProgress - goalStatistics.lastMonth.inProgress} from last month
                </span>
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#1E293B] to-[#0F172A] rounded-xl shadow-lg border border-[#334155] p-5 hover:shadow-[0_8px_30px_rgba(139,92,246,0.15)] transition-shadow duration-300">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium text-gray-400">Completion Rate</p>
                <CheckCircle size={18} className="text-green-500" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-1"> {goalStatistics.currentMonth.completionRate}% </h3>
              <div className="flex items-center text-xs">
                <ArrowUp size={12} className="text-green-500 mr-1" />
                <span className="text-green-500">
                  {goalStatistics.currentMonth.completionRate - goalStatistics.lastMonth.completionRate}% from last month
                </span>
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#1E293B] to-[#0F172A] rounded-xl shadow-lg border border-[#334155] p-5 hover:shadow-[0_8px_30px_rgba(139,92,246,0.15)] transition-shadow duration-300">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium text-gray-400">Avg. Progress</p>
                <BarChart3 size={18} className="text-[#F472B6]" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-1">{goalStatistics.currentMonth.averageProgress}%</h3>
              <div className="flex items-center text-xs">
                <ArrowDown size={12} className="text-red-500 mr-1" />
                <span className="text-red-500">
                  {goalStatistics.lastMonth.averageProgress - goalStatistics.currentMonth.averageProgress}% from last month
                </span>
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#1E293B] to-[#0F172A] rounded-xl shadow-lg border border-[#334155] p-5 hover:shadow-[0_8px_30px_rgba(139,92,246,0.15)] transition-shadow duration-300">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium text-gray-400">Completed YTD</p>
                <Award size={18} className="text-[#F59E0B]" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-1">{goalStatistics.yearToDate.completed}</h3>
              <div className="flex items-center text-xs">
                <span className="text-gray-400">
                  {goalStatistics.yearToDate.completionRate}% completion rate
                </span>
              </div>
            </div>
          </div>
          

          {/* Active goals and achievements */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            {/* Active goals */}
            <div className="lg:col-span-2">
              <div className="bg-gradient-to-br from-[#1E293B] to-[#0F172A] rounded-xl shadow-lg border border-[#334155] p-5 mb-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-white">Active Goals</h3>
                  <button 
                    onClick={() => setActiveView('goals')}
                    className="text-sm font-medium text-[#8B5CF6] hover:text-[#A78BFA] transition-colors flex items-center"
                  >
                    <span>View All</span>
                    <ChevronRight size={16} className="ml-1" />
                  </button>
                </div>
                
                <div className="space-y-4">
                  {activeGoals.slice(0, 3).map((goal) => (
                    <div 
                      key={goal.id} 
                      className="p-4 bg-[#1E293B]/70 rounded-lg border border-[#334155] hover:border-[#8B5CF6] transition-colors cursor-pointer"
                      onClick={() => handleGoalSelect(goal)}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center">
                          <div 
                            className="w-10 h-10 rounded-lg flex items-center justify-center text-xl mr-3"
                            style={{ backgroundColor: `${getCategoryColor(goal.category)}20` }}
                          >
                            <span>{goal.icon}</span>
                          </div>
                          <div>
                            <h4 className="text-white font-medium">{goal.title}</h4>
                            <div className="flex items-center text-xs text-gray-400">
                              <span>{getCategoryIcon(goal.category)}</span>
                              <span className="ml-1 capitalize">{goal.category}</span>
                              <span className="mx-1">•</span>
                              <Clock size={12} className="mr-1" />
                              <span>{getDaysRemaining(goal.deadline)} days left</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-semibold text-white">
                            {goal.progress}%
                          </p>
                          {goal.streakRequired && (
                            <p className="text-xs text-gray-400">
                              Streak: {goal.streakCurrent} days
                            </p>
                          )}
                        </div>
                      </div>
                      
                      <div className="w-full bg-[#0F172A] rounded-full h-2.5 mb-1">
                        <div 
                          className="h-2.5 rounded-full" 
                          style={{ 
                            width: `${goal.progress}%`, 
                            backgroundColor: getCategoryColor(goal.category)
                          }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-xs text-gray-400">
                        <span>Current: {goal.current} {goal.unit}</span>
                        <span>Target: {goal.target} {goal.unit}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Goal completion chart */}
              <div className="bg-gradient-to-br from-[#1E293B] to-[#0F172A] rounded-xl shadow-lg border border-[#334155] p-5">
                <h3 className="text-lg font-semibold text-white mb-4">Goal Completion History</h3>
                
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={goalCompletionData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                      <XAxis dataKey="month" tick={{fontSize: 12}} stroke="#64748B" />
                      <YAxis tick={{fontSize: 12}} stroke="#64748B" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#1E293B', 
                          borderColor: '#334155',
                          color: 'white'
                        }} 
                        labelStyle={{ color: 'white' }}
                      />
                      <Bar dataKey="completed" stackId="a" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="inProgress" stackId="a" fill="#334155" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="flex justify-center mt-4 space-x-6">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-[#8B5CF6] mr-2"></div>
                    <span className="text-xs text-gray-400">Completed</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-[#334155] mr-2"></div>
                    <span className="text-xs text-gray-400">In Progress</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Recent achievements */}
            <div className="lg:col-span-1">
              <div className="bg-gradient-to-br from-[#1E293B] to-[#0F172A] rounded-xl shadow-lg border border-[#334155] p-5 mb-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-white">Recent Achievements</h3>
                  <button 
                    onClick={() => setActiveView('achievements')}
                    className="text-sm font-medium text-[#8B5CF6] hover:text-[#A78BFA] transition-colors flex items-center"
                  >
                    <span>View All</span>
                    <ChevronRight size={16} className="ml-1" />
                  </button>
                </div>
                
                <div className="space-y-3">
                  {achievements.filter(a => a.unlocked).slice(0, 3).map((achievement) => (
                    <div 
                      key={achievement.id} 
                      className="p-3 bg-[#0F172A] rounded-lg border border-[#334155] hover:border-[#8B5CF6] transition-colors cursor-pointer flex items-center"
                      onClick={() => handleAchievementSelect(achievement)}
                    >
                      <div 
                        className="w-12 h-12 rounded-full flex items-center justify-center text-2xl mr-3"
                        style={{ 
                          backgroundColor: `${rarityColors[achievement.rarity]}20`, 
                          borderWidth: '2px',
                          borderStyle: 'solid',
                          borderColor: rarityColors[achievement.rarity]
                        }}
                      >
                        <span>{achievement.icon}</span>
                      </div>
                      <div>
                        <h4 className="text-white text-sm font-medium">{achievement.title}</h4>
                        <p className="text-xs text-gray-400">{formatDate(achievement.unlockedDate)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Community challenges */}
              <div className="bg-gradient-to-br from-[#1E293B] to-[#0F172A] rounded-xl shadow-lg border border-[#334155] p-5">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-white">Active Challenges</h3>
                  <button 
                    onClick={() => setActiveView('challenges')}
                    className="text-sm font-medium text-[#8B5CF6] hover:text-[#A78BFA] transition-colors flex items-center"
                  >
                    <span>Explore</span>
                    <ChevronRight size={16} className="ml-1" />
                  </button>
                </div>
                
                <div className="space-y-3">
                  {communityChallenges.filter(c => c.joined).map((challenge) => (
                    <div 
                      key={challenge.id} 
                      className="p-3 bg-[#0F172A] rounded-lg border border-[#334155] hover:border-[#8B5CF6] transition-colors cursor-pointer"
                      onClick={() => handleChallengeSelect(challenge)}
                    >
                      <div className="flex items-center mb-2">
                        <div className="w-8 h-8 rounded-full bg-[#8B5CF6]/20 flex items-center justify-center text-lg mr-2">
                          <span>{challenge.icon}</span>
                        </div>
                        <div>
                          <h4 className="text-white text-sm font-medium">{challenge.title}</h4>
                          <div className="flex items-center text-xs text-gray-400">
                            <Users size={10} className="mr-1" />
                            <span>{challenge.participants.toLocaleString()} participants</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="w-full bg-[#1E293B] rounded-full h-1.5 mb-1">
                        <div className="bg-[#8B5CF6] h-1.5 rounded-full" style={{ width: `${challenge.progress}%` }}></div>
                      </div>
                      <div className="flex justify-between text-xs text-gray-400">
                        <span>Progress: {challenge.progress}%</span>
                        <span>Ends: {formatDate(challenge.endDate)}</span>
                      </div>
                    </div>
                  ))}
                  
                  {communityChallenges.filter(c => c.joined).length === 0 && (
                    <div className="text-center py-6">
                      <Users size={40} className="text-gray-500 mx-auto mb-2" />
                      <p className="text-gray-400 text-sm">You haven't joined any challenges yet</p>
                      <button 
                        onClick={() => setActiveView('challenges')}
                        className="mt-2 text-sm text-[#8B5CF6]"
                      >
                        Browse challenges
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          {/* Category distribution */}
          <div className="bg-gradient-to-br from-[#1E293B] to-[#0F172A] rounded-xl shadow-lg border border-[#334155] p-5">
            <h3 className="text-lg font-semibold text-white mb-6">Goal Category Distribution</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex justify-center items-center">
                <ResponsiveContainer width={250} height={250}>
                  <PieChart>
                    <Pie
                      data={goalStatistics.categoryBreakdown}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={3}
                      dataKey="count"
                    >
                      {goalStatistics.categoryBreakdown.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={getCategoryColor(entry.category)} 
                        />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1E293B', 
                        borderColor: '#334155',
                        color: 'white'
                      }} 
                      formatter={(value, name, props) => [
                        `${value} goals`, 
                        goalCategories.find(cat => cat.id === props.payload.category)?.name || 'Category'
                      ]}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                {goalStatistics.categoryBreakdown.map((stat, index) => {
                  const category = goalCategories.find(cat => cat.id === stat.category);
                  return (
                    <div key={index} className="bg-[#0F172A] rounded-lg p-3 flex items-start">
                      <div 
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-lg mr-2 flex-shrink-0"
                        style={{ backgroundColor: `${getCategoryColor(stat.category)}20` }}
                      >
                        <span>{category?.icon || '🎯'}</span>
                      </div>
                      <div>
                        <h4 className="text-white text-sm font-medium capitalize">{category?.name || stat.category}</h4>
                        <p className="text-xs text-gray-400">{stat.count} goals • {stat.completionRate}% completed</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
      
      {activeView === 'goals' && (
        <div>
          {/* Goals filter and search */}
          <div className="bg-gradient-to-br from-[#1E293B] to-[#0F172A] rounded-xl shadow-lg border border-[#334155] p-5 mb-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="relative flex-1">
                <input 
                  type="text" 
                  placeholder="Search goals..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#0F172A] border border-[#334155] text-gray-300 rounded-lg py-2 px-4 pl-10 focus:outline-none focus:ring-1 focus:ring-[#8B5CF6] focus:border-[#8B5CF6]"
                />
                <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
              
              <div className="flex space-x-2">
                <div className="relative">
                  <select 
                    className="appearance-none bg-[#0F172A] border border-[#334155] text-gray-400 text-sm rounded-lg p-2 pr-8 focus:outline-none focus:ring-1 focus:ring-[#8B5CF6] focus:border-[#8B5CF6]"
                    value={goalCategoryFilter}
                    onChange={(e) => setGoalCategoryFilter(e.target.value)}
                  >
                    <option value="all">All Categories</option>
                    {goalCategories.map(category => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                  <ChevronDown size={14} className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
                
                <div className="relative">
                  <select className="appearance-none bg-[#0F172A] border border-[#334155] text-gray-400 text-sm rounded-lg p-2 pr-8 focus:outline-none focus:ring-1 focus:ring-[#8B5CF6] focus:border-[#8B5CF6]">
                    <option>All Status</option>
                    <option>In Progress</option>
                    <option>Completed</option>
                    <option>Overdue</option>
                  </select>
                  <ChevronDown size={14} className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
                
                <button className="p-2 bg-[#0F172A] border border-[#334155] text-gray-400 rounded-lg hover:border-[#8B5CF6] hover:text-[#8B5CF6] transition-colors">
                  <Filter size={16} />
                </button>
              </div>
            </div>
          </div>
          
          {/* Active goals */}
          <div className="bg-gradient-to-br from-[#1E293B] to-[#0F172A] rounded-xl shadow-lg border border-[#334155] p-5 mb-6">
            <h3 className="text-lg font-semibold text-white mb-6">Active Goals</h3>
            
            <div className="space-y-4">
              {filteredActiveGoals.map((goal) => (
                <div 
                  key={goal.id} 
                  className="p-4 bg-[#1E293B]/70 rounded-lg border border-[#334155] hover:border-[#8B5CF6] transition-colors cursor-pointer"
                  onClick={() => handleGoalSelect(goal)}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <div 
                        className="w-10 h-10 rounded-lg flex items-center justify-center text-xl mr-3"
                        style={{ backgroundColor: `${getCategoryColor(goal.category)}20` }}
                      >
                        <span>{goal.icon}</span>
                      </div>
                      <div>
                        <h4 className="text-white font-medium">{goal.title}</h4>
                        <div className="flex items-center text-xs text-gray-400">
                          <span>{getCategoryIcon(goal.category)}</span>
                          <span className="ml-1 capitalize">{goal.category}</span>
                          <span className="mx-1">•</span>
                          <Clock size={12} className="mr-1" />
                          <span>{getDaysRemaining(goal.deadline)} days left</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="text-right">
                        <p className="text-sm font-semibold text-white">
                          {goal.progress}%
                        </p>
                        {goal.streakRequired && (
                          <p className="text-xs text-gray-400">
                            Streak: {goal.streakCurrent} days
                          </p>
                        )}
                      </div>
                      <div className="flex">
                        <button className="p-1 text-gray-400 hover:text-[#8B5CF6] transition-colors">
                          <Edit size={16} />
                        </button>
                        <button className="p-1 text-gray-400 hover:text-red-500 transition-colors">
                          <Trash size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="w-full bg-[#0F172A] rounded-full h-2.5 mb-1">
                    <div 
                      className="h-2.5 rounded-full" 
                      style={{ 
                        width: `${goal.progress}%`, 
                        backgroundColor: getCategoryColor(goal.category)
                      }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-400">
                    <span>Current: {goal.current} {goal.unit}</span>
                    <span>Target: {goal.target} {goal.unit}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Completed goals */}
          <div className="bg-gradient-to-br from-[#1E293B] to-[#0F172A] rounded-xl shadow-lg border border-[#334155] p-5">
            <h3 className="text-lg font-semibold text-white mb-6">Completed Goals</h3>
            
            <div className="space-y-4">
              {completedGoals.slice(0, 3).map((goal) => (
                <div key={goal.id} className="p-4 bg-[#1E293B]/70 rounded-lg border border-[#334155] hover:border-[#8B5CF6] transition-colors cursor-pointer">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <div 
                        className="w-10 h-10 rounded-lg flex items-center justify-center text-xl mr-3"
                        style={{ backgroundColor: `${getCategoryColor(goal.category)}20` }}
                      >
                        <span>{goal.icon}</span>
                      </div>
                      <div>
                        <h4 className="text-white font-medium">{goal.title}</h4>
                        <div className="flex items-center text-xs text-gray-400">
                          <span>{getCategoryIcon(goal.category)}</span>
                          <span className="ml-1 capitalize">{goal.category}</span>
                          <span className="mx-1">•</span>
                          <span>Completed on {formatDate(goal.completedDate)}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="bg-green-500/20 text-green-500 text-xs px-2 py-1 rounded-full">
                        Completed
                      </div>
                      <p className="text-xs text-gray-400 mt-1">
                        In {goal.completionTime} days
                      </p>
                    </div>
                  </div>
                  
                  <div className="w-full bg-[#0F172A] rounded-full h-2.5 mb-1">
                    <div 
                      className="h-2.5 rounded-full bg-green-500" 
                      style={{ width: '100%' }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-400">
                    <span>Achieved: {goal.target} {goal.unit}</span>
                    <span>{getTimePeriod(goal.startDate, goal.completedDate)}</span>
                  </div>
                </div>
              ))}
            </div>
            
            <button className="w-full mt-4 py-2 border border-[#334155] text-[#8B5CF6] rounded-lg hover:bg-[#8B5CF6]/10 transition-colors">
              View All Completed Goals
            </button>
          </div>
        </div>
      )}{activeView === 'achievements' && (
        <div>
          {/* Achievements filter */}
          <div className="bg-gradient-to-br from-[#1E293B] to-[#0F172A] rounded-xl shadow-lg border border-[#334155] p-5 mb-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex space-x-2 overflow-x-auto pb-2 md:pb-0">
                <button 
                  className={`px-3 py-1 rounded-lg text-sm ${achievementCategoryFilter === 'all' ? 'bg-[#8B5CF6] text-white' : 'bg-[#0F172A] border border-[#334155] text-gray-400 hover:border-[#8B5CF6] transition-colors'}`}
                  onClick={() => setAchievementCategoryFilter('all')}
                >
                  All
                </button>
                {achievementCategories.map(category => (
                  <button 
                    key={category.id}
                    className={`px-3 py-1 rounded-lg text-sm flex items-center ${achievementCategoryFilter === category.id ? 'bg-[#8B5CF6] text-white' : 'bg-[#0F172A] border border-[#334155] text-gray-400 hover:border-[#8B5CF6] transition-colors'}`}
                    onClick={() => setAchievementCategoryFilter(category.id)}
                  >
                    <span className="mr-1">{category.icon}</span>
                    <span>{category.name}</span>
                  </button>
                ))}
              </div>
              
              <div className="flex space-x-2">
                <div className="relative">
                  <select className="appearance-none bg-[#0F172A] border border-[#334155] text-gray-400 text-sm rounded-lg p-2 pr-8 focus:outline-none focus:ring-1 focus:ring-[#8B5CF6] focus:border-[#8B5CF6]">
                    <option>All Status</option>
                    <option>Unlocked</option>
                    <option>In Progress</option>
                    <option>Locked</option>
                  </select>
                  <ChevronDown size={14} className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
                
                <div className="relative">
                  <select className="appearance-none bg-[#0F172A] border border-[#334155] text-gray-400 text-sm rounded-lg p-2 pr-8 focus:outline-none focus:ring-1 focus:ring-[#8B5CF6] focus:border-[#8B5CF6]">
                    <option>All Rarity</option>
                    <option>Common</option>
                    <option>Uncommon</option>
                    <option>Rare</option>
                    <option>Epic</option>
                    <option>Legendary</option>
                  </select>
                  <ChevronDown size={14} className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>
          
          {/* Unlocked achievements */}
          <div className="bg-gradient-to-br from-[#1E293B] to-[#0F172A] rounded-xl shadow-lg border border-[#334155] p-5 mb-6">
            <h3 className="text-lg font-semibold text-white mb-6">Unlocked Achievements</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredAchievements.filter(a => a.unlocked).map((achievement) => (
                <div 
                  key={achievement.id} 
                  className="bg-[#0F172A] rounded-lg border border-[#334155] hover:border-[#8B5CF6] transition-colors cursor-pointer overflow-hidden"
                  onClick={() => handleAchievementSelect(achievement)}
                >
                  <div 
                    className="h-20 flex items-center justify-center"
                    style={{ backgroundColor: `${rarityColors[achievement.rarity]}10` }}
                  >
                    <div 
                      className="w-16 h-16 rounded-full flex items-center justify-center text-3xl"
                      style={{ 
                        backgroundColor: `${rarityColors[achievement.rarity]}20`, 
                        borderWidth: '2px',
                        borderStyle: 'solid',
                        borderColor: rarityColors[achievement.rarity]
                      }}
                    >
                      <span>{achievement.icon}</span>
                    </div>
                  </div>
                  
                  <div className="p-3">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="text-white text-sm font-medium">{achievement.title}</h4>
                      <div 
                        className="text-xs px-2 py-0.5 rounded-full capitalize"
                        style={{ 
                          backgroundColor: `${rarityColors[achievement.rarity]}20`,
                          color: rarityColors[achievement.rarity]
                        }}
                      >
                        {achievement.rarity}
                      </div>
                    </div>
                    <p className="text-gray-400 text-xs mb-2">{achievement.description}</p>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-400">Unlocked on:</span>
                      <span className="text-gray-300">{formatDate(achievement.unlockedDate)}</span>
                    </div>
                  </div>
                </div>
              ))}
              
              {filteredAchievements.filter(a => a.unlocked).length === 0 && (
                <div className="col-span-full text-center py-8">
                  <Award size={40} className="text-gray-500 mx-auto mb-2" />
                  <p className="text-gray-400 text-sm">No achievements unlocked in this category yet</p>
                </div>
              )}
            </div>
          </div>
          
          {/* In-progress achievements */}
          <div className="bg-gradient-to-br from-[#1E293B] to-[#0F172A] rounded-xl shadow-lg border border-[#334155] p-5">
            <h3 className="text-lg font-semibold text-white mb-6">In Progress</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredAchievements.filter(a => !a.unlocked).map((achievement) => (
                <div 
                  key={achievement.id} 
                  className="bg-[#0F172A] rounded-lg border border-[#334155] hover:border-[#8B5CF6] transition-colors cursor-pointer overflow-hidden"
                  onClick={() => handleAchievementSelect(achievement)}
                >
                  <div 
                    className="h-20 flex items-center justify-center"
                    style={{ backgroundColor: `${rarityColors[achievement.rarity]}10` }}
                  >
                    <div 
                      className="w-16 h-16 rounded-full flex items-center justify-center text-3xl bg-[#1E293B]/50 border-2 border-[#334155]"
                    >
                      <span className="opacity-50">{achievement.icon}</span>
                    </div>
                  </div>
                  
                  <div className="p-3">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="text-white text-sm font-medium">{achievement.title}</h4>
                      <div 
                        className="text-xs px-2 py-0.5 rounded-full capitalize"
                        style={{ 
                          backgroundColor: `${rarityColors[achievement.rarity]}10`,
                          color: rarityColors[achievement.rarity]
                        }}
                      >
                        {achievement.rarity}
                      </div>
                    </div>
                    <p className="text-gray-400 text-xs mb-2">{achievement.description}</p>
                    <div className="w-full bg-[#1E293B] rounded-full h-1.5 mb-1">
                      <div 
                        className="h-1.5 rounded-full" 
                        style={{ 
                          width: `${(achievement.progress / achievement.total) * 100}%`,
                          backgroundColor: rarityColors[achievement.rarity]
                        }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-400">
                      <span>Progress:</span>
                      <span>{achievement.progress}/{achievement.total}</span>
                    </div>
                  </div>
                </div>
              ))}
              
              {filteredAchievements.filter(a => !a.unlocked).length === 0 && (
                <div className="col-span-full text-center py-8">
                  <Trophy size={40} className="text-gray-500 mx-auto mb-2" />
                  <p className="text-gray-400 text-sm">No achievements in progress in this category</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      
      {activeView === 'challenges' && (
        <div>
          {/* Challenges filter */}
          <div className="bg-gradient-to-br from-[#1E293B] to-[#0F172A] rounded-xl shadow-lg border border-[#334155] p-5 mb-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="relative flex-1">
                <input 
                  type="text" 
                  placeholder="Search challenges..."
                  className="w-full bg-[#0F172A] border border-[#334155] text-gray-300 rounded-lg py-2 px-4 pl-10 focus:outline-none focus:ring-1 focus:ring-[#8B5CF6] focus:border-[#8B5CF6]"
                />
                <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
              
              <div className="flex space-x-2">
                <div className="relative">
                  <select className="appearance-none bg-[#0F172A] border border-[#334155] text-gray-400 text-sm rounded-lg p-2 pr-8 focus:outline-none focus:ring-1 focus:ring-[#8B5CF6] focus:border-[#8B5CF6]">
                    <option>All Categories</option>
                    {goalCategories.map(category => (
                      <option key={category.id}>{category.name}</option>
                    ))}
                  </select>
                  <ChevronDown size={14} className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
                
                <div className="relative">
                  <select className="appearance-none bg-[#0F172A] border border-[#334155] text-gray-400 text-sm rounded-lg p-2 pr-8 focus:outline-none focus:ring-1 focus:ring-[#8B5CF6] focus:border-[#8B5CF6]">
                    <option>All Difficulty</option>
                    <option>Beginner</option>
                    <option>Intermediate</option>
                    <option>Advanced</option>
                  </select>
                  <ChevronDown size={14} className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
                
                <button className="p-2 bg-[#0F172A] border border-[#334155] text-gray-400 rounded-lg hover:border-[#8B5CF6] hover:text-[#8B5CF6] transition-colors">
                  <Filter size={16} />
                </button>
              </div>
            </div>
          </div>
          
          {/* Active challenges */}
          <div className="bg-gradient-to-br from-[#1E293B] to-[#0F172A] rounded-xl shadow-lg border border-[#334155] p-5 mb-6">
            <h3 className="text-lg font-semibold text-white mb-6">Your Active Challenges</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {communityChallenges.filter(c => c.joined).map((challenge) => (
                <div 
                  key={challenge.id} 
                  className="bg-[#0F172A] rounded-lg border border-[#334155] hover:border-[#8B5CF6] transition-colors cursor-pointer overflow-hidden"
                  onClick={() => handleChallengeSelect(challenge)}
                >
                  <div className="p-4">
                    <div className="flex items-center mb-3">
                      <div 
                        className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl mr-3"
                        style={{ backgroundColor: `${getCategoryColor(challenge.category)}20` }}
                      >
                        <span>{challenge.icon}</span>
                      </div>
                      <div>
                        <h4 className="text-white text-sm font-medium">{challenge.title}</h4>
                        <div className="flex items-center text-xs text-gray-400">
                          <span>{getCategoryIcon(challenge.category)}</span>
                          <span className="ml-1 capitalize">{challenge.category}</span>
                          <span className="mx-1">•</span>
                          <span className="capitalize">{challenge.difficulty}</span>
                          <span className="mx-1">•</span>
                          <Users size={12} className="mr-1" />
                          <span>{challenge.participants.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-xs text-gray-400 mb-3">{challenge.description}</p>
                    
                    <div className="flex items-center justify-between text-xs text-gray-400 mb-3">
                      <span>Started: {formatDate(challenge.startDate)}</span>
                      <span>Ends: {formatDate(challenge.endDate)}</span>
                    </div>
                    
                    <div className="w-full bg-[#1E293B] rounded-full h-2 mb-1">
                      <div 
                        className="h-2 rounded-full" 
                        style={{ 
                          width: `${challenge.progress}%`,
                          backgroundColor: getCategoryColor(challenge.category) 
                        }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-400">Progress: {challenge.progress}%</span>
                      <span 
                        className="font-medium"
                        style={{ color: getCategoryColor(challenge.category) }}
                      >
                        {challenge.milestones.filter(m => m.completed).length}/{challenge.milestones.length} milestones
                      </span>
                    </div>
                  </div>
                </div>
              ))}
              
              {communityChallenges.filter(c => c.joined).length === 0 && (
                <div className="col-span-full text-center py-12">
                  <Users size={48} className="text-gray-500 mx-auto mb-3" />
                  <p className="text-gray-300 mb-2">You haven't joined any challenges yet</p>
                  <p className="text-gray-400 text-sm max-w-md mx-auto mb-4">Join community challenges to compete with others and earn exclusive achievements</p>
                </div>
              )}
            </div>
          </div>
          
          {/* Available challenges */}
          <div className="bg-gradient-to-br from-[#1E293B] to-[#0F172A] rounded-xl shadow-lg border border-[#334155] p-5">
            <h3 className="text-lg font-semibold text-white mb-6">Available Challenges</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {communityChallenges.filter(c => !c.joined).map((challenge) => (
                <div 
                  key={challenge.id} 
                  className="bg-[#0F172A] rounded-lg border border-[#334155] hover:border-[#8B5CF6] transition-colors cursor-pointer overflow-hidden"
                  onClick={() => handleChallengeSelect(challenge)}
                >
                  <div className="p-4">
                    <div className="flex items-center mb-3">
                      <div 
                        className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl mr-3"
                        style={{ backgroundColor: `${getCategoryColor(challenge.category)}20` }}
                      >
                        <span>{challenge.icon}</span>
                      </div>
                      <div>
                        <h4 className="text-white text-sm font-medium">{challenge.title}</h4>
                        <div className="flex items-center text-xs text-gray-400">
                          <span>{getCategoryIcon(challenge.category)}</span>
                          <span className="ml-1 capitalize">{challenge.category}</span>
                          <span className="mx-1">•</span>
                          <span className="capitalize">{challenge.difficulty}</span>
                          <span className="mx-1">•</span>
                          <Users size={12} className="mr-1" />
                          <span>{challenge.participants.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-xs text-gray-400 mb-3">{challenge.description}</p>
                    
                    <div className="flex items-center justify-between text-xs text-gray-400 mb-3">
                      <span>Starts: {formatDate(challenge.startDate)}</span>
                      <span>Ends: {formatDate(challenge.endDate)}</span>
                    </div>
                    
                    <div className="flex justify-end mt-2">
                      <button 
                        className="py-1.5 px-3 bg-[#8B5CF6] text-white rounded hover:bg-[#7C3AED] transition-colors text-sm"
                      >
                        Join Challenge
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      
      {/* Goal creation form (shown when showCreateGoal is true) */}
      {showCreateGoal && !selectedTemplate && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/70 p-4">
          <div className="bg-[#1E293B] rounded-xl shadow-xl border border-[#334155] w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">Create New Goal</h3>
                <button 
                  onClick={() => setShowCreateGoal(false)}
                  className="text-gray-400 hover:text-white transition-colors text-xl"
                >
                  &times;
                </button>
              </div>
              
              <p className="text-gray-400 mb-6">Choose a template to get started quickly or create a goal from scratch</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                {goalTemplates.map((template) => (
                  <div 
                    key={template.id}
                    className="bg-[#0F172A] rounded-lg border border-[#334155] p-4 hover:border-[#8B5CF6] cursor-pointer transition-colors"
                    onClick={() => handleTemplateSelect(template)}
                  >
                    <div className="flex items-center mb-2">
                      <div 
                        className="w-10 h-10 rounded-lg flex items-center justify-center text-xl mr-3"
                        style={{ backgroundColor: `${getCategoryColor(template.category)}20` }}
                      >
                        <span>{template.icon}</span>
                      </div>
                      <div>
                        <h4 className="text-white text-sm font-medium">{template.title}</h4>
                        <div className="flex items-center text-xs text-gray-400">
                          <span>{getCategoryIcon(template.category)}</span>
                          <span className="ml-1 capitalize">{template.category}</span>
                          {template.popularity === 'high' && (
                            <>
                              <span className="mx-1">•</span>
                              <Flame size={10} className="text-[#F472B6] mr-1" />
                              <span>Popular</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    <p className="text-xs text-gray-400">{template.description}</p>
                  </div>
                ))}
              </div>
              
              <div className="flex justify-between items-center border-t border-[#334155] pt-4">
                <div className="space-x-2">
                  <button 
                    onClick={() => setShowCreateGoal(false)}
                    className="py-2 px-4 border border-[#334155] text-gray-400 rounded-lg hover:bg-[#1E293B] transition-colors"
                  >
                    Cancel
                  </button>
                </div>
                <button className="py-2 px-4 bg-[#8B5CF6] text-white rounded-lg hover:bg-[#7C3AED] transition-colors">
                  Create Custom Goal
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Goal template form (shown when both showCreateGoal and selectedTemplate are true) */}
      {showCreateGoal && selectedTemplate && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/70 p-4">
          <div className="bg-[#1E293B] rounded-xl shadow-xl border border-[#334155] w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <div 
                    className="w-10 h-10 rounded-lg flex items-center justify-center text-xl mr-3"
                    style={{ backgroundColor: `${getCategoryColor(selectedTemplate.category)}20` }}
                  >
                    <span>{selectedTemplate.icon}</span>
                  </div>
                  <h3 className="text-xl font-bold text-white">{selectedTemplate.title}</h3>
                </div>
                <button 
                  onClick={() => setShowCreateGoal(false)}
                  className="text-gray-400 hover:text-white transition-colors text-xl"
                >
                  &times;
                </button>
              </div>
              
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Goal Title</label>
                  <input 
                    type="text" 
                    className="w-full bg-[#0F172A] border border-[#334155] text-white rounded-lg py-2 px-4 focus:outline-none focus:ring-1 focus:ring-[#8B5CF6] focus:border-[#8B5CF6]"
                    placeholder="Enter a name for your goal"
                    defaultValue={selectedTemplate.title}
                  />
                </div>
                
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Description</label>
                  <textarea 
                    className="w-full bg-[#0F172A] border border-[#334155] text-white rounded-lg py-2 px-4 focus:outline-none focus:ring-1 focus:ring-[#8B5CF6] focus:border-[#8B5CF6]"
                    rows="2"
                    placeholder="Describe your goal"
                    defaultValue={selectedTemplate.description}
                  ></textarea>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Target Value</label>
                    <input 
                      type="number" 
                      className="w-full bg-[#0F172A] border border-[#334155] text-white rounded-lg py-2 px-4 focus:outline-none focus:ring-1 focus:ring-[#8B5CF6] focus:border-[#8B5CF6]"
                      placeholder="Enter target"
                      defaultValue={selectedTemplate.defaultTarget}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Unit</label>
                    <input 
                      type="text" 
                      className="w-full bg-[#0F172A] border border-[#334155] text-white rounded-lg py-2 px-4 focus:outline-none focus:ring-1 focus:ring-[#8B5CF6] focus:border-[#8B5CF6]"
                      placeholder="e.g., lbs, miles, workouts"
                      defaultValue={selectedTemplate.defaultUnit}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Start Date</label>
                    <input 
                      type="date" 
                      className="w-full bg-[#0F172A] border border-[#334155] text-white rounded-lg py-2 px-4 focus:outline-none focus:ring-1 focus:ring-[#8B5CF6] focus:border-[#8B5CF6]"
                      defaultValue={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">End Date</label>
                    <input 
                      type="date" 
                      className="w-full bg-[#0F172A] border border-[#334155] text-white rounded-lg py-2 px-4 focus:outline-none focus:ring-1 focus:ring-[#8B5CF6] focus:border-[#8B5CF6]"
                      defaultValue={new Date(new Date().setDate(new Date().getDate() + selectedTemplate.defaultDuration)).toISOString().split('T')[0]}
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Priority</label>
                  <div className="flex space-x-2">
                    <button className="flex-1 py-2 bg-[#8B5CF6] text-white text-sm rounded">
                      High
                    </button>
                    <button className="flex-1 py-2 bg-[#0F172A] border border-[#334155] text-gray-400 text-sm rounded">
                      Medium
                    </button>
                    <button className="flex-1 py-2 bg-[#0F172A] border border-[#334155] text-gray-400 text-sm rounded">
                      Low
                    </button>
                  </div>
                </div>
                
                {selectedTemplate.requiresStreak && (
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-sm text-gray-400">Requires Daily Streak</label>
                      <div className="flex items-center">
                        <span className="text-xs text-gray-400 mr-2">Yes</span>
                        <div className="w-8 h-4 bg-[#8B5CF6] rounded-full relative">
                          <div className="absolute w-3 h-3 bg-white rounded-full top-0.5 right-0.5"></div>
                        </div>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500">You'll need to maintain a daily streak to complete this goal</p>
                  </div>
                )}
                
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-sm text-gray-400">Enable Reminders</label>
                    <div className="flex items-center">
                      <span className="text-xs text-gray-400 mr-2">Yes</span>
                      <div className="w-8 h-4 bg-[#8B5CF6] rounded-full relative">
                        <div className="absolute w-3 h-3 bg-white rounded-full top-0.5 right-0.5"></div>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    <div className="relative">
                      <select className="w-full appearance-none bg-[#0F172A] border border-[#334155] text-gray-400 text-sm rounded-lg p-2 pr-8 focus:outline-none focus:ring-1 focus:ring-[#8B5CF6] focus:border-[#8B5CF6]">
                        <option>Daily</option>
                        <option>Weekly</option>
                        <option>Custom</option>
                      </select>
                      <ChevronDown size={14} className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                    </div>
                    <input 
                      type="time" 
                      className="bg-[#0F172A] border border-[#334155] text-white rounded-lg py-2 px-4 focus:outline-none focus:ring-1 focus:ring-[#8B5CF6] focus:border-[#8B5CF6]"
                      defaultValue="08:00"
                    />
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between items-center border-t border-[#334155] pt-4">
                <button 
                  onClick={backToTemplates}
                  className="py-2 px-4 border border-[#334155] text-gray-400 rounded-lg hover:bg-[#1E293B] transition-colors flex items-center"
                >
                  <ArrowRight size={16} className="mr-1 transform rotate-180" />
                  <span>Back</span>
                </button>
                <div className="space-x-2">
                  <button 
                    onClick={() => setShowCreateGoal(false)}
                    className="py-2 px-4 border border-[#334155] text-gray-400 rounded-lg hover:bg-[#1E293B] transition-colors"
                  >
                    Cancel
                  </button>
                  <button className="py-2 px-4 bg-[#8B5CF6] text-white rounded-lg hover:bg-[#7C3AED] transition-colors">
                    Create Goal
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}{/* Goal details modal */}
      {selectedGoal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/70 p-4">
          <div className="bg-[#1E293B] rounded-xl shadow-xl border border-[#334155] w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <div 
                    className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl mr-4"
                    style={{ backgroundColor: `${getCategoryColor(selectedGoal.category)}20` }}
                  >
                    <span>{selectedGoal.icon}</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{selectedGoal.title}</h3>
                    <div className="flex items-center text-sm text-gray-400">
                      <span>{getCategoryIcon(selectedGoal.category)}</span>
                      <span className="ml-1 capitalize">{selectedGoal.category}</span>
                      <span className="mx-1">•</span>
                      {selectedGoal.priority === 'high' && (
                        <span className="text-red-400">High Priority</span>
                      )}
                      {selectedGoal.priority === 'medium' && (
                        <span className="text-yellow-400">Medium Priority</span>
                      )}
                      {selectedGoal.priority === 'low' && (
                        <span className="text-green-400">Low Priority</span>
                      )}
                    </div>
                  </div>
                </div>
                <button 
                  onClick={closeGoalDetails}
                  className="text-gray-400 hover:text-white transition-colors text-xl"
                >
                  &times;
                </button>
              </div>
              
              <p className="text-gray-400 mb-6">{selectedGoal.description}</p>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-[#0F172A] rounded-lg p-4">
                  <p className="text-xs text-gray-400 mb-1">Start Date</p>
                  <p className="text-sm font-medium text-white">{formatDate(selectedGoal.startDate)}</p>
                </div>
                <div className="bg-[#0F172A] rounded-lg p-4">
                  <p className="text-xs text-gray-400 mb-1">Target Date</p>
                  <div className="flex items-center">
                    <p className="text-sm font-medium text-white">{formatDate(selectedGoal.deadline)}</p>
                    <span className="text-xs ml-2 px-2 py-0.5 rounded-full bg-[#334155] text-gray-300">
                      {getDaysRemaining(selectedGoal.deadline)} days left
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-medium text-white">Progress</h4>
                  <span className="text-sm font-medium text-white">{selectedGoal.progress}%</span>
                </div>
                <div className="w-full bg-[#0F172A] rounded-full h-3 mb-1">
                  <div 
                    className="h-3 rounded-full" 
                    style={{ 
                      width: `${selectedGoal.progress}%`, 
                      backgroundColor: getCategoryColor(selectedGoal.category)
                    }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-gray-400">
                  <span>Current: {selectedGoal.current} {selectedGoal.unit}</span>
                  <span>Target: {selectedGoal.target} {selectedGoal.unit}</span>
                </div>
              </div>
              
              {selectedGoal.streakRequired && (
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-white mb-2">Current Streak</h4>
                  <div className="bg-[#0F172A] rounded-lg p-4 flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-[#8B5CF6]/20 text-[#8B5CF6] flex items-center justify-center text-xl mr-3">
                        🔥
                      </div>
                      <div>
                        <p className="text-white text-sm font-medium">{selectedGoal.streakCurrent} days</p>
                        <p className="text-xs text-gray-400">Target: {selectedGoal.streakTarget} days</p>
                      </div>
                    </div>
                    <div className="w-16 h-16 relative">
                      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                        <circle cx="18" cy="18" r="16" fill="none" className="stroke-[#334155]" strokeWidth="3"></circle>
                        <circle 
                          cx="18" cy="18" r="16" 
                          fill="none" 
                          className="stroke-[#8B5CF6]" 
                          strokeWidth="3" 
                          strokeDasharray={`${(selectedGoal.streakCurrent / selectedGoal.streakTarget) * 100} 100`}
                          strokeLinecap="round"
                        ></circle>
                      </svg>
                      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                        <span className="text-xs font-medium text-white">{Math.round((selectedGoal.streakCurrent / selectedGoal.streakTarget) * 100)}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="mb-6">
                <h4 className="text-sm font-medium text-white mb-2">Reminders</h4>
                <div className="bg-[#0F172A] rounded-lg p-4 flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-[#F472B6]/20 text-[#F472B6] flex items-center justify-center mr-3">
                      <Clock size={20} />
                    </div>
                    <div>
                      <p className="text-white text-sm font-medium">
                        {selectedGoal.reminderFrequency === 'daily' && 'Daily Reminder'}
                        {selectedGoal.reminderFrequency === 'weekly' && 'Weekly Reminder'}
                      </p>
                      <p className="text-xs text-gray-400">{selectedGoal.reminderEnabled ? 'Enabled' : 'Disabled'}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className="text-xs text-gray-400 mr-2">{selectedGoal.reminderEnabled ? 'On' : 'Off'}</span>
                    <div className={`w-8 h-4 ${selectedGoal.reminderEnabled ? 'bg-[#8B5CF6]' : 'bg-[#334155]'} rounded-full relative`}>
                      <div className={`absolute w-3 h-3 bg-white rounded-full top-0.5 ${selectedGoal.reminderEnabled ? 'right-0.5' : 'left-0.5'}`}></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between pt-6 border-t border-[#334155]">
                <div className="space-x-2">
                  <button className="py-2 px-4 border border-[#334155] text-gray-400 rounded-lg hover:bg-[#1E293B] transition-colors">
                    Edit Goal
                  </button>
                  <button className="py-2 px-4 border border-red-500/30 text-red-400 rounded-lg hover:bg-red-500/10 transition-colors">
                    Delete
                  </button>
                </div>
                {selectedGoal.status === 'in-progress' && (
                  <button className="py-2 px-4 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
                    Mark as Complete
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Achievement details modal */}
      {selectedAchievement && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/70 p-4">
          <div className="bg-[#1E293B] rounded-xl shadow-xl border border-[#334155] w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-end mb-6">
                <button 
                  onClick={closeAchievementDetails}
                  className="text-gray-400 hover:text-white transition-colors text-xl"
                >
                  &times;
                </button>
              </div>
              
              <div 
                className="h-24 rounded-lg mb-6 flex items-center justify-center"
                style={{ backgroundColor: `${rarityColors[selectedAchievement.rarity]}10` }}
              >
                <div 
                  className="w-20 h-20 rounded-full flex items-center justify-center text-4xl"
                  style={{ 
                    backgroundColor: `${rarityColors[selectedAchievement.rarity]}20`, 
                    borderWidth: '2px',
                    borderStyle: 'solid',
                    borderColor: rarityColors[selectedAchievement.rarity],
                    opacity: selectedAchievement.unlocked ? 1 : 0.5
                  }}
                >
                  <span>{selectedAchievement.icon}</span>
                </div>
              </div>
              
              <div className="text-center mb-6">
                <div className="flex items-center justify-center mb-1">
                  <h3 className="text-xl font-bold text-white mr-2">{selectedAchievement.title}</h3>
                  <div 
                    className="text-xs px-2 py-0.5 rounded-full capitalize"
                    style={{ 
                      backgroundColor: `${rarityColors[selectedAchievement.rarity]}20`,
                      color: rarityColors[selectedAchievement.rarity]
                    }}
                  >
                    {selectedAchievement.rarity}
                  </div>
                </div>
                <p className="text-gray-300">{selectedAchievement.description}</p>
              </div>
              
              {selectedAchievement.unlocked ? (
                <div className="bg-[#0F172A] rounded-lg p-4 mb-6 flex items-center">
                  <div className="w-10 h-10 rounded-full bg-green-500/20 text-green-500 flex items-center justify-center mr-3">
                    <CheckCircle size={20} />
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium">Achievement Unlocked</p>
                    <p className="text-xs text-gray-400">on {formatDate(selectedAchievement.unlockedDate)}</p>
                  </div>
                </div>
              ) : (
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-medium text-white">Progress</h4>
                    <span className="text-sm font-medium text-white">{Math.round((selectedAchievement.progress / selectedAchievement.total) * 100)}%</span>
                  </div>
                  <div className="w-full bg-[#0F172A] rounded-full h-2.5 mb-1">
                    <div 
                      className="h-2.5 rounded-full" 
                      style={{ 
                        width: `${(selectedAchievement.progress / selectedAchievement.total) * 100}%`, 
                        backgroundColor: rarityColors[selectedAchievement.rarity]
                      }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-400">
                    <span>Progress: {selectedAchievement.progress}/{selectedAchievement.total}</span>
                    <span>Keep going!</span>
                  </div>
                </div>
              )}
              
              <div className="flex justify-center pt-6 border-t border-[#334155]">
                <button 
                  onClick={closeAchievementDetails}
                  className="py-2 px-4 border border-[#334155] text-gray-400 rounded-lg hover:bg-[#1E293B] transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Challenge details modal */}
      {selectedChallenge && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/70 p-4">
          <div className="bg-[#1E293B] rounded-xl shadow-xl border border-[#334155] w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <div 
                    className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl mr-4"
                    style={{ backgroundColor: `${getCategoryColor(selectedChallenge.category)}20` }}
                  >
                    <span>{selectedChallenge.icon}</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{selectedChallenge.title}</h3>
                    <div className="flex items-center text-sm text-gray-400">
                      <span>{getCategoryIcon(selectedChallenge.category)}</span>
                      <span className="ml-1 capitalize">{selectedChallenge.category}</span>
                      <span className="mx-1">•</span>
                      <span className="capitalize">{selectedChallenge.difficulty}</span>
                    </div>
                  </div>
                </div>
                <button 
                  onClick={closeChallengeDetails}
                  className="text-gray-400 hover:text-white transition-colors text-xl"
                >
                  &times;
                </button>
              </div>
              
              <p className="text-gray-400 mb-6">{selectedChallenge.description}</p>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-[#0F172A] rounded-lg p-4">
                  <p className="text-xs text-gray-400 mb-1">Start Date</p>
                  <p className="text-sm font-medium text-white">{formatDate(selectedChallenge.startDate)}</p>
                </div>
                <div className="bg-[#0F172A] rounded-lg p-4">
                  <p className="text-xs text-gray-400 mb-1">End Date</p>
                  <p className="text-sm font-medium text-white">{formatDate(selectedChallenge.endDate)}</p>
                </div>
              </div>
              
              {selectedChallenge.joined && (
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-medium text-white">Overall Progress</h4>
                    <span className="text-sm font-medium text-white">{selectedChallenge.progress}%</span>
                  </div>
                  <div className="w-full bg-[#0F172A] rounded-full h-3 mb-1">
                    <div 
                      className="h-3 rounded-full" 
                      style={{ 
                        width: `${selectedChallenge.progress}%`, 
                        backgroundColor: getCategoryColor(selectedChallenge.category)
                      }}
                    ></div>
                  </div>
                </div>
              )}
              
              <div className="mb-6">
                <h4 className="text-sm font-medium text-white mb-3">Milestones</h4>
                <div className="space-y-3">
                  {selectedChallenge.milestones.map((milestone, index) => (
                    <div 
                      key={index} 
                      className={`p-3 rounded-lg border ${milestone.completed ? 'bg-[#0F172A]/70 border-green-500/30' : 'bg-[#0F172A] border-[#334155]'}`}
                    >
                      <div className="flex items-center">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 ${milestone.completed ? 'bg-green-500/20 text-green-500' : 'bg-[#334155] text-gray-400'}`}>
                          {milestone.completed ? <CheckCircle size={14} /> : (index + 1)}
                        </div>
                        <p className={`text-sm ${milestone.completed ? 'text-green-400' : 'text-white'}`}>
                          {milestone.title}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-[#0F172A] rounded-lg p-4 mb-6">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-medium text-white">Community Participation</h4>
                  <Users size={16} className="text-[#8B5CF6]" />
                </div>
                <p className="text-sm text-gray-400 mb-3">{selectedChallenge.participants.toLocaleString()} people participating in this challenge</p>
                
                <div className="flex -space-x-2">
                  {/* Avatar placeholders */}
                  {[...Array(5)].map((_, i) => (
                    <div 
                      key={i} 
                      className="w-8 h-8 rounded-full border-2 border-[#1E293B] bg-gradient-to-br from-[#334155] to-[#1E293B] flex items-center justify-center text-xs text-white font-medium"
                    >
                      {String.fromCharCode(65 + i)}
                    </div>
                  ))}
                  <div className="w-8 h-8 rounded-full border-2 border-[#1E293B] bg-[#8B5CF6] flex items-center justify-center text-xs text-white font-medium">
                    +{selectedChallenge.participants - 5}
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between pt-6 border-t border-[#334155]">
                {selectedChallenge.joined ? (
                  <>
                    <button className="py-2 px-4 border border-red-500/30 text-red-400 rounded-lg hover:bg-red-500/10 transition-colors">
                      Leave Challenge
                    </button>
                    <button className="py-2 px-4 bg-[#8B5CF6] text-white rounded-lg hover:bg-[#7C3AED] transition-colors">
                      Update Progress
                    </button>
                  </>
                ) : (
                  <>
                    <button 
                      onClick={closeChallengeDetails}
                      className="py-2 px-4 border border-[#334155] text-gray-400 rounded-lg hover:bg-[#1E293B] transition-colors"
                    >
                      Close
                    </button>
                    <button className="py-2 px-4 bg-[#8B5CF6] text-white rounded-lg hover:bg-[#7C3AED] transition-colors">
                      Join Challenge
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default GoalsTab