import React from 'react';
import { NavLink } from 'react-router-dom';
import { navItems } from './Layout';

const MobileNavbar: React.FC = () => {
  // Only show main navigation items (limit to 5 for mobile)
  const mobileNavItems = navItems.slice(0, 5);
  
  return (
    <div className="fixed bottom-0 left-0 right-0 z-20 bg-white border-t border-gray-200">
      <div className="flex justify-around">
        {mobileNavItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => 
              `flex flex-col items-center py-2 px-3 text-xs ${
                isActive 
                  ? 'text-blue-800' 
                  : 'text-gray-500 hover:text-blue-800'
              }`
            }
          >
            <span className="mb-1">{item.icon}</span>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default MobileNavbar;