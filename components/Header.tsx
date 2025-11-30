import React from 'react';
import { Shield, Cpu } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="border-b border-indigo-900/50 sticky top-0 z-50 glass-panel">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-gradient-to-tr from-purple-600 to-indigo-600 p-2.5 rounded-lg shadow-lg shadow-purple-900/50">
            <Cpu className="text-white h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white tracking-widest brand-font">FluxByte</h1>
            <p className="text-[10px] text-indigo-300 font-mono tracking-wider uppercase">AI-Drive Scam Detection</p>
          </div>
        </div>
        <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center space-x-2 px-3 py-1.5 rounded-full bg-indigo-950/50 border border-indigo-500/30">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                <span className="text-xs font-medium text-indigo-200">System Active</span>
            </div>
        </div>
      </div>
    </header>
  );
};