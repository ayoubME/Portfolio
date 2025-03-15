import React from 'react';
import { Terminal as TerminalIcon, MonitorOff, Monitor } from 'lucide-react';
import { useTerminal } from './useTerminal';
import { TerminalHeader } from './TerminalHeader';
import { TerminalOutput } from './TerminalOutput';
import { TerminalInput } from './TerminalInput';
import { AVAILABLE_COLORS } from '../../constants';

export function Terminal() {
  const { isOpen, setIsOpen, isFullscreen, isHackMode, terminalColor, terminalState } =
    useTerminal();

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-4 right-4 bg-${terminalColor}-500/20 border border-${terminalColor}-500 p-3 rounded-full hover:bg-${terminalColor}-500/30 transition-colors`}
        title="Open Terminal"
      >
        <TerminalIcon className={`w-6 h-6 ${AVAILABLE_COLORS[terminalColor]}`} />
      </button>
    );
  }

  const terminalClasses = `
    ${isFullscreen ? 'fixed inset-0' : 'fixed bottom-4 right-4 w-[90vw] md:w-[600px] h-[400px]'}
    ${isHackMode ? 'terminal-crt' : 'bg-black/95'}
    border border-${terminalColor}-500
    ${!isFullscreen ? 'rounded-lg shadow-xl' : ''}
    overflow-hidden
  `;

  return (
    <div className={terminalClasses}>
      {isHackMode && <div className="scanline" />}
      <TerminalHeader {...terminalState} />
      <TerminalOutput {...terminalState} />
      <TerminalInput {...terminalState} />
    </div>
  );
}
