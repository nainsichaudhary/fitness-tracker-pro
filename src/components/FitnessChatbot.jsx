import React, { useState, useRef, useEffect } from 'react';
import { 
  MessageCircle, 
  Send, 
  X, 
  Bot, 
  User, 
  Loader2,
  Sparkles,
  Dumbbell,
  Heart,
  Target,
  Apple,
  TrendingUp
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const FitnessChatbot = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: "Hi! I'm your AI fitness coach. I can help you with workout plans, nutrition advice, exercise form, recovery tips, and more. What would you like to know about fitness today? 💪",
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const { currentTheme } = useTheme();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Mock AI responses for fitness-related questions
  const getAIResponse = async (userMessage) => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Simulate typing delay
    setIsTyping(true);
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));

    let response = "";

    // Workout related responses
    if (lowerMessage.includes('workout') || lowerMessage.includes('exercise') || lowerMessage.includes('training')) {
      if (lowerMessage.includes('beginner') || lowerMessage.includes('start')) {
        response = "For beginners, I recommend starting with bodyweight exercises like push-ups, squats, and planks. Begin with 3 sets of 10-15 reps each, 3 times per week. Focus on proper form over intensity. Would you like a specific beginner workout plan? 🏋️‍♂️";
      } else if (lowerMessage.includes('strength') || lowerMessage.includes('muscle')) {
        response = "For strength training, focus on compound movements: deadlifts, squats, bench press, and overhead press. Start with 3-5 sets of 5-8 reps, 3-4 times per week. Progressive overload is key - gradually increase weight or reps. Need a specific strength program? 💪";
      } else if (lowerMessage.includes('cardio') || lowerMessage.includes('endurance')) {
        response = "Great cardio options include running, cycling, swimming, or HIIT workouts. Start with 20-30 minutes, 3-4 times per week. For HIIT, try 30 seconds work, 30 seconds rest for 10-15 rounds. What's your current fitness level? 🏃‍♂️";
      } else {
        response = "I can help you with various workout types! Are you looking for strength training, cardio, flexibility, or a specific goal like weight loss or muscle building? Let me know your fitness level and goals! 🎯";
      }
    }
    // Nutrition related responses
    else if (lowerMessage.includes('nutrition') || lowerMessage.includes('diet') || lowerMessage.includes('food') || lowerMessage.includes('meal')) {
      if (lowerMessage.includes('protein') || lowerMessage.includes('muscle')) {
        response = "For muscle building, aim for 1.6-2.2g of protein per kg of body weight daily. Good sources include chicken, fish, eggs, Greek yogurt, and plant-based options like tofu and legumes. Spread protein intake across meals for optimal absorption. 🍗";
      } else if (lowerMessage.includes('weight loss') || lowerMessage.includes('fat loss')) {
        response = "For weight loss, create a moderate calorie deficit (300-500 calories below maintenance). Focus on whole foods, plenty of protein, and vegetables. Track your intake but don't obsess. Consistency beats perfection! 🥗";
      } else if (lowerMessage.includes('pre workout') || lowerMessage.includes('before workout')) {
        response = "Eat a balanced meal 2-3 hours before working out: carbs for energy, protein for muscle support, and some healthy fats. Examples: oatmeal with berries and nuts, or a turkey sandwich on whole grain bread. 🍎";
      } else {
        response = "Nutrition is crucial for fitness success! Are you looking for advice on meal timing, macronutrients, supplements, or specific dietary goals? I can help you create a nutrition plan that fits your lifestyle! 🍽️";
      }
    }
    // Recovery related responses
    else if (lowerMessage.includes('recovery') || lowerMessage.includes('rest') || lowerMessage.includes('sore') || lowerMessage.includes('pain')) {
      if (lowerMessage.includes('muscle soreness') || lowerMessage.includes('doms')) {
        response = "DOMS (Delayed Onset Muscle Soreness) is normal after new exercises. Rest, gentle stretching, foam rolling, and light activity can help. Stay hydrated and get adequate sleep. The soreness usually peaks at 24-48 hours and improves within 3-5 days. 💆‍♂️";
      } else if (lowerMessage.includes('sleep') || lowerMessage.includes('rest')) {
        response = "Aim for 7-9 hours of quality sleep for optimal recovery. Create a bedtime routine, keep your room cool and dark, and avoid screens 1 hour before bed. Sleep is when your body repairs and builds muscle! 😴";
      } else {
        response = "Recovery is just as important as training! This includes proper sleep, nutrition, hydration, stretching, and rest days. Listen to your body - if you're feeling run down, take an extra rest day. What specific recovery issue are you dealing with? 🛌";
      }
    }
    // Form and technique responses
    else if (lowerMessage.includes('form') || lowerMessage.includes('technique') || lowerMessage.includes('proper') || lowerMessage.includes('correct')) {
      if (lowerMessage.includes('squat')) {
        response = "For proper squat form: feet shoulder-width apart, toes slightly out, chest up, core engaged. Lower as if sitting back into a chair, keeping knees in line with toes. Go as deep as you can while maintaining good form. Consider working with a trainer for personalized guidance! 🏋️‍♀️";
      } else if (lowerMessage.includes('deadlift')) {
        response = "Deadlift form is crucial: feet hip-width apart, bar close to shins, chest up, core tight. Push through your heels and stand up straight, keeping the bar close to your body. Start with lighter weights to perfect form before increasing load. 🏋️‍♂️";
      } else {
        response = "Proper form prevents injuries and maximizes results! Consider working with a certified trainer, especially for complex movements like deadlifts, squats, and Olympic lifts. Start with lighter weights to perfect technique. What specific exercise are you concerned about? 📚";
      }
    }
    // Goal setting responses
    else if (lowerMessage.includes('goal') || lowerMessage.includes('plan') || lowerMessage.includes('program')) {
      response = "Setting SMART goals is key: Specific, Measurable, Achievable, Relevant, and Time-bound. For example: 'I want to lose 10 pounds in 3 months by working out 4 times per week and eating 500 calories below maintenance.' What's your main fitness goal? 🎯";
    }
    // General fitness responses
    else if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
      response = "Hello! I'm here to help with all your fitness questions. Whether you need workout advice, nutrition tips, recovery strategies, or help with exercise form, just ask! What can I help you with today? 💪";
    }
    // Default response for unrelated topics
    else {
      response = "I'm your fitness AI coach, so I can help with workout plans, nutrition advice, exercise form, recovery tips, goal setting, and fitness motivation. For other topics, I'd recommend consulting appropriate professionals. What fitness question do you have? 🏋️‍♀️";
    }

    setIsTyping(false);
    return response;
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');

    const aiResponse = await getAIResponse(inputMessage);
    
    const botMessage = {
      id: Date.now() + 1,
      type: 'bot',
      content: aiResponse,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, botMessage]);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickQuestions = [
    "How to start working out?",
    "Best protein sources?",
    "How to fix muscle soreness?",
    "Proper squat form?",
    "Weight loss tips?"
  ];

  const handleQuickQuestion = (question) => {
    setInputMessage(question);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div 
        className="bg-gradient-to-br from-[#1E293B] to-[#0F172A] rounded-2xl shadow-2xl border border-[#334155] w-full max-w-2xl h-[600px] flex flex-col"
        style={{ borderColor: currentTheme.colors.border }}
      >
        {/* Header */}
        <div 
          className="flex items-center justify-between p-4 border-b rounded-t-2xl"
          style={{ borderColor: currentTheme.colors.border }}
        >
          <div className="flex items-center space-x-3">
            <div 
              className="w-10 h-10 rounded-lg flex items-center justify-center"
              style={{
                background: `linear-gradient(135deg, ${currentTheme.colors.primary}, ${currentTheme.colors.secondary})`
              }}
            >
              <Bot className="text-white" size={20} />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white">AI Fitness Coach</h2>
              <p className="text-gray-400 text-sm">Ask me anything about fitness!</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-[#334155] transition-colors"
          >
            <X className="text-gray-400" size={20} />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-lg ${
                  message.type === 'user'
                    ? 'bg-gradient-to-r from-[#8B5CF6] to-[#F472B6] text-white'
                    : 'bg-[#1E293B] border border-[#334155] text-gray-300'
                }`}
                style={{
                  background: message.type === 'user' 
                    ? `linear-gradient(135deg, ${currentTheme.colors.primary}, ${currentTheme.colors.secondary})`
                    : undefined,
                  borderColor: message.type === 'bot' ? currentTheme.colors.border : undefined
                }}
              >
                <div className="flex items-start space-x-2">
                  {message.type === 'bot' && (
                    <Bot className="text-[#8B5CF6] mt-1 flex-shrink-0" size={16} />
                  )}
                  <div className="flex-1">
                    <p className="text-sm leading-relaxed">{message.content}</p>
                    <p className="text-xs opacity-70 mt-2">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-[#1E293B] border border-[#334155] text-gray-300 p-3 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Bot className="text-[#8B5CF6]" size={16} />
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-[#8B5CF6] rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-[#8B5CF6] rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-[#8B5CF6] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Questions */}
        <div className="px-4 pb-2">
          <div className="flex flex-wrap gap-2">
            {quickQuestions.map((question, index) => (
              <button
                key={index}
                onClick={() => handleQuickQuestion(question)}
                className="px-3 py-1 text-xs bg-[#1E293B] border border-[#334155] rounded-full text-gray-300 hover:bg-[#334155] transition-colors"
                style={{ borderColor: currentTheme.colors.border }}
              >
                {question}
              </button>
            ))}
          </div>
        </div>

        {/* Input */}
        <div className="p-4 border-t" style={{ borderColor: currentTheme.colors.border }}>
          <div className="flex space-x-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me about fitness, workouts, nutrition..."
              className="flex-1 px-4 py-2 bg-[#1E293B] border border-[#334155] rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-colors"
              style={{ 
                borderColor: currentTheme.colors.border,
                focusRingColor: currentTheme.colors.primary
              }}
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isTyping}
              className="px-4 py-2 rounded-lg transition-all duration-200 flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                background: `linear-gradient(135deg, ${currentTheme.colors.primary}, ${currentTheme.colors.secondary})`
              }}
            >
              {isTyping ? (
                <Loader2 className="text-white animate-spin" size={16} />
              ) : (
                <Send className="text-white" size={16} />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FitnessChatbot; 