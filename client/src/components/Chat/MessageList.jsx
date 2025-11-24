import React, { useEffect, useRef } from 'react';

const MessageList = ({ messages, currentUser, filterPrivate = false }) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const filteredMessages = filterPrivate 
    ? messages.filter(msg => msg.isPrivate)
    : messages.filter(msg => !msg.isPrivate);

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div style={styles.container}>
      {filteredMessages.length === 0 ? (
        <div style={styles.emptyState}>
          {filterPrivate 
            ? 'No private messages yet. Start a conversation!'
            : 'No messages yet. Start the conversation!'
          }
        </div>
      ) : (
        filteredMessages.map((message) => (
          <div
            key={message.id}
            style={{
              ...styles.message,
              ...(message.system ? styles.systemMessage : {}),
              ...(message.sender === currentUser.username ? styles.ownMessage : {}),
            }}
          >
            {!message.system && (
              <div style={styles.messageHeader}>
                <strong style={styles.sender}>
                  {message.sender}
                  {message.isPrivate && ' 🔒'}
                </strong>
                <span style={styles.timestamp}>
                  {formatTime(message.timestamp)}
                </span>
              </div>
            )}
            <div style={styles.messageContent}>
              {message.message}
            </div>
          </div>
        ))
      )}
      <div ref={messagesEndRef} />
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  emptyState: {
    textAlign: 'center',
    color: '#666',
    fontStyle: 'italic',
    padding: '40px 20px',
  },
  message: {
    padding: '12px 16px',
    borderRadius: '10px',
    backgroundColor: 'white',
    boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
    maxWidth: '70%',
  },
  ownMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#007bff',
    color: 'white',
  },
  systemMessage: {
    alignSelf: 'center',
    backgroundColor: 'transparent',
    color: '#666',
    fontStyle: 'italic',
    textAlign: 'center',
    boxShadow: 'none',
  },
  messageHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '5px',
    fontSize: '12px',
  },
  sender: {
    fontSize: '14px',
  },
  timestamp: {
    opacity: 0.7,
    fontSize: '11px',
  },
  messageContent: {
    wordWrap: 'break-word',
  },
};

export default MessageList;