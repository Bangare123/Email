class Queue {
    constructor() {
      this.queue = [];
    }
  
    enqueue(emailData) {
      this.queue.push(emailData);
    }
  
    dequeue() {
      return this.queue.shift();
    }
  
    isEmpty() {
      return this.queue.length === 0;
    }
  }
  
  module.exports = Queue;
  