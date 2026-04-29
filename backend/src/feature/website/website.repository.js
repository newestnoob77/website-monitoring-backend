import mongoose from "mongoose";
import { WebsiteModel } from "./website.model.js";
export default class WebsiteRepository {
  async addWebsite(websiteDetails) {
    return await new WebsiteModel(websiteDetails).save();
  }
  async getAllWebsite() {
    return await WebsiteModel.find();
  }
}
