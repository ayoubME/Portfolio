import { RefObject } from 'react';

export interface Command {
  command: string;
  output: string;
}

export interface TerminalState {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  isFullscreen: boolean;
  setIsFullscreen: (isFullscreen: boolean) => void;
  isHackMode: boolean;
  setIsHackMode: (isHackMode: boolean) => void;
  terminalColor: string;
  setTerminalColor: (color: string) => void;
  input: string;
  setInput: (input: string) => void;
  history: Command[];
  setHistory: (history: Command[]) => void;
  suggestions: string[];
  setSuggestions: (suggestions: string[]) => void;
  selectedSuggestion: number;
  setSelectedSuggestion: (index: number) => void;
  inputRef: RefObject<HTMLInputElement>;
  terminalRef: RefObject<HTMLDivElement>;
  handleSubmit: (e: React.FormEvent) => void;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleKeyDown: (e: React.KeyboardEvent) => void;
}
