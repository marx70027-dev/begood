"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface GradientButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline";
  size?: "default" | "sm" | "lg";
}

const GradientButton = React.forwardRef<HTMLButtonElement, GradientButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "relative inline-flex items-center justify-center font-semibold rounded-full transition-all duration-300 cursor-pointer",
          variant === "default"
            ? "bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 text-white shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 hover:scale-[1.02] active:scale-[0.98]"
            : "bg-white text-gray-900 border-2 border-gray-200 hover:border-blue-400 hover:text-blue-600 hover:shadow-md active:scale-[0.98]",
          size === "sm" && "text-sm px-5 py-2.5",
          size === "default" && "text-sm px-7 py-3",
          size === "lg" && "text-[15px] px-9 py-3.5",
          "disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:shadow-none disabled:hover:scale-100",
          className
        )}
        {...props}
      >
        <span className="flex items-center gap-2">{props.children}</span>
      </button>
    );
  }
);
GradientButton.displayName = "GradientButton";

export { GradientButton };
