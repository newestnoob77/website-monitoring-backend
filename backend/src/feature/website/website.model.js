import mongoose from "mongoose";

export const WebsiteSchema = new mongoose.Schema({
  name: { type: String, required: true },
  url: { type: String, required: true, unique: true },
  checkInterval: { type: Number, default: 30 },
  alertType: { type: String, enum: ["email", "sms"], default: "email" },
  createdAt: { type: Date, default: Date.now },
});
export const WebsiteModel = mongoose.model("Website", WebsiteSchema);
