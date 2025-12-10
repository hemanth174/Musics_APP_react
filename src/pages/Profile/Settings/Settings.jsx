import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { usePlayer } from '../../../context/PlayerContext';
import Navbar from '../../../components/Navbar/Navbar';
import './Settings.css';

export default function Settings() {
  const navigate = useNavigate();
  const { isLoggedIn, isLoading: authLoading } = useAuth();

  useEffect(() => {
    if (!authLoading && !isLoggedIn) {
      navigate('/login');
    }
  }, [isLoggedIn, authLoading, navigate]);

  if (authLoading) return <div className="loading">Loading...</div>;

  return (
    <div className="settings-page">
      <Navbar />
      <main className="settings-main">
        <section className="settings-header">
          <h1>Settings</h1>
          <p>Customize your player. Pick a template below to change the player's look.</p>
        </section>

        <section className="template-section">
          <h2>Player Templates</h2>
          <p className="muted">Choose one of 10 templates — your selection will apply to the player.</p>
          <TemplateSelector />
        </section>
      </main>
    </div>
  );
}

function TemplateSelector() {
  const { playerTemplate, setPlayerTemplate } = usePlayer();
  const [selected, setSelected] = useState(playerTemplate || 'template-1');

  const templates = [
    { id: 'template-1', name: 'Neon Purple' },
    { id: 'template-2', name: 'Sunset Red' },
    { id: 'template-3', name: 'Aqua Teal' },
    { id: 'template-4', name: 'Fiery Orange' },
    { id: 'template-5', name: 'Royal Indigo' },
    { id: 'template-6', name: 'Forest Green' },
    { id: 'template-7', name: 'Rose Pink' },
    { id: 'template-8', name: 'Sky Blue' },
    { id: 'template-9', name: 'Lavender' },
    { id: 'template-10', name: 'Amber Teal' }
  ];

  function selectTemplate(id) {
    setSelected(id);
    setPlayerTemplate(id);
    try {
      localStorage.setItem('playerTemplate', id);
    } catch (e) {
      console.warn('Cannot save to localStorage:', e);
    }
  }

  return (
    <div className="template-grid">
      {templates.map(t => (
        <button
          key={t.id}
          className={`template-card ${selected === t.id ? 'active' : ''}`}
          onClick={() => selectTemplate(t.id)}
          aria-pressed={selected === t.id}
        >
          <div className={`template-preview ${t.id}`}></div>
          <div className="template-meta">
            <strong>{t.name}</strong>
            <span className="template-id">{t.id}</span>
          </div>
        </button>
      ))}
    </div>
  );
}
