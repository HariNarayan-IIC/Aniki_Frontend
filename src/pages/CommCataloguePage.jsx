import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Fetch } from "../utils/fetch";
import Loader from "../components/loader.jsx";

// Dummy auth hook for demo. Replace with your real auth logic.
const useAuth = () => ({
  isLoggedIn: false, // Set to true to test logged-in view
  user: { _id: "user1" },
});

const badgeColors = {
  popular: "bg-yellow-700 text-yellow-300",
  active: "bg-green-900 text-green-400",
  new: "bg-blue-900 text-blue-300",
};

export default function ChatRoomsCataloguePage() {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [chatRooms, setChatRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchChatRooms = async () => {
      try {
        const res = await Fetch("/api/v1/chat-rooms");
        const body = await res.json();
        setChatRooms(body.data);
      } catch (err) {
        console.error("Failed to fetch chatrooms:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchChatRooms();
  }, []);

  const filteredChatRooms = chatRooms.filter((room) =>
    room.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleJoin = (id) => {
    if (!isLoggedIn) {
      navigate("/login");
    } else {
      navigate(`/chatRoom/${id}`);
    }
  };

  if (loading) {
    return (
      <div className="h-[calc(100vh-154px)] md:h-[calc(100vh-74px)] p-4 flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  if (chatRooms.length === 0) {
    return (
      <div className="h-[calc(100vh-154px)] md:h-[calc(100vh-74px)] p-4 flex justify-center items-center">
        <p className="text-gray-400">No chatrooms available.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#171E27] px-2 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col items-center">
          <h1 className="text-3xl md:text-4xl font-extrabold mb-1 text-[#32D46C]">
            Aniki <span className="text-white">Chatrooms</span>
          </h1>
          <p className="text-gray-400 mb-8 max-w-2xl text-center">
            Discover specialized communities for different technology domains. Join chatrooms focused on web development, machine learning, computer science fundamentals, and more.
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8 flex items-center justify-center">
          <input
            type="text"
            className="w-full md:w-96 px-4 py-2 rounded-lg bg-[#232e3f] text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#32D46C] transition"
            placeholder="Search Chatroom"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        {/* Chatroom Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredChatRooms.map((room) => (
            <div
              key={room._id}
              className="relative bg-[#212A36] border border-[#232e47] rounded-xl p-6 shadow transition group hover:border-[#32D46C] hover:border-2"
            >
              {/* Header Row: Icon, Name, Badges */}
              <div className="flex items-center mb-2 gap-2">
                {/* Icon */}
                <span className="w-7 h-7 flex items-center justify-center rounded-full bg-[#232e3f] text-[#32D46C] text-lg mr-2">
                  {room.icon || (
                    <svg width="22" height="22" fill="none" viewBox="0 0 20 20">
                      <circle cx="10" cy="10" r="9" stroke="#32D46C" strokeWidth="1.5" fill="none"/>
                      <path d="M10 6v8M6 10h8" stroke="#32D46C" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  )}
                </span>
                <span className="text-lg font-semibold text-white">{room.name}</span>
                {/* Badges */}
                {room.isActive && (
                  <span className={`ml-2 px-2 py-0.5 rounded-full text-xs font-bold ${badgeColors.active}`}>
                    Active
                  </span>
                )}
                {room.isPopular && (
                  <span className={`ml-2 px-2 py-0.5 rounded-full text-xs font-bold ${badgeColors.popular}`}>
                    Popular
                  </span>
                )}
                {room.isNew && (
                  <span className={`ml-2 px-2 py-0.5 rounded-full text-xs font-bold ${badgeColors.new}`}>
                    New
                  </span>
                )}
              </div>
              {/* Description */}
              <div className="text-gray-400 text-sm mb-4">{room.description}</div>
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {room.tags && room.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 rounded bg-[#232e3f] text-xs text-gray-300 font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              {/* Members and Join Button */}
              <div className="flex items-center justify-between mt-2">
                <span className="text-xs text-gray-500">
                  <span className="inline-block align-middle mr-1">
                    <svg width="14" height="14" fill="none" viewBox="0 0 20 20">
                      <path d="M10 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 2c-2.33 0-7 1.17-7 3.5V18h14v-2.5C17 13.17 12.33 12 10 12z" fill="#6B7280"/>
                    </svg>
                  </span>
                  {room.members || 0} members
                </span>
                <button
                  className={`flex items-center gap-2 px-4 py-1.5 rounded-lg font-semibold text-sm transition
                    ${room.isActive ? "bg-[#32D46C] text-[#101828] hover:bg-[#28b15c]" : "bg-[#232e47] text-gray-300 hover:bg-[#2b3956]"}
                  `}
                  onClick={() => handleJoin(room._id)}
                >
                  {room.isActive ? (
                    <>
                      <svg width="18" height="18" fill="none" viewBox="0 0 20 20">
                        <path d="M4 10h12M10 4v12" stroke="#101828" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                      Join Chat
                    </>
                  ) : (
                    <>
                      <svg width="18" height="18" fill="none" viewBox="0 0 20 20">
                        <path d="M4 10h12" stroke="#32D46C" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                      Join
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        ::selection { background: #32D46C33; }
        input::placeholder { color: #6B7280; }
      `}</style>
    </div>
  );
}
