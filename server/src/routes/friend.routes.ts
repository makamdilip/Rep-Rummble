import { Router } from "express";
import {
  sendFriendRequest,
  acceptFriendRequest,
  declineFriendRequest,
  getFriends,
  getFriendRequests,
  removeFriend,
} from "../controllers/friend.controller";
import { protect } from "../middleware/auth.middleware";

const router = Router();

// All friend routes require authentication
router.use(protect);

router.post("/request", sendFriendRequest);
router.post("/accept/:friendshipId", acceptFriendRequest);
router.post("/decline/:friendshipId", declineFriendRequest);
router.get("/", getFriends);
router.get("/requests", getFriendRequests);
router.delete("/:friendshipId", removeFriend);

export default router;
