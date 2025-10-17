const nodemailer = require("nodemailer");

exports.sendLoginOtpMail = (email, otp) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.NODEMAILER_EMAIL,
      pass: process.env.NODEMAILER_PASSWORD,
    },
    tls: { rejectUnauthorized: false },
  });
  const mailOptions = {
    from: process.env.NODEMAILER_EMAIL,
    to: email,
    subject: "Your One-Time Password (OTP)",
    html: `
      <div style="max-width: 600px; margin: auto; padding: 30px; font-family: Arial, sans-serif; background-color: #f9f9f9; border-radius: 10px; border: 1px solid #e0e0e0;">
        <h2 style="text-align: center; color: #4CAF50;">Welcome to SamaMusic!</h2>
        <p style="font-size: 16px; color: #333;">
          Hi there, <br><br>
          Thank you for choosing SamaMusic. To continue, please use the following One-Time Password (OTP):
        </p>
        <div style="text-align: center; margin: 20px 0;">
          <span style="font-size: 28px; font-weight: bold; color: #333; letter-spacing: 2px;">${otp}</span>
        </div>
        <p style="font-size: 14px; color: #555;">
          This OTP is valid for <strong>5 minutes</strong>. Please do not share this code with anyone for security reasons.
        </p>
        <p style="font-size: 14px; color: #888;">
          If you did not request this OTP, you can safely ignore this message.
        </p>
        <hr style="margin: 30px 0;">
        <p style="font-size: 12px; color: #aaa; text-align: center;">
          © ${new Date().getFullYear()} SamaMusic. All rights reserved.
        </p>
      </div>
    `,
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.error("Error sending email:", error);
      return { error: error };
    } else {
      console.log(`OTP sent to ${email}`);
      return { success: true, message: info.response };
    }
  });
};
