# 🏋️ RepForge — Intelligent Personalized Fitness & Powerlifting SaaS Platform

RepForge is a modern full-stack MERN (MongoDB, Express.js, React.js, Node.js) web application designed as an AI-powered personalized fitness planner. It computes body metrics (BMI, BMR, TDEE, Calories, Macros, Hydration), generates customized workout splits and meal plans, tracks daily check-ins, provides real-time progress analytics, features an interactive **AI Fitness Coach**, and includes a **Simplified Supplement Recommendation Engine**.

---

## 🌟 Key Features

### 1. 🔐 JWT Authentication
- **Secure Auth Flow**: Signup & Login with JWT token storage.
- **Validation Engine**: Password complexity rules (8+ chars, upper/lower, numbers, special characters).
- **Fast Demo Login**: Pre-seeded demo user account (`alex@fitforge.ai` / `Password123!`).

### 2. 💊 Simplified Supplement Recommendation Engine
- **3-Step Quiz (No Confusing Jargon)**:
  1. **Fitness Goal**: *Weight Loss, Weight Gain, Muscle Gain, Strength, General Fitness*
  2. **Budget (₹)**: *Under ₹1,000, Under ₹2,000, Under ₹3,000, Under ₹5,000, Under ₹10,000, or Custom Budget*
  3. **Diet Preference**: *Vegetarian, Non-Vegetarian, Vegan, No Preference*
- **Best Combination Under Your Budget**:
  - Automatically builds a safe, goal-aligned stack fitting your budget limit.
  - Displays Total Cost (e.g. ₹4,697) & Budget Remaining (e.g. ₹303).
  - Clear message: *"This combination fits your ₹5,000 budget and is aligned with your selected Muscle Gain goal."*
- **Categorized Recommendation Layout**:
  - Badge hierarchy: `1. Most Relevant`, `2. Good Option`, `3. Optional`.
  - Cards show Product Image, Name, Brand, Price (₹), Category, Main Benefit, Size, Servings, and Rating (★ 4.8 / 5).
- **More Options & Product Replacement**: 1-click swap with budget-matched alternative items.
- **Side-by-Side Product Comparison**: Compare 2 to 3 products by Price, Size, Servings, Protein/serving, Cost/serving (₹), and Rating.
- **Product Details Modal**: Short, readable details (Main Benefit, Ingredients, Who It Is For, Safety Note).
- **My Supplement Plan**: Save recommended stacks with automatic total cost calculations.

### 3. 📋 6-Step Multi-Step Fitness Onboarding
- **Step 1 — Basic Information**: Name, Age, Gender, Height (cm/ft), Weight (kg/lbs).
- **Step 2 — Fitness Goal**: Visual selectable cards (*Lose Weight, Build Muscle, Gain Weight, Maintain Weight, Improve Fitness*) + Target weight.
- **Step 3 — Activity Level**: Sedentary, Lightly Active, Moderately Active, Very Active, Extremely Active with descriptions.
- **Step 4 — Workout Preferences**: Beginner/Intermediate/Advanced experience, Gym/Home/Both locations, 2-6 Days/week, 30-90 min session durations, Morning/Afternoon/Evening time.
- **Step 5 — Nutrition Preferences**: Vegetarian, Non-Vegetarian, Vegan, Eggetarian diet types; 3-6 Meals/day; Multi-select food allergies.
- **Step 6 — Health Considerations**: Medical notes input + Medical disclaimer.

### 4. 🧮 Automated Fitness & Metabolic Engine
- **BMI Calculator**: Score & visual color-coded gauge (*Underweight, Normal, Overweight, Obese*).
- **BMR Calculation**: Mifflin-St Jeor Formula tailored by gender.
- **TDEE & Caloric Goal**: Calculates deficit/surplus based on target goal.
- **Macro Distribution**: Protein (~2.0g/kg), Fats (25%), Carbohydrates.
- **Hydration & Steps**: Personalized daily water target (~3.2L) and NEAT step targets (10,000 steps).

### 5. 📊 Dashboard & Workout Player
- **Summary Cards**: Real-time progress bars for Calories, Protein, Water, Steps, and Weight loss goal.
- **Interactive Workout Mode**:
  - Fullscreen step-by-step exercise player.
  - Set-by-set weight and rep logger.
  - **Live Countdown Rest Timer** (90s countdown, pause/resume, skip rest).
  - **Workout Completion Celebration**: Confetti 🎉, duration, exercises, set summary, and difficulty rating (*Easy, Perfect, Hard, Very Hard*).

### 6. 🥗 Nutrition & Food Replacement Engine
- **Macro Circles & Calories Remaining**: Real-time budget tracking.
- **Smart Food Replacement Modal**: Swap items (e.g. *Chicken Breast* -> *Paneer, Tofu, Eggs, Soya Chunks, Fish*) with live macro comparison.
- **Searchable Food Database**: Search food items and log custom portions.
- **Interactive Water Tracker**: Quick-add buttons (+250ml, +500ml, +1L) and animated glass icons grid.

### 7. 📈 Progress Analytics & Body Measurements
- **Weight Log & Chart**: Recharts line visualization with 8-week history.
- **Body Circumference Tracker**: Record Chest, Waist, Arms, Shoulders, Thighs, Hips, and Body Fat %.
- **Time Filters**: 7 Days, 30 Days, 3 Months, 6 Months, 1 Year views.

### 8. 🗓️ Daily Check-In & AI Coach
- **Daily Check-In**: Log weight, workout completion, diet adherence, sleep, steps, energy (1-10 slider), and mood.
- **Daily Fitness Score**: Calculates dynamic score out of 100 PTS + AI recommendation.
- **AI Fitness Coach Chat**: Interactive AI assistant with prompt suggestion chips (*"What should I eat before my workout?"*, *"Modify today's workout to 30 minutes"*, etc.).
- **Weekly AI Report**: Performance summary & strategic AI recommendations.

### 9. 🏆 Gamification & GitHub-Style Heatmap
- **Streak System**: 🔥 12-Day Streak tracking.
- **30-Day Contribution Heatmap Grid**: Visual activity grid for completed workouts.
- **Achievement Badges**: *First Workout, 7 Day Streak, 10 Workouts Completed, Protein Champion, 5kg Milestone, 30 Day Consistency*.

---

## 💻 Tech Stack

### Frontend
- **Framework**: React.js 18 + Vite 6
- **Styling**: Tailwind CSS + Custom Vanilla CSS (Dark Charcoal `#0b0c10`, Neon Lime `#ccff00`, Glassmorphism)
- **Data Visualization**: Recharts
- **Icons**: Lucide React
- **Effects**: Canvas Confetti

### Backend
- **Runtime**: Node.js + Express.js
- **Database**: MongoDB / Mongoose (with zero-config out-of-the-box NeDB in-memory fallback)
- **Security**: JWT Authentication + BcryptJS password hashing
- **APIs**: RESTful JSON Endpoints

---

## 🛠️ Installation & Setup Instructions

### 1. Clone & Navigate
```bash
cd "gym replica"
```

### 2. Backend Setup
```bash
cd server
npm install
node server.js
```
*Backend server starts at `http://localhost:5001`.*

### 3. Frontend Setup
Open a new terminal window:
```bash
cd client
npm install
npm run dev
```
*Frontend app launches at `http://localhost:5173`.*

---

## 🌐 API Structure Overview

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/supplements/recommend` | Simplified supplement stack builder & budget optimizer |
| `GET` | `/api/supplements/catalog` | Fetch supplement products catalog |
| `POST` | `/api/auth/login` | Authenticate user & return JWT token |
| `POST` | `/api/fitness/onboarding` | Submit 6-step onboarding & generate AI plans |
| `GET` | `/api/workouts` | Fetch weekly workout routines |
| `POST` | `/api/workouts/log-set` | Log set completion during workout mode |
| `GET` | `/api/nutrition` | Fetch daily meal plan & macro targets |
| `POST` | `/api/nutrition/replace-food` | Swap food item with macro alternative |
| `GET` | `/api/progress/weight` | Fetch weight log history |
| `POST` | `/api/checkin` | Submit daily check-in & get score |
| `POST` | `/api/ai/coach` | Ask AI Fitness Coach prompt |

---

## 👨‍💻 Developer & Portfolio Info

- **Project Name**: RepForge
- **Architecture**: Full-stack MERN SaaS Architecture
- **Design System**: Premium Dark Mode with Glassmorphism and Neon Lime accents
