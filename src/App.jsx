import { useEffect, useState } from "react";
import io from "socket.io-client";

function App() {
  const [room, setRoom] = useState("");

  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState("");

  const socket = io.connect("http://localhost:3001");

  const joinRoom = () => {
    if (room) {
      socket.emit("join_room",room);
    }
  };

  const sendMessage = () => {
    socket.emit("send_message", { message, room });
  };

  useEffect(() => {
    socket.on("received_message", (data) => {
      console.log(data);
      setMessageReceived(data);
    });
  }, [socket]);
  return (
    <div>
      <input
        placeholder="Room Number..."
        onChange={(e) => setRoom(e.target.value)}
      />
      <button onClick={joinRoom}>Join Room</button>

      <input
        placeholder="message"
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send Message</button>

      <h1>Message:</h1>
      {messageReceived}
    </div>
  );
}

export default App;
