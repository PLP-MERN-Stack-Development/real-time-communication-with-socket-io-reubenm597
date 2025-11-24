import React, { useEffect } from 'react';

const Notification = ({ message, type = 'info', onClose, autoClose = true }) => {
  useEffect(() => {
    if (autoClose) {
      const timer = setTimeout(() => {
        onClose?.();
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [autoClose, onClose]);

  const getBackgroundColor = () => {
    switch (type) {
      case 'success': return '#28a745';
      case 'warning': return '#ffc107';
      case 'error': return '#dc3545';
      default: return '#007bff';
    }
  };

  return (
    <div style={{
      ...styles.container,
      backgroundColor: getBackgroundColor(),
    }}>
      <span style={styles.message}>{message}</span>
      {onClose && (
        <button onClick={onClose} style={styles.closeButton}>
          ×
        </button>
      )}
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '12px 16px',
    marginBottom: '8px',
    borderRadius: '5px',
    color: 'white',
    boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
    minWidth: '250px',
    maxWidth: '400px',
  },
  message: {
    flex: 1,
    fontSize: '14px',
  },
  closeButton: {
    background: 'none',
    border: 'none',
    color: 'white',
    fontSize: '18px',
    cursor: 'pointer',
    padding: '0',
    marginLeft: '10px',
  },
};

export default Notification;