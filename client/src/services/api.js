const API_BASE_URL = '/api';

async function fetchAPI(endpoint, options = {}) {
  const token = localStorage.getItem('fitforge_token');
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {})
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'API request failed');
  }

  return data;
}

export const authAPI = {
  login: (credentials) => fetchAPI('/auth/login', { method: 'POST', body: JSON.stringify(credentials) }),
  googleLogin: () => fetchAPI('/auth/google', { method: 'POST' }),
  register: (userData) => fetchAPI('/auth/register', { method: 'POST', body: JSON.stringify(userData) }),
  getMe: () => fetchAPI('/auth/me'),
  updateProfile: (data) => fetchAPI('/auth/profile', { method: 'PUT', body: JSON.stringify(data) })
};

export const fitnessAPI = {
  saveOnboarding: (data) => fetchAPI('/fitness/onboarding', { method: 'POST', body: JSON.stringify(data) }),
  recalculate: (data) => fetchAPI('/fitness/recalculate', { method: 'POST', body: JSON.stringify(data) }),
  getPlan: () => fetchAPI('/fitness/plan')
};

export const workoutAPI = {
  getWorkouts: () => fetchAPI('/workouts'),
  toggleExercise: (data) => fetchAPI('/workouts/exercise-toggle', { method: 'PUT', body: JSON.stringify(data) }),
  logSet: (data) => fetchAPI('/workouts/log-set', { method: 'POST', body: JSON.stringify(data) }),
  completeWorkout: (data) => fetchAPI('/workouts/complete', { method: 'POST', body: JSON.stringify(data) })
};

export const nutritionAPI = {
  getNutrition: (date) => fetchAPI(`/nutrition${date ? `?date=${date}` : ''}`),
  toggleMealItem: (data) => fetchAPI('/nutrition/toggle-item', { method: 'PUT', body: JSON.stringify(data) }),
  searchFood: (q) => fetchAPI(`/nutrition/search-food?q=${encodeURIComponent(q)}`),
  getReplacements: (name) => fetchAPI(`/nutrition/replacements?name=${encodeURIComponent(name)}`),
  replaceFood: (data) => fetchAPI('/nutrition/replace-food', { method: 'POST', body: JSON.stringify(data) }),
  addFood: (data) => fetchAPI('/nutrition/add-food', { method: 'POST', body: JSON.stringify(data) }),
  logWater: (data) => fetchAPI('/nutrition/water', { method: 'POST', body: JSON.stringify(data) })
};

export const progressAPI = {
  getWeightLogs: () => fetchAPI('/progress/weight'),
  logWeight: (data) => fetchAPI('/progress/weight', { method: 'POST', body: JSON.stringify(data) }),
  getMeasurements: () => fetchAPI('/progress/measurements'),
  logMeasurement: (data) => fetchAPI('/progress/measurements', { method: 'POST', body: JSON.stringify(data) })
};

export const checkinAPI = {
  getToday: () => fetchAPI('/checkin/today'),
  submitCheckin: (data) => fetchAPI('/checkin', { method: 'POST', body: JSON.stringify(data) })
};

export const aiAPI = {
  askCoach: (prompt) => fetchAPI('/ai/coach', { method: 'POST', body: JSON.stringify({ prompt }) }),
  getWeeklyReport: () => fetchAPI('/ai/weekly-report')
};

export const notificationAPI = {
  getNotifications: () => fetchAPI('/notifications'),
  markRead: (id) => fetchAPI(`/notifications/${id}/read`, { method: 'PUT' })
};

export const achievementAPI = {
  getAchievements: () => fetchAPI('/achievements')
};

export const supplementAPI = {
  recommend: (data) => fetchAPI('/supplements/recommend', { method: 'POST', body: JSON.stringify(data) }),
  getCatalog: () => fetchAPI('/supplements/catalog')
};

export const gymAPI = {
  getNearbyGyms: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return fetchAPI(`/gyms/nearby${query ? `?${query}` : ''}`);
  }
};
