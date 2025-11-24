// rateLimiter.js - Rate limiting utility for Socket.io

class RateLimiter {
  constructor() {
    this.attempts = new Map();
    this.limits = {
      message: { max: 30, window: 60000 }, // 30 messages per minute
      connection: { max: 5, window: 60000 }, // 5 connections per minute
      typing: { max: 60, window: 60000 } // 60 typing events per minute
    };
  }

  checkLimit(socketId, type) {
    const now = Date.now();
    const limit = this.limits[type];
    
    if (!limit) return true; // No limit for this type

    if (!this.attempts.has(socketId)) {
      this.attempts.set(socketId, {});
    }

    const userAttempts = this.attempts.get(socketId);
    
    if (!userAttempts[type]) {
      userAttempts[type] = [];
    }

    // Remove old attempts outside the time window
    userAttempts[type] = userAttempts[type].filter(
      timestamp => now - timestamp < limit.window
    );

    // Check if under limit
    if (userAttempts[type].length < limit.max) {
      userAttempts[type].push(now);
      return true;
    }

    return false;
  }

  getRemainingTime(socketId, type) {
    const userAttempts = this.attempts.get(socketId);
    if (!userAttempts || !userAttempts[type]) return 0;

    const limit = this.limits[type];
    const now = Date.now();
    
    const validAttempts = userAttempts[type].filter(
      timestamp => now - timestamp < limit.window
    );

    if (validAttempts.length === 0) return 0;

    const oldestValidAttempt = Math.min(...validAttempts);
    return limit.window - (now - oldestValidAttempt);
  }

  clearOldEntries() {
    const now = Date.now();
    
    for (const [socketId, attempts] of this.attempts.entries()) {
      for (const type in attempts) {
        attempts[type] = attempts[type].filter(
          timestamp => now - timestamp < this.limits[type].window
        );
      }
      
      // Remove user if no attempts left
      if (Object.keys(attempts).every(type => attempts[type].length === 0)) {
        this.attempts.delete(socketId);
      }
    }
  }

  // Start cleanup interval (run every minute)
  startCleanup() {
    setInterval(() => {
      this.clearOldEntries();
    }, 60000);
  }
}

module.exports = RateLimiter;