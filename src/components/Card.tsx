"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { IconType } from "react-icons";

interface CardProps {
  children: React.ReactNode;
  variant?: "default" | "elevated" | "outlined" | "glass" | "gradient";
  size?: "sm" | "md" | "lg";
  href?: string;
  onClick?: () => void;
  className?: string;
  hover?: boolean;
  overflow?: "hidden" | "visible";
  image?: {
    src: string;
    alt: string;
    width?: number;
    height?: number;
  };
  icon?: IconType;
  iconColor?: string;
  iconSize?: number;
}

export default function Card({
  children,
  variant = "default",
  size = "md",
  href,
  onClick,
  className = "",
  hover = true,
  overflow = "hidden",
  image,
  icon: Icon,
  iconColor = "text-primary-600",
  iconSize = 8
}: CardProps) {
  const baseClasses = `relative transition-all duration-300 ease-in-out ${overflow === "hidden" ? "overflow-hidden" : "overflow-visible"}`;
  
  const sizeClasses = {
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
    xl: "p-12"
  };

  const variantClasses = {
    default: "bg-white border border-gray-200",
    elevated: "bg-white shadow-soft hover:shadow-xl",
    outlined: "bg-transparent border-2 border-gray-200 hover:border-primary-300",
    glass: "bg-white/10 backdrop-blur-md border border-white/20",
    gradient: "bg-gradient-to-br from-white to-gray-50 border border-gray-200"
  };

  const hoverClasses = hover ? "hover:transform hover:-translate-y-2" : "";
  
  const cardClasses = `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${hoverClasses} ${className}`;

  const content = (
    <>
      {/* Icon */}
      {Icon && (
        <div className="mb-4 flex justify-center items-center">
          <Icon 
            className={iconColor} 
            style={{ width: `${iconSize}px`, height: `${iconSize}px` }}
          />
        </div>
      )}
      
      {/* Image */}
      {image && (
        <div className="mb-4 -mx-6 -mt-6 overflow-hidden">
          <Image
            src={image.src}
            alt={image.alt}
            width={image.width || 400}
            height={image.height || 300}
            className="w-full h-48 object-cover transition-transform duration-500 hover:scale-110"
          />
        </div>
      )}
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
      
      {/* Hover overlay */}
      {hover && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
      )}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={cardClasses}>
        {content}
      </Link>
    );
  }

  return (
    <div className={cardClasses} onClick={onClick}>
      {content}
    </div>
  );
}

// Specialized card components
export function FeatureCard({
  icon: Icon,
  title,
  description,
  href,
  iconSize = 64,
  className = "",
  ...props
}: {
  icon: IconType;
  title: string;
  description: string;
  href?: string;
  iconSize?: number;
  className?: string;
} & Omit<CardProps, "children" | "icon" | "iconSize">) {
  return (
    <Card
      variant="elevated"
      size="sm"
      href={href}
      className={`text-center ${className}`}
      icon={Icon}
      iconColor="text-primary-600"
      iconSize={iconSize}
      {...props}
    >
      <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 leading-relaxed text-sm">{description}</p>
    </Card>
  );
}

export function TestimonialCard({
  quote,
  author,
  role,
  company,
  avatar,
  rating = 5,
  className = "",
  ...props
}: {
  quote: string;
  author: string;
  role?: string;
  company?: string;
  avatar?: string;
  rating?: number;
  className?: string;
} & Omit<CardProps, "children">) {
  return (
    <Card
      variant="glass"
      size="md"
      className={`text-center ${className}`}
      {...props}
    >
      <div className="mb-4">
        {avatar && (
          <Image
            src={avatar}
            alt={author}
            width={64}
            height={64}
            className="w-16 h-16 rounded-full mx-auto mb-4 object-cover"
          />
        )}
        <blockquote className="text-lg italic text-gray-800 mb-4">
          "{quote}"
        </blockquote>
        <div className="flex justify-center mb-3">
          {Array.from({ length: rating }).map((_, i) => (
            <svg
              key={i}
              className="w-5 h-5 text-yellow-400 fill-current"
              viewBox="0 0 20 20"
            >
              <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
            </svg>
          ))}
        </div>
        <div>
          <p className="font-semibold text-gray-900">{author}</p>
          {role && company && (
            <p className="text-sm text-gray-600">{role} at {company}</p>
          )}
        </div>
      </div>
    </Card>
  );
}

export function ImageCard({
  image,
  title,
  subtitle,
  href,
  className = "",
  ...props
}: {
  image: {
    src: string;
    alt: string;
    width?: number;
    height?: number;
  };
  title: string;
  subtitle?: string;
  href?: string;
  className?: string;
} & Omit<CardProps, "children" | "image">) {
  return (
    <Card
      variant="elevated"
      size="sm"
      href={href}
      image={image}
      className={`group ${className}`}
      {...props}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="relative z-10 text-white">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        {subtitle && <p className="text-white/80">{subtitle}</p>}
      </div>
    </Card>
  );
}
