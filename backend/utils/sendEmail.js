const nodeMailer = require("nodemailer");

const sendEmail = async (options) => {
  const transporter = nodeMailer.createTransport({
    host: process.env.SMTP_HOST, //if not working
    port: process.env.SMTP_PORT, //if not working
    service: process.env.SMTP_SERVICE,
    auth: {
      user: process.env.SMTP_MAIL, // should have 2 Step Authentication -- has to be done
      pass: process.env.SMTP_PASSWORD,
    },
  });
  const mailOptions = {
    from: process.env.SMTP_MAIL,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
