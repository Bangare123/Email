class StatusTracker {
    constructor() {
      this.processedEmails = new Set();
    }
  
    isProcessed(id) {
      return this.processedEmails.has(id);
    }
  
    markAsProcessed(id) {
      this.processedEmails.add(id);
    }
  }
  
  module.exports = StatusTracker;
  