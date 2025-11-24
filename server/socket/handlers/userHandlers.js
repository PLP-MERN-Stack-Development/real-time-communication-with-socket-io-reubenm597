// userHandlers.js - Socket.io user event handlers

module.exports = (io, chatController) => {
  
  const handleGetUsers = (socket) => {
    const users = chatController.getAllUsers();
    socket.emit('user_list', users);
  };

  const handleGetUserStats = (socket) => {
    const user = chatController.getUser(socket.id);
    if (user) {
      const stats = {
        username: user.username,
        joinedAt: user.joinedAt,
        messageCount: chatController.messages.filter(
          msg => msg.senderId === socket.id
        ).length
      };
      socket.emit('user_stats', stats);
    }
  };

  const handleUserActivity = (socket) => {
    const user = chatController.getUser(socket.id);
    if (user) {
      user.lastSeen = new Date().toISOString();
      // You could broadcast user activity updates here
    }
  };

  return {
    handleGetUsers,
    handleGetUserStats,
    handleUserActivity
  };
};