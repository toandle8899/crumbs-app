import React from 'react';
interface ProgressBarProps {
  progress: number;
}
export function ProgressBar({
  progress
}: ProgressBarProps) {
  return <div className="relative">
      <div className="w-full h-1.5 bg-gray-100 rounded-full">
        <div className="h-1.5 bg-purple-500 rounded-full" style={{
        width: `${progress}%`
      }}></div>
      </div>
      <div className="flex justify-between mt-1">
        <span className="text-xs text-gray-500">{progress}% complete</span>
        <span className="text-xs text-gray-500">
          {progress < 100 ? 'In progress' : 'Completed'}
        </span>
      </div>
    </div>;
}