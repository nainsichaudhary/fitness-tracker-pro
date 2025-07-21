import React, { useState } from 'react';
import { 
  BarChart3, 
  Plus, 
  Clock, 
  ChevronRight, 
  Droplets, 
  ChevronDown, 
  ArrowUp, 
  ArrowDown, 
  Search,
  Heart,
  Calendar,
  Utensils,
  Zap,
  BookOpen,
  Flame,
  Star
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { 
  todaysMeals, 
  mealHistory, 
  nutritionTargets, 
  mealRecommendations,
  recipeCatalog,
  nutritionInsights,
  nutritionChartData,
  waterTrackingData,
  nutritionGoals
} from './nutritionData.js';

const NutritionTab = () => {
  const [activeView, setActiveView] = useState('daily');
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Calculate the totals for today
  const calculateDailyTotals = () => {
    let calories = 0;
    let protein = 0;
    let carbs = 0;
    let fat = 0;

    todaysMeals.forEach(meal => {
      if (meal.completed) {
        calories += meal.totalCalories;
        protein += meal.totalProtein;
        carbs += meal.totalCarbs;
        fat += meal.totalFat;
      }
    });

    return { calories, protein, carbs, fat };
  };

  const dailyTotals = calculateDailyTotals();

  // Calculate percentage of daily targets
  const caloriePercentage = Math.round((dailyTotals.calories / nutritionTargets.calories.daily) * 100);
  const proteinPercentage = Math.round((dailyTotals.protein / nutritionTargets.macros.protein.target) * 100);
  const carbsPercentage = Math.round((dailyTotals.carbs / nutritionTargets.macros.carbs.target) * 100);
  const fatPercentage = Math.round((dailyTotals.fat / nutritionTargets.macros.fat.target) * 100);
  const waterPercentage = Math.round((waterTrackingData.current / waterTrackingData.target) * 100);

  // Function to format dates
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  // Function to handle meal selection
  const handleMealSelect = (meal) => {
    setSelectedMeal(meal);
  };

  // Function to close meal details
  const closeMealDetails = () => {
    setSelectedMeal(null);
  };

  // Function to handle recipe selection
  const handleRecipeSelect = (recipe) => {
    setSelectedRecipe(recipe);
  };

  // Function to close recipe details
  const closeRecipeDetails = () => {
    setSelectedRecipe(null);
  };

  // Filter recipes based on search query
  const filteredRecipes = searchQuery 
    ? recipeCatalog.filter(recipe => 
        recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        recipe.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        recipe.ingredients.some(ing => ing.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : recipeCatalog;

  return (
    <div className="container mx-auto max-w-7xl">
      {/* Page header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-white">Nutrition</h2>
          <p className="text-gray-400">Track, plan, and optimize your daily nutrition</p>
        </div>
        <button className="mt-4 md:mt-0 flex items-center justify-center px-4 py-2 bg-[#8B5CF6] text-white rounded-lg hover:bg-[#7C3AED] transition-colors">
          <Plus size={18} className="mr-2" />
          <span>Log Food</span>
        </button>
      </div>

      {/* Tab navigation */}
      <div className="bg-[#1E293B] rounded-lg mb-6 p-1 flex space-x-1">
        <button 
          onClick={() => setActiveView('daily')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${activeView === 'daily' ? 'bg-[#0F172A] text-white' : 'text-gray-400 hover:text-white'}`}
        >
          Daily Log
        </button>
        <button 
          onClick={() => setActiveView('meals')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${activeView === 'meals' ? 'bg-[#0F172A] text-white' : 'text-gray-400 hover:text-white'}`}
        >
          Meal Plans
        </button>
        <button 
          onClick={() => setActiveView('recipes')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${activeView === 'recipes' ? 'bg-[#0F172A] text-white' : 'text-gray-400 hover:text-white'}`}
        >
          Recipes
        </button>
        <button 
          onClick={() => setActiveView('insights')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${activeView === 'insights' ? 'bg-[#0F172A] text-white' : 'text-gray-400 hover:text-white'}`}
        >
          Insights
        </button>
      </div>

      {/* Content based on active view */}
      {activeView === 'daily' && (
        <div>
          {/* Calorie and macronutrient summary */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-gradient-to-br from-[#1E293B] to-[#0F172A] rounded-xl shadow-lg border border-[#334155] p-5 hover:shadow-[0_8px_30px_rgba(139,92,246,0.15)] transition-shadow duration-300">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium text-gray-400">Calories</p>
                <div className="flex items-center">
                  <Flame size={16} className="text-[#F472B6] mr-1" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">{dailyTotals.calories}</h3>
              <div className="w-full bg-[#334155] rounded-full h-2 mb-1">
                <div 
                  className="bg-[#F472B6] h-2 rounded-full" 
                  style={{ width: `${caloriePercentage}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-400">Goal: {nutritionTargets.calories.daily}</span>
                <span className="text-gray-400">{caloriePercentage}%</span>
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#1E293B] to-[#0F172A] rounded-xl shadow-lg border border-[#334155] p-5 hover:shadow-[0_8px_30px_rgba(139,92,246,0.15)] transition-shadow duration-300">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium text-gray-400">Protein</p>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">{dailyTotals.protein}g</h3>
              <div className="w-full bg-[#334155] rounded-full h-2 mb-1">
                <div 
                  className="bg-[#8B5CF6] h-2 rounded-full" 
                  style={{ width: `${proteinPercentage}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-400">Goal: {nutritionTargets.macros.protein.target}g</span>
                <span className="text-gray-400">{proteinPercentage}%</span>
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#1E293B] to-[#0F172A] rounded-xl shadow-lg border border-[#334155] p-5 hover:shadow-[0_8px_30px_rgba(139,92,246,0.15)] transition-shadow duration-300">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium text-gray-400">Carbs</p>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">{dailyTotals.carbs}g</h3>
              <div className="w-full bg-[#334155] rounded-full h-2 mb-1">
                <div 
                  className="bg-[#F59E0B] h-2 rounded-full" 
                  style={{ width: `${carbsPercentage}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-400">Goal: {nutritionTargets.macros.carbs.target}g</span>
                <span className="text-gray-400">{carbsPercentage}%</span>
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#1E293B] to-[#0F172A] rounded-xl shadow-lg border border-[#334155] p-5 hover:shadow-[0_8px_30px_rgba(139,92,246,0.15)] transition-shadow duration-300">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium text-gray-400">Fat</p>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">{dailyTotals.fat}g</h3>
              <div className="w-full bg-[#334155] rounded-full h-2 mb-1">
                <div 
                  className="bg-[#10B981] h-2 rounded-full" 
                  style={{ width: `${fatPercentage}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-400">Goal: {nutritionTargets.macros.fat.target}g</span>
                <span className="text-gray-400">{fatPercentage}%</span>
              </div>
            </div>
          </div>

          {/* Daily meals and water tracking */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            {/* Daily Meals */}
            <div className="lg:col-span-2">
              <div className="bg-gradient-to-br from-[#1E293B] to-[#0F172A] rounded-xl shadow-lg border border-[#334155] p-5">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-white">Today's Meals</h3>
                  <div className="relative">
                    <select className="appearance-none bg-[#0F172A] border border-[#334155] text-gray-400 text-sm rounded-lg p-2 pr-8 focus:outline-none focus:ring-1 focus:ring-[#8B5CF6] focus:border-[#8B5CF6]">
                      <option>Friday, March 28</option>
                      <option>Thursday, March 27</option>
                      <option>Wednesday, March 26</option>
                    </select>
                    <ChevronDown size={14} className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>
                </div>
                
                <div className="space-y-4">
                  {todaysMeals.map((meal) => (
                    <div 
                      key={meal.id} 
                      className="p-4 bg-[#1E293B]/70 rounded-lg border border-[#334155] hover:border-[#8B5CF6] transition-colors cursor-pointer"
                      onClick={() => handleMealSelect(meal)}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-lg bg-[#8B5CF6]/20 flex items-center justify-center text-xl mr-3">
                            {meal.meal === 'Breakfast' ? '🍳' : 
                             meal.meal === 'Lunch' ? '🍱' : 
                             meal.meal === 'Dinner' ? '🍽️' : '🥤'}
                          </div>
                          <div>
                            <h4 className="text-white font-medium">{meal.meal}</h4>
                            <p className="text-xs text-gray-400">{meal.time} · {meal.foods.length} items</p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <div className="text-right mr-3">
                            <p className="text-sm font-semibold text-white">{meal.totalCalories} kcal</p>
                            <p className="text-xs text-gray-400">{meal.totalProtein}g protein</p>
                          </div>
                          {meal.completed ? (
                            <div className="p-1 bg-green-500/20 rounded-full">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            </div>
                          ) : (
                            <div className="p-1 bg-yellow-500/20 rounded-full">
                              <Clock size={18} className="text-yellow-500" />
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-2">
                        {meal.foods.slice(0, 3).map((food, index) => (
                          <div key={index} className="bg-[#0F172A] rounded-lg px-2 py-1 text-xs text-gray-400 flex items-center">
                            <span className="mr-1">{food.icon}</span>
                            <span>{food.name}</span>
                          </div>
                        ))}
                        {meal.foods.length > 3 && (
                          <div className="bg-[#0F172A] rounded-lg px-2 py-1 text-xs text-gray-400">
                            +{meal.foods.length - 3} more
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                
                <button className="w-full mt-4 py-2 border border-[#334155] text-[#8B5CF6] rounded-lg hover:bg-[#8B5CF6]/10 transition-colors flex items-center justify-center">
                  <Plus size={16} className="mr-2" />
                  <span>Add Meal</span>
                </button>
              </div>
            </div>
            
            {/* Water Tracking */}
            <div className="lg:col-span-1">
              <div className="bg-gradient-to-br from-[#1E293B] to-[#0F172A] rounded-xl shadow-lg border border-[#334155] p-5 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white">Water Intake</h3>
                  <button className="text-[#0EA5E9] bg-[#0EA5E9]/20 p-2 rounded-lg">
                    <Droplets size={16} />
                  </button>
                </div>
                
                <div className="flex items-center justify-center mb-6">
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
                      <span className="text-2xl font-bold text-white">{waterTrackingData.current}L</span>
                      <span className="text-xs text-gray-400">of {waterTrackingData.target}L</span>
                    </div>
                  </div>
                </div>
                
                <h4 className="text-sm font-medium text-white mb-2">Today's Log</h4>
                <div className="space-y-2 mb-4">
                  {waterTrackingData.history.map((entry, index) => (
                    <div key={index} className="flex justify-between items-center p-2 bg-[#0F172A] rounded-lg">
                      <div className="flex items-center">
                        <div className="w-6 h-6 rounded-full bg-[#0EA5E9]/20 flex items-center justify-center mr-2">
                          <Droplets size={12} className="text-[#0EA5E9]" />
                        </div>
                        <span className="text-sm text-gray-300">{entry.time}</span>
                      </div>
                      <span className="text-sm font-medium text-white">{entry.amount}L</span>
                    </div>
                  ))}
                </div>
                
                <button className="w-full py-2 bg-[#0EA5E9] text-white rounded-lg hover:bg-[#0EA5E9]/90 transition-colors flex items-center justify-center">
                  <Plus size={16} className="mr-2" />
                  <span>Add Water</span>
                </button>
              </div>
              
              {/* Nutritional Tips */}
              <div className="bg-gradient-to-br from-[#1E293B] to-[#0F172A] rounded-xl shadow-lg border border-[#334155] p-5">
                <h3 className="text-lg font-semibold text-white mb-4">Quick Tips</h3>
                
                <div className="space-y-4">
                  <div className="p-3 bg-[#0F172A] rounded-lg border border-[#334155]">
                    <h4 className="text-sm font-medium text-white mb-1">Protein Goal</h4>
                    <p className="text-xs text-gray-400">Try adding a protein-rich snack between lunch and dinner to reach your daily goal.</p>
                  </div>
                  
                  <div className="p-3 bg-[#0F172A] rounded-lg border border-[#334155]">
                    <h4 className="text-sm font-medium text-white mb-1">Pre-Workout Nutrition</h4>
                    <p className="text-xs text-gray-400">Consume a balanced meal with carbs and protein 2-3 hours before your afternoon workout.</p>
                  </div>
                  
                  <div className="p-3 bg-[#0F172A] rounded-lg border border-[#334155]">
                    <h4 className="text-sm font-medium text-white mb-1">Hydration Reminder</h4>
                    <p className="text-xs text-gray-400">You're behind on water intake today. Try to drink 0.5L within the next hour.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Nutrition Trends */}
          <div className="bg-gradient-to-br from-[#1E293B] to-[#0F172A] rounded-xl shadow-lg border border-[#334155] p-5 mb-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-white">Nutrition Trends</h3>
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <span className="w-3 h-3 rounded-full bg-[#8B5CF6] mr-2"></span>
                  <span className="text-xs text-gray-400">Protein</span>
                </div>
                <div className="flex items-center">
                  <span className="w-3 h-3 rounded-full bg-[#F59E0B] mr-2"></span>
                  <span className="text-xs text-gray-400">Carbs</span>
                </div>
                <div className="flex items-center">
                  <span className="w-3 h-3 rounded-full bg-[#10B981] mr-2"></span>
                  <span className="text-xs text-gray-400">Fat</span>
                </div>
              </div>
            </div>
            
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={nutritionChartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="day" tick={{fontSize: 12}} stroke="#64748B" />
                  <YAxis tick={{fontSize: 12}} stroke="#64748B" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1E293B', 
                      borderColor: '#334155',
                      color: 'white'
                    }} 
                    labelStyle={{ color: 'white' }}
                  />
                  <Line type="monotone" dataKey="protein" stroke="#8B5CF6" strokeWidth={2} dot={{ fill: '#8B5CF6', r: 4 }} />
                  <Line type="monotone" dataKey="carbs" stroke="#F59E0B" strokeWidth={2} dot={{ fill: '#F59E0B', r: 4 }} />
                  <Line type="monotone" dataKey="fat" stroke="#10B981" strokeWidth={2} dot={{ fill: '#10B981', r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {activeView === 'meals' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Meal Plan Options */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-[#1E293B] to-[#0F172A] rounded-xl shadow-lg border border-[#334155] p-5 mb-6">
              <h3 className="text-lg font-semibold text-white mb-4">Meal Plans</h3>
              
              <div className="space-y-3">
                <div className="p-3 bg-[#0F172A] rounded-lg border border-[#8B5CF6] flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-lg bg-[#8B5CF6]/20 flex items-center justify-center text-xl mr-3">
                      <Zap className="text-[#8B5CF6]" size={20} />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-white">Current Plan</h4>
                      <p className="text-xs text-gray-400">High Protein</p>
                    </div>
                  </div>
                  <div className="bg-[#8B5CF6]/20 text-[#8B5CF6] px-2 py-1 rounded text-xs font-medium">
                    Active
                  </div>
                </div>
                
                <div className="p-3 bg-[#0F172A] rounded-lg border border-[#334155] hover:border-[#8B5CF6] transition-colors cursor-pointer">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-lg bg-[#F472B6]/20 flex items-center justify-center text-xl mr-3">
                      <Flame className="text-[#F472B6]" size={20} />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-white">Fat Loss</h4>
                      <p className="text-xs text-gray-400">Calorie deficit with high protein</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-3 bg-[#0F172A] rounded-lg border border-[#334155] hover:border-[#8B5CF6] transition-colors cursor-pointer">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-lg bg-[#F59E0B]/20 flex items-center justify-center text-xl mr-3">
                      <Zap className="text-[#F59E0B]" size={20} />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-white">Performance</h4>
                      <p className="text-xs text-gray-400">Higher carbs for active individuals</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-3 bg-[#0F172A] rounded-lg border border-[#334155] hover:border-[#8B5CF6] transition-colors cursor-pointer">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-lg bg-[#10B981]/20 flex items-center justify-center text-xl mr-3">
                      <Heart className="text-[#10B981]" size={20} />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-white">Balanced</h4>
                      <p className="text-xs text-gray-400">Even distribution of macronutrients</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <button className="w-full mt-4 py-2 border border-[#334155] text-[#8B5CF6] rounded-lg hover:bg-[#8B5CF6]/10 transition-colors flex items-center justify-center">
                <Plus size={16} className="mr-2" />
                <span>Create Custom Plan</span>
              </button>
            </div>
            
            {/* Nutrition Goals */}
            <div className="bg-gradient-to-br from-[#1E293B] to-[#0F172A] rounded-xl shadow-lg border border-[#334155] p-5">
              <h3 className="text-lg font-semibold text-white mb-4">Nutrition Goals</h3>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-400">Daily Calories</span>
                    <span className="text-sm font-medium text-white">{nutritionGoals.calories.value} kcal</span>
                  </div>
                  <div className="text-xs text-[#8B5CF6] mb-3">Maintenance Level</div>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="p-2 bg-[#0F172A] rounded text-center">
                      <div className="text-xs text-gray-400 mb-1">Deficit</div>
                      <div className="text-sm font-medium text-white">1800</div>
                    </div>
                    <div className="p-2 bg-[#8B5CF6]/20 rounded text-center border border-[#8B5CF6]">
                      <div className="text-xs text-gray-400 mb-1">Maintain</div>
                      <div className="text-sm font-medium text-white">2000</div>
                    </div>
                    <div className="p-2 bg-[#0F172A] rounded text-center">
                      <div className="text-xs text-gray-400 mb-1">Surplus</div>
                      <div className="text-sm font-medium text-white">2200</div>
                    </div>
                  </div>
                </div><div className="pt-4 border-t border-[#334155]">
                  <div className="text-sm font-medium text-white mb-3">Macronutrient Distribution</div>
                  
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-xs text-gray-400">Protein</span>
                        <span className="text-xs text-white">{nutritionGoals.macroDistribution.protein}%</span>
                      </div>
                      <div className="w-full bg-[#334155] rounded-full h-1.5">
                        <div 
                          className="bg-[#8B5CF6] h-1.5 rounded-full" 
                          style={{ width: `${nutritionGoals.macroDistribution.protein}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-xs text-gray-400">Carbs</span>
                        <span className="text-xs text-white">{nutritionGoals.macroDistribution.carbs}%</span>
                      </div>
                      <div className="w-full bg-[#334155] rounded-full h-1.5">
                        <div 
                          className="bg-[#F59E0B] h-1.5 rounded-full" 
                          style={{ width: `${nutritionGoals.macroDistribution.carbs}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-xs text-gray-400">Fat</span>
                        <span className="text-xs text-white">{nutritionGoals.macroDistribution.fat}%</span>
                      </div>
                      <div className="w-full bg-[#334155] rounded-full h-1.5">
                        <div 
                          className="bg-[#10B981] h-1.5 rounded-full" 
                          style={{ width: `${nutritionGoals.macroDistribution.fat}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <button className="w-full mt-4 py-2 border border-[#334155] text-[#8B5CF6] rounded-lg hover:bg-[#8B5CF6]/10 transition-colors">
                Adjust Goals
              </button>
            </div>
          </div>
          
          {/* Recommended Meals */}
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-br from-[#1E293B] to-[#0F172A] rounded-xl shadow-lg border border-[#334155] p-5 mb-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-white">Recommended For Today</h3>
                <div className="flex space-x-2">
                  <button className="px-3 py-1 bg-[#0F172A] border border-[#334155] rounded-lg text-sm text-gray-400 hover:border-[#8B5CF6] transition-colors">All</button>
                  <button className="px-3 py-1 bg-[#8B5CF6] rounded-lg text-sm text-white">High Protein</button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {mealRecommendations.map((meal) => (
                  <div 
                    key={meal.id} 
                    className="p-4 bg-[#0F172A] rounded-lg border border-[#334155] hover:border-[#8B5CF6] transition-colors cursor-pointer"
                  >
                    <div className="flex items-center mb-3">
                      <div className="w-12 h-12 rounded-lg bg-[#8B5CF6]/20 flex items-center justify-center text-2xl mr-3">
                        {meal.image}
                      </div>
                      <div>
                        <h4 className="text-white font-medium">{meal.title}</h4>
                        <div className="flex space-x-2 mt-1">
                          {meal.tags.map((tag, index) => (
                            <span key={index} className="text-xs bg-[#1E293B] text-gray-400 rounded-full px-2 py-0.5">{tag}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-xs text-gray-400 mb-3">{meal.description}</p>
                    
                    <div className="grid grid-cols-3 gap-2 mb-3">
                      <div className="flex flex-col items-center p-2 bg-[#1E293B] rounded">
                        <span className="text-xs text-gray-400">Calories</span>
                        <span className="text-sm font-medium text-white">{meal.calories}</span>
                      </div>
                      <div className="flex flex-col items-center p-2 bg-[#1E293B] rounded">
                        <span className="text-xs text-gray-400">Protein</span>
                        <span className="text-sm font-medium text-white">{meal.protein}g</span>
                      </div>
                      <div className="flex flex-col items-center p-2 bg-[#1E293B] rounded">
                        <span className="text-xs text-gray-400">Time</span>
                        <span className="text-sm font-medium text-white">{meal.preparationTime}m</span>
                      </div>
                    </div>
                    
                    <div className="flex justify-between">
                      <button className="py-1 px-3 bg-[#8B5CF6] text-white rounded hover:bg-[#7C3AED] transition-colors text-sm">
                        Add to Plan
                      </button>
                      <button className="py-1 px-3 border border-[#334155] text-gray-400 rounded hover:border-[#8B5CF6] hover:text-[#8B5CF6] transition-colors text-sm">
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Weekly Meal Schedule */}
            <div className="bg-gradient-to-br from-[#1E293B] to-[#0F172A] rounded-xl shadow-lg border border-[#334155] p-5">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-white">Weekly Meal Schedule</h3>
                <button className="text-sm font-medium text-[#8B5CF6] hover:text-[#A78BFA] transition-colors flex items-center">
                  <Calendar size={16} className="mr-1" />
                  <span>View Calendar</span>
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="p-4 bg-[#0F172A] rounded-lg border border-[#334155]">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-lg bg-[#8B5CF6] flex items-center justify-center text-xl mr-3">
                        <span className="text-white font-medium">M</span>
                      </div>
                      <div>
                        <h4 className="text-white font-medium">Monday</h4>
                        <p className="text-xs text-gray-400">March 31, 2025</p>
                      </div>
                    </div>
                    <button className="text-[#8B5CF6] hover:text-[#A78BFA] transition-colors">
                      <ChevronRight size={20} />
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-2">
                    <div className="p-2 bg-[#1E293B] rounded">
                      <div className="flex items-center mb-1">
                        <span className="text-xs text-gray-400 mr-1">🍳</span>
                        <span className="text-xs text-gray-400">Breakfast</span>
                      </div>
                      <p className="text-sm text-white truncate">Protein Pancakes</p>
                    </div>
                    <div className="p-2 bg-[#1E293B] rounded">
                      <div className="flex items-center mb-1">
                        <span className="text-xs text-gray-400 mr-1">🥗</span>
                        <span className="text-xs text-gray-400">Lunch</span>
                      </div>
                      <p className="text-sm text-white truncate">Greek Salad Bowl</p>
                    </div>
                    <div className="p-2 bg-[#1E293B] rounded">
                      <div className="flex items-center mb-1">
                        <span className="text-xs text-gray-400 mr-1">🍽️</span>
                        <span className="text-xs text-gray-400">Dinner</span>
                      </div>
                      <p className="text-sm text-white truncate">Chicken Stir-Fry</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 bg-[#0F172A] rounded-lg border border-[#334155]">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-lg bg-[#F472B6] flex items-center justify-center text-xl mr-3">
                        <span className="text-white font-medium">T</span>
                      </div>
                      <div>
                        <h4 className="text-white font-medium">Tuesday</h4>
                        <p className="text-xs text-gray-400">April 1, 2025</p>
                      </div>
                    </div>
                    <button className="text-[#8B5CF6] hover:text-[#A78BFA] transition-colors">
                      <ChevronRight size={20} />
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-2">
                    <div className="p-2 bg-[#1E293B] rounded">
                      <div className="flex items-center mb-1">
                        <span className="text-xs text-gray-400 mr-1">🥑</span>
                        <span className="text-xs text-gray-400">Breakfast</span>
                      </div>
                      <p className="text-sm text-white truncate">Avocado Toast</p>
                    </div>
                    <div className="p-2 bg-[#1E293B] rounded">
                      <div className="flex items-center mb-1">
                        <span className="text-xs text-gray-400 mr-1">🍱</span>
                        <span className="text-xs text-gray-400">Lunch</span>
                      </div>
                      <p className="text-sm text-white truncate">Quinoa Bowl</p>
                    </div>
                    <div className="p-2 bg-[#1E293B] rounded">
                      <div className="flex items-center mb-1">
                        <span className="text-xs text-gray-400 mr-1">🐟</span>
                        <span className="text-xs text-gray-400">Dinner</span>
                      </div>
                      <p className="text-sm text-white truncate">Baked Salmon</p>
                    </div>
                  </div>
                </div>
                
                <button className="w-full py-2 border border-[#334155] text-[#8B5CF6] rounded-lg hover:bg-[#8B5CF6]/10 transition-colors">
                  View Full Schedule
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {activeView === 'recipes' && (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Recipe Categories and Search */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-[#1E293B] to-[#0F172A] rounded-xl shadow-lg border border-[#334155] p-5 mb-6">
              <div className="relative mb-4">
                <input 
                  type="text" 
                  placeholder="Search recipes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#0F172A] border border-[#334155] text-gray-300 rounded-lg py-2 px-4 pl-10 focus:outline-none focus:ring-1 focus:ring-[#8B5CF6] focus:border-[#8B5CF6]"
                />
                <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
              
              <h3 className="text-lg font-semibold text-white mb-4">Categories</h3>
              
              <div className="space-y-2 mb-4">
                <button className="w-full flex items-center justify-between p-2 bg-[#8B5CF6]/20 border border-[#8B5CF6] rounded-lg text-white">
                  <span>All Recipes</span>
                  <span className="bg-[#8B5CF6] text-xs rounded-full w-6 h-6 flex items-center justify-center">
                    {recipeCatalog.length}
                  </span>
                </button>
                
                <button className="w-full flex items-center justify-between p-2 bg-[#0F172A] border border-[#334155] rounded-lg text-gray-400 hover:border-[#8B5CF6] transition-colors">
                  <span>Breakfast</span>
                  <span className="bg-[#1E293B] text-xs rounded-full w-6 h-6 flex items-center justify-center">
                    {recipeCatalog.filter(r => r.category === 'breakfast').length}
                  </span>
                </button>
                
                <button className="w-full flex items-center justify-between p-2 bg-[#0F172A] border border-[#334155] rounded-lg text-gray-400 hover:border-[#8B5CF6] transition-colors">
                  <span>Lunch</span>
                  <span className="bg-[#1E293B] text-xs rounded-full w-6 h-6 flex items-center justify-center">
                    {recipeCatalog.filter(r => r.category === 'lunch').length}
                  </span>
                </button>
                
                <button className="w-full flex items-center justify-between p-2 bg-[#0F172A] border border-[#334155] rounded-lg text-gray-400 hover:border-[#8B5CF6] transition-colors">
                  <span>Dinner</span>
                  <span className="bg-[#1E293B] text-xs rounded-full w-6 h-6 flex items-center justify-center">
                    {recipeCatalog.filter(r => r.category === 'dinner').length}
                  </span>
                </button><button className="w-full flex items-center justify-between p-2 bg-[#0F172A] border border-[#334155] rounded-lg text-gray-400 hover:border-[#8B5CF6] transition-colors">
                  <span>Snacks</span>
                  <span className="bg-[#1E293B] text-xs rounded-full w-6 h-6 flex items-center justify-center">
                    {recipeCatalog.filter(r => r.category === 'snack').length}
                  </span>
                </button>
              </div>
              
              <h3 className="text-lg font-semibold text-white mb-4">Filters</h3>
              
              <div className="space-y-3 mb-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Preparation Time</label>
                  <div className="flex space-x-2">
                    <button className="flex-1 py-1 bg-[#8B5CF6] text-white text-xs rounded">
                      Quick (&lt;15m)
                    </button>
                    <button className="flex-1 py-1 bg-[#0F172A] border border-[#334155] text-gray-400 text-xs rounded">
                      Medium
                    </button>
                    <button className="flex-1 py-1 bg-[#0F172A] border border-[#334155] text-gray-400 text-xs rounded">
                      Long
                    </button>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Difficulty</label>
                  <div className="flex space-x-2">
                    <button className="flex-1 py-1 bg-[#8B5CF6] text-white text-xs rounded">
                      Easy
                    </button>
                    <button className="flex-1 py-1 bg-[#0F172A] border border-[#334155] text-gray-400 text-xs rounded">
                      Medium
                    </button>
                    <button className="flex-1 py-1 bg-[#0F172A] border border-[#334155] text-gray-400 text-xs rounded">
                      Hard
                    </button>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Dietary</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button className="py-1 bg-[#0F172A] border border-[#334155] text-gray-400 text-xs rounded">
                      Vegetarian
                    </button>
                    <button className="py-1 bg-[#0F172A] border border-[#334155] text-gray-400 text-xs rounded">
                      Vegan
                    </button>
                    <button className="py-1 bg-[#0F172A] border border-[#334155] text-gray-400 text-xs rounded">
                      Gluten Free
                    </button>
                    <button className="py-1 bg-[#0F172A] border border-[#334155] text-gray-400 text-xs rounded">
                      Dairy Free
                    </button>
                  </div>
                </div>
              </div>
              
              <button className="w-full py-2 border border-[#334155] text-[#8B5CF6] rounded-lg hover:bg-[#8B5CF6]/10 transition-colors">
                Clear Filters
              </button>
            </div>
          </div>
          
          {/* Recipe List */}
          <div className="lg:col-span-3">
            <div className="bg-gradient-to-br from-[#1E293B] to-[#0F172A] rounded-xl shadow-lg border border-[#334155] p-5">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-white">
                  {searchQuery ? `Search Results for "${searchQuery}"` : "All Recipes"}
                </h3>
                <div className="relative">
                  <select className="appearance-none bg-[#0F172A] border border-[#334155] text-gray-400 text-sm rounded-lg p-2 pr-8 focus:outline-none focus:ring-1 focus:ring-[#8B5CF6] focus:border-[#8B5CF6]">
                    <option>Recently Added</option>
                    <option>Most Popular</option>
                    <option>Preparation Time</option>
                    <option>Calories: Low to High</option>
                    <option>Protein: High to Low</option>
                  </select>
                  <ChevronDown size={14} className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>
              
              {filteredRecipes.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-10">
                  <BookOpen size={48} className="text-gray-500 mb-4" />
                  <p className="text-gray-400 text-center mb-2">No recipes found</p>
                  <p className="text-gray-500 text-sm text-center max-w-md">
                    Try adjusting your search or filters to find what you're looking for.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredRecipes.map((recipe) => (
                    <div 
                      key={recipe.id} 
                      className="bg-[#0F172A] rounded-lg border border-[#334155] overflow-hidden hover:border-[#8B5CF6] transition-colors cursor-pointer"
                      onClick={() => handleRecipeSelect(recipe)}
                    >
                      <div className="bg-gradient-to-r from-[#1E293B] to-[#0F172A] h-32 flex items-center justify-center">
                        <span className="text-6xl">{recipe.image}</span>
                      </div>
                      
                      <div className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-white font-medium">{recipe.title}</h4>
                          {recipe.favorite && (
                            <Star className="text-yellow-500 fill-yellow-500" size={16} />
                          )}
                        </div>
                        
                        <div className="flex items-center space-x-2 mb-3">
                          <span className="text-xs bg-[#1E293B] text-gray-400 rounded-full px-2 py-0.5 capitalize">
                            {recipe.category}
                          </span>
                          <span className="text-xs bg-[#1E293B] text-gray-400 rounded-full px-2 py-0.5">
                            {recipe.difficulty}
                          </span>
                        </div>
                        
                        <div className="grid grid-cols-3 gap-2 mb-3">
                          <div className="flex flex-col items-center p-1 bg-[#1E293B] rounded">
                            <span className="text-xs text-gray-400">Calories</span>
                            <span className="text-sm font-medium text-white">{recipe.calories}</span>
                          </div>
                          <div className="flex flex-col items-center p-1 bg-[#1E293B] rounded">
                            <span className="text-xs text-gray-400">Protein</span>
                            <span className="text-sm font-medium text-white">{recipe.protein}g</span>
                          </div>
                          <div className="flex flex-col items-center p-1 bg-[#1E293B] rounded">
                            <span className="text-xs text-gray-400">Time</span>
                            <span className="text-sm font-medium text-white">{recipe.preparationTime}m</span>
                          </div>
                        </div>
                        
                        <div className="flex justify-between">
                          <button className="py-1 px-3 bg-[#8B5CF6] text-white rounded hover:bg-[#7C3AED] transition-colors text-sm">
                            Cook Now
                          </button>
                          <button className="py-1 px-3 border border-[#334155] text-gray-400 rounded hover:border-[#8B5CF6] hover:text-[#8B5CF6] transition-colors text-sm">
                            Add to Plan
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              {filteredRecipes.length > 0 && (
                <div className="mt-6 flex justify-center">
                  <button className="py-2 px-4 border border-[#334155] text-[#8B5CF6] rounded-lg hover:bg-[#8B5CF6]/10 transition-colors">
                    Load More Recipes
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      
      {activeView === 'insights' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Nutrition Summary */}
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-br from-[#1E293B] to-[#0F172A] rounded-xl shadow-lg border border-[#334155] p-5 mb-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-white">Weekly Nutrition Summary</h3>
                <div className="relative">
                  <select className="appearance-none bg-[#0F172A] border border-[#334155] text-gray-400 text-sm rounded-lg p-2 pr-8 focus:outline-none focus:ring-1 focus:ring-[#8B5CF6] focus:border-[#8B5CF6]">
                    <option>This Week</option>
                    <option>Last Week</option>
                    <option>Last 30 Days</option>
                  </select>
                  <ChevronDown size={14} className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-[#0F172A] rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-400">Avg. Calories</span>
                    <Flame size={16} className="text-[#F472B6]" />
                  </div>
                  <p className="text-2xl font-bold text-white mb-1">1,891</p>
                  <div className="flex items-center text-xs">
                    <ArrowUp size={12} className="text-green-500 mr-1" />
                    <span className="text-green-500">5% from last week</span>
                  </div>
                </div>
                
                <div className="bg-[#0F172A] rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-400">Avg. Protein</span>
                    <div className="w-4 h-4 rounded-full bg-[#8B5CF6]/20 flex items-center justify-center">
                      <span className="text-[8px] text-[#8B5CF6] font-bold">P</span>
                    </div>
                  </div>
                  <p className="text-2xl font-bold text-white mb-1">121g</p>
                  <div className="flex items-center text-xs">
                    <ArrowUp size={12} className="text-green-500 mr-1" />
                    <span className="text-green-500">12% from last week</span>
                  </div>
                </div>
                
                <div className="bg-[#0F172A] rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-400">Goal Adherence</span>
                    <Star size={16} className="text-[#F59E0B]" />
                  </div>
                  <p className="text-2xl font-bold text-white mb-1">87%</p>
                  <div className="flex items-center text-xs">
                    <ArrowUp size={12} className="text-green-500 mr-1" />
                    <span className="text-green-500">3% from last week</span>
                  </div>
                </div>
                
                <div className="bg-[#0F172A] rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-400">Avg. Water</span>
                    <Droplets size={16} className="text-[#0EA5E9]" />
                  </div>
                  <p className="text-2xl font-bold text-white mb-1">2.5L</p>
                  <div className="flex items-center text-xs">
                    <ArrowDown size={12} className="text-red-500 mr-1" />
                    <span className="text-red-500">8% from last week</span>
                    </div>
                </div>
              </div>
              
              <div className="mb-6">
                <h4 className="text-sm font-medium text-white mb-4">Calorie & Macronutrient Intake</h4>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={nutritionChartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                      <XAxis dataKey="day" tick={{fontSize: 12}} stroke="#64748B" />
                      <YAxis tick={{fontSize: 12}} stroke="#64748B" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#1E293B', 
                          borderColor: '#334155',
                          color: 'white'
                        }} 
                        labelStyle={{ color: 'white' }}
                      />
                      <Bar dataKey="calories" fill="#F472B6" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-white mb-4">Nutritional Balance</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-[#0F172A] rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h5 className="text-sm text-white">Macronutrient Balance</h5>
                    </div>
                    <div className="h-32 flex items-center justify-center">
                      <div className="w-24 h-24 rounded-full border-8 border-[#8B5CF6] relative flex items-center justify-center">
                        <div className="w-16 h-16 rounded-full border-6 border-[#F59E0B] relative flex items-center justify-center">
                          <div className="w-8 h-8 rounded-full border-4 border-[#10B981]"></div>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-around mt-3">
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-[#8B5CF6] mr-1"></div>
                        <span className="text-xs text-gray-400">Protein</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-[#F59E0B] mr-1"></div>
                        <span className="text-xs text-gray-400">Carbs</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-[#10B981] mr-1"></div>
                        <span className="text-xs text-gray-400">Fat</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-[#0F172A] rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h5 className="text-sm text-white">Meal Distribution</h5>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-xs text-gray-400">Breakfast</span>
                          <span className="text-xs text-white">24%</span>
                        </div>
                        <div className="w-full bg-[#334155] rounded-full h-1.5">
                          <div className="bg-[#8B5CF6] h-1.5 rounded-full" style={{ width: '24%' }}></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-xs text-gray-400">Lunch</span>
                          <span className="text-xs text-white">32%</span>
                        </div>
                        <div className="w-full bg-[#334155] rounded-full h-1.5">
                          <div className="bg-[#F472B6] h-1.5 rounded-full" style={{ width: '32%' }}></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-xs text-gray-400">Snacks</span>
                          <span className="text-xs text-white">14%</span>
                        </div>
                        <div className="w-full bg-[#334155] rounded-full h-1.5">
                          <div className="bg-[#F59E0B] h-1.5 rounded-full" style={{ width: '14%' }}></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-xs text-gray-400">Dinner</span>
                          <span className="text-xs text-white">30%</span>
                        </div>
                        <div className="w-full bg-[#334155] rounded-full h-1.5">
                          <div className="bg-[#10B981] h-1.5 rounded-full" style={{ width: '30%' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-[#0F172A] rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h5 className="text-sm text-white">Goal Completion</h5>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-xs text-gray-400">Calories</span>
                          <span className="text-xs text-white">95%</span>
                        </div>
                        <div className="w-full bg-[#334155] rounded-full h-1.5">
                          <div className="bg-[#F472B6] h-1.5 rounded-full" style={{ width: '95%' }}></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-xs text-gray-400">Protein</span>
                          <span className="text-xs text-white">87%</span>
                        </div>
                        <div className="w-full bg-[#334155] rounded-full h-1.5">
                          <div className="bg-[#8B5CF6] h-1.5 rounded-full" style={{ width: '87%' }}></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-xs text-gray-400">Water</span>
                          <span className="text-xs text-white">76%</span>
                        </div>
                        <div className="w-full bg-[#334155] rounded-full h-1.5">
                          <div className="bg-[#0EA5E9] h-1.5 rounded-full" style={{ width: '76%' }}></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-xs text-gray-400">Overall</span>
                          <span className="text-xs text-white">85%</span>
                        </div>
                        <div className="w-full bg-[#334155] rounded-full h-1.5">
                          <div className="bg-green-500 h-1.5 rounded-full" style={{ width: '85%' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Meal Consistency */}
            <div className="bg-gradient-to-br from-[#1E293B] to-[#0F172A] rounded-xl shadow-lg border border-[#334155] p-5">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-white">Meal Consistency</h3>
                <button className="text-sm text-[#8B5CF6]">View Details</button>
              </div>
              
              <div className="grid grid-cols-7 gap-2 mb-4">
                {mealHistory.map((day, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div 
                      className={`w-10 h-10 rounded-full flex items-center justify-center mb-1 
                        ${day.mealCompletionRate === 100 
                          ? 'bg-green-500/20 border border-green-500' 
                          : day.mealCompletionRate >= 75 
                            ? 'bg-yellow-500/20 border border-yellow-500' 
                            : 'bg-red-500/20 border border-red-500'}`}
                    >
                      <span className="text-xs font-medium text-white">
                        {new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' }).charAt(0)}
                      </span>
                    </div>
                    <span className="text-xs text-gray-400">{day.mealCompletionRate}%</span>
                  </div>
                ))}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-[#0F172A] rounded-lg p-4">
                  <div className="flex items-center mb-3">
                    <div className="w-8 h-8 rounded-full bg-green-500/20 border border-green-500 flex items-center justify-center mr-3">
                      <span className="text-green-500">✓</span>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-white">Consistent Days</h4>
                      <p className="text-xs text-gray-400">All meals logged</p>
                    </div>
                  </div>
                  <p className="text-2xl font-bold text-white text-center">4</p>
                </div>
                
                <div className="bg-[#0F172A] rounded-lg p-4">
                  <div className="flex items-center mb-3">
                    <div className="w-8 h-8 rounded-full bg-yellow-500/20 border border-yellow-500 flex items-center justify-center mr-3">
                      <span className="text-yellow-500">!</span>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-white">Partial Days</h4>
                      <p className="text-xs text-gray-400">Some meals missed</p>
                    </div>
                  </div>
                  <p className="text-2xl font-bold text-white text-center">2</p>
                </div>
                
                <div className="bg-[#0F172A] rounded-lg p-4">
                  <div className="flex items-center mb-3">
                    <div className="w-8 h-8 rounded-full bg-red-500/20 border border-red-500 flex items-center justify-center mr-3">
                      <span className="text-red-500">✕</span>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-white">Incomplete Days</h4>
                      <p className="text-xs text-gray-400">Most meals missed</p>
                    </div>
                  </div>
                  <p className="text-2xl font-bold text-white text-center">1</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Insights and Recommendations */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-[#1E293B] to-[#0F172A] rounded-xl shadow-lg border border-[#334155] p-5 mb-6">
              <h3 className="text-lg font-semibold text-white mb-4">Nutritional Insights</h3>
              
              <div className="space-y-4">
                {nutritionInsights.map((insight) => (
                  <div key={insight.id} className="p-4 bg-[#0F172A] rounded-lg border border-[#334155]">
                    <div className="flex items-center mb-3">
                      <div 
                        className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 
                          ${insight.trend === 'up' 
                            ? 'bg-green-500/20 text-green-500' 
                            : insight.trend === 'down' 
                              ? 'bg-red-500/20 text-red-500' 
                              : 'bg-yellow-500/20 text-yellow-500'}`}
                      >
                        {insight.trend === 'up' ? <ArrowUp size={16} /> : 
                         insight.trend === 'down' ? <ArrowDown size={16} /> : 
                         <span>•</span>}
                      </div>
                      <h4 className="text-sm font-medium text-white">{insight.title}</h4>
                    </div>
                    <p className="text-xs text-gray-400 mb-3">{insight.description}</p>
                    <div className="bg-[#1E293B] p-2 rounded border border-[#334155]">
                      <p className="text-xs text-[#8B5CF6]">
                        <span className="font-medium">Action: </span>
                        {insight.actionable}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div><div className="bg-gradient-to-br from-[#1E293B] to-[#0F172A] rounded-xl shadow-lg border border-[#334155] p-5 mb-6">
              <h3 className="text-lg font-semibold text-white mb-4">Micronutrient Focus</h3>
              
              <div className="space-y-3">
                {nutritionGoals.micronutrientFocus.map((micro, index) => (
                  <div key={index} className="p-3 bg-[#0F172A] rounded-lg border border-[#334155]">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm font-medium text-white">{micro.name}</h4>
                      <span 
                        className={`text-xs px-2 py-0.5 rounded-full 
                          ${micro.status === 'low' 
                            ? 'bg-red-500/20 text-red-500' 
                            : micro.status === 'adequate' 
                              ? 'bg-green-500/20 text-green-500' 
                              : 'bg-yellow-500/20 text-yellow-500'}`}
                      >
                        {micro.status}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 mb-2">Top Sources:</p>
                    <div className="flex flex-wrap gap-1">
                      {micro.sources.map((source, idx) => (
                        <span key={idx} className="text-xs bg-[#1E293B] text-gray-400 rounded-full px-2 py-0.5">
                          {source}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-[#1E293B] to-[#0F172A] rounded-xl shadow-lg border border-[#334155] p-5">
              <h3 className="text-lg font-semibold text-white mb-4">Weekly Challenges</h3>
              
              <div className="bg-[#0F172A] rounded-lg border border-[#8B5CF6] p-4 mb-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-medium text-white">Protein Power</h4>
                  <div className="bg-[#8B5CF6]/20 text-[#8B5CF6] px-2 py-0.5 rounded text-xs">
                    Active
                  </div>
                </div>
                <p className="text-xs text-gray-400 mb-3">
                  Meet your protein goal every day this week.
                </p>
                <div className="mb-2">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs text-gray-400">Progress</span>
                    <span className="text-xs text-white">4/7 days</span>
                  </div>
                  <div className="w-full bg-[#334155] rounded-full h-2">
                    <div className="bg-[#8B5CF6] h-2 rounded-full" style={{ width: '57%' }}></div>
                  </div>
                </div>
                <p className="text-xs text-green-500">
                  You're on track to complete this challenge!
                </p>
              </div>
              
              <div className="space-y-3">
                <div className="p-3 bg-[#0F172A] rounded-lg border border-[#334155] hover:border-[#8B5CF6] transition-colors cursor-pointer">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-medium text-white">Hydration Hero</h4>
                    <button className="text-xs text-[#8B5CF6] px-2 py-1 rounded bg-[#8B5CF6]/10">
                      Join
                    </button>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">
                    Drink at least 3L of water every day for 5 days.
                  </p>
                </div>
                
                <div className="p-3 bg-[#0F172A] rounded-lg border border-[#334155] hover:border-[#8B5CF6] transition-colors cursor-pointer">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-medium text-white">Meal Prep Master</h4>
                    <button className="text-xs text-[#8B5CF6] px-2 py-1 rounded bg-[#8B5CF6]/10">
                      Join
                    </button>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">
                    Prepare and log all your meals in advance for one week.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Meal details modal */}
      {selectedMeal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/70 p-4">
          <div className="bg-[#1E293B] rounded-xl shadow-xl border border-[#334155] w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-lg bg-[#8B5CF6]/20 flex items-center justify-center text-2xl mr-4">
                    {selectedMeal.meal === 'Breakfast' ? '🍳' : 
                     selectedMeal.meal === 'Lunch' ? '🍱' : 
                     selectedMeal.meal === 'Dinner' ? '🍽️' : '🥤'}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{selectedMeal.meal}</h3>
                    <p className="text-sm text-gray-400">{selectedMeal.time}</p>
                  </div>
                </div>
                <button 
                  onClick={closeMealDetails}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  &times;
                </button>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                <div className="p-3 bg-[#0F172A] rounded-lg">
                  <p className="text-xs text-gray-400 mb-1">Calories</p>
                  <p className="text-lg font-semibold text-white">{selectedMeal.totalCalories} kcal</p>
                </div>
                
                <div className="p-3 bg-[#0F172A] rounded-lg">
                  <p className="text-xs text-gray-400 mb-1">Protein</p>
                  <p className="text-lg font-semibold text-white">{selectedMeal.totalProtein}g</p>
                </div>
                
                <div className="p-3 bg-[#0F172A] rounded-lg">
                  <p className="text-xs text-gray-400 mb-1">Carbs</p>
                  <p className="text-lg font-semibold text-white">{selectedMeal.totalCarbs}g</p>
                </div>
                
                <div className="p-3 bg-[#0F172A] rounded-lg">
                  <p className="text-xs text-gray-400 mb-1">Fat</p>
                  <p className="text-lg font-semibold text-white">{selectedMeal.totalFat}g</p>
                </div>
              </div>
              
              <h4 className="text-sm font-semibold text-white mb-3">Foods</h4>
              <div className="space-y-3 mb-6">
                {selectedMeal.foods.map((food, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-[#0F172A] rounded-lg border border-[#334155]">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-lg bg-[#8B5CF6]/10 flex items-center justify-center text-xl mr-3">
                        {food.icon}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">{food.name}</p>
                        <p className="text-xs text-gray-400">{food.portion}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-white">{food.calories} kcal</p>
                      <p className="text-xs text-gray-400">P: {food.protein}g · C: {food.carbs}g · F: {food.fat}g</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="flex justify-between pt-6 border-t border-[#334155]">
                <button className="py-2 px-4 bg-[#8B5CF6] text-white rounded-lg hover:bg-[#7C3AED] transition-colors">
                  {selectedMeal.completed ? 'Edit Meal' : 'Log Meal'}
                </button>
                <button 
                  onClick={closeMealDetails}
                  className="py-2 px-4 border border-[#334155] text-gray-400 rounded-lg hover:bg-[#1E293B] transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Recipe details modal */}
      {selectedRecipe && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/70 p-4">
          <div className="bg-[#1E293B] rounded-xl shadow-xl border border-[#334155] w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <div className="w-14 h-14 rounded-lg bg-[#8B5CF6]/20 flex items-center justify-center text-3xl mr-4">
                    {selectedRecipe.image}
                  </div>
                  <div>
                    <div className="flex items-center">
                      <h3 className="text-xl font-bold text-white mr-2">{selectedRecipe.title}</h3>
                      {selectedRecipe.favorite && (
                        <Star className="text-yellow-500 fill-yellow-500" size={16} />
                      )}
                    </div>
                    <div className="flex space-x-2 mt-1">
                      <span className="text-xs bg-[#0F172A] text-gray-400 rounded-full px-2 py-0.5 capitalize">
                        {selectedRecipe.category}
                      </span>
                      <span className="text-xs bg-[#0F172A] text-gray-400 rounded-full px-2 py-0.5">
                        {selectedRecipe.difficulty}
                      </span>
                      <span className="text-xs bg-[#0F172A] text-gray-400 rounded-full px-2 py-0.5">
                        {selectedRecipe.preparationTime} min
                      </span>
                    </div>
                  </div>
                </div>
                <button 
                  onClick={closeRecipeDetails}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  &times;
                </button>
              </div>
              
              <div className="grid grid-cols-3 gap-3 mb-6">
                <div className="p-3 bg-[#0F172A] rounded-lg text-center">
                  <p className="text-xs text-gray-400 mb-1">Calories</p>
                  <p className="text-lg font-semibold text-white">{selectedRecipe.calories} kcal</p>
                </div>
                
                <div className="p-3 bg-[#0F172A] rounded-lg text-center">
                  <p className="text-xs text-gray-400 mb-1">Protein</p>
                  <p className="text-lg font-semibold text-white">{selectedRecipe.protein}g</p>
                </div>
                
                <div className="p-3 bg-[#0F172A] rounded-lg text-center">
                  <p className="text-xs text-gray-400 mb-1">Carbs</p>
                  <p className="text-lg font-semibold text-white">{selectedRecipe.carbs}g</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="text-sm font-semibold text-white mb-3">Ingredients</h4>
                  <ul className="space-y-2 bg-[#0F172A] rounded-lg p-4">
                    {selectedRecipe.ingredients.map((ingredient, index) => (
                      <li key={index} className="flex items-start">
                        <div className="w-4 h-4 rounded-full border border-[#8B5CF6] flex-shrink-0 mt-0.5 mr-2"></div>
                        <span className="text-sm text-gray-300">{ingredient}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-sm font-semibold text-white mb-3">Instructions</h4>
                  <ol className="space-y-3 bg-[#0F172A] rounded-lg p-4">
                    {selectedRecipe.instructions.map((step, index) => (
                      <li key={index} className="flex items-start">
                        <div className="w-5 h-5 rounded-full bg-[#8B5CF6]/20 text-[#8B5CF6] flex items-center justify-center text-xs mr-3 flex-shrink-0">
                          {index + 1}
                        </div>
                        <span className="text-sm text-gray-300">{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
              
              <div className="flex justify-between pt-6 border-t border-[#334155]">
                <div>
                  <button className="py-2 px-4 bg-[#8B5CF6] text-white rounded-lg hover:bg-[#7C3AED] transition-colors mr-2">
                    Cook Now
                  </button><button className="py-2 px-4 bg-[#0F172A] text-gray-400 rounded-lg hover:bg-[#1A2234] transition-colors">
                    Add to Meal Plan
                  </button>
                </div>
                <button 
                  onClick={closeRecipeDetails}
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

export default NutritionTab;