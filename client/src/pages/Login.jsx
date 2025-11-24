import React, { useState } from 'react';
import LoginForm from '../components/Auth/LoginForm';
import LoadingSpinner from '../components/UI/LoadingSpinner';

const Login = ({ onLogin }) => {
  const [loading, setLoading] = useState(false);

  const handleLogin = async (username) => {
    setLoading(true);
    
    // Simulate API call/connection delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    onLogin(username);
    setLoading(false);
  };

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <LoadingSpinner 
          size="large" 
          text="Connecting to chat..." 
        />
      </div>
    );
  }

  return <LoginForm onLogin={handleLogin} loading={loading} />;
};

const styles = {
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  },
};

export default Login;