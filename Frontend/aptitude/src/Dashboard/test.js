import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import "./Test.css"
import { useNavigate } from 'react-router-dom';

function Test() {
  const location = useLocation();
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const [userResponses, setUserResponses] = useState([]);
  const [timeRemaining, setTimeRemaining] = useState(1200); // 10 minutes in seconds
  const questions = location.state.questions;
  const [showResult, setShowResult] = useState(false);
  
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [marks, setMarks] = useState(0);

  // Timer logic
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(prevTime => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (timeRemaining === 0) {
      // Time's up, handle submission or other logic
      handleSubmit();
    }
  }, [timeRemaining]);

  const nextQuestion = () => {
    setCurrentQuestionIndex(prevIndex => prevIndex + 1);
    setSelectedOption('');
  };

  const previousQuestion = () => {
    setCurrentQuestionIndex(prevIndex => prevIndex - 1);
    setSelectedOption('');
  };

  const handleOptionChange = (option) => {
    setSelectedOption(option);
    setUserResponses(prevResponses => {
      const updatedResponses = [...prevResponses];
      updatedResponses[currentQuestionIndex] = option;
      return updatedResponses;
    });
  };
  // Disable right-click
  useEffect(() => {
    function handleContextMenu(event) {
      event.preventDefault();
    }

    window.addEventListener('contextmenu', handleContextMenu);

    return () => window.removeEventListener('contextmenu', handleContextMenu);
  }, []);

  // Disable page refresh
  useEffect(() => {
    function handleBeforeUnload(event) {
      event.preventDefault();
      event.returnValue = '';
    }

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, []);
   // Disable left-click
   useEffect(() => {
    function handleLeftClick(event) {
      if (event.button === 0) { // Check if left mouse button is clicked
        event.preventDefault();
      }
    }

    window.addEventListener('mousedown', handleLeftClick);

    return () => window.removeEventListener('mousedown', handleLeftClick);
  }, []);

  // Disable opening new tab
  useEffect(() => {
    function handleNewTab(event) {
      if (event.metaKey || event.ctrlKey) { // Check if Ctrl or Command key is pressed
        event.preventDefault();
      }
    }

    window.addEventListener('click', handleNewTab);

    return () => window.removeEventListener('click', handleNewTab);
  }, []);
  const handleSubmit = () => {
    setIsSubmitted(true);
    // Compare user responses with correct answers and calculate marks
    const calculatedMarks = questions.reduce((totalMarks, question, index) => {
      if (userResponses[index] === question.answer) {
        return totalMarks + 1;
      }
      return totalMarks;
    }, 0);
    console.log(calculatedMarks);
    setMarks(calculatedMarks);
    // Navigate to the result page
    navigate('/result', { state: { questions: questions,
      marks: calculatedMarks,userResponses:userResponses } });
  };

  return (
    <div className="test-container">
      <h2 className="test-title">Test Questions</h2>
      <div id="time">
        <b><i>Time Remaining: {Math.floor(timeRemaining / 60)}:{timeRemaining % 60 < 10 ? `0${timeRemaining % 60}` : timeRemaining % 60}</i></b>
      </div>
      {showResult ? (
        <div>
          {/* Display result here */}
        </div>
      ) : (
        <div className="question-container">
          <h2 className="question">{questions[currentQuestionIndex].question}</h2>
          <div className="options-container">
            <div className="option-container">
              {questions[currentQuestionIndex].options.map((option, index) => (
                <label key={index} className="option-label">
                  <input
                    type="radio"
                    value={option}
                    checked={selectedOption === option}
                    onChange={() => handleOptionChange(option)}
                    className="option-input"
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>
          <div className="button-container">
            <button className="navigation-button" onClick={previousQuestion} disabled={currentQuestionIndex === 0}>Previous</button>
            {currentQuestionIndex === questions.length - 1 ? (
              <button className="navigation-button" onClick={handleSubmit}>Submit</button>
            ) : (
              <button className="navigation-button" onClick={nextQuestion}>Next</button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Test;
