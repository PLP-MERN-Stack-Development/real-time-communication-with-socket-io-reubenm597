// socket.js - Enhanced Socket.io configuration with handlers

const ChatController = require('../controllers/chatController');
const chatHandlers = require('../socket/handlers/chatHandlers');
const userHandlers = require('../socket/handlers/userHandlers');
const roomHandlers = require('../socket/handlers/roomHandlers');

module.exports = (io) => {
  // Initialize chat controller
  const chatController = new ChatController();
  
  // Initialize handlers
  const {
    handleUserJoin,
    handleSendMessage,
    handlePrivateMessage,
    handleTyping,
    handleDisconnect
  } = chatHandlers(io, chatController);

  const {
    handleGetUsers,
    handleGetUserStats,
    handleUserActivity
  } = userHandlers(io, chatController);

  const {
    handleJoinRoom,
    handleLeaveRoom,
    handleRoomMessage,
    handleGetRooms
  } = roomHandlers(io, chatController);

  io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);

    // Chat events
    socket.on('user_join', (username) => handleUserJoin(socket, username));
    socket.on('send_message', (messageData) => handleSendMessage(socket, messageData));
    socket.on('private_message', (data) => handlePrivateMessage(socket, data));
    socket.on('typing', (isTyping) => handleTyping(socket, isTyping));

    // User events
    socket.on('get_users', () => handleGetUsers(socket));
    socket.on('get_user_stats', () => handleGetUserStats(socket));
    socket.on('user_activity', () => handleUserActivity(socket));

    // Room events
    socket.on('join_room', (roomName) => handleJoinRoom(socket, roomName));
    socket.on('leave_room', (roomName) => handleLeaveRoom(socket, roomName));
    socket.on('room_message', (data) => handleRoomMessage(socket, data));
    socket.on('get_rooms', () => handleGetRooms(socket));

    // Disconnection
    socket.on('disconnect', () => handleDisconnect(socket));

    // Error handling
    socket.on('error', (error) => {
      console.error(`Socket error for ${socket.id}:`, error);
    });

    // Send initial data
    socket.emit('connected', { 
      socketId: socket.id,
      serverTime: new Date().toISOString()
    });
  });

  return {
    chatController,
    io
  };
};