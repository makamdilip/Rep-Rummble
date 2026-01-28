import OpenAI from 'openai'
import { Exercise, IExercise } from '../models/Exercise.model'
import { WorkoutPlan, IWorkoutPlan, IWorkoutDay } from '../models/WorkoutPlan.model'
import mongoose from 'mongoose'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

// Types
export interface GenerateExerciseParams {
  name: string
  category: string
  difficulty: string
  muscleGroups: string[]
  equipment?: string[]
}

export interface GenerateWorkoutPlanParams {
  userId: string
  goal: string
  fitnessLevel: string
  durationWeeks: number
  daysPerWeek: number
  minutesPerWorkout: number
  availableEquipment: string[]
  focusAreas?: string[]
  injuries?: string[]
}

// Exercise database with pose detection keypoints
const EXERCISE_POSE_DATA: Record<string, any> = {
  'push-ups': {
    poseKeypoints: [
      {
        phase: 'start',
        bodyAngles: [
          { joint: 'elbow', minAngle: 160, maxAngle: 180, description: 'Arms straight' },
          { joint: 'shoulder', minAngle: 70, maxAngle: 90, description: 'Shoulders over wrists' },
          { joint: 'hip', minAngle: 160, maxAngle: 180, description: 'Body straight' }
        ],
        description: 'High plank position with arms extended'
      },
      {
        phase: 'middle',
        bodyAngles: [
          { joint: 'elbow', minAngle: 80, maxAngle: 100, description: 'Elbows at 90 degrees' },
          { joint: 'hip', minAngle: 160, maxAngle: 180, description: 'Body remains straight' }
        ],
        description: 'Chest near ground, elbows bent'
      },
      {
        phase: 'end',
        bodyAngles: [
          { joint: 'elbow', minAngle: 160, maxAngle: 180, description: 'Arms straight again' },
          { joint: 'hip', minAngle: 160, maxAngle: 180, description: 'Body straight' }
        ],
        description: 'Return to high plank'
      }
    ],
    repCountMethod: 'angle_threshold'
  },
  'squats': {
    poseKeypoints: [
      {
        phase: 'start',
        bodyAngles: [
          { joint: 'knee', minAngle: 160, maxAngle: 180, description: 'Legs straight' },
          { joint: 'hip', minAngle: 160, maxAngle: 180, description: 'Standing tall' }
        ],
        description: 'Standing position'
      },
      {
        phase: 'middle',
        bodyAngles: [
          { joint: 'knee', minAngle: 70, maxAngle: 100, description: 'Knees bent, thighs parallel' },
          { joint: 'hip', minAngle: 70, maxAngle: 100, description: 'Hips back and down' }
        ],
        description: 'Bottom of squat position'
      },
      {
        phase: 'end',
        bodyAngles: [
          { joint: 'knee', minAngle: 160, maxAngle: 180, description: 'Legs straight' },
          { joint: 'hip', minAngle: 160, maxAngle: 180, description: 'Standing tall' }
        ],
        description: 'Return to standing'
      }
    ],
    repCountMethod: 'angle_threshold'
  },
  'plank': {
    poseKeypoints: [
      {
        phase: 'start',
        bodyAngles: [
          { joint: 'elbow', minAngle: 85, maxAngle: 95, description: 'Forearms on ground' },
          { joint: 'hip', minAngle: 160, maxAngle: 180, description: 'Body straight' },
          { joint: 'knee', minAngle: 160, maxAngle: 180, description: 'Legs straight' }
        ],
        description: 'Forearm plank hold position'
      }
    ],
    repCountMethod: 'time_based'
  },
  'lunges': {
    poseKeypoints: [
      {
        phase: 'start',
        bodyAngles: [
          { joint: 'knee', minAngle: 160, maxAngle: 180, description: 'Both legs straight' },
          { joint: 'hip', minAngle: 160, maxAngle: 180, description: 'Standing tall' }
        ],
        description: 'Standing position'
      },
      {
        phase: 'middle',
        bodyAngles: [
          { joint: 'front_knee', minAngle: 85, maxAngle: 95, description: 'Front knee at 90 degrees' },
          { joint: 'back_knee', minAngle: 85, maxAngle: 95, description: 'Back knee near ground' },
          { joint: 'hip', minAngle: 160, maxAngle: 180, description: 'Torso upright' }
        ],
        description: 'Lunge position'
      },
      {
        phase: 'end',
        bodyAngles: [
          { joint: 'knee', minAngle: 160, maxAngle: 180, description: 'Both legs straight' }
        ],
        description: 'Return to standing'
      }
    ],
    repCountMethod: 'angle_threshold'
  },
  'burpees': {
    poseKeypoints: [
      {
        phase: 'start',
        bodyAngles: [
          { joint: 'knee', minAngle: 160, maxAngle: 180, description: 'Standing position' }
        ],
        description: 'Standing position'
      },
      {
        phase: 'middle',
        bodyAngles: [
          { joint: 'hip', minAngle: 160, maxAngle: 180, description: 'Body straight in plank' },
          { joint: 'elbow', minAngle: 160, maxAngle: 180, description: 'Arms extended' }
        ],
        description: 'Plank/push-up position'
      },
      {
        phase: 'end',
        bodyAngles: [
          { joint: 'knee', minAngle: 160, maxAngle: 180, description: 'Jump with arms up' }
        ],
        description: 'Jump with arms overhead'
      }
    ],
    repCountMethod: 'position_threshold'
  },
  'jumping-jacks': {
    poseKeypoints: [
      {
        phase: 'start',
        bodyAngles: [
          { joint: 'shoulder', minAngle: 0, maxAngle: 20, description: 'Arms at sides' },
          { joint: 'hip_spread', minAngle: 0, maxAngle: 15, description: 'Feet together' }
        ],
        description: 'Standing with arms at sides'
      },
      {
        phase: 'middle',
        bodyAngles: [
          { joint: 'shoulder', minAngle: 150, maxAngle: 180, description: 'Arms overhead' },
          { joint: 'hip_spread', minAngle: 40, maxAngle: 60, description: 'Feet apart' }
        ],
        description: 'Arms up, legs spread'
      }
    ],
    repCountMethod: 'angle_threshold'
  },
  'mountain-climbers': {
    poseKeypoints: [
      {
        phase: 'start',
        bodyAngles: [
          { joint: 'hip', minAngle: 160, maxAngle: 180, description: 'Body straight' },
          { joint: 'elbow', minAngle: 160, maxAngle: 180, description: 'Arms extended' }
        ],
        description: 'High plank position'
      },
      {
        phase: 'middle',
        bodyAngles: [
          { joint: 'knee', minAngle: 30, maxAngle: 60, description: 'Knee driven to chest' }
        ],
        description: 'One knee driven forward'
      }
    ],
    repCountMethod: 'position_threshold'
  }
}

/**
 * Generate exercise details using AI
 */
export async function generateExerciseWithAI(params: GenerateExerciseParams): Promise<Partial<IExercise>> {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: `You are an expert fitness coach and exercise specialist. Generate detailed exercise information.

Your response must be valid JSON with this structure:
{
  "description": "Brief description of the exercise (2-3 sentences)",
  "instructions": ["Step 1", "Step 2", "Step 3", ...],
  "commonMistakes": ["Mistake 1", "Mistake 2", ...],
  "breathingPattern": "When to inhale/exhale",
  "safetyTips": ["Safety tip 1", "Safety tip 2", ...],
  "benefits": ["Benefit 1", "Benefit 2", ...],
  "modifications": {
    "easier": "Easier variation description",
    "harder": "Harder variation description"
  },
  "caloriesPerMinute": number,
  "defaultSets": number,
  "defaultReps": number,
  "restBetweenSets": number (seconds)
}`
        },
        {
          role: 'user',
          content: `Generate detailed exercise information for:
Name: ${params.name}
Category: ${params.category}
Difficulty: ${params.difficulty}
Target Muscles: ${params.muscleGroups.join(', ')}
Equipment: ${params.equipment?.join(', ') || 'bodyweight'}

Respond only with valid JSON.`
        }
      ],
      max_tokens: 1000,
      temperature: 0.7
    })

    const content = response.choices[0]?.message?.content
    if (!content) throw new Error('No response from AI')

    // Parse JSON
    let jsonStr = content
    const jsonMatch = content.match(/```(?:json)?\s*([\s\S]*?)\s*```/)
    if (jsonMatch) jsonStr = jsonMatch[1]

    const aiData = JSON.parse(jsonStr)

    // Get pose data if available
    const slug = params.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')
    const poseData = EXERCISE_POSE_DATA[slug] || {}

    return {
      name: params.name,
      slug,
      category: params.category as any,
      difficulty: params.difficulty as any,
      muscleGroups: params.muscleGroups,
      equipment: params.equipment || ['bodyweight'],
      ...aiData,
      ...poseData,
      isAIGenerated: true
    }
  } catch (error: any) {
    console.error('AI Exercise Generation Error:', error)
    throw new Error(`Failed to generate exercise: ${error.message}`)
  }
}

/**
 * Generate a complete workout plan using AI
 */
export async function generateWorkoutPlan(params: GenerateWorkoutPlanParams): Promise<IWorkoutPlan> {
  try {
    // Get available exercises from database
    const exercises = await Exercise.find({ isActive: true }).select('name slug category muscleGroups difficulty equipment')

    const exerciseList = exercises.map(e => ({
      name: e.name,
      category: e.category,
      muscles: e.muscleGroups,
      difficulty: e.difficulty
    }))

    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: `You are an expert fitness coach creating personalized workout plans.

Create a workout plan using ONLY these available exercises:
${JSON.stringify(exerciseList, null, 2)}

Your response must be valid JSON with this structure:
{
  "name": "Plan Name",
  "description": "Brief description of the plan",
  "schedule": [
    {
      "day": 1,
      "name": "Day Name (e.g., Push Day)",
      "focus": "Focus area",
      "exercises": [
        {
          "exerciseName": "Exercise Name (must match available exercises)",
          "sets": number,
          "reps": number or "to_failure",
          "restSeconds": number,
          "notes": "optional tips",
          "order": 1
        }
      ],
      "estimatedDuration": minutes,
      "estimatedCalories": number,
      "isRestDay": false
    }
  ],
  "progressions": [
    {
      "week": 1,
      "adjustments": ["adjustment 1", "adjustment 2"],
      "intensityMultiplier": 1.0
    }
  ]
}

Guidelines:
- Match exercises exactly to the available list
- Include warm-up and cool-down recommendations in notes
- Balance muscle groups appropriately
- Consider recovery time between similar muscle groups
- Progressive overload through the weeks`
        },
        {
          role: 'user',
          content: `Create a ${params.durationWeeks}-week workout plan with these requirements:

Goal: ${params.goal}
Fitness Level: ${params.fitnessLevel}
Days per Week: ${params.daysPerWeek}
Minutes per Workout: ${params.minutesPerWorkout}
Available Equipment: ${params.availableEquipment.join(', ')}
${params.focusAreas ? `Focus Areas: ${params.focusAreas.join(', ')}` : ''}
${params.injuries ? `Injuries/Limitations: ${params.injuries.join(', ')}` : ''}

Respond only with valid JSON.`
        }
      ],
      max_tokens: 3000,
      temperature: 0.7
    })

    const content = response.choices[0]?.message?.content
    if (!content) throw new Error('No response from AI')

    // Parse JSON
    let jsonStr = content
    const jsonMatch = content.match(/```(?:json)?\s*([\s\S]*?)\s*```/)
    if (jsonMatch) jsonStr = jsonMatch[1]

    const planData = JSON.parse(jsonStr)

    // Map exercise names to IDs
    const exerciseMap = new Map(exercises.map(e => [e.name.toLowerCase(), e._id]))

    const schedule: IWorkoutDay[] = planData.schedule.map((day: any) => ({
      ...day,
      exercises: day.exercises.map((ex: any) => ({
        ...ex,
        exerciseId: exerciseMap.get(ex.exerciseName.toLowerCase()) || null
      }))
    }))

    // Create the workout plan
    const workoutPlan = new WorkoutPlan({
      userId: new mongoose.Types.ObjectId(params.userId),
      name: planData.name,
      description: planData.description,
      goal: params.goal,
      fitnessLevel: params.fitnessLevel,
      durationWeeks: params.durationWeeks,
      daysPerWeek: params.daysPerWeek,
      minutesPerWorkout: params.minutesPerWorkout,
      availableEquipment: params.availableEquipment,
      schedule,
      progressions: planData.progressions || [],
      isAIGenerated: true,
      aiPrompt: JSON.stringify(params)
    })

    await workoutPlan.save()
    return workoutPlan
  } catch (error: any) {
    console.error('AI Workout Plan Generation Error:', error)
    throw new Error(`Failed to generate workout plan: ${error.message}`)
  }
}

/**
 * Seed initial exercises into the database
 */
export async function seedExercises(): Promise<void> {
  const defaultExercises = [
    {
      name: 'Push-ups',
      category: 'strength',
      muscleGroups: ['chest', 'triceps', 'shoulders', 'core'],
      difficulty: 'beginner',
      equipment: ['bodyweight'],
      description: 'A classic upper body exercise that targets the chest, shoulders, and triceps while engaging the core for stability.',
      instructions: [
        'Start in a high plank position with hands slightly wider than shoulder-width apart',
        'Keep your body in a straight line from head to heels',
        'Lower your chest toward the ground by bending your elbows',
        'Push back up to the starting position',
        'Keep your core engaged throughout the movement'
      ],
      commonMistakes: ['Sagging hips', 'Flaring elbows too wide', 'Not going low enough', 'Holding breath'],
      breathingPattern: 'Inhale as you lower down, exhale as you push up',
      safetyTips: ['Keep wrists under shoulders', 'Maintain neutral spine', 'Stop if you feel shoulder pain'],
      benefits: ['Builds upper body strength', 'Improves core stability', 'No equipment needed'],
      modifications: { easier: 'Knee push-ups or wall push-ups', harder: 'Diamond push-ups or decline push-ups' },
      caloriesPerMinute: 7,
      defaultSets: 3,
      defaultReps: 10,
      restBetweenSets: 60,
      ...EXERCISE_POSE_DATA['push-ups']
    },
    {
      name: 'Squats',
      category: 'strength',
      muscleGroups: ['quads', 'glutes', 'hamstrings', 'core'],
      difficulty: 'beginner',
      equipment: ['bodyweight'],
      description: 'A fundamental lower body exercise that builds leg strength and improves mobility.',
      instructions: [
        'Stand with feet shoulder-width apart, toes slightly pointed out',
        'Keep your chest up and core engaged',
        'Push your hips back and bend your knees to lower down',
        'Go as low as comfortable, ideally thighs parallel to ground',
        'Drive through your heels to stand back up'
      ],
      commonMistakes: ['Knees caving inward', 'Heels lifting off ground', 'Rounding lower back', 'Not going deep enough'],
      breathingPattern: 'Inhale as you lower, exhale as you stand up',
      safetyTips: ['Keep knees tracking over toes', 'Maintain neutral spine', 'Start with bodyweight before adding load'],
      benefits: ['Builds leg strength', 'Improves mobility', 'Burns calories', 'Functional movement'],
      modifications: { easier: 'Box squats or assisted squats', harder: 'Jump squats or pistol squats' },
      caloriesPerMinute: 8,
      defaultSets: 3,
      defaultReps: 15,
      restBetweenSets: 60,
      ...EXERCISE_POSE_DATA['squats']
    },
    {
      name: 'Plank',
      category: 'core',
      muscleGroups: ['core', 'abs', 'shoulders', 'glutes'],
      difficulty: 'beginner',
      equipment: ['bodyweight'],
      description: 'An isometric core exercise that builds stability and endurance in the entire midsection.',
      instructions: [
        'Start on forearms and toes, elbows under shoulders',
        'Keep your body in a straight line from head to heels',
        'Engage your core by pulling belly button toward spine',
        'Keep your glutes squeezed and legs straight',
        'Hold the position for the target duration'
      ],
      commonMistakes: ['Hips too high or sagging', 'Holding breath', 'Looking up instead of down', 'Forgetting to engage core'],
      breathingPattern: 'Breathe steadily throughout - do not hold your breath',
      safetyTips: ['Start with shorter holds and build up', 'Stop if lower back hurts', 'Keep neck neutral'],
      benefits: ['Builds core stability', 'Improves posture', 'Strengthens entire body', 'Low impact'],
      modifications: { easier: 'Knee plank', harder: 'Side plank or plank with leg lift' },
      caloriesPerMinute: 4,
      defaultSets: 3,
      defaultReps: 1,
      defaultDuration: 30,
      restBetweenSets: 45,
      repCountMethod: 'time_based',
      ...EXERCISE_POSE_DATA['plank']
    },
    {
      name: 'Lunges',
      category: 'strength',
      muscleGroups: ['quads', 'glutes', 'hamstrings', 'core'],
      difficulty: 'beginner',
      equipment: ['bodyweight'],
      description: 'A unilateral lower body exercise that builds leg strength and improves balance.',
      instructions: [
        'Stand tall with feet hip-width apart',
        'Take a big step forward with one leg',
        'Lower your body until both knees are at 90 degrees',
        'Keep your front knee over your ankle, not past your toes',
        'Push through front heel to return to starting position'
      ],
      commonMistakes: ['Front knee going past toes', 'Leaning too far forward', 'Taking too small a step', 'Not going low enough'],
      breathingPattern: 'Inhale as you step and lower, exhale as you push back up',
      safetyTips: ['Keep torso upright', 'Control the movement', 'Use wall for balance if needed'],
      benefits: ['Builds single-leg strength', 'Improves balance', 'Corrects muscle imbalances'],
      modifications: { easier: 'Reverse lunges or assisted lunges', harder: 'Walking lunges or jump lunges' },
      caloriesPerMinute: 6,
      defaultSets: 3,
      defaultReps: 12,
      restBetweenSets: 60,
      ...EXERCISE_POSE_DATA['lunges']
    },
    {
      name: 'Burpees',
      category: 'hiit',
      muscleGroups: ['full_body', 'cardio'],
      difficulty: 'intermediate',
      equipment: ['bodyweight'],
      description: 'A high-intensity full-body exercise that combines a squat, plank, push-up, and jump.',
      instructions: [
        'Start standing with feet shoulder-width apart',
        'Squat down and place hands on the floor',
        'Jump or step feet back into plank position',
        'Perform a push-up (optional)',
        'Jump feet forward to hands',
        'Explode up into a jump with arms overhead'
      ],
      commonMistakes: ['Not fully extending hips at top', 'Skipping the push-up', 'Landing with locked knees', 'Going too fast with poor form'],
      breathingPattern: 'Exhale on the jump up, breathe steadily through other phases',
      safetyTips: ['Land softly on jump', 'Modify if needed', 'Warm up properly first'],
      benefits: ['Burns maximum calories', 'Builds full-body strength', 'Improves conditioning', 'No equipment needed'],
      modifications: { easier: 'Step back instead of jump, no push-up', harder: 'Add tuck jump or push-up' },
      caloriesPerMinute: 12,
      defaultSets: 3,
      defaultReps: 10,
      restBetweenSets: 90,
      ...EXERCISE_POSE_DATA['burpees']
    },
    {
      name: 'Jumping Jacks',
      category: 'cardio',
      muscleGroups: ['cardio', 'full_body'],
      difficulty: 'beginner',
      equipment: ['bodyweight'],
      description: 'A classic cardio exercise that elevates heart rate and warms up the entire body.',
      instructions: [
        'Start standing with feet together and arms at sides',
        'Jump feet out to sides while raising arms overhead',
        'Jump back to starting position',
        'Repeat in a continuous, rhythmic motion',
        'Land softly on the balls of your feet'
      ],
      commonMistakes: ['Landing with locked knees', 'Not fully extending arms', 'Holding breath', 'Going too slow'],
      breathingPattern: 'Breathe rhythmically - exhale as you jump out',
      safetyTips: ['Wear supportive shoes', 'Soft surface preferred', 'Modify to step jacks if needed'],
      benefits: ['Great warm-up', 'Elevates heart rate', 'Improves coordination', 'Burns calories'],
      modifications: { easier: 'Step jacks without jumping', harder: 'Star jumps or seal jacks' },
      caloriesPerMinute: 10,
      defaultSets: 3,
      defaultReps: 30,
      restBetweenSets: 30,
      ...EXERCISE_POSE_DATA['jumping-jacks']
    },
    {
      name: 'Mountain Climbers',
      category: 'hiit',
      muscleGroups: ['core', 'cardio', 'shoulders'],
      difficulty: 'intermediate',
      equipment: ['bodyweight'],
      description: 'A dynamic exercise that combines cardio with core strengthening in a plank position.',
      instructions: [
        'Start in a high plank position',
        'Drive one knee toward your chest',
        'Quickly switch legs, bringing the other knee forward',
        'Continue alternating in a running motion',
        'Keep your core tight and hips level'
      ],
      commonMistakes: ['Hips rising too high', 'Not driving knees far enough', 'Bouncing hips up and down', 'Holding breath'],
      breathingPattern: 'Breathe steadily - try exhaling each time a knee drives forward',
      safetyTips: ['Maintain plank form', 'Start slow and build speed', 'Wrists under shoulders'],
      benefits: ['Burns calories', 'Strengthens core', 'Improves agility', 'No equipment needed'],
      modifications: { easier: 'Slow mountain climbers or elevated hands', harder: 'Cross-body mountain climbers' },
      caloriesPerMinute: 11,
      defaultSets: 3,
      defaultReps: 20,
      restBetweenSets: 45,
      ...EXERCISE_POSE_DATA['mountain-climbers']
    },
    {
      name: 'High Knees',
      category: 'cardio',
      muscleGroups: ['cardio', 'hip_flexors', 'core'],
      difficulty: 'beginner',
      equipment: ['bodyweight'],
      description: 'A cardio exercise that involves running in place while lifting knees high.',
      instructions: [
        'Stand with feet hip-width apart',
        'Run in place, lifting knees as high as possible',
        'Aim to bring knees to hip height',
        'Pump arms in opposition to legs',
        'Land softly on balls of feet'
      ],
      commonMistakes: ['Knees not high enough', 'Leaning back', 'Flat-footed landing', 'Arms not engaged'],
      breathingPattern: 'Breathe rhythmically with the movement',
      safetyTips: ['Wear supportive shoes', 'Start at moderate pace', 'Keep core engaged'],
      benefits: ['Great cardio workout', 'Improves running form', 'Strengthens hip flexors'],
      modifications: { easier: 'March in place', harder: 'Increase speed or add resistance' },
      caloriesPerMinute: 9,
      defaultSets: 3,
      defaultReps: 30,
      restBetweenSets: 30
    },
    {
      name: 'Bicycle Crunches',
      category: 'core',
      muscleGroups: ['abs', 'obliques', 'core'],
      difficulty: 'intermediate',
      equipment: ['bodyweight'],
      description: 'An effective core exercise that targets both the rectus abdominis and obliques.',
      instructions: [
        'Lie on your back with hands behind head',
        'Lift shoulders off ground and bring knees up',
        'Rotate torso to bring right elbow toward left knee',
        'Simultaneously extend right leg out',
        'Switch sides in a pedaling motion'
      ],
      commonMistakes: ['Pulling on neck', 'Not rotating enough', 'Going too fast', 'Not extending legs fully'],
      breathingPattern: 'Exhale as you rotate and crunch',
      safetyTips: ['Keep lower back pressed to floor', 'Support head, dont pull', 'Control the movement'],
      benefits: ['Targets obliques', 'Builds six-pack', 'Improves rotational strength'],
      modifications: { easier: 'Feet on ground crunches', harder: 'Slower tempo or legs lower' },
      caloriesPerMinute: 6,
      defaultSets: 3,
      defaultReps: 20,
      restBetweenSets: 45
    },
    {
      name: 'Glute Bridges',
      category: 'strength',
      muscleGroups: ['glutes', 'hamstrings', 'core'],
      difficulty: 'beginner',
      equipment: ['bodyweight'],
      description: 'A hip extension exercise that strengthens the glutes and posterior chain.',
      instructions: [
        'Lie on back with knees bent, feet flat on floor',
        'Arms at sides, palms down',
        'Squeeze glutes and lift hips toward ceiling',
        'Create a straight line from shoulders to knees',
        'Lower back down with control'
      ],
      commonMistakes: ['Overarching lower back', 'Not squeezing glutes', 'Pushing through toes instead of heels', 'Going too fast'],
      breathingPattern: 'Exhale as you lift hips, inhale as you lower',
      safetyTips: ['Keep core engaged', 'Dont hyperextend back', 'Press through heels'],
      benefits: ['Strengthens glutes', 'Improves hip mobility', 'Helps lower back pain'],
      modifications: { easier: 'Smaller range of motion', harder: 'Single-leg bridge or add weight' },
      caloriesPerMinute: 5,
      defaultSets: 3,
      defaultReps: 15,
      restBetweenSets: 45
    }
  ]

  for (const exercise of defaultExercises) {
    try {
      await Exercise.findOneAndUpdate(
        { name: exercise.name },
        { ...exercise, isActive: true },
        { upsert: true, new: true }
      )
    } catch (error) {
      console.error(`Error seeding exercise ${exercise.name}:`, error)
    }
  }

  console.log(`Seeded ${defaultExercises.length} exercises`)
}

export default {
  generateExerciseWithAI,
  generateWorkoutPlan,
  seedExercises
}
