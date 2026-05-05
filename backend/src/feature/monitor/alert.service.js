import nodemailer from "nodemailer";
import twilio from "twilio";
export default class AlertServices {
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    this.twilioClient = twilio(
      process.env.TWILIO_SID,
      process.env.TWILIO_AUTH_TOKEN
    );
  }
  async sendEmailAlert(site) {
    await this.transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.ALERT_EMAIL,
      subject: `Website Down Alert :${site.name}`,
      text: `${site.name} (${site.url}) is down!!`,
    });
  }
  async sendSmsAlert(site) {
    await this.twilioClient.messages.create({
      body: `${site.name} (${site.url}) is down!!`,
      from: process.env.TWILIO_PHONE,
      to: process.env.ALERT_PHONE,
    });
  }
}
