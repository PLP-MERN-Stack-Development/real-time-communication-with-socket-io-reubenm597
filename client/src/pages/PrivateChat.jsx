import React, { useState } from 'react';
import { useSocketContext } from '../context/SocketContext';
import MessageList from '../components/Chat/MessageList';
import MessageInput from '../components/Chat/MessageInput';
import UserList from '../components/Chat/UserList';
import Notification from '../components/UI/Notification';

const PrivateChat = ({ user, onLogout }) => {
  const { 
    messages, 
    users, 
    notifications,
    sendPrivateMessage,
    clearNotifications 
  } = useSocketContext();

  const [selectedUser, setSelectedUser] = useState(null);

  const handleSendMessage = (message) => {
    if (selectedUser && message.trim()) {
      sendPrivateMessage(selectedUser.id, message);
    }
  };

  const handleUserSelect = (user) => {
    setSelectedUser(user);
  };

  const privateMessages = messages.filter(msg => 
    msg.isPrivate && 
    (msg.senderId === selectedUser?.id || msg.receiverId === selectedUser?.id)
  );

  return (
    <div style={styles.container}>
      {/* Notifications */}
      <div style={styles.notifications}>
        {notifications.map(notification => (
          <Notification
            key={notification.id}
            message={notification.message}
          />
        ))}
      </div>

      <div style={styles.header}>
        <h1 style={styles.title}>🔒 Private Chat</h1>
        <div style={styles.userInfo}>
          <span style={styles.username}>{user.username}</span>
          <button onClick={onLogout} style={styles.logoutButton}>
            Logout
          </button>
        </div>
      </div>

      <div style={styles.content}>
        <div style={styles.sidebar}>
          <UserList users={users} currentUser={user} onUserSelect={handleUserSelect} />
        </div>

        <div style={styles.chatArea}>
          {selectedUser ? (
            <>
              <div style={styles.chatHeader}>
                <h3 style={styles.chatWith}>
                  Private chat with {selectedUser.username}
                </h3>
              </div>

              <div style={styles.messagesContainer}>
                <MessageList 
                  messages={privateMessages} 
                  currentUser={user}
                />
              </div>

              <MessageInput 
                onSendMessage={handleSendMessage}
                onTyping={() => {}} // Disable typing for private chat for now
                placeholder={`Message ${selectedUser.username}...`}
              />
            </>
          ) : (
            <div style={styles.noSelection}>
              <div style={styles.noSelectionContent}>
                <h3>Select a user to start a private chat</h3>
                <p>Choose someone from the online users list to begin a private conversation.</p>
              </div>
            </div>
          )}
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
  chatHeader: {
    padding: '15px 20px',
    backgroundColor: 'white',
    borderBottom: '1px solid #ddd',
  },
  chatWith: {
    margin: 0,
    color: '#333',
  },
  messagesContainer: {
    flex: 1,
    overflow: 'auto',
    padding: '20px',
  },
  noSelection: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  noSelectionContent: {
    textAlign: 'center',
    color: '#666',
  },
};

export default PrivateChat;