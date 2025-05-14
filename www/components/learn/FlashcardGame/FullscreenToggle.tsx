"use client";

import { useState } from "react";
import { Maximize2, Minimize2 } from "lucide-react";

export default function FullscreenToggle() {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = async () => {
    if (!document.fullscreenElement) {
      try {
        await document.documentElement.requestFullscreen();
        setIsFullscreen(true);
      } catch (err) {
        console.error("Error attempting to enable fullscreen:", err);
      }
    } else {
      if (document.exitFullscreen) {
        await document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  return (
    <button
      onClick={toggleFullscreen}
      className="p-2.5 rounded-lg bg-[#DAA520] hover:bg-[#B8860B] transition-colors flex items-center gap-2 text-black font-medium"
      aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
    >
      <span className="hidden sm:inline">
        {isFullscreen ? "Exit" : "Fullscreen"}
      </span>
      {isFullscreen ? (
        <Minimize2 className="h-5 w-5" />
      ) : (
        <Maximize2 className="h-5 w-5" />
      )}
    </button>
  );
}
