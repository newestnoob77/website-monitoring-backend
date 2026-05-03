import express from "express";
import LogController from "./logController.js";

const logController = new LogController();
export const logRouter = express.Router();

// Add log manually (mainly for testing)
logRouter.post("/", (req, res) => {
  logController.addLog(req, res);
});

// Fetch logs for a website
logRouter.get("/:websiteId", (req, res) => {
  logController.getLogsById(req, res);
});

// Fetch uptime report
logRouter.get("/report/:websiteId", (req, res) => {
  logController.getUpTimeReport(req, res);
});
