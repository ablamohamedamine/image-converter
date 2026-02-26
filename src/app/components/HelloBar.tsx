"use client";
import React, { useState, useEffect } from 'react';

export default function HelloBar() {
  const [isVisible, setIsVisible] = useState(true);
  const [countdown, setCountdown] = useState<number | null>(null);
  
  // Prevent hydration mismatch by ensuring it only renders after mount
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // Handle the countdown logic
  useEffect(() => {
    if (countdown === null) return;

    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      // Countdown reached 0, trigger redirect and reset
      window.open('https://www.hostg.xyz/SHIru', '_blank');
      setCountdown(null);
    }
  }, [countdown]);

  if (!mounted || !isVisible) return null;

  const handleCopyAndClaim = () => {
    // Prevent multiple rapid clicks while already counting down
    if (countdown !== null) return; 

    // 1. Copy to clipboard
    navigator.clipboard.writeText('CONVERTINO10');
    
    // 2. Start the 3-second countdown
    setCountdown(3);
  };

  return (
    <div className="bg-gradient-to-r from-purple-600 to-indigo-600 w-full py-2.5 px-4 sm:px-6 relative z-50 shadow-md">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 pr-6 sm:pr-0">
        
        <p className="text-white text-xs sm:text-sm font-medium text-center">
          🎁 Extra 10% off Hostinger Web Hosting. Use code: <span className="font-mono font-bold bg-white/20 px-1.5 py-0.5 rounded tracking-wider select-all">CONVERTINO10</span>
        </p>
        
        <button 
          onClick={handleCopyAndClaim}
          disabled={countdown !== null}
          className={`bg-white text-purple-700 text-xs sm:text-sm font-bold py-1.5 px-4 rounded-full transition-all duration-300 shadow-sm whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-purple-600 cursor-pointer ${
            countdown !== null 
              ? 'opacity-90 scale-95 cursor-wait' // Visual state during countdown
              : 'hover:bg-zinc-100 hover:shadow hover:scale-105' // Normal hover state
          }`}
        >
          {countdown !== null ? `✓ Copied! Redirecting in ${countdown}s...` : 'Copy Code & Claim'}
        </button>

      </div>

      {/* Dismiss Button */}
      <button 
        onClick={() => setIsVisible(false)}
        className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-colors focus:outline-none cursor-pointer"
        aria-label="Dismiss announcement"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}