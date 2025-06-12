"use client"

import type React from "react"

import { Suspense } from "react"
import { Skeleton } from "@/components/ui/skeleton"

interface PerformanceLoaderProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

export function PerformanceLoader({ children, fallback }: PerformanceLoaderProps) {
  return <Suspense fallback={fallback || <Skeleton className="w-full h-48" />}>{children}</Suspense>
}
