# FitnessTracker Pro Backend & Admin Portal

A comprehensive backend system for the FitnessTracker Pro application with MongoDB database and admin portal for data management.

## 🚀 Features

### Backend API
- **User Management**: Registration, authentication, profile management
- **Workout Tracking**: Create, update, delete, and track workout sessions
- **Nutrition Logging**: Meal tracking with detailed nutritional information
- **Goal Management**: Set and track fitness goals with progress monitoring
- **Device Integration**: Smart device connection status tracking
- **RESTful API**: Complete CRUD operations for all entities

### Admin Portal
- **Dashboard Analytics**: Real-time statistics and user insights
- **User Management**: View, edit, and manage user accounts
- **Data Monitoring**: Track workouts, nutrition, and goals across all users
- **Advanced Analytics**: Detailed charts and performance metrics
- **Search & Filtering**: Powerful search capabilities across all data
- **Responsive Design**: Modern UI that works on all devices

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn package manager

## 🛠️ Installation

### 1. Clone the Repository
```bash
cd fitcheck/backend
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment
Create a `.env` file in the backend directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/fitness-tracker-pro
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRE=30d
NODE_ENV=development
ADMIN_EMAIL=admin@fitnesstrackerpro.com
ADMIN_PASSWORD=admin123
```

### 4. Start MongoDB
Make sure MongoDB is running on your system:
```bash
# On macOS with Homebrew
brew services start mongodb-community

# On Ubuntu/Debian
sudo systemctl start mongod

# On Windows
net start MongoDB
```

### 5. Start the Server
```bash
# Development mode with auto-restart
npm run dev

# Production mode
npm start
```

The server will start on `http://localhost:5000`

## 🔐 Admin Portal Access

### Default Admin Credentials
- **Email**: admin@fitnesstrackerpro.com
- **Password**: admin123

### Access Admin Portal
1. Open your browser and navigate to `http://localhost:5000/admin`
2. Or open `fitcheck/admin/index.html` directly in your browser
3. Enter the admin credentials to access the dashboard

## 📊 API Endpoints

### Authentication
- `POST /api/users/register` - Register new user
- `POST /api/users/login` - User login
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile

### Workouts
- `GET /api/workouts` - Get user workouts
- `POST /api/workouts` - Create new workout
- `PUT /api/workouts/:id` - Update workout
- `DELETE /api/workouts/:id` - Delete workout

### Nutrition
- `GET /api/nutrition` - Get user meals
- `POST /api/nutrition` - Log new meal
- `PUT /api/nutrition/:id` - Update meal
- `DELETE /api/nutrition/:id` - Delete meal

### Goals
- `GET /api/goals` - Get user goals
- `POST /api/goals` - Create new goal
- `PUT /api/goals/:id` - Update goal
- `DELETE /api/goals/:id` - Delete goal
- `POST /api/goals/:id/progress` - Update goal progress

### Admin (Protected)
- `GET /api/admin/dashboard` - Dashboard statistics
- `GET /api/admin/users` - Get all users
- `GET /api/admin/workouts` - Get all workouts
- `GET /api/admin/nutrition` - Get all nutrition data
- `GET /api/admin/goals` - Get all goals
- `GET /api/admin/analytics` - Detailed analytics

## 🗄️ Database Schema

### User Model
```javascript
{
  firstName: String,
  lastName: String,
  email: String (unique),
  password: String (hashed),
  fitnessGoal: String,
  experienceLevel: String,
  profile: {
    age: Number,
    weight: Number,
    height: Number,
    gender: String
  },
  connectedDevice: {
    name: String,
    type: String,
    battery: Number,
    signal: String,
    lastConnected: Date
  },
  preferences: {
    theme: String,
    notifications: Boolean,
    units: String
  },
  isAdmin: Boolean,
  isActive: Boolean
}
```

### Workout Model
```javascript
{
  user: ObjectId,
  name: String,
  type: String,
  exercises: [{
    name: String,
    sets: [{
      reps: Number,
      weight: Number,
      duration: Number,
      distance: Number,
      completed: Boolean
    }]
  }],
  duration: Number,
  caloriesBurned: Number,
  intensity: String,
  status: String,
  scheduledDate: Date,
  completedDate: Date
}
```

### Nutrition Model
```javascript
{
  user: ObjectId,
  name: String,
  type: String,
  foods: [{
    name: String,
    quantity: Number,
    unit: String,
    calories: Number,
    protein: Number,
    carbs: Number,
    fat: Number
  }],
  date: Date,
  time: String
}
```

### Goal Model
```javascript
{
  user: ObjectId,
  title: String,
  description: String,
  type: String,
  target: Number,
  current: Number,
  unit: String,
  startDate: Date,
  targetDate: Date,
  status: String,
  progress: [{
    date: Date,
    value: Number,
    notes: String
  }]
}
```

## 🔧 Configuration

### Environment Variables
- `PORT`: Server port (default: 5000)
- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT tokens
- `JWT_EXPIRE`: JWT token expiration time
- `NODE_ENV`: Environment (development/production)
- `ADMIN_EMAIL`: Admin portal email
- `ADMIN_PASSWORD`: Admin portal password

### Security Features
- Password hashing with bcrypt
- JWT token authentication
- Rate limiting
- Input validation
- CORS protection
- Helmet security headers

## 📈 Admin Portal Features

### Dashboard
- Total users, workouts, meals, and goals
- User growth chart (last 30 days)
- Fitness goals distribution
- Experience level distribution

### User Management
- Search users by name, email, or ID
- Filter by fitness goal and experience level
- View user details and recent activity
- Edit user profiles and status
- Delete users and associated data

### Data Monitoring
- View all workouts with filtering
- Monitor nutrition logs
- Track goal progress
- Export data capabilities

### Analytics
- Workout type distribution
- Nutrition analytics
- Goal completion rates
- User engagement metrics

## 🚀 Deployment

### Production Setup
1. Set `NODE_ENV=production`
2. Use a strong JWT_SECRET
3. Configure MongoDB Atlas or production MongoDB
4. Set up proper CORS origins
5. Use environment variables for sensitive data

### Docker Deployment
```dockerfile
FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
```

## 🔍 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Ensure MongoDB is running
   - Check connection string in config.env
   - Verify network connectivity

2. **Admin Login Fails**
   - Check admin credentials in config.env
   - Ensure server is running
   - Clear browser cache and localStorage

3. **CORS Errors**
   - Configure CORS origins for your frontend
   - Check browser console for specific errors

4. **Port Already in Use**
   - Change PORT in config.env
   - Kill existing process on port 5000

### Logs
Check server logs for detailed error information:
```bash
npm run dev
```

## 📝 API Documentation

For detailed API documentation, visit:
- Swagger UI: `http://localhost:5000/api-docs` (if implemented)
- Postman Collection: Available in `/docs` folder

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the troubleshooting section
- Review the API documentation

---

**Happy Coding! 💪** 