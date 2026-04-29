import mongoose from "mongoose";
import { WebsiteModel } from "./website.model.js";
export default class WebsiteRepository {
  async addWebsite(websiteDetails) {
    return await new WebsiteModel(websiteDetails).save();
  }
  async getAllWebsite() {
    return await WebsiteModel.find();
  }
  async getWebsiteById(id){
    return await WebsiteModel.findById(id)
  }
  async updateWebsite(updateData,id){
    return await WebsiteModel.findByIdAndUpdate(id, updateData, { returnDocument:"after" })
  }
  async deleteWebsite(id){
    return await WebsiteModel.findByIdAndDelete(id)
  }
}
