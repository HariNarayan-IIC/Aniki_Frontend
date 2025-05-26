import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// Dummy auth/context for demo; replace with your real auth logic
const useAuth = () => {
  return {
    isLoggedIn: false, // Set to true to test logged-in view
    user: {
      _id: "user1",
      followedRoadmaps: [
        // Example: { roadmapId: "1", progress: 60 }
      ],
    },
  };
};

// Dummy data for demonstration
const roleBasedRoadmaps = [
  { _id: "1", name: "Frontend", description: "Frontend roadmap", isNew: false },
  { _id: "2", name: "Backend", description: "Backend roadmap", isNew: false },
  { _id: "3", name: "DevOps", description: "DevOps roadmap", isNew: false },
  { _id: "4", name: "Full Stack", description: "Full Stack roadmap", isNew: false },
  { _id: "5", name: "AI Engineer", description: "AI Engineer roadmap", isNew: true },
  { _id: "6", name: "Data Analyst", description: "Data Analyst roadmap", isNew: false },
];
const skillBasedRoadmaps = [
  { _id: "101", name: "SQL", description: "SQL roadmap" },
  { _id: "102", name: "Computer Science", description: "CS roadmap" },
];

// Combine all roadmaps into one array
const allRoadmaps = [...roleBasedRoadmaps, ...skillBasedRoadmaps];

const followersCountMap = {};
allRoadmaps.forEach((r, i) => (followersCountMap[r._id] = 100 + i * 3));

export default function RoadmapsCataloguePage() {
  const { isLoggedIn, user } = useAuth();
  const navigate = useNavigate();
  const [following, setFollowing] = useState(user.followedRoadmaps || []);
  const [followers, setFollowers] = useState(followersCountMap);

  // Check if user follows this roadmap
  const isFollowing = (roadmapId) => following.some((f) => f.roadmapId === roadmapId);

  // Get progress for a roadmap
  const getProgress = (roadmapId) => {
    const f = following.find((f) => f.roadmapId === roadmapId);
    return f ? f.progress : 0;
  };

  // Handle follow button
  const handleFollow = (roadmapId) => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }
    setFollowing([...following, { roadmapId, progress: 0 }]);
    setFollowers((prev) => ({
      ...prev,
      [roadmapId]: (prev[roadmapId] || 0) + 1,
    }));
    navigate(`/roadmap/${roadmapId}`);
  };

  // Card component
  function RoadmapCard({ roadmap }) {
    const followed = isFollowing(roadmap._id);

    return (
      <div className="relative group bg-[#151e2e] border border-[#232e47] rounded-lg px-4 py-4 flex flex-col justify-between min-h-[56px] transition hover:outline-none hover:border-[#32D46C] hover:border-2">
        <div className="flex items-center gap-2">
          <span className="text-base font-medium text-white">{roadmap.name}</span>
          {roadmap.isNew && (
            <span className="flex items-center gap-1 text-xs font-semibold text-[#32D46C]">
              <span className="w-2 h-2 bg-[#32D46C] rounded-full inline-block"></span>
              New
            </span>
          )}
        </div>
        {/* Followers and Follow button in the same row */}
        <div className="flex items-center justify-between mt-3 mb-1">
          <span className="text-xs text-gray-400">
            Followers: <span className="text-[#32D46C] font-semibold">{followers[roadmap._id] || 0}</span>
          </span>
          {!followed ? (
            <button
              className="ml-2 px-3 py-1 rounded bg-[#32D46C] text-[#101828] text-xs font-bold hover:bg-[#28b15c] transition"
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
            isLoggedIn && (
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
        {isLoggedIn && followed && (
          <div className="mb-1">
            <div className="w-full h-2 bg-[#232e47] rounded-full overflow-hidden mb-1">
              <div
                className="h-full bg-gradient-to-r from-[#32D46C] to-[#0F9D58] transition-all"
                style={{ width: `${getProgress(roadmap._id)}%` }}
              ></div>
            </div>
            <div className="text-xs text-gray-400 text-right">
              {getProgress(roadmap._id)}% completed
            </div>
          </div>
        )}
        {/* Card link */}
        <Link
          to={`/roadmap/${roadmap._id}`}
          className="absolute inset-0"
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
          <circle cx="10" cy="10" r="9" stroke="#32D46C" strokeWidth="1.5" fill="none"/>
          <path d="M10 6v8M6 10h8" stroke="#32D46C" strokeWidth="1.5" strokeLinecap="round"/>
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
          {allRoadmaps.map((roadmap) => (
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
