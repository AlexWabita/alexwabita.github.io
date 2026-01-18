// ==========================================
// GITHUB API INTEGRATION
// ==========================================

const GITHUB_USERNAME = 'AlexWabita';
const GITHUB_API_BASE = 'https://api.github.com';

// ==========================================
// FETCH USER PROFILE
// ==========================================

async function fetchGitHubProfile() {
    try {
        const response = await fetch(`${GITHUB_API_BASE}/users/${GITHUB_USERNAME}`);
        
        if (!response.ok) {
            throw new Error(`GitHub API error: ${response.status}`);
        }
        
        const data = await response.json();
        return {
            name: data.name,
            bio: data.bio,
            avatar: data.avatar_url,
            location: data.location,
            publicRepos: data.public_repos,
            followers: data.followers,
            following: data.following,
            profileUrl: data.html_url,
            blog: data.blog,
            twitter: data.twitter_username,
            company: data.company
        };
    } catch (error) {
        console.error('Error fetching GitHub profile:', error);
        return null;
    }
}

// ==========================================
// FETCH REPOSITORIES
// ==========================================

async function fetchGitHubRepos(options = {}) {
    const {
        sort = 'updated',
        per_page = 6,
        type = 'owner'
    } = options;
    
    try {
        const response = await fetch(
            `${GITHUB_API_BASE}/users/${GITHUB_USERNAME}/repos?sort=${sort}&per_page=${per_page}&type=${type}`
        );
        
        if (!response.ok) {
            throw new Error(`GitHub API error: ${response.status}`);
        }
        
        const repos = await response.json();
        
        return repos.map(repo => ({
            name: repo.name,
            description: repo.description,
            url: repo.html_url,
            homepage: repo.homepage,
            language: repo.language,
            stars: repo.stargazers_count,
            forks: repo.forks_count,
            updatedAt: repo.updated_at,
            createdAt: repo.created_at,
            topics: repo.topics || [],
            isPrivate: repo.private
        }));
    } catch (error) {
        console.error('Error fetching GitHub repositories:', error);
        return [];
    }
}

// ==========================================
// FETCH PINNED REPOSITORIES
// ==========================================

async function fetchPinnedRepos() {
    // Note: GitHub doesn't have a direct API for pinned repos
    // This is a workaround - you can manually specify pinned repo names
    const pinnedRepoNames = [
        'python-mastery-2026',
        'equalizer-apo-profiles'
    ];
    
    try {
        const promises = pinnedRepoNames.map(name => 
            fetch(`${GITHUB_API_BASE}/repos/${GITHUB_USERNAME}/${name}`)
                .then(res => res.ok ? res.json() : null)
        );
        
        const repos = await Promise.all(promises);
        
        return repos
            .filter(repo => repo !== null)
            .map(repo => ({
                name: repo.name,
                description: repo.description,
                url: repo.html_url,
                homepage: repo.homepage,
                language: repo.language,
                stars: repo.stargazers_count,
                forks: repo.forks_count,
                topics: repo.topics || []
            }));
    } catch (error) {
        console.error('Error fetching pinned repositories:', error);
        return [];
    }
}

// ==========================================
// FETCH REPOSITORY LANGUAGES
// ==========================================

async function fetchRepoLanguages(repoName) {
    try {
        const response = await fetch(`${GITHUB_API_BASE}/repos/${GITHUB_USERNAME}/${repoName}/languages`);
        
        if (!response.ok) {
            throw new Error(`GitHub API error: ${response.status}`);
        }
        
        return await response.json();
    } catch (error) {
        console.error(`Error fetching languages for ${repoName}:`, error);
        return {};
    }
}

// ==========================================
// FETCH USER STATS
// ==========================================

async function fetchGitHubStats() {
    try {
        const [profile, repos] = await Promise.all([
            fetchGitHubProfile(),
            fetchGitHubRepos({ per_page: 100 })
        ]);
        
        if (!profile || !repos) {
            return null;
        }
        
        // Calculate stats
        const totalStars = repos.reduce((sum, repo) => sum + repo.stars, 0);
        const totalForks = repos.reduce((sum, repo) => sum + repo.forks, 0);
        const languages = {};
        
        repos.forEach(repo => {
            if (repo.language) {
                languages[repo.language] = (languages[repo.language] || 0) + 1;
            }
        });
        
        const topLanguages = Object.entries(languages)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5)
            .map(([lang, count]) => ({ language: lang, count }));
        
        return {
            totalRepos: profile.publicRepos,
            totalStars,
            totalForks,
            followers: profile.followers,
            topLanguages
        };
    } catch (error) {
        console.error('Error fetching GitHub stats:', error);
        return null;
    }
}

// ==========================================
// DISPLAY FUNCTIONS
// ==========================================

// Display repositories in a container
function displayRepositories(repos, containerId) {
    const container = document.getElementById(containerId);
    
    if (!container || !repos.length) {
        console.warn('No container or repositories found');
        return;
    }
    
    container.innerHTML = repos.map(repo => `
        <div class="repo-card">
            <div class="repo-header">
                <h3 class="repo-name">
                    <a href="${repo.url}" target="_blank" rel="noopener noreferrer">
                        ${repo.name}
                    </a>
                </h3>
                ${repo.language ? `<span class="repo-language">${repo.language}</span>` : ''}
            </div>
            <p class="repo-description">${repo.description || 'No description available'}</p>
            <div class="repo-stats">
                <span class="repo-stat">
                    ⭐ ${repo.stars}
                </span>
                <span class="repo-stat">
                    🔱 ${repo.forks}
                </span>
                ${repo.topics.length ? `
                    <div class="repo-topics">
                        ${repo.topics.slice(0, 3).map(topic => 
                            `<span class="topic-tag">${topic}</span>`
                        ).join('')}
                    </div>
                ` : ''}
            </div>
        </div>
    `).join('');
}

// ==========================================
// EXPORT FUNCTIONS
// ==========================================

// Make functions available globally
window.GitHubAPI = {
    fetchProfile: fetchGitHubProfile,
    fetchRepos: fetchGitHubRepos,
    fetchPinnedRepos: fetchPinnedRepos,
    fetchStats: fetchGitHubStats,
    fetchRepoLanguages: fetchRepoLanguages,
    displayRepositories: displayRepositories
};

// ==========================================
// AUTO-LOAD DATA (Optional)
// ==========================================

// Uncomment to auto-load data when page loads

document.addEventListener('DOMContentLoaded', async () => {
    console.log('Loading GitHub data...');
    
    const repos = await fetchGitHubRepos({ per_page: 6 });
    if (repos.length > 0) {
        displayRepositories(repos, 'projects-container');
    }
    
    const stats = await fetchGitHubStats();
    if (stats) {
        console.log('GitHub Stats:', stats);
    }
});
