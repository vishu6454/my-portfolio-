const express = require("express");
const cors = require("cors");
const { Resend } = require("resend");
require("dotenv").config();

const app = express();

/* ✅ CORS */
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://vishuportfolio-backend.onrender.com"
  ],
  methods: ["POST"]
}));

app.use(express.json());

/* ✅ RESEND CONFIG */
const resend = new Resend(process.env.RESEND_API_KEY);

/* ✅ CONTACT API */
app.post("/api/contact", async (req, res) => {
  const { user_name, user_email, subject, message } = req.body;

  if (!user_name || !user_email || !message) {
    return res.status(400).json({ success: false, msg: "Missing fields" });
  }

  try {

    await resend.emails.send({
      from: `Portfolio Contact <<onboarding@resend.dev>`,
      to: process.env.EMAIL_USER,
      reply_to: user_email,
      subject: subject || "New Contact Message",
      html: `
        <h2>New Contact Message</h2>
        <p><b>Name:</b> ${user_name}</p>
        <p><b>Email:</b> ${user_email}</p>
        <p><b>Message:</b></p>
        <p>${message}</p>
      `
    });

    res.json({ success: true });

  } catch (error) {
    console.error("❌ Mail Send Error:", error);
    res.status(500).json({ success: false });
  }
});

/* ✅ SERVER */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);