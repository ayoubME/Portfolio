import React from 'react';
import { AVAILABLE_COLORS } from '../../constants';
import { TerminalState } from './types';

export function TerminalOutput({ terminalRef, history, isHackMode, terminalColor }: TerminalState) {
  return (
    <div
      ref={terminalRef}
      className={`p-4 h-[calc(100%-80px)] overflow-y-auto font-mono text-sm ${isHackMode ? 'terminal-text' : ''}`}
    >
      {history.map((item, i) => (
        <div key={i} className="mb-2">
          <div className={`flex items-center gap-2 ${AVAILABLE_COLORS[terminalColor]}`}>
            <span>$</span>
            <span>{item.command}</span>
          </div>
          <div className="text-white/80 whitespace-pre-wrap ml-4 mt-1">{item.output}</div>
        </div>
      ))}
    </div>
  );
}
