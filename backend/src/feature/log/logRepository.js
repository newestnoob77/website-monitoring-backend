import { LogModel } from "./logModel.js";
import mongoose from "mongoose"
export default class LogRepository {
  async addLog(logDetails) {
    return await new LogModel(logDetails).save();
  }
  async getLogsByWebsiteId(websiteId) {
    return await LogModel.find({ websiteId }).sort({ timestamp: -1 });
  }
  async getUpTimeReport(websiteId) {
    const result = await LogModel.aggregate([
      { $match: { websiteId: new mongoose.Types.ObjectId(websiteId) } },
      {
        $group: {
          _id: null,
          total: { $sum: 1 },
          up: { $sum: { $cond: [{ $eq: ["$statusCode", 200] }, 1, 0] } },
        },
      },
    ]);
    if (!result || result.length===0) return { uptime: 0,total:0,up:0 };

    const { total, up } = result[0];
    return { uptime: (up / total) * 100,total,up };
  }
}
