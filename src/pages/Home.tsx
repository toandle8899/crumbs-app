import React, { useState } from 'react';
import { SearchIcon, BookOpenIcon, BookIcon, MapIcon, TrendingUpIcon, ChevronRightIcon, BarChart2Icon, ClockIcon, BookmarkIcon } from 'lucide-react';
import { ProgressBar } from '../components/common/ProgressBar';
import { Card } from '../components/common/Card';
import { StatsChart } from '../components/StatsChart';
interface HomeProps {
  onNavigate: (page: string) => void;
}
export function Home({
  onNavigate
}: HomeProps) {
  const [viewMode, setViewMode] = useState<'month' | 'week'>('month');
  // Weekly activity data (now includes Sunday)
  const weeklyStats = [{
    day: 'Sun',
    minutes: 25,
    videos: 2,
    subjects: ['History']
  }, {
    day: 'Mon',
    minutes: 45,
    videos: 4,
    subjects: ['Psychology', 'Math']
  }, {
    day: 'Tue',
    minutes: 30,
    videos: 3,
    subjects: ['Psychology', 'Geography']
  }, {
    day: 'Wed',
    minutes: 20,
    videos: 2,
    subjects: ['Data Structures', 'Math']
  }, {
    day: 'Thu',
    minutes: 50,
    videos: 5,
    subjects: ['Psychology', 'Geography', 'Math']
  }, {
    day: 'Fri',
    minutes: 35,
    videos: 3,
    subjects: ['Data Structures', 'Psychology']
  }, {
    day: 'Sat',
    minutes: 40,
    videos: 4,
    subjects: ['Geography', 'Math', 'Psychology']
  }];
  const monthlyStats = [{
    month: 'Jan',
    days: Array.from({
      length: 31
    }, (_, i) => ({
      day: i + 1,
      minutes: Math.floor(Math.random() * 60),
      videos: Math.floor(Math.random() * 5)
    }))
  }, {
    month: 'Feb',
    days: Array.from({
      length: 28
    }, (_, i) => ({
      day: i + 1,
      minutes: Math.floor(Math.random() * 60),
      videos: Math.floor(Math.random() * 5)
    }))
  }, {
    month: 'Mar',
    days: Array.from({
      length: 31
    }, (_, i) => ({
      day: i + 1,
      minutes: Math.floor(Math.random() * 60),
      videos: Math.floor(Math.random() * 5)
    }))
  }, {
    month: 'Apr',
    days: Array.from({
      length: 30
    }, (_, i) => ({
      day: i + 1,
      minutes: Math.floor(Math.random() * 60),
      videos: Math.floor(Math.random() * 5)
    }))
  }, {
    month: 'May',
    days: Array.from({
      length: 31
    }, (_, i) => ({
      day: i + 1,
      minutes: Math.floor(Math.random() * 60),
      videos: Math.floor(Math.random() * 5)
    }))
  }, {
    month: 'Jun',
    days: Array.from({
      length: 30
    }, (_, i) => ({
      day: i + 1,
      minutes: Math.floor(Math.random() * 60),
      videos: Math.floor(Math.random() * 5)
    }))
  }];
  const displayData = viewMode === 'month' ? monthlyStats : weeklyStats;
  const activeCount = displayData.filter(item => item.minutes > 0).length;
  const totalItems = displayData.length;
  return <main className="flex flex-col w-full flex-1 p-4 pb-20">
      <header className="mb-1 flex items-center"></header>

      {/* Stats Overview */}
      <section className="mb-6 bg-white rounded-xl p-4 shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-l font-semibold text-gray-800 flex items-center">
            <TrendingUpIcon className="w-5 h-5 mr-2 text-purple-500" />
            Learning Progress
          </h2>
          <div className="flex items-center space-x-2">
            <button onClick={() => setViewMode('week')} className={`px-3 py-1 rounded-md text-sm ${viewMode === 'week' ? 'bg-purple-100 text-purple-600' : 'text-gray-500 hover:bg-gray-100'}`}>
              Week
            </button>
            <button onClick={() => setViewMode('month')} className={`px-3 py-1 rounded-md text-sm ${viewMode === 'month' ? 'bg-purple-100 text-purple-600' : 'text-gray-500 hover:bg-gray-100'}`}>
              Month
            </button>
          </div>
        </div>

        {/* Monthly Activity View */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm text-gray-600">
              Activity This {viewMode === 'month' ? 'Month' : 'Week'}
            </span>
          </div>
          <div className="bg-white rounded-lg p-4">
            {viewMode === 'month' ? <div>
                <div className="text-sm font-medium text-gray-900 mb-2">
                  {displayData[0].month}
                </div>
                <div className="grid grid-cols-7 gap-1">
                  {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(day => <div key={day} className="h-4 text-xs text-gray-400 text-center">
                      {day}
                    </div>)}
                  {Array(new Date(2024, 0, 1).getDay()).fill(null).map((_, i) => <div key={`empty-${i}`} className="h-4" />)}
                  {displayData[0].days.map((day, dayIndex) => {
                let bgColor = 'bg-gray-100';
                const intensity = Math.min(day.minutes / 60 * 100, 100);
                if (intensity > 0) {
                  if (intensity < 25) bgColor = 'bg-purple-100';else if (intensity < 50) bgColor = 'bg-purple-200';else if (intensity < 75) bgColor = 'bg-purple-300';else bgColor = 'bg-purple-400';
                }
                return <div key={dayIndex} className="relative group">
                        <div className={`h-4 w-4 rounded-sm ${bgColor} cursor-pointer transition-colors`} />
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 p-2">
                          <div className="font-medium mb-1">
                            {displayData[0].month} {day.day}
                          </div>
                          <div className="text-xs">
                            <div>{day.minutes} mins</div>
                            <div>{day.videos} videos</div>
                          </div>
                        </div>
                      </div>;
              })}
                </div>
              </div> : <div className="grid grid-cols-7 gap-2">
                {displayData.map((item, index) => {
              const intensity = Math.min(item.minutes / 180 * 100 + item.videos / 14 * 100 / 2, 100);
              let bgColor = 'bg-gray-100';
              if (intensity > 0) {
                if (intensity < 25) bgColor = 'bg-purple-100';else if (intensity < 50) bgColor = 'bg-purple-200';else if (intensity < 75) bgColor = 'bg-purple-300';else bgColor = 'bg-purple-400';
              }
              return <div key={index} className="relative group">
                      <div className={`h-24 ${bgColor} rounded-lg cursor-pointer transition-colors`}>
                        <div className="absolute inset-x-0 bottom-0 p-2 text-center">
                          <span className="text-xs font-medium text-gray-600">
                            {item.day}
                          </span>
                        </div>
                      </div>
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 p-3">
                        <div className="space-y-2">
                          <div className="font-medium">{item.day}</div>
                          <div className="flex justify-between gap-4">
                            <span>Time:</span>
                            <span>{item.minutes} mins</span>
                          </div>
                          <div className="flex justify-between gap-4">
                            <span>Videos:</span>
                            <span>{item.videos}</span>
                          </div>
                        </div>
                      </div>
                    </div>;
            })}
              </div>}
            <div className="flex items-center justify-end gap-2 mt-4 text-xs text-gray-500">
              <span>Less</span>
              {['bg-purple-100', 'bg-purple-200', 'bg-purple-300', 'bg-purple-400'].map((color, i) => <div key={i} className={`w-3 h-3 ${color} rounded-sm`} />)}
              <span>More</span>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-purple-500 rounded-full mr-2" />
                <span className="text-sm text-gray-600">Active Days</span>
              </div>
              <span className="text-sm font-medium text-gray-700">
                {viewMode === 'month' ? displayData[0].days.filter(d => d.minutes > 0).length : activeCount}{' '}
                of{' '}
                {viewMode === 'month' ? displayData[0].days.length : totalItems}{' '}
                days
              </span>
            </div>
          </div>
        </div>
      </section>

      <div className="relative mb-8">
        <input type="text" placeholder="Search PDFs or videos..." className="w-full py-4 pl-12 pr-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-lg" />
        <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
      </div>

      {/* Continue Learning */}
      <section className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">
            Continue Learning
          </h2>
          <button className="text-purple-600 font-medium">See All</button>
        </div>
        <div className="space-y-4">
          <Card title="Introduction to Psychology" subtitle="Chapter 3: Cognitive Development" icon={<BookOpenIcon className="w-10 h-10 text-white" />} iconBg="bg-blue-500" progress={65} onClick={() => onNavigate('learn')} />
          <Card title="Data Structures & Algorithms" subtitle="Binary Trees & Graph Theory" icon={<BookIcon className="w-10 h-10 text-white" />} iconBg="bg-green-500" progress={32} onClick={() => onNavigate('learn')} />
        </div>
      </section>
      {/* Recently Uploaded */}
      <section>
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-semibold text-gray-800">
            Recently Uploaded
          </h2>
          <button className="text-purple-600 text-sm font-medium" onClick={() => onNavigate('upload')}>
            Upload New
          </button>
        </div>
        <div className="space-y-4">
          <Card title="World Geography" subtitle="Climate Patterns & Ecosystems" icon={<MapIcon className="w-10 h-10 text-white" />} iconBg="bg-amber-500" progress={12} onClick={() => onNavigate('learn')} />
        </div>
      </section>
    </main>;
}