# QuizSpack 🌟

QuizSpack is a modern, full-stack web application for taking interactive quizzes. It features a stunning monochromatic emerald green and gold UI design, a built-in timer, and randomized questions fetched from a backend API.

## ✨ Features

- **Interactive UI**: Elegant, flat-design UI with a dark emerald and gold color scheme.
- **Timed Questions**: A countdown timer adds challenge and urgency.
- **Immediate Feedback**: Correct and incorrect answers are highlighted with visual cues.
- **Zero-Setup Database**: Uses SQLite for out-of-the-box data storage without needing complex database installations.
- **Resilient**: The React frontend falls back to sample questions if the backend API is unavailable.

## 🛠️ Tech Stack

- **Frontend**: React, Vite, Tailwind CSS
- **Backend**: Node.js, Express, SQLite3

## 🚀 Getting Started

To run QuizSpack locally on your machine, you'll need [Node.js](https://nodejs.org/) installed. 

### 1. Backend Setup

The backend serves the API and manages the SQLite database.

```bash
cd backend
npm install
npm run init-db  # Initializes the SQLite database and seeds questions
npm start        # Starts the API server on http://localhost:5000
```

### 2. Frontend Setup

The frontend is a Vite-powered React application. Open a **new terminal window** and run:

```bash
cd frontend
npm install
npm run dev      # Starts the Vite dev server
```

Navigate to `http://localhost:5173` in your browser to play QuizSpack!

## 📸 Preview

![QuizSpack Preview](./frontend/public/vite.svg)

---
*Built with ❤️ for quiz enthusiasts.*
