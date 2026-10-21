const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, 'client/public/assets/exercises');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

// Function to generate premium dark-themed SVG exercise visuals
function createExerciseSVG(title, muscle, colorHex, accentHex, iconPaths, detailText) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="100%" height="100%">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0b0c10"/>
      <stop offset="50%" stop-color="#121318"/>
      <stop offset="100%" stop-color="#1a1c24"/>
    </linearGradient>
    <linearGradient id="glowGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="${colorHex}" stop-opacity="0.8"/>
      <stop offset="100%" stop-color="${accentHex}" stop-opacity="0.8"/>
    </linearGradient>
    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="12" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>

  <!-- Background -->
  <rect width="800" height="500" fill="url(#bgGrad)"/>
  
  <!-- Subtle Grid Pattern -->
  <g stroke="#ffffff" stroke-opacity="0.03" stroke-width="1">
    <line x1="0" y1="100" x2="800" y2="100"/>
    <line x1="0" y1="200" x2="800" y2="200"/>
    <line x1="0" y1="300" x2="800" y2="300"/>
    <line x1="0" y1="400" x2="800" y2="400"/>
    <line x1="200" y1="0" x2="200" y2="500"/>
    <line x1="400" y1="0" x2="400" y2="500"/>
    <line x1="600" y1="0" x2="600" y2="500"/>
  </g>

  <!-- Ambient Glow Circle -->
  <circle cx="400" cy="220" r="160" fill="${colorHex}" fill-opacity="0.08" filter="url(#glow)"/>

  <!-- Exercise Icon / Posture Graphic Container -->
  <g transform="translate(400, 210)">
    <!-- Central Halo Circle -->
    <circle cx="0" cy="0" r="95" fill="none" stroke="url(#glowGrad)" stroke-width="3" opacity="0.6"/>
    <circle cx="0" cy="0" r="115" fill="none" stroke="${colorHex}" stroke-dasharray="8 8" stroke-width="1.5" opacity="0.4"/>
    
    <!-- Exercise Diagram Paths -->
    ${iconPaths}
  </g>

  <!-- Top Category Badge -->
  <rect x="40" y="35" width="130" height="32" rx="16" fill="${colorHex}" fill-opacity="0.15" stroke="${colorHex}" stroke-opacity="0.3" stroke-width="1"/>
  <text x="105" y="56" fill="${colorHex}" font-family="system-ui, sans-serif" font-size="12" font-weight="800" text-anchor="middle" letter-spacing="1">${muscle.toUpperCase()}</text>

  <!-- Title & Info Overlay -->
  <text x="40" y="440" fill="#ffffff" font-family="system-ui, sans-serif" font-size="28" font-weight="900" letter-spacing="-0.5">${title}</text>
  <text x="40" y="468" fill="#9ca3af" font-family="system-ui, sans-serif" font-size="14" font-weight="500">${detailText}</text>

  <!-- Watermark -->
  <text x="760" y="468" fill="#ffffff" fill-opacity="0.2" font-family="system-ui, sans-serif" font-size="12" font-weight="800" text-anchor="end">FITFORGE AI</text>
</svg>`;
}

// Exercises Definitions
const exercises = [
  {
    filename: 'lat-pulldowns.svg',
    title: 'Lat Pulldowns',
    muscle: 'Lats & Back',
    color: '#ccff00',
    accent: '#10b981',
    detail: 'Cable Overhead Pull-Down • Latissimus Dorsi Focus',
    paths: `
      <!-- Cable Machine Structure -->
      <line x1="0" y1="-120" x2="0" y2="-60" stroke="#9ca3af" stroke-width="4"/>
      <!-- Lat Bar -->
      <line x1="-90" y1="-60" x2="90" y2="-60" stroke="#ffffff" stroke-width="7" stroke-linecap="round"/>
      <circle cx="-90" cy="-60" r="5" fill="#ccff00"/>
      <circle cx="90" cy="-60" r="5" fill="#ccff00"/>
      <!-- Athlete Head -->
      <circle cx="0" cy="-20" r="16" fill="#ccff00"/>
      <!-- Torso -->
      <path d="M -20,0 L 20,0 L 15,60 L -15,60 Z" fill="#ffffff"/>
      <!-- Arms Holding Bar -->
      <path d="M -20,0 L -70,-55" stroke="#ccff00" stroke-width="8" stroke-linecap="round"/>
      <path d="M 20,0 L 70,-55" stroke="#ccff00" stroke-width="8" stroke-linecap="round"/>
    `
  },
  {
    filename: 'bent-over-barbell-rows.svg',
    title: 'Bent-Over Barbell Rows',
    muscle: 'Upper Back',
    color: '#ccff00',
    accent: '#3b82f6',
    detail: 'Hinged Barbell Pull • Rhomboids & Lat Hypertrophy',
    paths: `
      <!-- Athlete Head -->
      <circle cx="-30" cy="-50" r="16" fill="#ccff00"/>
      <!-- Bent Torso -->
      <path d="M -30,-35 L 20,-10 L 0,40" stroke="#ffffff" stroke-width="12" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
      <!-- Legs -->
      <path d="M 0,40 L -15,90 M 0,40 L 15,90" stroke="#ffffff" stroke-width="10" stroke-linecap="round"/>
      <!-- Arms Pulling Bar -->
      <path d="M 0,-20 L -10,30" stroke="#ccff00" stroke-width="8" stroke-linecap="round"/>
      <!-- Barbell -->
      <line x1="-70" y1="30" x2="50" y2="30" stroke="#ccff00" stroke-width="8"/>
      <rect x="-80" y="18" width="12" height="24" rx="3" fill="#ffffff"/>
      <rect x="50" y="18" width="12" height="24" rx="3" fill="#ffffff"/>
    `
  },
  {
    filename: 'seated-cable-rows.svg',
    title: 'Seated Cable Rows',
    muscle: 'Mid Back',
    color: '#ccff00',
    accent: '#f59e0b',
    detail: 'Horizontal Cable Row • Mid-Back Thickness',
    paths: `
      <!-- Cable Line -->
      <line x1="-100" y1="10" x2="-20" y2="10" stroke="#9ca3af" stroke-width="4" stroke-dasharray="6 4"/>
      <!-- Seated Athlete Head -->
      <circle cx="30" cy="-40" r="16" fill="#ccff00"/>
      <!-- Torso & Legs -->
      <path d="M 30,-25 L 30,30 L -40,30" stroke="#ffffff" stroke-width="12" stroke-linecap="round" fill="none"/>
      <!-- Arms Pulling Handle -->
      <path d="M 30,-10 L -20,10" stroke="#ccff00" stroke-width="8" stroke-linecap="round"/>
      <!-- V-Bar Handle -->
      <path d="M -25,0 L -20,10 L -25,20" stroke="#ccff00" stroke-width="5" fill="none"/>
    `
  },
  {
    filename: 'ez-bar-bicep-curls.svg',
    title: 'EZ-Bar Bicep Curls',
    muscle: 'Biceps',
    color: '#06b6d4',
    accent: '#ccff00',
    detail: 'Supinated Arm Curl • Bicep Brachii Isolation',
    paths: `
      <!-- Head -->
      <circle cx="0" cy="-60" r="16" fill="#06b6d4"/>
      <!-- Body -->
      <path d="M 0,-40 L 0,40 M 0,40 L -20,100 M 0,40 L 20,100" stroke="#ffffff" stroke-width="10" stroke-linecap="round"/>
      <!-- Arms Curled Up -->
      <path d="M 0,-30 L 20,-10 L -10,-35" stroke="#06b6d4" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
      <!-- Wavy EZ Bar -->
      <path d="M -50,-35 L -25,-35 L -10,-40 L 10,-30 L 25,-35 L 50,-35" stroke="#ccff00" stroke-width="6" fill="none"/>
      <circle cx="-50" cy="-35" r="10" fill="#ffffff"/>
      <circle cx="50" cy="-35" r="10" fill="#ffffff"/>
    `
  },
  {
    filename: 'hammer-curls.svg',
    title: 'Hammer Curls',
    muscle: 'Brachialis',
    color: '#06b6d4',
    accent: '#ec4899',
    detail: 'Neutral Grip Dumbbell Curl • Forearm & Arm Thickness',
    paths: `
      <!-- Head -->
      <circle cx="0" cy="-60" r="16" fill="#06b6d4"/>
      <!-- Body -->
      <path d="M 0,-40 L 0,40 M 0,40 L -18,100 M 0,40 L 18,100" stroke="#ffffff" stroke-width="10" stroke-linecap="round"/>
      <!-- Neutral Arms -->
      <path d="M 0,-30 L 30,-10 L 15,-40" stroke="#06b6d4" stroke-width="8" stroke-linecap="round" fill="none"/>
      <!-- Vertical Dumbbell -->
      <rect x="8" y="-55" width="14" height="30" rx="4" fill="#ccff00"/>
      <line x1="15" y1="-60" x2="15" y2="-20" stroke="#ffffff" stroke-width="4"/>
    `
  },
  {
    filename: 'barbell-bench-press.svg',
    title: 'Barbell Bench Press',
    muscle: 'Chest',
    color: '#3b82f6',
    accent: '#ccff00',
    detail: 'Flat Bench Barbell Press • Pectoralis Major Compound',
    paths: `
      <!-- Bench -->
      <line x1="-110" y1="40" x2="110" y2="40" stroke="#9ca3af" stroke-width="8" stroke-linecap="round"/>
      <line x1="-80" y1="40" x2="-80" y2="90" stroke="#9ca3af" stroke-width="6"/>
      <line x1="80" y1="40" x2="80" y2="90" stroke="#9ca3af" stroke-width="6"/>
      <!-- Athlete Lying Flat -->
      <circle cx="-70" cy="20" r="14" fill="#3b82f6"/>
      <line x1="-55" y1="25" x2="40" y2="25" stroke="#ffffff" stroke-width="12" stroke-linecap="round"/>
      <!-- Pressing Arms -->
      <path d="M -10,25 L -20,-30" stroke="#ccff00" stroke-width="8" stroke-linecap="round"/>
      <path d="M 15,25 L 25,-30" stroke="#ccff00" stroke-width="8" stroke-linecap="round"/>
      <!-- Barbell Raised -->
      <line x1="-90" y1="-30" x2="90" y2="-30" stroke="#ccff00" stroke-width="7"/>
      <rect x="-102" y="-45" width="14" height="30" rx="3" fill="#ffffff"/>
      <rect x="88" y="-45" width="14" height="30" rx="3" fill="#ffffff"/>
    `
  },
  {
    filename: 'incline-dumbbell-press.svg',
    title: 'Incline Dumbbell Press',
    muscle: 'Upper Chest',
    color: '#3b82f6',
    accent: '#10b981',
    detail: '30° Incline Dumbbell Press • Upper Clavicular Pectoral',
    paths: `
      <!-- Incline Bench -->
      <path d="M -70,50 L 30,-20 L 70,50" stroke="#9ca3af" stroke-width="8" fill="none"/>
      <!-- Athlete -->
      <circle cx="-45" cy="-5" r="14" fill="#3b82f6"/>
      <path d="M -30,5 L 20,-10" stroke="#ffffff" stroke-width="12" stroke-linecap="round"/>
      <!-- Arms Pressing DBs -->
      <path d="M -10,-2 L -15,-55" stroke="#ccff00" stroke-width="8" stroke-linecap="round"/>
      <path d="M 10,-12 L 15,-60" stroke="#ccff00" stroke-width="8" stroke-linecap="round"/>
      <!-- Dumbbells -->
      <rect x="-30" y="-62" width="28" height="12" rx="3" fill="#ffffff"/>
      <rect x="2" y="-67" width="28" height="12" rx="3" fill="#ffffff"/>
    `
  },
  {
    filename: 'cable-chest-flyes.svg',
    title: 'Cable Chest Flyes',
    muscle: 'Lower & Outer Chest',
    color: '#3b82f6',
    accent: '#f59e0b',
    detail: 'Standing Cable Flye • Full Chest Hugging Arc',
    paths: `
      <!-- Cable Pulleys Left & Right -->
      <line x1="-120" y1="-80" x2="-60" y2="0" stroke="#9ca3af" stroke-width="3" stroke-dasharray="4 4"/>
      <line x1="120" y1="-80" x2="60" y2="0" stroke="#9ca3af" stroke-width="3" stroke-dasharray="4 4"/>
      <!-- Athlete -->
      <circle cx="0" cy="-55" r="16" fill="#3b82f6"/>
      <path d="M 0,-35 L 0,40 M 0,40 L -15,100 M 0,40 L 15,100" stroke="#ffffff" stroke-width="10" stroke-linecap="round"/>
      <!-- Wide Curved Arms Hugging -->
      <path d="M -60,0 C -30,20 30,20 60,0" stroke="#ccff00" stroke-width="8" fill="none" stroke-linecap="round"/>
      <circle cx="0" cy="18" r="8" fill="#ccff00"/>
    `
  },
  {
    filename: 'triceps-rope-pushdowns.svg',
    title: 'Triceps Rope Pushdowns',
    muscle: 'Triceps',
    color: '#8b5cf6',
    accent: '#ccff00',
    detail: 'High Pulley Extension • Lateral & Long Tricep Head',
    paths: `
      <!-- High Pulley Rope -->
      <line x1="0" y1="-100" x2="0" y2="-10" stroke="#9ca3af" stroke-width="4"/>
      <!-- Athlete Standing -->
      <circle cx="-35" cy="-40" r="15" fill="#8b5cf6"/>
      <path d="M -35,-20 L -35,50 M -35,50 L -50,110 M -35,50 L -20,110" stroke="#ffffff" stroke-width="10" stroke-linecap="round"/>
      <!-- Arms Extending Down -->
      <path d="M -35,-10 L -10,-10 L 0,30" stroke="#ccff00" stroke-width="8" stroke-linecap="round" fill="none"/>
      <!-- Split Rope Handles -->
      <line x1="0" y1="30" x2="-15" y2="50" stroke="#ffffff" stroke-width="5" stroke-linecap="round"/>
      <line x1="0" y1="30" x2="15" y2="50" stroke="#ffffff" stroke-width="5" stroke-linecap="round"/>
    `
  },
  {
    filename: 'skull-crushers.svg',
    title: 'Skull Crushers',
    muscle: 'Triceps',
    color: '#8b5cf6',
    accent: '#3b82f6',
    detail: 'Lying Tricep Extension • Elbow Extension Isolation',
    paths: `
      <!-- Bench -->
      <line x1="-100" y1="40" x2="100" y2="40" stroke="#9ca3af" stroke-width="8" stroke-linecap="round"/>
      <!-- Athlete Lying -->
      <circle cx="-60" cy="20" r="14" fill="#8b5cf6"/>
      <line x1="-45" y1="25" x2="40" y2="25" stroke="#ffffff" stroke-width="12" stroke-linecap="round"/>
      <!-- Bent Arms at Forehead -->
      <path d="M -10,25 L -10,-20 L -45,-15" stroke="#ccff00" stroke-width="7" stroke-linecap="round" fill="none"/>
      <!-- EZ Bar near forehead -->
      <circle cx="-48" cy="-15" r="10" fill="#ffffff"/>
    `
  },
  {
    filename: 'dips.svg',
    title: 'Dips',
    muscle: 'Lower Chest & Triceps',
    color: '#8b5cf6',
    accent: '#10b981',
    detail: 'Bodyweight Parallel Bar Dip • Pectoral & Tricep Compound',
    paths: `
      <!-- Parallel Bars -->
      <line x1="-40" y1="-20" x2="-40" y2="90" stroke="#9ca3af" stroke-width="6"/>
      <line x1="40" y1="-20" x2="40" y2="90" stroke="#9ca3af" stroke-width="6"/>
      <!-- Athlete Body Suspended -->
      <circle cx="0" cy="-60" r="15" fill="#8b5cf6"/>
      <path d="M 0,-40 L 0,20 M 0,20 L -15,70 M 0,20 L 10,65" stroke="#ffffff" stroke-width="10" stroke-linecap="round"/>
      <!-- Arms on Bars -->
      <path d="M 0,-30 L -40,-20 M 0,-30 L 40,-20" stroke="#ccff00" stroke-width="8" stroke-linecap="round"/>
    `
  },
  {
    filename: 'barbell-back-squats.svg',
    title: 'Barbell Back Squats',
    muscle: 'Quadriceps & Glutes',
    color: '#10b981',
    accent: '#ccff00',
    detail: 'Deep Barbell Squat • Posterior Chain & Quad Power',
    paths: `
      <!-- Head -->
      <circle cx="0" cy="-20" r="15" fill="#10b981"/>
      <!-- Deep Squat Torso & Bent Legs -->
      <path d="M 0,0 L 0,40 L -40,65 L -35,110 M 0,40 L 40,65 L 35,110" stroke="#ffffff" stroke-width="11" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
      <!-- Barbell across traps -->
      <line x1="-85" y1="-10" x2="85" y2="-10" stroke="#ccff00" stroke-width="8"/>
      <rect x="-95" y="-22" width="12" height="24" rx="3" fill="#ffffff"/>
      <rect x="83" y="-22" width="12" height="24" rx="3" fill="#ffffff"/>
    `
  },
  {
    filename: 'romanian-deadlifts.svg',
    title: 'Romanian Deadlifts',
    muscle: 'Hamstrings & Glutes',
    color: '#10b981',
    accent: '#f59e0b',
    detail: 'Hip Hinge Deadlift • Hamstring Stretch & Posterior Chain',
    paths: `
      <!-- Athlete Hinging Back -->
      <circle cx="-35" cy="-30" r="15" fill="#10b981"/>
      <path d="M -35,-15 L 20,10 L -10,75 M 20,10 L 15,75" stroke="#ffffff" stroke-width="11" stroke-linecap="round" fill="none"/>
      <!-- Arms Hanging straight with Bar -->
      <path d="M -5,5 L -5,55" stroke="#ccff00" stroke-width="8" stroke-linecap="round"/>
      <line x1="-65" y1="55" x2="55" y2="55" stroke="#ccff00" stroke-width="8"/>
      <rect x="-75" y="43" width="12" height="24" rx="3" fill="#ffffff"/>
      <rect x="55" y="43" width="12" height="24" rx="3" fill="#ffffff"/>
    `
  },
  {
    filename: 'leg-press.svg',
    title: 'Leg Press',
    muscle: 'Quads & Glutes',
    color: '#10b981',
    accent: '#3b82f6',
    detail: '45° Leg Press Machine • Quad Hypertrophy & Glutes',
    paths: `
      <!-- Sled Platform -->
      <line x1="30" y1="-60" x2="90" y2="-10" stroke="#9ca3af" stroke-width="10" stroke-linecap="round"/>
      <!-- Reclined Seat -->
      <line x1="-70" y1="40" x2="-20" y2="-20" stroke="#9ca3af" stroke-width="8"/>
      <!-- Athlete -->
      <circle cx="-40" cy="-35" r="14" fill="#10b981"/>
      <path d="M -25,-15 L 10,20 L 55,-25" stroke="#ffffff" stroke-width="11" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
      <!-- Feet on Platform -->
      <circle cx="55" cy="-25" r="7" fill="#ccff00"/>
    `
  },
  {
    filename: 'standing-calf-raises.svg',
    title: 'Standing Calf Raises',
    muscle: 'Calves',
    color: '#10b981',
    accent: '#ec4899',
    detail: 'Ankle Extension • Gastrocnemius & Soleus',
    paths: `
      <!-- Platform Step -->
      <rect x="-60" y="80" width="120" height="20" fill="#9ca3af" rx="4"/>
      <!-- Standing Body on Tiptoes -->
      <circle cx="0" cy="-60" r="15" fill="#10b981"/>
      <path d="M 0,-40 L 0,30 M 0,30 L -10,75 M 0,30 L 10,75" stroke="#ffffff" stroke-width="10" stroke-linecap="round"/>
      <!-- High Heel Raise indicator -->
      <path d="M -10,75 L -10,65 M 10,75 L 10,65" stroke="#ccff00" stroke-width="5"/>
    `
  },
  {
    filename: 'hanging-leg-raises.svg',
    title: 'Hanging Leg Raises',
    muscle: 'Lower Abs',
    color: '#f59e0b',
    accent: '#ccff00',
    detail: 'Pullup Bar Hanging Raise • Lower Abs & Core Compression',
    paths: `
      <!-- Pullup Bar -->
      <line x1="-80" y1="-100" x2="80" y2="-100" stroke="#ffffff" stroke-width="8"/>
      <!-- Arms & Head -->
      <path d="M -40,-100 L -15,-60 M 40,-100 L 15,-60" stroke="#ccff00" stroke-width="8" stroke-linecap="round"/>
      <circle cx="0" cy="-65" r="14" fill="#f59e0b"/>
      <!-- Torso & Legs Raised 90 degrees -->
      <path d="M 0,-45 L 0,10 L 60,10" stroke="#ffffff" stroke-width="11" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
    `
  },
  {
    filename: 'treadmill-walk.svg',
    title: 'Treadmill Walk',
    muscle: 'Cardio',
    color: '#ec4899',
    accent: '#06b6d4',
    detail: 'Incline Treadmill Cardio • Calorie Burn & Endurance',
    paths: `
      <!-- Treadmill Machine Frame -->
      <path d="M -80,60 L 70,40 M 70,40 L 80,-20 M 80,-20 L 40,-20" stroke="#9ca3af" stroke-width="6" fill="none"/>
      <!-- Walking Athlete -->
      <circle cx="0" cy="-40" r="15" fill="#ec4899"/>
      <path d="M 0,-20 L 0,25 M 0,25 L -25,55 M 0,25 L 25,50" stroke="#ffffff" stroke-width="10" stroke-linecap="round"/>
      <path d="M 0,-10 L -20,10 M 0,-10 L 20,-5" stroke="#06b6d4" stroke-width="6" stroke-linecap="round"/>
    `
  },
  {
    filename: 'plank-hold.svg',
    title: 'Plank Hold',
    muscle: 'Core & Stability',
    color: '#f59e0b',
    accent: '#10b981',
    detail: 'Isometric Forearm Plank • Deep Core Anti-Extension',
    paths: `
      <!-- Floor Mat -->
      <line x1="-110" y1="50" x2="110" y2="50" stroke="#9ca3af" stroke-width="6" stroke-linecap="round"/>
      <!-- Flat Body Horizontal -->
      <circle cx="-70" cy="15" r="14" fill="#f59e0b"/>
      <line x1="-55" y1="20" x2="60" y2="20" stroke="#ffffff" stroke-width="12" stroke-linecap="round"/>
      <!-- Forearms & Feet on Floor -->
      <path d="M -50,20 L -50,50 L -30,50" stroke="#ccff00" stroke-width="7" stroke-linecap="round" fill="none"/>
      <line x1="60" y1="20" x2="65" y2="50" stroke="#ccff00" stroke-width="7" stroke-linecap="round"/>
    `
  },
  {
    filename: 'ab-wheel-rollouts.svg',
    title: 'Ab Wheel Rollouts',
    muscle: 'Abs',
    color: '#f59e0b',
    accent: '#ec4899',
    detail: 'Kneeling Ab Wheel Extension • Core Tension',
    paths: `
      <!-- Knees on floor -->
      <line x1="-90" y1="50" x2="90" y2="50" stroke="#9ca3af" stroke-width="6"/>
      <circle cx="-60" cy="0" r="14" fill="#f59e0b"/>
      <!-- Extended Torso -->
      <path d="M -45,10 L 20,30" stroke="#ffffff" stroke-width="11" stroke-linecap="round"/>
      <!-- Arms reaching Ab Wheel -->
      <line x1="20" y1="30" x2="50" y2="45" stroke="#ccff00" stroke-width="7"/>
      <!-- Ab Wheel -->
      <circle cx="50" cy="45" r="14" fill="none" stroke="#ccff00" stroke-width="5"/>
    `
  },
  {
    filename: 'overhead-dumbbell-press.svg',
    title: 'Overhead Dumbbell Press',
    muscle: 'Deltoids & Shoulders',
    color: '#ec4899',
    accent: '#ccff00',
    detail: 'Seated Dumbbell Shoulder Press • Anterior & Lateral Delts',
    paths: `
      <!-- Head -->
      <circle cx="0" cy="-30" r="15" fill="#ec4899"/>
      <!-- Torso -->
      <path d="M 0,-10 L 0,50" stroke="#ffffff" stroke-width="12" stroke-linecap="round"/>
      <!-- Arms Pressing DBs Overhead -->
      <path d="M 0,-5 L -35,-55 M 0,-5 L 35,-55" stroke="#ccff00" stroke-width="8" stroke-linecap="round"/>
      <!-- Dumbbells -->
      <rect x="-50" y="-62" width="28" height="12" rx="3" fill="#ffffff"/>
      <rect x="22" y="-62" width="28" height="12" rx="3" fill="#ffffff"/>
    `
  },
  {
    filename: 'lateral-cable-raises.svg',
    title: 'Lateral Cable Raises',
    muscle: 'Side Delts',
    color: '#ec4899',
    accent: '#3b82f6',
    detail: 'Low Cable Side Raise • Lateral Head Isolation',
    paths: `
      <!-- Low Cable -->
      <line x1="-80" y1="80" x2="40" y2="-10" stroke="#9ca3af" stroke-width="3" stroke-dasharray="4 4"/>
      <!-- Athlete -->
      <circle cx="0" cy="-55" r="15" fill="#ec4899"/>
      <path d="M 0,-35 L 0,40 M 0,40 L -15,100 M 0,40 L 15,100" stroke="#ffffff" stroke-width="10" stroke-linecap="round"/>
      <!-- Arm Extended Sideways -->
      <path d="M 0,-20 L 60,-10" stroke="#ccff00" stroke-width="8" stroke-linecap="round"/>
      <circle cx="60" cy="-10" r="7" fill="#ccff00"/>
    `
  },
  {
    filename: 'face-pulls.svg',
    title: 'Face Pulls',
    muscle: 'Rear Delts & Upper Back',
    color: '#ec4899',
    accent: '#f59e0b',
    detail: 'High Cable Rope Pull • Rear Deltoid & External Rotation',
    paths: `
      <!-- Cable Line -->
      <line x1="-90" y1="-30" x2="-10" y2="-30" stroke="#9ca3af" stroke-width="4"/>
      <!-- Athlete -->
      <circle cx="30" cy="-45" r="15" fill="#ec4899"/>
      <path d="M 30,-25 L 30,45 M 30,45 L 15,105 M 30,45 L 45,105" stroke="#ffffff" stroke-width="10" stroke-linecap="round"/>
      <!-- Flared Arms Pulling Rope to Face -->
      <path d="M 30,-15 L 0,-30 L -15,-30" stroke="#ccff00" stroke-width="8" stroke-linecap="round" fill="none"/>
    `
  },
  {
    filename: 'preacher-curls.svg',
    title: 'Preacher Curls',
    muscle: 'Biceps Peak',
    color: '#06b6d4',
    accent: '#10b981',
    detail: 'Preacher Bench Curl • Short Head Bicep Isolation',
    paths: `
      <!-- Preacher Bench Pad -->
      <path d="M -50,30 L 10,-20 L 30,30" stroke="#9ca3af" stroke-width="8" fill="none"/>
      <circle cx="-40" cy="-35" r="14" fill="#06b6d4"/>
      <!-- Arms Resting on Pad Curled -->
      <path d="M -25,-15 L 0,-15 L -20,-45" stroke="#ccff00" stroke-width="7" stroke-linecap="round" fill="none"/>
      <!-- Barbell -->
      <circle cx="-20" cy="-45" r="10" fill="#ffffff"/>
    `
  },
  {
    filename: 'overhead-tricep-extensions.svg',
    title: 'Overhead Tricep Extensions',
    muscle: 'Long Head Triceps',
    color: '#8b5cf6',
    accent: '#ec4899',
    detail: 'Overhead Cable/DB Extension • Deep Tricep Stretch',
    paths: `
      <circle cx="0" cy="-45" r="15" fill="#8b5cf6"/>
      <path d="M 0,-25 L 0,45 M 0,45 L -15,105 M 0,45 L 15,105" stroke="#ffffff" stroke-width="10" stroke-linecap="round"/>
      <!-- Arms Reaching Behind Head -->
      <path d="M 0,-15 L 0,-70 L -25,-60" stroke="#ccff00" stroke-width="8" stroke-linecap="round" fill="none"/>
      <circle cx="-25" cy="-60" r="9" fill="#ffffff"/>
    `
  },
  {
    filename: 'conventional-deadlift.svg',
    title: 'Conventional Deadlift',
    muscle: 'Posterior Chain',
    color: '#10b981',
    accent: '#ccff00',
    detail: 'Floor Heavy Deadlift • Glutes, Hamstrings & Back',
    paths: `
      <!-- Athlete Hinged Low at Bar -->
      <circle cx="-25" cy="-30" r="15" fill="#10b981"/>
      <path d="M -25,-15 L 15,10 L -15,75 M 15,10 L 10,75" stroke="#ffffff" stroke-width="11" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
      <!-- Arms Hanging to Floor Barbell -->
      <line x1="-5" y1="5" x2="-5" y2="70" stroke="#ccff00" stroke-width="8" stroke-linecap="round"/>
      <line x1="-65" y1="70" x2="55" y2="70" stroke="#ccff00" stroke-width="8"/>
      <rect x="-75" y="55" width="14" height="30" rx="3" fill="#ffffff"/>
      <rect x="55" y="55" width="14" height="30" rx="3" fill="#ffffff"/>
    `
  },
  {
    filename: 'dumbbell-walking-lunges.svg',
    title: 'Dumbbell Walking Lunges',
    muscle: 'Quads & Glutes',
    color: '#10b981',
    accent: '#3b82f6',
    detail: 'Forward Walking Lunge • Unilateral Quad & Glute',
    paths: `
      <circle cx="0" cy="-55" r="15" fill="#10b981"/>
      <!-- Forward Lunge Stance -->
      <path d="M 0,-35 L 0,20 M 0,20 L 40,30 L 40,80 M 0,20 L -40,50 L -40,95" stroke="#ffffff" stroke-width="10" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
      <!-- Hanging DBs -->
      <line x1="-15" y1="-10" x2="-15" y2="30" stroke="#ccff00" stroke-width="6"/>
      <line x1="15" y1="-10" x2="15" y2="30" stroke="#ccff00" stroke-width="6"/>
      <rect x="-22" y="25" width="14" height="10" rx="2" fill="#ffffff"/>
      <rect x="8" y="25" width="14" height="10" rx="2" fill="#ffffff"/>
    `
  },
  {
    filename: 'renegade-row.svg',
    title: 'Push-Ups to Renegade Row',
    muscle: 'Full Body & Core',
    color: '#3b82f6',
    accent: '#ccff00',
    detail: 'Plank DB Row Combo • Upper Body & Core Stability',
    paths: `
      <!-- Plank Position -->
      <circle cx="-60" cy="0" r="14" fill="#3b82f6"/>
      <line x1="-45" y1="10" x2="50" y2="25" stroke="#ffffff" stroke-width="11" stroke-linecap="round"/>
      <!-- Row Arm Pulling DB -->
      <path d="M -30,10 L -20,-20" stroke="#ccff00" stroke-width="7" stroke-linecap="round"/>
      <rect x="-28" y="-30" width="16" height="12" rx="3" fill="#ffffff"/>
    `
  },
  {
    filename: 'dynamic-stretching.svg',
    title: 'Full Body Dynamic Stretching',
    muscle: 'Mobility & Flexibility',
    color: '#06b6d4',
    accent: '#10b981',
    detail: 'Full Body Active Mobility • Joint Warmup',
    paths: `
      <circle cx="0" cy="-50" r="15" fill="#06b6d4"/>
      <path d="M 0,-30 L 0,20 M 0,20 L -30,70 M 0,20 L 30,70" stroke="#ffffff" stroke-width="10" stroke-linecap="round"/>
      <path d="M 0,-20 L -45,-40 M 0,-20 L 45,-10" stroke="#ccff00" stroke-width="7" stroke-linecap="round"/>
    `
  },
  {
    filename: 'foam-rolling.svg',
    title: 'Foam Rolling Major Muscles',
    muscle: 'Recovery & Myofascial',
    color: '#06b6d4',
    accent: '#8b5cf6',
    detail: 'Foam Roller Myofascial Release • Muscle Recovery',
    paths: `
      <circle cx="-60" cy="15" r="14" fill="#06b6d4"/>
      <line x1="-45" y1="20" x2="50" y2="20" stroke="#ffffff" stroke-width="11" stroke-linecap="round"/>
      <!-- Foam Roller Cylinder under thighs -->
      <ellipse cx="0" cy="35" rx="20" ry="10" fill="#ccff00"/>
    `
  },
  {
    filename: 'placeholder.svg',
    title: 'Exercise Guide',
    muscle: 'Fitness',
    color: '#ccff00',
    accent: '#06b6d4',
    detail: 'FitForge AI Specialized Fitness Routine',
    paths: `
      <circle cx="0" cy="-50" r="16" fill="#ccff00"/>
      <path d="M 0,-30 L 0,30 M 0,30 L -25,90 M 0,30 L 25,90" stroke="#ffffff" stroke-width="10" stroke-linecap="round"/>
      <path d="M 0,-15 L -40,15 M 0,-15 L 40,15" stroke="#06b6d4" stroke-width="8" stroke-linecap="round"/>
    `
  }
];

// Write files
let count = 0;
exercises.forEach(ex => {
  const filePath = path.join(targetDir, ex.filename);
  const content = createExerciseSVG(ex.title, ex.muscle, ex.color, ex.accent, ex.paths, ex.detail);
  fs.writeFileSync(filePath, content, 'utf8');
  count++;
});

console.log(`Successfully generated ${count} SVG exercise visual assets in client/public/assets/exercises/`);
