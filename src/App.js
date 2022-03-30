import "antd/dist/antd.min.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import io from "socket.io-client";

import EnterPin from "./pages/EnterPin";
import PlayGame from "./pages/PlayGame";

import "./styles.scss";

const port = "https://poly-quiz-backend.azurewebsites.net";
// const port = "http://localhost:3005";

const GameFeature = (props) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io(port);
    setSocket(newSocket);

    return () => newSocket.close();
  }, [setSocket]);

  if (!socket) return <div>Connecting</div>;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<EnterPin {...props} socket={socket} />} />
        <Route path="/:pin" element={<EnterPin {...props} socket={socket} />} />
        <Route
          path="/play-game/:socketId"
          element={<PlayGame {...props} socket={socket} />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default GameFeature;
