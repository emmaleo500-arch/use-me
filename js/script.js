// Dark Mode Toggle
const darkModeToggle = document.getElementById('darkModeToggle');
const darkModeIcon = document.querySelector('.mode i');
const body = document.body;

if (darkModeToggle && darkModeIcon) {
    const isDarkMode = localStorage.getItem('darkMode') === 'enabled';
    if (isDarkMode) {
        body.classList.add('dark-mode');
        darkModeToggle.checked = true;
        darkModeIcon.classList.replace('bxs-moon', 'bxs-sun');
    }

    darkModeToggle.addEventListener('change', () => {
        if (darkModeToggle.checked) {
            body.classList.add('dark-mode');
            localStorage.setItem('darkMode', 'enabled');
            darkModeIcon.classList.replace('bxs-moon', 'bxs-sun');
        } else {
            body.classList.remove('dark-mode');
            localStorage.setItem('darkMode', 'disabled');
            darkModeIcon.classList.replace('bxs-sun', 'bxs-moon');
        }
    });
}

// Contact Form Submission
const contactForm = document.getElementById('contactForm');
const formBtn = document.querySelector('.form-actions .btn');

if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        const formData = new FormData(contactForm);
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;

        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: formData.get('name'),
                    email: formData.get('email'),
                    subject: formData.get('subject'),
                    message: formData.get('message')
                })
            });

            const result = await response.json();

            if (result.success) {
                showNotification(result.message || 'Message sent successfully!', 'success');
                contactForm.reset();
            } else {
                showNotification(result.message || 'Something went wrong. Please try again.', 'error');
            }
        } catch (error) {
            showNotification('Network error. Please try again.', 'error');
        } finally {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    });
}

function showNotification(message, type) {
    let notification = document.getElementById('formNotification');

    if (!notification) {
        notification = document.createElement('div');
        notification.id = 'formNotification';
        notification.style.cssText = `
            position: fixed;
            top: 80px;
            right: 20px;
            padding: 1rem 2rem;
            border-radius: 8px;
            font-family: 'Poppins', sans-serif;
            font-weight: 500;
            z-index: 1000;
            transform: translateX(120%);
            transition: transform 0.3s ease;
            max-width: 350px;
            text-align: center;
        `;
        document.body.appendChild(notification);
    }

    if (type === 'success') {
        notification.style.backgroundColor = 'rgba(34, 197, 94, 0.9)';
        notification.style.color = '#fff';
    } else {
        notification.style.backgroundColor = 'rgba(239, 68, 68, 0.9)';
        notification.style.color = '#fff';
    }

    notification.textContent = message;
    notification.style.transform = 'translateX(0)';

    setTimeout(() => {
        notification.style.transform = 'translateX(120%)';
    }, 4000);
}

// Load Projects from API
async function loadProjects() {
    const portfolioGrid = document.querySelector('.portfolio-grid');

    if (portfolioGrid) {
        try {
            const response = await fetch('/api/projects');
            const result = await response.json();

            if (result.success && result.data) {
                portfolioGrid.innerHTML = '';
                portfolioGrid.innerHTML = result.data.map(project => `
                    <div class="portfolio-card">
                        <div class="portfolio-img">
                            <i class='bx ${getProjectIcon(project.image)}'></i>
                        </div>
                        <div class="portfolio-content">
                            <h3>${project.title}</h3>
                            <p>${project.description}</p>
                            <div class="portfolio-tags">
                                ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                            </div>
                            <div class="portfolio-links">
                                <a href="${project.github}" aria-label="GitHub"><i class='bx bxl-github'></i></a>
                                <a href="${project.demo}" aria-label="Live Demo"><i class='bx bx-globe'></i></a>
                            </div>
                        </div>
                    </div>
                `).join('');
            }
        } catch (error) {
            console.error('Failed to load projects:', error);
        }
    }
}

function getProjectIcon(image) {
    const icons = {
        'react': "bxl-react",
        'php': "bxl-php",
        'node': "bxl-node-js",
        'html': "bxl-html5",
        'python': "bxl-python",
        'mongodb': "bxl-mongodb"
    };
    return icons[image] || 'bxs-code-block';
}

document.addEventListener('DOMContentLoaded', function() {
    loadProjects();

    // Portfolio Filter Buttons
    const filterBtns = document.querySelectorAll('.filter-btn');
    if (filterBtns.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                filterBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
            });
        });
    }
});
