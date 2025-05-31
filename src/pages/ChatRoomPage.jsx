import React, { useState, useEffect, useRef} from "react";
import { Card, CardContent } from "../components/ui/card2";
import { Input } from "../components/ui/input";
import { Button2 } from "../components/ui/button2";
import { ScrollArea } from "../components/ui/scrollarea";
import { Textarea } from "../components/ui/textarea";
import { Avatar, AvatarFallback } from "../components/ui/avatar";
import { SendHorizonal, Reply, Smile } from "lucide-react";
import { useSocket } from "../context/SocketContext";
import { useParams } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { Fetch } from "../utils/fetch";



// Example data -- you will fetch these from backend later
const communityName = "Developers";
const chatrooms = ["Frontend", "Backend", "FullStack"];


export default function ChatRoomPage({ selectedChatroom: initialChatroom }) {
  // selectedChatroom comes from the catalogue page
  const { roomId } = useParams();
  const { username } = useAuth();
  const socket = useSocket();
  const [selectedChatroom, setSelectedChatroom] = useState(initialChatroom || chatrooms[0]);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const bottomRef = useRef(null);


  useEffect(() => {
  const fetchMessages = async () => {
    try {
      const res = await Fetch(`/api/v1/chat-rooms/${roomId}`);
      const data = await res.json();
      if (res.ok) {
        // Expecting messages to be inside data.data
        setMessages(data.data.map((msg) => ({
          username: msg.username,
          message: msg.message,
          time: new Date(msg.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        })));
      } else {
        console.error("Failed to fetch messages", data.message);
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  fetchMessages();
}, [roomId]);


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

  useEffect(() => {
  if (bottomRef.current) {
    bottomRef.current.scrollIntoView({ behavior: "smooth" });
  }
}, [messages]);

  


  // Placeholder for sending a message (to be replaced with backend logic)
  const handleSend = () => {
    if (!socket || !message.trim()) return;
    setMessage("");
    socket.emit("chatMessage", { roomId, message });
  };

  // Handle chatroom switching (simulate fetching messages)
  const handleChatroomSelect = (room) => {
    setSelectedChatroom(room);
    // TODO: Fetch messages for the selected chatroom from backend here
    setMessages(initialMessages); // Placeholder: reset to initial messages
  };

  return (
    <div className="flex h-[calc(100vh-54px)] bg-gray-900 text-white">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 p-4 flex flex-col justify-between">
        <div>
          <h2 className="text-xl font-bold text-green-400 mb-6">{communityName}</h2>
          <Input placeholder="Search" className="mb-4" />

          <div>
            <h3 className="text-sm uppercase text-gray-400 mb-2">Browse Chatrooms</h3>
            <div className="space-y-2">
              {chatrooms.map((room) => (
                <div
                  key={room}
                  onClick={() => handleChatroomSelect(room)}
                  className={`px-2 py-1 rounded cursor-pointer transition ${room === selectedChatroom
                      ? "bg-gray-700 text-white"
                      : "text-gray-400 hover:text-white"
                    }`}
                >
                  # {room}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-400">
          <Avatar className="h-6 w-6">
            <AvatarFallback>{username.charAt(0)}</AvatarFallback>
          </Avatar>
          {username}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col" ref={bottomRef}>
        <div className="bg-gray-800 px-6 py-3 border-b border-gray-700 text-sm text-gray-300">
          {selectedChatroom} Chatroom &mdash; Discuss any topic related to computer science
        </div>

        <ScrollArea className="flex-1 px-6 py-4 space-y-6">
          <div className="text-gray-400 text-sm mb-4">
            Welcome to the {selectedChatroom} Chat! Feel free to ask any questions about Webdev
          </div>

          {messages.map((msg, index) => {
            const isOwn = msg.username === username;
            return (
              <div
                key={index}
                className={`mb-8 flex ${isOwn ? "justify-end" : "justify-start"}`}
              >
                <Card
                  className={`w-fit max-w-md ${isOwn
                      ? "bg-green-500 text-white rounded-br-none"
                      : "bg-gray-700 text-white rounded-bl-none"
                    }`}
                  style={{
                    borderTopRightRadius: isOwn ? 0 : undefined,
                    borderTopLeftRadius: !isOwn ? 0 : undefined,
                  }}
                >
                  <CardContent className="p-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-sm">
                        {isOwn ? "You" : msg.username}
                      </span>
                      {/* <span className="text-xs text-gray-200">{msg.time}</span> */}
                    </div>
                    <div className="text-sm mb-2">{msg.message}</div>
                    <div className="flex gap-2 text-gray-200 text-sm items-center">
                      {/* <Button2 variant="ghost" size="sm" className="px-1 py-0 text-xs">
                        <Reply className="w-3 h-3 mr-1" /> Reply
                      </Button2>
                      <Button2 variant="ghost" size="sm" className="px-1 py-0 text-xs">
                        <Smile className="w-3 h-3 mr-1" /> Emoji
                      </Button2> */}
                    </div>
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </ScrollArea>

        <div className="p-4 border-t border-gray-700 flex items-center gap-2">
          <Textarea
            className="flex-1 resize-none text-white bg-gray-800 border border-gray-600"
            placeholder="Send a message..."
            rows={1}
            value={message}
            onChange={e => setMessage(e.target.value)}
            onKeyDown={e => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
          />
          <Button2
            size="icon"
            className="bg-green-500 hover:bg-green-600"
            onClick={handleSend}
            aria-label="Send"
          >
            <SendHorizonal className="h-4 w-4" />
          </Button2>
        </div>
      </div>
    </div>
  );
}
