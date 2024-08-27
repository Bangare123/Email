const _ = require('lodash');
const EmailProviderMock = require('./emailProviderMock');
const RateLimiter = require('./rateLimiter');
const StatusTracker = require('./statusTracker');
const Queue = require('./queue');

class EmailService {
  constructor() {
    this.providers = [
      new EmailProviderMock('Provider1'),
      new EmailProviderMock('Provider2'),
    ];
    this.rateLimiter = new RateLimiter(5); 
    this.statusTracker = new StatusTracker();
    this.queue = new Queue();
    this.currentProviderIndex = 0;
  }

  async sendEmail(emailData) {
    const requestId = emailData.id;
    
    
    if (this.statusTracker.isProcessed(requestId)) {
      console.log(`Email with ID ${requestId} has already been processed.`);
      return;
    }

    const retryOptions = {
      retries: 3,
      delay: 1000, 
    };

    
    for (let i = 0; i <= retryOptions.retries; i++) {
      try {
        await this.rateLimiter.limit();

        
        await this.providers[this.currentProviderIndex].send(emailData);

        
        this.statusTracker.markAsProcessed(requestId);
        console.log(`Email sent successfully with ${this.providers[this.currentProviderIndex].name}.`);
        return;
      } catch (error) {
        console.error(`Failed to send email using ${this.providers[this.currentProviderIndex].name}: ${error.message}`);
        
        
        if (i === retryOptions.retries) {
          this.switchProvider();
          i = 0; 
        } else {
          await this.sleep(retryOptions.delay * Math.pow(2, i)); 
        }
      }
    }

  
    console.error(`All attempts to send email with ID ${requestId} have failed.`);
  }

  switchProvider() {
    this.currentProviderIndex = (this.currentProviderIndex + 1) % this.providers.length;
    console.log(`Switched to ${this.providers[this.currentProviderIndex].name}`);
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

module.exports = EmailService;
