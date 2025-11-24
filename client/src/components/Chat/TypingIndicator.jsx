import React, { useEffect } from 'react';

const TypingIndicator = ({ typingUsers }) => {
  // Add CSS for animation safely
  useEffect(() => {
    if (typeof document !== 'undefined') {
      const style = document.createElement('style');
      style.textContent = `
        @keyframes bounce {
          0%, 80%, 100% { 
            transform: scale(0);
            opacity: 0.5;
          }
          40% { 
            transform: scale(1);
            opacity: 1;
          }
        }
        .typing-dot:nth-child(1) { animation-delay: -0.32s; }
        .typing-dot:nth-child(2) { animation-delay: -0.16s; }
      `;
      document.head.appendChild(style);

      return () => {
        document.head.removeChild(style);
      };
    }
  }, []);

  if (typingUsers.length === 0) {
    return null;
  }

  return (
    <div style={styles.container}>
      <div style={styles.typingText}>
        {typingUsers.length === 1 
          ? `${typingUsers[0]} is typing...`
          : `${typingUsers.slice(0, 2).join(', ')} ${typingUsers.length > 2 ? `and ${typingUsers.length - 2} more` : ''} are typing...`
        }
      </div>
      <div style={styles.dots}>
        <span className="typing-dot" style={styles.dot}></span>
        <span className="typing-dot" style={styles.dot}></span>
        <span className="typing-dot" style={styles.dot}></span>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '10px 16px',
    color: '#666',
    fontStyle: 'italic',
    fontSize: '14px',
  },
  typingText: {
    fontSize: '14px',
  },
  dots: {
    display: 'flex',
    gap: '3px',
  },
  dot: {
    width: '6px',
    height: '6px',
    backgroundColor: '#666',
    borderRadius: '50%',
    animation: 'bounce 1.4s infinite ease-in-out',
  },
};

export default TypingIndicator;