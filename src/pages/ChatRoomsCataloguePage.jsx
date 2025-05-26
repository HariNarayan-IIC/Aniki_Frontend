import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Fetch } from "../utils/fetch";
import Loader from "../components/loader.jsx"

export default function ChatRoomsCataloguePage() {
  const [chatRooms, setChatRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChatRooms = async () => {
      try {
        const res = await Fetch("/api/v1/chat-rooms");
        const body = await res.json();
        setChatRooms(body.data);
      } catch (err) {
        console.error("Failed to fetch roadmaps:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchChatRooms();
  }, []);

  if (loading) {
    return (<div className="h-[calc(100vh-154px)] md:h-[calc(100vh-74px)] p-4 flex justify-center items-center">
        <Loader/>
    </div>);
  }

  if (chatRooms.length === 0) {
    return <div className="h-[calc(100vh-154px)] md:h-[calc(100vh-74px)] p-4 flex justify-center items-center"><p>No chatrooms available.</p></div>;
  }

  return (
    <section className="h-[calc(100vh-154px)] md:h-[calc(100vh-74px)] px-4 py-6 w-full max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Available Chat Rooms</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {chatRooms.map((chatRoom) => (
          <Link
            to={`/chatRoom/${chatRoom._id}`}
            key={chatRoom._id}
            className="block border border-gray-200 rounded-lg p-4 shadow hover:shadow-md transition"
          >
            <h3 className="text-xl font-semibold mb-2">{chatRoom.name}</h3>
            <p className="text-gray-600 text-sm line-clamp-3"></p>
          </Link>
        ))}
      </div>
    </section>
  );
}
