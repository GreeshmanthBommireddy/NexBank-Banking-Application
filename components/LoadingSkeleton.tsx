"use client";

import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
  variant?: "text" | "circular" | "rectangular" | "card";
}

const Skeleton = ({ className, variant = "rectangular" }: SkeletonProps) => {
  const baseClasses = "animate-pulse bg-gray-200 rounded";
  
  const variantClasses = {
    text: "h-4 w-full",
    circular: "rounded-full",
    rectangular: "w-full",
    card: "h-48 w-full rounded-lg",
  };

  return (
    <div
      className={cn(baseClasses, variantClasses[variant], className)}
    />
  );
};

export const TransactionSkeleton = () => (
  <div className="flex items-center space-x-4 p-4">
    <Skeleton variant="circular" className="h-12 w-12" />
    <div className="flex-1 space-y-2">
      <Skeleton variant="text" className="h-4 w-3/4" />
      <Skeleton variant="text" className="h-4 w-1/2" />
    </div>
    <Skeleton variant="text" className="h-4 w-20" />
  </div>
);

export const CardSkeleton = () => (
  <div className="space-y-4 p-6 border rounded-lg">
    <Skeleton variant="text" className="h-6 w-1/2" />
    <Skeleton variant="text" className="h-4 w-full" />
    <Skeleton variant="text" className="h-4 w-3/4" />
    <Skeleton variant="rectangular" className="h-32 w-full rounded" />
  </div>
);

export const ProfileSkeleton = () => (
  <div className="space-y-4">
    <div className="flex items-center space-x-4">
      <Skeleton variant="circular" className="h-16 w-16" />
      <div className="space-y-2">
        <Skeleton variant="text" className="h-5 w-32" />
        <Skeleton variant="text" className="h-4 w-48" />
      </div>
    </div>
  </div>
);

export default Skeleton;

