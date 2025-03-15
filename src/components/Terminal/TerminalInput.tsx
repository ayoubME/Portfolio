import React from 'react';
import { AVAILABLE_COLORS } from '../../constants';
import { TerminalState } from './types';

export function TerminalInput({
  handleSubmit,
  input,
  handleInputChange,
  handleKeyDown,
  inputRef,
  suggestions,
  selectedSuggestion,
  setInput,
  isHackMode,
  terminalColor,
}: TerminalState) {
  return (
    <form onSubmit={handleSubmit} className={`p-2 border-t border-${terminalColor}-500/30`}>
      <div className="flex items-center gap-2">
        <span className={AVAILABLE_COLORS[terminalColor]}>$</span>
        <div className="relative flex-1">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            className={`w-full bg-transparent border-none outline-none ${AVAILABLE_COLORS[terminalColor]} font-mono text-sm ${isHackMode ? 'terminal-text' : ''}`}
            autoFocus
            autoComplete="off"
            spellCheck="false"
          />
          {suggestions.length > 0 && (
            <div
              className={`absolute top-full left-0 w-full bg-black/95 border border-${terminalColor}-500/30 mt-1 z-50`}
            >
              {suggestions.map((suggestion, index) => (
                <div
                  key={suggestion}
                  className={`px-2 py-1 cursor-pointer ${
                    index === selectedSuggestion
                      ? `bg-${terminalColor}-500/20 text-white`
                      : AVAILABLE_COLORS[terminalColor]
                  } ${isHackMode ? 'terminal-text' : ''} hover:bg-${terminalColor}-500/10`}
                  onClick={() => {
                    const parts = input.trim().split(' ');
                    parts[parts.length - 1] = suggestion;
                    setInput(parts.join(' '));
                    inputRef.current?.focus();
                  }}
                >
                  {suggestion}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </form>
  );
}
