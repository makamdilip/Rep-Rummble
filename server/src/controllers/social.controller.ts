import { Response } from "express";
import mongoose from "mongoose";
import { AuthRequest } from "../middleware/auth.middleware";
import { SocialPost } from "../models/SocialPost.model";
import { User } from "../models/User.model";

export const createPost = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    const { content, postType, mediaUrls, workoutId, challengeId, tags } =
      req.body;

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    if (!content && !mediaUrls?.length) {
      return res.status(400).json({ error: "Post must have content or media" });
    }

    const post = new SocialPost({
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
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ error: "Failed to create post" });
  }
};

export const getFeed = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    const { page = 1, limit = 20, type } = req.query;

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // Get user's friends
    const user = await User.findById(userId).populate("friends", "_id");
    const friendIds = user?.friends?.map((friend) => friend._id) || [];

    const query: any = {
      $or: [
        { author: userId }, // User's own posts
        { author: { $in: friendIds } }, // Friends' posts
        { isPublic: true }, // Public posts
      ],
    };

    if (type && type !== "all") {
      query.postType = type;
    }

    const posts = await SocialPost.find(query)
      .populate("author", "displayName email")
      .populate("workoutId", "name type duration")
      .populate("challengeId", "title challengeType")
      .sort({ createdAt: -1 })
      .limit(parseInt(limit as string))
      .skip((parseInt(page as string) - 1) * parseInt(limit as string));

    const total = await SocialPost.countDocuments(query);

    res.json({
      success: true,
      posts,
      pagination: {
        page: parseInt(page as string),
        limit: parseInt(limit as string),
        total,
        pages: Math.ceil(total / parseInt(limit as string)),
      },
    });
  } catch (error) {
    console.error("Error getting feed:", error);
    res.status(500).json({ error: "Failed to get feed" });
  }
};

export const likePost = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    const { postId } = req.params;

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const post = await SocialPost.findById(postId);

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    const likeIndex = post.likes.indexOf(new mongoose.Types.ObjectId(userId));

    if (likeIndex > -1) {
      // Unlike
      post.likes.splice(likeIndex, 1);
    } else {
      // Like
      post.likes.push(new mongoose.Types.ObjectId(userId));
    }

    await post.save();

    res.json({
      success: true,
      liked: likeIndex === -1,
      likesCount: post.likes.length,
    });
  } catch (error) {
    console.error("Error liking post:", error);
    res.status(500).json({ error: "Failed to like post" });
  }
};

export const addComment = async (req: AuthRequest, res: Response) => {
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

    const post = await SocialPost.findById(postId);

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    const comment = {
      author: new mongoose.Types.ObjectId(userId),
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
  } catch (error) {
    console.error("Error adding comment:", error);
    res.status(500).json({ error: "Failed to add comment" });
  }
};

export const getPostComments = async (req: AuthRequest, res: Response) => {
  try {
    const { postId } = req.params;
    const { page = 1, limit = 20 } = req.query;

    const post = await SocialPost.findById(postId)
      .populate("comments.author", "displayName email")
      .select("comments");

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    const comments = post.comments
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(
        (parseInt(page as string) - 1) * parseInt(limit as string),
        parseInt(page as string) * parseInt(limit as string),
      );

    res.json({
      success: true,
      comments,
      pagination: {
        page: parseInt(page as string),
        limit: parseInt(limit as string),
        total: post.comments.length,
        pages: Math.ceil(post.comments.length / parseInt(limit as string)),
      },
    });
  } catch (error) {
    console.error("Error getting post comments:", error);
    res.status(500).json({ error: "Failed to get post comments" });
  }
};

export const deletePost = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    const { postId } = req.params;

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const post = await SocialPost.findById(postId);

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    if (post.author.toString() !== userId) {
      return res
        .status(403)
        .json({ error: "Not authorized to delete this post" });
    }

    await SocialPost.findByIdAndDelete(postId);

    res.json({
      success: true,
      message: "Post deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).json({ error: "Failed to delete post" });
  }
};
