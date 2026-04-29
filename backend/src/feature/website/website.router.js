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
monitoringRouter.get("/:id",(req,res,next)=>{
  websiteController.getWebsiteById(req,res,next)
})
monitoringRouter.post("/:id",(req,res,next)=>{
  websiteController.updateWebsite(req,res,next)
})
monitoringRouter.delete("/:id",(req,res,next)=>{
  websiteController.deleteWebsite(req,res,next)
})