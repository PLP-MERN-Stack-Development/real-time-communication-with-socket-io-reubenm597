// Message.js - Message model for chat application

class Message {
  constructor(data) {
    this.id = data.id || Date.now();
    this.sender = data.sender;
    this.senderId = data.senderId;
    this.message = data.message;
    this.timestamp = data.timestamp || new Date().toISOString();
    this.isPrivate = data.isPrivate || false;
    this.receiver = data.receiver;
    this.receiverId = data.receiverId;
    this.read = false;
  }

  markAsRead() {
    this.read = true;
  }

  toJSON() {
    return {
      id: this.id,
      sender: this.sender,
      senderId: this.senderId,
      message: this.message,
      timestamp: this.timestamp,
      isPrivate: this.isPrivate,
      receiver: this.receiver,
      receiverId: this.receiverId,
      read: this.read
    };
  }
}

module.exports = Message;