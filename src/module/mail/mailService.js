module.exports = class MailService {
  constructor(sgMail) {
    this.senderMail = "mazzucaluciano@hotmail.com";
    this.sgMail = sgMail;
  }

  async sendMail(mail) {
    const msg = {
      to: mail,
      from: this.senderMail,
      subject: "Bienvenido",
      text: "Gracias por registrarte en mi sitio web",
      // html: "<strong>and easy to do anywhere, even with Node.js</strong>",
    };

    try {
      await this.sgMail.send(msg);
    } catch (error) {
      console.error(error);

      if (error.response) {
        console.error(error.response.body);
      }
    }
  }
};
