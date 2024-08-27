class EmailProviderMock {
    constructor(name) {
      this.name = name;
    }
  
    async send(emailData) {
      if (Math.random() < 0.5) { 
        throw new Error(`${this.name} failed to send email.`);
      }
      console.log(`${this.name} successfully sent the email: ${emailData.subject}`);
    }
  }
  
  module.exports = EmailProviderMock;
  