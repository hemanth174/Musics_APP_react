import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import Navbar from '../../../components/Navbar/Navbar';
import './EditProfile.css';

export default function EditProfile() {
  const navigate = useNavigate();
  const { isLoggedIn, isLoading: authLoading } = useAuth();

  useEffect(() => {
    if (!authLoading && !isLoggedIn) {
      navigate('/login');
    }
  }, [isLoggedIn, authLoading, navigate]);

  if (authLoading) return <div className="loading">Loading...</div>;

  return (
    <div className="edit-profile-page">
      <Navbar />

      <main className="edit-profile-main">
        <section className="edit-profile-header">
          <h1>Edit Profile</h1>
          <p>Placeholder for profile edit form (name, avatar, etc.).</p>
        </section>
      </main>
    </div>
  );
}
