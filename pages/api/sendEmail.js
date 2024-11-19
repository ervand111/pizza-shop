import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email, subject, message } = req.body;

    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      const mailOptions = {
        from: process.env.EMAIL_USER, // Sender's Gmail
        to: email, // Recipient's email
        subject: subject || "No Subject",
        text: message || "No Message Content",
      };

      const info = await transporter.sendMail(mailOptions);
      res.status(200).json({ success: true, message: "Email sent!", info });
    } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).json({ success: false, error: error.message });
    }
  } else {
    res.status(405).json({ success: false, message: "Method not allowed." });
  }
}
