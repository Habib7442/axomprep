import React from 'react';
import Link from 'next/link';

interface FeatureCardProps {
  href: string;
  icon: string;
  title: string;
  description: string;
}

const FeatureCard = ({ href, icon, title, description }: FeatureCardProps) => {
  return (
    <Link href={href} className="group">
      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-5 md:p-6 border border-white/30 hover:border-orange-300 transition-all duration-300 h-full">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-[#FF6B35] to-[#FF914D] flex items-center justify-center">
            <span className="text-white font-bold">{icon}</span>
          </div>
          <h3 className="font-bold text-gray-900 group-hover:text-[#FF6B35] transition-colors">{title}</h3>
        </div>
        <p className="text-gray-600 text-sm md:text-base">
          {description}
        </p>
      </div>
    </Link>
  );
};

export default FeatureCard;