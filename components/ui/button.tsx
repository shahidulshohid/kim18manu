import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | "primary";
  size?: "default" | "sm" | "lg" | "icon" | "xs";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 select-none active:scale-[0.98]";

    const variantStyles = {
      default:
        "bg-blue-600 text-white shadow-sm hover:bg-blue-700 active:bg-blue-800",
      primary:
        "bg-[#2563eb] text-white shadow-sm hover:bg-[#1d4ed8] active:bg-[#1e40af]",
      destructive:
        "bg-red-500 text-white shadow-sm hover:bg-red-600 active:bg-red-700",
      outline:
        "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:text-slate-900 shadow-sm",
      secondary:
        "bg-slate-100 text-slate-800 hover:bg-slate-200/80 active:bg-slate-200",
      ghost:
        "text-slate-600 hover:bg-slate-100 hover:text-slate-900 active:bg-slate-200/70",
      link: "text-blue-600 underline-offset-4 hover:underline p-0 h-auto font-medium",
    };

    const sizeStyles = {
      default: "h-10 px-4 py-2",
      xs: "h-7 px-2.5 text-xs rounded-md",
      sm: "h-8.5 px-3 text-xs rounded-md",
      lg: "h-11 px-6 text-base rounded-xl",
      icon: "h-9 w-9 p-0 rounded-lg",
    };

    return (
      <button
        ref={ref}
        className={cn(
          baseStyles,
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };
