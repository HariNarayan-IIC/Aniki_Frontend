import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RoadmapCanvas from "../components/roadmapCanvas.jsx";
import { Fetch } from "../utils/fetch.js";

export default function RoadmapPage() {
  const { id } = useParams();
  const [roadmap, setRoadmap] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRoadmap = async () => {
      try {
        const res = await Fetch(`/api/v1/roadmap/${id}`);
        const data = await res.json();
        setRoadmap(data);
      } catch (err) {
        console.error("Failed to fetch roadmap", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRoadmap();
  }, [id]);

  if (loading) return <div className="p-4">Loading...</div>;
  if (!roadmap) return <div className="p-4 text-red-500">Roadmap not found</div>;

  return (
    <section className="h-[calc(100vh-154px)] md:h-[calc(100vh-74px)] flex justify-center w-full">
      <RoadmapCanvas nodes={roadmap.nodes} edges={roadmap.edges} />
    </section>
  );
}
