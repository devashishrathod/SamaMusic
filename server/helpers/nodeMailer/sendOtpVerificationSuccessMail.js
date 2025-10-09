const nodemailer = require("nodemailer");

exports.sendOtpVerificationSuccessMail = async (email) => {
  const transporter = nodemailer.createTransport({
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
    subject: "OTP Verified Successfully",
    html: `
      <div style="max-width: 600px; margin: auto; padding: 30px; font-family: Arial, sans-serif; background-color: #f9fff9; border-radius: 10px; border: 1px solid #d4edda;">
        <h2 style="text-align: center; color: #28a745;">✅ OTP Verified</h2>
        <p style="font-size: 16px; color: #333;">
          Hello,<br><br>
          Your One-Time Password (OTP) was successfully verified. You are now securely authenticated with SamaMusic.
        </p>
        <p style="font-size: 14px; color: #555;">
          If this wasn't you, please change your account password and contact support immediately.
        </p>
        <hr style="margin: 30px 0;">
        <p style="font-size: 12px; color: #aaa; text-align: center;">
          © ${new Date().getFullYear()} SamaMusic. All rights reserved.
        </p>
      </div>
    `,
  };
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Verification email sent:", info.response);
    return { success: true, message: info.response };
  } catch (error) {
    console.error("Error sending verification email:", error);
    return { success: false, error };
  }
};
