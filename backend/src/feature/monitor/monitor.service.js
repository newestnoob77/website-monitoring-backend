import axios from "axios";
import cron from "node ";
import AlertServices from "./alert.service.js";
import WebsiteRepository from "../website/website.repository.js";
import LogRepository from "../log/logRepository.js";
export default class MonitoringService {
  constructor() {
    this.websiteRepository = new WebsiteRepository();
    this.logRepository = new LogRepository();
    this.alertServices = new AlertServices();
    this.jobs={}
  }
  async checkWebsite(site) {
    try {
      const start = Date.now();
      const response = await axios(site.url);
      const responseTime = Date.now() - start;
      await this.logRepository.addLog({
        websiteId: site._id,
        statusCode: response.status,
        responseTime,
      });
      if (response.status !== 200) console.log(`ALERT: ${site.name} is down!`);
      if (site.alertType == "email") {
        await this.alertServices.sendEmailAlert(site);
      }
      if (site.alertType == "sms") {
        await this.alertServices.sendSmsAlert(site);
      }
    } catch (err) {
      console.error(`Error checking ${site.name}:`, err.message);
      await this.logRepository.addLog({
        websiteId: site._id,
        statusCode: 0,
        responseTime: null,
      });
      console.log(`ALERT: ${site.name} is unreachable!`);
    }
  }
  async startMonitoring() {
   
      const website = await this.websiteRepository.getAllWebsite();
      for (const site of website) {
        const interval = site.checkInterval || 5;
        const cronExpression = "";
        if (this.jobs[site._id]){
          this.jobs[site._id].stop()
        }
        this.jobs[site._id]=cron.schedule(cronExpression,async()=>{
          await this.checkWebsite(site)
        })
      }
 
  }
}
