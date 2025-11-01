"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

interface AvatarProps {
  name: string;
  email?: string;
  src?: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  showBadge?: boolean;
}

const sizeClasses = {
  sm: "w-8 h-8 text-xs",
  md: "w-12 h-12 text-sm",
  lg: "w-16 h-16 text-base",
  xl: "w-24 h-24 text-2xl",
};

// Generate avatar from initials or use placeholder
const getAvatarUrl = (name: string, email?: string): string => {
  // Use a professional placeholder service
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
  
  // Using UI Avatars API for consistent professional avatars
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(
    initials || "User"
  )}&background=0179FE&color=fff&size=128&bold=true&font-size=0.5`;
};

const Avatar = ({
  name,
  email,
  src,
  size = "md",
  className,
  showBadge = false,
}: AvatarProps) => {
  const avatarSrc = src || getAvatarUrl(name, email);
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className={cn("relative inline-flex items-center justify-center", className)}>
      <div
        className={cn(
          "relative flex items-center justify-center rounded-full bg-bank-gradient overflow-hidden ring-2 ring-white shadow-md",
          sizeClasses[size]
        )}
      >
        {src ? (
          <Image
            src={avatarSrc}
            alt={name || "User"}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <span className="font-bold text-white">{initials || "U"}</span>
        )}
      </div>
      {showBadge && (
        <span className="absolute bottom-0 right-0 w-3 h-3 bg-success-600 rounded-full border-2 border-white"></span>
      )}
    </div>
  );
};

export default Avatar;

