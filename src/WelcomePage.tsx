import React from 'react';
import './WelcomePage.css';

const WelcomePage: React.FC = () => {
  return (
    <div className="welcome-container">
      <h1 className="welcome-title">Welcome to Our Vite/React App!</h1>
      <p className="welcome-message">
        We are excited to have you here. This is a boilerplate setup using Vite and React.
      </p>
      <p className="welcome-instructions">
        To get started, check out the links below:
      </p>
      <ul className="welcome-links">
        <li>
          <a href="/docs" className="welcome-link">Documentation</a>
        </li>
        <li>
          <a href="/about" className="welcome-link">About Us</a>
        </li>
        <li>
          <a href="/contact" className="welcome-link">Contact Us</a>
        </li>
      </ul>
      <p className="welcome-footer">
        Happy coding! 🚀
      </p>
    </div>
  );
};

export default WelcomePage;
