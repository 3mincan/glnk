import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Search,
  User,
  RefreshCw,
  Home,
  FileText,
  Lock,
  Settings,
  LogOut,
} from "lucide-react";

const Navigation = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const location = useLocation();

  const navItems = [
    { icon: Search, label: "Search", href: "/" },
    { icon: User, label: "Profile", href: "/profile" },
    { icon: RefreshCw, label: "Refresh", href: "/refresh" },
    { icon: Home, label: "Home", href: "/home" },
    { icon: FileText, label: "Documents", href: "/documents" },
    { icon: Lock, label: "Security", href: "/security" },
    { icon: Settings, label: "Settings", href: "/settings" },
    { icon: LogOut, label: "Logout", href: "/logout" },
  ];

  return (
    <div
      className={`fixed top-0 left-0 h-screen bg-white border-r border-gray-200 flex flex-col py-4 transition-all duration-300 ease-in-out ${
        isExpanded ? "w-48" : "w-16"
      }`}
      style={{
        zIndex: 50,
        transitionProperty: "width",
        willChange: "width",
      }}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <div className="px-4 mb-8">
        <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-sm">G</span>
        </div>
      </div>

      <div className="flex-1 flex flex-col space-y-1 px-2">
        {navItems.map((item, index) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={index}
              to={item.href}
              className={`flex items-center py-2 px-3 rounded-lg transition-colors ${
                isActive
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <item.icon size={20} className="flex-shrink-0" />
              {(isExpanded || isActive) && (
                <span className="ml-3 text-sm font-medium whitespace-nowrap overflow-hidden overflow-ellipsis">
                  {item.label}
                </span>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Navigation;
