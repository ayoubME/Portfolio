// Define common types used across the application
export interface PersonalData {
  name: string;
  role: string;
  location: string;
  email: string;
  github: string;
  linkedin: string;
  twitter: string;
  bio: string;
  skills: {
    frontend: string[];
    backend: string[];
    tools: string[];
  };
  stats: {
    experience: number;
    projects: number;
  };
  experience: {
    roles: {
      [key: string]: {
        title: string;
        period: string;
        description: string;
      };
    };
  };
  projects: Array<{
    title: string;
    description: string;
    image: string;
    tech: string[];
    link: string;
  }>;
}

export interface Language {
  nav: {
    home: string;
    profile: string;
    experience: string;
    projects: string;
    contact: string;
  };
  hero: {
    title: string;
    role: string;
    cta: {
      contact: string;
      projects: string;
    };
  };
  about: {
    title: string;
    role: string;
    location: string;
    bio: string;
    stats: {
      experience: string;
      projects: string;
    };
  };
  skills: {
    title: string;
    frontend: string;
    backend: string;
    tools: string;
  };
  experience: {
    title: string;
    present: string;
    roles: {
      [key: string]: {
        title: string;
        period: string;
        description: string;
      };
    };
  };
  projects: {
    title: string;
    viewDemo: string;
    viewCode: string;
  };
  contact: {
    title: string;
    form: {
      name: string;
      email: string;
      message: string;
      send: string;
      sending: string;
      success: string;
      error: string;
    };
  };
  footer: {
    rights: string;
  };
}