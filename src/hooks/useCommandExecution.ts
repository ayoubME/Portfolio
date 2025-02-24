import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { usePersonalData } from './usePersonalData';

interface CommandResult {
  success: boolean;
  output: string;
}

export function useCommandExecution() {
  const [lastResult, setLastResult] = useState<CommandResult | null>(null);
  const { t } = useLanguage();
  const personalData = usePersonalData();

  const executeJavaScript = (code: string): CommandResult => {
    try {
      // Create a sandbox environment with limited access
      const sandbox = {
        console: {
          log: (...args: any[]) => args.join(' '),
          error: (...args: any[]) => args.join(' '),
        },
        Math,
        Date,
        Array,
        Object,
        String,
        Number,
        Boolean,
        RegExp,
      };

      // Create a function in the sandbox context
      const func = new Function(...Object.keys(sandbox), `return ${code}`);
      
      // Execute the function with sandbox context
      const result = func(...Object.values(sandbox));
      
      setLastResult({
        success: true,
        output: String(result)
      });

      return {
        success: true,
        output: String(result)
      };
    } catch (error) {
      const errorResult = {
        success: false,
        output: `Error: ${error.message}`
      };
      
      setLastResult(errorResult);
      return errorResult;
    }
  };

  const getCatOutput = (section: string): CommandResult => {
    switch (section.toLowerCase()) {
      case 'profile':
        return {
          success: true,
          output: `
Name: ${personalData.name}
Role: ${t.about.role}
Location: ${t.about.location}
Email: ${personalData.email}
GitHub: ${personalData.github}
LinkedIn: ${personalData.linkedin}

Bio:
${personalData.bio}

Skills:
Frontend: ${personalData.skills.frontend.join(', ')}
Backend: ${personalData.skills.backend.join(', ')}
Tools: ${personalData.skills.tools.join(', ')}
`
        };
      case 'experience':
        return {
          success: true,
          output: Object.entries(personalData.experience.roles)
            .map(([key, role]) => `
${role.title} (${role.period})
${role.description}
`)
            .join('\n')
        };
      case 'projects':
        return {
          success: true,
          output: personalData.projects
            .map(project => `
${project.title}
Description: ${project.description}
Technologies: ${project.tech.join(', ')}
Link: ${project.link}
`)
            .join('\n')
        };
      default:
        return {
          success: false,
          output: `Error: Section '${section}' not found. Available sections: profile, experience, projects`
        };
    }
  };

  const executeCommand = (command: string): CommandResult => {
    if (command.startsWith('js ')) {
      const jsCode = command.slice(3);
      return executeJavaScript(jsCode);
    }

    if (command.startsWith('cat ')) {
      const section = command.slice(4).trim();
      return getCatOutput(section);
    }

    return {
      success: false,
      output: 'Command not recognized'
    };
  };

  return {
    executeCommand,
    lastResult
  };
}