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
  
  // Extended Workout Data
  export const workoutData = {
    // Scheduled workouts for the calendar
    scheduledWorkouts: [
      {
        id: 101,
        title: 'Morning Run',
        date: '2025-03-28',
        time: '06:30',
        duration: 30,
        category: 'cardio',
        intensity: 'moderate',
        calories: 320,
        notes: 'Focus on maintaining steady pace'
      },
      {
        id: 102,
        title: 'HIIT Session',
        date: '2025-03-28',
        time: '17:00',
        duration: 25,
        category: 'hiit',
        intensity: 'high',
        calories: 380,
        notes: '30s work, 15s rest intervals'
      },
      {
        id: 103,
        title: 'Yoga Class',
        date: '2025-03-29',
        time: '08:00',
        duration: 45,
        category: 'flexibility',
        intensity: 'low',
        calories: 180,
        notes: 'Focus on breathing and stretching'
      },
      {
        id: 104,
        title: 'Strength Training',
        date: '2025-03-30',
        time: '15:30',
        duration: 50,
        category: 'strength',
        intensity: 'high',
        calories: 420,
        notes: 'Upper body focus - chest and back'
      },
      {
        id: 105,
        title: 'Swimming',
        date: '2025-03-31',
        time: '19:00',
        duration: 40,
        category: 'cardio',
        intensity: 'moderate',
        calories: 350,
        notes: 'Mix of freestyle and breaststroke'
      },
      {
        id: 106,
        title: 'Cycling',
        date: '2025-04-01',
        time: '06:30',
        duration: 45,
        category: 'cardio',
        intensity: 'moderate',
        calories: 400,
        notes: 'Hill intervals'
      },
      {
        id: 107,
        title: 'Core Workout',
        date: '2025-04-01',
        time: '18:00',
        duration: 30,
        category: 'strength',
        intensity: 'high',
        calories: 250,
        notes: 'Focus on abs and lower back'
      }
    ],
    
    // Detailed workout history
    completedWorkouts: [
      {
        id: 201,
        title: 'Morning Run',
        date: '2025-03-27',
        time: '06:30',
        duration: 32,
        category: 'cardio',
        intensity: 'moderate',
        calories: 340,
        distance: 5.2,
        avgHeartRate: 145,
        maxHeartRate: 165,
        rating: 4,
        notes: 'Felt good, maintained steady pace'
      },
      {
        id: 202,
        title: 'HIIT Session',
        date: '2025-03-27',
        time: '17:00',
        duration: 26,
        category: 'hiit',
        intensity: 'high',
        calories: 395,
        avgHeartRate: 162,
        maxHeartRate: 183,
        rating: 5,
        notes: 'Pushed hard on all intervals'
      },
      {
        id: 203,
        title: 'Yoga Session',
        date: '2025-03-26',
        time: '08:00',
        duration: 45,
        category: 'flexibility',
        intensity: 'low',
        calories: 175,
        avgHeartRate: 95,
        maxHeartRate: 110,
        rating: 4,
        notes: 'Great stretch, focused on mindfulness'
      },
      {
        id: 204,
        title: 'Strength Training',
        date: '2025-03-25',
        time: '16:00',
        duration: 55,
        category: 'strength',
        intensity: 'high',
        calories: 450,
        avgHeartRate: 140,
        maxHeartRate: 165,
        rating: 5,
        notes: 'New PR on bench press: 185 lbs'
      },
      {
        id: 205,
        title: 'Swimming',
        date: '2025-03-24',
        time: '19:00',
        duration: 40,
        category: 'cardio',
        intensity: 'moderate',
        calories: 360,
        distance: 1.5,
        avgHeartRate: 135,
        maxHeartRate: 155,
        rating: 4,
        notes: 'Felt smooth in the water today'
      },
      {
        id: 206,
        title: 'Cycling',
        date: '2025-03-23',
        time: '07:00',
        duration: 60,
        category: 'cardio',
        intensity: 'moderate',
        calories: 550,
        distance: 25,
        avgHeartRate: 152,
        maxHeartRate: 175,
        rating: 4,
        notes: 'Long ride with some hill climbs'
      },
      {
        id: 207,
        title: 'Core Workout',
        date: '2025-03-22',
        time: '18:00',
        duration: 30,
        category: 'strength',
        intensity: 'high',
        calories: 280,
        avgHeartRate: 138,
        maxHeartRate: 160,
        rating: 3,
        notes: 'Still feeling sore from yesterday'
      }
    ],
    
    // Workout categories
    categories: [
      {
        id: 'cardio',
        name: 'Cardio',
        icon: '🏃',
        color: '#8B5CF6',
        description: 'Improve heart health and burn calories',
        examples: ['Running', 'Cycling', 'Swimming', 'Rowing', 'Elliptical']
      },
      {
        id: 'strength',
        name: 'Strength',
        icon: '💪',
        color: '#F472B6',
        description: 'Build muscle and increase metabolism',
        examples: ['Weight Training', 'Resistance Bands', 'Bodyweight Exercises', 'Kettlebells']
      },
      {
        id: 'hiit',
        name: 'HIIT',
        icon: '⚡',
        color: '#F59E0B',
        description: 'High-intensity interval training for maximum calorie burn',
        examples: ['Tabata', 'Circuit Training', 'CrossFit', 'Interval Sprints']
      },
      {
        id: 'flexibility',
        name: 'Flexibility',
        icon: '🧘',
        color: '#10B981',
        description: 'Improve range of motion and reduce injury risk',
        examples: ['Yoga', 'Pilates', 'Stretching', 'Mobility Work']
      },
      {
        id: 'sports',
        name: 'Sports',
        icon: '🏀',
        color: '#3B82F6',
        description: 'Activities that combine fitness with play',
        examples: ['Basketball', 'Tennis', 'Soccer', 'Volleyball']
      }
    ],
    
    // Recommended workouts based on user goals
    recommendations: [
      {
        id: 301,
        title: 'HIIT for Fat Loss',
        category: 'hiit',
        description: 'High-intensity workout optimized for maximum calorie burn',
        duration: 30,
        difficulty: 'Intermediate',
        calories: 350,
        tags: ['weight loss', 'high intensity', 'quick']
      },
      {
        id: 302,
        title: 'Strength for Beginners',
        category: 'strength',
        description: 'Full-body strength routine perfect for beginners',
        duration: 45,
        difficulty: 'Beginner',
        calories: 280,
        tags: ['muscle gain', 'beginner friendly', 'full body']
      },
      {
        id: 303,
        title: 'Morning Energizer',
        category: 'cardio',
        description: 'Quick cardio session to kickstart your day',
        duration: 20,
        difficulty: 'Beginner',
        calories: 200,
        tags: ['morning', 'energizing', 'quick']
      },
      {
        id: 304,
        title: 'Stress Relief Yoga',
        category: 'flexibility',
        description: 'Gentle yoga flow focused on relaxation and stress reduction',
        duration: 35,
        difficulty: 'Beginner',
        calories: 150,
        tags: ['stress relief', 'relaxation', 'flexibility']
      },
      {
        id: 305,
        title: 'Advanced Muscle Builder',
        category: 'strength',
        description: 'Intense strength routine for experienced lifters',
        duration: 60,
        difficulty: 'Advanced',
        calories: 450,
        tags: ['muscle gain', 'advanced', 'high intensity']
      }
    ],
    
    // Workout performance metrics
    performanceMetrics: {
      weeklyVolume: [
        { week: 'Week 1', volume: 120 },
        { week: 'Week 2', volume: 150 },
        { week: 'Week 3', volume: 140 },
        { week: 'Week 4', volume: 180 },
        { week: 'Week 5', volume: 190 },
        { week: 'Week 6', volume: 210 },
        { week: 'Week 7', volume: 200 },
        { week: 'Week 8', volume: 230 }
      ],
      categoryBreakdown: [
        { category: 'Cardio', percentage: 40 },
        { category: 'Strength', percentage: 30 },
        { category: 'HIIT', percentage: 15 },
        { category: 'Flexibility', percentage: 10 },
        { category: 'Sports', percentage: 5 }
      ],
      improvements: [
        { metric: 'Average running pace', change: -0.5, unit: 'min/km', trending: 'down' },
        { metric: 'Max bench press', change: 15, unit: 'lbs', trending: 'up' },
        { metric: 'Resting heart rate', change: -3, unit: 'bpm', trending: 'down' },
        { metric: 'Hip mobility', change: 15, unit: '%', trending: 'up' },
        { metric: 'HIIT recovery time', change: -20, unit: 'sec', trending: 'down' }
      ]
    },
    
    // Template workouts that can be customized
    workoutTemplates: [
      {
        id: 401,
        title: 'Full Body Strength',
        category: 'strength',
        duration: 45,
        exercises: [
          { name: 'Squats', sets: 3, reps: 12, rest: 60 },
          { name: 'Push-ups', sets: 3, reps: 15, rest: 60 },
          { name: 'Rows', sets: 3, reps: 12, rest: 60 },
          { name: 'Lunges', sets: 3, reps: 10, rest: 60 },
          { name: 'Plank', sets: 3, time: '30 sec', rest: 45 }
        ]
      },
      {
        id: 402,
        title: '30-Minute HIIT',
        category: 'hiit',
        duration: 30,
        exercises: [
          { name: 'Jumping Jacks', time: '30 sec', rest: '15 sec' },
          { name: 'Mountain Climbers', time: '30 sec', rest: '15 sec' },
          { name: 'Burpees', time: '30 sec', rest: '15 sec' },
          { name: 'High Knees', time: '30 sec', rest: '15 sec' },
          { name: 'Squat Jumps', time: '30 sec', rest: '15 sec' }
        ],
        rounds: 4
      },
      {
        id: 403,
        title: 'Core Crusher',
        category: 'strength',
        duration: 20,
        exercises: [
          { name: 'Crunches', sets: 3, reps: 20, rest: 30 },
          { name: 'Russian Twists', sets: 3, reps: 16, rest: 30 },
          { name: 'Leg Raises', sets: 3, reps: 12, rest: 30 },
          { name: 'Side Planks', sets: 3, time: '30 sec', rest: 30 },
          { name: 'Bicycle Crunches', sets: 3, reps: 20, rest: 30 }
        ]
      },
      {
        id: 404,
        title: 'Beginner 5K Run',
        category: 'cardio',
        duration: 30,
        description: 'Alternating between walking and running intervals',
        intervals: [
          { activity: 'Warm-up Walk', time: '5 min' },
          { activity: 'Jog', time: '1 min' },
          { activity: 'Walk', time: '1.5 min' },
          { activity: 'Jog', time: '1 min' },
          { activity: 'Walk', time: '1.5 min' },
          { activity: 'Jog', time: '1 min' },
          { activity: 'Walk', time: '1.5 min' },
          { activity: 'Jog', time: '1 min' },
          { activity: 'Walk', time: '1.5 min' },
          { activity: 'Cool-down Walk', time: '5 min' }
        ]
      }
    ],
    
    // Current month with dates for calendar view
    calendarDates: Array.from({ length: 31 }, (_, i) => ({
      date: i + 1,
      month: 'March',
      year: 2025,
      hasWorkout: [4, 7, 12, 15, 20, 23, 27, 28].includes(i + 1)
    }))
  };