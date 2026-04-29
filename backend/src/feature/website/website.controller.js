import ApplicationError from "../../middleware/applicationError.middleware.js";
import WebsiteRepository from "./website.repository.js";

export default class WebsiteController {
  constructor() {
    this.websiteRepository = new WebsiteRepository();
  }
  async createMonitoringWebsite(req, res) {
    try {
      const { name, url, checkInterval } = req.body;
      const websiteDetails = { name, url, checkInterval };
      console.log(websiteDetails);
      const addMonitoringWebsite = await this.websiteRepository.addWebsite(
        websiteDetails
      );
      if (!addMonitoringWebsite)
        return res.status(400).send("no monitoring details found");
      return res.status(200).send(addMonitoringWebsite);
    } catch (err) {
      console.log(err);
      throw new ApplicationError("something went wrong");
    }
  }
  async getAllMonitoringWebsite(req, res) {
    try {
      const monitoredWebsite = await this.websiteRepository.getAllWebsite();
      if (!monitoredWebsite) return res.status(400).send("no website found");
      return res.status(200).send(monitoredWebsite);
    } catch (err) {
      console.log(err);
      throw new ApplicationError("Something went wrong", 500);
    }
  }
  async getWebsiteById(req,res){
    try{
const {id}=req.params
const website = await this.websiteRepository.getWebsiteById(id)
if(!website) return res.status(404).send("website not found")
return res.status(200).send(website)
    }
    catch(err){
      console.log(err)
      throw new ApplicationError("Something went wrong",500)
    }
  }
    async updateWebsite(req,res){
    try{
const {id}=req.params
console.log(`id:${id},req.body:${req.body}`)
const website = await this.websiteRepository.updateWebsite(req.body,id)
if(!website) return res.status(404).send("update failed")
return res.status(200).send(website)
    }
    catch(err){
      console.log(err)
      throw new ApplicationError("Something went wrong",500)
    }
  }
      async deleteWebsite(req,res){
    try{
const {id}=req.params
const website = await this.websiteRepository.deleteWebsite(id)
if(!website) return res.status(404).send("delete failed")
return res.status(200).send("deleted successfully")
    }
    catch(err){
      console.log(err)
      throw new ApplicationError("Something went wrong",500)
    }
  }
}
