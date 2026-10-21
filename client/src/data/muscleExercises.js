// Structured Muscle Exercise Database for RepForge
// Gym Workout: 5 exercises per stage
// Home Workout: 6 exercises per stage

export const MUSCLE_GROUPS = {
  chest: {
    id: 'chest',
    name: 'Chest',
    category: 'front',
    primaryName: 'Pectoralis Major & Minor',
    secondaryMuscles: ['Anterior Deltoids', 'Triceps'],
    description: 'Target upper, middle, and lower chest for pressing strength and chest size.'
  },
  shoulders: {
    id: 'shoulders',
    name: 'Shoulders',
    category: 'front',
    primaryName: 'Anterior, Lateral & Posterior Deltoids',
    secondaryMuscles: ['Trapezius', 'Triceps'],
    description: 'Build 3D cap shoulders and overhead pressing strength.'
  },
  biceps: {
    id: 'biceps',
    name: 'Biceps',
    category: 'front',
    primaryName: 'Biceps Brachii & Brachialis',
    secondaryMuscles: ['Forearms', 'Brachioradialis'],
    description: 'Isolate arm flexors for arm size, peak height, and pulling power.'
  },
  forearms: {
    id: 'forearms',
    name: 'Forearms',
    category: 'front',
    primaryName: 'Flexor & Extensor Carpi',
    secondaryMuscles: ['Grip Muscles', 'Brachioradialis'],
    description: 'Build crush grip strength, wrist stability, and forearm thickness.'
  },
  abs: {
    id: 'abs',
    name: 'Abs',
    category: 'front',
    primaryName: 'Rectus Abdominis & Deep Core',
    secondaryMuscles: ['Transverse Abdominis', 'Hip Flexors'],
    description: 'Strengthen core stability, abdominal flexion, and 6-pack definition.'
  },
  obliques: {
    id: 'obliques',
    name: 'Obliques',
    category: 'front',
    primaryName: 'Internal & External Obliques',
    secondaryMuscles: ['Rectus Abdominis', 'Lateral Core'],
    description: 'Develop rotational power, side abdominal lines, and waist stability.'
  },
  quads: {
    id: 'quads',
    name: 'Quads',
    category: 'front',
    primaryName: 'Quadriceps Femoris',
    secondaryMuscles: ['Glutes', 'Calves'],
    description: 'Develop front leg strength, knee extension power, and quad mass.'
  },
  upper_back: {
    id: 'upper_back',
    name: 'Upper Back',
    category: 'back',
    primaryName: 'Rhomboids, Mid Traps & Rear Delts',
    secondaryMuscles: ['Lats', 'Biceps'],
    description: 'Build mid-back thickness, posture control, and pulling power.'
  },
  lats: {
    id: 'lats',
    name: 'Lats',
    category: 'back',
    primaryName: 'Latissimus Dorsi',
    secondaryMuscles: ['Biceps', 'Upper Back'],
    description: 'Develop V-taper lat width and upper body pulling width.'
  },
  traps: {
    id: 'traps',
    name: 'Traps',
    category: 'back',
    primaryName: 'Trapezius (Upper, Middle, Lower)',
    secondaryMuscles: ['Rhomboids', 'Forearms'],
    description: 'Build upper back and neck thickness and shoulder blade stability.'
  },
  triceps: {
    id: 'triceps',
    name: 'Triceps',
    category: 'back',
    primaryName: 'Triceps Brachii (Long, Lateral, Medial)',
    secondaryMuscles: ['Front Shoulders', 'Chest'],
    description: 'Account for 60% of upper arm size; key for arm extension lockout.'
  },
  lower_back: {
    id: 'lower_back',
    name: 'Lower Back',
    category: 'back',
    primaryName: 'Erector Spinae',
    secondaryMuscles: ['Glutes', 'Hamstrings'],
    description: 'Strengthen spinal erectors for posture, hip hinge power, and spine safety.'
  },
  glutes: {
    id: 'glutes',
    name: 'Glutes',
    category: 'back',
    primaryName: 'Gluteus Maximus, Medius & Minimus',
    secondaryMuscles: ['Hamstrings', 'Lower Back'],
    description: 'Power sprinting, hip extension, thrusting, and athletic squat power.'
  },
  hamstrings: {
    id: 'hamstrings',
    name: 'Hamstrings',
    category: 'back',
    primaryName: 'Biceps Femoris & Semitendinosus',
    secondaryMuscles: ['Glutes', 'Calves'],
    description: 'Essential for posterior chain strength, hip extension, and knee flexion.'
  },
  calves: {
    id: 'calves',
    name: 'Calves',
    category: 'back',
    primaryName: 'Gastrocnemius & Soleus',
    secondaryMuscles: ['Ankle Stabilizers'],
    description: 'Build lower leg diamond shape, ankle stability, and jumping spring.'
  }
};

// ==========================================
// 🏋️ GYM WORKOUT EXERCISES (5 per Stage)
// ==========================================
export const STAGE_EXERCISES = {
  chest: {
    Beginner: [
      { name: "Push-Ups", equipment: "Bodyweight", suggestion: "3 Sets × 10-15 Reps", desc: "Fundamental bodyweight exercise for building baseline chest strength." },
      { name: "Incline Push-Ups", equipment: "Bench / Elevated Surface", suggestion: "3 Sets × 12-15 Reps", desc: "Accessible push-up variation that reduces bodyweight load." },
      { name: "Machine Chest Press", equipment: "Chest Press Machine", suggestion: "3 Sets × 12 Reps", desc: "Guided path pressing machine ideal for safe chest activation." },
      { name: "Dumbbell Bench Press", equipment: "Dumbbells & Flat Bench", suggestion: "3 Sets × 10-12 Reps", desc: "Builds pressing control and symmetrical chest development." },
      { name: "Pec Deck Fly", equipment: "Pec Deck Machine", suggestion: "3 Sets × 12-15 Reps", desc: "Isolated machine fly for chest muscle stretch and squeeze." }
    ],
    Intermediate: [
      { name: "Barbell Bench Press", equipment: "Barbell & Flat Bench", suggestion: "4 Sets × 8-10 Reps", desc: "The standard compound builder for overall pectoral mass." },
      { name: "Incline Dumbbell Press", equipment: "Incline Bench & Dumbbells", suggestion: "4 Sets × 8-10 Reps", desc: "Emphasizes upper chest fibers for a full 3D chest shape." },
      { name: "Cable Fly", equipment: "Cable Station", suggestion: "3 Sets × 12 Reps", desc: "Provides continuous cable tension across the full chest range." },
      { name: "Dips", equipment: "Parallel Bars / Dip Station", suggestion: "3 Sets × 8-12 Reps", desc: "Bodyweight lower chest builder that engages triceps and shoulders." },
      { name: "Decline Dumbbell Press", equipment: "Decline Bench & Dumbbells", suggestion: "3 Sets × 10 Reps", desc: "Targets lower pectorals with free weight stabilization." }
    ],
    Advanced: [
      { name: "Heavy Barbell Bench Press", equipment: "Barbell & Flat Bench", suggestion: "5 Sets × 5 Reps", desc: "Maximal strength overload builder for advanced powerlifters." },
      { name: "Incline Barbell Press", equipment: "Incline Bench & Barbell", suggestion: "4 Sets × 6-8 Reps", desc: "Heavy upper chest builder for maximum hypertrophy." },
      { name: "Weighted Dips", equipment: "Dip Station & Belt", suggestion: "4 Sets × 6-8 Reps", desc: "Add external weight to bodyweight dips for intense chest overload." },
      { name: "Pause Bench Press", equipment: "Barbell & Bench", suggestion: "4 Sets × 6 Reps", desc: "Pause 2 seconds at chest level to eliminate stretch reflex power." },
      { name: "Single Arm Cable Press", equipment: "Cable Station", suggestion: "3 Sets × 12 Reps / side", desc: "Unilateral cable pressing for anti-rotational core and chest isolation." }
    ]
  },
  shoulders: {
    Beginner: [
      { name: "Dumbbell Shoulder Press", equipment: "Dumbbells & Chair", suggestion: "3 Sets × 12 Reps", desc: "Essential overhead press for anterior and lateral deltoids." },
      { name: "Lateral Raise", equipment: "Dumbbells", suggestion: "3 Sets × 12-15 Reps", desc: "Isolates side deltoids to create shoulder width and cap shape." },
      { name: "Front Raise", equipment: "Dumbbells", suggestion: "3 Sets × 12 Reps", desc: "Targets front deltoids with controlled anterior arm elevation." },
      { name: "Rear Delt Fly", equipment: "Rear Delt Machine", suggestion: "3 Sets × 15 Reps", desc: "Isolates posterior deltoids to balance shoulder joint posture." },
      { name: "Machine Shoulder Press", equipment: "Shoulder Press Machine", suggestion: "3 Sets × 12 Reps", desc: "Guided overhead machine pressing for beginner shoulder building." }
    ],
    Intermediate: [
      { name: "Overhead Press", equipment: "Barbell", suggestion: "4 Sets × 8 Reps", desc: "The king of shoulder compound movements for overall strength." },
      { name: "Arnold Press", equipment: "Dumbbells", suggestion: "4 Sets × 10 Reps", desc: "Rotational overhead press engaging all three shoulder heads." },
      { name: "Cable Lateral Raise", equipment: "Cable Station", suggestion: "3 Sets × 12-15 Reps", desc: "Continuous cable resistance throughout the side raise motion." },
      { name: "Upright Row", equipment: "EZ-Bar or Dumbbells", suggestion: "3 Sets × 10 Reps", desc: "Targets lateral delts and upper traps with vertical pull." },
      { name: "Face Pulls", equipment: "Cable & Rope Attachment", suggestion: "4 Sets × 15 Reps", desc: "Key movement for rear delts, rotators, and posture health." }
    ],
    Advanced: [
      { name: "Barbell Overhead Press", equipment: "Heavy Barbell", suggestion: "5 Sets × 5 Reps", desc: "Heavy standing press for elite shoulder power and core rigidity." },
      { name: "Push Press", equipment: "Barbell", suggestion: "4 Sets × 6 Reps", desc: "Explosive leg-assisted overhead press for maximal load capacity." },
      { name: "Leaning Cable Lateral Raise", equipment: "Cable Station", suggestion: "4 Sets × 12 Reps", desc: "Adjusted angle cable raise maximizing tension at peak contraction." },
      { name: "Plate Front Raise", equipment: "Weight Plate", suggestion: "3 Sets × 15 Reps", desc: "Sustained front delt burn using heavy weight plate grip." },
      { name: "Seated Dumbbell Press", equipment: "Heavy Dumbbells", suggestion: "4 Sets × 8 Reps", desc: "Strict seated overhead pressing removing momentum completely." }
    ]
  },
  biceps: {
    Beginner: [
      { name: "Dumbbell Curl", equipment: "Dumbbells", suggestion: "3 Sets × 12 Reps", desc: "Fundamental bicep curl for arm flexor growth." },
      { name: "Hammer Curl", equipment: "Dumbbells", suggestion: "3 Sets × 12 Reps", desc: "Targets brachialis and forearms for arm thickness." },
      { name: "Alternating Curl", equipment: "Dumbbells", suggestion: "3 Sets × 12 Reps", desc: "Allows focus on one bicep at a time with supination." },
      { name: "Cable Curl", equipment: "Cable Station", suggestion: "3 Sets × 15 Reps", desc: "Smooth continuous cable tension for bicep isolation." },
      { name: "Concentration Curl", equipment: "Dumbbell & Chair", suggestion: "3 Sets × 12 Reps", desc: "Seated elbow-supported curl for strict peak squeeze." }
    ],
    Intermediate: [
      { name: "EZ-Bar Curl", equipment: "EZ Curl Bar", suggestion: "4 Sets × 10 Reps", desc: "Ergonomic bar path protecting wrists while loading heavy." },
      { name: "Incline Dumbbell Curl", equipment: "Incline Bench & Dumbbells", suggestion: "3 Sets × 10-12 Reps", desc: "Deep stretch on the bicep long head for peak height." },
      { name: "Preacher Curl", equipment: "Preacher Bench & Bar", suggestion: "3 Sets × 10 Reps", desc: "Strict isolation removing all body momentum." },
      { name: "Reverse Curl", equipment: "Barbell / EZ-Bar", suggestion: "3 Sets × 12 Reps", desc: "Overhand grip targeting brachioradialis and forearm size." },
      { name: "Spider Curl", equipment: "Incline Bench", suggestion: "3 Sets × 12 Reps", desc: "Chest supported on bench for intense peak contraction." }
    ],
    Advanced: [
      { name: "Heavy Barbell Curl", equipment: "Straight Barbell", suggestion: "4 Sets × 6-8 Reps", desc: "Classic heavy bicep mass builder for max overload." },
      { name: "Drag Curl", equipment: "Barbell", suggestion: "4 Sets × 10 Reps", desc: "Elbows pulled back dragging bar up torso for peak isolation." },
      { name: "Bayesian Curl", equipment: "Cable Station", suggestion: "3 Sets × 12 Reps", desc: "Facing away from cables for extreme bicep stretch." },
      { name: "Strict Wall Curl", equipment: "Barbell & Wall", suggestion: "3 Sets × 8 Reps", desc: "Back pinned flat against wall eliminating any momentum." },
      { name: "High Cable Curl", equipment: "Dual Cable Station", suggestion: "3 Sets × 15 Reps", desc: "Double arm high cable curl mimicking front bicep pose." }
    ]
  },
  forearms: {
    Beginner: [
      { name: "Wrist Curl", equipment: "Dumbbells", suggestion: "3 Sets × 15 Reps", desc: "Seated wrist flexion for forearm flexor thickness." },
      { name: "Reverse Wrist Curl", equipment: "Dumbbells", suggestion: "3 Sets × 15 Reps", desc: "Overhand wrist extension for forearm extensor growth." },
      { name: "Farmers Walk", equipment: "Heavy Dumbbells", suggestion: "3 Sets × 40 Meters", desc: "Grip strength carry building forearm endurance." },
      { name: "Dead Hang", equipment: "Pull-Up Bar", suggestion: "3 Sets × 45 Seconds", desc: "Passive hang building static grip and hand strength." },
      { name: "Behind Back Wrist Curl", equipment: "Barbell", suggestion: "3 Sets × 15 Reps", desc: "Barbell wrist curl held behind glutes for forearm squeeze." }
    ],
    Intermediate: [
      { name: "Barbell Wrist Curl", equipment: "Barbell & Bench", suggestion: "4 Sets × 12 Reps", desc: "Heavy seated wrist flexor builder." },
      { name: "Barbell Reverse Wrist Curl", equipment: "Barbell & Bench", suggestion: "4 Sets × 12 Reps", desc: "Heavy wrist extension for top forearm mass." },
      { name: "Plate Pinch Hold", equipment: "Two Weight Plates", suggestion: "3 Sets × 30 Seconds", desc: "Pinches two plates together to build thumb & finger strength." },
      { name: "Towel Pull-Up Hang", equipment: "Pull-Up Bar & Towels", suggestion: "3 Sets × Max Time", desc: "Hanging from towels for extreme crush grip challenge." },
      { name: "Hammer Curl to Press", equipment: "Dumbbells", suggestion: "3 Sets × 10 Reps", desc: "Combines brachialis loading with forearm stability." }
    ],
    Advanced: [
      { name: "Heavy Farmers Walk", equipment: "Heavy Trap Bar / Dumbbells", suggestion: "4 Sets × 50 Meters", desc: "Maximal load carry for granite forearm density." },
      { name: "Fat Grip Wrist Curl", equipment: "Barbell & Fat Grips", suggestion: "4 Sets × 10 Reps", desc: "Thick bar diameter doubles forearm muscle activation." },
      { name: "Single Arm Dead Hang", equipment: "Pull-Up Bar", suggestion: "3 Sets × Max Seconds", desc: "Elite unilateral grip test for hand and wrist strength." },
      { name: "Wrist Roller", equipment: "Wrist Roller Apparatus", suggestion: "3 Sets × 3 Rolls", desc: "Winding weight up and down for intense forearm pump." },
      { name: "Leverage Bar Twists", equipment: "Weighted Sledge/Lever", suggestion: "3 Sets × 10 Reps", desc: "Rotational leverage work for total forearm resilience." }
    ]
  },
  abs: {
    Beginner: [
      { name: "Crunches", equipment: "Mat", suggestion: "3 Sets × 15-20 Reps", desc: "Classic upper abdominal flexor builder." },
      { name: "Plank Hold", equipment: "Mat", suggestion: "3 Sets × 45 Seconds", desc: "Static core hold building deep transverse abdominis." },
      { name: "Lying Leg Raise", equipment: "Mat", suggestion: "3 Sets × 12 Reps", desc: "Targets lower abs and hip flexors." },
      { name: "Mountain Climbers", equipment: "Mat", suggestion: "3 Sets × 30 Seconds", desc: "Dynamic core cardio movement." },
      { name: "Dead Bug", equipment: "Mat", suggestion: "3 Sets × 12 Reps", desc: "Opposite arm/leg extension for lumbar stability." }
    ],
    Intermediate: [
      { name: "Hanging Leg Raise", equipment: "Pull-Up Bar", suggestion: "4 Sets × 10-12 Reps", desc: "Gold standard lower ab builder hanging from bar." },
      { name: "Ab Wheel Rollout", equipment: "Ab Wheel", suggestion: "3 Sets × 10 Reps", desc: "Intense eccentric anti-extension core builder." },
      { name: "Cable Crunch", equipment: "Cable Station & Rope", suggestion: "4 Sets × 15 Reps", desc: "Weighted abdominal crunch with cable tension." },
      { name: "Reverse Crunch", equipment: "Incline Bench", suggestion: "3 Sets × 15 Reps", desc: "Lifting hips off bench targeting lower abdominal wall." },
      { name: "Captain Chair Leg Raise", equipment: "Captain Chair Station", suggestion: "3 Sets × 12 Reps", desc: "Supported vertical leg raises for strict ab contraction." }
    ],
    Advanced: [
      { name: "Hanging Toes to Bar", equipment: "Pull-Up Bar", suggestion: "4 Sets × 10 Reps", desc: "Full range ab flexion lifting toes to touch bar." },
      { name: "Standing Ab Wheel Rollout", equipment: "Ab Wheel", suggestion: "3 Sets × 6-8 Reps", desc: "Extreme core strength test rolling out from feet." },
      { name: "Dragon Flag", equipment: "Bench", suggestion: "3 Sets × 6 Reps", desc: "Bruce Lee core exercise holding rigid body lever." },
      { name: "Weighted Hanging Leg Raise", equipment: "Pull-Up Bar & Dumbbell", suggestion: "4 Sets × 8 Reps", desc: "Add dumbbell between feet for weighted ab overload." },
      { name: "RKC Plank Hold", equipment: "Mat", suggestion: "3 Sets × 30 Seconds", desc: "Maximal tension plank squeezing every muscle at 100%." }
    ]
  },
  obliques: {
    Beginner: [
      { name: "Russian Twists", equipment: "Mat", suggestion: "3 Sets × 20 Reps", desc: "Rotational core exercise targeting side obliques." },
      { name: "Side Plank", equipment: "Mat", suggestion: "3 Sets × 30 Sec / side", desc: "Isometric side hold for lateral core stability." },
      { name: "Heel Touches", equipment: "Mat", suggestion: "3 Sets × 20 Reps", desc: "Lateral flexion touching heels for side ab squeeze." },
      { name: "Dumbbell Side Bend", equipment: "Dumbbell", suggestion: "3 Sets × 12 Reps / side", desc: "Standing lateral crunch using dumbbell weight." },
      { name: "Bicycle Crunches", equipment: "Mat", suggestion: "3 Sets × 20 Reps", desc: "Alternating elbow-to-knee rotational crunch." }
    ],
    Intermediate: [
      { name: "Cable Woodchopper", equipment: "Cable Station", suggestion: "4 Sets × 12 Reps / side", desc: "Diagonal cable rotational exercise for obliques." },
      { name: "Hanging Oblique Knee Raise", equipment: "Pull-Up Bar", suggestion: "3 Sets × 12 Reps", desc: "Twisting knee raises hanging from bar." },
      { name: "Weighted Russian Twist", equipment: "Weight Plate / Dumbbell", suggestion: "3 Sets × 16 Reps", desc: "Add external weight to rotational twists." },
      { name: "Side Plank Hip Dips", equipment: "Mat", suggestion: "3 Sets × 12 Reps / side", desc: "Dynamic hip lowering and lifting in side plank." },
      { name: "Landmine Twists", equipment: "Landmine Barbell", suggestion: "3 Sets × 10 Reps / side", desc: "Barbell rotational exercise for torso power." }
    ],
    Advanced: [
      { name: "Heavy Cable Woodchopper", equipment: "Cable Station", suggestion: "4 Sets × 10 Reps / side", desc: "Heavy rotational strength training for obliques." },
      { name: "Hanging Windshield Wipers", equipment: "Pull-Up Bar", suggestion: "3 Sets × 8 Reps / side", desc: "Rotating legs side to side in hanging position." },
      { name: "Saxon Side Bends", equipment: "Dumbbells Overhead", suggestion: "3 Sets × 10 Reps", desc: "Lateral bending with weights held overhead." },
      { name: "Heavy Landmine Rotations", equipment: "Landmine Barbell", suggestion: "4 Sets × 8 Reps", desc: "Explosive athletic core rotation with heavy bar." },
      { name: "Dragon Flag Oblique Twists", equipment: "Bench", suggestion: "3 Sets × 6 Reps", desc: "Rotating torso at peak dragon flag lever position." }
    ]
  },
  quads: {
    Beginner: [
      { name: "Goblet Squat", equipment: "Dumbbell or Kettlebell", suggestion: "3 Sets × 12 Reps", desc: "Upright squat pattern perfect for learning knee tracking." },
      { name: "Bodyweight Squat", equipment: "Bodyweight", suggestion: "3 Sets × 15 Reps", desc: "Baseline squat movement for quad endurance." },
      { name: "Leg Press", equipment: "Leg Press Machine", suggestion: "3 Sets × 12 Reps", desc: "Guided heavy leg pressing without spinal loading." },
      { name: "Leg Extension", equipment: "Leg Extension Machine", suggestion: "3 Sets × 15 Reps", desc: "Isolates quadriceps rectus femoris at full extension." },
      { name: "Walking Lunges", equipment: "Dumbbells", suggestion: "3 Sets × 12 Steps / leg", desc: "Unilateral lunging for leg balance and quad strength." }
    ],
    Intermediate: [
      { name: "Barbell Back Squat", equipment: "Barbell & Squat Rack", suggestion: "4 Sets × 8-10 Reps", desc: "The king of leg exercises for full quad mass." },
      { name: "Front Squat", equipment: "Barbell", suggestion: "4 Sets × 8 Reps", desc: "Barbell placed on front delts for quad focus." },
      { name: "Bulgarian Split Squat", equipment: "Bench & Dumbbells", suggestion: "3 Sets × 10 Reps / leg", desc: "Rear leg elevated split squat for single leg quad strength." },
      { name: "Hack Squat Machine", equipment: "Hack Squat Machine", suggestion: "4 Sets × 10 Reps", desc: "Fixed angle squat machine for deep quad stretch." },
      { name: "Step-Ups", equipment: "Bench & Dumbbells", suggestion: "3 Sets × 10 Reps / leg", desc: "Stepping onto elevated bench driving through front quad." }
    ],
    Advanced: [
      { name: "Heavy Barbell Back Squat", equipment: "Barbell & Rack", suggestion: "5 Sets × 5 Reps", desc: "Maximal strength back squat overload for power." },
      { name: "Heavy Front Squat", equipment: "Barbell", suggestion: "4 Sets × 5 Reps", desc: "Heavy front loaded squat requiring supreme core & quad power." },
      { name: "Pause Squats", equipment: "Barbell & Rack", suggestion: "4 Sets × 6 Reps", desc: "2-second pause at bottom position eliminating momentum." },
      { name: "Deficit Bulgarian Split Squat", equipment: "Bench & Plates", suggestion: "4 Sets × 8 Reps / leg", desc: "Front foot elevated for extreme quad stretch." },
      { name: "Heavy Leg Press Drop Sets", equipment: "Leg Press Machine", suggestion: "3 Sets × 10+10 Reps", desc: "High volume fatigue dropset on leg press." }
    ]
  },
  upper_back: {
    Beginner: [
      { name: "Seated Cable Row", equipment: "Cable Station", suggestion: "3 Sets × 12 Reps", desc: "Guided cable row for mid-back and posture." },
      { name: "Chest Supported Row", equipment: "Incline Bench & Dumbbells", suggestion: "3 Sets × 12 Reps", desc: "Chest supported removing lower back strain completely." },
      { name: "Lat Pulldown (Wide)", equipment: "Lat Pulldown Machine", suggestion: "3 Sets × 12 Reps", desc: "Wide grip pulldown engaging upper back and lats." },
      { name: "Machine Row", equipment: "Row Machine", suggestion: "3 Sets × 12 Reps", desc: "Consistent guided path machine rowing." },
      { name: "Face Pulls", equipment: "Cable Station", suggestion: "3 Sets × 15 Reps", desc: "Targets rear deltoids and rhomboids for upper back health." }
    ],
    Intermediate: [
      { name: "Bent Over Barbell Row", equipment: "Barbell", suggestion: "4 Sets × 8-10 Reps", desc: "Classic free-weight compound row for back thickness." },
      { name: "Single Arm Dumbbell Row", equipment: "Bench & Dumbbell", suggestion: "3 Sets × 10 Reps / side", desc: "Heavy unilateral rowing with bench support." },
      { name: "T-Bar Row", equipment: "T-Bar Machine / Landmine", suggestion: "4 Sets × 10 Reps", desc: "Close neutral grip for mid-back and trap thickness." },
      { name: "Inverted Row", equipment: "Smith Machine / Bar", suggestion: "3 Sets × 12 Reps", desc: "Bodyweight pull up to bar building upper back control." },
      { name: "Meadows Row", equipment: "Landmine", suggestion: "3 Sets × 10 Reps / side", desc: "Overhand grip landmine row targeting upper back density." }
    ],
    Advanced: [
      { name: "Heavy Pendlay Row", equipment: "Barbell", suggestion: "4 Sets × 6 Reps", desc: "Strict barbell row starting every rep from dead floor stop." },
      { name: "Heavy T-Bar Row", equipment: "T-Bar Station", suggestion: "4 Sets × 6-8 Reps", desc: "Maximal load T-bar row for thick upper back muscle." },
      { name: "Weighted Inverted Row", equipment: "Bar & Weight Vest/Plate", suggestion: "4 Sets × 8 Reps", desc: "Add external weight to bodyweight inverted rows." },
      { name: "Kroc Rows", equipment: "Heavy Dumbbell", suggestion: "3 Sets × 15-20 Reps", desc: "High rep heavy dumbbell row for back mass and grip toughness." },
      { name: "Seal Row", equipment: "Flat Elevated Bench & Barbell", suggestion: "4 Sets × 8 Reps", desc: "Lying flat on high bench for zero-cheat upper back rowing." }
    ]
  },
  lats: {
    Beginner: [
      { name: "Lat Pulldown", equipment: "Lat Machine", suggestion: "3 Sets × 12 Reps", desc: "Standard vertical pull for building lat width." },
      { name: "Underhand Lat Pulldown", equipment: "Lat Machine", suggestion: "3 Sets × 12 Reps", desc: "Supinated grip engaging lower lat fibers and biceps." },
      { name: "Straight Arm Pulldown", equipment: "Cable & Bar", suggestion: "3 Sets × 12 Reps", desc: "Isolates lats in standing position without bicep fatigue." },
      { name: "Assisted Pull-Ups", equipment: "Assisted Machine / Band", suggestion: "3 Sets × 10 Reps", desc: "Machine counterweight assist for learning pull-ups." },
      { name: "Single Arm Cable Pulldown", equipment: "Cable Station", suggestion: "3 Sets × 12 Reps / side", desc: "Unilateral cable pulldown for lat stretch and squeeze." }
    ],
    Intermediate: [
      { name: "Pull-Ups", equipment: "Pull-Up Bar", suggestion: "4 Sets × 8-10 Reps", desc: "The ultimate bodyweight exercise for V-taper lat width." },
      { name: "Chin-Ups", equipment: "Pull-Up Bar", suggestion: "4 Sets × 8-10 Reps", desc: "Underhand grip pull-up recruiting lats and biceps strongly." },
      { name: "Neutral Grip Pulldown", equipment: "Cable Station & Parallel Handles", suggestion: "4 Sets × 10 Reps", desc: "Parallel grip for deep lat stretch and joint comfort." },
      { name: "Dumbbell Pullover", equipment: "Bench & Dumbbell", suggestion: "3 Sets × 12 Reps", desc: "Lying across bench for long head lat and ribcage stretch." },
      { name: "Single Arm Dumbbell Row (Lat Focus)", equipment: "Bench & Dumbbell", suggestion: "3 Sets × 10 Reps", desc: "Rowing towards hip socket to isolate lower lat sweep." }
    ],
    Advanced: [
      { name: "Weighted Pull-Ups", equipment: "Pull-Up Bar & Belt", suggestion: "4 Sets × 6 Reps", desc: "Add heavy weight plates to pull-ups for maximum lat mass." },
      { name: "Weighted Chin-Ups", equipment: "Pull-Up Bar & Belt", suggestion: "4 Sets × 6 Reps", desc: "Heavy weighted chin-ups for explosive upper pulling power." },
      { name: "Single Arm Lat Pulldown (Heavy)", equipment: "Cable Station", suggestion: "4 Sets × 8 Reps / side", desc: "Heavy unilateral lat pulldown for full range of motion." },
      { name: "Gironda Sternum Chins", equipment: "Pull-Up Bar", suggestion: "3 Sets × 8 Reps", desc: "Arched pull-up touching lower chest/sternum to bar." },
      { name: "Cable Pullover", equipment: "Cable & Rope", suggestion: "4 Sets × 12 Reps", desc: "Constant cable tension pullover isolating full lat sweep." }
    ]
  },
  traps: {
    Beginner: [
      { name: "Dumbbell Shrugs", equipment: "Dumbbells", suggestion: "3 Sets × 15 Reps", desc: "Basic shoulder elevation for upper trap growth." },
      { name: "Barbell Shrugs", equipment: "Barbell", suggestion: "3 Sets × 12 Reps", desc: "Standing barbell shrug for heavy trap loading." },
      { name: "Machine Shrugs", equipment: "Shrug Machine", suggestion: "3 Sets × 15 Reps", desc: "Guided machine shrug for isolated trap squeeze." },
      { name: "Cable Shrugs", equipment: "Cable Station", suggestion: "3 Sets × 15 Reps", desc: "Continuous cable tension pulling up and slightly back." },
      { name: "Seated Dumbbell Shrugs", equipment: "Bench & Dumbbells", suggestion: "3 Sets × 15 Reps", desc: "Seated position removing leg bounce." }
    ],
    Intermediate: [
      { name: "Heavy Barbell Shrugs", equipment: "Barbell & Rack", suggestion: "4 Sets × 10 Reps", desc: "Heavy barbell shrugs with 2-second hold at peak." },
      { name: "Behind the Back Barbell Shrug", equipment: "Barbell", suggestion: "3 Sets × 12 Reps", desc: "Barbell behind glutes for middle trap engagement." },
      { name: "Farmer's Walk (Trap Focus)", equipment: "Heavy Dumbbells", suggestion: "3 Sets × 50 Meters", desc: "Heavy carry forcing isometric trap stabilization." },
      { name: "Upright Row (Wide Grip)", equipment: "Barbell", suggestion: "3 Sets × 10 Reps", desc: "Wide grip pull targeting upper traps and side delts." },
      { name: "Incline Dumbbell Shrug", equipment: "Incline Bench & Dumbbells", suggestion: "3 Sets × 12 Reps", desc: "Chest supported on bench targeting mid and upper traps." }
    ],
    Advanced: [
      { name: "Power Shrugs", equipment: "Barbell & Rack", suggestion: "5 Sets × 6 Reps", desc: "Explosive heavy barbell shrug using slight hip pop." },
      { name: "Heavy Farmers Carry", equipment: "Trap Bar / Heavy DBs", suggestion: "4 Sets × 60 Meters", desc: "Maximal load carry for granite trap density." },
      { name: "Kelso Shrugs", equipment: "Incline Bench & Dumbbells", suggestion: "4 Sets × 12 Reps", desc: "Retracting shoulder blades on incline bench isolating mid traps." },
      { name: "Overhead Barbell Shrugs", equipment: "Barbell Held Overhead", suggestion: "3 Sets × 12 Reps", desc: "Shrugging barbell overhead targeting lower/mid trap fibers." },
      { name: "Snatch Grip High Pull", equipment: "Barbell", suggestion: "4 Sets × 6 Reps", desc: "Explosive Olympic pull developing massive upper back traps." }
    ]
  },
  triceps: {
    Beginner: [
      { name: "Triceps Rope Pushdown", equipment: "Cable Station & Rope", suggestion: "3 Sets × 12-15 Reps", desc: "Classic cable pushdown with rope lockout." },
      { name: "Bench Dips", equipment: "Flat Bench", suggestion: "3 Sets × 12 Reps", desc: "Bodyweight dip using bench support for triceps." },
      { name: "Overhead Dumbbell Extension", equipment: "Dumbbell & Bench", suggestion: "3 Sets × 12 Reps", desc: "Targets long head of triceps with overhead stretch." },
      { name: "Bar Pushdown", equipment: "Cable & Straight Bar", suggestion: "3 Sets × 12 Reps", desc: "Straight bar pushdown for triceps lateral head." },
      { name: "Triceps Kickbacks", equipment: "Dumbbells & Bench", suggestion: "3 Sets × 15 Reps", desc: "Bent over dumbbell lockout for triceps squeeze." }
    ],
    Intermediate: [
      { name: "Skull Crushers", equipment: "EZ-Bar & Bench", suggestion: "4 Sets × 10 Reps", desc: "Lying triceps extension to forehead for triceps mass." },
      { name: "Close Grip Bench Press", equipment: "Barbell & Bench", suggestion: "4 Sets × 8 Reps", desc: "Compound bench press with narrow grip focusing on triceps." },
      { name: "Single Arm Cable Extension", equipment: "Cable Station", suggestion: "3 Sets × 12 Reps / side", desc: "Unilateral cable isolation for triceps definition." },
      { name: "Dips (Triceps Focus)", equipment: "Dip Bars", suggestion: "3 Sets × 10 Reps", desc: "Upright dips keeping torso vertical for triceps." },
      { name: "Incline EZ-Bar Extension", equipment: "Incline Bench & Bar", suggestion: "3 Sets × 10 Reps", desc: "Incline angle increases stretch on long head." }
    ],
    Advanced: [
      { name: "Heavy Close Grip Bench Press", equipment: "Barbell & Bench", suggestion: "5 Sets × 5 Reps", desc: "Max overload pressing strength for triceps mass." },
      { name: "Weighted Dips (Triceps)", equipment: "Dip Station & Belt", suggestion: "4 Sets × 6 Reps", desc: "Heavy weighted dips for explosive triceps lockout." },
      { name: "Heavy Skull Crushers", equipment: "EZ-Bar & Bench", suggestion: "4 Sets × 6-8 Reps", desc: "Heavy lying extensions building deep triceps density." },
      { name: "JM Press", equipment: "Barbell & Bench", suggestion: "4 Sets × 8 Reps", desc: "Hybrid bench press and skullcrusher used by powerlifters." },
      { name: "Overhead Cable Extension (Rope)", equipment: "Cable Station", suggestion: "4 Sets × 12 Reps", desc: "Constant overhead cable stretch for long head sweep." }
    ]
  },
  lower_back: {
    Beginner: [
      { name: "Hyperextensions", equipment: "45-Degree Bench", suggestion: "3 Sets × 15 Reps", desc: "Controlled back extensions for lower back health." },
      { name: "Superman Hold", equipment: "Mat", suggestion: "3 Sets × 30 Seconds", desc: "Isometric floor hold strengthening spinal erectors." },
      { name: "Good Mornings (Light)", equipment: "Barbell / PVC", suggestion: "3 Sets × 12 Reps", desc: "Hip hinge movement for lower back & hamstrings." },
      { name: "Bird-Dog", equipment: "Mat", suggestion: "3 Sets × 12 Reps", desc: "Cross-body stabilization for spine and core." },
      { name: "Back Extension Machine", equipment: "Extension Machine", suggestion: "3 Sets × 15 Reps", desc: "Guided machine extension for lower back." }
    ],
    Intermediate: [
      { name: "Conventional Deadlift", equipment: "Barbell & Plates", suggestion: "4 Sets × 6-8 Reps", desc: "The ultimate posterior chain and lower back builder." },
      { name: "Barbell Good Mornings", equipment: "Barbell & Rack", suggestion: "3 Sets × 10 Reps", desc: "Barbell hip hinge strengthening full spinal column." },
      { name: "Weighted Hyperextensions", equipment: "Bench & Weight Plate", suggestion: "3 Sets × 12 Reps", desc: "Holding weight plate against chest for lower back overload." },
      { name: "Rack Pulls (Below Knee)", equipment: "Barbell & Rack", suggestion: "4 Sets × 8 Reps", desc: "Partial deadlift focusing on lower back and trap lockout." },
      { name: "Single Leg Romanian Deadlift", equipment: "Dumbbells", suggestion: "3 Sets × 10 Reps / leg", desc: "Unilateral hip hinge building lower back stability." }
    ],
    Advanced: [
      { name: "Heavy Conventional Deadlift", equipment: "Barbell & Plates", suggestion: "5 Sets × 3-5 Reps", desc: "Maximal deadlift strength for unbreakable spinal erectors." },
      { name: "Deficit Deadlift", equipment: "Barbell & Raised Plate", suggestion: "4 Sets × 5 Reps", desc: "Standing on plate increases pull distance and lower back work." },
      { name: "Heavy Barbell Good Mornings", equipment: "Barbell & Rack", suggestion: "4 Sets × 6 Reps", desc: "Heavy hip hinge building dense lower back muscle." },
      { name: "Pause Deadlifts", equipment: "Barbell & Plates", suggestion: "4 Sets × 4 Reps", desc: "Pause 2 seconds off floor for lower back static tension." },
      { name: "Jefferson Curls", equipment: "Light Barbell / Dumbbell", suggestion: "3 Sets × 10 Reps", desc: "Segmental spine flexion and extension for spinal mobility & resilience." }
    ]
  },
  glutes: {
    Beginner: [
      { name: "Glute Bridges", equipment: "Mat", suggestion: "3 Sets × 15 Reps", desc: "Floor hip thrust for glute activation." },
      { name: "Cable Kickbacks", equipment: "Cable Station", suggestion: "3 Sets × 15 Reps / leg", desc: "Isolates gluteus maximus with cable pull." },
      { name: "Bodyweight Reverse Lunges", equipment: "Bodyweight", suggestion: "3 Sets × 12 Reps / leg", desc: "Stepping back to load front glute and quad." },
      { name: "Abductor Machine", equipment: "Hip Abductor Machine", suggestion: "3 Sets × 15 Reps", desc: "Seated machine isolation for glute medius." },
      { name: "Step-Ups", equipment: "Bench", suggestion: "3 Sets × 12 Reps / leg", desc: "Step up driving through heel for glute engagement." }
    ],
    Intermediate: [
      { name: "Barbell Hip Thrust", equipment: "Bench & Barbell", suggestion: "4 Sets × 10-12 Reps", desc: "The premier exercise for maximum glute mass and strength." },
      { name: "Bulgarian Split Squat (Glute Bias)", equipment: "Bench & Dumbbells", suggestion: "3 Sets × 10 Reps / leg", desc: "Leaning forward slightly to load working glute deeply." },
      { name: "Sumo Deadlift", equipment: "Barbell & Plates", suggestion: "4 Sets × 8 Reps", desc: "Wide stance deadlift recruiting glutes and inner thighs." },
      { name: "Romanian Deadlift (Glute Focus)", equipment: "Barbell / Dumbbells", suggestion: "4 Sets × 10 Reps", desc: "Pushing hips back for deep glute and hamstring stretch." },
      { name: "Cable Pull-Throughs", equipment: "Cable Station & Rope", suggestion: "3 Sets × 12 Reps", desc: "Standing cable hip hinge with glute squeeze at top." }
    ],
    Advanced: [
      { name: "Heavy Barbell Hip Thrust", equipment: "Bench & Heavy Bar", suggestion: "5 Sets × 6 Reps", desc: "Maximal load hip thrust for massive glute power." },
      { name: "Single Leg Barbell Hip Thrust", equipment: "Bench & Bar / DB", suggestion: "4 Sets × 8 Reps / leg", desc: "Unilateral hip thrust eliminating strength imbalances." },
      { name: "Heavy Sumo Deadlift", equipment: "Barbell & Plates", suggestion: "5 Sets × 5 Reps", desc: "Heavy wide stance pull for maximum hip extension power." },
      { name: "Deficit Reverse Lunges", equipment: "Plate & Heavy Dumbbells", suggestion: "4 Sets × 8 Reps / leg", desc: "Stepping off raised plate for deeper glute stretch." },
      { name: "Banded Heavy Hip Thrusts", equipment: "Bench, Barbell & Band", suggestion: "4 Sets × 10 Reps", desc: "Combines barbell weight with band tension for peak glute lockout." }
    ]
  },
  hamstrings: {
    Beginner: [
      { name: "Lying Leg Curl", equipment: "Leg Curl Machine", suggestion: "3 Sets × 12 Reps", desc: "Machine isolation for hamstring knee flexion." },
      { name: "Seated Leg Curl", equipment: "Leg Curl Machine", suggestion: "3 Sets × 12 Reps", desc: "Seated machine curl stretching hamstrings at hip." },
      { name: "Dumbbell Romanian Deadlift", equipment: "Dumbbells", suggestion: "3 Sets × 12 Reps", desc: "Basic hip hinge for hamstring stretch and strength." },
      { name: "Glute-Ham Bridge Walkouts", equipment: "Mat", suggestion: "3 Sets × 10 Reps", desc: "Walking feet out in bridge position for hamstring engagement." },
      { name: "Kettlebell Swings", equipment: "Kettlebell", suggestion: "3 Sets × 15 Reps", desc: "Dynamic hip hinge for posterior chain speed." }
    ],
    Intermediate: [
      { name: "Barbell Romanian Deadlift", equipment: "Barbell & Plates", suggestion: "4 Sets × 8-10 Reps", desc: "Gold standard hamstring builder for deep stretch and size." },
      { name: "Single Leg Dumbbell RDL", equipment: "Dumbbell", suggestion: "3 Sets × 10 Reps / leg", desc: "Unilateral hip hinge improving hamstring balance." },
      { name: "Glute Ham Raise (GHR)", equipment: "GHD Machine", suggestion: "3 Sets × 8 Reps", desc: "Bodyweight hamstring curl using GHD apparatus." },
      { name: "Good Mornings", equipment: "Barbell", suggestion: "3 Sets × 10 Reps", desc: "Barbell on back hinging at hips for hamstring load." },
      { name: "Sumo Dumbbell Squat", equipment: "Heavy Dumbbell", suggestion: "3 Sets × 12 Reps", desc: "Wide stance squat pulling through hamstrings and glutes." }
    ],
    Advanced: [
      { name: "Nordic Hamstring Curl", equipment: "Partner / Ankle Anchor", suggestion: "4 Sets × 6 Reps", desc: "Elite bodyweight eccentric hamstring exercise for injury proofing." },
      { name: "Heavy Barbell RDL", equipment: "Barbell & Heavy Plates", suggestion: "4 Sets × 6 Reps", desc: "Heavy loaded Romanian deadlifts for dense hamstrings." },
      { name: "Weighted Glute Ham Raise", equipment: "GHD & Weight Plate", suggestion: "4 Sets × 6 Reps", desc: "Holding plate to chest during GHD knee flexions." },
      { name: "Stiff-Legged Deadlift", equipment: "Barbell on Block", suggestion: "4 Sets × 6 Reps", desc: "Minimal knee bend deadlift for maximum hamstring isolation." },
      { name: "Single Leg Cable Hamstring Curl", equipment: "Cable Station", suggestion: "3 Sets × 12 Reps / leg", desc: "Unilateral standing cable leg curl for hamstring peak." }
    ]
  },
  calves: {
    Beginner: [
      { name: "Standing Calf Raise", equipment: "Calf Machine / Block", suggestion: "3 Sets × 15-20 Reps", desc: "Primary gastrocnemius builder with full ankle flex." },
      { name: "Seated Calf Raise", equipment: "Seated Calf Machine", suggestion: "3 Sets × 15 Reps", desc: "Targets soleus muscle with knees bent at 90 degrees." },
      { name: "Dumbbell Single Leg Calf Raise", equipment: "Dumbbell & Step", suggestion: "3 Sets × 12 Reps / leg", desc: "Unilateral calf raise on elevated step." },
      { name: "Leg Press Calf Press", equipment: "Leg Press Machine", suggestion: "3 Sets × 15 Reps", desc: "Pressing through toes on leg press sled." },
      { name: "Bodyweight Calf Raises", equipment: "Floor", suggestion: "3 Sets × 20 Reps", desc: "High rep floor calf raises for endurance." }
    ],
    Intermediate: [
      { name: "Barbell Standing Calf Raise", equipment: "Barbell & Block", suggestion: "4 Sets × 12 Reps", desc: "Heavy standing calf raises with barbell on back." },
      { name: "Heavy Seated Calf Raise", equipment: "Seated Machine", suggestion: "4 Sets × 12 Reps", desc: "Heavy loaded soleus builder." },
      { name: "Donkey Calf Raise", equipment: "Donkey Calf Machine / Partner", suggestion: "3 Sets × 15 Reps", desc: "Hips bent 90 degrees for deep gastrocnemius stretch." },
      { name: "Single Leg Leg Press Calf Press", equipment: "Leg Press Machine", suggestion: "3 Sets × 12 Reps / leg", desc: "Unilateral sled calf press." },
      { name: "Smith Machine Calf Raise", equipment: "Smith Machine & Step", suggestion: "4 Sets × 12 Reps", desc: "Guided heavy calf raises on block." }
    ],
    Advanced: [
      { name: "Heavy Standing Calf Raise (Pause)", equipment: "Standing Machine", suggestion: "4 Sets × 10 Reps (2s pause)", desc: "2-second pause at bottom stretch eliminating Achilles bounce." },
      { name: "Heavy Barbell Calf Raise", equipment: "Barbell & Block", suggestion: "5 Sets × 8 Reps", desc: "Maximal load standing barbell calf overload." },
      { name: "Heavy Donkey Calf Raise", equipment: "Machine & Weight", suggestion: "4 Sets × 12 Reps", desc: "Heavy donkey raises for full lower leg diamond shape." },
      { name: "Slow Eccentric Single Leg Calf Raise", equipment: "Step & Dumbbell", suggestion: "3 Sets × 10 Reps (5s down)", desc: "5-second negative phase for intense calf hypertrophy." },
      { name: "Tibialis Raises", equipment: "Tib Bar / Kettlebell", suggestion: "3 Sets × 15 Reps", desc: "Strengthens anterior tibialis for complete lower leg balance." }
    ]
  }
};

// ==========================================
// 🏠 HOME WORKOUT EXERCISES (6 per Stage)
// ==========================================
export const HOME_STAGE_EXERCISES = {
  chest: {
    Beginner: [
      { name: "Wall Push-Ups", equipment: "Bodyweight / Wall", suggestion: "3 Sets × 12-15 Reps", desc: "Accessible vertical push-up variation ideal for baseline chest activation." },
      { name: "Incline Push-Ups", equipment: "Chair / Sofa Support", suggestion: "3 Sets × 12 Reps", desc: "Hands elevated on a chair or couch to reduce bodyweight load." },
      { name: "Knee Push-Ups", equipment: "Bodyweight / No Equipment", suggestion: "3 Sets × 10-12 Reps", desc: "Modified floor push-up targeting pectorals and triceps safely." },
      { name: "Standard Push-Ups", equipment: "Bodyweight / No Equipment", suggestion: "3 Sets × 10-12 Reps", desc: "Classic horizontal pressing movement for overall chest mass." },
      { name: "Chair Isometric Squeeze", equipment: "Chair / No Equipment", suggestion: "3 Sets × 30 sec Hold", desc: "Press palms together against rigid chair frame for isometric chest tension." },
      { name: "Floor Press with Dumbbells", equipment: "Dumbbells / Floor", suggestion: "3 Sets × 12 Reps", desc: "Dumbbell pressing from the floor without needing a gym bench." }
    ],
    Intermediate: [
      { name: "Standard Push-Ups", equipment: "Bodyweight / No Equipment", suggestion: "4 Sets × 12-15 Reps", desc: "Core bodyweight builder for middle chest mass and endurance." },
      { name: "Decline Push-Ups", equipment: "Chair / Sofa Support", suggestion: "4 Sets × 10-12 Reps", desc: "Feet elevated on a chair to place extra emphasis on upper chest." },
      { name: "Diamond Push-Ups", equipment: "Bodyweight / No Equipment", suggestion: "3 Sets × 10-12 Reps", desc: "Narrow hand placement targeting inner chest cleavage and triceps." },
      { name: "Tempo Push-Ups", equipment: "Bodyweight / No Equipment", suggestion: "3 Sets × 10 Reps (3s down)", desc: "Slow 3-second eccentric lowering phase for maximum time under tension." },
      { name: "Dumbbell Floor Press", equipment: "Dumbbells / Floor", suggestion: "4 Sets × 10-12 Reps", desc: "Progressive dumbbell floor pressing for symmetrical chest strength." },
      { name: "Resistance Band Chest Press", equipment: "Resistance Band", suggestion: "3 Sets × 12-15 Reps", desc: "Band wrapped around upper back providing smooth peak chest contraction." }
    ],
    Advanced: [
      { name: "Archer Push-Ups", equipment: "Bodyweight / No Equipment", suggestion: "4 Sets × 8-10 Reps / side", desc: "Unilateral bodyweight push-up shifting load dynamically onto single chest side." },
      { name: "Plyometric Explosive Push-Ups", equipment: "Bodyweight / No Equipment", suggestion: "4 Sets × 8-10 Reps", desc: "Explosive push off the floor developing fast-twitch chest power." },
      { name: "High-Decline Push-Ups", equipment: "High Chair / Desk", suggestion: "4 Sets × 12 Reps", desc: "Steep decline angle focusing heavy bodyweight load onto upper pectorals." },
      { name: "Pseudo Planche Push-Ups", equipment: "Bodyweight / No Equipment", suggestion: "4 Sets × 8-10 Reps", desc: "Hands turned back with shoulders leaned far forward for intense chest load." },
      { name: "Single-Arm Push-Up Progression", equipment: "Bodyweight / Chair Support", suggestion: "3 Sets × 6-8 Reps / side", desc: "Peak unilateral pressing strength exercise for advanced athletes." },
      { name: "Resistance Band Chest Fly", equipment: "Resistance Band / Door Anchor", suggestion: "4 Sets × 12-15 Reps", desc: "High-tension band flyes anchored to door frame for chest isolation." }
    ]
  },
  shoulders: {
    Beginner: [
      { name: "Knee Pike Push-Ups", equipment: "Bodyweight / No Equipment", suggestion: "3 Sets × 10-12 Reps", desc: "Angled bodyweight press targeting front and side deltoids." },
      { name: "Seated Dumbbell Press (Chair)", equipment: "Dumbbells & Chair", suggestion: "3 Sets × 12 Reps", desc: "Overhead dumbbell press using a sturdy household chair for back support." },
      { name: "Lateral Arm Circles & Holds", equipment: "Bodyweight / No Equipment", suggestion: "3 Sets × 45 Seconds", desc: "Isometric and dynamic rotational arm holds for side shoulder burn." },
      { name: "Resistance Band Lateral Raise", equipment: "Resistance Band", suggestion: "3 Sets × 12-15 Reps", desc: "Standing on band to isolate side deltoid caps." },
      { name: "Incline Y-T-W Floor Raises", equipment: "Bodyweight / Floor Mat", suggestion: "3 Sets × 12 Reps", desc: "Floor prone raises activating rear delts and rotator cuffs." },
      { name: "Dumbbell Front Raises", equipment: "Dumbbells / Water Bottles", suggestion: "3 Sets × 12 Reps", desc: "Controlled front arm raises for anterior shoulder development." }
    ],
    Intermediate: [
      { name: "Standard Pike Push-Ups", equipment: "Bodyweight / No Equipment", suggestion: "4 Sets × 10-12 Reps", desc: "Body in inverted V-shape transferring bodyweight to shoulders." },
      { name: "Standing Dumbbell Overhead Press", equipment: "Dumbbells", suggestion: "4 Sets × 10 Reps", desc: "Standing overhead press recruiting shoulder strength and core stability." },
      { name: "Resistance Band Overhead Press", equipment: "Resistance Band", suggestion: "3 Sets × 12-15 Reps", desc: "Continuous ascending tension through overhead lockout." },
      { name: "Dumbbell Rear Delt Flyes", equipment: "Dumbbells & Chair Support", suggestion: "4 Sets × 12 Reps", desc: "Bent-over flyes isolating posterior deltoids for shoulder balance." },
      { name: "Arnold Press (Chair)", equipment: "Dumbbells & Chair", suggestion: "3 Sets × 10 Reps", desc: "Seated rotational press engaging all three shoulder heads." },
      { name: "Door-Anchored Band Face Pulls", equipment: "Resistance Band & Door Anchor", suggestion: "4 Sets × 15 Reps", desc: "Band face pulls anchored to door for rear delts and posture." }
    ],
    Advanced: [
      { name: "Feet-Elevated Pike Push-Ups", equipment: "Chair Support / Sofa", suggestion: "4 Sets × 10-12 Reps", desc: "Feet elevated on chair increasing load on shoulder girdle." },
      { name: "Wall Handstand Hold", equipment: "Bodyweight / Wall", suggestion: "4 Sets × 30-45 Sec Hold", desc: "Handstand against wall building extreme overhead shoulder stability." },
      { name: "Heavy Dumbbell Overhead Press", equipment: "Dumbbells", suggestion: "4 Sets × 8 Reps", desc: "Maximal home dumbbell overhead pressing for shoulder power." },
      { name: "Band-Resisted Pike Push-Ups", equipment: "Resistance Band & Bodyweight", suggestion: "4 Sets × 8 Reps", desc: "Band added across back during pike push-ups for extra resistance." },
      { name: "Lateral Raise Drop-Sets (Band + DB)", equipment: "Resistance Band & Dumbbells", suggestion: "3 Sets × 12+12 Reps", desc: "Combine dumbbells and band for relentless side delt fatigue." },
      { name: "Wall Handstand Push-Up Progression", equipment: "Bodyweight / Wall", suggestion: "3 Sets × 5-8 Reps", desc: "Peak inverted bodyweight shoulder pressing against wall." }
    ]
  },
  biceps: {
    Beginner: [
      { name: "Resistance Band Bicep Curls", equipment: "Resistance Band", suggestion: "3 Sets × 12-15 Reps", desc: "Smooth band curls providing continuous bicep tension." },
      { name: "Dumbbell Seated Curls (Chair)", equipment: "Dumbbells & Chair", suggestion: "3 Sets × 12 Reps", desc: "Strict seated curls eliminating momentum." },
      { name: "Doorframe Bodyweight Row (Underhand)", equipment: "Doorframe / Door", suggestion: "3 Sets × 10-12 Reps", desc: "Bodyweight pulling using doorframe with underhand grip for biceps." },
      { name: "Towel Isometric Bicep Squeeze", equipment: "Towel & Door/Foot", suggestion: "3 Sets × 30 sec Hold", desc: "Maximal static bicep contraction pulling against a towel." },
      { name: "Dumbbell Hammer Curls", equipment: "Dumbbells", suggestion: "3 Sets × 12 Reps", desc: "Neutral grip curling for forearm and brachialis thickness." },
      { name: "Band Concentration Curls", equipment: "Resistance Band & Chair", suggestion: "3 Sets × 12 Reps", desc: "Elbow anchored against inner thigh for bicep peak isolation." }
    ],
    Intermediate: [
      { name: "Dumbbell Alternating Curls", equipment: "Dumbbells", suggestion: "4 Sets × 10-12 Reps", desc: "Classic standing curls with wrist supination at top." },
      { name: "Resistance Band Hammer Curls", equipment: "Resistance Band", suggestion: "4 Sets × 12 Reps", desc: "Neutral grip band curls for arm thickness." },
      { name: "Underhand Table Inverted Row", equipment: "Sturdy Table / Desk", suggestion: "3 Sets × 10 Reps", desc: "Bodyweight inverted row under sturdy table with underhand grip." },
      { name: "Dumbbell Concentration Curls", equipment: "Dumbbells & Chair", suggestion: "3 Sets × 10 Reps", desc: "Strict seated isolation targeting bicep peak." },
      { name: "Band Peak-Contraction Hold Curls", equipment: "Resistance Band", suggestion: "3 Sets × 10 Reps (2s hold)", desc: "Hold 2 seconds at peak squeeze on every rep." },
      { name: "Dumbbell Zottman Curls", equipment: "Dumbbells", suggestion: "3 Sets × 10 Reps", desc: "Curl up palms up, rotate and lower palms down for total arm load." }
    ],
    Advanced: [
      { name: "Underhand Door Chin-Ups", equipment: "Door Pull-Up Bar / Ledge", suggestion: "4 Sets × 8-10 Reps", desc: "Bodyweight pull-ups with underhand grip for bicep overload." },
      { name: "Heavy Dumbbell Hammer Curls", equipment: "Heavy Dumbbells", suggestion: "4 Sets × 8 Reps", desc: "Heavy neutral grip curls for maximal brachialis size." },
      { name: "Band Preacher-Style Curls (Chair)", equipment: "Resistance Band & Chair", suggestion: "4 Sets × 12 Reps", desc: "Arm rested over back of chair mimicking preacher bench." },
      { name: "Dumbbell Drag Curls", equipment: "Dumbbells", suggestion: "4 Sets × 10 Reps", desc: "Elbows pulled backward dragging dumbbells up body line." },
      { name: "21s Bicep Curls (Band / DBs)", equipment: "Dumbbells or Band", suggestion: "3 Sets × 21 Reps (7 bottom, 7 top, 7 full)", desc: "Famous 21-rep partial and full range bicep protocol." },
      { name: "Eccentric Slow Dumbbell Curls", equipment: "Dumbbells", suggestion: "3 Sets × 8 Reps (5s down)", desc: "5-second lowering negative phase for maximum bicep muscle damage." }
    ]
  },
  forearms: {
    Beginner: [
      { name: "Dumbbell Wrist Curls (Chair)", equipment: "Dumbbells & Chair", suggestion: "3 Sets × 15 Reps", desc: "Seated wrist flexion over knees building inner forearm flexors." },
      { name: "Dumbbell Reverse Wrist Curls", equipment: "Dumbbells & Chair", suggestion: "3 Sets × 15 Reps", desc: "Overhand wrist extension building top forearm extensors." },
      { name: "Isometric Towel Squeeze", equipment: "Towel", suggestion: "3 Sets × 45 Seconds", desc: "Tightly squeezing a rolled wet towel for hand & forearm grip." },
      { name: "Fingertip Plank Hold", equipment: "Bodyweight / Floor", suggestion: "3 Sets × 30 Seconds", desc: "Plank supported on fingertips for hand & finger strength." },
      { name: "Resistance Band Wrist Curls", equipment: "Resistance Band", suggestion: "3 Sets × 15 Reps", desc: "Smooth band wrist flexions for joint health." },
      { name: "Dumbbell Farmer Carry (Home)", equipment: "Dumbbells / Water Jugs", suggestion: "3 Sets × 45 Seconds Walk", desc: "Carrying heavy weights around home for static grip endurance." }
    ],
    Intermediate: [
      { name: "Seated Dumbbell Wrist Curls", equipment: "Dumbbells & Chair", suggestion: "4 Sets × 12-15 Reps", desc: "Heavy seated wrist flexions for forearm mass." },
      { name: "Dumbbell Reverse Curls", equipment: "Dumbbells", suggestion: "4 Sets × 12 Reps", desc: "Overhand bicep curl targeting brachioradialis and forearms." },
      { name: "Towel Door Hang / Hold", equipment: "Towel & Door", suggestion: "3 Sets × Max Time", desc: "Hanging from towel draped over door for crush grip challenge." },
      { name: "Band Reverse Wrist Extensions", equipment: "Resistance Band", suggestion: "3 Sets × 15 Reps", desc: "High-rep band extensions building wrist extensor thickness." },
      { name: "Dumbbell Pinch Grip Hold", equipment: "Dumbbell / Books", suggestion: "3 Sets × 30 Seconds", desc: "Holding heavy dumbbell head by fingertips to build pinch strength." },
      { name: "Heavy Water Jug Farmers Carry", equipment: "Heavy Water Jugs", suggestion: "3 Sets × 60 Seconds Walk", desc: "Heavy loaded carry building forearm density." }
    ],
    Advanced: [
      { name: "Heavy Dumbbell Wrist Curls", equipment: "Heavy Dumbbells", suggestion: "4 Sets × 10 Reps", desc: "Maximal load wrist flexions for dense forearm muscles." },
      { name: "Slow Eccentric Reverse Wrist Curls", equipment: "Dumbbells", suggestion: "4 Sets × 10 Reps (4s down)", desc: "Slow negative lowering phase for forearm extensor growth." },
      { name: "Towel Door Pull-Up / Hang", equipment: "Towel & Door Bar", suggestion: "4 Sets × Max Seconds", desc: "Bodyweight hang using towel grip for forearm power." },
      { name: "Fingertip Push-Ups", equipment: "Bodyweight", suggestion: "3 Sets × 8-10 Reps", desc: "Advanced push-up supported entirely on fingertips." },
      { name: "Band-Resisted Wrist Rotations", equipment: "Resistance Band", suggestion: "3 Sets × 12 Reps / side", desc: "Rotational wrist pronation and supination against band." },
      { name: "Heavy Pinch Grip Hold", equipment: "Dumbbells / Heavy Books", suggestion: "3 Sets × 45 Seconds", desc: "Maximal pinch grip hold developing hand and forearm steel." }
    ]
  },
  abs: {
    Beginner: [
      { name: "Standard Floor Crunches", equipment: "Bodyweight / Floor Mat", suggestion: "3 Sets × 15-20 Reps", desc: "Classic upper abdominal flexion for baseline core building." },
      { name: "Chair Knee Tuck-Ins", equipment: "Chair / No Equipment", suggestion: "3 Sets × 12-15 Reps", desc: "Seated on edge of chair tucking knees into chest." },
      { name: "Elbow Plank Hold", equipment: "Bodyweight / Floor Mat", suggestion: "3 Sets × 45 Seconds", desc: "Static core hold strengthening deep transverse abdominis." },
      { name: "Dead Bug", equipment: "Bodyweight / Floor Mat", suggestion: "3 Sets × 12 Reps / side", desc: "Controlled opposite arm and leg lowering for spinal stability." },
      { name: "Bent-Knee Lying Leg Raises", equipment: "Bodyweight / Floor Mat", suggestion: "3 Sets × 12 Reps", desc: "Modified leg raises targeting lower abs with reduced lever." },
      { name: "Bird-Dog Holds", equipment: "Bodyweight / Floor Mat", suggestion: "3 Sets × 10 Reps / side", desc: "Kneeling arm and leg extensions for core and lower back balance." }
    ],
    Intermediate: [
      { name: "Full Bicycle Crunches", equipment: "Bodyweight / Floor Mat", suggestion: "4 Sets × 20 Reps", desc: "Alternating elbow-to-knee rotational crunch for full core." },
      { name: "Lying Straight Leg Raises", equipment: "Bodyweight / Floor Mat", suggestion: "4 Sets × 12 Reps", desc: "Lifting straight legs off floor targeting lower abdominal wall." },
      { name: "Elbow Plank to Push-Up", equipment: "Bodyweight / Floor Mat", suggestion: "3 Sets × 10 Reps", desc: "Dynamic plank transitioning from elbows to hands." },
      { name: "Seated In-and-Out Tucks", equipment: "Chair / Floor", suggestion: "3 Sets × 15 Reps", desc: "Seated core tucks extending and pulling legs into torso." },
      { name: "Mountain Climbers", equipment: "Bodyweight / Floor Mat", suggestion: "3 Sets × 40 Seconds", desc: "Dynamic running plank for core endurance and cardio." },
      { name: "Hollow Body Hold", equipment: "Bodyweight / Floor Mat", suggestion: "3 Sets × 30 Seconds", desc: "Gymnastic core hold pressing lower back flat to floor." }
    ],
    Advanced: [
      { name: "V-Ups", equipment: "Bodyweight / Floor Mat", suggestion: "4 Sets × 12 Reps", desc: "Simultaneously lifting torso and legs to form a V shape." },
      { name: "Dragon Flag Progressions", equipment: "Bed / Bench Edge", suggestion: "3 Sets × 6-8 Reps", desc: "Holding edge of bed/sofa lifting rigid body pillar." },
      { name: "Hardstyle RKC Plank Squeeze", equipment: "Bodyweight / Floor Mat", suggestion: "3 Sets × 30 Seconds", desc: "Maximal tension plank contracting abs, glutes, and quads 100%." },
      { name: "Plank Jack to Knee Tuck", equipment: "Bodyweight / Floor Mat", suggestion: "4 Sets × 12 Reps", desc: "Explosive dynamic plank combining jumping jacks and knee tucks." },
      { name: "Resistance Band Door Crunches", equipment: "Resistance Band & Door", suggestion: "4 Sets × 15 Reps", desc: "Weighted abdominal crunches using door-anchored band." },
      { name: "Single-Leg Hollow Body Pulses", equipment: "Bodyweight / Floor Mat", suggestion: "3 Sets × 10 Reps / leg", desc: "Advanced hollow body hold adding leg pulses for deep ab fatigue." }
    ]
  },
  obliques: {
    Beginner: [
      { name: "Knee Side Plank Hold", equipment: "Bodyweight / Floor Mat", suggestion: "3 Sets × 30 Sec / side", desc: "Side plank supported on knees building lateral core strength." },
      { name: "Floor Heel Touches", equipment: "Bodyweight / Floor Mat", suggestion: "3 Sets × 20 Reps", desc: "Reaching side to side to touch heels for oblique squeeze." },
      { name: "Standing Dumbbell Side Bend", equipment: "Dumbbell / Water Bottle", suggestion: "3 Sets × 12 Reps / side", desc: "Standing lateral crunch using dumbbell resistance." },
      { name: "Standing Band Twists", equipment: "Resistance Band", suggestion: "3 Sets × 12 Reps / side", desc: "Standing torso rotations against band resistance." },
      { name: "Russian Twists (Bodyweight)", equipment: "Bodyweight / Floor Mat", suggestion: "3 Sets × 20 Reps", desc: "Seated torso rotations targeting side abdominal lines." },
      { name: "Seated Knee-to-Elbow Twists", equipment: "Chair / No Equipment", suggestion: "3 Sets × 15 Reps / side", desc: "Seated on chair twisting opposite elbow to knee." }
    ],
    Intermediate: [
      { name: "Full Side Plank Hold", equipment: "Bodyweight / Floor Mat", suggestion: "4 Sets × 35 Sec / side", desc: "Full lateral body plank supported on feet and forearm." },
      { name: "Russian Twists with Dumbbell", equipment: "Dumbbell / Water Bottle", suggestion: "4 Sets × 16 Reps", desc: "Adding dumbbell weight to rotational seated twists." },
      { name: "Cross-Body Mountain Climbers", equipment: "Bodyweight / Floor Mat", suggestion: "3 Sets × 30 Seconds", desc: "Driving knee toward opposite elbow in plank position." },
      { name: "Side Plank Hip Dips", equipment: "Bodyweight / Floor Mat", suggestion: "3 Sets × 12 Reps / side", desc: "Lowering and lifting hips dynamically in side plank." },
      { name: "Resistance Band Horizontal Twists", equipment: "Resistance Band & Door", suggestion: "3 Sets × 12 Reps / side", desc: "Rotational core pull anchored to door frame." },
      { name: "Tempo Bicycle Crunches", equipment: "Bodyweight / Floor Mat", suggestion: "3 Sets × 20 Reps (2s pause)", desc: "Bicycle crunch pausing 2 seconds at full oblique twist." }
    ],
    Advanced: [
      { name: "Feet-Elevated Side Plank Hold", equipment: "Chair / Sofa Support", suggestion: "4 Sets × 40 Sec / side", desc: "Feet elevated on chair increasing lateral core load." },
      { name: "Starfish Side Plank", equipment: "Bodyweight / Floor Mat", suggestion: "3 Sets × 30 Sec / side", desc: "Lifting top leg and arm in side plank position." },
      { name: "Band Resisted Russian Twists", equipment: "Resistance Band & Door", suggestion: "4 Sets × 16 Reps", desc: "Torso twists pulling against door-anchored band." },
      { name: "Seated Oblique Knee Raises", equipment: "Chair Support", suggestion: "4 Sets × 12 Reps / side", desc: "Lifting knees diagonally while seated on chair edge." },
      { name: "Dumbbell Windmills", equipment: "Dumbbell", suggestion: "3 Sets × 10 Reps / side", desc: "Hinging at hip with dumbbell held overhead for oblique flexibility." },
      { name: "Side Plank Cable / Band Pulley Pulls", equipment: "Resistance Band", suggestion: "3 Sets × 10 Reps / side", desc: "Rowing band while maintaining strict side plank." }
    ]
  },
  quads: {
    Beginner: [
      { name: "Bodyweight Air Squats", equipment: "Bodyweight / No Equipment", suggestion: "3 Sets × 15 Reps", desc: "Fundamental squat pattern building quad strength and mobility." },
      { name: "Chair Box Squats", equipment: "Chair / Sofa Support", suggestion: "3 Sets × 12-15 Reps", desc: "Squatting down to touch chair seat safely." },
      { name: "Reverse Lunges", equipment: "Bodyweight / No Equipment", suggestion: "3 Sets × 12 Reps / leg", desc: "Stepping backward to reduce knee stress while building quads." },
      { name: "Wall Sit Hold", equipment: "Wall Support", suggestion: "3 Sets × 45 Seconds", desc: "Isometric quad burn holding 90-degree thigh angle against wall." },
      { name: "Stationary Forward Lunges", equipment: "Bodyweight / No Equipment", suggestion: "3 Sets × 10 Reps / leg", desc: "In-place forward lunging targeting quad teardrop." },
      { name: "Dumbbell Goblet Squats (Light)", equipment: "Dumbbell / Water Bottle", suggestion: "3 Sets × 12 Reps", desc: "Holding light dumbbell at chest for loaded squatting." }
    ],
    Intermediate: [
      { name: "Dumbbell Goblet Squats", equipment: "Dumbbell", suggestion: "4 Sets × 12 Reps", desc: "Upright squatting loaded with heavy dumbbell at chest." },
      { name: "Bulgarian Split Squats (Chair)", equipment: "Chair / Sofa Support", suggestion: "3 Sets × 10 Reps / leg", desc: "Rear foot elevated on chair isolating front quad deeply." },
      { name: "Alternating Forward Lunges", equipment: "Dumbbells", suggestion: "4 Sets × 12 Steps / leg", desc: "Dynamic forward lunges loaded with dumbbells." },
      { name: "Weighted Wall Sit Hold", equipment: "Dumbbell & Wall Support", suggestion: "3 Sets × 45 Seconds", desc: "Placing dumbbell on thighs during wall sit hold." },
      { name: "Step-Ups (Sturdy Chair)", equipment: "Sturdy Chair / Box", suggestion: "3 Sets × 10 Reps / leg", desc: "Stepping onto chair driving through front quad." },
      { name: "Resistance Band Leg Extensions", equipment: "Resistance Band & Chair", suggestion: "3 Sets × 15 Reps / leg", desc: "Seated on chair extending leg against band resistance." }
    ],
    Advanced: [
      { name: "Pistol Squat Progressions", equipment: "Bodyweight / Chair Support", suggestion: "4 Sets × 6-8 Reps / leg", desc: "Single-leg deep squat testing ultimate balance and quad power." },
      { name: "Heavy Bulgarian Split Squats", equipment: "Heavy Dumbbells & Chair", suggestion: "4 Sets × 8 Reps / leg", desc: "Heavy loaded single-leg split squats for quad hypertrophy." },
      { name: "Deficit Jump Squats", equipment: "Bodyweight / No Equipment", suggestion: "4 Sets × 10 Reps", desc: "Explosive squat jumps for fast-twitch quad power." },
      { name: "Dumbbell Walking Lunges (Home)", equipment: "Dumbbells", suggestion: "4 Sets × 16 Steps", desc: "Walking lunges across home room loaded with dumbbells." },
      { name: "Band-Resisted Goblet Squats", equipment: "Resistance Band & Dumbbell", suggestion: "4 Sets × 10 Reps", desc: "Band under feet added to goblet squat for ascending quad tension." },
      { name: "Sissy Squats (Bodyweight)", equipment: "Chair / Door Support", suggestion: "3 Sets × 8-10 Reps", desc: "Leaning torso backward while bending knees for extreme quad stretch." }
    ]
  },
  upper_back: {
    Beginner: [
      { name: "Doorframe Bodyweight Rows", equipment: "Doorframe / Door", suggestion: "3 Sets × 12 Reps", desc: "Leaning back holding doorframe and rowing chest to frame." },
      { name: "Towel Isometric Rows", equipment: "Towel & Door/Foot", suggestion: "3 Sets × 30 sec Hold", desc: "Pulling hard on towel for static upper back contraction." },
      { name: "Resistance Band Seated Rows", equipment: "Resistance Band & Door", suggestion: "3 Sets × 12-15 Reps", desc: "Seated band rowing targeting rhomboids and mid traps." },
      { name: "Incline Y-T-W Floor Raises", equipment: "Bodyweight / Floor Mat", suggestion: "3 Sets × 12 Reps", desc: "Lying prone raising arms in Y-T-W shapes for posture." },
      { name: "Prone Superman Rows", equipment: "Bodyweight / Floor Mat", suggestion: "3 Sets × 12 Reps", desc: "Lying face down pulling elbows back to squeeze upper back." },
      { name: "Dumbbell Single-Arm Row (Chair)", equipment: "Dumbbell & Chair Support", suggestion: "3 Sets × 12 Reps / side", desc: "Rowing dumbbell with knee rested on chair for back support." }
    ],
    Intermediate: [
      { name: "Inverted Rows (Under Table)", equipment: "Sturdy Table / Desk", suggestion: "4 Sets × 10-12 Reps", desc: "Lying under sturdy table pulling chest up to table edge." },
      { name: "Resistance Band Seated Rows (Double)", equipment: "Resistance Band & Door", suggestion: "4 Sets × 12 Reps", desc: "Double band rowing for mid-back and trap thickness." },
      { name: "Dumbbell Single-Arm Bent Rows", equipment: "Dumbbells & Chair Support", suggestion: "4 Sets × 10 Reps / side", desc: "Progressive dumbbell rowing building back density." },
      { name: "Prone Cobra Hold", equipment: "Bodyweight / Floor Mat", suggestion: "3 Sets × 45 Seconds", desc: "Lying prone lifting chest and squeezing shoulder blades." },
      { name: "Resistance Band Face Pulls (Door)", equipment: "Resistance Band & Door", suggestion: "4 Sets × 15 Reps", desc: "Door-anchored band face pulls for rear delts and mid traps." },
      { name: "Dumbbell Rear Delt Flyes", equipment: "Dumbbells & Chair", suggestion: "3 Sets × 12 Reps", desc: "Bent-over flyes isolating upper back and rear shoulders." }
    ],
    Advanced: [
      { name: "Feet-Elevated Table Inverted Rows", equipment: "Table & Chair Support", suggestion: "4 Sets × 8-10 Reps", desc: "Feet elevated on chair while pulling under table for maximum load." },
      { name: "Heavy Dumbbell Bent-Over Rows", equipment: "Heavy Dumbbells", suggestion: "4 Sets × 8 Reps", desc: "Heavy free-weight rowing for dense upper back muscle." },
      { name: "Band-Resisted Inverted Rows", equipment: "Resistance Band & Table", suggestion: "4 Sets × 8 Reps", desc: "Band placed across hips during table rows for extra resistance." },
      { name: "Dumbbell Meadow Rows (Chair)", equipment: "Dumbbell & Chair", suggestion: "4 Sets × 10 Reps / side", desc: "Single-arm elbow-out rowing targeting upper back sweep." },
      { name: "Band High-Row Pull-Aparts", equipment: "Resistance Band", suggestion: "4 Sets × 15 Reps", desc: "High tension band pull-aparts for upper back isolation." },
      { name: "Chest-Supported Dumbbell Rows (Couch)", equipment: "Dumbbells & Sofa/Chair", suggestion: "4 Sets × 10 Reps", desc: "Chest supported on sofa edge for zero-cheat upper back rowing." }
    ]
  },
  lats: {
    Beginner: [
      { name: "Doorframe Lat Pulls", equipment: "Doorframe / Door", suggestion: "3 Sets × 12 Reps", desc: "Vertical bodyweight pulling using doorframe edge." },
      { name: "Resistance Band Kneeling Lat Pulldowns", equipment: "Resistance Band & Door", suggestion: "3 Sets × 12-15 Reps", desc: "Band anchored over top of door pulling down to chest." },
      { name: "Straight-Arm Band Pulldowns", equipment: "Resistance Band & Door", suggestion: "3 Sets × 12 Reps", desc: "Isolating lats without bicep fatigue using band pulldowns." },
      { name: "Dumbbell Pullovers (Floor)", equipment: "Dumbbell & Floor", suggestion: "3 Sets × 12 Reps", desc: "Lying on floor extending dumbbell overhead to stretch lats." },
      { name: "Incline Bodyweight Rows", equipment: "Doorframe / Table", suggestion: "3 Sets × 12 Reps", desc: "Leaning back row engaging lat width." },
      { name: "Sliding Floor Lat Pulls (Towel)", equipment: "Towel & Smooth Floor", suggestion: "3 Sets × 10 Reps", desc: "Lying face down pulling body forward on smooth floor towel." }
    ],
    Intermediate: [
      { name: "Underhand Table Inverted Rows", equipment: "Sturdy Table / Desk", suggestion: "4 Sets × 10 Reps", desc: "Underhand grip table row targeting lats and lower traps." },
      { name: "Resistance Band High Lat Pulldowns", equipment: "Resistance Band & Door", suggestion: "4 Sets × 12 Reps", desc: "High door-anchored band pulldowns with 2s squeeze at bottom." },
      { name: "Dumbbell Pullovers (Chair)", equipment: "Dumbbell & Chair Support", suggestion: "3 Sets × 12 Reps", desc: "Upper back rested on chair for deep lat stretch overhead." },
      { name: "Single-Arm Band Lat Pulldowns", equipment: "Resistance Band & Door", suggestion: "3 Sets × 10 Reps / side", desc: "Unilateral band pulldown focusing on single lat sweep." },
      { name: "Doorframe Bodyweight Lat Swings", equipment: "Doorframe / Door", suggestion: "3 Sets × 10 Reps", desc: "Bodyweight lat engagement leaning away from door." },
      { name: "Dumbbell Bent-Over Row (Lat Focus)", equipment: "Dumbbells", suggestion: "4 Sets × 10 Reps", desc: "Rowing dumbbells toward hips to load lower lats." }
    ],
    Advanced: [
      { name: "Door Pull-Ups / Bar Pulls", equipment: "Door Pull-Up Bar", suggestion: "4 Sets × 8-10 Reps", desc: "Bodyweight pull-ups for maximum V-taper lat width." },
      { name: "Band-Resisted Pull-Ups / Lat Rows", equipment: "Resistance Band & Door Bar", suggestion: "4 Sets × 6-8 Reps", desc: "Adding band resistance to pull-ups for peak lat overload." },
      { name: "Heavy Dumbbell Pullover (Chair)", equipment: "Heavy Dumbbell & Chair", suggestion: "4 Sets × 10 Reps", desc: "Heavy overhead dumbbell pullovers across chair." },
      { name: "Single-Arm Heavy Row to Hip", equipment: "Heavy Dumbbell & Chair", suggestion: "4 Sets × 8 Reps / side", desc: "Heavy dumbbell row pulling directly into hip pocket." },
      { name: "High-Tension Band Pulldowns (Kneeling)", equipment: "Resistance Band & Door", suggestion: "4 Sets × 12 Reps", desc: "Heavy band tension kneeling pulldowns." },
      { name: "Deficit Table Inverted Rows", equipment: "Table & Chair Support", suggestion: "4 Sets × 8 Reps", desc: "Elevated feet table rows for intense lat recruitment." }
    ]
  },
  traps: {
    Beginner: [
      { name: "Standing Dumbbell Shrugs", equipment: "Dumbbells / Water Bottles", suggestion: "3 Sets × 15 Reps", desc: "Basic shoulder shrugs for upper trap elevation." },
      { name: "Resistance Band Shrugs", equipment: "Resistance Band", suggestion: "3 Sets × 15 Reps", desc: "Standing on band shrugging shoulders to ears." },
      { name: "Incline Y-Raises (Floor)", equipment: "Bodyweight / Floor Mat", suggestion: "3 Sets × 12 Reps", desc: "Lying prone raising arms in Y shape for lower/mid traps." },
      { name: "Towel Isometric Shrugs", equipment: "Towel", suggestion: "3 Sets × 30 sec Hold", desc: "Standing on towel pulling up for static trap squeeze." },
      { name: "Wall Angels", equipment: "Wall Support", suggestion: "3 Sets × 12 Reps", desc: "Back against wall sliding arms up for posture and traps." },
      { name: "Seated Dumbbell Shrugs (Chair)", equipment: "Dumbbells & Chair", suggestion: "3 Sets × 15 Reps", desc: "Seated shrugs removing leg bounce." }
    ],
    Intermediate: [
      { name: "Standing Heavy Dumbbell Shrugs", equipment: "Dumbbells", suggestion: "4 Sets × 12 Reps", desc: "Heavy dumbbell shrugs holding 2 seconds at top." },
      { name: "Resistance Band Overhead Shrugs", equipment: "Resistance Band", suggestion: "3 Sets × 12 Reps", desc: "Shrugging shoulders with band held overhead." },
      { name: "Dumbbell High Pulls", equipment: "Dumbbells", suggestion: "3 Sets × 10 Reps", desc: "Explosive pull up to chest recruiting traps." },
      { name: "Prone Y-T-W Raises", equipment: "Bodyweight / Floor Mat", suggestion: "3 Sets × 12 Reps", desc: "Targeting all trap regions with floor arm raises." },
      { name: "Overhead Dumbbell Shrugs", equipment: "Dumbbells", suggestion: "3 Sets × 12 Reps", desc: "Holding dumbbells overhead and shrugging upward." },
      { name: "Band Upright Rows", equipment: "Resistance Band", suggestion: "3 Sets × 12 Reps", desc: "Pulling band up to chin level for upper traps." }
    ],
    Advanced: [
      { name: "Heavy Single-Arm Dumbbell Shrugs", equipment: "Heavy Dumbbell", suggestion: "4 Sets × 10 Reps / side", desc: "Heavy unilateral shrug with pause at peak squeeze." },
      { name: "Band-Resisted Dumbbell Shrugs", equipment: "Resistance Band & Dumbbells", suggestion: "4 Sets × 10 Reps", desc: "Band and dumbbells combined for maximum trap tension." },
      { name: "Snatch-Grip Dumbbell High Pulls", equipment: "Dumbbells", suggestion: "4 Sets × 8 Reps", desc: "Explosive wide-grip high pull developing upper back traps." },
      { name: "Prone Chair-Supported Shrugs", equipment: "Dumbbells & Chair", suggestion: "4 Sets × 12 Reps", desc: "Chest supported on chair for strict mid/upper trap isolation." },
      { name: "Farmers Walk Trap Holds (Home)", equipment: "Heavy Dumbbells", suggestion: "4 Sets × 60 Seconds", desc: "Heavy static carry for granite trap density." },
      { name: "Band Overhead Shrug Holds", equipment: "Resistance Band", suggestion: "3 Sets × 30 Sec Hold", desc: "Isometric overhead band hold for lower/mid trap endurance." }
    ]
  },
  triceps: {
    Beginner: [
      { name: "Chair / Sofa Dips", equipment: "Chair / Sofa Support", suggestion: "3 Sets × 12 Reps", desc: "Seated dips using chair or sofa edge to target triceps." },
      { name: "Wall Triceps Extension", equipment: "Wall Support", suggestion: "3 Sets × 12 Reps", desc: "Bodyweight triceps extension pressing off wall." },
      { name: "Overhead Dumbbell Extension", equipment: "Dumbbell & Chair", suggestion: "3 Sets × 12 Reps", desc: "Overhead extension targeting triceps long head." },
      { name: "Resistance Band Triceps Pushdown", equipment: "Resistance Band & Door", suggestion: "3 Sets × 15 Reps", desc: "Band pushdown anchored to top of door frame." },
      { name: "Knee Diamond Push-Ups", equipment: "Bodyweight / Floor Mat", suggestion: "3 Sets × 10 Reps", desc: "Modified diamond push-up focusing load on triceps." },
      { name: "Floor Triceps Kickbacks", equipment: "Dumbbells / Floor", suggestion: "3 Sets × 12 Reps", desc: "Kickbacks performed kneeling on floor." }
    ],
    Intermediate: [
      { name: "Bodyweight Chair Dips (Legs Straight)", equipment: "Chair Support", suggestion: "4 Sets × 12 Reps", desc: "Chair dips with legs extended forward for increased load." },
      { name: "Standing Dumbbell Overhead Extension", equipment: "Dumbbell", suggestion: "4 Sets × 10 Reps", desc: "Two-handed dumbbell extension behind head." },
      { name: "Resistance Band Overhead Extension", equipment: "Resistance Band", suggestion: "3 Sets × 12-15 Reps", desc: "Overhead band extension for long head stretch." },
      { name: "Cobra Push-Ups", equipment: "Bodyweight / Floor Mat", suggestion: "3 Sets × 10-12 Reps", desc: "Push-up keeping elbows tucked close to ribs for triceps." },
      { name: "Dumbbell Triceps Kickbacks", equipment: "Dumbbells & Chair", suggestion: "3 Sets × 12 Reps", desc: "Hinged kickback squeezing triceps at full lockout." },
      { name: "Bodyweight Table Skullcrushers", equipment: "Sturdy Table / Desk", suggestion: "3 Sets × 10 Reps", desc: "Pressing off table edge targeting triceps." }
    ],
    Advanced: [
      { name: "Feet-Elevated Chair Dips", equipment: "Two Chairs Support", suggestion: "4 Sets × 12 Reps", desc: "Feet elevated on second chair for full bodyweight dip load." },
      { name: "Diamond Push-Ups (Full Body)", equipment: "Bodyweight / Floor Mat", suggestion: "4 Sets × 12 Reps", desc: "Full body diamond push-ups for heavy triceps pressing." },
      { name: "Single-Arm Dumbbell Overhead Extension", equipment: "Dumbbell", suggestion: "4 Sets × 10 Reps / side", desc: "Unilateral overhead extension for triceps long head." },
      { name: "Bodyweight Floor Skullcrushers", equipment: "Bodyweight / Floor Mat", suggestion: "3 Sets × 8-10 Reps", desc: "Kneeling on floor lowering forearms to ground and extending." },
      { name: "Resistance Band High-Tension Pushdown", equipment: "Resistance Band & Door", suggestion: "4 Sets × 15 Reps", desc: "Heavy band pushdown with 2s lockout hold." },
      { name: "Explosive Triceps Extension Push-Ups", equipment: "Bodyweight / Floor Mat", suggestion: "3 Sets × 8 Reps", desc: "Explosive push off hands extending elbows fully." }
    ]
  },
  lower_back: {
    Beginner: [
      { name: "Prone Superman Holds", equipment: "Bodyweight / Floor Mat", suggestion: "3 Sets × 30 Seconds", desc: "Lying face down lifting chest and legs to strengthen lower back." },
      { name: "Bird-Dog Extensions", equipment: "Bodyweight / Floor Mat", suggestion: "3 Sets × 12 Reps / side", desc: "Opposite arm and leg extension for spinal health." },
      { name: "Glute-Ham Bridge Hold", equipment: "Bodyweight / Floor Mat", suggestion: "3 Sets × 45 Seconds", desc: "Isometric bridge hold strengthening erectors and glutes." },
      { name: "Cat-Cow Mobility Extensions", equipment: "Bodyweight / Floor Mat", suggestion: "3 Sets × 12 Reps", desc: "Spinal flexion and extension for lower back mobility." },
      { name: "Standing Good Mornings (Bodyweight)", equipment: "Bodyweight / No Equipment", suggestion: "3 Sets × 15 Reps", desc: "Hands behind head hinging at hips for lower back flex." },
      { name: "Incline Prone Extensions (Sofa)", equipment: "Sofa / Bed Support", suggestion: "3 Sets × 12 Reps", desc: "Torso hung over sofa edge lifting back up." }
    ],
    Intermediate: [
      { name: "Prone Superman Pulses", equipment: "Bodyweight / Floor Mat", suggestion: "4 Sets × 15 Reps", desc: "Pulsing chest and legs off floor for erector fatigue." },
      { name: "Alternating Bird-Dogs with Hold", equipment: "Bodyweight / Floor Mat", suggestion: "3 Sets × 10 Reps (3s hold)", desc: "Holding top position 3 seconds for lumbar stability." },
      { name: "Dumbbell Good Mornings", equipment: "Dumbbell / Water Jug", suggestion: "3 Sets × 10 Reps", desc: "Holding weight to chest while hinging at hips." },
      { name: "Resistance Band Good Mornings", equipment: "Resistance Band", suggestion: "3 Sets × 12 Reps", desc: "Standing on band wrapped around neck for hip hinge load." },
      { name: "Edge-of-Bed Hyperextension", equipment: "Bed / Sofa Support", suggestion: "3 Sets × 12 Reps", desc: "Legs anchored on bed lowering and lifting upper body." },
      { name: "Dumbbell Romanian Deadlifts", equipment: "Dumbbells", suggestion: "4 Sets × 10 Reps", desc: "Hinging hips back loading hamstrings and lower back." }
    ],
    Advanced: [
      { name: "Weighted Superman Holds", equipment: "Dumbbell / Floor Mat", suggestion: "4 Sets × 30 Seconds", desc: "Holding light dumbbell overhead during superman hold." },
      { name: "Band-Resisted Good Mornings", equipment: "Resistance Band", suggestion: "4 Sets × 10 Reps", desc: "Heavy band tension hip hinge strengthening lower spine." },
      { name: "Heavy Dumbbell Romanian Deadlifts", equipment: "Heavy Dumbbells", suggestion: "4 Sets × 8 Reps", desc: "Heavy loaded Romanian deadlifts for lower back thickness." },
      { name: "Edge-of-Bed Hyperextension with Weight", equipment: "Bed & Dumbbell", suggestion: "4 Sets × 10 Reps", desc: "Holding dumbbell against chest during bed hyperextension." },
      { name: "Single-Leg Romanian Deadlift (Dumbbell)", equipment: "Dumbbell", suggestion: "3 Sets × 8 Reps / leg", desc: "Single leg hip hinge testing anti-rotational spinal strength." },
      { name: "Reverse Hyperextension (Table Edge)", equipment: "Table / Desk Edge", suggestion: "3 Sets × 12 Reps", desc: "Torso rested on table lifting legs backward." }
    ]
  },
  glutes: {
    Beginner: [
      { name: "Bodyweight Glute Bridges", equipment: "Bodyweight / Floor Mat", suggestion: "3 Sets × 15 Reps", desc: "Lying on back lifting hips to squeeze glutes." },
      { name: "Standing Glute Kickbacks", equipment: "Bodyweight / Wall Support", suggestion: "3 Sets × 15 Reps / leg", desc: "Kicking leg back against wall support for glute activation." },
      { name: "Clamshells", equipment: "Bodyweight / Floor Mat", suggestion: "3 Sets × 15 Reps / leg", desc: "Side lying knee openings isolating gluteus medius." },
      { name: "Side-Lying Abductions", equipment: "Bodyweight / Floor Mat", suggestion: "3 Sets × 15 Reps / leg", desc: "Lifting top leg sideways for side glute shape." },
      { name: "Chair Step-Taps", equipment: "Chair Support", suggestion: "3 Sets × 12 Reps / leg", desc: "Tapping foot onto chair loading working glute." },
      { name: "Fire Hydrants", equipment: "Bodyweight / Floor Mat", suggestion: "3 Sets × 15 Reps / leg", desc: "All-fours hip abduction for hip & glute health." }
    ],
    Intermediate: [
      { name: "Single-Leg Glute Bridges", equipment: "Bodyweight / Floor Mat", suggestion: "3 Sets × 12 Reps / leg", desc: "Single leg hip bridge eliminating strength imbalances." },
      { name: "Dumbbell Hip Thrusts (Sofa)", equipment: "Dumbbell & Sofa Support", suggestion: "4 Sets × 12 Reps", desc: "Upper back rested on sofa driving hips up with dumbbell." },
      { name: "Resistance Band Loop Glute Bridges", equipment: "Resistance Band Loop", suggestion: "3 Sets × 15 Reps", desc: "Band around knees forcing outward glute abductor engagement." },
      { name: "Standing Band Kickbacks", equipment: "Resistance Band", suggestion: "3 Sets × 12 Reps / leg", desc: "Standing band kickbacks for glute peak squeeze." },
      { name: "Bulgarian Split Squats (Glute Bias)", equipment: "Chair & Dumbbells", suggestion: "3 Sets × 10 Reps / leg", desc: "Leaning forward on chair split squat to load glute." },
      { name: "Curtsy Lunges", equipment: "Bodyweight / Dumbbells", suggestion: "3 Sets × 12 Reps / leg", desc: "Stepping diagonally back targeting side glute curve." }
    ],
    Advanced: [
      { name: "Heavy Dumbbell Hip Thrusts (Sofa)", equipment: "Heavy Dumbbell & Sofa", suggestion: "4 Sets × 10 Reps", desc: "Heavy loaded hip thrusts for maximum glute mass." },
      { name: "Banded Single-Leg Hip Thrusts", equipment: "Resistance Band & Sofa", suggestion: "4 Sets × 8 Reps / leg", desc: "Single leg hip thrusts with band resistance." },
      { name: "Heavy Bulgarian Split Squats", equipment: "Heavy Dumbbells & Chair", suggestion: "4 Sets × 8 Reps / leg", desc: "Heavy single leg squat deeply loading glutes." },
      { name: "Band Monster Walks", equipment: "Resistance Band Loop", suggestion: "3 Sets × 20 Steps", desc: "Banded sideways walking for glute medius burn." },
      { name: "Deficit Curtsy Lunges (Dumbbell)", equipment: "Plate/Step & Dumbbell", suggestion: "4 Sets × 10 Reps / leg", desc: "Stepping off elevated surface for deep glute stretch." },
      { name: "Single-Leg Romanian Deadlift (Glute)", equipment: "Dumbbell", suggestion: "3 Sets × 8 Reps / leg", desc: "Single leg deadlift loading glute and hamstring tie-in." }
    ]
  },
  hamstrings: {
    Beginner: [
      { name: "Towel Slider Hamstring Curls", equipment: "Towel & Smooth Floor", suggestion: "3 Sets × 10 Reps", desc: "Lying bridge sliding heels out and pulling back with towel." },
      { name: "Glute-Ham Bridge Walkouts", equipment: "Bodyweight / Floor Mat", suggestion: "3 Sets × 10 Reps", desc: "Walking feet outward in bridge position targeting hamstrings." },
      { name: "Single-Leg RDL (Bodyweight)", equipment: "Bodyweight / Wall Support", suggestion: "3 Sets × 12 Reps / leg", desc: "Single leg hip hinge using wall for balance." },
      { name: "Resistance Band Standing Leg Curls", equipment: "Resistance Band & Door", suggestion: "3 Sets × 12 Reps / leg", desc: "Standing band leg curl anchored to door." },
      { name: "Standing Good Mornings (Bodyweight)", equipment: "Bodyweight", suggestion: "3 Sets × 15 Reps", desc: "Hands behind head hinging at hips for hamstring stretch." },
      { name: "Chair Hamstring Presses", equipment: "Chair Support", suggestion: "3 Sets × 12 Reps / leg", desc: "Pressing heel down into chair seat to activate hamstrings." }
    ],
    Intermediate: [
      { name: "Towel / Slider Hamstring Curls", equipment: "Towel & Smooth Floor", suggestion: "4 Sets × 12 Reps", desc: "Smooth floor towel curls for hamstring knee flexion." },
      { name: "Dumbbell Romanian Deadlifts", equipment: "Dumbbells", suggestion: "4 Sets × 10 Reps", desc: "Dumbbell hip hinge for hamstring stretch and strength." },
      { name: "Single-Leg Dumbbell RDL", equipment: "Dumbbell", suggestion: "3 Sets × 10 Reps / leg", desc: "Unilateral dumbbell deadlift targeting single hamstring." },
      { name: "Resistance Band Seated Hamstring Curls", equipment: "Resistance Band & Chair", suggestion: "3 Sets × 12 Reps", desc: "Seated on chair pulling band back under chair." },
      { name: "Single-Leg Glute-Ham Bridge", equipment: "Bodyweight / Floor Mat", suggestion: "3 Sets × 10 Reps / leg", desc: "Single leg bridge with extended leg focus." },
      { name: "Dumbbell Sumo Squat (Hamstring Focus)", equipment: "Dumbbell", suggestion: "3 Sets × 12 Reps", desc: "Wide stance squat pulling up through hamstrings." }
    ],
    Advanced: [
      { name: "Nordic Hamstring Curl Progressions", equipment: "Door Anchor / Bed Edge", suggestion: "4 Sets × 6 Reps", desc: "Ankles anchored under bed/sofa lowering body slowly." },
      { name: "Heavy Dumbbell Romanian Deadlifts", equipment: "Heavy Dumbbells", suggestion: "4 Sets × 8 Reps", desc: "Heavy dumbbell hip hinge for maximum hamstring mass." },
      { name: "Single-Leg Deficit RDL", equipment: "Step & Dumbbell", suggestion: "4 Sets × 8 Reps / leg", desc: "Standing on step for deeper hamstring stretch." },
      { name: "Resistance Band Lying Hamstring Curls", equipment: "Resistance Band & Door", suggestion: "4 Sets × 12 Reps", desc: "Lying face down pulling band with heels." },
      { name: "High-Tension Towel Slider Curls", equipment: "Towel & Smooth Floor", suggestion: "4 Sets × 12 Reps", desc: "Single-leg or heavy tension towel hamstring curls." },
      { name: "Dumbbell Stiff-Legged Deadlifts", equipment: "Dumbbells", suggestion: "4 Sets × 8 Reps", desc: "Straight leg deadlift isolating hamstrings completely." }
    ]
  },
  calves: {
    Beginner: [
      { name: "Standing Bodyweight Calf Raises", equipment: "Bodyweight / Wall", suggestion: "3 Sets × 15-20 Reps", desc: "Standing calf raises on floor with wall balance." },
      { name: "Seated Dumbbell Calf Raises (Chair)", equipment: "Dumbbells & Chair", suggestion: "3 Sets × 15 Reps", desc: "Seated on chair with dumbbells on knees." },
      { name: "Single-Leg Calf Raises (Wall)", equipment: "Bodyweight / Wall", suggestion: "3 Sets × 12 Reps / leg", desc: "Unilateral calf raise supported by wall." },
      { name: "Isometric Calf Block Hold", equipment: "Step / Book", suggestion: "3 Sets × 30 Seconds", desc: "Holding top calf raise position on step edge." },
      { name: "Stair Deficit Calf Raises", equipment: "Stair Step", suggestion: "3 Sets × 15 Reps", desc: "Calf raises on stair step for full ankle stretch." },
      { name: "Toe Walking Drills", equipment: "Bodyweight", suggestion: "3 Sets × 45 Seconds Walk", desc: "Walking around home on tiptoes to burn calves." }
    ],
    Intermediate: [
      { name: "Single-Leg Stair Calf Raises", equipment: "Stair Step", suggestion: "4 Sets × 12 Reps / leg", desc: "Single leg calf raises on stair edge for deep stretch." },
      { name: "Seated Dumbbell Calf Raises (Heavy)", equipment: "Heavy Dumbbells & Chair", suggestion: "4 Sets × 15 Reps", desc: "Heavy dumbbells placed on knees while seated." },
      { name: "Deficit Stair Calf Raises (Both Feet)", equipment: "Stair Step & Dumbbell", suggestion: "4 Sets × 15 Reps", desc: "Holding dumbbell while doing stair calf raises." },
      { name: "Resistance Band Calf Pushes", equipment: "Resistance Band", suggestion: "3 Sets × 15 Reps", desc: "Seated pushing toes out against band resistance." },
      { name: "Jump Rope / Hop Drills", equipment: "Jump Rope / Floor", suggestion: "3 Sets × 60 Seconds", desc: "Rhythmic calf hops building ankle spring." },
      { name: "Dumbbell Farmers Walk Calf Raises", equipment: "Dumbbells", suggestion: "3 Sets × 15 Steps", desc: "Calf raises while carrying dumbbells." }
    ],
    Advanced: [
      { name: "Deficit Single-Leg Calf Raises (Dumbbell)", equipment: "Stair Step & Dumbbell", suggestion: "4 Sets × 10 Reps / leg", desc: "Single leg stair calf raise loaded with dumbbell." },
      { name: "Explosive Calf Jump Hops", equipment: "Bodyweight / Floor", suggestion: "4 Sets × 15 Reps", desc: "Explosive hops off toes for fast-twitch calf power." },
      { name: "Heavy Dumbbell Standing Calf Raises", equipment: "Heavy Dumbbells & Step", suggestion: "4 Sets × 12 Reps", desc: "Heavy standing calf raises on elevated step." },
      { name: "Band-Resisted Single-Leg Calf Press", equipment: "Resistance Band & Chair", suggestion: "4 Sets × 12 Reps / leg", desc: "Single leg band pushes with 2s hold at peak contraction." },
      { name: "Slow Eccentric Single-Leg Calf Raises", equipment: "Stair Step", suggestion: "3 Sets × 10 Reps (5s down)", desc: "5-second negative lowering on stair step." },
      { name: "Seated Weighted Knee Calf Press", equipment: "Heavy Dumbbell & Chair", suggestion: "4 Sets × 15 Reps", desc: "Heavy seated soleus training." }
    ]
  }
};
