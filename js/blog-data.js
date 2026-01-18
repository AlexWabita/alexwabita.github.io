// ==========================================
// BLOG DATA & ARTICLES - OPTIMIZED
// ==========================================

const blogArticles = [
    {
        id: 1,
        title: "My Python Learning Journey: From Zero to Building Projects",
        slug: "python-learning-journey-zero-to-projects",
        excerpt: "How I started learning Python as a BSc IT student and built my first portfolio projects. This article covers my approach, resources, and key milestones.",
        content: "Full article content...",
        author: "Alex Wabita",
        date: "2024-01-15",
        readTime: "6 min read",
        category: "Python",
        tags: ["Python", "Learning", "Programming", "Beginner"],
        // Optimized: Added width/height params and format=auto for WebP
        image: "https://images.unsplash.com/photo-1526379879527-8559ecfcaec9?w=600&h=400&fit=crop&auto=format&q=75",
        views: 142,
        likes: 24,
        featured: true
    },
    {
        id: 2,
        title: "AI/ML for Beginners: How I Started Exploring Machine Learning",
        slug: "ai-ml-beginners-getting-started",
        excerpt: "A beginner's guide to starting with Artificial Intelligence and Machine Learning. Sharing my roadmap and resources that helped me.",
        content: "Full article content...",
        author: "Alex Wabita",
        date: "2024-01-10",
        readTime: "8 min read",
        category: "AI/ML",
        tags: ["AI", "Machine Learning", "Python", "Beginners"],
        image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop&auto=format&q=75",
        views: 189,
        likes: 32,
        featured: true
    },
    {
        id: 3,
        title: "Cybersecurity Basics Every Developer Should Know",
        slug: "cybersecurity-basics-for-developers",
        excerpt: "Essential cybersecurity principles and practices for software developers. Learn how to write more secure code.",
        content: "Full article content...",
        author: "Alex Wabita",
        date: "2024-01-05",
        readTime: "7 min read",
        category: "Cybersecurity",
        tags: ["Security", "Development", "Best Practices", "Web"],
        image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&h=400&fit=crop&auto=format&q=75",
        views: 215,
        likes: 41,
        featured: false
    },
    {
        id: 4,
        title: "Building My First Portfolio Website: Lessons Learned",
        slug: "building-first-portfolio-website-lessons",
        excerpt: "Step-by-step guide on creating a modern portfolio website. Covers design decisions, technologies used, and deployment.",
        content: "Full article content...",
        author: "Alex Wabita",
        date: "2024-01-01",
        readTime: "5 min read",
        category: "Web Development",
        tags: ["Portfolio", "HTML/CSS", "JavaScript", "Design"],
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop&auto=format&q=75",
        views: 178,
        likes: 28,
        featured: false
    },
    {
        id: 5,
        title: "Git & GitHub: Essential Workflow for Student Developers",
        slug: "git-github-workflow-student-developers",
        excerpt: "How I use Git and GitHub to manage my coding projects as a student. Tips for effective version control.",
        content: "Full article content...",
        author: "Alex Wabita",
        date: "2023-12-28",
        readTime: "6 min read",
        category: "Tools",
        tags: ["Git", "GitHub", "Version Control", "Workflow"],
        image: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=600&h=400&fit=crop&auto=format&q=75",
        views: 156,
        likes: 19,
        featured: false
    },
    {
        id: 6,
        title: "Learning Linux: My Experience with Kali & Parrot OS",
        slug: "learning-linux-kali-parrot-os",
        excerpt: "My journey of learning Linux for cybersecurity and development. Comparing Kali Linux and Parrot OS.",
        content: "Full article content...",
        author: "Alex Wabita",
        date: "2023-12-25",
        readTime: "9 min read",
        category: "Cybersecurity",
        tags: ["Linux", "Kali", "Parrot OS", "Security"],
        image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=400&fit=crop&auto=format&q=75",
        views: 132,
        likes: 22,
        featured: false
    },
    {
        id: 7,
        title: "Python Automation: Scripts That Saved Me Time",
        slug: "python-automation-time-saving-scripts",
        excerpt: "Practical Python scripts I created to automate repetitive tasks as a student developer.",
        content: "Full article content...",
        author: "Alex Wabita",
        date: "2023-12-20",
        readTime: "7 min read",
        category: "Python",
        tags: ["Python", "Automation", "Scripting", "Productivity"],
        image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=600&h=400&fit=crop&auto=format&q=75",
        views: 167,
        likes: 31,
        featured: false
    },
    {
        id: 8,
        title: "Cloud Computing Basics: AWS & Azure for Students",
        slug: "cloud-computing-basics-aws-azure",
        excerpt: "Getting started with cloud platforms. Understanding AWS and Azure fundamentals for developers.",
        content: "Full article content...",
        author: "Alex Wabita",
        date: "2023-12-15",
        readTime: "8 min read",
        category: "Cloud",
        tags: ["AWS", "Azure", "Cloud", "DevOps"],
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=400&fit=crop&auto=format&q=75",
        views: 145,
        likes: 17,
        featured: false
    }
];

// Categories for filtering
const blogCategories = [
    { id: "all", name: "All Posts", count: 8 },
    { id: "python", name: "Python", count: 2 },
    { id: "ai-ml", name: "AI/ML", count: 1 },
    { id: "web-dev", name: "Web Development", count: 1 },
    { id: "cybersecurity", name: "Cybersecurity", count: 2 },
    { id: "tools", name: "Tools", count: 1 },
    { id: "cloud", name: "Cloud", count: 1 }
];

// Utility functions
const BlogAPI = {
    // Get all articles
    getAllArticles: () => blogArticles,
    
    // Get featured articles
    getFeaturedArticles: () => blogArticles.filter(article => article.featured),
    
    // Get article by slug
    getArticleBySlug: (slug) => blogArticles.find(article => article.slug === slug),
    
    // Get articles by category
    getArticlesByCategory: (category) => {
        if (category === "all") return blogArticles;

        // Map button category IDs to article categories
        const categoryMap = {
            "python": "Python",
            "ai-ml": "AI/ML",
            "web-dev": "Web Development",
            "cybersecurity": "Cybersecurity",
            "tools": "Tools",
            "cloud": "Cloud"
        };

        const mappedCategory = categoryMap[category];
        return blogArticles.filter(article => article.category === mappedCategory);
    },
    
    // Get popular articles
    getPopularArticles: () => {
        return [...blogArticles].sort((a, b) => b.views - a.views).slice(0, 4);
    },
    
    // Get recent articles
    getRecentArticles: () => {
        return [...blogArticles].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 4);
    },
    
    // Get all categories
    getAllCategories: () => blogCategories,
    
    // Increment article views
    incrementViews: (articleId) => {
        const article = blogArticles.find(a => a.id === articleId);
        if (article) {
            article.views += 1;
        }
    },
    
    // Toggle article like
    toggleLike: (articleId) => {
        const article = blogArticles.find(a => a.id === articleId);
        if (article) {
            article.likes += 1;
            return article.likes;
        }
        return null;
    }
};

// Export for use in other files
window.BlogAPI = BlogAPI;

console.log('✅ BlogAPI loaded successfully!');
console.log(`📚 Total articles: ${blogArticles.length}`);