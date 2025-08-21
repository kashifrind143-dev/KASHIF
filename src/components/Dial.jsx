import React, { useEffect, useState } from "react";

export default function Dial({ lastClaim }) {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    if (!lastClaim) return;
    const interval = setInterval(() => {
      const now = Date.now();
      const diff = now - lastClaim;
      const remaining = Math.max(0, 1 - diff / (4 * 60 * 60 * 1000));
      setProgress(remaining * 100);
    }, 1000);
    return () => clearInterval(interval);
  }, [lastClaim]);

  return (
    <div className="relative w-48 h-48 mb-6">
      <svg className="w-full h-full transform -rotate-90">
        <circle
          cx="96"
          cy="96"
          r="90"
          stroke="gray"
          strokeWidth="10"
          fill="none"
        />
        <circle
          cx="96"
          cy="96"
          r="90"
          stroke="url(#glow)"
          strokeWidth="10"
          strokeLinecap="round"
          fill="none"
          strokeDasharray={2 * Math.PI * 90}
          strokeDashoffset={((100 - progress) / 100) * 2 * Math.PI * 90}
        />
        <defs>
          <linearGradient id="glow" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#00ffcc" />
            <stop offset="100%" stopColor="#0066ff" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex items-center justify-center text-xl font-bold">
        {progress === 0 ? "Ready" : `${Math.round(progress)}%`}
      </div>
    </div>
  );
}
