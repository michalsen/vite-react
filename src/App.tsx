import React, { useEffect, useState, FormEvent } from 'react';
import gitQuestionsData from './data/git_questions.json';
import drupalQuestionsData from './data/drupal_questions.json';
import composerQuestionsData from './data/composer_questions.json';
import phpQuestionsData from './data/php_questions.json';
import sqlQuestionsData from './data/sql_questions.json';
import cisspd1QuestionsData from './data/cisspd1_questions.json';

// Define the structure of a quiz question
interface Question {
  question: string;
  type: string;
  options: string[];
  correct_answer: string;
}

const App: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const [incorrectAnswers, setIncorrectAnswers] = useState<{ question: string; userAnswer: string; correctAnswer: string }[]>([]);
  const [quizFinished, setQuizFinished] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const shuffleArray = (array: Question[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };

  useEffect(() => {
    const combinedQuestions = [
      ...gitQuestionsData.git_questions,
      ...drupalQuestionsData.drupal_questions,
      ...composerQuestionsData.composer_quiz_questions,
      ...phpQuestionsData.development_questions,
      ...sqlQuestionsData.mysql_quiz_questions,
      ...cisspd1QuestionsData.cissp_domain1_quiz_questions,
    ];
    shuffleArray(combinedQuestions);
    setQuestions(combinedQuestions);
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

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((cat) => cat !== category) : [...prev, category]
    );
  };

  const filteredQuestions = selectedCategories.length > 0
    ? questions.filter(q => selectedCategories.includes(q.type))
    : questions;

  if (filteredQuestions.length === 0 && selectedCategories.length > 0) {
    return <div>No questions available for the selected categories.</div>;
  }

  if (filteredQuestions.length === 0) {
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

  const currentQuestion = filteredQuestions[currentQuestionIndex];

  return (
    <div className="container">
      <h1>Quiz</h1>
      <div style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '20px', display: 'flex', justifyContent: 'space-around' }}>
        <label>
          <input
            type="checkbox"
            value="Drupal"
            checked={selectedCategories.includes("Drupal")}
            onChange={() => handleCategoryChange("Drupal")}
          />
          Drupal
        </label>
        <label>
          <input
            type="checkbox"
            value="PHP"
            checked={selectedCategories.includes("PHP")}
            onChange={() => handleCategoryChange("PHP")}
          />
          PHP
        </label>
        <label>
          <input
            type="checkbox"
            value="SQL"
            checked={selectedCategories.includes("SQL")}
            onChange={() => handleCategoryChange("SQL")}
          />
          SQL
        </label>
        <label>
          <input
            type="checkbox"
            value="Git"
            checked={selectedCategories.includes("Git")}
            onChange={() => handleCategoryChange("Git")}
          />
          Git
        </label>
        <label>
          <input
            type="checkbox"
            value="Composer"
            checked={selectedCategories.includes("Composer")}
            onChange={() => handleCategoryChange("Composer")}
          />
          Composer
        </label>
      </div>
      <div style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '20px', display: 'flex', justifyContent: 'space-around' }}>
        <label>
          <input
            type="checkbox"
            value="CISSPD1"
            checked={selectedCategories.includes("CISSPD1")}
            onChange={() => handleCategoryChange("CISSPD1")}
          />
          CISSP D1
        </label>
        <label>
          <input
            type="checkbox"
            value="CISSPD2"
            checked={selectedCategories.includes("CISSPD2")}
            onChange={() => handleCategoryChange("CISSPD2")}
            disabled
          />
          CISSP D2
        </label>
        <label>
          <input
            type="checkbox"
            value="CISSPD3"
            checked={selectedCategories.includes("CISSPD3")}
            onChange={() => handleCategoryChange("CISSPD3")}
            disabled
          />
          CISSP D3
        </label>
        <label>
          <input
            type="checkbox"
            value="CISSPD4"
            checked={selectedCategories.includes("CISSPD4")}
            onChange={() => handleCategoryChange("CISSPD4")}
            disabled
          />
          CISSP D4
        </label>
        <label>
          <input
            type="checkbox"
            value="CISSPD5"
            checked={selectedCategories.includes("CISSPD5")}
            onChange={() => handleCategoryChange("CISSPD5")}
            disabled
          />
          CISSP D5
        </label>
        <label>
          <input
            type="checkbox"
            value="CISSPD6"
            checked={selectedCategories.includes("CISSPD6")}
            onChange={() => handleCategoryChange("CISSPD6")}
            disabled
          />
          CISSP D6
        </label>
        <label>
          <input
            type="checkbox"
            value="CISSPD7"
            checked={selectedCategories.includes("CISSPD7")}
            onChange={() => handleCategoryChange("CISSPD7")}
            disabled
          />
          CISSP D7
        </label>
        <label>
          <input
            type="checkbox"
            value="CISSPD8"
            checked={selectedCategories.includes("CISSPD8")}
            onChange={() => handleCategoryChange("CISSPD8")}
            disabled
          />
          CISSP D8
        </label>
      </div>
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
