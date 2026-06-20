import ProjectsHero from '@/features/Projects/ProjectsHero';
import ProjectsGrid from '@/features/Projects/ProjectsGrid';

import ProjectsCTA from '@/features/Projects/ProjectsCTA';

const ProjectsPage = ({ onProjectSelect }) => {
  return (
    <div className="bg-black">
      <ProjectsHero />
      <ProjectsGrid onProjectSelect={onProjectSelect} />
      <ProjectsCTA />
    </div>
  );
};


export default ProjectsPage;


