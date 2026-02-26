"use client";
import { useEffect, useRef } from 'react';

import ImageConverter from '@/app/ImageConverter'; 
import FloatingBackground from '@/app/components/FloatingBackground';
import FeaturesGrid, { Feature } from '@/app/components/FeaturesGrid';
import PageHeader from '@/app/components/PageHeader'; 
import ConversionSeoContent from '@/app/components/ConversionSeoContent'; 

interface ConversionClientProps {
  slug: string;
  pageData: {
    h1: string;
    description: string;
  };
}

export default function ConversionClient({ slug, pageData }: ConversionClientProps) {
  const observerRef = useRef<IntersectionObserver | null>(null);
  
  const [inputFormat, outputFormat] = slug.split('-to-');

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
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    const elements = document.querySelectorAll('.scroll-animate');
    elements.forEach((el) => {
      observerRef.current?.observe(el);
    });

    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  const features: Feature[] = [
    {
      title: "Specific Conversion",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
        </svg>
      ),
      description: `Specialized tool for converting ${inputFormat.toUpperCase()} to ${outputFormat.toUpperCase()} efficiently.`
    },
    {
      title: "Bulk Upload",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
        </svg>
      ),
      description: "Drag and drop multiple images at once for batch processing"
    },
    {
      title: "Smart Compression",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      description: "Adjustable compression levels to balance quality and file size"
    },
    {
      title: "Privacy First",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      description: "All processing happens in your browser - your images never leave your device"
    },
    {
      title: "No Account Needed",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
      description: "Start converting instantly. We don't ask for your email, and there's no login required."
    },
    {
      title: "Real-time Preview",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      ),
      description: "See file size and quality changes before downloading"
    },
    {
      title: "Instant Download",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      description: "Download individual files or a ZIP archive of all converted images"
    },
    {
      title: "Mobile Friendly",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      ),
      description: "Optimized for mobile devices with touch-friendly interface"
    }
  ];

  return (
    <main className="w-full flex flex-col items-center px-2 relative overflow-hidden">
      <FloatingBackground />

      <section className="w-full max-w-4xl text-center mt-16 mb-12 relative z-10 scroll-animate opacity-0 translate-y-8">
        <PageHeader title={pageData.h1} description={pageData.description} />

        <div className="w-full max-w-3xl mx-auto backdrop-blur-xl bg-zinc-900/30 rounded-2xl shadow-2xl shadow-blue-500/10 border border-zinc-700/50 p-6 md:p-8">
          <ImageConverter 
            fixedInputFormat={inputFormat}
            fixedOutputFormat={outputFormat}
          />
        </div>
      </section>

      <FeaturesGrid features={features} />

      <ConversionSeoContent inputFormat={inputFormat} outputFormat={outputFormat} />
    </main>
  );
}