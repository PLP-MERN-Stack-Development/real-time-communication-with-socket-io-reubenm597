import { useEffect, useState } from 'react';
import { socket } from '../socket/socket';

export const useSocket = (user) => {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [typingUsers, setTypingUsers] = useState([]);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (user) {
      socket.connect();
      socket.emit('user_join', user.username);
    }

    const onConnect = () => {
      setIsConnected(true);
      console.log('Connected to server');
    };

    const onDisconnect = () => {
      setIsConnected(false);
      console.log('Disconnected from server');
    };

    const onReceiveMessage = (message) => {
      setMessages(prev => [...prev, message]);
    };

    const onPrivateMessage = (message) => {
      setMessages(prev => [...prev, message]);
      // Add notification for private message
      if (message.sender !== user.username) {
        addNotification(`Private message from ${message.sender}`);
      }
    };

    const onUserList = (userList) => {
      setUsers(userList);
    };

    const onUserJoined = (userData) => {
      addNotification(`${userData.username} joined the chat`);
    };

    const onUserLeft = (userData) => {
      addNotification(`${userData.username} left the chat`);
    };

    const onTypingUsers = (usersTyping) => {
      setTypingUsers(usersTyping);
    };

    // Register event listeners
    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('receive_message', onReceiveMessage);
    socket.on('private_message', onPrivateMessage);
    socket.on('user_list', onUserList);
    socket.on('user_joined', onUserJoined);
    socket.on('user_left', onUserLeft);
    socket.on('typing_users', onTypingUsers);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('receive_message', onReceiveMessage);
      socket.off('private_message', onPrivateMessage);
      socket.off('user_list', onUserList);
      socket.off('user_joined', onUserJoined);
      socket.off('user_left', onUserLeft);
      socket.off('typing_users', onTypingUsers);
      
      if (user) {
        socket.disconnect();
      }
    };
  }, [user]);

  const addNotification = (message) => {
    const notification = {
      id: Date.now(),
      message,
      timestamp: new Date().toISOString(),
    };
    setNotifications(prev => [...prev, notification]);
    
    // Remove notification after 5 seconds
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== notification.id));
    }, 5000);
  };

  const sendMessage = (message) => {
    if (message.trim()) {
      socket.emit('send_message', { message });
    }
  };

  const sendPrivateMessage = (to, message) => {
    if (message.trim()) {
      socket.emit('private_message', { to, message });
    }
  };

  const setTyping = (isTyping) => {
    socket.emit('typing', isTyping);
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  return {
    isConnected,
    messages,
    users,
    typingUsers,
    notifications,
    sendMessage,
    sendPrivateMessage,
    setTyping,
    clearNotifications,
  };
};