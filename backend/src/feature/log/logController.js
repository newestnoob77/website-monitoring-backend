import ApplicationError from "../../middleware/applicationError.middleware.js";
import LogRepository from "./logRepository.js";

export default class LogController {
  constructor() {
    this.logRepository = new LogRepository();
  }
  async addLogEntry(req, res) {
    try {
      const { website, statusCode, responseTime } = req.body;
      const logDetails = { website, statusCode, responseTime };
      const websiteLog = await this.logRepository.addLog(logDetails);
      if (!websiteLog) return res.status(400).send("No log found");
      return res.status(200).send(websiteLog);
    } catch (err) {
      console.log(err);
      throw new ApplicationError("Something went wrong ", 500);
    }
  }
  async getLogById(req, res) {
    try {
      const { websiteId } = req.params;
      const log = await this.logRepository.getLogsByWebsiteId(websiteId);
      if(!log) return res.status(400).send(" log of that id not found");
      return res.status(200).send(log);
    } catch (err) {
      console.log(err);
      throw new ApplicationError("Something went wrong", 500);
    }
  }
  async getUpTimeReportById(req,res){
    try{
      const { websiteId } = req.params;
      const result = await this.logRepository.getUpTimeReport(websiteId);
      if(!result) return res.status(400).send("result not found")
      return res.status(200).send(result)
    }catch(err){
      console.log(err)
      throw new ApplicationError("Something went wrong",500)
    }
  }
}
