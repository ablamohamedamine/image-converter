import React from 'react';

interface PageHeaderProps {
  title: string;
  description: string;
}

export default function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <>
      <div className="relative">
        {/* Animated underline effect */}
        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 animate-expand-line"></div>
        <h1 className="text-5xl sm:text-7xl font-black mb-6 tracking-tight bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
           {title}
        </h1>
      </div>
      
      <p className="text-xl sm:text-2xl text-gray-300 mb-8 leading-relaxed">
        {description}
      </p>
    </>
  );
}