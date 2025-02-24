import { useLanguage } from '../contexts/LanguageContext';
import personalData from '../data/personal.json';

export function usePersonalData() {
  const { language } = useLanguage();
  
  return {
    ...personalData.general,
    ...personalData[language],
  };
}