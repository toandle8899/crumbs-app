import React from 'react';
import { ProgressBar } from './ProgressBar';
interface CardProps {
  title: string;
  subtitle: string;
  icon: ReactNode;
  iconBg: string;
  progress: number;
  onClick?: () => void;
}
export function Card({
  title,
  subtitle,
  icon,
  iconBg,
  progress,
  onClick
}: CardProps) {
  return <div className="flex items-center p-4 bg-white rounded-xl border border-gray-100 shadow-sm cursor-pointer hover:shadow-md transition-shadow" onClick={onClick}>
      <div className={`w-12 h-12 ${iconBg} rounded-lg flex items-center justify-center mr-4 flex-shrink-0`}>
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-medium text-gray-800 truncate">{title}</h3>
        <p className="text-xs text-gray-500 mb-2 truncate">{subtitle}</p>
        <ProgressBar progress={progress} />
      </div>
    </div>;
}