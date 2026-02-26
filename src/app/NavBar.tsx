/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useMemo, useState } from "react";
import Link from "next/link";

// Import the data directly from your dynamic page
// Adjust the path if your folder structure differs
import { conversionPages } from "@/app/constants";

export default function NavBar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileToolsOpen, setIsMobileToolsOpen] = useState(false);

  // Dynamically group the pages by their input format (e.g., "png", "jpeg")
  const groupedPages = useMemo(() => {
    return conversionPages.reduce((acc, page) => {
      const sourceFormat = page.slug.split('-to-')[0]; // extracts "png" from "png-to-webp"
      if (!acc[sourceFormat]) {
        acc[sourceFormat] = [];
      }
      acc[sourceFormat].push(page);
      return acc;
    }, {} as Record<string, typeof conversionPages>);
  }, []);

  return (
    <nav className="max-w-6xl mx-auto px-4 py-4 relative z-50">
      <div className="flex items-center justify-between">
        
        {/* LOGO */}
        <Link 
          href="/" 
          className="flex items-center gap-2 group"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <img 
            src="/icon.svg" 
            alt="Logo" 
            className="w-8 h-8 rounded group-hover:scale-110 transition-transform duration-300" 
          />
          <span className="font-bold text-xl tracking-tight text-white group-hover:text-blue-400 transition-colors">
            ConvertIno
          </span>
        </Link>
        
        {/* DESKTOP NAVIGATION (Hidden on Mobile) */}
        <ul className="hidden md:flex items-center gap-8 text-sm font-medium">
          
          {/* Mega Menu Dropdown */}
          <li className="group">
            <button className="flex items-center gap-1 text-gray-300 hover:text-blue-400 transition py-2">
              Tools
              <svg className="w-4 h-4 group-hover:rotate-180 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Mega Menu Panel */}
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-max max-w-[95vw] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-in-out transform origin-top translate-y-2 group-hover:translate-y-0">
              <div className="bg-zinc-900/95 backdrop-blur-xl border border-zinc-700/50 rounded-2xl shadow-2xl p-8 shadow-blue-900/20">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
                  {Object.entries(groupedPages).map(([source, pages]) => (
                    <div key={source} className="flex flex-col">
                      <h3 className="text-gray-100 font-bold uppercase tracking-wider mb-4 border-b border-zinc-700 pb-2 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                        From {source}
                      </h3>
                      <ul className="space-y-3">
                        {pages.map((page) => {
                          const targetFormat = page.slug.split('-to-')[1];
                          return (
                            <li key={page.slug}>
                              <Link 
                                href={`/convert/${page.slug}`}
                                className="text-gray-400 hover:text-blue-400 hover:pl-2 transition-all duration-200 flex items-center text-sm"
                              >
                                to {targetFormat.toUpperCase()}
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </li>

          <li><Link href="/about" className="text-gray-300 hover:text-blue-400 transition">About</Link></li>        
          <li><Link href="/contact" className="text-gray-300 hover:text-blue-400 transition">Contact</Link></li>
        </ul>

        {/* MOBILE HAMBURGER BUTTON (Hidden on Desktop) */}
        <button 
          className="md:hidden text-gray-300 hover:text-white focus:outline-none p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>

      </div>

      {/* MOBILE NAVIGATION DROPDOWN */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-zinc-900/95 backdrop-blur-xl border-b border-zinc-800 shadow-2xl flex flex-col px-4 py-4 max-h-[80vh] overflow-y-auto animate-fade-in-down">
          
          {/* Mobile Tools Accordion */}
          <div className="flex flex-col border-b border-zinc-800 pb-2 mb-2">
            <button 
              onClick={() => setIsMobileToolsOpen(!isMobileToolsOpen)}
              className="flex items-center justify-between py-3 text-gray-200 font-medium text-lg w-full text-left"
            >
              Tools
              <svg className={`w-5 h-5 transition-transform duration-300 ${isMobileToolsOpen ? 'rotate-180 text-blue-400' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {/* Expanded Accordion Content */}
            {isMobileToolsOpen && (
              <div className="pl-2 mt-2 flex flex-col gap-5 pb-4">
                {Object.entries(groupedPages).map(([source, pages]) => (
                  <div key={source} className="flex flex-col">
                    <h3 className="text-gray-300 font-bold uppercase tracking-wider text-xs mb-3 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                      From {source}
                    </h3>
                    <ul className="space-y-3 pl-3 border-l border-zinc-700/50">
                      {pages.map((page) => {
                        const targetFormat = page.slug.split('-to-')[1];
                        return (
                          <li key={page.slug}>
                            <Link 
                              href={`/convert/${page.slug}`}
                              onClick={() => setIsMobileMenuOpen(false)}
                              className="text-gray-400 hover:text-blue-400 block text-sm py-1 transition-colors"
                            >
                              to {targetFormat.toUpperCase()}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>

          <Link 
            href="/about" 
            onClick={() => setIsMobileMenuOpen(false)} 
            className="py-4 border-b border-zinc-800 text-gray-200 font-medium hover:text-blue-400 transition-colors text-lg"
          >
            About
          </Link>
          
          <Link 
            href="/contact" 
            onClick={() => setIsMobileMenuOpen(false)} 
            className="py-4 text-gray-200 font-medium hover:text-blue-400 transition-colors text-lg"
          >
            Contact
          </Link>
        </div>
      )}
    </nav>
  );
}