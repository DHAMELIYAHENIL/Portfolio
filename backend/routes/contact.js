const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();

// ✅ Create transporter ONCE outside the POST
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// (Optional) Handle GET requests nicely
router.get('/', (req, res) => {
  res.send('✅ Contact API is ready. Please POST your form data.');
});

// ✅ Proper POST request handling
router.post('/', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Please fill all fields' });
  }

  const mailOptions = {
    from: process.env.EMAIL_USER,   // ✅ Important: YOUR email, not user's email
    to: process.env.EMAIL_TO,
    subject: `New Contact Message from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('✅ Email sent');
    res.json({ success: true, message: 'Message sent successfully!' });
  } catch (error) {
    console.error('❌ Error sending email:', error);
    res.status(500).json({ error: 'Failed to send email' });
  }
});

module.exports = router;
