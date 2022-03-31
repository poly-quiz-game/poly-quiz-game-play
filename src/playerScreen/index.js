import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import io from "socket.io-client";

import EnterPin from "./pages/EnterPin";
import PlayGame from "./pages/PlayGame";
// import OnLobby from "./pages/OnLobby";

import "./styles.scss";

const port = process.env.ENDPOINT || "ws://localhost:3005";

const GameFeature = (props) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io(port);
    setSocket(newSocket);

    return () => newSocket.close();
  }, [setSocket]);

  if (!socket) return <div>Connecting</div>;

  return (
    <Routes>
      <Route
        path="/enter-pin"
        element={<EnterPin {...props} socket={socket} />}
      />
      <Route
        path="/enter-pin/:pin"
        element={<EnterPin {...props} socket={socket} />}
      />
      {/* <Route
        path="/on-lobby/pin=:pin&name=:name&tokenId=:tokenId"
        element={<OnLobby {...props} socket={socket} />}
      /> */}
      <Route
        path="/play-game/:socketId"
        element={<PlayGame {...props} socket={socket} />}
      />
    </Routes>
  );
};

export default GameFeature;
