import React from "react";

export function Avatar({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`rounded-full bg-gray-600 flex items-center justify-center ${className}`}>{children}</div>;
}

export function AvatarFallback({ children }: { children: React.ReactNode }) {
  return <span className="text-white text-sm">{children}</span>;
}
