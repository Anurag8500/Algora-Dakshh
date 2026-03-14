"use client";

import { InputHTMLAttributes } from "react";

interface ProfileFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  optional?: boolean;
}

export function ProfileField({ label, error, optional, ...props }: ProfileFieldProps) {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-foreground">
          {label}
        </label>
        {optional && (
          <span className="text-xs text-muted-foreground">Optional</span>
        )}
      </div>
      <input
        {...props}
        className={`w-full bg-[#050505] border rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 transition-colors focus:outline-none focus:ring-1 focus:border-[#00FF88] focus:ring-[#00FF88] ${
          error ? "border-red-500/50" : "border-gray-800"
        } ${props.className || ""}`}
      />
      {error && (
        <span className="text-xs text-red-400 mt-1">{error}</span>
      )}
    </div>
  );
}
