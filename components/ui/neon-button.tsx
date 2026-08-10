import React from "react";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const buttonVariants = cva(
  "relative text-center font-medium transition-all duration-200 cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "bg-white text-black hover:bg-white/90 rounded-lg",
        outline:
          "border border-white/20 text-white hover:bg-white/5 rounded-lg",
        ghost:
          "text-white/50 hover:text-white rounded-lg",
      },
      size: {
        default: "px-5 py-2.5 text-sm",
        sm: "px-4 py-2 text-sm",
        lg: "px-7 py-3 text-[15px]",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, size, variant, children, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size }), className)}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";
export { Button, buttonVariants };
