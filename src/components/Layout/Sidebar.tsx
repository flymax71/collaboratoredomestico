import React from 'react';
import { NavLink } from 'react-router-dom';
import { ClipboardCheck, LogOut } from 'lucide-react';
import { navItems } from './Layout';

interface SidebarProps {
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onLogout }) => {
  return (
    <div className="flex flex-col w-64 bg-blue-900 text-white">
      {/* Logo and app name */}
      <div className="flex items-center justify-center h-16 px-4 border-b border-blue-800">
        <ClipboardCheck className="w-8 h-8 mr-2 text-teal-400" />
        <span className="text-xl font-semibold">ColfManager</span>
      </div>
      
      {/* Navigation links */}
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="px-2 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => 
                `flex items-center px-4 py-3 text-sm rounded-md transition-colors ${
                  isActive 
                    ? 'bg-blue-800 text-white' 
                    : 'text-blue-100 hover:bg-blue-800 hover:text-white'
                }`
              }
            >
              <span className="mr-3">{item.icon}</span>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>
      
      {/* Logout button */}
      <div className="p-4 border-t border-blue-800">
        <button
          onClick={onLogout}
          className="flex items-center w-full px-4 py-3 text-sm text-blue-100 rounded-md hover:bg-blue-800 hover:text-white transition-colors"
        >
          <LogOut className="w-5 h-5 mr-3" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;