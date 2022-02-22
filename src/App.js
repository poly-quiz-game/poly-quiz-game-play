import "antd/dist/antd.min.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import io from "socket.io-client";

import EnterPin from "./pages/EnterPin";
import PlayGame from "./pages/PlayGame";
import PreStart from "./pages/PreStart";

import "./styles.scss";

const GameFeature = (props) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io(`ws://localhost:3005`);
    setSocket(newSocket);

    return () => newSocket.close();
  }, [setSocket]);

  if (!socket) return <div>Connecting</div>;

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/enter-pin"
          element={<EnterPin {...props} socket={socket} />}
        />
        <Route
          path="/enter-pin/:pin"
          element={<EnterPin {...props} socket={socket} />}
        />
        <Route
          path="/pre-start/:pin&:name"
          element={<PreStart {...props} socket={socket} />}
        />
        <Route
          path="/play-game/:socketId"
          element={<PlayGame {...props} socket={socket} />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default GameFeature;
