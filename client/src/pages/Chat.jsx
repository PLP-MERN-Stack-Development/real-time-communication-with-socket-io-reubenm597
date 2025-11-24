import React, { useState } from 'react';
import { useSocketContext } from '../context/SocketContext';
import MessageList from '../components/Chat/MessageList';
import MessageInput from '../components/Chat/MessageInput';
import UserList from '../components/Chat/UserList';
import TypingIndicator from '../components/Chat/TypingIndicator';
import Notification from '../components/UI/Notification';

const Chat = ({ user, onLogout }) => {
  const { 
    messages, 
    users, 
    typingUsers, 
    notifications,
    sendMessage, 
    setTyping,
    clearNotifications 
  } = useSocketContext();

  const [activeTab, setActiveTab] = useState('chat');

  const handleSendMessage = (message) => {
    sendMessage(message);
  };

  const handleTyping = (isTyping) => {
    setTyping(isTyping);
  };

  return (
    <div style={styles.container}>
      {/* Notifications */}
      <div style={styles.notifications}>
        {notifications.map(notification => (
          <Notification
            key={notification.id}
            message={notification.message}
            onClose={() => {}}
          />
        ))}
      </div>

      <div style={styles.header}>
        <h1 style={styles.title}>💬 Global Chat</h1>
        <div style={styles.userInfo}>
          <span style={styles.username}>Hello, {user.username}</span>
          <button onClick={onLogout} style={styles.logoutButton}>
            Logout
          </button>
        </div>
      </div>

      <div style={styles.content}>
        <div style={styles.sidebar}>
          <UserList users={users} currentUser={user} />
        </div>

        <div style={styles.chatArea}>
          <div style={styles.tabs}>
            <button
              style={{
                ...styles.tab,
                ...(activeTab === 'chat' ? styles.activeTab : {})
              }}
              onClick={() => setActiveTab('chat')}
            >
              Global Chat
            </button>
            <button
              style={{
                ...styles.tab,
                ...(activeTab === 'private' ? styles.activeTab : {})
              }}
              onClick={() => setActiveTab('private')}
            >
              Private Messages
            </button>
          </div>

          <div style={styles.messagesContainer}>
            <MessageList 
              messages={messages} 
              currentUser={user}
              filterPrivate={activeTab === 'private'}
            />
            
            <TypingIndicator typingUsers={typingUsers} />
          </div>

          <MessageInput 
            onSendMessage={handleSendMessage}
            onTyping={handleTyping}
            placeholder={activeTab === 'chat' ? "Type a message..." : "Type a private message..."}
          />
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    backgroundColor: '#f5f5f5',
  },
  notifications: {
    position: 'fixed',
    top: '10px',
    right: '10px',
    zIndex: 1000,
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '15px 20px',
    backgroundColor: 'white',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  title: {
    margin: 0,
    color: '#333',
  },
  userInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
  },
  username: {
    fontWeight: 'bold',
    color: '#666',
  },
  logoutButton: {
    padding: '8px 16px',
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  content: {
    display: 'flex',
    flex: 1,
    overflow: 'hidden',
  },
  sidebar: {
    width: '250px',
    backgroundColor: 'white',
    borderRight: '1px solid #ddd',
  },
  chatArea: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  tabs: {
    display: 'flex',
    backgroundColor: 'white',
    borderBottom: '1px solid #ddd',
  },
  tab: {
    flex: 1,
    padding: '15px',
    border: 'none',
    backgroundColor: 'transparent',
    cursor: 'pointer',
    borderBottom: '2px solid transparent',
  },
  activeTab: {
    borderBottom: '2px solid #007bff',
    color: '#007bff',
  },
  messagesContainer: {
    flex: 1,
    overflow: 'auto',
    padding: '20px',
  },
};

export default Chat;