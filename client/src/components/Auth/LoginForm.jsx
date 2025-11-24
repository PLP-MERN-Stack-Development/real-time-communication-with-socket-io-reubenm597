import React, { useState } from 'react';

const LoginForm = ({ onLogin, loading = false }) => {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!username.trim()) {
      setError('Please enter a username');
      return;
    }

    if (username.trim().length < 2) {
      setError('Username must be at least 2 characters long');
      return;
    }

    if (username.trim().length > 20) {
      setError('Username must be less than 20 characters');
      return;
    }

    // Basic profanity filter
    const blockedWords = ['admin', 'root', 'moderator', 'system'];
    if (blockedWords.includes(username.toLowerCase().trim())) {
      setError('This username is not available');
      return;
    }

    onLogin(username.trim());
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <h1 style={styles.title}>💬 Chat App</h1>
          <p style={styles.subtitle}>Join the conversation in real-time</p>
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          {error && (
            <div style={styles.error}>
              ⚠️ {error}
            </div>
          )}

          <div style={styles.inputGroup}>
            <label htmlFor="username" style={styles.label}>
              Choose a username
            </label>
            <input
              id="username"
              type="text"
              placeholder="Enter your username..."
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                if (error) setError('');
              }}
              style={styles.input}
              maxLength={20}
              disabled={loading}
              autoFocus
            />
            <div style={styles.charCount}>
              {username.length}/20 characters
            </div>
          </div>

          <button 
            type="submit" 
            style={{
              ...styles.button,
              ...(loading ? styles.buttonLoading : {})
            }}
            disabled={loading || !username.trim()}
          >
            {loading ? (
              <>
                <div style={styles.spinner}></div>
                Connecting...
              </>
            ) : (
              'Join Chat'
            )}
          </button>
        </form>

        <div style={styles.features}>
          <h3 style={styles.featuresTitle}>Features you'll love:</h3>
          <div style={styles.featuresGrid}>
            <div style={styles.feature}>
              <span style={styles.featureIcon}>⚡</span>
              <div>
                <strong>Real-time messaging</strong>
                <p>Instant message delivery</p>
              </div>
            </div>
            <div style={styles.feature}>
              <span style={styles.featureIcon}>👥</span>
              <div>
                <strong>See who's online</strong>
                <p>Live user presence</p>
              </div>
            </div>
            <div style={styles.feature}>
              <span style={styles.featureIcon}>⌨️</span>
              <div>
                <strong>Typing indicators</strong>
                <p>Know when others are typing</p>
              </div>
            </div>
            <div style={styles.feature}>
              <span style={styles.featureIcon}>🔒</span>
              <div>
                <strong>Private messages</strong>
                <p>One-on-one conversations</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    padding: '20px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  },
  card: {
    backgroundColor: 'white',
    padding: '40px',
    borderRadius: '15px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
    maxWidth: '450px',
    width: '100%',
    textAlign: 'center',
  },
  header: {
    marginBottom: '30px',
  },
  title: {
    margin: '0 0 10px 0',
    color: '#333',
    fontSize: '2.5rem',
  },
  subtitle: {
    margin: '0',
    color: '#666',
    fontSize: '1.1rem',
  },
  form: {
    marginBottom: '30px',
  },
  error: {
    backgroundColor: '#ffe6e6',
    color: '#d63031',
    padding: '12px',
    borderRadius: '8px',
    marginBottom: '20px',
    fontSize: '14px',
    border: '1px solid #ffcccc',
  },
  inputGroup: {
    marginBottom: '20px',
    textAlign: 'left',
  },
  label: {
    display: 'block',
    marginBottom: '8px',
    fontWeight: '600',
    color: '#333',
    fontSize: '14px',
  },
  input: {
    width: '100%',
    padding: '15px',
    border: '2px solid #e1e5e9',
    borderRadius: '8px',
    fontSize: '16px',
    boxSizing: 'border-box',
    transition: 'border-color 0.3s ease',
  },
  inputFocus: {
    borderColor: '#007bff',
    outline: 'none',
  },
  charCount: {
    textAlign: 'right',
    fontSize: '12px',
    color: '#666',
    marginTop: '5px',
  },
  button: {
    width: '100%',
    padding: '15px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
  },
  buttonLoading: {
    backgroundColor: '#6c757d',
    cursor: 'not-allowed',
  },
  spinner: {
    width: '16px',
    height: '16px',
    border: '2px solid transparent',
    borderTop: '2px solid white',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  },
  features: {
    borderTop: '1px solid #e1e5e9',
    paddingTop: '30px',
  },
  featuresTitle: {
    margin: '0 0 20px 0',
    color: '#333',
    fontSize: '1.2rem',
  },
  featuresGrid: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  feature: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '15px',
    textAlign: 'left',
  },
  featureIcon: {
    fontSize: '1.5rem',
    minWidth: '30px',
  },
};

// Add CSS for spinner animation
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    
    input:focus {
      border-color: #007bff !important;
      outline: none;
    }
  `;
  document.head.appendChild(style);
}

export default LoginForm;