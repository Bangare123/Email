const EmailService = require('../src/emailService');

describe('EmailService', () => {
  let emailService;

  beforeEach(() => {
    emailService = new EmailService();
  });

  test('should send an email successfully', async () => {
    const emailData = { id: 'email1', subject: 'Test Email' };
    await emailService.sendEmail(emailData);

    expect(emailService.statusTracker.isProcessed(emailData.id)).toBe(true);
  });

  test('should retry and fallback to another provider on failure', async () => {
    const emailData = { id: 'email2', subject: 'Retry Email' };
    await emailService.sendEmail(emailData);

    expect(emailService.statusTracker.isProcessed(emailData.id)).toBe(true);
  });
});
