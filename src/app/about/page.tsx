"use client";
import React, { useEffect, useRef } from 'react';
import FloatingBackground from '@/app/components/FloatingBackground';

export default function AboutPage() {
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in-up');
            entry.target.classList.remove('opacity-0', 'translate-y-8');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    const elements = document.querySelectorAll('.scroll-animate');
    elements.forEach((el) => observerRef.current?.observe(el));

    return () => observerRef.current?.disconnect();
  }, []);

  const skills = [
    "JavaScript (ES6+)", "React & React Native", "Redux", 
    "Ruby on Rails", "PHP", "SQL", "HTML5 & CSS3", "WordPress"
  ];

  return (
    <main className="w-full flex flex-col items-center px-4 relative overflow-hidden min-h-screen pt-24">
      <FloatingBackground />

      <section className="w-full max-w-4xl mb-20 relative z-10 scroll-animate opacity-0 translate-y-8">
        <div className="text-center mb-12">
          <div className="inline-block relative">
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 animate-expand-line"></div>
            <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              About the Developer
            </h1>
          </div>
        </div>

        <div className="bg-zinc-900/40 backdrop-blur-xl border border-zinc-700/50 rounded-3xl p-8 md:p-12 shadow-2xl flex flex-col md:flex-row gap-12 items-center md:items-start">
          
          {/* Profile Image & Quick Links */}
          <div className="flex flex-col items-center space-y-6 w-full md:w-1/3">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur opacity-50 group-hover:opacity-100 transition duration-300"></div>
              {/* Fetches your actual GitHub Avatar */}
              <img 
                src="https://github.com/bill7pearl.png" 
                alt="Billal Chami" 
                className="relative w-48 h-48 rounded-full object-cover border-4 border-zinc-800 z-10"
              />
            </div>
            
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-100">Billal Chami</h2>
              <p className="text-blue-400 font-medium mt-1">Full-Stack Developer</p>
              <p className="text-sm text-gray-400 mt-2 flex items-center justify-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                Algeria
              </p>
            </div>

            <div className="flex gap-4 w-full justify-center">
              {/* GitHub Link */}
              <a href="https://github.com/bill7pearl" target="_blank" rel="noopener noreferrer" className="p-3 bg-zinc-800 hover:bg-zinc-700 border border-zinc-600 rounded-xl text-gray-300 hover:text-white transition-all transform hover:scale-110">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.379.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z"></path></svg>
              </a>
              {/* LinkedIn Link */}
              <a href="https://www.linkedin.com/in/billal-chami/" target="_blank" rel="noopener noreferrer" className="p-3 bg-zinc-800 hover:bg-zinc-700 border border-zinc-600 rounded-xl text-blue-400 hover:text-blue-300 transition-all transform hover:scale-110">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.28c-.97 0-1.75-.79-1.75-1.75s.78-1.75 1.75-1.75 1.75.79 1.75 1.75-.78 1.75-1.75 1.75zm15.5 10.28h-3v-4.5c0-1.08-.02-2.47-1.5-2.47-1.5 0-1.73 1.17-1.73 2.39v4.58h-3v-9h2.89v1.23h.04c.4-.75 1.38-1.54 2.84-1.54 3.04 0 3.6 2 3.6 4.59v4.72z"/></svg>
              </a>
            </div>
          </div>

          {/* Bio & Skills */}
          <div className="w-full md:w-2/3 space-y-8">
            <div>
              <h3 className="text-xl font-bold text-gray-200 mb-4 border-b border-zinc-700 pb-2">Who am I?</h3>
              <p className="text-gray-300 leading-relaxed">
                Hi! I am a professional full-stack web application developer who loves to solve real-world problems. 
                I graduated from the Microverse software engineering program, where I spent hundreds of hours pair-programming remotely with an international team of developers.
              </p>
              <p className="text-gray-300 leading-relaxed mt-4">
                I built <strong>ConvertIno</strong> to provide a fast, privacy-first, and completely free solution for developers and designers who need high-quality image processing without the hassle of accounts or server uploads.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-200 mb-4 border-b border-zinc-700 pb-2">Tech Stack</h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span key={skill} className="px-4 py-2 bg-blue-500/10 border border-blue-500/20 text-blue-300 rounded-lg text-sm font-medium">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-4 bg-purple-500/10 border border-purple-500/20 rounded-xl">
              <h4 className="text-purple-400 font-semibold mb-1 flex items-center gap-2">
                <span className="text-xl">⚡</span> Fun Fact
              </h4>
              <p className="text-gray-300 italic">
                "I think I am funny."
              </p>
            </div>
          </div>

        </div>
      </section>
    </main>
  );
}