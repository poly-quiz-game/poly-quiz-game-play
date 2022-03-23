import React, { useState } from "react";
import { Button } from "antd";
import { questionTypes } from "../consts";

const SelectAnswers = ({ playerAnswer, type, labels }) => {
  const [selectedAnswers, setSelectedAnswers] = useState([]);

  const selectedAnswerHandler = (answer) => {
    if (type === questionTypes.MULTIPLE_CORRECT_ANSWER) {
      if (selectedAnswers.includes(answer)) {
        setSelectedAnswers(selectedAnswers.filter((a) => a !== answer));
      } else {
        setSelectedAnswers([...selectedAnswers, answer]);
      }
      return;
    }

    playerAnswer(answer);
  };

  const handleMultipleAnswer = () => {
    if (selectedAnswers.length === 0) {
      return;
    }

    const answerString = selectedAnswers.join("|");
    playerAnswer(answerString);
  };

  return (
    <div className="answers">
      {labels.map((label, index) => {
        const isSelected = selectedAnswers.includes(index.toString());
        return (
          <div
            className={`answer answer-${index + 1}`}
            key={index}
            onClick={() => selectedAnswerHandler(index.toString())}
          >
            <div className="answer-label">{label}</div>

            {isSelected && (
              <div className="correct-checkbox">
                <button
                  data-functional-selector="question-answer__toggle-button"
                  className={`correct-answer-check-button ${
                    isSelected ? "checked" : ""
                  }`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                    <path
                      fill="#fff"
                      d="M438.6 105.4C451.1 117.9 451.1 138.1 438.6 150.6L182.6 406.6C170.1 419.1 149.9 419.1 137.4 406.6L9.372 278.6C-3.124 266.1-3.124 245.9 9.372 233.4C21.87 220.9 42.13 220.9 54.63 233.4L159.1 338.7L393.4 105.4C405.9 92.88 426.1 92.88 438.6 105.4H438.6z"
                    />
                  </svg>
                </button>
              </div>
            )}
          </div>
        );
      })}
      {selectedAnswers.length !== 0 && (
        <Button
          className="submit-answer-btn"
          size="large"
          onClick={handleMultipleAnswer}
        >
          Trả lời
        </Button>
      )}
    </div>
  );
};

export default SelectAnswers;
