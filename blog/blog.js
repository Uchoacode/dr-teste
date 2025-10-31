// Utility function to get SVG markup
function getSvgIcon(iconName, classes = 'svg-icon') {
    const iconPaths = {
        'times': 'M12 10.586l4.243-4.243a1 1 0 111.414 1.414L13.414 12l4.243 4.243a1 1 0 01-1.414 1.414L12 13.414l-4.243 4.243a1 1 0 01-1.414-1.414L10.586 12 6.343 7.757a1 1 0 011.414-1.414L12 10.586z',
        'plus': 'M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z',
        'spinner': 'M12 4V2.01A9.95 9.95 0 002 12h2a8 8 0 1116 0h2A9.95 9.95 0 0012 4z',
        'check-circle': 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z',
        'exclamation-circle': 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z',
        'info-circle': 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z'
    };

    const path = iconPaths[iconName] || '';
    if (!path) return '';
    return `<svg class="${classes}" viewBox="0 0 24 24" fill="currentColor"><path d="${path}"/></svg>`;
}


/*===== BLOG FUNCTIONALITY =====*/

// Category filtering
document.addEventListener('DOMContentLoaded', function() {
    const categoryCards = document.querySelectorAll('.category__card');
    const newsletterForm = document.getElementById('newsletter-form');
    const loadMoreBtn = document.getElementById('load-more-posts');
    
    // Category card interactions
    categoryCards.forEach(card => {
        card.addEventListener('click', function() {
            const category = this.dataset.category;
            filterPostsByCategory(category);
            
            // Add active state
            categoryCards.forEach(c => c.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Newsletter form submission
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            
            if (email) {
                // Simulate newsletter subscription
                showNotification('Obrigado! Você receberá nossos novos artigos em breve.', 'success');
                this.reset();
            }
        });
    }
    
    // Load more posts functionality
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            loadMorePosts();
        });
    }
    
    // Smooth scroll for category navigation
    const categoryLinks = document.querySelectorAll('[data-category]');
    categoryLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetSection = document.querySelector('.recent-posts');
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});

// Filter posts by category
function filterPostsByCategory(category) {
    const posts = document.querySelectorAll('.post__item');
    
    posts.forEach(post => {
        const postCategory = post.querySelector('.post__item-category').textContent.toLowerCase();
        const categoryMatch = {
            'diabetes': 'diabetes',
            'tireoide': 'tireóide',
            'emagrecimento': 'emagrecimento',
            'prevencao': 'prevenção'
        };
        
        if (category === 'all' || postCategory === categoryMatch[category]) {
            post.style.display = 'block';
            // Usar a classe de animação para entrada fluida após a filtragem
            post.classList.add('animate-fade-in-up'); 
        } else {
            post.style.display = 'none';
            post.classList.remove('animate-fade-in-up');
        }
    });
}

// Load more posts (simulate loading)
function loadMorePosts() {
    const postsGrid = document.querySelector('.recent-posts__container'); // Updated selector based on HTML
    const loadMoreBtn = document.getElementById('load-more-posts');
    
    // Simulate loading with SVG spinner
    loadMoreBtn.innerHTML = `${getSvgIcon('spinner', 'svg-icon icon--spin')} Carregando...`;
    loadMoreBtn.disabled = true;
    
    setTimeout(() => {
        // Add more posts (this would normally come from a server)
        const morePosts = createMorePosts();
        postsGrid.insertAdjacentHTML('beforeend', morePosts);
        
        // Reset button with Plus SVG
        loadMoreBtn.innerHTML = `${getSvgIcon('plus')} Carregar Mais Artigos`;
        loadMoreBtn.disabled = false;
        
        showNotification('Mais artigos carregados!', 'info');
        
        // Re-observe new posts for fade-in animation
        const newPosts = postsGrid.querySelectorAll('.post__item:not([data-observed])');
        newPosts.forEach(post => {
            // Configuração inicial para a animação
            post.style.opacity = '0';
            post.style.willChange = 'transform, opacity';
            
            observer.observe(post);
            post.setAttribute('data-observed', 'true');
        });
        
    }, 1500);
}

// Create more posts HTML (simulate)
function createMorePosts() {
    const additionalPosts = [
        {
            image: '../assets/images/blog-diabetes-gestacional.jpg',
            category: 'Diabetes',
            title: 'Diabetes Gestacional: Cuidados Essenciais',
            date: '15 Dez 2023',
            readTime: '5 min',
            slug: 'diabetes-gestacional-cuidados-essenciais'
        },
        {
            image: '../assets/images/blog-exercicios-diabeticos.jpg',
            category: 'Diabetes',
            title: 'Exercícios Seguros para Diabéticos',
            date: '10 Dez 2023',
            readTime: '6 min',
            slug: 'exercicios-seguros-diabeticos'
        },
        {
            image: '../assets/images/blog-tsh-exames.jpg',
            category: 'Tireóide',
            title: 'Exames da Tireóide: TSH, T3, T4 - Entenda os Resultados',
            date: '5 Dez 2023',
            readTime: '7 min',
            slug: 'exames-tireoide-tsh-t3-t4-resultados'
        },
        {
            image: '../assets/images/blog-sindrome-metabolica.jpg',
            category: 'Emagrecimento',
            title: 'Síndrome Metabólica: O que É e Como Tratar',
            date: '1 Dez 2023',
            readTime: '8 min',
            slug: 'sindrome-metabolica-tratamento'
        }
    ];
    
    return additionalPosts.map(post => `
        <article class="post__item">
            <div class="post__item-image">
                <img src="${post.image}" alt="${post.title}" class="post__item-img">
            </div>
            <div class="post__item-content">
                <div class="post__item-category">${post.category}</div>
                <h4 class="post__item-title">
                    <a href="posts/${post.slug}.html">
                        ${post.title}
                    </a>
                </h4>
                <div class="post__item-meta">
                    <span class="post__item-date">${post.date}</span>
                    <span class="post__item-read">${post.readTime}</span>
                </div>
            </div>
        </article>
    `).join('');
}

// Show notification
function showNotification(message, type = 'info') {
    const iconName = type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle';
    const icon = getSvgIcon(iconName, 'svg-icon');
    const closeIcon = getSvgIcon('times', 'svg-icon');

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.innerHTML = `
        <div class="notification__content">
            ${icon}
            <span>${message}</span>
        </div>
        <button class="notification__close">
            ${closeIcon}
        </button>
    `;
    
    // Add styles if not already added (assuming base notification styles are in CSS)
    if (!document.querySelector('#notification-styles')) {
        const styles = document.createElement('style');
        styles.id = 'notification-styles';
        styles.textContent = `
            .notification {
                position: fixed;
                top: 2rem;
                right: 2rem;
                background: white;
                padding: 1rem 1.5rem;
                border-radius: 0.5rem;
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
                z-index: 1000;
                display: flex;
                align-items: center;
                gap: 1rem;
                max-width: 400px;
                animation: slideIn 0.3s ease;
                border-left: 4px solid var(--primary-color);
            }
            
            .notification--success {
                border-left-color: #10b981;
            }
            
            .notification--error {
                border-left-color: #ef4444;
            }
            
            .notification--info {
                border-left-color: var(--primary-color);
            }
            
            .notification__content {
                display: flex;
                align-items: center;
                gap: 0.75rem;
                flex: 1;
            }
            
            .notification__content .svg-icon {
                color: var(--primary-color);
                width: 1.25rem;
                height: 1.25rem;
            }
            
            .notification--success .notification__content .svg-icon {
                color: #10b981;
            }
            
            .notification--error .notification__content .svg-icon {
                color: #ef4444;
            }
            
            .notification__close {
                background: none;
                border: none;
                cursor: pointer;
                color: var(--text-color-light);
                padding: 0.25rem;
            }

            .notification__close .svg-icon {
                width: 1em;
                height: 1em;
            }
            
            .notification__close:hover {
                color: var(--text-color);
            }
            
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            
            @keyframes slideOut {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(styles);
    }
    
    // Add to page
    document.body.appendChild(notification);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification__close');
    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Search functionality (basic)
function initSearch() {
    const searchInput = document.querySelector('.search__input');
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            const posts = document.querySelectorAll('.post__item');
            
            posts.forEach(post => {
                const title = post.querySelector('.post__item-title a').textContent.toLowerCase();
                const category = post.querySelector('.post__item-category').textContent.toLowerCase();
                
                if (title.includes(searchTerm) || category.includes(searchTerm)) {
                    post.style.display = 'block';
                } else {
                    // Adicionado uma animação de saída ao esconder para maior fluidez
                    post.style.display = searchTerm === '' ? 'block' : 'none';
                }
            });
        });
    }
}

// Reading progress bar for individual posts
function initReadingProgress() {
    if (document.querySelector('.post-content')) {
        const progressBar = document.createElement('div');
        progressBar.className = 'reading-progress';
        progressBar.innerHTML = '<div class="reading-progress__bar"></div>';
        
        const styles = document.createElement('style');
        styles.textContent = `
            .reading-progress {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 4px;
                background: rgba(0, 0, 0, 0.1);
                z-index: 1000;
            }
            
            .reading-progress__bar {
                height: 100%;
                background: var(--primary-color);
                width: 0%;
                transition: width 0.1s ease;
                will-change: width; /* Otimização de performance */
            }
        `;
        
        document.head.appendChild(styles);
        document.body.appendChild(progressBar);
        
        const progressBarFill = progressBar.querySelector('.reading-progress__bar');
        
        window.addEventListener('scroll', () => {
            const article = document.querySelector('.post-content');
            if (article) {
                const articleTop = article.offsetTop;
                const articleHeight = article.offsetHeight;
                const windowHeight = window.innerHeight;
                const scrollTop = window.pageYOffset;
                
                const progress = Math.min(
                    Math.max((scrollTop - articleTop + windowHeight) / articleHeight, 0),
                    1
                );
                
                progressBarFill.style.width = `${progress * 100}%`;
            }
        });
    }
}

// Initialize all functionality
document.addEventListener('DOMContentLoaded', function() {
    initSearch();
    initReadingProgress();
});

// Social sharing functionality
function sharePost(platform, url, title) {
    const shareUrls = {
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
        twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
        linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
        whatsapp: `https://wa.me/?text=${encodeURIComponent(title + ' ' + url)}`
    };
    
    if (shareUrls[platform]) {
        window.open(shareUrls[platform], '_blank', 'width=600,height=400');
    }
}

// Add fade-in animation for posts
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Usar a classe de animação definida no CSS principal
            entry.target.classList.add('animate-fade-in-up');
            entry.target.style.opacity = '1'; // Garantir visibilidade
        }
    });
}, observerOptions);

// Observe all post cards
document.addEventListener('DOMContentLoaded', function() {
    const posts = document.querySelectorAll('.post__card, .post__item');
    posts.forEach(post => {
        // Configura o estado inicial para que a animação possa ser aplicada
        post.style.opacity = '0';
        post.style.willChange = 'transform, opacity'; // Otimização de performance
        observer.observe(post);
    });
});