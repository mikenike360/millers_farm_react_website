"use client";

import React from "react";
import Link from "next/link";
import { IconType } from "react-icons";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost" | "gradient";
  size?: "sm" | "md" | "lg" | "xl";
  href?: string;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  icon?: IconType;
  iconPosition?: "left" | "right";
  className?: string;
  fullWidth?: boolean;
  rounded?: "sm" | "md" | "lg" | "xl" | "full";
}

export default function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  onClick,
  disabled = false,
  loading = false,
  icon: Icon,
  iconPosition = "left",
  className = "",
  fullWidth = false,
  rounded = "lg"
}: ButtonProps) {
  const baseClasses = "inline-flex items-center justify-center font-semibold transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const sizeClasses = {
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
    xl: "px-8 py-4 text-lg"
  };

  const roundedClasses = {
    sm: "rounded",
    md: "rounded-md",
    lg: "rounded-lg",
    xl: "rounded-xl",
    full: "rounded-full"
  };

  const variantClasses = {
    primary: "bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500 shadow-soft hover:shadow-glow hover:scale-105",
    secondary: "bg-secondary-600 text-white hover:bg-secondary-700 focus:ring-secondary-500 shadow-soft hover:shadow-glow hover:scale-105",
    outline: "border-2 border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white focus:ring-primary-500",
    ghost: "text-primary-600 hover:bg-primary-50 focus:ring-primary-500",
    gradient: "bg-gradient-to-r from-primary-600 to-secondary-600 text-white hover:from-primary-700 hover:to-secondary-700 focus:ring-primary-500 shadow-soft hover:shadow-glow hover:scale-105"
  };

  const widthClass = fullWidth ? "w-full" : "";
  
  const buttonClasses = `${baseClasses} ${sizeClasses[size]} ${roundedClasses[rounded]} ${variantClasses[variant]} ${widthClass} ${className}`;

  const content = (
    <>
      {loading && (
        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
      )}
      {Icon && iconPosition === "left" && !loading && (
        <Icon className="mr-2" />
      )}
      {children}
      {Icon && iconPosition === "right" && !loading && (
        <Icon className="ml-2" />
      )}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={buttonClasses}>
        {content}
      </Link>
    );
  }

  return (
    <button
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {content}
    </button>
  );
}

// Special button variants
export function IconButton({
  children,
  variant = "ghost",
  size = "md",
  onClick,
  disabled = false,
  className = "",
  ...props
}: Omit<ButtonProps, "icon" | "iconPosition" | "href" | "loading" | "fullWidth" | "rounded">) {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12",
    xl: "w-16 h-16"
  };

  return (
    <Button
      variant={variant}
      size={size}
      onClick={onClick}
      disabled={disabled}
      className={`${sizeClasses[size]} p-0 rounded-full ${className}`}
      {...props}
    >
      {children}
    </Button>
  );
}

export function FloatingButton({
  children,
  onClick,
  className = "",
  ...props
}: Omit<ButtonProps, "variant" | "size" | "href" | "loading" | "fullWidth" | "rounded">) {
  return (
    <Button
      variant="gradient"
      size="lg"
      onClick={onClick}
      className={`fixed bottom-6 right-6 z-50 shadow-2xl hover:shadow-3xl ${className}`}
      rounded="full"
      {...props}
    >
      {children}
    </Button>
  );
}
