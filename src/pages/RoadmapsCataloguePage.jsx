import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { authFetch } from "../utils/authFetch";
import { Fetch } from "../utils/fetch";
import { MdDelete, MdEdit } from "react-icons/md";


export default function RoadmapsCataloguePage() {
  const { isAuthenticated, isAdmin } = useAuth(false);
  const [roadmaps, setRoadmaps] = useState([]);
  const [loading, setLoading] = useState([false]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRoadmaps = async () => {
      try {
        let res;
        if (isAuthenticated) {
          res = await authFetch("/api/v1/roadmap");
        } else {
          res = await Fetch("/api/v1/roadmap");
        }

        const data = await res.json();
        setRoadmaps(data);

      } catch (err) {
        console.error("Failed to fetch roadmaps:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRoadmaps();
  }, [isAuthenticated]);


  // Handle follow button

  const handleFollow = async (roadmapId) => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    try {
      const res = await authFetch(`/api/v1/followed-roadmaps/${roadmapId}`, {
        method: "POST",
      });

      // Update the followed status in roadmap list
      if (res.ok) {
        setRoadmaps((prev) =>
          prev.map((r) =>
            r._id === roadmapId ? { ...r, isFollowed: true } : r
          )
        );
      }

    } catch (err) {
      console.error("Failed to follow roadmap:", err);
    }
  };


  // Handle delete button
  const handleDelete = async (roadmapId) => {
    //Api call to Delete
    try {
      const res = await authFetch(`/api/v1/roadmap/${roadmapId}`, {
        method: "DELETE"
      })
      if (res.ok) {
        alert("Roadmap deleted successfully!!");
        setRoadmaps(prev => prev.filter(r => r._id !== roadmapId)); // remove from list
      } else {
        const errorData = await res.json(); // assuming server sends a JSON error message
        alert(`Failed to delete: ${errorData.message || "Unknown error"}`);
      }
    } catch (err) {
      console.error("Failed to delete roadmaps:", err);
      alert(`Failed to delete: ${err}`);
    }
  };

  // Card component
  function RoadmapCard({ roadmap }) {
    const followed = roadmap.isFollowed;

    return (
      <div className="relative group bg-[#151e2e] border border-[#232e47] rounded-lg px-4 py-4 flex flex-col justify-between min-h-[56px] transition hover:outline-none hover:border-[#32D46C] hover:border-2">
        <div className="flex items-center justify-between">
          <span className="text-base font-medium text-white">{roadmap.name}</span>
          {isAdmin && (
            <span className="flex items-center gap-2 text-2xl font-semibold text-[#32D46C]">
              <button
                onClick={() => handleDelete(roadmap._id)}
                className="p-1 z-10 rounded hover:text-red-400 transition-colors"
              >
                <MdDelete className="cursor-pointer" />
              </button>
              <button
                onClick={() => { navigate(`/roadmapEditor/${roadmap._id}`) }}
                className="p-1 z-10 rounded hover:text-blue-400 transition-colors"
              >
                <MdEdit className="cursor-pointer" />
              </button>
            </span>
          )}

        </div>
        {/* Followers and Follow button in the same row */}
        <div className="flex items-center justify-between mt-3 mb-1">
          <span className="text-xs text-gray-400">
            Followers: <span className="text-[#32D46C] font-semibold">{roadmap.followerCount || 0}</span>
          </span>
          {!followed ? (
            <button
              className="ml-2 z-10 px-3 py-1 rounded bg-[#32D46C] text-[#101828] text-xs font-bold hover:bg-[#28b15c] transition"
              style={{ minWidth: "60px" }}
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                handleFollow(roadmap._id);
              }}
            >
              Follow
            </button>
          ) : (
            isAuthenticated && (
              <button
                className="ml-2 px-3 py-1 rounded bg-[#232e47] text-[#32D46C] text-xs font-bold cursor-default"
                style={{ minWidth: "60px" }}
                disabled
              >
                Following
              </button>
            )
          )}
        </div>
        {/* Progress only if logged in and following */}
        {isAuthenticated && followed && (
          <div className="mb-1">
            <div className="w-full h-2 bg-[#232e47] rounded-full overflow-hidden mb-1">
              <div
                className="h-full bg-gradient-to-r from-[#32D46C] to-[#0F9D58] transition-all"
                style={{ width: `${roadmap.progress * 100}%` }}
              ></div>
            </div>
            <div className="text-xs text-gray-400 text-right">
              {roadmap.progress * 100}% completed
            </div>
          </div>
        )}
        {/* Card link */}
        <Link
          to={`/roadmap/${roadmap._id}`}
          className="absolute inset-0  z-0 pointer-events-auto"
          aria-label={`View roadmap: ${roadmap.name}`}
          tabIndex={-1}
        />
      </div>
    );
  }

  // "Create your own roadmap" card
  function CreateRoadmapCard() {
    return (

      <Link
        to="/roadmap/create"
        className="flex items-center justify-center bg-[#151e2e] border border-[#232e47] rounded-lg px-4 py-4 min-h-[56px] text-[#32D46C] font-medium hover:bg-[#19263a] transition"
      >
        <svg width="18" height="18" fill="none" viewBox="0 0 20 20" className="mr-2">
          <circle cx="10" cy="10" r="9" stroke="#32D46C" strokeWidth="1.5" fill="none" />
          <path d="M10 6v8M6 10h8" stroke="#32D46C" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        Create your own Roadmap
      </Link>
    );
  }

  return (
    <div className="min-h-screen bg-[#101828] pb-16 pt-10 px-2">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#32D46C] text-center mb-2" style={{ letterSpacing: "1px" }}>
          Aniki <span className="text-white">Roadmaps</span>
        </h1>
        <p className="text-gray-300 text-center mb-10 max-w-2xl mx-auto">
          Aniki Your older brother is here to help guide developers in picking up a path and guide their learnings.
        </p>

        {/* All Roadmaps in one grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {roadmaps.map(roadmap => (
            <RoadmapCard
              key={roadmap._id}
              roadmap={roadmap}
            />
          ))}
          <CreateRoadmapCard />
        </div>
      </div>
      <style>{`
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}
