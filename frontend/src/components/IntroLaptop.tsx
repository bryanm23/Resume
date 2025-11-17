import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function IntroLaptop({ onFinish }: { onFinish: () => void }) {
  const [stage, setStage] = useState<"closed" | "open" | "zoom">("closed");

  // Auto-run animation after short delay
  useEffect(() => {
    const t1 = setTimeout(() => setStage("open"), 600);
    const t2 = setTimeout(() => setStage("zoom"), 1400);
    const t3 = setTimeout(() => onFinish(), 1800);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onFinish]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center ios-bg-light"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
    >
      {/* Skip button */}
      <button
        onClick={onFinish}
        className="absolute top-5 right-6 text-xs uppercase tracking-[0.15em] text-gray-600 hover:text-gray-900 transition-colors z-10"
      >
        Skip intro
      </button>

      <motion.div
        className="relative"
        animate={
          stage === "zoom"
            ? {
                scale: 2.5,
              }
            : { scale: 1 }
        }
        transition={{ duration: 0.9, ease: [0.19, 1, 0.22, 1] }}
        style={{ transformOrigin: "center center" }}
      >
        {/* Laptop container - everything aligned here */}
        <div className="relative w-[420px] h-[286px]">
          {/* Bottom chassis - base of laptop */}
          <div className="absolute bottom-0 left-0 w-full h-[26px] rounded-b-3xl bg-gradient-to-b from-slate-300 via-slate-200 to-slate-400 shadow-[0_24px_60px_rgba(0,0,0,0.65)]">
            <div className="absolute left-16 right-16 top-1 h-[3px] rounded-full bg-slate-400/80" />
          </div>

          {/* Screen hinge - connects base to screen */}
          <div className="absolute bottom-[26px] left-0 right-0 h-[6px] mx-auto w-[360px] rounded-t-3xl bg-gradient-to-b from-slate-300 to-slate-500" />

          {/* Screen wrapper (for opening) - positioned above hinge */}
          <motion.div
            className="absolute bottom-[32px] left-0 right-0 mx-auto w-[380px] h-[230px]"
            initial={{ rotateX: 90 }}
            animate={
              stage === "closed"
                ? {
                    rotateX: 90,
                  }
                : {
                    rotateX: 0,
                  }
            }
            transition={{ duration: 0.9, ease: [0.19, 1, 0.22, 1] }}
            style={{
              transformStyle: "preserve-3d",
              transformOrigin: "bottom center",
            }}
          >
            {/* Screen body */}
            <div className="relative h-full w-full rounded-3xl bg-gradient-to-b from-slate-200 to-slate-500 shadow-[0_25px_60px_rgba(0,0,0,0.6)]">
              {/* Inner bezel */}
              <div className="absolute inset-[10px] rounded-[18px] bg-gradient-to-b from-slate-950 to-slate-900 border border-slate-800/70">
                {/* Camera dot */}
                <div className="absolute top-[6px] left-1/2 h-[6px] w-[6px] -translate-x-1/2 rounded-full bg-slate-700" />

                {/* Screen content - showing actual resume preview */}
                <motion.div
                  className="absolute inset-[18px] rounded-[14px] overflow-hidden bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-100"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: stage === "closed" ? 0 : 1 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  {/* Mini preview of resume content */}
                  <div className="h-full w-full relative overflow-hidden">
                    <div className="absolute inset-0 p-1.5">
                      <div className="h-full w-full bg-white/95 rounded-lg shadow-lg overflow-hidden">
                        <div className="p-2 space-y-1.5">
                          {/* Name header */}
                          <div className="h-2 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded w-2/3"></div>
                          <div className="h-1 bg-gray-300 rounded w-1/3"></div>

                          {/* Section preview */}
                          <div className="mt-2 space-y-1">
                            <div className="h-1 bg-gray-400 rounded w-1/4"></div>
                            <div className="h-0.5 bg-gray-200 rounded w-full"></div>
                            <div className="h-0.5 bg-gray-200 rounded w-5/6"></div>
                          </div>

                          {/* Card preview */}
                          <div className="mt-1.5 p-1 bg-gray-50 rounded border border-gray-200">
                            <div className="h-1 bg-gray-300 rounded w-1/3 mb-1"></div>
                            <div className="h-0.5 bg-gray-200 rounded w-full mb-0.5"></div>
                            <div className="h-0.5 bg-gray-200 rounded w-4/5"></div>
                          </div>

                          {/* Tags */}
                          <div className="mt-1.5 flex gap-1 flex-wrap">
                            <div className="h-0.5 bg-blue-200 rounded-full w-8"></div>
                            <div className="h-0.5 bg-blue-200 rounded-full w-10"></div>
                            <div className="h-0.5 bg-blue-200 rounded-full w-7"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}
