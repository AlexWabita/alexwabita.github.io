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