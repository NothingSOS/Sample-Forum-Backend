import SMTPTransport from "nodemailer/lib/smtp-transport";

export const transportOption: SMTPTransport.Options = {
  service: process.env.EMAIL_SERVICE,
  auth: {
    user: process.env.EMAIL_AUTH_USER,
    pass: process.env.EMAIL_AUTH_APP_PASSWORD,
  },
};
