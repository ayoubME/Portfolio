import React from 'react';
import { Terminal as TerminalIcon, MonitorOff, Monitor } from 'lucide-react';
import { AVAILABLE_COLORS } from '../../constants';
import { TerminalState } from './types';

export function TerminalHeader({ 
  isFullscreen,
  setIsFullscreen,
  setIsOpen,
  isHackMode,
  terminalColor 
}: TerminalState) {
  return (
    <div className={`flex items-center justify-between p-2 border-b border-${terminalColor}-500/30`}>
      <div className="flex items-center gap-2">
        <TerminalIcon className={`w-4 h-4 ${AVAILABLE_COLORS[terminalColor]} ${isHackMode ? 'glitch-effect' : ''}`} />
        <span className={`text-sm font-mono ${AVAILABLE_COLORS[terminalColor]} ${isHackMode ? 'terminal-text' : ''}`}>
          Terminal
        </span>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={() => setIsFullscreen(!isFullscreen)}
          className={`${AVAILABLE_COLORS[terminalColor]} hover:text-white transition-colors p-1`}
          title={isFullscreen ? "Windowed Mode" : "Fullscreen Mode"}
        >
          {isFullscreen ? <MonitorOff className="w-4 h-4" /> : <Monitor className="w-4 h-4" />}
        </button>
        <button
          onClick={() => setIsOpen(false)}
          className={`${AVAILABLE_COLORS[terminalColor]} hover:text-white transition-colors p-1`}
        >
          ×
        </button>
      </div>
    </div>
  );
}