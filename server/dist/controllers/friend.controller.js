"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeFriend = exports.getFriendRequests = exports.getFriends = exports.declineFriendRequest = exports.acceptFriendRequest = exports.sendFriendRequest = void 0;
const Friendship_model_1 = require("../models/Friendship.model");
const User_model_1 = require("../models/User.model");
const sendFriendRequest = async (req, res) => {
    try {
        const userId = req.user?.id;
        const { friendId } = req.body;
        if (!userId || !friendId) {
            return res
                .status(400)
                .json({ error: "User ID and friend ID are required" });
        }
        if (userId === friendId) {
            return res
                .status(400)
                .json({ error: "Cannot send friend request to yourself" });
        }
        // Check if users exist
        const [user, friend] = await Promise.all([
            User_model_1.User.findById(userId),
            User_model_1.User.findById(friendId),
        ]);
        if (!user || !friend) {
            return res.status(404).json({ error: "User not found" });
        }
        // Check if friendship already exists
        const existingFriendship = await Friendship_model_1.Friendship.findOne({
            $or: [
                { requester: userId, recipient: friendId },
                { requester: friendId, recipient: userId },
            ],
        });
        if (existingFriendship) {
            if (existingFriendship.status === "accepted") {
                return res.status(400).json({ error: "Users are already friends" });
            }
            if (existingFriendship.status === "pending") {
                return res.status(400).json({ error: "Friend request already sent" });
            }
        }
        // Create new friendship request
        const friendship = new Friendship_model_1.Friendship({
            requester: userId,
            recipient: friendId,
            status: "pending",
        });
        await friendship.save();
        res.json({
            success: true,
            message: "Friend request sent successfully",
            friendship,
        });
    }
    catch (error) {
        console.error("Error sending friend request:", error);
        res.status(500).json({ error: "Failed to send friend request" });
    }
};
exports.sendFriendRequest = sendFriendRequest;
const acceptFriendRequest = async (req, res) => {
    try {
        const userId = req.user?.id;
        const { friendshipId } = req.params;
        if (!userId) {
            return res.status(401).json({ error: "Unauthorized" });
        }
        const friendship = await Friendship_model_1.Friendship.findById(friendshipId);
        if (!friendship) {
            return res.status(404).json({ error: "Friend request not found" });
        }
        if (friendship.recipient !== userId) {
            return res
                .status(403)
                .json({ error: "Not authorized to accept this request" });
        }
        if (friendship.status !== "pending") {
            return res.status(400).json({ error: "Request already processed" });
        }
        friendship.status = "accepted";
        await friendship.save();
        res.json({
            success: true,
            message: "Friend request accepted",
            friendship,
        });
    }
    catch (error) {
        console.error("Error accepting friend request:", error);
        res.status(500).json({ error: "Failed to accept friend request" });
    }
};
exports.acceptFriendRequest = acceptFriendRequest;
const declineFriendRequest = async (req, res) => {
    try {
        const userId = req.user?.id;
        const { friendshipId } = req.params;
        if (!userId) {
            return res.status(401).json({ error: "Unauthorized" });
        }
        const friendship = await Friendship_model_1.Friendship.findById(friendshipId);
        if (!friendship) {
            return res.status(404).json({ error: "Friend request not found" });
        }
        if (friendship.recipient !== userId) {
            return res
                .status(403)
                .json({ error: "Not authorized to decline this request" });
        }
        friendship.status = "declined";
        await friendship.save();
        res.json({
            success: true,
            message: "Friend request declined",
            friendship,
        });
    }
    catch (error) {
        console.error("Error declining friend request:", error);
        res.status(500).json({ error: "Failed to decline friend request" });
    }
};
exports.declineFriendRequest = declineFriendRequest;
const getFriends = async (req, res) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json({ error: "Unauthorized" });
        }
        const friendships = await Friendship_model_1.Friendship.find({
            $or: [
                { requester: userId, status: "accepted" },
                { recipient: userId, status: "accepted" },
            ],
        }).populate("requester recipient", "displayName email");
        const friends = friendships.map((friendship) => {
            const friend = (friendship.requester === userId
                ? friendship.recipient
                : friendship.requester); // Type assertion for populated user
            return {
                id: friend._id,
                displayName: friend.displayName || friend.email,
                email: friend.email,
                friendshipId: friendship._id,
            };
        });
        res.json({
            success: true,
            friends,
        });
    }
    catch (error) {
        console.error("Error getting friends:", error);
        res.status(500).json({ error: "Failed to get friends" });
    }
};
exports.getFriends = getFriends;
const getFriendRequests = async (req, res) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json({ error: "Unauthorized" });
        }
        const requests = await Friendship_model_1.Friendship.find({
            recipient: userId,
            status: "pending",
        }).populate("requester", "displayName email");
        const formattedRequests = requests.map((request) => {
            const requester = request.requester; // Type assertion for populated user
            return {
                id: request._id,
                requester: {
                    id: requester._id,
                    displayName: requester.displayName || requester.email,
                    email: requester.email,
                },
                createdAt: request.createdAt,
            };
        });
        res.json({
            success: true,
            requests: formattedRequests,
        });
    }
    catch (error) {
        console.error("Error getting friend requests:", error);
        res.status(500).json({ error: "Failed to get friend requests" });
    }
};
exports.getFriendRequests = getFriendRequests;
const removeFriend = async (req, res) => {
    try {
        const userId = req.user?.id;
        const { friendshipId } = req.params;
        if (!userId) {
            return res.status(401).json({ error: "Unauthorized" });
        }
        // Try finding by friendshipId first
        let friendship = await Friendship_model_1.Friendship.findById(friendshipId);
        // If not found, try searching by friendId (friendshipId param could be the friend's user ID)
        if (!friendship) {
            friendship = await Friendship_model_1.Friendship.findOne({
                $or: [
                    { requester: userId, recipient: friendshipId, status: "accepted" },
                    { requester: friendshipId, recipient: userId, status: "accepted" },
                ],
            });
        }
        if (!friendship) {
            return res.status(404).json({ error: "Friendship not found" });
        }
        if (friendship.requester.toString() !== userId.toString() &&
            friendship.recipient.toString() !== userId.toString()) {
            return res
                .status(403)
                .json({ error: "Not authorized to remove this friendship" });
        }
        await Friendship_model_1.Friendship.findByIdAndDelete(friendship._id);
        res.json({
            success: true,
            message: "Friend removed successfully",
        });
    }
    catch (error) {
        console.error("Error removing friend:", error);
        res.status(500).json({ error: "Failed to remove friend" });
    }
};
exports.removeFriend = removeFriend;
//# sourceMappingURL=friend.controller.js.map