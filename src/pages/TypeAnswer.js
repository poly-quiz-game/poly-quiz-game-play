import React, { useState } from "react";
import { Button, Input } from "antd";

const Answers = ({ playerAnswer }) => {
  const [answer, setAnswer] = useState("");

  const handleAnswer = () => {
    playerAnswer(answer);
  };

  return (
    <div className="answers type-answer">
      <div className="type-answer-input">
        <Input
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Nhập câu trả lời"
        />
      </div>
      {answer.length !== 0 && (
        <Button
          className="submit-answer-btn"
          size="large"
          onClick={handleAnswer}
        >
          Trả lời
        </Button>
      )}
    </div>
  );
};

export default Answers;
