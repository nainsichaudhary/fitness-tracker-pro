// data.js - Mock data for fitness dashboard

// Activity data for the week
export const activityData = [
    { name: 'Mon', steps: 6500, calories: 1800 },
    { name: 'Tue', steps: 8200, calories: 2100 },
    { name: 'Wed', steps: 7800, calories: 2000 },
    { name: 'Thu', steps: 9500, calories: 2300 },
    { name: 'Fri', steps: 10200, calories: 2400 },
    { name: 'Sat', steps: 12500, calories: 2800 },
    { name: 'Sun', steps: 7800, calories: 2000 },
  ];
  
  // Daily metrics
  export const dailyMetrics = {
    steps: {
      current: 7840,
      goal: 10000
    },
    calories: {
      burned: 1890,
      goal: 2500
    },
    water: {
      intake: 1.8,
      goal: 3.0
    },
    heartRate: {
      current: 72,
      average: 74,
      yesterday: 70
    },
    sleep: {
      hours: 7.5,
      goal: 8
    },
    activeMinutes: {
      current: 45,
      goal: 60
    }
  };
  
  // Workout history
  export const workoutHistory = [
    { id: 1, type: 'Morning Run', duration: '30 min', calories: 320, completed: true },
    { id: 2, type: 'HIIT Training', duration: '25 min', calories: 380, completed: true },
    { id: 3, type: 'Evening Walk', duration: '45 min', calories: 210, completed: false },
  ];
  
  // Nutrition data
  export const nutritionData = [
    { id: 1, meal: 'Breakfast', food: 'Protein Smoothie', calories: 320, protein: 24, time: '7:30 AM', icon: '🥤' },
    { id: 2, meal: 'Lunch', food: 'Grilled chicken salad', calories: 450, protein: 35, time: '12:15 PM', icon: '🥗' },
    { id: 3, meal: 'Dinner', food: 'Salmon with vegetables', calories: 520, protein: 40, time: '7:00 PM', icon: '🍽️' },
  ];
  
  // Macronutrient breakdown
  export const macroBreakdown = {
    protein: {
      amount: 124,
      goal: 140,
      unit: 'g'
    },
    carbs: {
      amount: 230,
      goal: 250,
      unit: 'g'
    },
    fat: {
      amount: 65,
      goal: 80,
      unit: 'g'
    },
    water: {
      amount: 1.8,
      goal: 3.0,
      unit: 'L'
    }
  };
  
  // Goals and challenges
  export const goalsAndChallenges = [
    {
      id: 1,
      title: '10K Steps Challenge',
      description: 'Complete 10,000 steps daily for 7 days',
      progress: 4,
      total: 7,
      status: 'In Progress',
      type: 'steps'
    },
    {
      id: 2,
      title: 'Calorie Goal',
      description: 'Burn 15,000 calories this week',
      progress: 11250,
      total: 15000,
      status: 'On Track',
      type: 'calories'
    }
  ];
  
  // Body metrics
  export const bodyMetrics = {
    weight: {
      current: 75.4,
      previous: 76.2,
      unit: 'kg'
    },
    height: {
      value: 178,
      unit: 'cm'
    },
    bmi: {
      value: 23.8,
      category: 'Normal'
    },
    bodyFat: {
      value: 18.5,
      unit: '%'
    },
    muscleMass: {
      value: 35.2,
      unit: '%'
    }
  };
  
  // User info
  export const userInfo = {
    name: 'Jordan',
    age: 32,
    activeSince: '2023-06-15',
    profileImage: '/profile.jpg',
    plan: 'Premium'
  };

  