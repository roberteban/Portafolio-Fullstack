const Contact = require('../models/Contact');
const emailService = require('../services/email.service');

class ContactController {
  async sendMessage(req, res) {
    try {
      const { name, email, subject, message } = req.body;

      if (!name || !email || !subject || !message) {
        return res.status(400).json({
          success: false,
          message: 'All fields are required'
        });
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid email format'
        });
      }

      const contactMessage = new Contact({
        name,
        email,
        subject,
        message
      });

      await contactMessage.save();

      try {
        await emailService.sendContactEmail({
          name,
          email,
          subject,
          message
        });

        contactMessage.status = 'sent';
        await contactMessage.save();

        res.json({
          success: true,
          message: 'Message sent successfully'
        });
      } catch (emailError) {
        contactMessage.status = 'failed';
        await contactMessage.save();

        res.status(500).json({
          success: false,
          message: 'Message saved but email delivery failed'
        });
      }
    } catch (error) {
      console.error('Contact error:', error);
      res.status(500).json({
        success: false,
        message: 'Error processing contact message',
        error: error.message
      });
    }
  }

  async getMessages(req, res) {
    try {
      const messages = await Contact.find()
        .sort({ createdAt: -1 })
        .limit(50);

      res.json({
        success: true,
        data: messages
      });
    } catch (error) {
      console.error('Get messages error:', error);
      res.status(500).json({
        success: false,
        message: 'Error fetching messages',
        error: error.message
      });
    }
  }
}

module.exports = new ContactController();