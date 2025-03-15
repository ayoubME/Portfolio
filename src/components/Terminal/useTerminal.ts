import { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useCommandExecution } from '../../hooks/useCommandExecution';
import { useAutocomplete } from '../../hooks/useAutocomplete';
import { useCommandHistory } from '../../hooks/useCommandHistory';
import useSound from 'use-sound';
import { TERMINAL_COMMANDS } from '../../constants';
import { Command, TerminalState } from './types';

const KEYBOARD_SOUNDS = [
  'https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3',
  'https://assets.mixkit.co/active_storage/sfx/2570/2570-preview.mp3',
  'https://assets.mixkit.co/active_storage/sfx/2569/2569-preview.mp3',
];

export function useTerminal(): TerminalState {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<Command[]>([]);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isHackMode, setIsHackMode] = useState(false);
  const [terminalColor, setTerminalColor] = useState('green');

  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  const { t, setLanguage } = useLanguage();
  const { executeCommand } = useCommandExecution();
  const {
    suggestions,
    selectedIndex,
    selectNext,
    selectPrevious,
    getCompletion,
    reset: resetAutocomplete,
  } = useAutocomplete(input);
  const { addCommand, navigateHistory, reset: resetHistory } = useCommandHistory();

  const [playKeyPress1] = useSound(KEYBOARD_SOUNDS[0], { volume: 0.2 });
  const [playKeyPress2] = useSound(KEYBOARD_SOUNDS[1], { volume: 0.2 });
  const [playKeyPress3] = useSound(KEYBOARD_SOUNDS[2], { volume: 0.2 });
  const [playEnter] = useSound(
    'https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3',
    { volume: 0.3 }
  );
  const [playError] = useSound(
    'https://assets.mixkit.co/active_storage/sfx/2572/2572-preview.mp3',
    { volume: 0.3 }
  );

  const playRandomKeySound = () => {
    const sounds = [playKeyPress1, playKeyPress2, playKeyPress3];
    const randomSound = sounds[Math.floor(Math.random() * sounds.length)];
    randomSound();
  };

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
      setHistory([{ command: 'help', output: TERMINAL_COMMANDS.help }]);
    }
  }, [isOpen]);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  useEffect(() => {
    document.body.classList.toggle('hack-mode', isHackMode);
    return () => {
      document.body.classList.remove('hack-mode');
    };
  }, [isHackMode]);

  const handleCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim();
    let output = '';
    let success = true;
    playEnter();

    if (trimmedCmd.startsWith('js ') || trimmedCmd.startsWith('cat ')) {
      const result = executeCommand(trimmedCmd);
      output = result.output;
      success = result.success;
    } else {
      switch (trimmedCmd.toLowerCase()) {
        case 'help':
          output = TERMINAL_COMMANDS.help;
          break;
        case 'clear':
          setHistory([]);
          return;
        case 'ls':
          output = TERMINAL_COMMANDS.ls;
          break;
        case 'whoami':
          output = `Name: ${t.about.role}\nRole: ${t.about.role}\nLocation: ${t.about.location}`;
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
          output = `Available colors:\ngreen, red, blue, yellow, purple, cyan, white, orange\n\nUsage: set color <color>`;
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
              success = false;
            }
          } else if (trimmedCmd.startsWith('set color ')) {
            const color = trimmedCmd.split(' ')[2];
            const validColors = [
              'green',
              'red',
              'blue',
              'yellow',
              'purple',
              'cyan',
              'white',
              'orange',
            ];
            if (validColors.includes(color)) {
              setTerminalColor(color);
              output = `Terminal color set to ${color}`;
            } else {
              output = `Invalid color. Available colors: ${validColors.join(', ')}`;
              success = false;
            }
          } else if (trimmedCmd.startsWith('lang ')) {
            const lang = trimmedCmd.split(' ')[1];
            if (lang === 'fr' || lang === 'en') {
              setLanguage(lang);
              output = `Language changed to ${lang === 'fr' ? 'French' : 'English'}`;
            } else {
              output = `Invalid language. Available languages: fr, en`;
              success = false;
            }
          } else {
            output = `Command not found: ${trimmedCmd}. Type 'help' for available commands.`;
            success = false;
          }
      }
    }

    if (!success) playError();
    setHistory(prev => [...prev, { command: cmd, output }]);
    addCommand(cmd);
    resetAutocomplete();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      handleCommand(input);
      setInput('');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    playRandomKeySound();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'Tab':
        e.preventDefault();
        const completion = getCompletion();
        if (completion) {
          setInput(completion);
          playKeyPress3();
        }
        break;
      case 'ArrowUp':
        e.preventDefault();
        if (suggestions.length > 0) {
          selectPrevious();
          playKeyPress1();
        } else {
          const previousCommand = navigateHistory('up');
          if (previousCommand) {
            setInput(previousCommand);
            playKeyPress1();
          }
        }
        break;
      case 'ArrowDown':
        e.preventDefault();
        if (suggestions.length > 0) {
          selectNext();
          playKeyPress1();
        } else {
          const nextCommand = navigateHistory('down');
          setInput(nextCommand);
          playKeyPress1();
        }
        break;
      case 'Enter':
        playEnter();
        break;
      case 'Backspace':
        playKeyPress2();
        break;
      case 'Escape':
        if (suggestions.length > 0) {
          resetAutocomplete();
        } else {
          resetHistory();
          setInput('');
        }
        break;
    }
  };

  return {
    isOpen,
    setIsOpen,
    isFullscreen,
    setIsFullscreen,
    isHackMode,
    setIsHackMode,
    terminalColor,
    setTerminalColor,
    input,
    setInput,
    history,
    setHistory,
    suggestions,
    selectedSuggestion: selectedIndex,
    inputRef,
    terminalRef,
    handleSubmit,
    handleInputChange,
    handleKeyDown,
  };
}
