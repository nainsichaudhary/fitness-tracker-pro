// Admin Portal JavaScript
const API_BASE_URL = 'http://localhost:5000/api';
let currentSection = 'dashboard';
let currentPage = 1;
let adminCredentials = {};

// Initialize admin portal
document.addEventListener('DOMContentLoaded', function() {
    setupEventListeners();
    checkAuth();
});

function setupEventListeners() {
    // Login form
    document.getElementById('loginForm').addEventListener('submit', handleLogin);
    
    // Search inputs
    document.getElementById('userSearch').addEventListener('input', debounce(loadUsers, 500));
    document.getElementById('workoutType').addEventListener('change', loadWorkouts);
    document.getElementById('mealType').addEventListener('change', loadNutrition);
    document.getElementById('goalType').addEventListener('change', loadGoals);
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function checkAuth() {
    const savedCredentials = localStorage.getItem('adminCredentials');
    if (savedCredentials) {
        adminCredentials = JSON.parse(savedCredentials);
        login();
    }
}

async function handleLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById('adminEmail').value;
    const password = document.getElementById('adminPassword').value;
    
    adminCredentials = { email, password };
    
    try {
        const response = await fetch(`${API_BASE_URL}/admin/dashboard`, {
            headers: {
                'admin-email': email,
                'admin-password': password
            }
        });
        
        if (response.ok) {
            localStorage.setItem('adminCredentials', JSON.stringify(adminCredentials));
            login();
        } else {
            alert('Invalid admin credentials');
        }
    } catch (error) {
        console.error('Login error:', error);
        alert('Login failed. Please check your credentials and try again.');
    }
}

function login() {
    document.getElementById('loginModal').classList.add('hidden');
    document.getElementById('adminInterface').classList.remove('hidden');
    loadDashboard();
}

function logout() {
    localStorage.removeItem('adminCredentials');
    adminCredentials = {};
    document.getElementById('loginModal').classList.remove('hidden');
    document.getElementById('adminInterface').classList.add('hidden');
}

function showSection(section) {
    // Hide all sections
    document.querySelectorAll('.section').forEach(s => s.classList.add('hidden'));
    
    // Show selected section
    document.getElementById(section + 'Section').classList.remove('hidden');
    
    // Update navigation
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('bg-gray-700', 'text-white');
        item.classList.add('text-gray-300');
    });
    
    event.target.classList.remove('text-gray-300');
    event.target.classList.add('bg-gray-700', 'text-white');
    
    currentSection = section;
    
    // Load section data
    switch(section) {
        case 'dashboard':
            loadDashboard();
            break;
        case 'users':
            loadUsers();
            break;
        case 'workouts':
            loadWorkouts();
            break;
        case 'nutrition':
            loadNutrition();
            break;
        case 'goals':
            loadGoals();
            break;
        case 'analytics':
            loadAnalytics();
            break;
    }
}

async function loadDashboard() {
    try {
        const response = await fetch(`${API_BASE_URL}/admin/dashboard`, {
            headers: {
                'admin-email': adminCredentials.email,
                'admin-password': adminCredentials.password
            }
        });
        
        if (response.ok) {
            const data = await response.json();
            updateDashboardStats(data.data.overview);
            createCharts(data.data.charts);
        }
    } catch (error) {
        console.error('Dashboard load error:', error);
    }
}

function updateDashboardStats(stats) {
    document.getElementById('totalUsers').textContent = stats.totalUsers;
    document.getElementById('totalWorkouts').textContent = stats.totalWorkouts;
    document.getElementById('totalMeals').textContent = stats.totalMeals;
    document.getElementById('totalGoals').textContent = stats.totalGoals;
}

function createCharts(chartData) {
    // User Growth Chart
    const userGrowthCtx = document.getElementById('userGrowthChart').getContext('2d');
    new Chart(userGrowthCtx, {
        type: 'line',
        data: {
            labels: chartData.userGrowth.map(item => item._id),
            datasets: [{
                label: 'New Users',
                data: chartData.userGrowth.map(item => item.count),
                borderColor: '#3b82f6',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: {
                        color: '#ffffff'
                    }
                }
            },
            scales: {
                y: {
                    ticks: {
                        color: '#9ca3af'
                    },
                    grid: {
                        color: '#374151'
                    }
                },
                x: {
                    ticks: {
                        color: '#9ca3af'
                    },
                    grid: {
                        color: '#374151'
                    }
                }
            }
        }
    });

    // Goals Distribution Chart
    const goalsCtx = document.getElementById('goalsChart').getContext('2d');
    new Chart(goalsCtx, {
        type: 'doughnut',
        data: {
            labels: chartData.goalDistribution.map(item => item._id),
            datasets: [{
                data: chartData.goalDistribution.map(item => item.count),
                backgroundColor: [
                    '#3b82f6',
                    '#10b981',
                    '#f59e0b',
                    '#ef4444',
                    '#8b5cf6'
                ]
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        color: '#ffffff'
                    }
                }
            }
        }
    });
}

async function loadUsers() {
    try {
        const search = document.getElementById('userSearch').value;
        const fitnessGoal = document.getElementById('userFitnessGoal').value;
        const experienceLevel = document.getElementById('userExperience').value;
        
        const params = new URLSearchParams({
            page: currentPage,
            limit: 10
        });
        
        if (search) params.append('search', search);
        if (fitnessGoal) params.append('fitnessGoal', fitnessGoal);
        if (experienceLevel) params.append('experienceLevel', experienceLevel);
        
        const response = await fetch(`${API_BASE_URL}/admin/users?${params}`, {
            headers: {
                'admin-email': adminCredentials.email,
                'admin-password': adminCredentials.password
            }
        });
        
        if (response.ok) {
            const data = await response.json();
            displayUsers(data.data.users, data.data.pagination);
        }
    } catch (error) {
        console.error('Users load error:', error);
    }
}

function displayUsers(users, pagination) {
    const tbody = document.getElementById('usersTableBody');
    tbody.innerHTML = '';
    
    users.forEach(user => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                    <div class="flex-shrink-0 h-10 w-10">
                        <div class="h-10 w-10 rounded-full bg-gray-700 flex items-center justify-center">
                            <span class="text-sm font-medium text-white">${user.firstName.charAt(0)}${user.lastName.charAt(0)}</span>
                        </div>
                    </div>
                    <div class="ml-4">
                        <div class="text-sm font-medium text-white">${user.firstName} ${user.lastName}</div>
                        <div class="text-sm text-gray-400">${user.email}</div>
                    </div>
                </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
                <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                    ${user.fitnessGoal}
                </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                ${user.experienceLevel}
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
                <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}">
                    ${user.isActive ? 'Active' : 'Inactive'}
                </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                ${new Date(user.createdAt).toLocaleDateString()}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button onclick="viewUser('${user._id}')" class="text-blue-400 hover:text-blue-300 mr-3">View</button>
                <button onclick="editUser('${user._id}')" class="text-green-400 hover:text-green-300 mr-3">Edit</button>
                <button onclick="deleteUser('${user._id}')" class="text-red-400 hover:text-red-300">Delete</button>
            </td>
        `;
        tbody.appendChild(row);
    });
    
    updatePagination(pagination, 'users');
}

async function loadWorkouts() {
    try {
        const type = document.getElementById('workoutType').value;
        const status = document.getElementById('workoutStatus').value;
        const userId = document.getElementById('workoutUser').value;
        
        const params = new URLSearchParams({
            page: currentPage,
            limit: 10
        });
        
        if (type) params.append('type', type);
        if (status) params.append('status', status);
        if (userId) params.append('userId', userId);
        
        const response = await fetch(`${API_BASE_URL}/admin/workouts?${params}`, {
            headers: {
                'admin-email': adminCredentials.email,
                'admin-password': adminCredentials.password
            }
        });
        
        if (response.ok) {
            const data = await response.json();
            displayWorkouts(data.data.workouts);
        }
    } catch (error) {
        console.error('Workouts load error:', error);
    }
}

function displayWorkouts(workouts) {
    const tbody = document.getElementById('workoutsTableBody');
    tbody.innerHTML = '';
    
    workouts.forEach(workout => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-white">${workout.name}</div>
                <div class="text-sm text-gray-400">${workout.exercises.length} exercises</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                ${workout.user ? `${workout.user.firstName} ${workout.user.lastName}` : 'N/A'}
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
                <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-100 text-purple-800">
                    ${workout.type}
                </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
                <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(workout.status)}">
                    ${workout.status}
                </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                ${workout.duration} min
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                ${new Date(workout.scheduledDate).toLocaleDateString()}
            </td>
        `;
        tbody.appendChild(row);
    });
}

async function loadNutrition() {
    try {
        const type = document.getElementById('mealType').value;
        const userId = document.getElementById('mealUser').value;
        
        const params = new URLSearchParams({
            page: currentPage,
            limit: 10
        });
        
        if (type) params.append('type', type);
        if (userId) params.append('userId', userId);
        
        const response = await fetch(`${API_BASE_URL}/admin/nutrition?${params}`, {
            headers: {
                'admin-email': adminCredentials.email,
                'admin-password': adminCredentials.password
            }
        });
        
        if (response.ok) {
            const data = await response.json();
            displayNutrition(data.data.meals);
        }
    } catch (error) {
        console.error('Nutrition load error:', error);
    }
}

function displayNutrition(meals) {
    const tbody = document.getElementById('nutritionTableBody');
    tbody.innerHTML = '';
    
    meals.forEach(meal => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-white">${meal.name}</div>
                <div class="text-sm text-gray-400">${meal.foods.length} items</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                ${meal.user ? `${meal.user.firstName} ${meal.user.lastName}` : 'N/A'}
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
                <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                    ${meal.type}
                </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                ${meal.totalCalories} cal
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                ${meal.totalProtein}g
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                ${new Date(meal.date).toLocaleDateString()}
            </td>
        `;
        tbody.appendChild(row);
    });
}

async function loadGoals() {
    try {
        const type = document.getElementById('goalType').value;
        const status = document.getElementById('goalStatus').value;
        const userId = document.getElementById('goalUser').value;
        
        const params = new URLSearchParams({
            page: currentPage,
            limit: 10
        });
        
        if (type) params.append('type', type);
        if (status) params.append('status', status);
        if (userId) params.append('userId', userId);
        
        const response = await fetch(`${API_BASE_URL}/admin/goals?${params}`, {
            headers: {
                'admin-email': adminCredentials.email,
                'admin-password': adminCredentials.password
            }
        });
        
        if (response.ok) {
            const data = await response.json();
            displayGoals(data.data.goals);
        }
    } catch (error) {
        console.error('Goals load error:', error);
    }
}

function displayGoals(goals) {
    const tbody = document.getElementById('goalsTableBody');
    tbody.innerHTML = '';
    
    goals.forEach(goal => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-white">${goal.title}</div>
                <div class="text-sm text-gray-400">${goal.description || 'No description'}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                ${goal.user ? `${goal.user.firstName} ${goal.user.lastName}` : 'N/A'}
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
                <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-indigo-100 text-indigo-800">
                    ${goal.type}
                </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                    <div class="w-16 bg-gray-700 rounded-full h-2 mr-2">
                        <div class="bg-blue-600 h-2 rounded-full" style="width: ${goal.progressPercentage}%"></div>
                    </div>
                    <span class="text-sm text-gray-300">${goal.progressPercentage}%</span>
                </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
                <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getGoalStatusColor(goal.status)}">
                    ${goal.status}
                </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                ${new Date(goal.targetDate).toLocaleDateString()}
            </td>
        `;
        tbody.appendChild(row);
    });
}

async function loadAnalytics() {
    try {
        const response = await fetch(`${API_BASE_URL}/admin/analytics?period=30`, {
            headers: {
                'admin-email': adminCredentials.email,
                'admin-password': adminCredentials.password
            }
        });
        
        if (response.ok) {
            const data = await response.json();
            createAnalyticsCharts(data.data);
        }
    } catch (error) {
        console.error('Analytics load error:', error);
    }
}

function createAnalyticsCharts(analyticsData) {
    // Workout Analytics Chart
    const workoutCtx = document.getElementById('workoutAnalyticsChart').getContext('2d');
    new Chart(workoutCtx, {
        type: 'bar',
        data: {
            labels: analyticsData.workoutAnalytics.map(item => item._id),
            datasets: [{
                label: 'Workouts',
                data: analyticsData.workoutAnalytics.map(item => item.count),
                backgroundColor: [
                    '#3b82f6',
                    '#10b981',
                    '#f59e0b',
                    '#ef4444',
                    '#8b5cf6',
                    '#06b6d4'
                ]
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: {
                        color: '#ffffff'
                    }
                }
            },
            scales: {
                y: {
                    ticks: {
                        color: '#9ca3af'
                    },
                    grid: {
                        color: '#374151'
                    }
                },
                x: {
                    ticks: {
                        color: '#9ca3af'
                    },
                    grid: {
                        color: '#374151'
                    }
                }
            }
        }
    });

    // Nutrition Analytics Chart
    const nutritionCtx = document.getElementById('nutritionAnalyticsChart').getContext('2d');
    new Chart(nutritionCtx, {
        type: 'doughnut',
        data: {
            labels: analyticsData.nutritionAnalytics.map(item => item._id),
            datasets: [{
                data: analyticsData.nutritionAnalytics.map(item => item.count),
                backgroundColor: [
                    '#f59e0b',
                    '#10b981',
                    '#3b82f6',
                    '#ef4444',
                    '#8b5cf6',
                    '#06b6d4'
                ]
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        color: '#ffffff'
                    }
                }
            }
        }
    });
}

function getStatusColor(status) {
    switch(status) {
        case 'completed': return 'bg-green-100 text-green-800';
        case 'in-progress': return 'bg-blue-100 text-blue-800';
        case 'planned': return 'bg-yellow-100 text-yellow-800';
        case 'cancelled': return 'bg-red-100 text-red-800';
        default: return 'bg-gray-100 text-gray-800';
    }
}

function getGoalStatusColor(status) {
    switch(status) {
        case 'active': return 'bg-green-100 text-green-800';
        case 'completed': return 'bg-blue-100 text-blue-800';
        case 'paused': return 'bg-yellow-100 text-yellow-800';
        case 'cancelled': return 'bg-red-100 text-red-800';
        default: return 'bg-gray-100 text-gray-800';
    }
}

function updatePagination(pagination, type) {
    document.getElementById(`${type}Showing`).textContent = pagination.totalRecords;
    document.getElementById(`${type}Total`).textContent = pagination.totalRecords;
    document.getElementById(`${type}CurrentPage`).textContent = pagination.current;
}

function previousUsersPage() {
    if (currentPage > 1) {
        currentPage--;
        loadUsers();
    }
}

function nextUsersPage() {
    currentPage++;
    loadUsers();
}

// User management functions
function viewUser(userId) {
    // Implement user detail view
    alert(`View user ${userId}`);
}

function editUser(userId) {
    // Implement user edit
    alert(`Edit user ${userId}`);
}

async function deleteUser(userId) {
    if (confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
        try {
            const response = await fetch(`${API_BASE_URL}/admin/users/${userId}`, {
                method: 'DELETE',
                headers: {
                    'admin-email': adminCredentials.email,
                    'admin-password': adminCredentials.password
                }
            });
            
            if (response.ok) {
                alert('User deleted successfully');
                loadUsers();
            } else {
                alert('Failed to delete user');
            }
        } catch (error) {
            console.error('Delete user error:', error);
            alert('Error deleting user');
        }
    }
} 