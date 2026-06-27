import { Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware";
import { WearableData } from "../models/WearableData.model";
import { User } from "../models/User.model";

export const syncWearableData = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const {
      steps,
      calories,
      heartRate,
      sleepHours,
      hrv,
      restingHR,
      weight,
      bodyFat,
    } = req.body;

    // Create wearable data entry
    const wearableData = new WearableData({
      userId,
      date: new Date().toISOString().split("T")[0], // YYYY-MM-DD format
      steps: steps || 0,
      calories: calories || 0,
      heartRate: heartRate || null,
      sleepHours: sleepHours || 0,
      hrv: hrv || null,
      restingHR: restingHR || null,
      weight: weight || null,
      bodyFat: bodyFat || null,
      syncedAt: new Date(),
    });

    await wearableData.save();

    // Update user's latest health metrics
    await User.findByIdAndUpdate(userId, {
      $set: {
        "healthMetrics.steps": steps || 0,
        "healthMetrics.calories": calories || 0,
        "healthMetrics.heartRate": heartRate || null,
        "healthMetrics.sleepHours": sleepHours || 0,
        "healthMetrics.hrv": hrv || null,
        "healthMetrics.restingHR": restingHR || null,
        "healthMetrics.weight": weight || null,
        "healthMetrics.bodyFat": bodyFat || null,
        "healthMetrics.lastSync": new Date(),
      },
    });

    res.json({
      success: true,
      message: "Wearable data synced successfully",
      data: wearableData,
    });
  } catch (error) {
    console.error("Error syncing wearable data:", error);
    res.status(500).json({ error: "Failed to sync wearable data" });
  }
};

export const getWearableData = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const { days = 7 } = req.query;
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - parseInt(days as string));

    const wearableData = await WearableData.find({
      userId,
      date: { $gte: startDate.toISOString().split("T")[0] },
    }).sort({ date: -1 });

    res.json({
      success: true,
      data: wearableData,
    });
  } catch (error) {
    console.error("Error fetching wearable data:", error);
    res.status(500).json({ error: "Failed to fetch wearable data" });
  }
};

export const getLatestHealthMetrics = async (
  req: AuthRequest,
  res: Response,
) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const user = await User.findById(userId).select("healthMetrics");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({
      success: true,
      data: user.healthMetrics || {},
    });
  } catch (error) {
    console.error("Error fetching health metrics:", error);
    res.status(500).json({ error: "Failed to fetch health metrics" });
  }
};
