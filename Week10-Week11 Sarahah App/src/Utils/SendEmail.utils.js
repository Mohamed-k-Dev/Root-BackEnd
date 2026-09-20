import nodemailer from "nodemailer";

export const sendEmail = async ({
  to = "",
  subject = "",
  attachments = [],
  html = "",
}) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.AUTH_EMAIL,
      pass: process.env.AUTH_PASSWORD,
    },
  });

  (async () => {
    const info = await transporter.sendMail({
      to,
      subject,
      html,
      attachments,
    });
    console.log("Message sent:", info.messageId);
  })();
};
