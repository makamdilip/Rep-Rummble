/**
 * Pose Analysis Service
 *
 * This service analyzes pose keypoints from MediaPipe/TensorFlow.js
 * and provides form feedback for exercises.
 *
 * Note: The actual pose detection runs on the client (mobile app).
 * This service processes the keypoint data and returns analysis.
 */

// MediaPipe Pose Landmarks (33 points)
export const POSE_LANDMARKS = {
  NOSE: 0,
  LEFT_EYE_INNER: 1,
  LEFT_EYE: 2,
  LEFT_EYE_OUTER: 3,
  RIGHT_EYE_INNER: 4,
  RIGHT_EYE: 5,
  RIGHT_EYE_OUTER: 6,
  LEFT_EAR: 7,
  RIGHT_EAR: 8,
  MOUTH_LEFT: 9,
  MOUTH_RIGHT: 10,
  LEFT_SHOULDER: 11,
  RIGHT_SHOULDER: 12,
  LEFT_ELBOW: 13,
  RIGHT_ELBOW: 14,
  LEFT_WRIST: 15,
  RIGHT_WRIST: 16,
  LEFT_PINKY: 17,
  RIGHT_PINKY: 18,
  LEFT_INDEX: 19,
  RIGHT_INDEX: 20,
  LEFT_THUMB: 21,
  RIGHT_THUMB: 22,
  LEFT_HIP: 23,
  RIGHT_HIP: 24,
  LEFT_KNEE: 25,
  RIGHT_KNEE: 26,
  LEFT_ANKLE: 27,
  RIGHT_ANKLE: 28,
  LEFT_HEEL: 29,
  RIGHT_HEEL: 30,
  LEFT_FOOT_INDEX: 31,
  RIGHT_FOOT_INDEX: 32
}

// Types
export interface PoseKeypoint {
  x: number
  y: number
  z?: number
  visibility?: number
  name?: string
}

export interface PoseFrame {
  timestamp: number
  keypoints: PoseKeypoint[]
}

export interface JointAngle {
  joint: string
  angle: number
  targetMin: number
  targetMax: number
  inRange: boolean
}

export interface FormIssue {
  bodyPart: string
  issue: string
  severity: 'minor' | 'moderate' | 'severe'
  correction: string
}

export interface RepAnalysis {
  repNumber: number
  formScore: number
  issues: FormIssue[]
  jointAngles: JointAngle[]
  rangeOfMotion: number
  tempo: {
    eccentric: number
    concentric: number
    isControlled: boolean
  }
}

export interface ExerciseFormConfig {
  name: string
  targetAngles: {
    joint: string
    phase: 'start' | 'middle' | 'end'
    min: number
    max: number
  }[]
  repDetection: {
    method: 'angle_threshold' | 'position_threshold'
    primaryJoint: string
    startAngle: number
    endAngle: number
  }
  commonIssues: {
    condition: string
    bodyPart: string
    issue: string
    correction: string
  }[]
}

// Exercise form configurations
const EXERCISE_FORM_CONFIGS: Record<string, ExerciseFormConfig> = {
  'push-ups': {
    name: 'Push-ups',
    targetAngles: [
      { joint: 'left_elbow', phase: 'start', min: 160, max: 180 },
      { joint: 'left_elbow', phase: 'middle', min: 80, max: 100 },
      { joint: 'hip', phase: 'start', min: 160, max: 180 },
      { joint: 'hip', phase: 'middle', min: 160, max: 180 }
    ],
    repDetection: {
      method: 'angle_threshold',
      primaryJoint: 'left_elbow',
      startAngle: 160,
      endAngle: 90
    },
    commonIssues: [
      {
        condition: 'hip_angle < 150',
        bodyPart: 'hips',
        issue: 'Hips sagging',
        correction: 'Engage your core and keep your body in a straight line'
      },
      {
        condition: 'hip_angle > 190',
        bodyPart: 'hips',
        issue: 'Hips too high',
        correction: 'Lower your hips to form a straight line from head to heels'
      },
      {
        condition: 'elbow_flare > 70',
        bodyPart: 'elbows',
        issue: 'Elbows flaring out',
        correction: 'Keep elbows at 45 degrees to your body'
      }
    ]
  },
  'squats': {
    name: 'Squats',
    targetAngles: [
      { joint: 'left_knee', phase: 'start', min: 160, max: 180 },
      { joint: 'left_knee', phase: 'middle', min: 70, max: 100 },
      { joint: 'hip', phase: 'start', min: 160, max: 180 },
      { joint: 'hip', phase: 'middle', min: 70, max: 100 }
    ],
    repDetection: {
      method: 'angle_threshold',
      primaryJoint: 'left_knee',
      startAngle: 160,
      endAngle: 90
    },
    commonIssues: [
      {
        condition: 'knee_over_toe',
        bodyPart: 'knees',
        issue: 'Knees going too far forward',
        correction: 'Push your hips back and keep knees behind toes'
      },
      {
        condition: 'knee_cave',
        bodyPart: 'knees',
        issue: 'Knees caving inward',
        correction: 'Push your knees out over your toes'
      },
      {
        condition: 'back_round',
        bodyPart: 'back',
        issue: 'Back rounding',
        correction: 'Keep your chest up and maintain a neutral spine'
      }
    ]
  },
  'lunges': {
    name: 'Lunges',
    targetAngles: [
      { joint: 'front_knee', phase: 'middle', min: 85, max: 95 },
      { joint: 'back_knee', phase: 'middle', min: 85, max: 95 },
      { joint: 'hip', phase: 'middle', min: 160, max: 180 }
    ],
    repDetection: {
      method: 'angle_threshold',
      primaryJoint: 'front_knee',
      startAngle: 160,
      endAngle: 90
    },
    commonIssues: [
      {
        condition: 'front_knee_over_toe',
        bodyPart: 'front knee',
        issue: 'Front knee going past toes',
        correction: 'Take a longer step and keep knee over ankle'
      },
      {
        condition: 'torso_lean',
        bodyPart: 'torso',
        issue: 'Leaning forward too much',
        correction: 'Keep your torso upright and core engaged'
      }
    ]
  },
  'plank': {
    name: 'Plank',
    targetAngles: [
      { joint: 'hip', phase: 'start', min: 160, max: 180 },
      { joint: 'shoulder', phase: 'start', min: 85, max: 95 }
    ],
    repDetection: {
      method: 'angle_threshold',
      primaryJoint: 'hip',
      startAngle: 170,
      endAngle: 170
    },
    commonIssues: [
      {
        condition: 'hip_sag',
        bodyPart: 'hips',
        issue: 'Hips sagging',
        correction: 'Squeeze your glutes and engage your core'
      },
      {
        condition: 'hip_pike',
        bodyPart: 'hips',
        issue: 'Hips too high',
        correction: 'Lower your hips to form a straight line'
      },
      {
        condition: 'head_drop',
        bodyPart: 'head',
        issue: 'Head dropping',
        correction: 'Keep your head in line with your spine, look at the floor'
      }
    ]
  }
}

/**
 * Calculate angle between three points
 */
export function calculateAngle(
  pointA: PoseKeypoint,
  pointB: PoseKeypoint,
  pointC: PoseKeypoint
): number {
  const radians = Math.atan2(pointC.y - pointB.y, pointC.x - pointB.x) -
                  Math.atan2(pointA.y - pointB.y, pointA.x - pointB.x)
  let angle = Math.abs(radians * 180.0 / Math.PI)
  if (angle > 180.0) {
    angle = 360 - angle
  }
  return angle
}

/**
 * Get joint angles from pose keypoints
 */
export function getJointAngles(keypoints: PoseKeypoint[]): Record<string, number> {
  const angles: Record<string, number> = {}

  // Left elbow angle (shoulder -> elbow -> wrist)
  if (keypoints[POSE_LANDMARKS.LEFT_SHOULDER] &&
      keypoints[POSE_LANDMARKS.LEFT_ELBOW] &&
      keypoints[POSE_LANDMARKS.LEFT_WRIST]) {
    angles['left_elbow'] = calculateAngle(
      keypoints[POSE_LANDMARKS.LEFT_SHOULDER],
      keypoints[POSE_LANDMARKS.LEFT_ELBOW],
      keypoints[POSE_LANDMARKS.LEFT_WRIST]
    )
  }

  // Right elbow angle
  if (keypoints[POSE_LANDMARKS.RIGHT_SHOULDER] &&
      keypoints[POSE_LANDMARKS.RIGHT_ELBOW] &&
      keypoints[POSE_LANDMARKS.RIGHT_WRIST]) {
    angles['right_elbow'] = calculateAngle(
      keypoints[POSE_LANDMARKS.RIGHT_SHOULDER],
      keypoints[POSE_LANDMARKS.RIGHT_ELBOW],
      keypoints[POSE_LANDMARKS.RIGHT_WRIST]
    )
  }

  // Left knee angle (hip -> knee -> ankle)
  if (keypoints[POSE_LANDMARKS.LEFT_HIP] &&
      keypoints[POSE_LANDMARKS.LEFT_KNEE] &&
      keypoints[POSE_LANDMARKS.LEFT_ANKLE]) {
    angles['left_knee'] = calculateAngle(
      keypoints[POSE_LANDMARKS.LEFT_HIP],
      keypoints[POSE_LANDMARKS.LEFT_KNEE],
      keypoints[POSE_LANDMARKS.LEFT_ANKLE]
    )
  }

  // Right knee angle
  if (keypoints[POSE_LANDMARKS.RIGHT_HIP] &&
      keypoints[POSE_LANDMARKS.RIGHT_KNEE] &&
      keypoints[POSE_LANDMARKS.RIGHT_ANKLE]) {
    angles['right_knee'] = calculateAngle(
      keypoints[POSE_LANDMARKS.RIGHT_HIP],
      keypoints[POSE_LANDMARKS.RIGHT_KNEE],
      keypoints[POSE_LANDMARKS.RIGHT_ANKLE]
    )
  }

  // Hip angle (shoulder -> hip -> knee)
  if (keypoints[POSE_LANDMARKS.LEFT_SHOULDER] &&
      keypoints[POSE_LANDMARKS.LEFT_HIP] &&
      keypoints[POSE_LANDMARKS.LEFT_KNEE]) {
    angles['left_hip'] = calculateAngle(
      keypoints[POSE_LANDMARKS.LEFT_SHOULDER],
      keypoints[POSE_LANDMARKS.LEFT_HIP],
      keypoints[POSE_LANDMARKS.LEFT_KNEE]
    )
  }

  // Shoulder angle (elbow -> shoulder -> hip)
  if (keypoints[POSE_LANDMARKS.LEFT_ELBOW] &&
      keypoints[POSE_LANDMARKS.LEFT_SHOULDER] &&
      keypoints[POSE_LANDMARKS.LEFT_HIP]) {
    angles['left_shoulder'] = calculateAngle(
      keypoints[POSE_LANDMARKS.LEFT_ELBOW],
      keypoints[POSE_LANDMARKS.LEFT_SHOULDER],
      keypoints[POSE_LANDMARKS.LEFT_HIP]
    )
  }

  // Body straightness (for plank detection)
  if (keypoints[POSE_LANDMARKS.LEFT_SHOULDER] &&
      keypoints[POSE_LANDMARKS.LEFT_HIP] &&
      keypoints[POSE_LANDMARKS.LEFT_ANKLE]) {
    angles['body_line'] = calculateAngle(
      keypoints[POSE_LANDMARKS.LEFT_SHOULDER],
      keypoints[POSE_LANDMARKS.LEFT_HIP],
      keypoints[POSE_LANDMARKS.LEFT_ANKLE]
    )
  }

  return angles
}

/**
 * Analyze form for a specific exercise
 */
export function analyzeForm(
  exerciseSlug: string,
  keypoints: PoseKeypoint[],
  phase: 'start' | 'middle' | 'end'
): { score: number; issues: FormIssue[]; jointAngles: JointAngle[] } {
  const config = EXERCISE_FORM_CONFIGS[exerciseSlug]
  if (!config) {
    return { score: 100, issues: [], jointAngles: [] }
  }

  const angles = getJointAngles(keypoints)
  const issues: FormIssue[] = []
  const jointAngles: JointAngle[] = []
  let totalScore = 100

  // Check target angles for current phase
  const phaseTargets = config.targetAngles.filter(t => t.phase === phase)

  for (const target of phaseTargets) {
    const currentAngle = angles[target.joint]
    if (currentAngle === undefined) continue

    const inRange = currentAngle >= target.min && currentAngle <= target.max
    jointAngles.push({
      joint: target.joint,
      angle: Math.round(currentAngle),
      targetMin: target.min,
      targetMax: target.max,
      inRange
    })

    if (!inRange) {
      // Calculate penalty based on how far off
      const deviation = currentAngle < target.min
        ? target.min - currentAngle
        : currentAngle - target.max
      const penalty = Math.min(deviation * 0.5, 20)
      totalScore -= penalty
    }
  }

  // Check common issues based on angles
  // Hip sag check
  if (angles['body_line'] && angles['body_line'] < 150) {
    issues.push({
      bodyPart: 'hips',
      issue: 'Hips sagging',
      severity: angles['body_line'] < 130 ? 'severe' : 'moderate',
      correction: 'Engage your core and squeeze your glutes'
    })
    totalScore -= 15
  }

  // Hip pike check
  if (angles['body_line'] && angles['body_line'] > 190) {
    issues.push({
      bodyPart: 'hips',
      issue: 'Hips too high',
      severity: 'moderate',
      correction: 'Lower your hips to form a straight line'
    })
    totalScore -= 10
  }

  // Knee cave check for squats/lunges
  if (exerciseSlug === 'squats' || exerciseSlug === 'lunges') {
    const leftKnee = keypoints[POSE_LANDMARKS.LEFT_KNEE]
    const leftAnkle = keypoints[POSE_LANDMARKS.LEFT_ANKLE]
    const leftHip = keypoints[POSE_LANDMARKS.LEFT_HIP]

    if (leftKnee && leftAnkle && leftHip) {
      // Check if knee is inside the line from hip to ankle
      const kneeXOffset = leftKnee.x - leftAnkle.x
      const hipXOffset = leftHip.x - leftAnkle.x

      if (Math.abs(kneeXOffset) > Math.abs(hipXOffset) * 1.2) {
        issues.push({
          bodyPart: 'knees',
          issue: 'Knees caving inward',
          severity: 'moderate',
          correction: 'Push your knees out over your toes'
        })
        totalScore -= 15
      }
    }
  }

  return {
    score: Math.max(0, Math.round(totalScore)),
    issues,
    jointAngles
  }
}

/**
 * Detect if a rep was completed based on angle changes
 */
export function detectRepCompletion(
  exerciseSlug: string,
  angleHistory: number[],
  threshold: number = 5
): boolean {
  const config = EXERCISE_FORM_CONFIGS[exerciseSlug]
  if (!config || angleHistory.length < 3) return false

  const { startAngle, endAngle } = config.repDetection

  // Look for pattern: high angle -> low angle -> high angle
  const recentAngles = angleHistory.slice(-10)
  let foundDown = false
  let foundUp = false

  for (let i = 1; i < recentAngles.length; i++) {
    const prev = recentAngles[i - 1]
    const curr = recentAngles[i]

    // Detect downward movement
    if (!foundDown && prev > startAngle - threshold && curr < endAngle + threshold) {
      foundDown = true
    }

    // Detect upward movement after down
    if (foundDown && !foundUp && prev < endAngle + threshold && curr > startAngle - threshold) {
      foundUp = true
    }
  }

  return foundDown && foundUp
}

/**
 * Generate form feedback summary
 */
export function generateFormFeedback(analyses: RepAnalysis[]): string[] {
  if (analyses.length === 0) return []

  const feedback: string[] = []
  const issueFrequency: Record<string, number> = {}

  // Count issue frequency
  for (const analysis of analyses) {
    for (const issue of analysis.issues) {
      const key = `${issue.bodyPart}:${issue.issue}`
      issueFrequency[key] = (issueFrequency[key] || 0) + 1
    }
  }

  // Generate feedback for frequent issues
  const sortedIssues = Object.entries(issueFrequency)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)

  for (const [key, count] of sortedIssues) {
    const [bodyPart, issue] = key.split(':')
    const percentage = Math.round((count / analyses.length) * 100)

    if (percentage >= 50) {
      const relevantAnalysis = analyses.find(a =>
        a.issues.some(i => i.bodyPart === bodyPart && i.issue === issue)
      )
      const correction = relevantAnalysis?.issues.find(
        i => i.bodyPart === bodyPart && i.issue === issue
      )?.correction

      feedback.push(`${issue} detected in ${percentage}% of reps. ${correction || ''}`)
    }
  }

  // Add positive feedback if form was good
  const avgScore = analyses.reduce((sum, a) => sum + a.formScore, 0) / analyses.length
  if (avgScore >= 85) {
    feedback.push('Excellent form! Keep up the great work.')
  } else if (avgScore >= 70) {
    feedback.push('Good form overall. Focus on the tips above for improvement.')
  }

  return feedback
}

export default {
  POSE_LANDMARKS,
  calculateAngle,
  getJointAngles,
  analyzeForm,
  detectRepCompletion,
  generateFormFeedback,
  EXERCISE_FORM_CONFIGS
}
