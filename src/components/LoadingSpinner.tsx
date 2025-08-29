"use client";

import React from "react";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  color?: "primary" | "secondary" | "white";
  text?: string;
}

export default function LoadingSpinner({ 
  size = "md", 
  color = "primary", 
  text 
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-12 h-12",
    lg: "w-16 h-16"
  };

  const colorClasses = {
    primary: "text-primary-600",
    secondary: "text-secondary-600",
    white: "text-white"
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className="relative">
        {/* Outer ring */}
        <div className={`${sizeClasses[size]} ${colorClasses[color]} animate-spin rounded-full border-4 border-gray-200 border-t-current`}></div>
        
        {/* Inner ring */}
        <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${sizeClasses[size]} ${colorClasses[color]} animate-spin rounded-full border-2 border-transparent border-t-current`} 
             style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
      </div>
      
      {text && (
        <p className={`text-sm font-medium ${color === 'white' ? 'text-white' : 'text-gray-600'} animate-pulse`}>
          {text}
        </p>
      )}
    </div>
  );
}

// Alternative loading component with dots
export function LoadingDots({ text = "Loading..." }: { text?: string }) {
  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className="flex space-x-2">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-3 h-3 bg-primary-600 rounded-full animate-bounce"
            style={{ animationDelay: `${i * 0.1}s` }}
          ></div>
        ))}
      </div>
      {text && (
        <p className="text-sm font-medium text-gray-600">{text}</p>
      )}
    </div>
  );
}

// Skeleton loading component
export function Skeleton({ className = "", lines = 1 }: { className?: string; lines?: number }) {
  return (
    <div className={`animate-pulse ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className="h-4 bg-gray-200 rounded mb-3 last:mb-0"
          style={{ width: `${Math.random() * 40 + 60}%` }}
        ></div>
      ))}
    </div>
  );
}
