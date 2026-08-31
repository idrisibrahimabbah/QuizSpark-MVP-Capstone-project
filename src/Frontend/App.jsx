import React, { useState, useEffect, useCallback } from 'react';

const fallbackQuestions = [
  { id: 1, question_text: "What is the capital of France?", option_a: "London", option_b: "Berlin", option_c: "Paris", option_d: "Madrid", correct_option: "C" },
  { id: 2, question_text: "Which planet is known as the Red Planet?", option_a: "Venus", option_b: "Mars", option_c: "Jupiter", option_d: "Saturn", correct_option: "B" },
  { id: 3, question_text: "What is the largest ocean on Earth?", option_a: "Atlantic", option_b: "Indian", option_c: "Arctic", option_d: "Pacific", correct_option: "D" },
];

export default function App() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  
  const [timeLeft, setTimeLeft] = useState(15);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  
  // Theme state
  const [isDarkMode, setIsDarkMode] = useState(true);

  const fetchQuestions = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/questions?limit=5');
      if (!res.ok) throw new Error("API not available");
      const data = await res.json();
      setQuestions(data);
    } catch (err) {
      console.warn("Backend not running, using fallback questions");
      const shuffled = [...fallbackQuestions].sort(() => 0.5 - Math.random());
      setQuestions(shuffled);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  const handleNextQuestion = useCallback(() => {
    setSelectedAnswer(null);
    setIsCorrect(null);
    setTimeLeft(15);
    
    const nextQuestion = currentQuestionIndex + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestionIndex(nextQuestion);
    } else {
      setShowScore(true);
    }
  }, [currentQuestionIndex, questions.length]);

  useEffect(() => {
    if (showScore || questions.length === 0 || selectedAnswer) return;

    if (timeLeft === 0) {
      handleNextQuestion();
      return;
    }

    const timerId = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearTimeout(timerId);
  }, [timeLeft, showScore, questions.length, selectedAnswer, handleNextQuestion]);

  const handleAnswerOptionClick = (optionKey) => {
    if (selectedAnswer) return;
    
    setSelectedAnswer(optionKey);
    const correct = optionKey === questions[currentQuestionIndex].correct_option;
    setIsCorrect(correct);
    
    if (correct) {
      setScore(score + 1);
    }
    
    setTimeout(() => {
      handleNextQuestion();
    }, 1500);
  };

  const restartQuiz = () => {
    setScore(0);
    setCurrentQuestionIndex(0);
    setShowScore(false);
    fetchQuestions();
  };

  if (questions.length === 0) {
    return (
      <div className={isDarkMode ? 'dark' : ''}>
        <div className="flex items-center justify-center min-h-screen text-2xl text-gold-600 dark:text-gold-400 bg-emerald-50 dark:bg-emerald-900 transition-colors duration-300">
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div className={isDarkMode ? 'dark' : ''}>
      <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-emerald-50 dark:bg-emerald-900 transition-colors duration-300 relative">
        
        {/* Theme Toggle Button */}
        <button 
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="absolute top-4 right-4 px-4 py-2 rounded-full font-semibold bg-white dark:bg-emerald-800 text-emerald-800 dark:text-emerald-200 hover:bg-emerald-100 dark:hover:bg-emerald-700 transition-colors shadow-md border border-emerald-200 dark:border-transparent flex items-center space-x-2"
          title="Toggle Theme"
        >
          <span>{isDarkMode ? '☀️ Light' : '🌙 Dark'}</span>
        </button>

        <h1 className="text-5xl font-bold text-gold-600 dark:text-gold-400 mb-8 tracking-widest drop-shadow-md transition-colors duration-300">QuizSpack</h1>
        
        <div className="w-full max-w-lg p-8 space-y-8 bg-white dark:bg-emerald-800 rounded-2xl shadow-2xl border border-emerald-200 dark:border-gold-500/20 relative overflow-hidden transition-colors duration-300">
          
          {/* Decorative Top Accent */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gold-400 to-gold-600"></div>

          {showScore ? (
            <div className="text-center space-y-6">
              <h2 className="text-4xl font-bold text-gold-600 dark:text-gold-400">Quiz Completed!</h2>
              <p className="text-2xl text-emerald-900 dark:text-emerald-100">
                You scored <span className="text-gold-500 font-bold">{score}</span> out of {questions.length}
              </p>
              <button 
                onClick={restartQuiz}
                className="px-8 py-3 text-lg font-semibold text-white dark:text-emerald-900 bg-gold-500 dark:bg-gold-400 rounded-full hover:bg-gold-600 dark:hover:bg-gold-500 transition-colors shadow-lg shadow-gold-500/30"
              >
                Play Again
              </button>
            </div>
          ) : (
            <>
              <div className="flex justify-between items-center text-emerald-700 dark:text-emerald-200 text-sm font-medium">
                <span>Question {currentQuestionIndex + 1} / {questions.length}</span>
                <span className={`flex items-center space-x-1 ${timeLeft <= 5 ? 'text-red-500 dark:text-red-400 animate-pulse' : 'text-gold-600 dark:text-gold-400'}`}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  <span>{timeLeft}s</span>
                </span>
              </div>

              <div className="text-2xl font-semibold text-emerald-900 dark:text-emerald-50 leading-relaxed">
                {questions[currentQuestionIndex].question_text}
              </div>

              <div className="space-y-3">
                {['A', 'B', 'C', 'D'].map((opt) => {
                  const optionKey = `option_${opt.toLowerCase()}`;
                  const optionText = questions[currentQuestionIndex][optionKey];
                  
                  let buttonStyle = "bg-emerald-50 dark:bg-emerald-700/50 hover:bg-emerald-100 dark:hover:bg-emerald-600 text-emerald-900 dark:text-emerald-100 border-emerald-200 dark:border-emerald-600";
                  
                  if (selectedAnswer) {
                    const isThisCorrect = opt === questions[currentQuestionIndex].correct_option;
                    if (isThisCorrect) {
                      buttonStyle = "bg-emerald-500 dark:bg-emerald-500 text-white border-emerald-500 dark:border-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.5)]";
                    } else if (selectedAnswer === opt) {
                      buttonStyle = "bg-red-500/90 dark:bg-red-500/80 text-white border-red-500";
                    } else {
                      buttonStyle = "bg-emerald-100/50 dark:bg-emerald-800/50 text-emerald-400 border-emerald-100 dark:border-emerald-800 opacity-50";
                    }
                  }

                  return (
                    <button
                      key={opt}
                      disabled={selectedAnswer !== null}
                      onClick={() => handleAnswerOptionClick(opt)}
                      className={`w-full text-left px-6 py-4 rounded-xl border transition-all duration-300 ${buttonStyle}`}
                    >
                      <span className="font-bold mr-3 opacity-70">{opt}.</span> {optionText}
                    </button>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
