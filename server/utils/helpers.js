// helpers.js - Utility functions for the chat application

class Helpers {
  // Validate username
  static validateUsername(username) {
    if (typeof username !== 'string') return false;
    
    const trimmed = username.trim();
    
    // Check length
    if (trimmed.length < 2 || trimmed.length > 20) {
      return false;
    }
    
    // Check for valid characters (alphanumeric, spaces, underscores, hyphens)
    if (!/^[a-zA-Z0-9 _-]+$/.test(trimmed)) {
      return false;
    }
    
    // Check for blocked usernames
    const blockedUsernames = [
      'admin', 'administrator', 'root', 'system', 'moderator',
      'null', 'undefined', 'unknown', 'anonymous'
    ];
    
    if (blockedUsernames.includes(trimmed.toLowerCase())) {
      return false;
    }
    
    return true;
  }

  // Sanitize message content
  static sanitizeMessage(message) {
    if (typeof message !== 'string') return '';
    
    // Trim and limit length
    let sanitized = message.trim().slice(0, 1000);
    
    // Basic HTML escaping
    sanitized = sanitized
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;');
    
    return sanitized;
  }

  // Generate unique ID
  static generateId(prefix = '') {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substr(2, 9);
    return `${prefix}${timestamp}_${random}`;
  }

  // Format timestamp for display
  static formatTimestamp(timestamp) {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now - date) / (1000 * 60 * 60);

    if (diffInHours < 1) {
      return 'Just now';
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)}h ago`;
    } else {
      return date.toLocaleDateString();
    }
  }

  // Check if message contains inappropriate content (basic filter)
  static hasInappropriateContent(text) {
    const inappropriateWords = [
      // Add words that should be filtered
    ];
    
    const lowerText = text.toLowerCase();
    return inappropriateWords.some(word => lowerText.includes(word));
  }

  // Calculate message statistics
  static calculateMessageStats(messages, timeRange = 24 * 60 * 60 * 1000) {
    const now = Date.now();
    const recentMessages = messages.filter(msg => 
      now - new Date(msg.timestamp).getTime() < timeRange
    );
    
    const users = new Set(recentMessages.map(msg => msg.senderId));
    const messagesPerUser = {};
    
    recentMessages.forEach(msg => {
      messagesPerUser[msg.senderId] = (messagesPerUser[msg.senderId] || 0) + 1;
    });
    
    return {
      totalMessages: recentMessages.length,
      uniqueUsers: users.size,
      messagesPerUser,
      timeRange: timeRange
    };
  }
}

module.exports = Helpers;