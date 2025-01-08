import React, { useEffect, useState, FormEvent } from 'react';
import githubQuestionsData from './data/github_questions.json';
import drupalQuestionsData from './data/drupal_questions.json';
import composerQuestionsData from './data/composer_questions.json';
import developmentQuestionsData from './data/development_questions.json';

// Define the structure of a quiz question
interface Question {
  question: string;
  options: string[];
  correct_answer: string;
}

const App: React.FC = () => {
  // Define the questions state with an explicit type of Question array
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const [incorrectAnswers, setIncorrectAnswers] = useState<{ question: string; userAnswer: string; correctAnswer: string }[]>([]);
  const [quizFinished, setQuizFinished] = useState(false); // New state to track if the quiz is finished

  // Function to shuffle questions
  const shuffleArray = (array: Question[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
  };

  // Load questions on component mount
  useEffect(() => {
    const combinedQuestions = [
      ...githubQuestionsData.git_questions,
      ...drupalQuestionsData.drupal_questions,
      ...composerQuestionsData.composer_quiz_questions,
      ...developmentQuestionsData.development_questions,
    ];
    shuffleArray(combinedQuestions);
    const selectedQuestions = combinedQuestions.slice(0, 10);
    setQuestions(selectedQuestions);
  }, []);

  // Handle form submission
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const currentQuestion = questions[currentQuestionIndex];

    // Check if the selected answer is correct
    if (selectedOption !== currentQuestion.correct_answer) {
      setIncorrectAnswers((prev) => [
        ...prev,
        { question: currentQuestion.question, userAnswer: selectedOption, correctAnswer: currentQuestion.correct_answer }
      ]);
    }

    // Move to the next question or finish the quiz
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Set quiz finished when the last question is answered
      setQuizFinished(true);
    }

    // Reset selected option
    setSelectedOption('');
  };

  // Show loading message if questions are not yet loaded
  if (questions.length === 0) {
    return <div>Loading questions...</div>;
  }

  // If the quiz is finished, render results
  if (quizFinished) {
    return (
      <div className="container">
        <h1>Quiz Finished</h1>
        {incorrectAnswers.length > 0 ? (
          <div>
            <h2>Incorrect Answers</h2>
            <ul>
              {incorrectAnswers.map((item, index) => (
                <li key={index}>
                  <p><strong>Question:</strong> {item.question}</p>
                  <p><strong>Your Answer:</strong> <span style={{ color: 'red' }}>{item.userAnswer}</span></p>
                  <p><strong>Correct Answer:</strong> <span style={{ color: 'green' }}>{item.correctAnswer}</span></p>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <h2>Congratulations! You got all answers correct!</h2>
        )}
        {/* Optionally add a button to restart the quiz */}
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="container">
      <h1>Quiz</h1>

      <form onSubmit={handleSubmit}>
        <h2>{currentQuestion.question}</h2>
        {currentQuestion.options.map((option, index) => (
          <div key={index}>
            <label>
              <input
                type="radio"
                value={option}
                checked={selectedOption === option}
                onChange={(e) => setSelectedOption(e.target.value)}
              />
              {option}
            </label>
          </div>
        ))}
        <button type="submit">Submit</button>
      </form>

    </div>
  );
};

export default App;
