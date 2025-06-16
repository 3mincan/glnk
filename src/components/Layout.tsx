import React from "react";
import { Outlet } from "react-router-dom";
import Navigation from "./Navigation";

type LayoutProps = {
  children?: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <div className="flex">
        <div className="w-16 flex-shrink-0" />
        <div className="flex-1 bg-gray-50 min-h-screen">
          <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <div className="px-4 py-6 sm:px-0">{children || <Outlet />}</div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Layout;
