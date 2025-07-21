// nutritionData.js - Mock data for the nutrition tab

// Today's meals
export const todaysMeals = [
    {
      id: 1,
      meal: 'Breakfast',
      time: '07:30',
      foods: [
        { name: 'Oatmeal with Berries', portion: '1 bowl', calories: 220, protein: 8, carbs: 38, fat: 5, icon: '🥣' },
        { name: 'Greek Yogurt', portion: '100g', calories: 100, protein: 18, carbs: 4, fat: 2, icon: '🥛' },
        { name: 'Honey', portion: '1 tbsp', calories: 65, protein: 0, carbs: 17, fat: 0, icon: '🍯' }
      ],
      totalCalories: 385,
      totalProtein: 26,
      totalCarbs: 59,
      totalFat: 7,
      completed: true
    },
    {
      id: 2,
      meal: 'Lunch',
      time: '12:15',
      foods: [
        { name: 'Grilled Chicken Salad', portion: '1 plate', calories: 320, protein: 35, carbs: 12, fat: 15, icon: '🥗' },
        { name: 'Whole Grain Bread', portion: '1 slice', calories: 80, protein: 3, carbs: 15, fat: 1, icon: '🍞' },
        { name: 'Olive Oil Dressing', portion: '1 tbsp', calories: 120, protein: 0, carbs: 0, fat: 14, icon: '🫒' }
      ],
      totalCalories: 520,
      totalProtein: 38,
      totalCarbs: 27,
      totalFat: 30,
      completed: true
    },
    {
      id: 3,
      meal: 'Snack',
      time: '15:30',
      foods: [
        { name: 'Apple', portion: '1 medium', calories: 95, protein: 0.5, carbs: 25, fat: 0.3, icon: '🍎' },
        { name: 'Almonds', portion: '30g', calories: 170, protein: 6, carbs: 7, fat: 15, icon: '🥜' }
      ],
      totalCalories: 265,
      totalProtein: 6.5,
      totalCarbs: 32,
      totalFat: 15.3,
      completed: true
    },
    {
      id: 4,
      meal: 'Dinner',
      time: '19:00',
      foods: [
        { name: 'Salmon Fillet', portion: '150g', calories: 280, protein: 39, carbs: 0, fat: 13, icon: '🐟' },
        { name: 'Sweet Potato', portion: '1 medium', calories: 115, protein: 2, carbs: 27, fat: 0, icon: '🍠' },
        { name: 'Steamed Broccoli', portion: '100g', calories: 55, protein: 3.7, carbs: 11, fat: 0.6, icon: '🥦' },
        { name: 'Quinoa', portion: '100g cooked', calories: 120, protein: 4, carbs: 21, fat: 2, icon: '🍚' }
      ],
      totalCalories: 570,
      totalProtein: 48.7,
      totalCarbs: 59,
      totalFat: 15.6,
      completed: false
    }
  ];
  
  // Meal history for the past 7 days
  export const mealHistory = [
    {
      date: '2025-03-27',
      totalCalories: 1850,
      totalProtein: 125,
      totalCarbs: 190,
      totalFat: 65,
      waterIntake: 2.6,
      mealCompletionRate: 100
    },
    {
      date: '2025-03-26',
      totalCalories: 1780,
      totalProtein: 115,
      totalCarbs: 200,
      totalFat: 60,
      waterIntake: 2.2,
      mealCompletionRate: 100
    },
    {
      date: '2025-03-25',
      totalCalories: 2050,
      totalProtein: 130,
      totalCarbs: 220,
      totalFat: 70,
      waterIntake: 2.8,
      mealCompletionRate: 100
    },
    {
      date: '2025-03-24',
      totalCalories: 1920,
      totalProtein: 120,
      totalCarbs: 210,
      totalFat: 65,
      waterIntake: 2.5,
      mealCompletionRate: 75
    },
    {
      date: '2025-03-23',
      totalCalories: 1650,
      totalProtein: 100,
      totalCarbs: 180,
      totalFat: 55,
      waterIntake: 2.0,
      mealCompletionRate: 75
    },
    {
      date: '2025-03-22',
      totalCalories: 2100,
      totalProtein: 135,
      totalCarbs: 230,
      totalFat: 75,
      waterIntake: 3.0,
      mealCompletionRate: 100
    },
    {
      date: '2025-03-21',
      totalCalories: 1890,
      totalProtein: 125,
      totalCarbs: 200,
      totalFat: 65,
      waterIntake: 2.4,
      mealCompletionRate: 100
    }
  ];
  
  // Nutrition targets
  export const nutritionTargets = {
    calories: {
      daily: 2000,
      current: 1740
    },
    macros: {
      protein: {
        target: 140,
        current: 119.2,
        unit: 'g'
      },
      carbs: {
        target: 250,
        current: 177,
        unit: 'g'
      },
      fat: {
        target: 67,
        current: 67.9,
        unit: 'g'
      }
    },
    water: {
      target: 3.0,
      current: 1.8,
      unit: 'L'
    }
  };
  
  // Meal recommendations
  export const mealRecommendations = [
    {
      id: 1,
      title: 'High-Protein Breakfast',
      calories: 420,
      protein: 35,
      carbs: 30,
      fat: 15,
      tags: ['breakfast', 'high-protein', 'quick'],
      image: '🍳',
      description: 'Protein-packed breakfast to kickstart your day',
      ingredients: ['Eggs', 'Turkey Bacon', 'Avocado', 'Whole Grain Toast'],
      preparationTime: 15
    },
    {
      id: 2,
      title: 'Post-Workout Smoothie',
      calories: 310,
      protein: 28,
      carbs: 45,
      fat: 5,
      tags: ['post-workout', 'recovery', 'quick'],
      image: '🥤',
      description: 'Nutrient-rich smoothie for muscle recovery',
      ingredients: ['Banana', 'Whey Protein', 'Almond Milk', 'Spinach', 'Berries'],
      preparationTime: 5
    },
    {
      id: 3,
      title: 'Mediterranean Lunch Bowl',
      calories: 450,
      protein: 25,
      carbs: 40,
      fat: 22,
      tags: ['lunch', 'balanced', 'vegetarian'],
      image: '🥙',
      description: 'Balanced Mediterranean-inspired lunch bowl',
      ingredients: ['Quinoa', 'Chickpeas', 'Feta Cheese', 'Cucumber', 'Tomatoes', 'Olive Oil'],
      preparationTime: 20
    },
    {
      id: 4,
      title: 'Lean Protein Dinner',
      calories: 480,
      protein: 42,
      carbs: 35,
      fat: 14,
      tags: ['dinner', 'high-protein', 'low-fat'],
      image: '🍗',
      description: 'High-protein dinner for muscle maintenance',
      ingredients: ['Chicken Breast', 'Sweet Potato', 'Asparagus', 'Quinoa'],
      preparationTime: 25
    },
    {
      id: 5,
      title: 'Healthy Evening Snack',
      calories: 200,
      protein: 10,
      carbs: 15,
      fat: 12,
      tags: ['snack', 'satisfying', 'quick'],
      image: '🥜',
      description: 'Satisfying snack that won\'t disrupt sleep',
      ingredients: ['Greek Yogurt', 'Almonds', 'Honey', 'Cinnamon'],
      preparationTime: 3
    }
  ];
  
  // Recipe catalog
  export const recipeCatalog = [
    {
      id: 101,
      title: 'Protein Pancakes',
      category: 'breakfast',
      calories: 350,
      protein: 25,
      carbs: 30,
      fat: 12,
      preparationTime: 20,
      difficulty: 'Easy',
      favorite: true,
      image: '🥞',
      ingredients: [
        '2 scoops protein powder',
        '1 banana',
        '2 eggs',
        '1/4 cup oats',
        '1 tsp baking powder',
        'Cinnamon to taste'
      ],
      instructions: [
        'Blend all ingredients until smooth',
        'Heat non-stick pan over medium heat',
        'Pour small amounts of batter to form pancakes',
        'Cook until bubbles form, then flip',
        'Cook until golden brown on both sides'
      ]
    },
    {
      id: 102,
      title: 'Greek Salmon Bowl',
      category: 'lunch',
      calories: 480,
      protein: 38,
      carbs: 35,
      fat: 20,
      preparationTime: 25,
      difficulty: 'Medium',
      favorite: true,
      image: '🐟',
      ingredients: [
        '150g salmon fillet',
        '1/2 cup cooked quinoa',
        '1 cup mixed greens',
        'Cherry tomatoes',
        'Cucumber',
        'Feta cheese',
        'Lemon juice',
        'Olive oil'
      ],
      instructions: [
        'Season salmon with salt, pepper, and herbs',
        'Grill or bake salmon until cooked through',
        'Place quinoa in bowl and top with mixed greens',
        'Add vegetables and feta cheese',
        'Place salmon on top',
        'Drizzle with olive oil and lemon juice'
      ]
    },
    {
      id: 103,
      title: 'Protein Energy Balls',
      category: 'snack',
      calories: 120,
      protein: 6,
      carbs: 15,
      fat: 5,
      preparationTime: 15,
      difficulty: 'Easy',
      favorite: false,
      image: '🍪',
      ingredients: [
        '1 cup oats',
        '1/2 cup nut butter',
        '1/3 cup honey',
        '1/4 cup protein powder',
        '1/4 cup dark chocolate chips',
        '1 tbsp chia seeds'
      ],
      instructions: [
        'Mix all ingredients in a large bowl',
        'Chill mixture for 30 minutes',
        'Roll into small balls',
        'Store in refrigerator for up to a week'
      ]
    },
    {
      id: 104,
      title: 'Chicken Stir-Fry',
      category: 'dinner',
      calories: 410,
      protein: 35,
      carbs: 30,
      fat: 15,
      preparationTime: 30,
      difficulty: 'Medium',
      favorite: false,
      image: '🥘',
      ingredients: [
        '200g chicken breast',
        'Broccoli',
        'Bell peppers',
        'Carrots',
        'Snow peas',
        'Garlic',
        'Ginger',
        'Soy sauce',
        'Brown rice'
      ],
      instructions: [
        'Cut chicken into thin strips',
        'Chop all vegetables',
        'Heat oil in wok or large pan',
        'Cook chicken until no longer pink',
        'Add vegetables and stir-fry until tender-crisp',
        'Add minced garlic and ginger',
        'Pour in soy sauce and other seasonings',
        'Serve over brown rice'
      ]
    },
    {
      id: 105,
      title: 'Avocado Toast with Egg',
      category: 'breakfast',
      calories: 320,
      protein: 15,
      carbs: 25,
      fat: 18,
      preparationTime: 10,
      difficulty: 'Easy',
      favorite: true,
      image: '🥑',
      ingredients: [
        '1 slice whole grain bread',
        '1/2 avocado',
        '1 egg',
        'Salt and pepper',
        'Red pepper flakes (optional)',
        'Lemon juice'
      ],
      instructions: [
        'Toast bread until golden brown',
        'Mash avocado and spread on toast',
        'Cook egg as desired (fried or poached recommended)',
        'Place egg on top of avocado',
        'Season with salt, pepper, and red pepper flakes',
        'Drizzle with lemon juice'
      ]
    }
  ];
  
  // Nutrition insights
  export const nutritionInsights = [
    {
      id: 1,
      title: 'Protein Intake Trending Up',
      description: 'Your protein intake has increased by 15% over the past 2 weeks, supporting your muscle building goals.',
      actionable: 'Continue focusing on lean protein sources with each meal.',
      trend: 'up',
      metric: 'protein',
      value: 15
    },
    {
      id: 2,
      title: 'Sugar Consumption Higher',
      description: 'Your sugar intake has exceeded recommended levels on 4 of the last 7 days.',
      actionable: 'Try replacing sugary snacks with fruit or protein-rich alternatives.',
      trend: 'down',
      metric: 'sugar',
      value: -20
    },
    {
      id: 3,
      title: 'Meal Timing Consistent',
      description: 'You\'ve been consistent with your meal timing, which can help stabilize energy levels throughout the day.',
      actionable: 'Maintain your regular eating schedule for optimal metabolism.',
      trend: 'neutral',
      metric: 'consistency',
      value: 0
    },
    {
      id: 4,
      title: 'Hydration Needs Attention',
      description: 'Your water intake has been below target for 5 consecutive days.',
      actionable: 'Try setting reminders or using a marked water bottle to track intake.',
      trend: 'down',
      metric: 'water',
      value: -25
    }
  ];
  
  // Nutritional progress chart data
  export const nutritionChartData = [
    { day: 'Mon', calories: 1850, protein: 125, carbs: 190, fat: 65 },
    { day: 'Tue', calories: 1780, protein: 115, carbs: 200, fat: 60 },
    { day: 'Wed', calories: 2050, protein: 130, carbs: 220, fat: 70 },
    { day: 'Thu', calories: 1920, protein: 120, carbs: 210, fat: 65 },
    { day: 'Fri', calories: 1650, protein: 100, carbs: 180, fat: 55 },
    { day: 'Sat', calories: 2100, protein: 135, carbs: 230, fat: 75 },
    { day: 'Sun', calories: 1890, protein: 125, carbs: 200, fat: 65 }
  ];
  
  // Water tracking data
  export const waterTrackingData = {
    target: 3.0, // liters
    current: 1.8,
    history: [
      { time: '07:30', amount: 0.4 },
      { time: '09:45', amount: 0.3 },
      { time: '12:20', amount: 0.5 },
      { time: '15:00', amount: 0.3 },
      { time: '17:30', amount: 0.3 }
    ],
    reminder: {
      enabled: true,
      interval: 2, // hours
      startTime: '07:00',
      endTime: '21:00'
    }
  };
  
  // Calorie and macronutrient goals
  export const nutritionGoals = {
    calories: {
      value: 2000,
      type: 'maintenance' // options: deficit, maintenance, surplus
    },
    macroDistribution: {
      protein: 30, // percentage
      carbs: 45, // percentage
      fat: 25 // percentage
    },
    micronutrientFocus: [
      { name: 'Vitamin D', status: 'low', sources: ['Fatty fish', 'Egg yolks', 'Fortified milk'] },
      { name: 'Iron', status: 'adequate', sources: ['Red meat', 'Spinach', 'Legumes'] },
      { name: 'Calcium', status: 'adequate', sources: ['Dairy products', 'Leafy greens', 'Fortified foods'] },
      { name: 'Omega-3', status: 'low', sources: ['Fatty fish', 'Walnuts', 'Flaxseeds'] }
    ]
  };