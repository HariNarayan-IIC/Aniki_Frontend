import React from "react";

export function Button2({
  className = "",
  children,
  variant = "default",
  size = "md",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "ghost";
  size?: "sm" | "md" | "icon";
}) {
  const variants = {
    default: "bg-blue-500 hover:bg-blue-600 text-white",
    ghost: "bg-transparent hover:bg-gray-600 text-white",
  };

  const sizes = {
    sm: "px-2 py-1 text-sm",
    md: "px-4 py-2 text-base",
    icon: "p-2",
  };

  return (
    <button className={`${variants[variant]} ${sizes[size]} rounded ${className}`} {...props}>
      {children}
    </button>
  );
}
