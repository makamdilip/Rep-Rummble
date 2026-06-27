"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const challenge_controller_1 = require("../controllers/challenge.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
// All challenge routes require authentication
router.use(auth_middleware_1.protect);
// Create a new challenge
router.post("/", challenge_controller_1.createChallenge);
// Get challenges (with filtering)
router.get("/", challenge_controller_1.getChallenges);
// Join a challenge
router.post("/:challengeId/join", challenge_controller_1.joinChallenge);
// Get challenge progress for current user
router.get("/:challengeId/progress", challenge_controller_1.getChallengeProgress);
// Get challenge leaderboard
router.get("/:challengeId/leaderboard", challenge_controller_1.getChallengeLeaderboard);
exports.default = router;
//# sourceMappingURL=challenge.routes.js.map