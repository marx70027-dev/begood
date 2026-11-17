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
          "relative inline-flex items-center justify-center font-semibold rounded-full transition-all duration-200 cursor-pointer",
          variant === "default"
            ? "bg-slate-900 text-white hover:bg-slate-800 active:scale-[0.97] shadow-sm"
            : "bg-transparent text-slate-700 border border-slate-300 hover:border-slate-400 hover:text-slate-900 active:scale-[0.97]",
          size === "sm" && "text-[13px] px-5 py-2",
          size === "default" && "text-[13px] px-6 py-2.5",
          size === "lg" && "text-sm px-8 py-3",
          "disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-slate-900",
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
