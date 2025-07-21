// profileData.js - Mock data for profile tab

// User information
export const userProfile = {
    name: "Jordan Smith",
    age: 32,
    email: "jordan.smith@example.com",
    joinDate: "2023-06-15",
    gender: "Male",
    profileImage: "/profile-avatar.jpg", // Path to profile image
    plan: "Premium",
    planExpiration: "2025-12-31",
    notificationSettings: {
      workoutReminders: true,
      goalAlerts: true,
      achievementNotifications: true,
      weeklyReports: true,
      appUpdates: false
    },
    appSettings: {
      darkMode: true,
      units: "imperial", // 'metric' or 'imperial'
      dataSharing: false,
      autoTracking: true,
      socialIntegration: false
    },
    socialConnections: {
      facebook: false,
      google: true,
      apple: false,
      twitter: false
    },
    preferences: {
      primaryGoal: "build_muscle",
      workoutDays: ["monday", "tuesday", "thursday", "friday", "saturday"],
      workoutDuration: 60, // minutes
      preferredWorkoutTime: "morning"
    }
  };
  
  // Body measurements history
  export const bodyMeasurements = {
    current: {
      weight: 75.4, // kg
      height: 178, // cm
      bodyFat: 18.5, // percentage
      muscleMass: 35.2, // percentage
      bmi: 23.8,
      neck: 38.1, // cm
      chest: 96.5, // cm
      waist: 83.2, // cm
      hips: 92.7, // cm
      biceps: 34.3, // cm
      thighs: 55.9, // cm
      calves: 37.1, // cm
      lastUpdated: "2025-03-25"
    },
    history: [
      {
        date: "2025-03-25",
        weight: 75.4,
        bodyFat: 18.5,
        muscleMass: 35.2,
        waist: 83.2
      },
      {
        date: "2025-03-10",
        weight: 76.2,
        bodyFat: 19.1,
        muscleMass: 34.8,
        waist: 84.5
      },
      {
        date: "2025-02-25",
        weight: 77.0,
        bodyFat: 19.8,
        muscleMass: 34.2,
        waist: 85.3
      },
      {
        date: "2025-02-10",
        weight: 77.8,
        bodyFat: 20.2,
        muscleMass: 33.9,
        waist: 86.1
      },
      {
        date: "2025-01-25",
        weight: 78.5,
        bodyFat: 20.9,
        muscleMass: 33.2,
        waist: 87.4
      },
      {
        date: "2025-01-10",
        weight: 79.1,
        bodyFat: 21.5,
        muscleMass: 32.8,
        waist: 88.2
      },
      {
        date: "2024-12-25",
        weight: 79.8,
        bodyFat: 22.0,
        muscleMass: 32.5,
        waist: 89.0
      }
    ]
  };
  
  // Progress photos
  export const progressPhotos = [
    {
      id: 1,
      date: "2025-03-15",
      category: "front",
      imageUrl: "/progress-front-1.jpg",
      thumbnail: "/thumbnail-front-1.jpg"
    },
    {
      id: 2,
      date: "2025-03-15",
      category: "side",
      imageUrl: "/progress-side-1.jpg",
      thumbnail: "/thumbnail-side-1.jpg"
    },
    {
      id: 3,
      date: "2025-03-15",
      category: "back",
      imageUrl: "/progress-back-1.jpg",
      thumbnail: "/thumbnail-back-1.jpg"
    },
    {
      id: 4,
      date: "2025-02-15",
      category: "front",
      imageUrl: "/progress-front-2.jpg",
      thumbnail: "/thumbnail-front-2.jpg"
    },
    {
      id: 5,
      date: "2025-02-15",
      category: "side",
      imageUrl: "/progress-side-2.jpg",
      thumbnail: "/thumbnail-side-2.jpg"
    },
    {
      id: 6,
      date: "2025-02-15",
      category: "back",
      imageUrl: "/progress-back-2.jpg",
      thumbnail: "/thumbnail-back-2.jpg"
    },
    {
      id: 7,
      date: "2025-01-15",
      category: "front",
      imageUrl: "/progress-front-3.jpg",
      thumbnail: "/thumbnail-front-3.jpg"
    },
    {
      id: 8,
      date: "2025-01-15",
      category: "side",
      imageUrl: "/progress-side-3.jpg",
      thumbnail: "/thumbnail-side-3.jpg"
    },
    {
      id: 9,
      date: "2025-01-15",
      category: "back",
      imageUrl: "/progress-back-3.jpg",
      thumbnail: "/thumbnail-back-3.jpg"
    }
  ];
  
  // Health metrics history
  export const healthMetrics = {
    restingHeartRate: [
      { date: "2025-03-25", value: 62 },
      { date: "2025-03-18", value: 64 },
      { date: "2025-03-11", value: 65 },
      { date: "2025-03-04", value: 67 },
      { date: "2025-02-25", value: 68 },
      { date: "2025-02-18", value: 66 },
      { date: "2025-02-11", value: 67 },
      { date: "2025-02-04", value: 69 }
    ],
    bloodPressure: [
      { date: "2025-03-25", systolic: 118, diastolic: 76 },
      { date: "2025-03-11", systolic: 120, diastolic: 78 },
      { date: "2025-02-25", systolic: 122, diastolic: 80 },
      { date: "2025-02-11", systolic: 124, diastolic: 82 },
      { date: "2025-01-25", systolic: 126, diastolic: 84 },
      { date: "2025-01-11", systolic: 124, diastolic: 82 }
    ],
    sleepQuality: [
      { date: "2025-03-25", hours: 7.5, quality: 85 },
      { date: "2025-03-24", hours: 6.8, quality: 72 },
      { date: "2025-03-23", hours: 7.2, quality: 78 },
      { date: "2025-03-22", hours: 8.0, quality: 88 },
      { date: "2025-03-21", hours: 7.3, quality: 76 },
      { date: "2025-03-20", hours: 6.5, quality: 65 },
      { date: "2025-03-19", hours: 7.8, quality: 82 }
    ],
    energyLevels: [
      { date: "2025-03-25", level: 8 },
      { date: "2025-03-24", level: 7 },
      { date: "2025-03-23", level: 6 },
      { date: "2025-03-22", level: 8 },
      { date: "2025-03-21", level: 9 },
      { date: "2025-03-20", level: 7 },
      { date: "2025-03-19", level: 8 }
    ],
    stressLevels: [
      { date: "2025-03-25", level: 3 },
      { date: "2025-03-24", level: 4 },
      { date: "2025-03-23", level: 6 },
      { date: "2025-03-22", level: 3 },
      { date: "2025-03-21", level: 2 },
      { date: "2025-03-20", level: 5 },
      { date: "2025-03-19", level: 4 }
    ]
  };
  
  // Goal-setting preferences
  export const goalPreferences = [
    { id: "build_muscle", name: "Build Muscle", icon: "💪" },
    { id: "lose_weight", name: "Lose Weight", icon: "⚖️" },
    { id: "improve_fitness", name: "Improve Fitness", icon: "🏃" },
    { id: "increase_strength", name: "Increase Strength", icon: "🏋️" },
    { id: "increase_flexibility", name: "Increase Flexibility", icon: "🧘" },
    { id: "improve_endurance", name: "Improve Endurance", icon: "🚴" },
    { id: "maintain_health", name: "Maintain Health", icon: "❤️" }
  ];
  
  // Time preferences
  export const timePreferences = [
    { id: "morning", name: "Morning (5am - 11am)" },
    { id: "afternoon", name: "Afternoon (12pm - 5pm)" },
    { id: "evening", name: "Evening (6pm - 9pm)" },
    { id: "night", name: "Night (10pm - 4am)" },
    { id: "flexible", name: "Flexible" }
  ];
  
  // Days of the week
  export const daysOfWeek = [
    { id: "monday", name: "Monday", shortName: "Mon" },
    { id: "tuesday", name: "Tuesday", shortName: "Tue" },
    { id: "wednesday", name: "Wednesday", shortName: "Wed" },
    { id: "thursday", name: "Thursday", shortName: "Thu" },
    { id: "friday", name: "Friday", shortName: "Fri" },
    { id: "saturday", name: "Saturday", shortName: "Sat" },
    { id: "sunday", name: "Sunday", shortName: "Sun" }
  ];
  
  // Workout length options
  export const workoutLengthOptions = [
    { value: 15, label: "15 minutes" },
    { value: 30, label: "30 minutes" },
    { value: 45, label: "45 minutes" },
    { value: 60, label: "60 minutes" },
    { value: 90, label: "90 minutes" },
    { value: 120, label: "120 minutes" }
  ];
  
  // Measurement progress data for charts
  export const measurementProgressData = [
    { month: "Sep", weight: 79.8, bodyFat: 22.0, muscleMass: 32.5 },
    { month: "Oct", weight: 79.1, bodyFat: 21.5, muscleMass: 32.8 },
    { month: "Nov", weight: 78.5, bodyFat: 20.9, muscleMass: 33.2 },
    { month: "Dec", weight: 77.8, bodyFat: 20.2, muscleMass: 33.9 },
    { month: "Jan", weight: 77.0, bodyFat: 19.8, muscleMass: 34.2 },
    { month: "Feb", weight: 76.2, bodyFat: 19.1, muscleMass: 34.8 },
    { month: "Mar", weight: 75.4, bodyFat: 18.5, muscleMass: 35.2 }
  ];