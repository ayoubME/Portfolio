import React from 'react';
import { Terminal as TerminalIcon, Menu, X } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { usePersonalData } from '../hooks/usePersonalData';

interface NavigationProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
}

export function Navigation({ isMenuOpen, setIsMenuOpen }: NavigationProps) {
  const { t } = useLanguage();
  const personalData = usePersonalData();

  return (
    <nav className="fixed w-full bg-black/90 backdrop-blur-sm z-50 border-b border-green-500/30">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <TerminalIcon className="w-6 h-6 text-green-500 glitch-effect" />
            <span className="text-xl font-mono font-bold text-green-500">{personalData.name}</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <a href="#accueil" className="text-green-500 hover:text-white font-mono">~/{t.nav.home}</a>
            <a href="#profile" className="text-green-500 hover:text-white font-mono">~/{t.nav.profile}</a>
            <a href="#experience" className="text-green-500 hover:text-white font-mono">~/{t.nav.experience}</a>
            <a href="#projects" className="text-green-500 hover:text-white font-mono">~/{t.nav.projects}</a>
            <a href="#contact" className="text-green-500 hover:text-white font-mono">~/{t.nav.contact}</a>
          </div>

          <button 
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-green-500" />
            ) : (
              <Menu className="w-6 h-6 text-green-500" />
            )}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-green-500/30">
            <div className="flex flex-col gap-4">
              <a href="#accueil" className="text-green-500 hover:text-white font-mono">&gt; ~/{t.nav.home}</a>
              <a href="#profile" className="text-green-500 hover:text-white font-mono">&gt; ~/{t.nav.profile}</a>
              <a href="#experience" className="text-green-500 hover:text-white font-mono">&gt; ~/{t.nav.experience}</a>
              <a href="#projects" className="text-green-500 hover:text-white font-mono">&gt; ~/{t.nav.projects}</a>
              <a href="#contact" className="text-green-500 hover:text-white font-mono">&gt; ~/{t.nav.contact}</a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}