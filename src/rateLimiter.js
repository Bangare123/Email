class RateLimiter {
    constructor(maxRequestsPerSecond) {
      this.maxRequestsPerSecond = maxRequestsPerSecond;
      this.requests = 0;
    }
  
    async limit() {
      if (this.requests >= this.maxRequestsPerSecond) {
        await this.sleep(1000); // wait for a second before retrying
        this.requests = 0;
      }
      this.requests++;
    }
  
    sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }
  }
  
  module.exports = RateLimiter;
  