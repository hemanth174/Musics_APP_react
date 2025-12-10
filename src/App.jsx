/*
================================================================================
  APP.JSX - Main Application Component
================================================================================
  Sets up React Router and wraps the app with Context Providers
================================================================================
*/

import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { PlayerProvider } from './context/PlayerContext';
import { AuthProvider } from './context/AuthContext';

// Pages
import Landing from './pages/Landing/Landing';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import PlayerPage from './pages/PlayerPage/PlayerPage';
import Profile from './pages/Profile/Profile';
import EditProfile from './pages/Profile/EditProfile/EditProfile';
import Settings from './pages/Profile/Settings/Settings';

// Global styles
import './styles/global.css';

function App() {
  // Disable right-click, F12, and developer tools shortcuts
  useEffect(() => {
    // Disable right-click
    const handleContextMenu = (e) => {
      e.preventDefault();
      return false;
    };

    // Disable F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U, Ctrl+Shift+C
    const handleKeyDown = (e) => {
      // F12
      if (e.keyCode === 123) {
        e.preventDefault();
        return false;
      }
      // Ctrl+Shift+I (Inspect)
      if (e.ctrlKey && e.shiftKey && e.keyCode === 73) {
        e.preventDefault();
        return false;
      }
      // Ctrl+Shift+J (Console)
      if (e.ctrlKey && e.shiftKey && e.keyCode === 74) {
        e.preventDefault();
        return false;
      }
      // Ctrl+U (View Source)
      if (e.ctrlKey && e.keyCode === 85) {
        e.preventDefault();
        return false;
      }
      // Ctrl+Shift+C (Inspect Element)
      if (e.ctrlKey && e.shiftKey && e.keyCode === 67) {
        e.preventDefault();
        return false;
      }
    };

    // Disable text selection (optional, makes it harder to copy)
    const disableSelection = (e) => {
      if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
        e.preventDefault();
        return false;
      }
    };

    // Add event listeners
    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('selectstart', disableSelection);

    // Disable console methods (optional - for extra protection)
    if (process.env.NODE_ENV === 'production') {
      console.log = () => {};
      console.warn = () => {};
      console.error = () => {};
      console.debug = () => {};
    }

    // Cleanup
    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('selectstart', disableSelection);
    };
  }, []);

  return (
    <Router>
      <AuthProvider>
        <PlayerProvider>
          <Routes>
            {/* Landing Page - First page visitors see */}
            <Route path="/" element={<Landing />} />
            
            {/* Main App Routes */}
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/player" element={<PlayerPage />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile/edit" element={<EditProfile />} />
            <Route path="/profile/settings" element={<Settings />} />
            
            {/* Fallback - redirect to landing */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </PlayerProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
