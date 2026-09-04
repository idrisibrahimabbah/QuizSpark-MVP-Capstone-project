const express = require('express');
const cors = require('cors');
const db = require('../db'); // Adjust path relative to the api directory if needed[cite: 6]

const app = express();
app.use(cors());
app.use(express.json());

// Get random quiz questions[cite: 6]
app.get('/api/questions', (req, res) => {
  const limit = parseInt(req.query.limit) || 5;
  db.all('SELECT * FROM questions ORDER BY RANDOM() LIMIT ?', [limit], (err, rows) => {
    if (err) {
      console.error(err.message);
      res.status(500).json({ error: 'Server error' });
    } else {
      res.json(rows);
    }
  });
});

// Export the Express API handler for Vercel's serverless environment
module.exports = app;
```[cite: 6]

### Deployment Notes
* **Database Consideration**: SQLite (`db.js`)[cite: 6] relies on a local file system. Because Vercel uses a read-only, ephemeral serverless filesystem, file-based SQLite databases will reset or fail on write operations. For full persistence in production, migrate the database layer to a cloud-hosted SQL provider (like Turso, Supabase, or Neon).
* **Environment Variables**: Configure your production environment variables inside the Vercel Dashboard under your project settings if your app expands to use external services or authentication keys[cite: 1].