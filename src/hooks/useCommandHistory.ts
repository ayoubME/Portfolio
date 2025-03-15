import { useState } from 'react';

export function useCommandHistory() {
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const addCommand = (command: string) => {
    if (command.trim()) {
      setCommandHistory(prev => [...prev, command]);
      setHistoryIndex(-1);
    }
  };

  const navigateHistory = (direction: 'up' | 'down'): string => {
    if (commandHistory.length === 0) return '';

    let newIndex = historyIndex;

    if (direction === 'up') {
      // If we're not in history yet, start from the end
      if (historyIndex === -1) {
        newIndex = commandHistory.length - 1;
      } else {
        // Move up in history (towards older commands)
        newIndex = Math.max(0, historyIndex - 1);
      }
    } else {
      // Move down in history (towards newer commands)
      if (historyIndex === -1) return '';
      newIndex = historyIndex + 1;
      if (newIndex >= commandHistory.length) {
        newIndex = -1;
        return '';
      }
    }

    setHistoryIndex(newIndex);
    return newIndex === -1 ? '' : commandHistory[newIndex];
  };

  const reset = () => {
    setHistoryIndex(-1);
  };

  return {
    addCommand,
    navigateHistory,
    reset,
    historyIndex,
  };
}
