// goalsData.js - Mock data for goals tab

// Active user goals
export const activeGoals = [
  {
    id: 1,
    title: "Run 100 Miles",
    description: "Complete 100 miles of running in 30 days",
    category: "cardio",
    target: 100,
    unit: "miles",
    current: 68,
    deadline: "2025-04-15",
    startDate: "2025-03-15",
    status: "in-progress",
    priority: "high",
    progress: 68,
    streakRequired: false,
    reminderEnabled: true,
    reminderFrequency: "daily",
    icon: "🏃"
  },
  {
    id: 2,
    title: "Weight Training 3x Weekly",
    description: "Complete at least 3 weight training sessions each week",
    category: "strength",
    target: 12,
    unit: "sessions",
    current: 7,
    deadline: "2025-04-10",
    startDate: "2025-03-13",
    status: "in-progress",
    priority: "medium",
    progress: 58,
    streakRequired: true,
    streakCurrent: 2,
    streakTarget: 4,
    reminderEnabled: true,
    reminderFrequency: "weekly",
    icon: "💪"
  },
  {
    id: 3,
    title: "Lose 5 Pounds",
    description: "Reduce body weight by 5 pounds through exercise and nutrition",
    category: "weight",
    target: 5,
    unit: "lbs",
    current: 2.2,
    deadline: "2025-05-01",
    startDate: "2025-03-01",
    status: "in-progress",
    priority: "high",
    progress: 44,
    streakRequired: false,
    reminderEnabled: true,
    reminderFrequency: "weekly",
    icon: "⚖️"
  },
  {
    id: 4,
    title: "Hydration Challenge",
    description: "Drink at least 3 liters of water every day",
    category: "nutrition",
    target: 30,
    unit: "days",
    current: 18,
    deadline: "2025-04-05",
    startDate: "2025-03-06",
    status: "in-progress",
    priority: "medium",
    progress: 60,
    streakRequired: true,
    streakCurrent: 5,
    streakTarget: 30,
    reminderEnabled: true,
    reminderFrequency: "daily",
    icon: "💧"
  },
  {
    id: 5,
    title: "Morning Meditation",
    description: "Practice meditation for 10 minutes every morning",
    category: "wellness",
    target: 30,
    unit: "days",
    current: 12,
    deadline: "2025-04-20",
    startDate: "2025-03-21",
    status: "in-progress",
    priority: "low",
    progress: 40,
    streakRequired: true,
    streakCurrent: 3,
    streakTarget: 30,
    reminderEnabled: true,
    reminderFrequency: "daily",
    icon: "🧘‍♂️"
  }
];

// Completed goals history
export const completedGoals = [
  {
    id: 101,
    title: "30-Day Plank Challenge",
    description: "Gradually increase plank hold time over 30 days",
    category: "strength",
    target: 30,
    unit: "days",
    completedDate: "2025-03-01",
    startDate: "2025-02-01",
    completionTime: 28, // days to complete
    success: true,
    icon: "🧍‍♂️"
  },
  {
    id: 102,
    title: "Learn to Swim",
    description: "Take swimming lessons and become comfortable in the water",
    category: "skill",
    target: 10,
    unit: "lessons",
    completedDate: "2025-02-15",
    startDate: "2025-01-01",
    completionTime: 45, // days to complete
    success: true,
    icon: "🏊‍♂️"
  },
  {
    id: 103,
    title: "Sugar-Free Month",
    description: "Eliminate added sugars from diet for one month",
    category: "nutrition",
    target: 30,
    unit: "days",
    completedDate: "2025-01-25",
    startDate: "2024-12-26",
    completionTime: 30, // days to complete
    success: true,
    icon: "🍬"
  },
  {
    id: 104,
    title: "10,000 Steps Daily",
    description: "Walk at least 10,000 steps every day for a month",
    category: "cardio",
    target: 30,
    unit: "days",
    completedDate: "2024-12-20",
    startDate: "2024-11-20",
    completionTime: 30, // days to complete
    success: true,
    icon: "👣"
  },
  {
    id: 105,
    title: "Muscle Up Progression",
    description: "Train to perform first muscle-up exercise",
    category: "strength",
    target: 1,
    unit: "reps",
    completedDate: "2024-11-15",
    startDate: "2024-09-15",
    completionTime: 60, // days to complete
    success: true,
    icon: "🏋️‍♂️"
  }
];

// Goals performance and statistics
export const goalStatistics = {
  currentMonth: {
    totalGoals: 8,
    completed: 3,
    inProgress: 5,
    abandoned: 0,
    completionRate: 100, // percentage of completed goals (of those due)
    averageProgress: 65 // average progress of all active goals
  },
  lastMonth: {
    totalGoals: 10,
    completed: 7,
    inProgress: 2,
    abandoned: 1,
    completionRate: 88, // percentage of completed goals (of those due)
    averageProgress: 72 // average progress of all active goals
  },
  yearToDate: {
    totalGoals: 24,
    completed: 18,
    inProgress: 5,
    abandoned: 1,
    completionRate: 95,
    averageProgress: 76
  },
  categoryBreakdown: [
    { category: "cardio", count: 6, completionRate: 67 },
    { category: "strength", count: 8, completionRate: 75 },
    { category: "nutrition", count: 5, completionRate: 80 },
    { category: "weight", count: 2, completionRate: 50 },
    { category: "wellness", count: 3, completionRate: 67 }
  ],
  streakData: [5, 8, 12, 10, 15, 20, 18, 21, 25, 30, 28, 26],
  progressOverTime: [
    { month: "Jan", progress: 65 },
    { month: "Feb", progress: 70 },
    { month: "Mar", progress: 75 }
  ]
};

// Goal templates for creation
export const goalTemplates = [
  {
    id: "t1",
    title: "Weight Loss Goal",
    description: "Set a target weight loss goal with a specific deadline",
    category: "weight",
    defaultTarget: 5,
    defaultUnit: "lbs",
    defaultDuration: 30, // days
    requiresStreak: false,
    popularity: "high",
    icon: "⚖️"
  },
  {
    id: "t2",
    title: "Running Distance Goal",
    description: "Set a target running distance to achieve over time",
    category: "cardio",
    defaultTarget: 50,
    defaultUnit: "miles",
    defaultDuration: 30, // days
    requiresStreak: false,
    popularity: "high",
    icon: "🏃"
  },
  {
    id: "t3",
    title: "Workout Frequency",
    description: "Set a target number of workouts to complete per week",
    category: "strength",
    defaultTarget: 3,
    defaultUnit: "workouts/week",
    defaultDuration: 28, // days
    requiresStreak: true,
    popularity: "high",
    icon: "💪"
  },
  {
    id: "t4",
    title: "Water Intake",
    description: "Drink a target amount of water each day",
    category: "nutrition",
    defaultTarget: 3,
    defaultUnit: "liters/day",
    defaultDuration: 30, // days
    requiresStreak: true,
    popularity: "medium",
    icon: "💧"
  },
  {
    id: "t5",
    title: "Step Count Goal",
    description: "Achieve a target number of steps each day",
    category: "cardio",
    defaultTarget: 10000,
    defaultUnit: "steps/day",
    defaultDuration: 30, // days
    requiresStreak: true,
    popularity: "high",
    icon: "👣"
  },
  {
    id: "t6",
    title: "Weight Training PR",
    description: "Achieve a new personal record in a specific lift",
    category: "strength",
    defaultTarget: null, // user sets their own target
    defaultUnit: "lbs",
    defaultDuration: 60, // days
    requiresStreak: false,
    popularity: "medium",
    icon: "🏋️‍♂️"
  },
  {
    id: "t7",
    title: "Meditation Habit",
    description: "Develop a regular meditation practice",
    category: "wellness",
    defaultTarget: 10,
    defaultUnit: "minutes/day",
    defaultDuration: 30, // days
    requiresStreak: true,
    popularity: "medium",
    icon: "🧘‍♂️"
  },
  {
    id: "t8",
    title: "Nutrition Challenge",
    description: "Follow a specific nutrition plan for a set period",
    category: "nutrition",
    defaultTarget: 30,
    defaultUnit: "days",
    defaultDuration: 30, // days
    requiresStreak: true,
    popularity: "medium",
    icon: "🥗"
  }
];

// Achievements and badges
export const achievements = [
  {
    id: "a1",
    title: "Early Bird",
    description: "Complete 10 workouts before 8 AM",
    progress: 10,
    total: 10,
    unlocked: true,
    unlockedDate: "2025-02-28",
    category: "habits",
    icon: "🌅",
    rarity: "common"
  },
  {
    id: "a2",
    title: "Marathon Finisher",
    description: "Complete a full marathon race",
    progress: 1,
    total: 1,
    unlocked: true,
    unlockedDate: "2025-01-15",
    category: "cardio",
    icon: "🏁",
    rarity: "rare"
  },
  {
    id: "a3",
    title: "Iron Pumper",
    description: "Log 50 strength training workouts",
    progress: 42,
    total: 50,
    unlocked: false,
    category: "strength",
    icon: "🏋️‍♂️",
    rarity: "uncommon"
  },
  {
    id: "a4",
    title: "Nutrition Master",
    description: "Log your meals for 100 consecutive days",
    progress: 68,
    total: 100,
    unlocked: false,
    category: "nutrition",
    icon: "🍎",
    rarity: "epic"
  },
  {
    id: "a5",
    title: "Goal Crusher",
    description: "Complete 25 personal goals",
    progress: 18,
    total: 25,
    unlocked: false,
    category: "goals",
    icon: "🏆",
    rarity: "uncommon"
  },
  {
    id: "a6",
    title: "Hydration Hero",
    description: "Meet your water intake goal for 30 consecutive days",
    progress: 30,
    total: 30,
    unlocked: true,
    unlockedDate: "2025-02-10",
    category: "nutrition",
    icon: "💧",
    rarity: "common"
  },
  {
    id: "a7",
    title: "Century Club",
    description: "Log 100 workouts total",
    progress: 87,
    total: 100,
    unlocked: false,
    category: "consistency",
    icon: "💯",
    rarity: "uncommon"
  },
  {
    id: "a8",
    title: "Weight Loss Warrior",
    description: "Lose 20 pounds total",
    progress: 12,
    total: 20,
    unlocked: false,
    category: "weight",
    icon: "⚖️",
    rarity: "rare"
  },
  {
    id: "a9",
    title: "Perfect Week",
    description: "Complete all planned workouts for 7 consecutive days",
    progress: 12,
    total: 7,
    unlocked: true,
    unlockedDate: "2025-03-05",
    category: "consistency",
    icon: "📆",
    rarity: "common"
  },
  {
    id: "a10",
    title: "Night Owl",
    description: "Complete 10 workouts after 8 PM",
    progress: 7,
    total: 10,
    unlocked: false,
    category: "habits",
    icon: "🦉",
    rarity: "common"
  }
];

// Community challenges
export const communityChallenges = [
  {
    id: "c1",
    title: "Spring 5K Challenge",
    description: "Train for and complete a 5K run during spring",
    participants: 1245,
    startDate: "2025-03-01",
    endDate: "2025-05-31",
    category: "cardio",
    difficulty: "beginner",
    joined: true,
    progress: 45,
    icon: "🏃",
    milestones: [
      { title: "Sign up for a local 5K race", completed: true },
      { title: "Complete 5 training runs", completed: true },
      { title: "Run 5K distance in training", completed: false },
      { title: "Complete race day", completed: false }
    ]
  },
  {
    id: "c2",
    title: "100 Push-up Challenge",
    description: "Build up to doing 100 push-ups in a single day",
    participants: 3678,
    startDate: "2025-03-15",
    endDate: "2025-04-15",
    category: "strength",
    difficulty: "intermediate",
    joined: true,
    progress: 35,
    icon: "💪",
    milestones: [
      { title: "Complete initial fitness test", completed: true },
      { title: "Reach 50 push-ups in a day", completed: false },
      { title: "Reach 75 push-ups in a day", completed: false },
      { title: "Reach 100 push-ups in a day", completed: false }
    ]
  },
  {
    id: "c3",
    title: "30-Day Meditation Journey",
    description: "Develop a meditation habit in just 30 days",
    participants: 1892,
    startDate: "2025-04-01",
    endDate: "2025-04-30",
    category: "wellness",
    difficulty: "beginner",
    joined: false,
    icon: "🧘‍♂️",
    milestones: [
      { title: "First week: 5 minutes daily", completed: false },
      { title: "Second week: 10 minutes daily", completed: false },
      { title: "Third week: 15 minutes daily", completed: false },
      { title: "Fourth week: 20 minutes daily", completed: false }
    ]
  },
  {
    id: "c4",
    title: "Summer Shred Challenge",
    description: "Intensive 8-week program for definition and fat loss",
    participants: 2560,
    startDate: "2025-05-01",
    endDate: "2025-06-30",
    category: "weight",
    difficulty: "advanced",
    joined: false,
    icon: "🔥",
    milestones: [
      { title: "Take starting measurements", completed: false },
      { title: "Complete 20 HIIT workouts", completed: false },
      { title: "Log all meals for 8 weeks", completed: false },
      { title: "Take final measurements", completed: false }
    ]
  },
  {
    id: "c5",
    title: "Whole Food April",
    description: "Eat only whole, unprocessed foods for the month of April",
    participants: 1472,
    startDate: "2025-04-01",
    endDate: "2025-04-30",
    category: "nutrition",
    difficulty: "intermediate",
    joined: false,
    icon: "🥦",
    milestones: [
      { title: "Clean out pantry", completed: false },
      { title: "Create meal plan", completed: false },
      { title: "Complete first two weeks", completed: false },
      { title: "Complete full month", completed: false }
    ]
  }
];

// Goal categories
export const goalCategories = [
  { id: "cardio", name: "Cardio & Endurance", icon: "🏃", color: "#3B82F6" }, // blue
  { id: "strength", name: "Strength & Power", icon: "💪", color: "#8B5CF6" }, // violet
  { id: "nutrition", name: "Nutrition & Diet", icon: "🥗", color: "#10B981" }, // green
  { id: "weight", name: "Weight Management", icon: "⚖️", color: "#F472B6" }, // pink
  { id: "wellness", name: "Wellness & Mindfulness", icon: "🧘‍♂️", color: "#F59E0B" }, // amber
  { id: "skill", name: "Skill Acquisition", icon: "🎯", color: "#6366F1" }, // indigo
  { id: "habits", name: "Healthy Habits", icon: "⏰", color: "#EC4899" }, // pink
  { id: "consistency", name: "Consistency & Streaks", icon: "📆", color: "#F97316" } // orange
];

// Achievement categories with colors
export const achievementCategories = [
  { id: "cardio", name: "Cardio", icon: "🏃", color: "#3B82F6" },
  { id: "strength", name: "Strength", icon: "🏋️‍♂️", color: "#8B5CF6" },
  { id: "nutrition", name: "Nutrition", icon: "🍎", color: "#10B981" },
  { id: "weight", name: "Weight", icon: "⚖️", color: "#F472B6" },
  { id: "goals", name: "Goals", icon: "🏆", color: "#F59E0B" },
  { id: "consistency", name: "Consistency", icon: "📆", color: "#6366F1" },
  { id: "habits", name: "Habits", icon: "⏰", color: "#EC4899" }
];

// Rarity colors for achievements
export const rarityColors = {
  common: "#6B7280", // gray
  uncommon: "#10B981", // green
  rare: "#3B82F6", // blue
  epic: "#8B5CF6", // violet
  legendary: "#F59E0B" // amber
};

// Goal completion data for charts
export const goalCompletionData = [
  { month: "Jan", completed: 5, inProgress: 2, total: 7 },
  { month: "Feb", completed: 6, inProgress: 3, total: 9 },
  { month: "Mar", completed: 4, inProgress: 4, total: 8 }
];