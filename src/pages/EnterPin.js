import React, { useState, useEffect } from "react";
import { Input, Button } from "antd";
import { Link, useNavigate } from "react-router-dom";

const EnterPin = ({ socket }) => {
  const navigate = useNavigate();

  const [pin, setPin] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [game, setGame] = useState(null);

  useEffect(() => {
    socket.on("gameData-player", (game) => {
      setGame(game);
    });

    socket.on("noGameFound-player", () => {
      setGame(null);
      setError("Phòng không tồn tại!");
    });

    return () => {
      socket.emit("disconnect", socket.id);
    };
  }, []);

  const checkGame = (pin) => {
    socket.emit("player-check-game", pin);
  };

  return (
    <div className="join-room__screen">
      <div className="enter-pin-form">
        {!game ? (
          <>
            <p>Nhập mã game</p>
            <Input
              placeholder="Nhập PIN"
              value={pin}
              onChange={(e) => {
                setError("");
                setPin(e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") checkGame(pin);
              }}
            />
            <Button type="primary" onClick={() => checkGame(pin)}>
              Tham gia
            </Button>
          </>
        ) : (
          <>
            <p>Nhập tên</p>
            <Input
              placeholder="Nhập tên của bạn"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter")
                  navigate(`/play/pre-start/${game.pin}&${name}`);
              }}
            />
            <Link to={`/play/pre-start/${game.pin}&${name}`}>
              <Button type="primary">Bắt đầu</Button>
            </Link>
          </>
        )}
        <p>{error}</p>
      </div>
    </div>
  );
};

export default EnterPin;
