/**
 * Pose Analysis Service
 *
 * This service analyzes pose keypoints from MediaPipe/TensorFlow.js
 * and provides form feedback for exercises.
 *
 * Note: The actual pose detection runs on the client (mobile app).
 * This service processes the keypoint data and returns analysis.
 */
export declare const POSE_LANDMARKS: {
    NOSE: number;
    LEFT_EYE_INNER: number;
    LEFT_EYE: number;
    LEFT_EYE_OUTER: number;
    RIGHT_EYE_INNER: number;
    RIGHT_EYE: number;
    RIGHT_EYE_OUTER: number;
    LEFT_EAR: number;
    RIGHT_EAR: number;
    MOUTH_LEFT: number;
    MOUTH_RIGHT: number;
    LEFT_SHOULDER: number;
    RIGHT_SHOULDER: number;
    LEFT_ELBOW: number;
    RIGHT_ELBOW: number;
    LEFT_WRIST: number;
    RIGHT_WRIST: number;
    LEFT_PINKY: number;
    RIGHT_PINKY: number;
    LEFT_INDEX: number;
    RIGHT_INDEX: number;
    LEFT_THUMB: number;
    RIGHT_THUMB: number;
    LEFT_HIP: number;
    RIGHT_HIP: number;
    LEFT_KNEE: number;
    RIGHT_KNEE: number;
    LEFT_ANKLE: number;
    RIGHT_ANKLE: number;
    LEFT_HEEL: number;
    RIGHT_HEEL: number;
    LEFT_FOOT_INDEX: number;
    RIGHT_FOOT_INDEX: number;
};
export interface PoseKeypoint {
    x: number;
    y: number;
    z?: number;
    visibility?: number;
    name?: string;
}
export interface PoseFrame {
    timestamp: number;
    keypoints: PoseKeypoint[];
}
export interface JointAngle {
    joint: string;
    angle: number;
    targetMin: number;
    targetMax: number;
    inRange: boolean;
}
export interface FormIssue {
    bodyPart: string;
    issue: string;
    severity: 'minor' | 'moderate' | 'severe';
    correction: string;
}
export interface RepAnalysis {
    repNumber: number;
    formScore: number;
    issues: FormIssue[];
    jointAngles: JointAngle[];
    rangeOfMotion: number;
    tempo: {
        eccentric: number;
        concentric: number;
        isControlled: boolean;
    };
}
export interface ExerciseFormConfig {
    name: string;
    targetAngles: {
        joint: string;
        phase: 'start' | 'middle' | 'end';
        min: number;
        max: number;
    }[];
    repDetection: {
        method: 'angle_threshold' | 'position_threshold';
        primaryJoint: string;
        startAngle: number;
        endAngle: number;
    };
    commonIssues: {
        condition: string;
        bodyPart: string;
        issue: string;
        correction: string;
    }[];
}
/**
 * Calculate angle between three points
 */
export declare function calculateAngle(pointA: PoseKeypoint, pointB: PoseKeypoint, pointC: PoseKeypoint): number;
/**
 * Get joint angles from pose keypoints
 */
export declare function getJointAngles(keypoints: PoseKeypoint[]): Record<string, number>;
/**
 * Analyze form for a specific exercise
 */
export declare function analyzeForm(exerciseSlug: string, keypoints: PoseKeypoint[], phase: 'start' | 'middle' | 'end'): {
    score: number;
    issues: FormIssue[];
    jointAngles: JointAngle[];
};
/**
 * Detect if a rep was completed based on angle changes
 */
export declare function detectRepCompletion(exerciseSlug: string, angleHistory: number[], threshold?: number): boolean;
/**
 * Generate form feedback summary
 */
export declare function generateFormFeedback(analyses: RepAnalysis[]): string[];
declare const _default: {
    POSE_LANDMARKS: {
        NOSE: number;
        LEFT_EYE_INNER: number;
        LEFT_EYE: number;
        LEFT_EYE_OUTER: number;
        RIGHT_EYE_INNER: number;
        RIGHT_EYE: number;
        RIGHT_EYE_OUTER: number;
        LEFT_EAR: number;
        RIGHT_EAR: number;
        MOUTH_LEFT: number;
        MOUTH_RIGHT: number;
        LEFT_SHOULDER: number;
        RIGHT_SHOULDER: number;
        LEFT_ELBOW: number;
        RIGHT_ELBOW: number;
        LEFT_WRIST: number;
        RIGHT_WRIST: number;
        LEFT_PINKY: number;
        RIGHT_PINKY: number;
        LEFT_INDEX: number;
        RIGHT_INDEX: number;
        LEFT_THUMB: number;
        RIGHT_THUMB: number;
        LEFT_HIP: number;
        RIGHT_HIP: number;
        LEFT_KNEE: number;
        RIGHT_KNEE: number;
        LEFT_ANKLE: number;
        RIGHT_ANKLE: number;
        LEFT_HEEL: number;
        RIGHT_HEEL: number;
        LEFT_FOOT_INDEX: number;
        RIGHT_FOOT_INDEX: number;
    };
    calculateAngle: typeof calculateAngle;
    getJointAngles: typeof getJointAngles;
    analyzeForm: typeof analyzeForm;
    detectRepCompletion: typeof detectRepCompletion;
    generateFormFeedback: typeof generateFormFeedback;
    EXERCISE_FORM_CONFIGS: Record<string, ExerciseFormConfig>;
};
export default _default;
//# sourceMappingURL=pose.service.d.ts.map