import React, { useState } from "react";
import { Button, Input } from "antd";
import { Helmet } from "react-helmet";

const Answers = ({ playerAnswer }) => {
  const [answer, setAnswer] = useState("");

  const handleAnswer = () => {
    playerAnswer(answer);
  };

  return (
    <div className="answers type-answer">
      <Helmet>
        <meta charSet="utf-8" />
        <title>{"Trả lời câu hỏi | Poly Quiz Game Play"}</title>
      </Helmet>
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
