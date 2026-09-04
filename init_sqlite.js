const db = require('./db');

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS questions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    question_text TEXT NOT NULL,
    option_a TEXT NOT NULL,
    option_b TEXT NOT NULL,
    option_c TEXT NOT NULL,
    option_d TEXT NOT NULL,
    correct_option TEXT NOT NULL
  )`);

  // Clear existing to avoid duplicates if run multiple times
  db.run(`DELETE FROM questions`);

  const stmt = db.prepare(`INSERT INTO questions (question_text, option_a, option_b, option_c, option_d, correct_option) VALUES (?, ?, ?, ?, ?, ?)`);
  
  const questions = [
    ['What is the capital of France?', 'London', 'Berlin', 'Paris', 'Madrid', 'C'],
    ['Which planet is known as the Red Planet?', 'Venus', 'Mars', 'Jupiter', 'Saturn', 'B'],
    ['What is the largest ocean on Earth?', 'Atlantic Ocean', 'Indian Ocean', 'Arctic Ocean', 'Pacific Ocean', 'D'],
    ['Who wrote "Romeo and Juliet"?', 'Charles Dickens', 'William Shakespeare', 'Mark Twain', 'Jane Austen', 'B'],
    ['What is the chemical symbol for Gold?', 'Ag', 'Fe', 'Au', 'Cu', 'C'],
    ['Which element has the atomic number 1?', 'Helium', 'Oxygen', 'Carbon', 'Hydrogen', 'D'],
    ['What is the tallest mountain in the world?', 'K2', 'Mount Everest', 'Mount Kilimanjaro', 'Denali', 'B'],
    ['Who painted the Mona Lisa?', 'Vincent van Gogh', 'Pablo Picasso', 'Leonardo da Vinci', 'Claude Monet', 'C'],
    ['What is the hardest natural substance on Earth?', 'Gold', 'Iron', 'Diamond', 'Platinum', 'C'],
    ['How many continents are there?', '5', '6', '7', '8', 'C']
  ];

  for (const q of questions) {
    stmt.run(q);
  }
  stmt.finalize();
  console.log("Database initialized with questions.");
});

db.close();
