// roomHandlers.js - Socket.io room event handlers

module.exports = (io, chatController) => {
  const rooms = new Map();

  const handleJoinRoom = (socket, roomName) => {
    // Leave previous rooms (except private rooms)
    const currentRooms = Array.from(socket.rooms).filter(room => 
      room !== socket.id && !room.startsWith('private_')
    );
    
    currentRooms.forEach(room => {
      socket.leave(room);
      socket.to(room).emit('user_left_room', {
        username: chatController.getUser(socket.id)?.username,
        room: room
      });
    });

    // Join new room
    socket.join(roomName);
    
    // Initialize room if it doesn't exist
    if (!rooms.has(roomName)) {
      rooms.set(roomName, {
        name: roomName,
        created: new Date().toISOString(),
        users: new Set()
      });
    }

    const room = rooms.get(roomName);
    room.users.add(socket.id);

    // Notify room about new user
    socket.to(roomName).emit('user_joined_room', {
      username: chatController.getUser(socket.id)?.username,
      room: roomName
    });

    // Send room info to the user
    const roomUsers = Array.from(room.users)
      .map(userId => chatController.getUser(userId))
      .filter(user => user !== undefined);

    socket.emit('room_joined', {
      room: roomName,
      users: roomUsers
    });

    console.log(`User ${socket.id} joined room: ${roomName}`);
  };

  const handleLeaveRoom = (socket, roomName) => {
    socket.leave(roomName);
    
    const room = rooms.get(roomName);
    if (room) {
      room.users.delete(socket.id);
      
      // Remove room if empty
      if (room.users.size === 0) {
        rooms.delete(roomName);
      }
    }

    socket.to(roomName).emit('user_left_room', {
      username: chatController.getUser(socket.id)?.username,
      room: roomName
    });

    console.log(`User ${socket.id} left room: ${roomName}`);
  };

  const handleRoomMessage = (socket, { room: roomName, message }) => {
    const user = chatController.getUser(socket.id);
    if (!user || !socket.rooms.has(roomName)) return;

    const roomMessage = chatController.addMessage({
      sender: user.username,
      senderId: socket.id,
      message,
      room: roomName,
      isRoomMessage: true
    });

    // Send message to all users in the room
    socket.to(roomName).emit('room_message', roomMessage);
  };

  const handleGetRooms = (socket) => {
    const roomList = Array.from(rooms.entries()).map(([name, room]) => ({
      name: room.name,
      userCount: room.users.size,
      created: room.created
    }));
    
    socket.emit('room_list', roomList);
  };

  return {
    handleJoinRoom,
    handleLeaveRoom,
    handleRoomMessage,
    handleGetRooms
  };
};