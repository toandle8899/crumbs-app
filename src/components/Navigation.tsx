import React from 'react';
import { HomeIcon, UploadIcon, MessageCircleIcon, UserIcon } from 'lucide-react';
interface NavigationProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}
export function Navigation({
  currentPage,
  onNavigate
}: NavigationProps) {
  const navItems = [{
    id: 'home',
    label: 'Home',
    icon: HomeIcon
  }, {
    id: 'upload',
    label: 'Upload',
    icon: UploadIcon
  }, {
    id: 'chat',
    label: 'AI Tutor',
    icon: MessageCircleIcon
  }, {
    id: 'profile',
    label: 'Profile',
    icon: UserIcon
  }];
  return <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-2 px-4">
      <div className="flex justify-around items-center">
        {navItems.map(item => <button key={item.id} className={`flex flex-col items-center p-2 ${currentPage === item.id ? 'text-purple-600' : 'text-gray-500'}`} onClick={() => onNavigate(item.id)}>
            <item.icon className="w-6 h-6" />
            <span className="text-xs mt-1">{item.label}</span>
          </button>)}
      </div>
    </nav>;
}