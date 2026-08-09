"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface GradientButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "variant";
  size?: "default" | "sm" | "lg";
}

const GradientButton = React.forwardRef<HTMLButtonElement, GradientButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "gradient-btn relative inline-flex items-center justify-center font-semibold text-white rounded-xl transition-all duration-300 cursor-pointer overflow-hidden",
          "before:absolute before:inset-0 before:rounded-xl before:p-[1.5px] before:content-['']",
          "before:bg-[linear-gradient(135deg,#6366f1,#8b5cf6,#a855f7,#d946ef,#ec4899,#f43f5e,#f97316,#eab308,#22c55e,#06b6d4,#3b82f6,#6366f1)]",
          "before:bg-[length:400%_400%] before:animate-[gradient-spin_6s_linear_infinite]",
          "after:absolute after:inset-[1.5px] after:rounded-[10px] after:content-[''] after:transition-all after:duration-300",
          variant === "default"
            ? "after:bg-[#111] hover:after:bg-[#1a1a1a]"
            : "after:bg-gradient-to-r after:from-violet-600 after:to-pink-500 hover:after:from-violet-500 hover:after:to-pink-400",
          "hover:shadow-[0_0_30px_rgba(139,92,246,0.3)]",
          size === "sm" && "text-sm px-5 py-2.5 min-w-[100px]",
          size === "default" && "text-sm px-7 py-3 min-w-[120px]",
          size === "lg" && "text-[15px] px-9 py-3.5 min-w-[140px]",
          "disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:shadow-none",
          className
        )}
        {...props}
      >
        <span className="relative z-10 flex items-center gap-2">{props.children}</span>
      </button>
    );
  }
);
GradientButton.displayName = "GradientButton";

export { GradientButton };
