import React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Sidebar from './Sidebar';
import MobileNavbar from './MobileNavbar';
import { 
  LayoutDashboard, 
  Users, 
  Receipt, 
  Calculator, 
  FileText, 
  Folder, 
  Settings,
  LogOut
} from 'lucide-react';

// Navigation items
export const navItems = [
  { path: '/', label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
  { path: '/employees', label: 'Collaboratori', icon: <Users className="w-5 h-5" /> },
  { path: '/payslips', label: 'Cedolini', icon: <Receipt className="w-5 h-5" /> },
  { path: '/contributions', label: 'Contributi INPS', icon: <Calculator className="w-5 h-5" /> },
  { path: '/cu', label: 'Certificazione Unica', icon: <FileText className="w-5 h-5" /> },
  { path: '/documents', label: 'Documenti', icon: <Folder className="w-5 h-5" /> },
  { path: '/settings', label: 'Impostazioni', icon: <Settings className="w-5 h-5" /> },
];

const Layout: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Handle logout
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  
  // Get current page title
  const getCurrentPageTitle = () => {
    const currentItem = navItems.find(item => item.path === location.pathname);
    return currentItem ? currentItem.label : 'Dashboard';
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar - hidden on mobile */}
      <div className="hidden md:flex md:flex-shrink-0">
        <Sidebar onLogout={handleLogout} />
      </div>
      
      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Top header - visible on all screens */}
        <header className="bg-white shadow-sm z-10">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <h1 className="text-xl font-semibold text-gray-900">
                  {getCurrentPageTitle()}
                </h1>
              </div>
              <div className="flex items-center">
                <button 
                  onClick={handleLogout}
                  className="p-2 text-gray-500 hover:text-gray-700 focus:outline-none"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </header>
        
        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
        
        {/* Mobile navigation - visible only on mobile */}
        <div className="md:hidden">
          <MobileNavbar />
        </div>
      </div>
    </div>
  );
};

export default Layout;