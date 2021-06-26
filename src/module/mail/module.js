const sgMail = require("@sendgrid/mail");
const MailService = require("./service/mailService");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const mailService = new MailService(sgMail);

module.exports = {
  mailService,
};
