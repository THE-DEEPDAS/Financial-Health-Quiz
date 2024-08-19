import React from 'react';
import './Question.css';

const Question = ({
  question,
  options,
  type,
  inputType,
  onAnswer,
  onInputChange,
  userInput,
  onInputSubmit,
  inputSubmitted,
  inputError
}) => {
  return (
    <div className="question-container">
      <h2 className="question-text">{question}</h2>
      {type === 'input' ? (
        <div className="input-container">
          <input
            type={inputType}
            value={userInput}
            onChange={onInputChange}
            className={`question-input ${inputError ? 'error' : ''}`}
            placeholder="Enter your answer"
          />
          <button
            className="submit-button"
            onClick={onInputSubmit}
            disabled={inputSubmitted}
          >
            Submit
          </button>
          {inputError && <p className="error-message">{inputError}</p>}
        </div>
      ) : (
        <div className="options-container">
          {options.map((option, index) => (
            <button
              key={index}
              className="option-button"
              onClick={() => onAnswer(option)}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Question;
