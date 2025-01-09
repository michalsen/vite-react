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
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const [incorrectAnswers, setIncorrectAnswers] = useState<{ question: string; userAnswer: string; correctAnswer: string }[]>([]);
  const [quizFinished, setQuizFinished] = useState(false);

  // State to manage ToDo items
  const [todoItems, setTodoItems] = useState<string[]>(['Change question json to yml', 'Combine into 1 yml', 'Randomize questions', 'Weight topic button to quiz on', 'Randomize number of questions', 'Edit questions']);
  const [newTodo, setNewTodo] = useState<string>(''); // New state for text input

  const shuffleArray = (array: Question[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };

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

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const currentQuestion = questions[currentQuestionIndex];

    if (selectedOption !== currentQuestion.correct_answer) {
      setIncorrectAnswers((prev) => [
        ...prev,
        { question: currentQuestion.question, userAnswer: selectedOption, correctAnswer: currentQuestion.correct_answer }
      ]);
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setQuizFinished(true);
    }

    setSelectedOption('');
  };

  if (questions.length === 0) {
    return <div>Loading questions...</div>;
  }

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
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  // Function to handle adding a new ToDo item
  const handleAddTodo = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newTodo.trim() !== '') {
      setTodoItems((prev) => [...prev, newTodo.trim()]);
      setNewTodo(''); // Clear the input after adding
    }
  };

  return (
    <div className="container">
      <div className="todo-list">
        <h2>To-Do List</h2>
        <ul>
          {todoItems.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
        <form onSubmit={handleAddTodo}>
          {/* <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add new item"
          />
          <button type="submit">Add</button> */}
        </form>
      </div>

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
