const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

// Get random quiz questions
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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
