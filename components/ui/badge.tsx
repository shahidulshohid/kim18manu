import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?:
    | "default"
    | "secondary"
    | "destructive"
    | "outline"
    | "success"
    | "blue"
    | "amber"
    | "counter";
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  const variantStyles = {
    default:
      "bg-blue-600 text-white border-transparent shadow-sm",
    secondary:
      "bg-slate-100 text-slate-800 border-transparent hover:bg-slate-200/80",
    destructive:
      "bg-red-50 text-red-700 border-red-200",
    outline:
      "text-slate-700 border-slate-200 bg-white",
    success:
      "bg-emerald-50 text-emerald-700 border-emerald-200",
    blue:
      "bg-blue-50 text-blue-700 border-blue-200/60 font-medium",
    amber:
      "bg-amber-900/80 text-amber-200 backdrop-blur-sm border-amber-700/50",
    counter:
      "bg-blue-600 text-white font-semibold text-[11px] min-w-5 h-5 px-1.5 rounded-full inline-flex items-center justify-center",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center justify-center rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 select-none",
        variantStyles[variant],
        className
      )}
      {...props}
    />
  );
}

export { Badge };
