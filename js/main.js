// ==========================================
// NAVIGATION FUNCTIONALITY
// ==========================================

// Mobile Menu Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
});

// Close mobile menu when clicking a nav link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// ==========================================
// NAVBAR SCROLL EFFECT
// ==========================================

const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Add shadow when scrolled
    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// ==========================================
// ACTIVE NAV LINK ON SCROLL
// ==========================================

function updateActiveNavLink() {
    const sections = document.querySelectorAll('.section');
    const scrollPosition = window.scrollY + 200; // Increased offset for better detection
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        // Check if we're in this section
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            currentSection = sectionId;
        }
    });
    
    // Update nav links
    if (currentSection) {
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }
}

// Update on scroll with throttle
window.addEventListener('scroll', throttle(updateActiveNavLink, 50));

// Update on page load
window.addEventListener('load', updateActiveNavLink);

// Update after smooth scroll completes
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        setTimeout(updateActiveNavLink, 800);
    });
});

// ==========================================
// SMOOTH SCROLL
// ==========================================

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ==========================================
// THEME TOGGLE
// ==========================================

const themeToggle = document.getElementById('themeToggle');
const themeIcon = themeToggle.querySelector('.theme-icon');

// Check for saved theme preference or default to dark
const currentTheme = localStorage.getItem('theme') || 'dark';
document.body.classList.toggle('light-theme', currentTheme === 'light');
themeIcon.textContent = currentTheme === 'light' ? '☀️' : '🌙';

themeToggle.addEventListener('click', () => {
    const isLight = document.body.classList.toggle('light-theme');
    const newTheme = isLight ? 'light' : 'dark';
    
    localStorage.setItem('theme', newTheme);
    themeIcon.textContent = isLight ? '☀️' : '🌙';
});

// ==========================================
// SCROLL REVEAL ANIMATIONS
// ==========================================

const revealElements = document.querySelectorAll('.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
});

revealElements.forEach(element => {
    revealObserver.observe(element);
});

// ==========================================
// UTILITY FUNCTIONS
// ==========================================

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ==========================================
// LOADING ANIMATION
// ==========================================

window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// ==========================================
// CONSOLE MESSAGE (Easter Egg)
// ==========================================

console.log(
    '%c👋 Hey there, curious developer!',
    'color: #00d9ff; font-size: 20px; font-weight: bold;'
);
console.log(
    '%cLike what you see? Let\'s connect!',
    'color: #7c3aed; font-size: 14px;'
);
console.log(
    '%c📧 njerialexwabita@gmail.com',
    'color: #10b981; font-size: 12px;'
);

// ==========================================
// PERFORMANCE MONITORING (Optional)
// ==========================================

if (window.performance) {
    window.addEventListener('load', () => {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log(`⚡ Page loaded in ${pageLoadTime}ms`);
    });
}

// ==========================================
// HERO TYPING EFFECT
// ==========================================

const typingText = document.getElementById('typingText');

if (typingText) {
    const roles = [
        'System Developer',
        'Python Developer',
        'AI & ML Enthusiast',
        'Web Developer',
        'Cybersecurity Learner',
        'Problem Solver'
    ];
    
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    function typeRole() {
        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            typingText.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typingText.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }
        
        if (!isDeleting && charIndex === currentRole.length) {
            // Pause at end before deleting
            typingSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            // Move to next role
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typingSpeed = 500;
        }
        
        setTimeout(typeRole, typingSpeed);
    }
    
    // Start typing effect after a brief delay
    setTimeout(typeRole, 1000);
}

// ==========================================
// SCROLL INDICATOR CLICK
// ==========================================

const scrollIndicator = document.querySelector('.scroll-indicator');

if (scrollIndicator) {
    scrollIndicator.addEventListener('click', () => {
        const aboutSection = document.getElementById('about');
        if (aboutSection) {
            aboutSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
}

// ==========================================
// ANIMATED COUNTER FOR STATS
// ==========================================

function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
}

// Observe stat cards and trigger animation
const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumber = entry.target.querySelector('.stat-number');
            if (statNumber && !statNumber.classList.contains('animated')) {
                const target = parseInt(statNumber.getAttribute('data-target'));
                animateCounter(statNumber, target);
                statNumber.classList.add('animated');
            }
        }
    });
}, {
    threshold: 0.5
});

// Observe all stat cards
document.querySelectorAll('.stat-card').forEach(card => {
    statObserver.observe(card);
});

// ==========================================
// SKILLS FILTER
// ==========================================

const filterBtns = document.querySelectorAll('.filter-btn');
const skillCards = document.querySelectorAll('.skill-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');
        
        const filter = btn.getAttribute('data-filter');
        
        skillCards.forEach(card => {
            if (filter === 'all') {
                card.classList.remove('hidden');
            } else {
                const category = card.getAttribute('data-category');
                if (category === filter) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            }
        });
    });
});

// ==========================================
// ANIMATE SKILL PROGRESS BARS
// ==========================================

const progressObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressFill = entry.target.querySelector('.progress-fill');
            if (progressFill && !progressFill.classList.contains('animated')) {
                const targetWidth = progressFill.getAttribute('data-progress');
                progressFill.style.setProperty('--target-width', `${targetWidth}%`);
                progressFill.classList.add('animated');
            }
        }
    });
}, {
    threshold: 0.3
});

// Observe all skill cards for progress animation
skillCards.forEach(card => {
    progressObserver.observe(card);
});

// ==========================================
// PROJECTS - LOAD FROM GITHUB
// ==========================================

// Language colors for badges
const languageColors = {
    'Python': '#3776AB',
    'JavaScript': '#F7DF1E',
    'HTML': '#E34F26',
    'CSS': '#1572B6',
    'TypeScript': '#3178C6',
    'Java': '#007396',
    'C': '#A8B9CC',
    'C++': '#00599C',
    'Shell': '#89E051',
    'Jupyter Notebook': '#DA5B0B'
};

// Create project card HTML
function createProjectCard(repo, isFeatured = false) {
    const language = repo.language || 'Code';
    const languageColor = languageColors[language] || '#6b7280';
    const topics = repo.topics || [];
    
    return `
        <div class="project-card ${isFeatured ? 'featured' : ''} scroll-reveal">
            <div class="project-header">
                <h3 class="project-title">
                    <a href="${repo.url}" target="_blank" rel="noopener noreferrer">
                        ${repo.name}
                    </a>
                </h3>
                ${isFeatured ? '<span class="featured-badge">Featured</span>' : ''}
            </div>
            
            <p class="project-description">
                ${repo.description || 'No description available'}
            </p>
            
            ${topics.length > 0 ? `
                <div class="project-tech">
                    ${topics.slice(0, 4).map(topic => 
                        `<span class="tech-tag">${topic}</span>`
                    ).join('')}
                </div>
            ` : ''}
            
            <div class="project-stats">
                ${language ? `
                    <span class="language-tag">
                        <span class="language-dot" style="background-color: ${languageColor}"></span>
                        ${language}
                    </span>
                ` : ''}
                <span class="stat-item">⭐ ${repo.stars}</span>
                <span class="stat-item">🔱 ${repo.forks}</span>
            </div>
            
            <div class="project-links">
                <a href="${repo.url}" target="_blank" rel="noopener noreferrer" class="project-link primary">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
                    </svg>
                    View Code
                </a>
                ${repo.homepage ? `
                    <a href="${repo.homepage}" target="_blank" rel="noopener noreferrer" class="project-link">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor">
                            <path d="M10 2L14 6L10 10" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M14 6H2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        Live Demo
                    </a>
                ` : ''}
            </div>
        </div>
    `;
}

// Load projects from GitHub
async function loadProjects() {
    const featuredContainer = document.getElementById('featuredProjects');
    const allContainer = document.getElementById('allProjects');
    
    try {
        // Load featured (pinned) repos
        const featuredRepos = await window.GitHubAPI.fetchPinnedRepos();
        
        if (featuredRepos.length > 0) {
            featuredContainer.innerHTML = featuredRepos
                .map(repo => createProjectCard(repo, true))
                .join('');
        } else {
            featuredContainer.innerHTML = '<p class="loading-state">No pinned repositories found</p>';
        }
        
        // Load all repos
        const allRepos = await window.GitHubAPI.fetchRepos({ 
            sort: 'updated', 
            per_page: 12 
        });
        
        if (allRepos.length > 0) {
            // Store repos globally for sorting
            window.projectsData = allRepos;
            
            allContainer.innerHTML = allRepos
                .map(repo => createProjectCard(repo, false))
                .join('');
            
            // Setup sort functionality AFTER data is loaded
            setupProjectSorting();
        } else {
            allContainer.innerHTML = '<div class="error-state"><h4>No repositories found</h4><p>Check back soon for new projects!</p></div>';
        }
        
        // Re-observe scroll reveal elements
        document.querySelectorAll('.scroll-reveal').forEach(el => {
            if (!el.classList.contains('revealed')) {
                revealObserver.observe(el);
            }
        });
        
    } catch (error) {
        console.error('Error loading projects:', error);
        featuredContainer.innerHTML = '<div class="error-state"><h4>Failed to load projects</h4><p>Please check your internet connection and try again.</p></div>';
        allContainer.innerHTML = '';
    }
}

// Sort projects function
function setupProjectSorting() {
    const sortBtns = document.querySelectorAll('.sort-btn');
    
    sortBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            sortBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const sortType = btn.getAttribute('data-sort');
            const allContainer = document.getElementById('allProjects');
            
            if (!window.projectsData || window.projectsData.length === 0) {
                console.error('No projects data available');
                return;
            }
            
            let sortedRepos = [...window.projectsData];
            
            switch(sortType) {
                case 'stars':
                    sortedRepos.sort((a, b) => b.stars - a.stars);
                    break;
                case 'name':
                    sortedRepos.sort((a, b) => a.name.localeCompare(b.name));
                    break;
                case 'updated':
                default:
                    sortedRepos.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
                    break;
            }
            
            allContainer.innerHTML = sortedRepos
                .map(repo => createProjectCard(repo, false))
                .join('');
            
            // Re-observe new elements for scroll animations
            allContainer.querySelectorAll('.scroll-reveal').forEach(el => {
                revealObserver.observe(el);
            });
        });
    });
}

// Load projects when page loads
document.addEventListener('DOMContentLoaded', () => {
    loadProjects();
});

// ==========================================
// CONTACT FORM HANDLING
// ==========================================

const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };
        
        // Show loading state
        const submitBtn = contactForm.querySelector('.submit-btn');
        const btnText = submitBtn.querySelector('.btn-text');
        const btnLoading = submitBtn.querySelector('.btn-loading');
        
        btnText.style.display = 'none';
        btnLoading.style.display = 'flex';
        submitBtn.disabled = true;
        
        // Hide previous messages
        formMessage.classList.remove('success', 'error');
        formMessage.style.display = 'none';
        
        try {
            // Simulate sending (replace with actual email service like Formspree, EmailJS, etc.)
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // For now, just open email client
            const mailtoLink = `mailto:njerialexwabita@gmail.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(
                `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
            )}`;
            window.location.href = mailtoLink;
            
            // Show success message
            formMessage.textContent = 'Thank you! Your message has been prepared. Your email client should open shortly.';
            formMessage.classList.add('success');
            formMessage.style.display = 'block';
            
            // Reset form
            contactForm.reset();
            
        } catch (error) {
            console.error('Form submission error:', error);
            formMessage.textContent = 'Oops! Something went wrong. Please try emailing me directly.';
            formMessage.classList.add('error');
            formMessage.style.display = 'block';
        } finally {
            // Reset button state
            btnText.style.display = 'inline';
            btnLoading.style.display = 'none';
            submitBtn.disabled = false;
        }
    });
}

// ==========================================
// BACK TO TOP BUTTON
// ==========================================

const backToTopBtn = document.getElementById('backToTop');

// Show/hide button based on scroll position
window.addEventListener('scroll', throttle(() => {
    if (window.pageYOffset > 500) {
        backToTopBtn.classList.add('visible');
    } else {
        backToTopBtn.classList.remove('visible');
    }
}, 100));

// Scroll to top when clicked
backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ==========================================
// BLOG FUNCTIONALITY
// ==========================================

let currentBlogFilter = 'all';
let currentBlogSort = 'recent';
let visibleBlogsCount = 6;

// Format date function
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

// Create blog card HTML
function createBlogCard(article, isFeatured = false) {
    return `
        <div class="blog-card ${isFeatured ? 'featured' : ''} scroll-reveal">
            <div class="blog-image">
                <img src="${article.image}" alt="${article.title}" loading="lazy">
                <span class="blog-category">${article.category}</span>
            </div>
            
            <div class="blog-content">
                <div class="blog-meta">
                    <span class="blog-date">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke-width="2"/>
                            <line x1="16" y1="2" x2="16" y2="6" stroke-width="2"/>
                            <line x1="8" y1="2" x2="8" y2="6" stroke-width="2"/>
                            <line x1="3" y1="10" x2="21" y2="10" stroke-width="2"/>
                        </svg>
                        ${formatDate(article.date)}
                    </span>
                    <span class="read-time">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <circle cx="12" cy="12" r="10" stroke-width="2"/>
                            <polyline points="12 6 12 12 16 14" stroke-width="2"/>
                        </svg>
                        ${article.readTime}
                    </span>
                </div>
                
                <h3 class="blog-title">
                    <a href="blog-post.html?slug=${article.slug}" class="blog-link">
                        ${article.title}
                    </a>
                </h3>
                
                <p class="blog-excerpt">${article.excerpt}</p>
                
                ${article.tags.length > 0 ? `
                    <div class="blog-tags">
                        ${article.tags.slice(0, 3).map(tag => 
                            `<span class="blog-tag">${tag}</span>`
                        ).join('')}
                    </div>
                ` : ''}
                
                <div class="blog-stats">
                    <span class="stat-item">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke-width="2"/>
                            <circle cx="12" cy="12" r="3" stroke-width="2"/>
                        </svg>
                        ${article.views} views
                    </span>
                    <button class="like-btn" data-id="${article.id}">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" stroke-width="2"/>
                        </svg>
                        ${article.likes} likes
                    </button>
                </div>
                
                <a href="blog-post.html?slug=${article.slug}" class="read-more-btn">
                    Read Article
                    <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                        <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </a>
            </div>
        </div>
    `;
}

// Load blogs
async function loadBlogs() {
    const featuredContainer = document.getElementById('featuredBlogs');
    const blogsContainer = document.getElementById('blogsGrid');
    
    try {
        // Load featured articles
        const featuredArticles = window.BlogAPI.getFeaturedArticles();
        
        if (featuredArticles.length > 0) {
            featuredContainer.innerHTML = featuredArticles
                .map(article => createBlogCard(article, true))
                .join('');
        } else {
            featuredContainer.innerHTML = '<p class="loading-state">No featured articles found</p>';
        }
        
        // Load all articles
        const allArticles = window.BlogAPI.getAllArticles();
        
        if (allArticles.length > 0) {
            // Store articles globally for filtering and sorting
            window.blogsData = allArticles;
            
            // Display initial set of articles
            displayFilteredBlogs();
            
            // Update counters
            updateBlogCounters();
        } else {
            blogsContainer.innerHTML = '<div class="error-state"><h4>No articles found</h4><p>Check back soon for new articles!</p></div>';
        }
        
        // Re-observe scroll reveal elements
        document.querySelectorAll('.scroll-reveal').forEach(el => {
            if (!el.classList.contains('revealed')) {
                revealObserver.observe(el);
            }
        });
        
    } catch (error) {
        console.error('Error loading blogs:', error);
        featuredContainer.innerHTML = '<div class="error-state"><h4>Failed to load articles</h4><p>Please try again later.</p></div>';
        blogsContainer.innerHTML = '';
    }
}

// Display filtered and sorted blogs
function displayFilteredBlogs() {
    const blogsContainer = document.getElementById('blogsGrid');
    if (!window.blogsData) return;
    
    let filteredBlogs = window.BlogAPI.getArticlesByCategory(currentBlogFilter);
    
    // Apply sorting
    switch(currentBlogSort) {
        case 'popular':
            filteredBlogs = [...filteredBlogs].sort((a, b) => b.views - a.views);
            break;
        case 'likes':
            filteredBlogs = [...filteredBlogs].sort((a, b) => b.likes - a.likes);
            break;
        case 'recent':
        default:
            filteredBlogs = [...filteredBlogs].sort((a, b) => new Date(b.date) - new Date(a.date));
            break;
    }
    
    // Update total count
    const totalCountElement = document.getElementById('totalCount');
    if (totalCountElement) {
        totalCountElement.textContent = filteredBlogs.length;
    }
    
    // Display only visible count
    const visibleBlogs = filteredBlogs.slice(0, visibleBlogsCount);
    
    blogsContainer.innerHTML = visibleBlogs
        .map(article => createBlogCard(article, false))
        .join('');
    
    // Update visible count
    const visibleCountElement = document.getElementById('visibleCount');
    if (visibleCountElement) {
        visibleCountElement.textContent = Math.min(visibleBlogsCount, filteredBlogs.length);
    }
    
    // Show/hide load more button
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if (loadMoreBtn) {
        if (visibleBlogsCount >= filteredBlogs.length) {
            loadMoreBtn.style.display = 'none';
        } else {
            loadMoreBtn.style.display = 'flex';
        }
    }
    
    // Add event listeners to new like buttons
    document.querySelectorAll('.like-btn').forEach(btn => {
        btn.addEventListener('click', handleLikeClick);
    });
}

// Update blog counters
function updateBlogCounters() {
    const categories = window.BlogAPI.getAllCategories();
    const filterBtns = document.querySelectorAll('.blog-filter .filter-btn');
    
    filterBtns.forEach(btn => {
        const category = btn.getAttribute('data-category');
        const matchingCategory = categories.find(cat => cat.id === category);
        if (matchingCategory) {
            const countSpan = btn.querySelector('.count');
            if (countSpan) {
                countSpan.textContent = matchingCategory.count;
            }
        }
    });
}

// Handle blog filter click
function setupBlogFilters() {
    const filterBtns = document.querySelectorAll('.blog-filter .filter-btn');
    const sortBtns = document.querySelectorAll('.blogs-controls .sort-btn');
    
    // Filter buttons
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            currentBlogFilter = btn.getAttribute('data-category');
            visibleBlogsCount = 6; // Reset to initial count
            displayFilteredBlogs();
        });
    });
    
    // Sort buttons
    sortBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            sortBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            currentBlogSort = btn.getAttribute('data-sort');
            displayFilteredBlogs();
        });
    });
    
    // Search functionality
    const searchInput = document.getElementById('blogSearch');
    if (searchInput) {
        searchInput.addEventListener('input', debounce(() => {
            const searchTerm = searchInput.value.toLowerCase();
            if (searchTerm.length >= 2) {
                const filtered = window.blogsData.filter(article => 
                    article.title.toLowerCase().includes(searchTerm) ||
                    article.excerpt.toLowerCase().includes(searchTerm) ||
                    article.tags.some(tag => tag.toLowerCase().includes(searchTerm))
                );
                
                const blogsContainer = document.getElementById('blogsGrid');
                if (filtered.length > 0) {
                    blogsContainer.innerHTML = filtered
                        .map(article => createBlogCard(article, false))
                        .join('');
                } else {
                    blogsContainer.innerHTML = '<div class="error-state"><h4>No matching articles found</h4><p>Try different keywords</p></div>';
                }
            } else if (searchTerm.length === 0) {
                displayFilteredBlogs();
            }
        }, 300));
    }
    
    // Load more button
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', () => {
            console.log('Load More clicked! Current count:', visibleBlogsCount);
            visibleBlogsCount += 3;  // Changed from 6 to 3 since we have fewer     articles

            displayFilteredBlogs();

            // Scroll to new items
            setTimeout(() => {
                const blogs = document.querySelectorAll('.blog-card');
                if (blogs.length > 0) {
                    const lastBlog = blogs[blogs.length - 1];
                    lastBlog.scrollIntoView({ behavior: 'smooth', block:    'nearest' });
                }
            }, 100);
        });
    }
}

// Handle like button click
function handleLikeClick(event) {
    const button = event.currentTarget;
    const articleId = parseInt(button.getAttribute('data-id'));
    
    if (!button.classList.contains('liked')) {
        const newLikes = window.BlogAPI.toggleLike(articleId);
        if (newLikes !== null) {
            button.classList.add('liked');
            button.innerHTML = `
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style="color: var(--danger)">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                </svg>
                ${newLikes} likes
            `;
            
            // Add animation
            button.style.animation = 'pulse 0.5s ease';
            setTimeout(() => {
                button.style.animation = '';
            }, 500);
        }
    }
}

// Newsletter form
const newsletterForm = document.getElementById('newsletterForm');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = newsletterForm.querySelector('input[type="email"]').value;
        
        // Show loading
        const submitBtn = newsletterForm.querySelector('.btn');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = 'Subscribing...';
        submitBtn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            // In a real application, you would make an API call here
            console.log('Subscribed email:', email);
            
            // Show success message
            const successMsg = document.createElement('p');
            successMsg.className = 'form-note success';
            successMsg.textContent = 'Thank you! You\'ve been subscribed to the newsletter.';
            successMsg.style.color = 'var(--success)';
            successMsg.style.marginTop = 'var(--spacing-sm)';
            
            newsletterForm.appendChild(successMsg);
            
            // Reset form
            newsletterForm.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            
            // Remove success message after 5 seconds
            setTimeout(() => {
                if (successMsg.parentNode) {
                    successMsg.remove();
                }
            }, 5000);
        }, 1500);
    });
}

// Load blogs when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Load blogs
    loadBlogs();
    setupBlogFilters();
});