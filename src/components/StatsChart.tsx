import React, { useState } from 'react';
interface StatsChartProps {
  data: {
    day: string;
    minutes: number;
  }[];
}
export function StatsChart({
  data: propData
}: StatsChartProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  // Enhanced dummy data with more details - we'll use this instead of the prop data for demo
  const dummyData = [{
    day: 'Mon',
    minutes: 45,
    topics: ['Psychology', 'Memory'],
    completed: 3
  }, {
    day: 'Tue',
    minutes: 30,
    topics: ['Data Structures'],
    completed: 2
  }, {
    day: 'Wed',
    minutes: 60,
    topics: ['Psychology', 'Learning Theory', 'Cognition'],
    completed: 4
  }, {
    day: 'Thu',
    minutes: 25,
    topics: ['Algorithms'],
    completed: 1
  }, {
    day: 'Fri',
    minutes: 45,
    topics: ['Geography', 'Psychology'],
    completed: 3
  }, {
    day: 'Sat',
    minutes: 15,
    topics: ['Review'],
    completed: 1
  }, {
    day: 'Sun',
    minutes: 0,
    topics: [],
    completed: 0
  }];
  // Use the dummy data for visualization
  const data = dummyData;
  const maxMinutes = Math.max(...data.map(d => d.minutes));
  const totalMinutes = data.reduce((sum, item) => sum + item.minutes, 0);
  const totalCompleted = data.reduce((sum, item) => sum + item.completed, 0);
  return <div className="w-full">
      <div className="flex flex-col space-y-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-purple-500 rounded-full mr-1"></div>
            <span className="text-xs text-gray-500">
              {totalCompleted} videos completed
            </span>
          </div>
          <div className="text-xs text-gray-500">
            {data.filter(d => d.minutes > 0).length}/7 days active
          </div>
        </div>
        {/* Timeline */}
        <div className="flex items-center">
          {data.map((day, index) => <div key={index} className="flex-1 flex flex-col items-center">
              <div className={`h-1 w-full ${day.minutes > 0 ? 'bg-purple-500' : 'bg-gray-200'}`}>
                {index > 0 && <div className="h-full w-full" />}
              </div>
              <div className={`w-2 h-2 rounded-full mt-1 ${day.minutes > 0 ? 'bg-purple-500' : 'bg-gray-200'}`} />
              <span className="text-[10px] text-gray-500 mt-1">{day.day}</span>
            </div>)}
        </div>
      </div>
      <div className="flex justify-between mb-2">
        <div className="text-xs text-gray-500">Minutes studied</div>
        <div className="text-xs font-medium text-purple-600">
          {totalMinutes} min total
        </div>
      </div>
      <div className="w-full h-40 relative flex items-end space-x-2 mb-3">
        {/* Grid lines */}
        <div className="absolute inset-0 flex flex-col justify-between">
          {[0, 15, 30, 45, 60, 75, 90].map(tick => <div key={tick} className="w-full border-b border-gray-100 relative">
              <span className="absolute -left-8 -top-1 text-[10px] text-gray-600 font-medium">
                {tick}m
              </span>
            </div>)}
        </div>
        {/* Line chart */}
        <div className="relative w-full h-full z-10">
          {/* SVG container for line chart */}
          <svg className="w-full h-full">
            {/* Background bars for each day */}
            {data.map((item, i) => {
            const colors = (() => {
              if (item.minutes === 0) return {
                fill: 'fill-gray-200',
                stroke: 'stroke-gray-400',
                gradient: ['rgba(209,213,219,0.4)', 'rgba(209,213,219,0.2)']
              };
              const primarySubject = item.topics[0];
              switch (primarySubject) {
                case 'Psychology':
                  return {
                    fill: 'fill-blue-200',
                    stroke: 'stroke-blue-600',
                    gradient: ['rgba(37,99,235,0.4)', 'rgba(37,99,235,0.2)']
                  };
                case 'Data Structures':
                  return {
                    fill: 'fill-green-200',
                    stroke: 'stroke-green-600',
                    gradient: ['rgba(22,163,74,0.4)', 'rgba(22,163,74,0.2)']
                  };
                case 'Geography':
                  return {
                    fill: 'fill-amber-200',
                    stroke: 'stroke-amber-600',
                    gradient: ['rgba(217,119,6,0.4)', 'rgba(217,119,6,0.2)']
                  };
                default:
                  return {
                    fill: 'fill-purple-200',
                    stroke: 'stroke-purple-600',
                    gradient: ['rgba(147,51,234,0.4)', 'rgba(147,51,234,0.2)']
                  };
              }
            })();
            const width = 100 / data.length;
            const x = i * 100 / (data.length - 1);
            const height = Number(item.minutes / 90 * 100).toFixed(2);
            return <g key={i}>
                  {/* Gradient definition */}
                  <defs>
                    <linearGradient id={`gradient-${i}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={colors.gradient[0]} />
                      <stop offset="100%" stopColor={colors.gradient[1]} />
                    </linearGradient>
                  </defs>
                  {/* Background bar */}
                  <rect x={`${x - width / 2}%`} y={`${100 - height}%`} width={`${width * 0.8}%`} height={`${height}%`} rx="4" fill={`url(#gradient-${i})`} className={`transition-all duration-300 ${hoveredIndex === i ? 'opacity-100' : 'opacity-85'}`} />
                </g>;
          })}
            {/* Area fill under the line with more precise curve */}
            <path d={`
                M ${data.map((item, i) => {
            const x = i * 100 / (data.length - 1);
            const y = 100 - Number(item.minutes / 90 * 100).toFixed(2);
            return `${x}% ${y}%`;
          }).join(' L ')}
                L 100% 100% L 0% 100% Z
              `} className="fill-purple-200/50" />
            {/* Main line with more precise positioning */}
            <path d={`M ${data.map((item, i) => {
            const x = i * 100 / (data.length - 1);
            const y = 100 - Number(item.minutes / 90 * 100).toFixed(2);
            return `${x}% ${y}%`;
          }).join(' L ')}`} className="stroke-purple-600 stroke-[3] fill-none" strokeLinecap="round" strokeLinejoin="round" />
            {/* Data points with more precise tooltips */}
            {data.map((item, index) => {
            const colors = (() => {
              if (item.minutes === 0) return {
                dot: 'bg-gray-400',
                ring: 'bg-gray-200',
                text: 'text-gray-700'
              };
              const primarySubject = item.topics[0];
              switch (primarySubject) {
                case 'Psychology':
                  return {
                    dot: 'bg-blue-600',
                    ring: 'bg-blue-200',
                    text: 'text-blue-700'
                  };
                case 'Data Structures':
                  return {
                    dot: 'bg-green-600',
                    ring: 'bg-green-200',
                    text: 'text-green-700'
                  };
                case 'Geography':
                  return {
                    dot: 'bg-amber-600',
                    ring: 'bg-amber-200',
                    text: 'text-amber-700'
                  };
                case 'Math':
                  return {
                    dot: 'bg-purple-600',
                    ring: 'bg-purple-200',
                    text: 'text-purple-700'
                  };
                default:
                  return {
                    dot: 'bg-purple-600',
                    ring: 'bg-purple-200',
                    text: 'text-purple-700'
                  };
              }
            })();
            const xPos = `${index * 100 / (data.length - 1)}%`;
            const yPos = `${100 - Number(item.minutes / 90 * 100).toFixed(2)}%`;
            return <foreignObject key={index} x={xPos} y={yPos} width="1" height="1" className="w-6 h-6 -translate-x-1/2 -translate-y-1/2" style={{
              overflow: 'visible'
            }}>
                  <div className="relative" onMouseEnter={() => setHoveredIndex(index)} onMouseLeave={() => setHoveredIndex(null)}>
                    {/* Dot styling */}

                    {/* Value label with more precise time */}
                    <div className={`absolute -top-6 left-1/2 transform -translate-x-1/2 px-2 py-1 
                      rounded-full text-xs font-medium whitespace-nowrap bg-white shadow-sm
                      ${hoveredIndex === index ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}
                      ${colors.text} transition-all duration-200`}>
                      {item.minutes}m
                    </div>
                    {/* Tooltip with more detailed information */}
                    {hoveredIndex === index && item.minutes > 0 && <div className="absolute -top-24 left-1/2 transform -translate-x-1/2 bg-white 
                        rounded-lg shadow-lg p-3 text-xs z-20 w-48 border border-gray-200">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-semibold text-gray-900">
                            {item.minutes} minutes
                          </span>
                          <div className="flex flex-col items-end">
                            <span className={`bg-white border ${colors.text} px-2 py-0.5 rounded-full text-[10px] font-medium`}>
                              {item.completed} videos
                            </span>
                            <span className="text-[10px] text-gray-500 mt-1">
                              {Math.round(item.minutes / item.completed)}{' '}
                              min/video
                            </span>
                          </div>
                        </div>
                        {item.topics.length > 0 && <div className="space-y-1">
                            {item.topics.map((topic, i) => {
                      let dotColor = 'bg-gray-600';
                      switch (topic) {
                        case 'Psychology':
                          dotColor = 'bg-blue-600';
                          break;
                        case 'Data Structures':
                          dotColor = 'bg-green-600';
                          break;
                        case 'Geography':
                          dotColor = 'bg-amber-600';
                          break;
                        case 'Math':
                          dotColor = 'bg-purple-600';
                          break;
                      }
                      return <div key={i} className="flex items-center">
                                  <div className={`w-1.5 h-1.5 rounded-full ${dotColor} mr-2`} />
                                  <span className="text-gray-700 font-medium">
                                    {topic}
                                  </span>
                                </div>;
                    })}
                          </div>}
                        <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 rotate-45 w-2 h-2 
                          bg-white border-r border-b border-gray-200" />
                      </div>}
                  </div>
                </foreignObject>;
          })}
          </svg>
        </div>
      </div>
    </div>;
}