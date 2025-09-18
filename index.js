const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const User = require('./models/User');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/auth_demo")
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error(err));
  

const nodemailer = require('nodemailer');

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: "studycegmit@gmail.com",
      pass: "zeft dmkc knyn jwby"  // use App Password (not real Gmail password)
    }
  });
  
//server running
app.get('/',(req,res)=>{
  res.send("Server is running")
})
// Login API
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if input matches either username OR email
    const user = await User.findOne({
      $or: [{ username: username }, { email: username }]
    });

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    // ⚠️ Plain password check for now (replace with bcrypt later)
    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid password" });
    }

    res.json({ message: "Login successful" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});



// Register API
app.post('/register', async (req, res) => {
  const { username, email, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  try {
    // check if user already exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ message: "Username or email already exists" });
    }

    // create new user
    const newUser = new User({ username, email, password });
    await newUser.save();

    res.json({ message: "User registered successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

const crypto = require('crypto');

// Forgot Password (Send Code)
app.post('/forgot-password', async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const code = crypto.randomInt(100000, 999999).toString(); // 6-digit OTP
    user.resetCode = code;
    user.resetCodeExpiry = Date.now() + 10 * 60 * 1000; // valid for 10 mins
    await user.save();

    // Send email
    await transporter.sendMail({
      from: '"NextBus Support" <your-email@gmail.com>',
      to: email,
      subject: "Password Reset Code",
      text: `Your password reset code is ${code}. It will expire in 10 minutes.`
    });

    res.json({ message: "Reset code sent to email" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

const bcrypt = require('bcryptjs');

// Reset Password
app.post('/reset-password', async (req, res) => {
  const { email, code, newPassword } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.resetCode !== code || user.resetCodeExpiry < Date.now()) {
      return res.status(400).json({ message: "Invalid or expired reset code" });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.resetCode = undefined;
    user.resetCodeExpiry = undefined;
    await user.save();

    res.json({ message: "Password reset successful" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});


app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
