const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

app.post("/send-appointment", async (req, res) => {
  const { name, email, phone, date, message } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: "clinicrecipient@example.com", // your clinic email
      subject: "New Appointment Request",
      text: `
        Name: ${name}
        Email: ${email}
        Phone: ${phone}
        Preferred Date: ${date}
        Message: ${message}
      `,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Appointment email sent successfully" });
  } catch (error) {
    console.error("Email error:", error);
    res.status(500).json({ message: "Failed to send appointment email" });
  }
});

const PORT = process.env.PORT || 5000;  ;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
