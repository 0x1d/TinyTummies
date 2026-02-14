
import React from 'react';
import { ViewType } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  activeView: ViewType;
  onViewChange: (view: ViewType) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeView, onViewChange }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white border-b border-orange-100 sticky top-0 z-50 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div 
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => onViewChange('discover')}
          >
            <div className="bg-orange-500 p-2 rounded-xl text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-orange-600 hidden sm:block">TinyTummies</h1>
          </div>

          <nav className="flex items-center gap-1">
            <button 
              onClick={() => onViewChange('discover')}
              className={`px-4 py-2 rounded-full font-medium transition-all ${activeView === 'discover' ? 'bg-orange-100 text-orange-700' : 'text-gray-500 hover:text-orange-600'}`}
            >
              Discover
            </button>
            <button 
              onClick={() => onViewChange('saved')}
              className={`px-4 py-2 rounded-full font-medium transition-all ${activeView === 'saved' ? 'bg-orange-100 text-orange-700' : 'text-gray-500 hover:text-orange-600'}`}
            >
              Saved
            </button>
          </nav>
        </div>
      </header>

      <main className="flex-grow max-w-5xl mx-auto w-full px-4 sm:px-6 py-8">
        {children}
      </main>

      <footer className="bg-white border-t border-orange-50 mt-12 py-8">
        <div className="max-w-5xl mx-auto px-4 text-center text-gray-400 text-sm">
          <p>© 2024 TinyTummies. Healthy meals for happy kiddos.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
