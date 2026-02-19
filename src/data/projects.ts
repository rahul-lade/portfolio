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

const PROJECTS: IProject[] = [
    {
        id: 'project-1',
        title: 'E-Commerce Platform',
        description: 'A modern full-stack e-commerce platform with real-time inventory management and AI-powered recommendations.',
        longDescription: 'Built a scalable e-commerce solution handling thousands of concurrent users with real-time stock updates, personalized product recommendations, and seamless payment integration.',
        techStack: ['Next.js', 'TypeScript', 'PostgreSQL', 'Stripe', 'Redis', 'Tailwind CSS'],
        liveUrl: 'https://example.com',
        githubUrl: 'https://github.com',
        image: '/projects/ecommerce.png',
        featured: true,
        category: 'Full-Stack',
    },
    {
        id: 'project-2',
        title: 'Task Management Dashboard',
        description: 'Real-time collaborative task management tool with drag-and-drop boards and team analytics.',
        longDescription: 'Designed and developed a project management tool featuring Kanban boards, real-time collaboration via WebSockets, and comprehensive team productivity analytics.',
        techStack: ['React', 'Node.js', 'Socket.io', 'MongoDB', 'Framer Motion'],
        liveUrl: 'https://example.com',
        githubUrl: 'https://github.com',
        image: '/projects/taskmanager.png',
        featured: true,
        category: 'Full-Stack',
    },
    {
        id: 'project-3',
        title: 'AI Content Generator',
        description: 'SaaS tool that leverages LLMs to generate marketing copy, blog posts, and social media content.',
        longDescription: 'Built an AI-powered content generation platform with template management, tone customization, and multi-language support using OpenAI APIs.',
        techStack: ['Next.js', 'OpenAI API', 'Prisma', 'PostgreSQL', 'Tailwind CSS'],
        liveUrl: 'https://example.com',
        githubUrl: 'https://github.com',
        image: '/projects/aicontent.png',
        featured: true,
        category: 'AI/ML',
    },
    {
        id: 'project-4',
        title: 'Portfolio Website',
        description: 'This very portfolio — a dark-themed, animated developer showcase built with Next.js and Framer Motion.',
        longDescription: 'A modern portfolio featuring glassmorphism effects, scroll-triggered animations, bento grid layouts, and border beam effects.',
        techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
        githubUrl: 'https://github.com',
        image: '/projects/portfolio.png',
        featured: false,
        category: 'Frontend',
    },
    {
        id: 'project-5',
        title: 'Real-Time Chat App',
        description: 'End-to-end encrypted messaging app with group chats, file sharing, and video calls.',
        longDescription: 'A real-time messaging platform with WebSocket-based communication, end-to-end encryption, and media sharing capabilities.',
        techStack: ['React', 'Express', 'Socket.io', 'WebRTC', 'MongoDB'],
        githubUrl: 'https://github.com',
        image: '/projects/chatapp.png',
        featured: false,
        category: 'Full-Stack',
    },
    {
        id: 'project-6',
        title: 'Weather Dashboard',
        description: 'Beautiful weather visualization app with location-based forecasts and interactive charts.',
        longDescription: 'A weather dashboard with animated visualizations, 7-day forecasts, and location-based weather alerts using multiple weather APIs.',
        techStack: ['React', 'D3.js', 'OpenWeather API', 'Tailwind CSS'],
        liveUrl: 'https://example.com',
        image: '/projects/weather.png',
        featured: false,
        category: 'Frontend',
    },
];

export type { IProject };
export { PROJECTS };
