"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePost = exports.getPostComments = exports.addComment = exports.likePost = exports.getFeed = exports.createPost = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const SocialPost_model_1 = require("../models/SocialPost.model");
const User_model_1 = require("../models/User.model");
const createPost = async (req, res) => {
    try {
        const userId = req.user?.id;
        const { content, postType, mediaUrls, workoutId, challengeId, tags } = req.body;
        if (!userId) {
            return res.status(401).json({ error: "Unauthorized" });
        }
        if (!content && !mediaUrls?.length) {
            return res.status(400).json({ error: "Post must have content or media" });
        }
        const post = new SocialPost_model_1.SocialPost({
            author: userId,
            content,
            postType: postType || "general",
            mediaUrls: mediaUrls || [],
            workoutId,
            challengeId,
            tags: tags || [],
        });
        await post.save();
        // Populate author details
        await post.populate("author", "displayName email");
        res.status(201).json({
            success: true,
            message: "Post created successfully",
            post,
        });
    }
    catch (error) {
        console.error("Error creating post:", error);
        res.status(500).json({ error: "Failed to create post" });
    }
};
exports.createPost = createPost;
const getFeed = async (req, res) => {
    try {
        const userId = req.user?.id;
        const { page = 1, limit = 20, type } = req.query;
        if (!userId) {
            return res.status(401).json({ error: "Unauthorized" });
        }
        // Get user's friends
        const user = await User_model_1.User.findById(userId).populate("friends", "_id");
        const friendIds = user?.friends?.map((friend) => friend._id) || [];
        const query = {
            $or: [
                { author: userId }, // User's own posts
                { author: { $in: friendIds } }, // Friends' posts
                { isPublic: true }, // Public posts
            ],
        };
        if (type && type !== "all") {
            query.postType = type;
        }
        const posts = await SocialPost_model_1.SocialPost.find(query)
            .populate("author", "displayName email")
            .populate("workoutId", "name type duration")
            .populate("challengeId", "title challengeType")
            .sort({ createdAt: -1 })
            .limit(parseInt(limit))
            .skip((parseInt(page) - 1) * parseInt(limit));
        const total = await SocialPost_model_1.SocialPost.countDocuments(query);
        res.json({
            success: true,
            posts,
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                total,
                pages: Math.ceil(total / parseInt(limit)),
            },
        });
    }
    catch (error) {
        console.error("Error getting feed:", error);
        res.status(500).json({ error: "Failed to get feed" });
    }
};
exports.getFeed = getFeed;
const likePost = async (req, res) => {
    try {
        const userId = req.user?.id;
        const { postId } = req.params;
        if (!userId) {
            return res.status(401).json({ error: "Unauthorized" });
        }
        const post = await SocialPost_model_1.SocialPost.findById(postId);
        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }
        const likeIndex = post.likes.indexOf(new mongoose_1.default.Types.ObjectId(userId));
        if (likeIndex > -1) {
            // Unlike
            post.likes.splice(likeIndex, 1);
        }
        else {
            // Like
            post.likes.push(new mongoose_1.default.Types.ObjectId(userId));
        }
        await post.save();
        res.json({
            success: true,
            liked: likeIndex === -1,
            likesCount: post.likes.length,
        });
    }
    catch (error) {
        console.error("Error liking post:", error);
        res.status(500).json({ error: "Failed to like post" });
    }
};
exports.likePost = likePost;
const addComment = async (req, res) => {
    try {
        const userId = req.user?.id;
        const { postId } = req.params;
        const { content } = req.body;
        if (!userId) {
            return res.status(401).json({ error: "Unauthorized" });
        }
        if (!content) {
            return res.status(400).json({ error: "Comment content is required" });
        }
        const post = await SocialPost_model_1.SocialPost.findById(postId);
        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }
        const comment = {
            author: new mongoose_1.default.Types.ObjectId(userId),
            content,
            createdAt: new Date(),
        };
        post.comments.push(comment);
        await post.save();
        // Populate comment author
        await post.populate("comments.author", "displayName email");
        const newComment = post.comments[post.comments.length - 1];
        res.status(201).json({
            success: true,
            message: "Comment added successfully",
            comment: newComment,
        });
    }
    catch (error) {
        console.error("Error adding comment:", error);
        res.status(500).json({ error: "Failed to add comment" });
    }
};
exports.addComment = addComment;
const getPostComments = async (req, res) => {
    try {
        const { postId } = req.params;
        const { page = 1, limit = 20 } = req.query;
        const post = await SocialPost_model_1.SocialPost.findById(postId)
            .populate("comments.author", "displayName email")
            .select("comments");
        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }
        const comments = post.comments
            .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
            .slice((parseInt(page) - 1) * parseInt(limit), parseInt(page) * parseInt(limit));
        res.json({
            success: true,
            comments,
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                total: post.comments.length,
                pages: Math.ceil(post.comments.length / parseInt(limit)),
            },
        });
    }
    catch (error) {
        console.error("Error getting post comments:", error);
        res.status(500).json({ error: "Failed to get post comments" });
    }
};
exports.getPostComments = getPostComments;
const deletePost = async (req, res) => {
    try {
        const userId = req.user?.id;
        const { postId } = req.params;
        if (!userId) {
            return res.status(401).json({ error: "Unauthorized" });
        }
        const post = await SocialPost_model_1.SocialPost.findById(postId);
        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }
        if (post.author.toString() !== userId) {
            return res
                .status(403)
                .json({ error: "Not authorized to delete this post" });
        }
        await SocialPost_model_1.SocialPost.findByIdAndDelete(postId);
        res.json({
            success: true,
            message: "Post deleted successfully",
        });
    }
    catch (error) {
        console.error("Error deleting post:", error);
        res.status(500).json({ error: "Failed to delete post" });
    }
};
exports.deletePost = deletePost;
//# sourceMappingURL=social.controller.js.map