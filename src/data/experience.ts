interface IExperience {
    id: string;
    role: string;
    company: string;
    duration: string;
    description: string;
    achievements: string[];
    techStack: string[];
}

const EXPERIENCES: IExperience[] = [
    {
        id: 'exp-1',
        role: 'Senior Full-Stack Developer',
        company: 'Tech Corp',
        duration: 'Jan 2024 – Present',
        description: 'Leading the frontend architecture team and building scalable web applications.',
        achievements: [
            'Architected a micro-frontend system reducing deployment time by 60%',
            'Led migration from REST to GraphQL, improving API performance by 40%',
            'Mentored a team of 4 junior developers',
        ],
        techStack: ['Next.js', 'TypeScript', 'GraphQL', 'AWS'],
    },
    {
        id: 'exp-2',
        role: 'Full-Stack Developer',
        company: 'Startup Inc',
        duration: 'Jun 2022 – Dec 2023',
        description: 'Built and maintained core product features for a fast-growing SaaS startup.',
        achievements: [
            'Developed real-time collaboration features serving 10K+ daily users',
            'Implemented CI/CD pipeline reducing release cycles from weeks to hours',
            'Built a custom analytics dashboard with D3.js visualizations',
        ],
        techStack: ['React', 'Node.js', 'PostgreSQL', 'Docker'],
    },
    {
        id: 'exp-3',
        role: 'Frontend Developer',
        company: 'Agency Studio',
        duration: 'Mar 2021 – May 2022',
        description: 'Crafted pixel-perfect, responsive web experiences for enterprise clients.',
        achievements: [
            'Delivered 15+ client projects on time and within budget',
            'Improved Lighthouse performance scores from 60 to 95+ across all projects',
            'Introduced component-driven development workflow with Storybook',
        ],
        techStack: ['React', 'Tailwind CSS', 'Figma', 'Storybook'],
    },
];

export type { IExperience };
export { EXPERIENCES };
