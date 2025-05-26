import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Fetch } from "../utils/fetch";

export default function RoadmapsCataloguePage() {
  const [roadmaps, setRoadmaps] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRoadmaps = async () => {
      try {
        const res = await Fetch("/api/v1/roadmap");
        const data = await res.json();
        setRoadmaps(data);
      } catch (err) {
        console.error("Failed to fetch roadmaps:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRoadmaps();
  }, []);

  if (loading) {
    return <div className="p-4">Loading roadmaps...</div>;
  }

  if (roadmaps.length === 0) {
    return <div className="p-4">No roadmaps available.</div>;
  }

  return (
    <section className="h-[calc(100vh-154px)] md:h-[calc(100vh-74px)] px-4 py-6 w-full max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Available Roadmaps</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {roadmaps.map((roadmap) => (
          <Link
            to={`/roadmap/${roadmap._id}`}
            key={roadmap._id}
            className="block border border-gray-200 rounded-lg p-4 shadow hover:shadow-md transition"
          >
            <h3 className="text-xl font-semibold mb-2">{roadmap.name}</h3>
            <p className="text-gray-600 text-sm line-clamp-3">{roadmap.description}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
