import React from "react";
import AdminPanelCard from "../components/adminPanelCard.jsx";
import { useNavigate } from "react-router-dom";

export default function AdminPanel() {
    const navigate = useNavigate();

    return (
        <div className="relative w-full h-[calc(100vh-144px)] md:h-[calc(100vh-64px)] flex items-center justify-center text-white">
            <AdminPanelCard onCreate={() => navigate("/roadmapEditor")} />
        </div>
    );
}
