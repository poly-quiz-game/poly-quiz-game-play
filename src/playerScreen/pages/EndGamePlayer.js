import React from "react";
import { Link } from "react-router-dom";
const _ = require("lodash");
import { Progress, List, Row, Col, Tabs, Button } from "antd";

import "./indexEndGame.scss";

const checkIsCorrectAnswer = (
  answer,
  { type, correctAnswer, reportQuestionAnswers: answers }
) => {
  if (type === "TYPE_ANSWER") {
    return (
      answers[correctAnswer].answer.toLowerCase().trim() ===
      `${answer.toLowerCase().trim()}`
    );
  }
  return (
    _.difference(
      correctAnswer.split("|").filter((a) => a),
      answer.split("|").filter((a) => a)
    ).length === 0
  );
};

const getPlayerCorrectAnswers = ({ answers, questions }) => {
  let sum = 0;
  answers.forEach((answer, index) => {
    const isCorrect = checkIsCorrectAnswer(answer.answer, questions[index]);
    if (isCorrect) {
      sum += 1;
    }
  });
  return sum;
};

const sumAnswers = (arr) => {
  const obj = [0, 0, 0, 0];
  arr.forEach((item) => {
    const answers = item.answers[item.answers.length - 1].answer.split("|");
    answers.forEach((answer) => {
      obj[answer] += 1;
    });
  });
  return obj;
};

const sumAnswersTypeAnswerQuestion = (playersInGame, correctAnswer) => {
  let sum = 0;
  playersInGame.forEach((item) => {
    const answer = item.answers[item.answers.length - 1].answer;
    if (correctAnswer === answer) {
      sum += 1;
    }
  });
  return sum;
};

const EndGamePlayer = ({ report }) => {
  // const [report, setReportData] = React.useState({
  //   players: [],
  //   questions: [],
  // });

  return (
    <div className="end-game__main">
      <div className="container">
        <Tabs defaultActiveKey="2" type="card">
          <Tabs.TabPane tab="Người tham gia" key="1">
            <div className="table">
              <Row className="table-header">
                <Col className="player-index" span={3}></Col>
                <Col className="player-name" span={5}>
                  <strong>Tên</strong>
                </Col>
                <Col
                  className="player-name"
                  span={6}
                  style={{ textAlign: "center" }}
                >
                  <strong>Đúng</strong>
                </Col>
                <Col className="player-progress" span={6}></Col>
                <Col
                  className="player-score"
                  span={4}
                  style={{ textAlign: "center" }}
                >
                  <strong>Điểm</strong>
                </Col>
              </Row>
              <div className="list-player">
                <List
                  dataSource={report.players}
                  renderItem={(player, index) => {
                    const percent = getPlayerCorrectAnswers({
                      answers: player.answers,
                      questions: report.questions,
                    });
                    return (
                      <List.Item>
                        <Row
                          style={{
                            width: "100%",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <Col className="player-index" span={3}>
                            {index < 3 && <strong>{index + 1}</strong>}
                          </Col>
                          <Col className="player-name" span={5}>
                            <strong>{player.name}</strong>
                          </Col>
                          <Col
                            className="player-name"
                            span={6}
                            style={{ textAlign: "center" }}
                          >
                            <strong>
                              {percent} / {report.questions.length}
                            </strong>
                          </Col>
                          <Col
                            className="player-progress"
                            span={6}
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <Progress
                              type="circle"
                              percent={
                                ((percent / report.questions.length) * 100) | 0
                              }
                              success={{
                                percent:
                                  ((percent / report.questions.length) * 100) |
                                  0,
                              }}
                              width={50}
                            />
                          </Col>
                          <Col
                            className="player-score"
                            span={4}
                            style={{ textAlign: "center" }}
                          >
                            <strong>{player.score}</strong>
                          </Col>
                        </Row>
                      </List.Item>
                    );
                  }}
                />
              </div>
            </div>
          </Tabs.TabPane>
          <Tabs.TabPane tab="Câu hỏi" key="2">
            <div className="table">
              <Row className="table-header">
                <Col className="player-index" span={3}></Col>
                <Col className="player-score" span={13}>
                  <strong>Câu hỏi</strong>
                </Col>
                <Col className="player-progress" span={8}>
                  Phần trăm trả lời đúng
                </Col>
              </Row>
              <div className="list-player">
                <List
                  dataSource={[...report.questions]}
                  renderItem={(question, index) => {
                    let countCorrectAnswers = 0;

                    if (question?.type?.name === "TYPE_ANSWER") {
                      countCorrectAnswers = sumAnswersTypeAnswerQuestion(
                        report.players,
                        question.correctAnswer
                      );
                    } else {
                      countCorrectAnswers = sumAnswers(report.players || [])[
                        question.correctAnswer
                      ];
                    }
                    return (
                      <List.Item>
                        <Row
                          style={{
                            width: "100%",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <Col className="player-index" span={3}>
                            <strong>{index + 1}</strong>
                          </Col>
                          <Col className="player-name" span={13}>
                            <strong>{question.question}</strong>
                          </Col>
                          <Col
                            className="player-progress"
                            span={8}
                            style={{
                              display: "flex",
                              justifyContent: "center",
                            }}
                          >
                            <Progress
                              type="circle"
                              percent={
                                ((countCorrectAnswers /
                                  report.questions.length) *
                                  100) |
                                0
                              }
                              success={{
                                percent:
                                  ((countCorrectAnswers /
                                    report.questions.length) *
                                    100) |
                                  0,
                              }}
                              width={50}
                            />
                          </Col>
                        </Row>
                      </List.Item>
                    );
                  }}
                />
              </div>
            </div>
          </Tabs.TabPane>
        </Tabs>
        <div className="footer">
          <Link to="/quiz">
            <Button size="large" type="primary">
              Kết thúc
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EndGamePlayer;
