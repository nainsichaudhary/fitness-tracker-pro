import React, { useState } from 'react';
import { 
  Dumbbell, 
  Heart, 
  Target, 
  BarChart3, 
  Calendar, 
  User, 
  Trophy, 
  Bell, 
  Droplets, 
  Moon, 
  Activity, 
  TrendingUp, 
  Smartphone, 
  Zap, 
  ArrowRight, 
  ArrowLeft, 
  Play, 
  CheckCircle,
  Star,
  Users,
  Clock,
  Shield,
  Sparkles
} from 'lucide-react';

const DemoPage = ({ onComplete }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const features = [
    {
      id: 1,
      title: "AI-Powered Personal Coach",
      subtitle: "Your 24/7 Fitness Companion",
      description: "Get personalized workout plans, nutrition advice, and motivation from our advanced AI coach that learns your preferences and adapts to your progress.",
      icon: Sparkles,
      color: "from-[#8B5CF6] to-[#F472B6]",
      highlights: [
        "Personalized workout recommendations",
        "Smart nutrition planning",
        "Progress-based adaptations",
        "Motivational messages"
      ],
      demo: {
        type: "ai-chat",
        content: "AI Coach: 'Excellent work on your cardio session! Based on your energy levels, I recommend a strength training focus tomorrow. Ready to build those muscles?'"
      }
    },
    {
      id: 2,
      title: "Comprehensive Dashboard",
      subtitle: "All Your Fitness Data in One Place",
      description: "Track your daily activities, monitor progress, and get insights into your fitness journey with beautiful charts and real-time metrics.",
      icon: BarChart3,
      color: "from-[#10B981] to-[#3B82F6]",
      highlights: [
        "Real-time activity tracking",
        "Progress visualization",
        "Goal monitoring",
        "Performance analytics"
      ],
      demo: {
        type: "metrics",
        content: {
          steps: "9,247 / 10,000",
          calories: "1,456 / 1,500",
          heartRate: "68 bpm",
          water: "7 / 8 glasses"
        }
      }
    },
    {
      id: 3,
      title: "Smart Device Integration",
      subtitle: "Seamless Wearable Connectivity",
      description: "Connect your smartwatch or fitness tracker for automatic data sync, real-time monitoring, and enhanced tracking accuracy.",
      icon: Smartphone,
      color: "from-[#F59E0B] to-[#EF4444]",
      highlights: [
        "Automatic data sync",
        "Real-time heart rate",
        "Sleep quality tracking",
        "GPS workout routes"
      ],
      demo: {
        type: "device",
        content: {
          device: "Apple Watch Series 8",
          battery: "85%",
          signal: "Strong",
          lastSync: "2 min ago"
        }
      }
    },
    {
      id: 4,
      title: "Advanced Analytics",
      subtitle: "Deep Insights into Your Progress",
      description: "Get detailed analytics, trend analysis, and predictive insights to optimize your fitness journey and achieve your goals faster.",
      icon: TrendingUp,
      color: "from-[#8B5CF6] to-[#EC4899]",
      highlights: [
        "Trend analysis",
        "Performance predictions",
        "Goal optimization",
        "Progress forecasting"
      ],
      demo: {
        type: "analytics",
        content: {
          weeklyProgress: "+12%",
          monthlyTrend: "Consistent improvement",
          nextMilestone: "3 days away",
          recommendation: "Increase cardio intensity"
        }
      }
    },
    {
      id: 5,
      title: "Community & Challenges",
      subtitle: "Connect and Compete",
      description: "Join fitness challenges, connect with like-minded individuals, and stay motivated through social features and friendly competition.",
      icon: Users,
      color: "from-[#10B981] to-[#059669]",
      highlights: [
        "Fitness challenges",
        "Social connections",
        "Leaderboards",
        "Achievement badges"
      ],
      demo: {
        type: "community",
        content: {
          activeChallenges: "5",
          friends: "23",
          currentRank: "#3",
          achievements: "12 unlocked"
        }
      }
    }
  ];

  const nextSlide = () => {
    if (currentSlide < features.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const currentFeature = features[currentSlide];

  const renderDemoContent = (demo) => {
    switch (demo.type) {
      case 'ai-chat':
        return (
          <div className="bg-[#1E293B] rounded-lg p-4 border border-[#334155]">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-[#8B5CF6] to-[#F472B6] rounded-full flex items-center justify-center">
                <Sparkles size={16} className="text-white" />
              </div>
              <div className="flex-1">
                <p className="text-white text-sm leading-relaxed">{demo.content}</p>
                <div className="flex items-center space-x-2 mt-2">
                  <div className="w-2 h-2 bg-[#8B5CF6] rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-[#F472B6] rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-[#8B5CF6] rounded-full animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'metrics':
        return (
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(demo.content).map(([key, value]) => (
              <div key={key} className="bg-[#1E293B] rounded-lg p-4 border border-[#334155]">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                  <span className="text-white font-semibold">{value}</span>
                </div>
                <div className="mt-2 w-full bg-[#334155] rounded-full h-2">
                  <div className="bg-gradient-to-r from-[#10B981] to-[#3B82F6] h-2 rounded-full" style={{ width: '75%' }}></div>
                </div>
              </div>
            ))}
          </div>
        );

      case 'workout':
        return (
          <div className="bg-[#1E293B] rounded-lg p-4 border border-[#334155]">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-white font-semibold">{demo.content.workout}</h4>
              <Play size={16} className="text-[#10B981]" />
            </div>
            <div className="space-y-2">
              {demo.content.exercises.map((exercise, index) => (
                <div key={index} className="flex items-center justify-between py-2 border-b border-[#334155] last:border-b-0">
                  <span className="text-gray-300 text-sm">{exercise.name}</span>
                  <div className="text-right">
                    <span className="text-white text-sm font-medium">{exercise.sets}</span>
                    <span className="text-gray-400 text-xs block">{exercise.weight}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'nutrition':
        return (
          <div className="bg-[#1E293B] rounded-lg p-4 border border-[#334155]">
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-400 text-sm">Calories</span>
                <span className="text-white font-semibold">{demo.content.calories}</span>
              </div>
              <div className="w-full bg-[#334155] rounded-full h-2">
                <div className="bg-gradient-to-r from-[#EC4899] to-[#8B5CF6] h-2 rounded-full" style={{ width: '84%' }}></div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {Object.entries(demo.content.macros).map(([macro, value]) => (
                <div key={macro} className="text-center">
                  <div className="text-white font-semibold text-sm">{value}</div>
                  <div className="text-gray-400 text-xs capitalize">{macro}</div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'goals':
        return (
          <div className="bg-[#1E293B] rounded-lg p-4 border border-[#334155]">
            <div className="text-center mb-4">
              <h4 className="text-white font-semibold mb-1">{demo.content.current}</h4>
              <div className="text-2xl font-bold text-white mb-2">{demo.content.progress}</div>
              <div className="w-full bg-[#334155] rounded-full h-3">
                <div className="bg-gradient-to-r from-[#06B6D4] to-[#3B82F6] h-3 rounded-full" style={{ width: `${demo.content.percentage}%` }}></div>
              </div>
            </div>
            <div className="text-center">
              <div className="text-[#06B6D4] text-sm font-medium">{demo.content.nextMilestone}</div>
              <div className="text-gray-400 text-xs">Next milestone</div>
            </div>
          </div>
        );

      case 'analytics':
        return (
          <div className="bg-[#1E293B] rounded-lg p-4 border border-[#334155]">
            <div className="space-y-3">
              {Object.entries(demo.content).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                  <span className="text-white text-sm font-medium">{value}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 p-3 bg-[#0F172A] rounded-lg">
              <div className="flex items-center space-x-2">
                <TrendingUp size={16} className="text-[#10B981]" />
                <span className="text-[#10B981] text-sm font-medium">Trending Up</span>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F172A] to-[#1E293B]">
      {/* Header */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#8B5CF6] to-[#F472B6] rounded-xl flex items-center justify-center">
              <Dumbbell className="text-white" size={20} />
            </div>
            <h1 className="text-2xl font-bold text-white">FitTrack</h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              {features.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentSlide ? 'bg-[#8B5CF6]' : 'bg-[#334155]'
                  }`}
                />
              ))}
            </div>
            <button
              onClick={onComplete}
              className="px-4 py-2 text-gray-400 hover:text-white transition-colors text-sm"
            >
              Skip
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Feature Showcase */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Left Side - Feature Info */}
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className={`w-12 h-12 bg-gradient-to-br ${currentFeature.color} rounded-xl flex items-center justify-center`}>
                    <currentFeature.icon className="text-white" size={24} />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-white">{currentFeature.title}</h2>
                    <p className="text-[#8B5CF6] font-medium">{currentFeature.subtitle}</p>
                  </div>
                </div>
                
                <p className="text-gray-300 text-lg leading-relaxed">
                  {currentFeature.description}
                </p>
              </div>

              {/* Feature Highlights */}
              <div className="space-y-3">
                <h3 className="text-white font-semibold">Key Features:</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {currentFeature.highlights.map((highlight, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <CheckCircle size={16} className="text-[#10B981] flex-shrink-0" />
                      <span className="text-gray-300 text-sm">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between pt-6">
                <button
                  onClick={prevSlide}
                  disabled={currentSlide === 0}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-all ${
                    currentSlide === 0
                      ? 'text-gray-600 cursor-not-allowed'
                      : 'text-gray-400 hover:text-white hover:bg-[#1E293B]'
                  }`}
                >
                  <ArrowLeft size={20} />
                  <span>Previous</span>
                </button>

                <div className="flex items-center space-x-4">
                  <span className="text-gray-400 text-sm">
                    {currentSlide + 1} of {features.length}
                  </span>
                  
                  {currentSlide === features.length - 1 ? (
                    <button
                      onClick={onComplete}
                      className="px-8 py-3 bg-gradient-to-r from-[#8B5CF6] to-[#F472B6] text-white font-medium rounded-lg hover:shadow-lg hover:shadow-[#8B5CF6]/25 transition-all duration-200 flex items-center space-x-2"
                    >
                      <span>Get Started</span>
                      <ArrowRight size={20} />
                    </button>
                  ) : (
                    <button
                      onClick={nextSlide}
                      className="px-8 py-3 bg-gradient-to-r from-[#8B5CF6] to-[#F472B6] text-white font-medium rounded-lg hover:shadow-lg hover:shadow-[#8B5CF6]/25 transition-all duration-200 flex items-center space-x-2"
                    >
                      <span>Next</span>
                      <ArrowRight size={20} />
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Right Side - Demo Preview */}
            <div className="bg-gradient-to-br from-[#1E293B] to-[#0F172A] rounded-2xl shadow-2xl border border-[#334155] p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-white font-semibold">Live Preview</h3>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                </div>
                
                <div className="bg-[#0F172A] rounded-lg p-4 min-h-[300px] flex items-center justify-center">
                  {renderDemoContent(currentFeature.demo)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Stats */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">50K+</div>
              <div className="text-gray-400 text-sm">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">500+</div>
              <div className="text-gray-400 text-sm">Exercises</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">24/7</div>
              <div className="text-gray-400 text-sm">AI Support</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">4.9★</div>
              <div className="text-gray-400 text-sm">User Rating</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DemoPage; 