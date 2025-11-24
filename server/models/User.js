// User.js - User model for chat application

class User {
  constructor(id, username, socketId) {
    this.id = id;
    this.username = username;
    this.socketId = socketId;
    this.joinedAt = new Date();
    this.lastSeen = new Date();
    this.isOnline = true;
  }

  updateLastSeen() {
    this.lastSeen = new Date();
  }

  setOnlineStatus(online) {
    this.isOnline = online;
    this.updateLastSeen();
  }

  toJSON() {
    return {
      id: this.id,
      username: this.username,
      socketId: this.socketId,
      joinedAt: this.joinedAt.toISOString(),
      lastSeen: this.lastSeen.toISOString(),
      isOnline: this.isOnline
    };
  }
}

module.exports = User;