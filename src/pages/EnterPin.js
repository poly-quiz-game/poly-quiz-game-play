import React, { useState, useEffect } from "react";
import { Input, Button } from "antd";
import { useNavigate } from "react-router-dom";
import GoogleLogin from "react-google-login";

const EnterPin = ({ socket }) => {
  const navigate = useNavigate();

  const [pin, setPin] = useState("");
  const [name, setName] = useState("");
  const [isOnLobby, setIsOnLobby] = useState(false);
  const [error, setError] = useState("");
  const [game, setGame] = useState(null);

  useEffect(() => {
    socket.on("game-info", (game) => {
      setGame(game);
    });

    socket.on("get-kicked", () => {
      alert("Bạn đã bị kick ra khỏi phòng!");
      navigate("/play/enter-pin");
    });

    socket.on("game-started", () => {
      navigate(`/play/play-game/${socket.id}`);
    });

    socket.on("joined-lobby", () => {
      setIsOnLobby(true);
    });

    socket.on("no-game-found", () => {
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

  const responseGoogle = async ({ tokenId }) => {
    if (tokenId) {
      joinLobby({ pin, tokenId });
    }
  };

  const joinLobby = ({ pin, name, tokenId }) => {
    socket.emit("player-join-lobby", { pin, name, tokenId });
  };

  if (isOnLobby) {
    return (
      <div className="join-room__screen">Thấy tên bạn trên màn hình ko?</div>
    );
  }

  if (!game) {
    return (
      <div className="join-room__screen">
        <div className="enter-pin-form">
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
          <Button
            type="primary"
            className="submit-game"
            onClick={() => checkGame(pin)}
          >
            Tham gia
          </Button>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (game?.quizData?.needLogin) {
    return (
      <div className="join-room__screen">
        <div className="enter-pin-form">
          <p>Đăng nhập Google</p>
          <GoogleLogin
            clientId={process.env.REACT_APP_O2AUTH_CLIENT_ID}
            buttonText="Login with google"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={"single_host_origin"}
            hostedDomain="fpt.edu.vn"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="join-room__screen">
      <div className="enter-pin-form">
        <p>Nhập tên</p>
        <Input
          placeholder="Nhập tên của bạn"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") joinLobby({ pin: game.pin, name });
          }}
        />
        <Button
          type="primary"
          className="submit-game"
          onClick={() => joinLobby({ pin: game.pin, name })}
        >
          Bắt đầu
        </Button>
        <p>{error}</p>
      </div>
    </div>
  );
};

export default EnterPin;
