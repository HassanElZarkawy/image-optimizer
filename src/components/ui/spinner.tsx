"use client";

import { cn } from "@/lib/utils";

interface SpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  color?: "primary" | "secondary" | "white";
}

export const Spinner = ({ size = "md", className, color = "primary" }: SpinnerProps) => {
  const sizeClasses = {
    sm: "w-4 h-4 border-2",
    md: "w-8 h-8 border-3",
    lg: "w-12 h-12 border-4",
  };

  const colorClasses = {
    primary: "border-primary-300 border-t-primary-600",
    secondary: "border-secondary-300 border-t-secondary-600",
    white: "border-gray-200 border-t-white",
  };

  return (
    <div
      className={cn(
        "inline-block rounded-full border-solid animate-spin",
        sizeClasses[size],
        colorClasses[color],
        className
      )}
      role="status"
      aria-label="Loading"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
};
