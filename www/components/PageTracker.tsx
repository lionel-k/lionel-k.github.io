"use client";

import { usePageView } from "@/hooks/usePageView";

export default function PageTracker() {
  usePageView();
  return null;
}
