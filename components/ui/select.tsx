"use client";

import * as React from "react";
import { ChevronDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface SelectContextValue {
  value: string;
  onValueChange: (value: string) => void;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  labelsMap: React.MutableRefObject<Map<string, React.ReactNode>>;
  selectedLabel: React.ReactNode;
  setSelectedLabel: (label: React.ReactNode) => void;
}

const SelectContext = React.createContext<SelectContextValue | undefined>(undefined);

export interface SelectProps {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  children: React.ReactNode;
}

export function Select({
  value: controlledValue,
  defaultValue = "",
  onValueChange,
  children,
}: SelectProps) {
  const [uncontrolledValue, setUncontrolledValue] = React.useState(defaultValue);
  const [open, setOpen] = React.useState(false);
  const [selectedLabel, setSelectedLabel] = React.useState<React.ReactNode>(null);
  const labelsMap = React.useRef<Map<string, React.ReactNode>>(new Map());

  const isControlled = controlledValue !== undefined;
  const currentValue = isControlled ? controlledValue : uncontrolledValue;

  const handleValueChange = React.useCallback(
    (newValue: string) => {
      if (!isControlled) {
        setUncontrolledValue(newValue);
      }
      onValueChange?.(newValue);
      setOpen(false);
    },
    [isControlled, onValueChange]
  );

  return (
    <SelectContext.Provider
      value={{
        value: currentValue,
        onValueChange: handleValueChange,
        open,
        setOpen,
        labelsMap,
        selectedLabel,
        setSelectedLabel,
      }}
    >
      <div className="relative w-full inline-block text-left">{children}</div>
    </SelectContext.Provider>
  );
}

export interface SelectTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children?: React.ReactNode;
}

export const SelectTrigger = React.forwardRef<HTMLButtonElement, SelectTriggerProps>(
  ({ className, children, ...props }, ref) => {
    const context = React.useContext(SelectContext);
    if (!context) {
      throw new Error("SelectTrigger must be used within a Select component");
    }

    const { open, setOpen } = context;

    return (
      <button
        ref={ref}
        type="button"
        role="combobox"
        aria-expanded={open}
        onClick={() => setOpen((prev) => !prev)}
        className={cn(
          "flex h-11 w-full items-center justify-between rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs sm:text-sm text-slate-800 ring-offset-white placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer transition-all shadow-2xs hover:border-slate-300",
          open && "border-blue-600 ring-1 ring-blue-600",
          className
        )}
        {...props}
      >
        <span className="truncate flex-1 text-left">{children}</span>
        <ChevronDown
          className={cn(
            "h-4 w-4 shrink-0 text-slate-400 transition-transform duration-200 ml-2 pointer-events-none",
            open && "transform rotate-180 text-blue-600"
          )}
        />
      </button>
    );
  }
);
SelectTrigger.displayName = "SelectTrigger";

export interface SelectValueProps {
  placeholder?: string;
  className?: string;
}

export function SelectValue({ placeholder = "Select an option", className }: SelectValueProps) {
  const context = React.useContext(SelectContext);
  if (!context) {
    throw new Error("SelectValue must be used within a Select component");
  }

  const { value, labelsMap } = context;
  const label = labelsMap.current.get(value);

  if (!value && !label) {
    return <span className={cn("text-slate-400", className)}>{placeholder}</span>;
  }

  return <span className={cn("font-medium text-slate-900", className)}>{label || value}</span>;
}

export interface SelectContentProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  position?: "popper" | "item-aligned";
}

export const SelectContent = React.forwardRef<HTMLDivElement, SelectContentProps>(
  ({ className, children, ...props }, ref) => {
    const context = React.useContext(SelectContext);
    if (!context) {
      throw new Error("SelectContent must be used within a Select component");
    }

    const { open, setOpen } = context;
    const contentRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
      function handleClickOutside(event: MouseEvent) {
        if (
          contentRef.current &&
          !contentRef.current.contains(event.target as Node) &&
          !(event.target as HTMLElement).closest('button[role="combobox"]')
        ) {
          setOpen(false);
        }
      }

      if (open) {
        document.addEventListener("mousedown", handleClickOutside);
      }
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [open, setOpen]);

    if (!open) {
      return (
        <div className="hidden" aria-hidden="true">
          {children}
        </div>
      );
    }

    return (
      <div
        ref={contentRef}
        className={cn(
          "absolute left-0 top-full mt-1.5 z-50 min-w-[8rem] w-full rounded-2xl border border-slate-200/90 bg-white p-1.5 text-slate-950 shadow-xl animate-in fade-in-0 zoom-in-95 duration-150 max-h-60 overflow-y-auto custom-scrollbar ring-1 ring-black/5",
          className
        )}
        {...props}
      >
        <div className="space-y-0.5">{children}</div>
      </div>
    );
  }
);
SelectContent.displayName = "SelectContent";

export interface SelectItemProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
  className?: string;
  children: React.ReactNode;
}

export const SelectItem = React.forwardRef<HTMLDivElement, SelectItemProps>(
  ({ className, value, children, ...props }, ref) => {
    const context = React.useContext(SelectContext);
    if (!context) {
      throw new Error("SelectItem must be used within a Select component");
    }

    const { value: selectedValue, onValueChange, labelsMap } = context;
    const isSelected = selectedValue === value;

    React.useEffect(() => {
      labelsMap.current.set(value, children);
    }, [value, children, labelsMap]);

    return (
      <div
        ref={ref}
        role="option"
        aria-selected={isSelected}
        onClick={() => onValueChange(value)}
        className={cn(
          "relative flex w-full cursor-pointer select-none items-center justify-between rounded-xl py-2 px-3 text-xs sm:text-sm outline-none transition-colors hover:bg-blue-50 hover:text-blue-600 font-medium",
          isSelected
            ? "bg-blue-50/80 text-blue-600 font-semibold"
            : "text-slate-700",
          className
        )}
        {...props}
      >
        <span className="truncate">{children}</span>
        {isSelected && (
          <Check className="h-4 w-4 text-blue-600 shrink-0 ml-2 stroke-[2.5]" />
        )}
      </div>
    );
  }
);
SelectItem.displayName = "SelectItem";

export function SelectLabel({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400", className)}
      {...props}
    />
  );
}

export function SelectSeparator({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("-mx-1 my-1 h-px bg-slate-100", className)}
      {...props}
    />
  );
}
