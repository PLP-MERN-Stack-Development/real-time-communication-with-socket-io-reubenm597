// chatHandlers.js - Socket.io chat event handlers

module.exports = (io, chatController) => {
  
  const handleUserJoin = (socket, username) => {
    console.log(`User joined: ${username} (${socket.id})`);
    
    // Add user to controller
    const user = chatController.addUser(socket.id, username);
    
    // Notify all clients about new user
    socket.broadcast.emit('user_joined', user);
    
    // Send updated user list to all clients
    io.emit('user_list', chatController.getAllUsers());
    
    // Send recent messages to the new user
    const recentMessages = chatController.getRecentMessages();
    recentMessages.forEach(message => {
      socket.emit('receive_message', message);
    });
  };

  const handleSendMessage = (socket, messageData) => {
    const user = chatController.getUser(socket.id);
    if (!user) return;

    const message = chatController.addMessage({
      ...messageData,
      sender: user.username,
      senderId: socket.id,
      isPrivate: false
    });

    // Broadcast to all clients
    io.emit('receive_message', message);
  };

  const handlePrivateMessage = (socket, { to, message }) => {
    const sender = chatController.getUser(socket.id);
    const receiver = chatController.getUser(to);

    if (!sender || !receiver) {
      socket.emit('error', { message: 'User not found' });
      return;
    }

    try {
      const privateMessage = chatController.sendPrivateMessage(
        socket.id, 
        to, 
        message
      );

      // Send to both sender and receiver
      socket.emit('private_message', privateMessage);
      socket.to(to).emit('private_message', privateMessage);
    } catch (error) {
      socket.emit('error', { message: error.message });
    }
  };

  const handleTyping = (socket, isTyping) => {
    const user = chatController.getUser(socket.id);
    if (!user) return;

    chatController.setUserTyping(socket.id, user.username, isTyping);
    
    // Broadcast typing users list
    io.emit('typing_users', chatController.getTypingUsers());
  };

  const handleDisconnect = (socket) => {
    const user = chatController.removeUser(socket.id);
    
    if (user) {
      // Notify other users
      socket.broadcast.emit('user_left', user);
      console.log(`User left: ${user.username} (${socket.id})`);
    }

    // Send updated user list and typing users
    io.emit('user_list', chatController.getAllUsers());
    io.emit('typing_users', chatController.getTypingUsers());
  };

  return {
    handleUserJoin,
    handleSendMessage,
    handlePrivateMessage,
    handleTyping,
    handleDisconnect
  };
};