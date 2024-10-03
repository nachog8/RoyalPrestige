import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Calendar, CheckSquare, Users, User, ShoppingBag, Calculator } from 'lucide-react';

const Sidebar: React.FC = () => {
  const location = useLocation();
  const [isExpanded, setIsExpanded] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const sidebarItems = [
    { path: '/', icon: Home, label: 'Dashboard' },
    { path: '/calendar', icon: Calendar, label: 'Calendar' },
    { path: '/tasks', icon: CheckSquare, label: 'Tasks' },
    { path: '/team', icon: Users, label: 'Team' },
    { path: '/catalog', icon: ShoppingBag, label: 'Catalog' },
    { path: '/quotation', icon: Calculator, label: 'Quotation' },
    { path: '/profile', icon: User, label: 'Profile' },
  ];

  return (
    <div
      className={`bg-gray-800 text-white h-full transition-all duration-300 ease-in-out ${
        isExpanded ? 'w-64' : 'w-16'
      } md:relative md:translate-x-0`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <nav className="mt-5 px-2">
        {sidebarItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center py-2 px-4 rounded transition duration-200 ${
              isActive(item.path) ? 'bg-gray-700' : 'hover:bg-gray-700'
            }`}
          >
            <item.icon className="h-5 w-5" />
            <span className={`ml-4 ${isExpanded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-200`}>
              {item.label}
            </span>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;