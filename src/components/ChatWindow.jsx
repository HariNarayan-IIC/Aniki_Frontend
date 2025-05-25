import { useEffect, useState } from "react";
import { useSocket } from "../context/SocketContext";

const ChatWindow = ({ roomId }) => {
  const socket = useSocket();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!socket) return;

    socket.emit("joinRoom", { roomId });

    socket.on("chatMessage", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      socket.off("chatMessage");
    };
  }, [socket, roomId]);

  const sendMessage = () => {
    if (socket && message.trim()) {
      socket.emit("chatMessage", { roomId, message });
      setMessage("");
    }
  };

  return (
    <div className="p-4 border rounded shadow w-full max-w-md mx-auto bg-white">
      <div className="h-64 overflow-y-auto mb-4">
        {messages.map((msg, index) => (
          <div key={index} className="mb-2">
            <span className="font-semibold">{msg.userId}: </span>
            {msg.message}
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          className="flex-1 border rounded p-2"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button onClick={sendMessage} className="bg-blue-500 text-white px-4 py-2 rounded">
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;
