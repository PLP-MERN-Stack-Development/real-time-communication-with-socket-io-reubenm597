import React from 'react';

const UserList = ({ users, currentUser, onUserSelect }) => {
  const handleUserClick = (user) => {
    if (onUserSelect && user.username !== currentUser.username) {
      onUserSelect(user);
    }
  };

  return (
    <div style={styles.container}>
      <h3 style={styles.title}>Online Users ({users.length})</h3>
      <div style={styles.userList}>
        {users.map(user => (
          <div
            key={user.id}
            style={{
              ...styles.userItem,
              ...(user.username === currentUser.username ? styles.currentUser : {}),
              ...(onUserSelect && user.username !== currentUser.username ? styles.selectable : {})
            }}
            onClick={() => handleUserClick(user)}
          >
            <div style={styles.userInfo}>
              <div style={styles.statusIndicator} />
              <span style={styles.username}>
                {user.username}
                {user.username === currentUser.username && ' (You)'}
              </span>
            </div>
            {onUserSelect && user.username !== currentUser.username && (
              <div style={styles.chatIcon}>💬</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    height: '100%',
  },
  title: {
    margin: '0 0 15px 0',
    color: '#333',
    fontSize: '16px',
  },
  userList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  userItem: {
    padding: '10px 12px',
    backgroundColor: '#f8f9fa',
    borderRadius: '5px',
    border: '1px solid #e9ecef',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  currentUser: {
    backgroundColor: '#e7f3ff',
    borderColor: '#007bff',
  },
  selectable: {
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
  selectableHover: {
    backgroundColor: '#e9ecef',
    transform: 'translateY(-1px)',
  },
  userInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  statusIndicator: {
    width: '8px',
    height: '8px',
    backgroundColor: '#28a745',
    borderRadius: '50%',
  },
  username: {
    fontSize: '14px',
    color: '#333',
  },
  chatIcon: {
    fontSize: '12px',
    opacity: 0.7,
  },
};

// Add hover effect
const styleSheet = document.styleSheets[0];
styleSheet.insertRule(`
  .selectable:hover {
    background-color: #e9ecef !important;
    transform: translateY(-1px);
  }
`, styleSheet.cssRules.length);

export default UserList;