import React from "react";

export function Textarea({ className = "", ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea className={`rounded px-3 py-2 bg-gray-700 text-white ${className}`} {...props} />;
}
