
import React, { useState } from 'react';
import { ActiveView } from './types';
import ImageAnalyzer from './components/ImageAnalyzer';
import Chatbot from './components/Chatbot';
import { SparklesIcon, ChatIcon } from './components/ui';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<ActiveView>('analyzer');

  const NavButton: React.FC<{
    view: ActiveView;
    label: string;
    icon: React.ReactNode;
  }> = ({ view, label, icon }) => (
    <button
      onClick={() => setActiveView(view)}
      className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg transition-colors text-sm font-medium
        ${
          activeView === view
            ? 'bg-teal-600 text-white shadow-md'
            : 'text-slate-300 hover:bg-slate-700 hover:text-white'
        }`}
    >
      {icon}
      <span className="hidden sm:inline">{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans">
      <header className="bg-slate-800/50 backdrop-blur-sm border-b border-slate-700 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <SparklesIcon className="h-8 w-8 text-teal-400" />
            <h1 className="text-lg sm:text-xl font-bold text-slate-100 tracking-tight">
              AI Home Organizer
            </h1>
          </div>
          <nav className="flex items-center gap-1 sm:gap-2 p-1 bg-slate-900/50 rounded-xl">
            <NavButton
              view="analyzer"
              label="Room Analyzer"
              icon={<SparklesIcon className="h-5 w-5" />}
            />
            <NavButton
              view="chat"
              label="Q&A Chatbot"
              icon={<ChatIcon className="h-5 w-5" />}
            />
          </nav>
        </div>
      </header>

      <main className="flex-grow container mx-auto p-4 md:p-6 w-full">
        {activeView === 'analyzer' && <ImageAnalyzer />}
        {activeView === 'chat' && <Chatbot />}
      </main>
      
      <footer className="text-center p-4 text-xs text-slate-500">
        Powered by Gemini
      </footer>
    </div>
  );
};

export default App;