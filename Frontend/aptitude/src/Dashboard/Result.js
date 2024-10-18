import React from 'react';
import { useLocation } from 'react-router-dom';
import './Result.css'; // Import CSS file for styling

function Result() {
  const location = useLocation();
  const { questions, marks, userResponses } = location.state;

  return (
    <div className="result-container">
      <h2 className="result-title">Test Result</h2>
      <button style={{display:'flex'}}  > <a href="/dashboard">Exit Exam</a></button>
      <div className="result-summary">
        <p className="marks">Marks Obtained: <span>{marks} / 15</span></p>
      </div>
      <div className="question-list">
        <h3 className="question-heading">Questions</h3>
        {questions.map((question, index) => (
          <div key={index} className="question-item">
            <h4 className="question">{question.question}</h4>
            <p className="response">
  Your Response: <span>{userResponses[index] ? userResponses[index] : 'Not answered'}</span>
</p>

            <p className="correct-answer">Correct Answer: <span>{question.answer}</span></p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Result;
