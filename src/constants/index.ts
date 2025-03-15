export const AVAILABLE_COMMANDS = [
  'help',
  'clear',
  'ls',
  'cd',
  'cat',
  'whoami',
  'contact',
  'projects',
  'switch',
  'hack_mode',
  'set',
  'lang',
  'js',
  'exit',
] as const;

export const AVAILABLE_COLORS = {
  green: 'text-green-500',
  red: 'text-red-500',
  blue: 'text-blue-500',
  yellow: 'text-yellow-500',
  purple: 'text-purple-500',
  cyan: 'text-cyan-500',
  white: 'text-white',
  orange: 'text-orange-500',
} as const;

export const KEYBOARD_SOUNDS = [
  'https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3', // Standard key
  'https://assets.mixkit.co/active_storage/sfx/2570/2570-preview.mp3', // Space bar
  'https://assets.mixkit.co/active_storage/sfx/2569/2569-preview.mp3', // Alternate key
] as const;

export const TERMINAL_COMMANDS = {
  help: `Available commands:
  help       - Show this help message
  clear      - Clear terminal
  ls         - List all sections
  cd         - Navigate to section (e.g., cd profile)
  cat        - Show section content
  whoami     - Show author info
  contact    - Show contact information
  projects   - List all projects
  switch     - Toggle between terminal and GUI
  hack_mode  - ???
  set        - Set terminal options (e.g., set color red)
  lang       - Change language (e.g., lang fr, lang en)
  js         - Execute JavaScript code (e.g., js 2 + 2)
  exit       - Close terminal`,
  ls: `Sections:
  ~/accueil
  ~/profile
  ~/experience
  ~/projets
  ~/contact`,
} as const;
