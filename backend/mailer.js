const nodemailer = require('nodemailer');

// Create reusable transporter object using SMTP transport
const createTransporter = () => {
    return nodemailer.createTransport({
        host: process.env.SMTP_HOST || 'smtp.gmail.com',
        port: parseInt(process.env.SMTP_PORT) || 587,
        secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
        }
    });
};

// Send contact form email
const sendContactEmail = async (contactData) => {
    const { name, email, message } = contactData;

    const transporter = createTransporter();

    const mailOptions = {
        from: `"${name}" <${process.env.EMAIL_FROM}>`,
        to: process.env.EMAIL_TO,
        replyTo: email,
        subject: `Portfolio Contact Form: Message from ${name}`,
        text: `
You have received a new message from your portfolio contact form.

Name: ${name}
Email: ${email}

Message:
${message}

---
This email was sent from your portfolio contact form.
        `,
        html: `
<!DOCTYPE html>
<html>
<head>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f9f9f9;
            border-radius: 8px;
        }
        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 20px;
            border-radius: 8px 8px 0 0;
            text-align: center;
        }
        .content {
            background: white;
            padding: 30px;
            border-radius: 0 0 8px 8px;
        }
        .field {
            margin-bottom: 20px;
        }
        .label {
            font-weight: bold;
            color: #667eea;
            margin-bottom: 5px;
        }
        .value {
            padding: 10px;
            background-color: #f5f5f5;
            border-left: 3px solid #667eea;
            margin-top: 5px;
        }
        .footer {
            text-align: center;
            margin-top: 20px;
            padding-top: 20px;
            border-top: 1px solid #ddd;
            color: #666;
            font-size: 12px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h2>📬 New Contact Form Message</h2>
        </div>
        <div class="content">
            <p>You have received a new message from your portfolio contact form.</p>
            
            <div class="field">
                <div class="label">👤 Name:</div>
                <div class="value">${name}</div>
            </div>
            
            <div class="field">
                <div class="label">📧 Email:</div>
                <div class="value"><a href="mailto:${email}">${email}</a></div>
            </div>
            
            <div class="field">
                <div class="label">💬 Message:</div>
                <div class="value">${message.replace(/\n/g, '<br>')}</div>
            </div>
            
            <div class="footer">
                This email was sent from your portfolio contact form.
            </div>
        </div>
    </div>
</body>
</html>
        `
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent successfully:', info.messageId);
        return { success: true, messageId: info.messageId };
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
};

module.exports = {
    sendContactEmail
};
