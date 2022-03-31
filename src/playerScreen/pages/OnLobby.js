import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const OnLobby = ({ socket }) => {
  let params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!params.pin || !params.name) {
      navigate("/play/enter-pin");
    }

    socket.emit("player-join-lobby", { name: params.name, pin: params.pin });

    socket.on("no-game-found", function () {
      alert("Phòng không tồn tại!");
      navigate("/play/enter-pin");
    });

    socket.on("get-kicked", function () {
      alert("Bạn đã bị kick ra khỏi phòng!");
      navigate("/play/enter-pin");
    });

    socket.on("host-disconnrected", function () {
      alert("Host đã ngắt kết nối!");
      navigate("/play/enter-pin");
    });

    socket.on("game-started", function () {
      navigate(`/play/play-game/${socket.id}`);
    });

    return () => {
      socket.emit("disconnect", socket.id);
    };
  }, []);

  return (
    <div className="join-room__screen">Thấy tên bạn trên màn hình ko?</div>
  );
};

export default OnLobby;
