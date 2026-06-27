"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const social_controller_1 = require("../controllers/social.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
// All social routes require authentication
router.use(auth_middleware_1.protect);
// Create a new post
router.post("/posts", social_controller_1.createPost);
// Get social feed
router.get("/feed", social_controller_1.getFeed);
// Like/unlike a post
router.post("/posts/:postId/like", social_controller_1.likePost);
// Add comment to a post
router.post("/posts/:postId/comments", social_controller_1.addComment);
// Get comments for a post
router.get("/posts/:postId/comments", social_controller_1.getPostComments);
// Delete a post
router.delete("/posts/:postId", social_controller_1.deletePost);
exports.default = router;
//# sourceMappingURL=social.routes.js.map