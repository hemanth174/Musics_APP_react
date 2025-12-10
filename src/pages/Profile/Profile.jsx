import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Navbar from '../../components/Navbar/Navbar';
import './Profile.css';

export default function Profile() {
  const navigate = useNavigate();
  const { isLoggedIn, isLoading: authLoading } = useAuth();

  useEffect(() => {
    if (!authLoading && !isLoggedIn) {
      navigate('/login');
    }
  }, [isLoggedIn, authLoading, navigate]);

  if (authLoading) return <div className="loading">Loading...</div>;

  return (
    <div className="profile-page">
      <Navbar />

      <main className="profile-main">
        <section className="profile-header">
          <h1>Profile</h1>
          <p>This is a starter profile page. Connect this to your auth/context to display user info.</p>
        </section>
      </main>
    </div>
  );
}
