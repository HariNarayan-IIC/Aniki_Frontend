import * as React from "react";

export function Button({ children, className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={`px-4 py-2 rounded-lg font-medium transition-all bg-gray-900 text-white hover:bg-gray-700 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
