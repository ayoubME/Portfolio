import React, { useState, useEffect, useRef } from 'react';
import { Terminal as TerminalIcon, MonitorOff, Monitor } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import useSound from 'use-sound';
import { useCommandExecution } from '../hooks/useCommandExecution';
import { AVAILABLE_COMMANDS, AVAILABLE_COLORS, KEYBOARD_SOUNDS, TERMINAL_COMMANDS } from '../constants';

interface Command {
  command: string;
  output: string;
}

export function Terminal() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<Command[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [selectedSuggestion, setSelectedSuggestion] = useState(-1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isHackMode, setIsHackMode] = useState(false);
  const [terminalColor, setTerminalColor] = useState<keyof typeof AVAILABLE_COLORS>('green');
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const { t, setLanguage } = useLanguage();
  const { executeCommand } = useCommandExecution();

  const [playKeyPress1] = useSound(KEYBOARD_SOUNDS[0], { volume: 0.2 });
  const [playKeyPress2] = useSound(KEYBOARD_SOUNDS[1], { volume: 0.2 });
  const [playKeyPress3] = useSound(KEYBOARD_SOUNDS[2], { volume: 0.2 });
  const [playEnter] = useSound('https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3', { volume: 0.3 });
  const [playError] = useSound('https://assets.mixkit.co/active_storage/sfx/2572/2572-preview.mp3', { volume: 0.3 });

  const playRandomKeySound = () => {
    const sounds = [playKeyPress1, playKeyPress2, playKeyPress3];
    const randomSound = sounds[Math.floor(Math.random() * sounds.length)];
    randomSound();
  };

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
      addToHistory({ 
        command: 'help', 
        output: TERMINAL_COMMANDS.help 
      });
    }
  }, [isOpen]);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  useEffect(() => {
    if (isHackMode) {
      document.body.classList.add('hack-mode');
    } else {
      document.body.classList.remove('hack-mode');
    }
    return () => {
      document.body.classList.remove('hack-mode');
    };
  }, [isHackMode]);

  useEffect(() => {
    if (input.length > 0) {
      const matchingCommands = [...AVAILABLE_COMMANDS, 'js'].filter(
        cmd => cmd.startsWith(input.toLowerCase())
      );
      setSuggestions(matchingCommands);
      setSelectedSuggestion(-1);
    } else {
      setSuggestions([]);
    }
  }, [input]);

  const addToHistory = (cmd: Command) => {
    setHistory(prev => [...prev, cmd]);
  };

  const handleCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim();
    let output = '';
    playEnter();

    if (trimmedCmd.startsWith('js ')) {
      const result = executeCommand(trimmedCmd);
      output = result.output;
      if (!result.success) {
        playError();
      }
    } else if (trimmedCmd.startsWith('set color')) {
      const color = trimmedCmd.split(' ')[2] as keyof typeof AVAILABLE_COLORS;
      if (AVAILABLE_COLORS[color]) {
        setTerminalColor(color);
        output = `Terminal color set to ${color}`;
      } else {
        output = `Invalid color. Type "set color" for available colors`;
        playError();
      }
    } else if (trimmedCmd.startsWith('lang ')) {
      const lang = trimmedCmd.split(' ')[1];
      if (lang === 'fr' || lang === 'en') {
        setLanguage(lang);
        output = `Language changed to ${lang === 'fr' ? 'French' : 'English'}`;
      } else {
        output = `Invalid language. Available languages: fr, en`;
        playError();
      }
    } else {
      switch (trimmedCmd.toLowerCase()) {
        case 'help':
          output = TERMINAL_COMMANDS.help + '\n\nNew command:\n  js         - Execute JavaScript code (e.g., js 2 + 2)';
          break;
        case 'clear':
          setHistory([]);
          return;
        case 'ls':
          output = TERMINAL_COMMANDS.ls;
          break;
        case 'whoami':
          output = `Name: Thomas Dubois\nRole: ${t.about.role}\nLocation: ${t.about.location}`;
          break;
        case 'contact':
          output = 'Email: thomas@example.com\nGitHub: github.com/thomasdubois';
          break;
        case 'switch':
          setIsFullscreen(!isFullscreen);
          output = `Switching to ${isFullscreen ? 'windowed' : 'fullscreen'} mode...`;
          break;
        case 'hack_mode':
          setIsHackMode(!isHackMode);
          output = 'Initializing hack mode...';
          break;
        case 'set':
          output = 'Usage: set color <color>\nType "set color" for available colors';
          break;
        case 'set color':
          output = `Available colors:\n${Object.keys(AVAILABLE_COLORS).join(', ')}\n\nUsage: set color <color>`;
          break;
        case 'exit':
          setIsOpen(false);
          return;
        default:
          if (trimmedCmd.startsWith('cd ')) {
            const section = trimmedCmd.split(' ')[1];
            const element = document.getElementById(section);
            if (element) {
              element.scrollIntoView({ behavior: 'smooth' });
              output = `Navigating to ${section}...`;
            } else {
              output = `Section '${section}' not found`;
              playError();
            }
          } else {
            output = `Command not found: ${trimmedCmd}. Type 'help' for available commands.`;
            playError();
          }
      }
    }

    addToHistory({ command: cmd, output });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      handleCommand(input);
      setInput('');
      setSuggestions([]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      playEnter();
    } else if (e.key === 'Backspace') {
      playKeyPress2();
    } else if (e.key === 'Tab') {
      e.preventDefault();
      playKeyPress3();
      if (suggestions.length > 0) {
        if (selectedSuggestion === -1) {
          setInput(suggestions[0]);
        } else {
          setInput(suggestions[selectedSuggestion]);
        }
      }
    } else if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      e.preventDefault();
      playKeyPress1();
      if (suggestions.length > 0) {
        let newIndex = selectedSuggestion;
        if (e.key === 'ArrowUp') {
          newIndex = selectedSuggestion <= 0 ? suggestions.length - 1 : selectedSuggestion - 1;
        } else {
          newIndex = selectedSuggestion >= suggestions.length - 1 ? 0 : selectedSuggestion + 1;
        }
        setSelectedSuggestion(newIndex);
        setInput(suggestions[newIndex]);
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    playRandomKeySound();
  };

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
    ${isFullscreen ? "fixed inset-0" : "fixed bottom-4 right-4 w-[90vw] md:w-[600px] h-[400px]"}
    ${isHackMode ? 'terminal-crt' : 'bg-black/95'}
    border border-${terminalColor}-500
    ${!isFullscreen ? 'rounded-lg shadow-xl' : ''}
    overflow-hidden
  `;

  return (
    <div className={terminalClasses}>
      {isHackMode && <div className="scanline" />}
      <div className={`flex items-center justify-between p-2 border-b border-${terminalColor}-500/30`}>
        <div className="flex items-center gap-2">
          <TerminalIcon className={`w-4 h-4 ${AVAILABLE_COLORS[terminalColor]} ${isHackMode ? 'glitch-effect' : ''}`} />
          <span className={`text-sm font-mono ${AVAILABLE_COLORS[terminalColor]} ${isHackMode ? 'terminal-text' : ''}`}>Terminal</span>
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
            <div className="text-white/80 whitespace-pre-wrap ml-4 mt-1">
              {item.output}
            </div>
          </div>
        ))}
      </div>

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
            />
            {suggestions.length > 0 && (
              <div className={`absolute top-full left-0 w-full bg-black/95 border border-${terminalColor}-500/30 mt-1`}>
                {suggestions.map((suggestion, index) => (
                  <div
                    key={suggestion}
                    className={`px-2 py-1 cursor-pointer ${
                      index === selectedSuggestion ? `bg-${terminalColor}-500/20 text-white` : AVAILABLE_COLORS[terminalColor]
                    } ${isHackMode ? 'terminal-text' : ''}`}
                    onClick={() => {
                      setInput(suggestion);
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
    </div>
  );
}