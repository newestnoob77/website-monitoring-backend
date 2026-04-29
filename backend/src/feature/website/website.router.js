import express from "express";
import WebsiteController from "./website.controller.js";
const websiteController = new WebsiteController();
export const monitoringRouter = express.Router();
monitoringRouter.post("/", (req, res) => {
  websiteController.createMonitoringWebsite(req, res);
});
monitoringRouter.get("/", (req, res) => {
  websiteController.getAllMonitoringWebsite(req, res);
});
