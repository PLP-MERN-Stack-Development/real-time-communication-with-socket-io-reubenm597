// Room.js - Room model for chat application

class Room {
  constructor(name, createdBy) {
    this.id = `room_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    this.name = name;
    this.createdBy = createdBy;
    this.createdAt = new Date().toISOString();
    this.users = new Set(); // Set of socket IDs
    this.messages = [];
    this.settings = {
      maxUsers: 50,
      isPrivate: false,
      allowGuests: true
    };
  }

  addUser(socketId) {
    if (this.users.size >= this.settings.maxUsers) {
      throw new Error('Room is full');
    }
    this.users.add(socketId);
  }

  removeUser(socketId) {
    this.users.delete(socketId);
  }

  addMessage(message) {
    this.messages.push(message);
    
    // Keep only last 200 messages per room
    if (this.messages.length > 200) {
      this.messages = this.messages.slice(-100);
    }
  }

  getUserCount() {
    return this.users.size;
  }

  isUserInRoom(socketId) {
    return this.users.has(socketId);
  }

  getRoomInfo() {
    return {
      id: this.id,
      name: this.name,
      createdBy: this.createdBy,
      createdAt: this.createdAt,
      userCount: this.getUserCount(),
      settings: this.settings
    };
  }

  toJSON() {
    return this.getRoomInfo();
  }
}

module.exports = Room;