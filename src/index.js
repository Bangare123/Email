const EmailService = require('./emailService');

const emailService = new EmailService();

(async () => {
  const emailData = {
    id: 'email1',
    to: 'example@example.com',
    subject: 'Hello World',
    body: 'This is a test email.',
  };

  await emailService.sendEmail(emailData);
})();
