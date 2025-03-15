import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { init } from '@emailjs/browser';
import App from './App.tsx';
import './index.css';
import { LanguageProvider } from './contexts/LanguageContext';
import personalData from './data/personal.json';

// Initialize EmailJS
init('ptEZtTraAv6KW4Qaa');

// Update document title
document.title = `${personalData.general.name} | ${personalData.general.role}`;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </StrictMode>
);
