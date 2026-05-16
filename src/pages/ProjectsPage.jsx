import ProjectsHero from '../components/projects-redesign/ProjectsHero';
import ProjectsGrid from '../components/projects-redesign/ProjectsGrid';
import ProjectsArchive from '../components/projects-redesign/ProjectsArchive';
import ProjectsCTA from '../components/projects-redesign/ProjectsCTA';

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

