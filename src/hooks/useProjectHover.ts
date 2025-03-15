import { useState } from 'react';

export function useProjectHover() {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  const handleProjectHover = (index: number | null) => {
    setHoveredProject(index);
  };

  return {
    hoveredProject,
    handleProjectHover,
  };
}
