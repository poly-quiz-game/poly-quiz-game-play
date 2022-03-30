import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { Row, Col, Button, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import "../styles.scss";
import { questionTypeLabels, questionTypes } from "../consts";

import SelectAnswers from "./SelectAnswers";
import TypeAnswer from "./TypeAnswer";

const antIcon = <LoadingOutlined style={{ fontSize: 111 }} spin />;

const QUESTION_LABELS = ["A", "B", "C", "D"];
const QUESTION_TRUE_FALSE_LABELS = ["A", "B"];

// hiện câu hỏi - showQuestion
// đợi kết quả - waitingResult
// hiện kết quả - showResult
// kết thúc game - endGame

const QUESTION_STATES = {
  showQuestion: "showQuestion",
  waitingResult: "waitingResult",
  showResult: "showResult",
  endGame: "endGame",
};

const PlayGame = ({ socket }) => {
  const [state, setState] = useState({
    gameState: QUESTION_STATES.showQuestion,
    isCorrect: null,
    question: {},
    playerData: {
      rank: -1,
      score: 0,
    },
    gameData: {},
    endGameData: {},
  });

  const prevScore = useRef(null);

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (params.socketId) {
      socket.emit("player-join-game", { socketId: params.socketId });
    }

    socket.on("host-disconnected", () => {
      navigate("/");
    });

    socket.on("no-game-found", () => {
      navigate(`/`);
    });

    socket.on("hostDisconnect-player", () => {
      navigate(`/`);
    });

    socket.on("game-over", (endGameData) => {
      setState((prevState) => ({
        ...prevState,
        gameState: QUESTION_STATES.endGame,
        endGameData,
      }));
    });

    socket.on("player-info", (player, game) => {
      setState((prevState) => ({
        ...prevState,
        playerData: {
          ...prevState.playerData,
          ...player,
        },
        gameData: {
          ...prevState.gameData,
          ...game,
        },
      }));
    });

    socket.on("player-score", ({ score, rank }) => {
      setState((prevState) => ({
        ...prevState,
        playerData: {
          ...prevState.playerData,
          score,
          rank,
        },
      }));
    });

    socket.on("question-started", (question) => {
      setState((prevState) => ({
        ...prevState,
        gameState: QUESTION_STATES.showQuestion,
        question,
      }));
    });

    socket.on("question-over", (isCorrect) => {
      setState((prevState) => ({
        ...prevState,
        gameState: QUESTION_STATES.showResult,
        isCorrect,
      }));
      socket.emit("get-player-score");
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    prevScore.current = state.playerData.score;
  }, [state]);

  const playerAnswer = (answer) => {
    socket.emit("player-answer", answer);
    setState((prevState) => ({
      ...prevState,
      gameState: QUESTION_STATES.waitingResult,
    }));
  };

  const { gameState, isCorrect, question, playerData, gameData, endGameData } =
    state;

  const Answers =
    question?.type?.name === questionTypes.TYPE_ANSWER
      ? TypeAnswer
      : SelectAnswers;

  if (gameState === QUESTION_STATES.endGame) {
    return (
      <div className="player-game__screen">
        <div className="player-info">
          <div className="player-name">{playerData.name}</div>
          <div className="player-score">{playerData.score}</div>
        </div>
        <div className="question-answer-result">
          <div className="player-game-result">
            <h3>Bạn đã đạt top</h3>
            <h1 className="top">{playerData.rank}</h1>
            <br />
            <Link to="/">
              <Button type="primary">Đóng</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="player-game__screen">
      <div className="player-info">
        <div className="player-name">
          {questionTypeLabels[question?.type?.name]}
        </div>
        <div className="player-score">{playerData.score}</div>
      </div>
      {gameState === QUESTION_STATES.showQuestion && (
        <Answers
          type={question?.type?.name}
          playerAnswer={playerAnswer}
          labels={
            question?.type?.name === questionTypes.TRUE_FALSE_ANSWER
              ? QUESTION_TRUE_FALSE_LABELS
              : QUESTION_LABELS
          }
        />
      )}
      {gameState === QUESTION_STATES.waitingResult && (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              paddingTop: "calc(40vh - 93px)",
            }}
          >
            <Spin indicator={antIcon} />
          </div>
          <br />
          <h3 style={{ textAlign: "center" }}>Chờ người chơi khác</h3>
        </>
      )}
      {gameState === QUESTION_STATES.showResult && (
        <div className="question-answer">
          {isCorrect ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              style={{ width: "100px", fill: "#56d17e" }}
            >
              <path d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 352 512"
              style={{ width: "100px", fill: "#e21b3c" }}
            >
              <path d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z" />
            </svg>
          )}
          <h1 style={{ color: "#fff" }} className="question-tf">
            {isCorrect ? "Đúng" : "Sai"}
          </h1>
          <p style={{ color: "#fff" }}>
            + {playerData.score - prevScore.current} điểm
          </p>
          <h3 style={{ color: "#fff" }}>
            Bạn đang ở vị trí số {playerData.rank}
          </h3>
        </div>
      )}
      <div className="question-footer">
        <div className="player-name">{playerData.name}</div>
        <div className="player-score">{playerData.score}</div>
      </div>
    </div>
  );
};

export default PlayGame;
