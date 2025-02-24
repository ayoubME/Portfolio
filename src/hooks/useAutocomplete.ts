import { useState, useEffect } from 'react';
import { AVAILABLE_COMMANDS } from '../constants';

interface AutocompleteState {
  suggestions: string[];
  selectedIndex: number;
}

export function useAutocomplete(input: string) {
  const [state, setState] = useState<AutocompleteState>({
    suggestions: [],
    selectedIndex: -1
  });

  useEffect(() => {
    if (input.trim()) {
      const parts = input.trim().split(' ');
      const lastWord = parts[parts.length - 1].toLowerCase();
      
      let suggestions: string[] = [];
      
      // Handle different command contexts
      if (parts.length === 1) {
        // Base command completion
        suggestions = AVAILABLE_COMMANDS.filter(cmd => 
          cmd.toLowerCase().startsWith(lastWord)
        );
      } else {
        // Argument completion based on command
        const command = parts[0].toLowerCase();
        switch (command) {
          case 'cd':
          case 'cat':
            suggestions = ['accueil', 'profile', 'experience', 'projects', 'contact']
              .filter(section => section.toLowerCase().startsWith(lastWord));
            break;
          case 'set':
            if (parts[1] === 'color') {
              suggestions = ['green', 'red', 'blue', 'yellow', 'purple', 'cyan', 'white', 'orange']
                .filter(color => color.toLowerCase().startsWith(lastWord));
            }
            break;
          case 'lang':
            suggestions = ['fr', 'en']
              .filter(lang => lang.toLowerCase().startsWith(lastWord));
            break;
          default:
            suggestions = [];
        }
      }

      setState(prev => ({
        ...prev,
        suggestions,
        selectedIndex: suggestions.length > 0 ? 0 : -1
      }));
    } else {
      setState({ suggestions: [], selectedIndex: -1 });
    }
  }, [input]);

  const selectNext = () => {
    setState(prev => ({
      ...prev,
      selectedIndex: prev.selectedIndex < prev.suggestions.length - 1 
        ? prev.selectedIndex + 1 
        : 0
    }));
  };

  const selectPrevious = () => {
    setState(prev => ({
      ...prev,
      selectedIndex: prev.selectedIndex > 0 
        ? prev.selectedIndex - 1 
        : prev.suggestions.length - 1
    }));
  };

  const getCompletion = () => {
    if (state.selectedIndex >= 0 && state.suggestions[state.selectedIndex]) {
      const parts = input.trim().split(' ');
      parts[parts.length - 1] = state.suggestions[state.selectedIndex];
      return parts.join(' ');
    }
    return input;
  };

  const reset = () => {
    setState({ suggestions: [], selectedIndex: -1 });
  };

  return {
    suggestions: state.suggestions,
    selectedIndex: state.selectedIndex,
    selectNext,
    selectPrevious,
    getCompletion,
    reset
  };
}