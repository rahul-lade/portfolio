import projectsConfig from '@/configs/projects.json';

interface IProject {
    id: string;
    title: string;
    description: string;
    longDescription: string;
    techStack: string[];
    liveUrl?: string;
    githubUrl?: string;
    image: string;
    featured: boolean;
    category: string;
}

const PROJECTS: IProject[] = projectsConfig;

const CATEGORIES = [...new Set(PROJECTS.map((p) => p.category))];

export type { IProject };
export { PROJECTS, CATEGORIES };
