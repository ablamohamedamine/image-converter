import React from 'react';

export interface Feature {
  title: string;
  icon: React.ReactNode;
  description: string;
}

interface FeaturesGridProps {
  features: Feature[];
}

export default function FeaturesGrid({ features }: FeaturesGridProps) {
  return (
    <section className="w-full max-w-6xl mb-24 relative z-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, idx) => (
          <div
            key={idx}
            className="group p-6 rounded-2xl bg-zinc-900/40 backdrop-blur-sm border border-zinc-700/50 hover:border-blue-500/30 hover:bg-zinc-800/60 transition-all duration-300 scroll-animate opacity-0 translate-y-8"
            style={{ transitionDelay: `${idx * 100}ms` }}
          >
            <div className="w-12 h-12 mb-4 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform duration-300">
              {feature.icon}
            </div>
            <h3 className="text-xl font-bold text-gray-200 mb-2">{feature.title}</h3>
            <p className="text-gray-400 leading-relaxed">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}