// chatController.js - Chat-related business logic

class ChatController {
  constructor() {
    this.messages = [];
    this.users = new Map();
    this.typingUsers = new Map();
  }

  // User management
  addUser(socketId, username) {
    const user = {
      id: socketId,
      username,
      joinedAt: new Date().toISOString(),
      lastSeen: new Date().toISOString()
    };
    
    this.users.set(socketId, user);
    return user;
  }

  removeUser(socketId) {
    const user = this.users.get(socketId);
    this.users.delete(socketId);
    this.typingUsers.delete(socketId);
    return user;
  }

  getUser(socketId) {
    return this.users.get(socketId);
  }

  getAllUsers() {
    return Array.from(this.users.values());
  }

  // Message management
  addMessage(messageData) {
    const message = {
      id: Date.now(),
      ...messageData,
      timestamp: new Date().toISOString()
    };
    
    // Limit stored messages to prevent memory issues
    this.messages.push(message);
    if (this.messages.length > 1000) {
      this.messages = this.messages.slice(-500); // Keep last 500 messages
    }
    
    return message;
  }

  getRecentMessages(limit = 50) {
    return this.messages.slice(-limit);
  }

  // Typing indicators
  setUserTyping(socketId, username, isTyping) {
    if (isTyping) {
      this.typingUsers.set(socketId, username);
    } else {
      this.typingUsers.delete(socketId);
    }
  }

  getTypingUsers() {
    return Array.from(this.typingUsers.values());
  }

  // Private messaging
  sendPrivateMessage(senderId, receiverId, message) {
    const sender = this.getUser(senderId);
    const receiver = this.getUser(receiverId);
    
    if (!sender || !receiver) {
      throw new Error('Sender or receiver not found');
    }

    const privateMessage = {
      sender: sender.username,
      senderId: sender.id,
      receiver: receiver.username,
      receiverId: receiver.id,
      message,
      isPrivate: true
    };

    return this.addMessage(privateMessage);
  }

  // Statistics
  getStats() {
    return {
      totalUsers: this.users.size,
      totalMessages: this.messages.length,
      activeTypers: this.typingUsers.size,
      serverStartTime: new Date().toISOString()
    };
  }
}

module.exports = ChatController;