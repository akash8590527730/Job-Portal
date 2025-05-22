import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import '../App.css';
import Header from '@/components/Header.jsx';

const AppLayout = () => {
  return (
    <div>
      <div className="grid-background"></div>
      <main className="min-h-screen container mx-auto px-4">
        <Header />
        <Outlet />
      </main>
      <footer className="bg-black text-white mt-10 p-6 text-center">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        <div>
          <p className="text-sm">&copy; {new Date().getFullYear()} JobConnect. All rights reserved.</p>
        </div>

        <div className="flex gap-4 text-sm">
          <Link to="/terms" className="hover:underline">Terms of Service</Link>
          <Link to="/privacy" className="hover:underline">Privacy Policy</Link>
          <a href="https://www.google.com" target="_blank" rel="noopener noreferrer" className="hover:underline">Google</a>
          <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:underline">LinkedIn</a>
        </div>
      </div>
    </footer>
    </div>
  );
};

export default AppLayout;
