"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { MiniNavbar } from "./ui/mini-navbar";

export function Header() {
  const pathname = usePathname();
  const [hideHeaderForVideo, setHideHeaderForVideo] = useState(false);

  useEffect(() => {
    const handleVideoState = (e: Event) => {
      const customEvent = e as CustomEvent;
      setHideHeaderForVideo(customEvent.detail.isPlaying);
    };

    window.addEventListener("heroVideoState", handleVideoState);
    return () => window.removeEventListener("heroVideoState", handleVideoState);
  }, []);

  if (pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <AnimatePresence>
      {!hideHeaderForVideo && (
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -50, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed top-0 left-0 right-0 z-50"
        >
          <MiniNavbar />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

