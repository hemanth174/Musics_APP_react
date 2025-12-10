const express = require('express');
const path = require('path');
const fetch = require('node-fetch');

const app = express();
const PORT = process.env.PORT || 10000;

// Middleware
app.use(express.json());

// API Routes - JioSaavn Proxy
app.get('/api/saavn/search/:query', async (req, res) => {
  try {
    const { query } = req.params;
    const response = await fetch(`https://jiosaavn-api-privatecvc.vercel.app/search/songs?query=${encodeURIComponent(query)}&page=1&limit=20`);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ error: 'Failed to search songs' });
  }
});

app.get('/api/saavn/stream/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const response = await fetch(`https://jiosaavn-api-privatecvc.vercel.app/songs?id=${id}`);
    const data = await response.json();
    
    if (data.data && data.data[0] && data.data[0].downloadUrl) {
      const audioUrl = data.data[0].downloadUrl[4]?.link || data.data[0].downloadUrl[0]?.link;
      res.redirect(audioUrl);
    } else {
      res.status(404).json({ error: 'Song not found' });
    }
  } catch (error) {
    console.error('Stream error:', error);
    res.status(500).json({ error: 'Failed to stream song' });
  }
});

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'dist'), {
  maxAge: '1d',
  etag: true
}));

// Handle React routing, return all requests to React app
app.get('*', (req, res) => {
  const indexPath = path.join(__dirname, 'dist', 'index.html');
  console.log('Serving index.html from:', indexPath);
  res.sendFile(indexPath, (err) => {
    if (err) {
      console.error('Error sending file:', err);
      res.status(500).send('Error loading application');
    }
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Static files served from: ${path.join(__dirname, 'dist')}`);
});
