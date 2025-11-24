import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { SocketProvider } from './context/SocketContext';
import Login from './pages/Login';
import Chat from './pages/Chat';
import PrivateChat from './pages/PrivateChat';
import './App.css';

function App() {
  const [user, setUser] = useState(null);

  const handleLogin = (username) => {
    setUser({ username, id: Date.now().toString() });
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <SocketProvider user={user}>
      <Router>
        <div className="App">
          <Routes>
            <Route 
              path="/login" 
              element={
                user ? <Navigate to="/chat" /> : <Login onLogin={handleLogin} />
              } 
            />
            <Route 
              path="/chat" 
              element={
                user ? <Chat user={user} onLogout={handleLogout} /> : <Navigate to="/login" />
              } 
            />
            <Route 
              path="/private-chat" 
              element={
                user ? <PrivateChat user={user} onLogout={handleLogout} /> : <Navigate to="/login" />
              } 
            />
            <Route path="/" element={<Navigate to="/login" />} />
          </Routes>
        </div>
      </Router>
    </SocketProvider>
  );
}

export default App;