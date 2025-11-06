/*==================== MENU SANDUÍCHE MODERNO ====================*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close'),
      navLinks = document.querySelectorAll('.nav__link');

/**
 * Fecha o menu sanduíche e remove as classes de estado.
 */
function closeMenu() {
    if (navMenu && document.body) {
        navMenu.classList.remove('open-menu');
        document.body.classList.remove('menu-open');
        
        // Acessibilidade: Atualiza o estado do botão toggle
        if (navToggle) {
            navToggle.setAttribute('aria-expanded', 'false');
        }
    }
}

/**
 * Abre o menu sanduíche e adiciona as classes de estado.
 */
function openMenu() {
    if (navMenu && document.body) {
        navMenu.classList.add('open-menu');
        document.body.classList.add('menu-open');
        
        // Acessibilidade: Atualiza o estado do botão toggle
        if (navToggle) navToggle.setAttribute('aria-expanded', 'true');
    }
}

/*===== MENU SHOW: Abre ao clicar no sanduíche =====*/
if (navToggle) {
    navToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        if (navMenu.classList.contains('open-menu')) {
            closeMenu();
        } else {
            openMenu();
        }
    });
    
    // Adiciona atributos de acessibilidade
    navToggle.setAttribute('aria-controls', 'nav-menu');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('type', 'button');
}

/*===== MENU HIDDEN: Fecha ao clicar no X, Overlay ou Link =====*/
if (navClose) {
    navClose.addEventListener('click', (e) => {
        e.stopPropagation();
        closeMenu();
    });
    navClose.setAttribute('type', 'button');
}


// Fecha o menu ao clicar em qualquer link de navegação (exceto links externos)
navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        // Só fecha se for um link de âncora (#) ou interno
        if (href && (href.startsWith('#') || !href.startsWith('http'))) {
            // Pequeno delay para garantir que a navegação aconteça
            setTimeout(() => {
                closeMenu();
            }, 100);
        }
    });
});

// Fecha o menu ao pressionar ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu && navMenu.classList.contains('open-menu')) {
        closeMenu();
    }
});

// Previne que cliques dentro do menu fechem o menu
if (navMenu) {
    navMenu.addEventListener('click', (e) => {
        e.stopPropagation();
    });
}

// Garante que o menu comece fechado ao carregar a página
document.addEventListener('DOMContentLoaded', function() {
    if (navMenu && document.body) {
        navMenu.classList.remove('open-menu');
        document.body.classList.remove('menu-open');
        if (navToggle) {
            navToggle.setAttribute('aria-expanded', 'false');
        }
    }
});

// Garante que o menu fecha ao redimensionar a tela (se for desktop)
window.addEventListener('resize', function() {
    if (window.innerWidth >= 768 && navMenu && navMenu.classList.contains('open-menu')) {
        closeMenu();
    }
});

/*==================== FIM MENU SANDUÍCHE MODERNO ====================*/

/*==================== ACCORDION SKILLS ====================*/
const skillsContent = document.getElementsByClassName('skills__content'),
      skillsHeader = document.querySelectorAll('.skills__header')

function toggleSkills(){
    let itemClass = this.parentNode.className

    for(i = 0; i < skillsContent.length; i++){
        skillsContent[i].className = 'skills__content skills__close'
    }
    if(itemClass === 'skills__content skills__close'){
        this.parentNode.className = 'skills__content skills__open'
    }
}

skillsHeader.forEach((el) =>{
    el.addEventListener('click', toggleSkills)
})

/*==================== QUALIFICATION TABS ====================*/
const tabs = document.querySelectorAll('[data-target]'),
      tabContents = document.querySelectorAll('[data-content]')

tabs.forEach(tab =>{
    tab.addEventListener('click', () =>{
        const target = document.querySelector(tab.dataset.target)

        tabContents.forEach(tabContent =>{
            tabContent.classList.remove('qualification__active')
        })
        target.classList.add('qualification__active')

        tabs.forEach(tab =>{
            tab.classList.remove('qualification__active')
        })
        tab.classList.add('qualification__active')
    })
})

/*==================== SERVICES MODAL ====================*/
const modalViews = document.querySelectorAll('.services__modal'),
      modalBtns = document.querySelectorAll('.services__button'),
      modalCloses = document.querySelectorAll('.services__modal-close')

let modal = function(modalClick){
    modalViews[modalClick].classList.add('active-modal')
}

modalBtns.forEach((modalBtn, i) => {
    modalBtn.addEventListener('click', () =>{
        modal(i)
    })
})

modalCloses.forEach((modalClose) => {
    modalClose.addEventListener('click', () =>{
        modalViews.forEach((modalView) =>{
            modalView.classList.remove('active-modal')
        })
    })
})

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]')

function scrollActive(){
    const scrollY = window.pageYOffset

    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight
        // CORREÇÃO: Ajusta offsetTop para o novo header fixo no topo
        // Usa a altura do header como margem
        const sectionTop = current.offsetTop - document.getElementById('header').offsetHeight - 20; 
        sectionId = current.getAttribute('id')

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            const activeLink = document.querySelector('.nav__menu a[href*=' + sectionId + ']');
            if(activeLink) {
                // Remove active-link de todos
                document.querySelectorAll('.nav__menu a').forEach(a => a.classList.remove('active-link'));
                // Adiciona a active-link ao link correto
                activeLink.classList.add('active-link');
            }
        }
    })
}
window.addEventListener('scroll', scrollActive)
// Executa no load para o link inicial ser ativo
document.addEventListener('DOMContentLoaded', scrollActive);


/*==================== CHANGE BACKGROUND HEADER ====================*/ 
function scrollHeader(){
    const nav = document.getElementById('header')
    // When the scroll is greater than 80 viewport height, add the scroll-header class to the header tag
    if(this.scrollY >= 80) nav.classList.add('scroll-header'); else nav.classList.remove('scroll-header')
}
window.addEventListener('scroll', scrollHeader)

/*==================== SHOW SCROLL UP - REMOVIDO ====================*/ 
/*
function scrollUp(){
    const scrollUp = document.getElementById('scroll-up');
    // When the scroll is higher than 560 viewport height, add the show-scroll class to the a tag with the scroll-top class
    // CORREÇÃO: A classe de mostrar agora usa 'show-scroll' (já estava no CSS, mas o valor de bottom foi corrigido lá)
    if(this.scrollY >= 560) scrollUp.classList.add('show-scroll'); else scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)
*/

/*==================== SMOOTH SCROLLING ====================*/
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);
        
        if (target) {
            // CORREÇÃO: Usa scrollIntoView para rolagem suave, 
            // a compensação de cabeçalho agora é feita via CSS com scroll-margin-top
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

/*==================== TYPING ANIMATION (IMPROVED, LOOP, NO LAYOUT JUMP) ====================*/
function initTypingEffect() {
    const el = document.querySelector('.home__title-accent');
    if (!el) return;

    // List of phrases to cycle through (first one comes from the HTML for SEO)
    const first = (el.textContent || 'Endocrinologista').trim();
    const phrases = [
        first,
        'Especialista em Diabetes',
        'Tecnologias em Diabetes',
        'Tratamento de Peso',
        'Doenças da Tireóide'
    ];

    // Create a hidden sizer to stabilize width using the longest phrase
    const sizer = document.createElement('span');
    sizer.textContent = phrases.reduce((a, b) => (a.length > b.length ? a : b));
    sizer.setAttribute('aria-hidden', 'true');
    sizer.style.cssText = 'position:absolute;visibility:hidden;white-space:nowrap;pointer-events:none;';
    el.parentNode.insertBefore(sizer, el);

    let phraseIndex = 0;
    let charIndex = 0;
    let typing = true;

    // Speeds tuned for desktop and slower on mobile for elegance
    const isMobile = window.matchMedia('(max-width: 767px)').matches;
    // MODIFICADO: Aumenta a velocidade de digitação no mobile para ficar mais lenta (250ms vs 180ms)
    const typeSpeed = isMobile ? 250 : 95;     // ms per char when typing (mobile mais lento)
    // MODIFICADO: Aumenta a velocidade de exclusão no mobile para ficar mais lenta (120ms vs 90ms)
    const deleteSpeed = isMobile ? 120 : 65;    // ms per char when deleting
    const holdOnTyped = isMobile ? 1500 : 1100; // pause after a phrase is fully typed
    const holdOnDeleted = isMobile ? 600 : 420; // pause after deletion before next phrase

    function tick() {
        const current = phrases[phraseIndex];
        if (typing) {
            // type forward
            charIndex = Math.min(charIndex + 1, current.length);
            el.textContent = current.slice(0, charIndex);
            if (charIndex === current.length) {
                typing = false;
                setTimeout(tick, holdOnTyped);
                return;
            }
            setTimeout(tick, typeSpeed);
        } else {
            // delete backward
            charIndex = Math.max(charIndex - 1, 0);
            el.textContent = current.slice(0, charIndex);
            if (charIndex === 0) {
                typing = true;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                setTimeout(tick, holdOnDeleted);
                return;
            }
            setTimeout(tick, deleteSpeed);
        }
    }

    // Start when hero is visible to avoid unnecessary work off-screen
    const hero = document.getElementById('home');
    if ('IntersectionObserver' in window && hero) {
        const ob = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    observer.disconnect();
                    setTimeout(tick, 300); // small delay for a smoother start
                }
            });
        }, { threshold: 0.4 });
        ob.observe(hero);
    } else {
        setTimeout(tick, 300);
    }
}

document.addEventListener('DOMContentLoaded', initTypingEffect);

/*==================== STATS COUNT UP ANIMATION ====================*/
function animateCountUp(el, targetNumber, duration = 2000) {
    let start = 0;
    // Pega o sufixo (ex: '+') do atributo data-original
    const plusSign = el.dataset.original && el.dataset.original.includes('+') ? '+' : '';
    const step = targetNumber / (duration / 16); // ~60fps
    
    function updateCount() {
        start += step;
        if (start < targetNumber) {
            // Usa toLocaleString para formatar números grandes (ex: 1.000)
            el.textContent = Math.ceil(start).toLocaleString('pt-BR') + plusSign;
            requestAnimationFrame(updateCount);
        } else {
            el.textContent = targetNumber.toLocaleString('pt-BR') + plusSign;
        }
    }
    updateCount();
}

const statsObserverOptions = {
    // Reduzido de 0.7 para 0.1 para que a contagem comece mais cedo no mobile
    threshold: 0.1, 
    rootMargin: '0px 0px -100px 0px' // Garante que a animação comece antes do elemento estar totalmente visível
};

// Observer para Contagem
const statsObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statElements = entry.target.querySelectorAll('.stat__number');
            statElements.forEach(statEl => {
                const target = parseInt(statEl.dataset.target);
                animateCountUp(statEl, target);
            });
            observer.unobserve(entry.target); // Para de observar após a contagem
        }
    });
}, statsObserverOptions);


/*==================== SISTEMA PADRONIZADO DE ANIMAÇÕES - INTERSECTION OBSERVER ====================*/
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in-up');
            entry.target.style.opacity = '1';
            // Remove o observer após animar para otimizar performance
            animationObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Função para inicializar animações em elementos
function initAnimations() {
    // Seletores padronizados para todas as páginas
    const elementsToAnimate = document.querySelectorAll(
        '.specialty__card, .education__item, .contact__item, .video__card, .stat__item, ' +
        '.pillar__card, .category__card, .post__card, .post__item, .sidebar-card, ' +
        '.related-post, .blog-hero__content, .post-header__content'
    );
    
    elementsToAnimate.forEach(el => {
        // Define o estado inicial para animação
        el.classList.add('animate-on-scroll');
        el.style.opacity = '0';
        el.style.willChange = 'transform, opacity';
        animationObserver.observe(el);
    });
}

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
    // Inicializa animações padronizadas
    initAnimations();
    
    // Inicia o observer de contagem
    const aboutSection = document.querySelector('.about');
    if (aboutSection) {
        statsObserver.observe(aboutSection);
    }
});

/*==================== FORM VALIDATION ====================*/
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.classList.add('error');
        } else {
            input.classList.remove('error');
        }
        
        if (input.type === 'email' && input.value && !validateEmail(input.value)) {
            isValid = false;
            input.classList.add('error');
        }
    });
    
    return isValid;
}

/*==================== LOADING ANIMATION ====================*/
window.addEventListener('load', function() {
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }
});

/*==================== PERFORMANCE OPTIMIZATIONS ====================*/
// Lazy loading for images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach(img => imageObserver.observe(img));
}

/*==================== ACCESSIBILITY IMPROVEMENTS ====================*/
// Focus management for mobile menu - REMOVIDO POIS ESTÁ NA NOVA LÓGICA DO MENU
/*
const navToggleBtn = document.getElementById('nav-toggle');
const navCloseBtn = document.getElementById('nav-close');

if (navToggleBtn) {
    navToggleBtn.addEventListener('click', function() {
        setTimeout(() => {
            const firstNavLink = document.querySelector('.nav__link');
            if (firstNavLink) firstNavLink.focus();
        }, 100);
    });
}
*/

/*==================== PRELOADER ====================*/
document.addEventListener('DOMContentLoaded', function() {
    // Create preloader if it doesn't exist
    if (!document.querySelector('.preloader')) {
        const preloader = document.createElement('div');
        preloader.className = 'preloader';
        preloader.innerHTML = `
            <div class="preloader__spinner">
                <div class="preloader__circle"></div>
            </div>
        `;
        preloader.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: white;
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9999;
            transition: opacity 0.5s ease;
        `;
        
        const style = document.createElement('style');
        style.textContent = `
            .preloader__spinner {
                width: 50px;
                height: 50px;
                position: relative;
            }
            .preloader__circle {
                width: 100%;
                height: 100%;
                border: 4px solid #e5e7eb;
                border-top: 4px solid var(--primary-color);
                border-radius: 50%;
                animation: spin 1s linear infinite;
            }
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        `;
        
        document.head.appendChild(style);
        document.body.appendChild(preloader);
        
        // Hide preloader when page is loaded
        window.addEventListener('load', function() {
            setTimeout(() => {
                preloader.style.opacity = '0';
                setTimeout(() => {
                    preloader.remove();
                }, 500);
            }, 1000);
        });
    }
});

/*==================== CONTACT FORM HANDLING ====================*/
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm(this)) {
                // Here you would typically send the form data to a server
                // For now, we'll just show a success message
                showNotification('Mensagem enviada com sucesso! Entraremos em contato em breve.', 'success');
                this.reset();
            } else {
                showNotification('Por favor, preencha todos os campos obrigatórios corretamente.', 'error');
            }
        });
    }
});

function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        color: white;
        font-weight: 500;
        z-index: 1000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        ${type === 'success' ? 'background: #10b981;' : 'background: #ef4444;'}
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
}

/*==================== BACK TO TOP SMOOTH SCROLL - REMOVIDO ====================*/
/*
const scrollUpBtn = document.getElementById('scroll-up');
if (scrollUpBtn) {
    scrollUpBtn.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}
*/

/*==================== CODE RAIN EFFECT (MEDICAL WORDS) ====================*/
function initCodeRain() {
    const container = document.getElementById("code-rain-container");
    if (!container) return;
    
    // Termos médicos e endocrinológicos para a chuva de códigos
    const snippets = [
        "Diabetes", "Tireóide", "Insulina", "Glicemia", "Hormônio", 
        "Endócrino", "Metabolismo", "T3 Livre", "T4 Livre", "TSH", 
        "Check-up", "Glucagon", "Cortisol", "Obesidade", "Hipófise", 
        "Neuropatia", "Retinopatia", "Colesterol", "Triglicerídeos"
    ];
    
    const isMobile = window.innerWidth <= 768;
    function randBetween(min, max) { return Math.random() * (max - min) + min; }
    
    // Cria um novo termo caindo a cada 420-520 milissegundos
    setInterval(() => {
        const snippet = document.createElement("div");
        snippet.classList.add("code-snippet");
        // Conteúdo interno para permitir micro-interações sem conflitar com a animação principal
        const inner = document.createElement('span');
        inner.className = 'code-snippet__inner';
        inner.textContent = snippets[Math.floor(Math.random() * snippets.length)];
        snippet.appendChild(inner);
        
        // Define a posição horizontal e a duração da animação (velocidade)
        const leftVw = Math.min(98, Math.max(2, randBetween(0, 100)));
        snippet.style.left = leftVw + "vw";
        snippet.style.animationDuration = randBetween(isMobile ? 12 : 15, isMobile ? 20 : 25) + "s";
        snippet.style.fontSize = randBetween(isMobile ? 0.9 : 0.8, isMobile ? 1.3 : 1.2) + "rem";
        
        container.appendChild(snippet);
        
        // Remove o elemento da DOM após a queda para manter a performance
        setTimeout(() => { snippet.remove(); }, 26000);
    }, isMobile ? 420 : 520); 

    // Micro-interação: afastar termos do cursor suavemente
    let rafId = null;
    let mouseX = 0, mouseY = 0;
    let needsUpdate = false;

    function onMove(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
        if (!rafId) {
            rafId = requestAnimationFrame(applyRepulsion);
        }
    }

    function applyRepulsion() {
        rafId = null;
        const inners = container.querySelectorAll('.code-snippet__inner');
        const maxDistance = 120; // px
        const maxOffset = 28; // px
        inners.forEach(inner => {
            const parent = inner.parentElement;
            const rect = parent.getBoundingClientRect();
            const cx = rect.left + rect.width / 2;
            const cy = rect.top + rect.height / 2;
            const dx = cx - mouseX;
            const dy = cy - mouseY;
            const dist = Math.hypot(dx, dy);
            if (dist < maxDistance) {
                const strength = 1 - dist / maxDistance; // 0..1
                const nx = dx / (dist || 1);
                const ny = dy / (dist || 1);
                const offsetX = nx * maxOffset * strength;
                const offsetY = ny * maxOffset * strength;
                inner.style.transform = `translate3d(${offsetX}px, ${offsetY}px, 0)`;
            } else {
                // Volta suavemente ao lugar
                if (inner.style.transform) inner.style.transform = 'translate3d(0,0,0)';
            }
        });
    }

    // Ativa apenas em dispositivos com ponteiro fino (mouse)
    if (window.matchMedia('(pointer: fine)').matches) {
        window.addEventListener('mousemove', onMove);
    }
}

/*==================== SITE SWITCH REDIRECTION ====================*/
function initSiteSwitcher() {
    const siteSwitcher = document.getElementById('site-switcher');

    if (siteSwitcher) {
        // Adiciona listener ao componente completo
        siteSwitcher.addEventListener('click', function(e) {
            e.stopPropagation();

            const redirectUrl = siteSwitcher.dataset.redirectUrl;

            // 1. Adiciona a classe visualmente para a animação do slider
            siteSwitcher.classList.add('active'); 
            
            // 2. Espera a animação do slider terminar (0.3s) e redireciona
            setTimeout(() => {
                window.location.href = redirectUrl;
            }, 300); 
        });
    }
}

/*==================== FLOATING CTA AND POPUP (NOVO) ====================*/
function initFloatingCta() {
    const ctaContainer = document.getElementById('floating-cta-container');
    const ctaPopup = document.getElementById('floating-cta-popup');
    const closeBtn = document.getElementById('popup-close-btn');

    if (!ctaContainer || !ctaPopup || !closeBtn) return;
    
    let isPopupDismissed = sessionStorage.getItem('cta-popup-dismissed') === 'true';

    // 1. Mostrar/Ocultar o CTA flutuante após uma rolagem de 300px
    function toggleFloatingCta() {
        if (window.scrollY > 300) {
            ctaContainer.classList.add('show-cta');
        } else {
            ctaContainer.classList.remove('show-cta');
        }
    }
    window.addEventListener('scroll', toggleFloatingCta);
    window.addEventListener('load', toggleFloatingCta);

    // 2. Mostrar o pop-up inicial após um delay, se não foi dispensado
    function showPopup() {
        if (!isPopupDismissed) {
            // Adiciona classe para iniciar a animação CSS
            ctaPopup.classList.add('show-popup'); 
            
            // Auto-ocultar após 8 segundos
            setTimeout(() => {
                if (ctaPopup.classList.contains('show-popup')) {
                    ctaPopup.classList.remove('show-popup');
                }
            }, 8000); 
        }
    }
    
    // Mostra o pop-up após 3 segundos do carregamento da página
    setTimeout(showPopup, 3000); 

    // 3. Fechar o pop-up ao clicar no botão de fechar
    closeBtn.addEventListener('click', () => {
        ctaPopup.classList.remove('show-popup');
        // Salva no sessionStorage para não reaparecer na mesma sessão
        sessionStorage.setItem('cta-popup-dismissed', 'true');
        isPopupDismissed = true;
    });
    
    // 4. Fechar o pop-up ao clicar no botão flutuante principal (para não atrapalhar o clique)
    const ctaBtn = document.querySelector('.floating-cta-btn');
    if (ctaBtn) {
        ctaBtn.addEventListener('click', () => {
            ctaPopup.classList.remove('show-popup');
            sessionStorage.setItem('cta-popup-dismissed', 'true');
        });
    }
}

/*==================== NEWSLETTER POP-UP MODAL (NOVO) ====================*/
function initNewsletterPopup() {
    const modal = document.getElementById('newsletter-popup-modal');
    const closeBtn = document.getElementById('newsletter-modal-close');
    const form = document.getElementById('popup-newsletter-form');
    
    // Verifica se o usuário já viu ou se inscreveu nesta sessão
    let isPopupDismissed = sessionStorage.getItem('newsletter-popup-dismissed') === 'true';

    function showModal() {
        if (!modal || isPopupDismissed) return;
        
        // Adiciona classe para iniciar a animação CSS (Pop-In)
        modal.classList.add('show-modal'); 
        
        // Oculta automaticamente após 15 segundos se não houver interação
        setTimeout(() => {
            if (modal.classList.contains('show-modal')) {
                closeModal();
            }
        }, 15000); 
    }

    function closeModal() {
        if (!modal) return;
        modal.classList.remove('show-modal');
        // Salva no sessionStorage para não reaparecer na mesma sessão
        sessionStorage.setItem('newsletter-popup-dismissed', 'true');
        isPopupDismissed = true;
    }

    // 1. Mostrar pop-up após 5 segundos do load, se não tiver sido dispensado
    window.addEventListener('load', () => {
         // Atraso de 5 segundos para dar tempo ao usuário interagir e não ser invasivo
         setTimeout(showModal, 5000); 
    });


    // 2. Fechar ao clicar no 'X'
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }
    
    // 3. Fechar ao clicar fora do modal (overlay)
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target.id === 'newsletter-popup-modal') {
                closeModal();
            }
        });
    }

    // 4. Submissão do Formulário (Permite submissão nativa para FormSubmit se a validação passar)
    if (form) {
        form.addEventListener('submit', function(e) {
            
            // Só previne o envio se a validação JS falhar
            if (!validateForm(this)) { 
                e.preventDefault();
                showNotification('Por favor, insira um e-mail válido.', 'error');
            } else {
                // Se o formulário for válido, permite a submissão nativa (para FormSubmit)
                // Exibe uma notificação de envio e fecha o modal antes do redirecionamento
                showNotification('Enviando seu e-mail...', 'info');
                closeModal(); 
            }
        });
    }
}


/*==================== DOCUMENT LOAD INITIALIZATION ====================*/
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm(this)) {
                // Here you would typically send the form data to a server
                // For now, we'll just show a success message
                showNotification('Mensagem enviada com sucesso! Entraremos em contato em breve.', 'success');
                this.reset();
            } else {
                showNotification('Por favor, preencha todos os campos obrigatórios corretamente.', 'error');
            }
        });
    }
    
    // Inicializa a chuva de códigos médica
    initCodeRain();

    // Inicializa o Site Switch
    initSiteSwitcher();
    
    // NOVO: Inicializa o Floating CTA e Pop-up
    initFloatingCta();

    // NOVO: Inicializa o Newsletter Pop-up
    initNewsletterPopup();

    // ===== PAGE TRANSITIONS (FADE) =====
    // Fade-in on load
    document.body.classList.add('fade-in');

    // Intercept internal navigation for fade-out
    document.querySelectorAll('a[href]').forEach(a => {
        const href = a.getAttribute('href');
        const isAnchor = href && href.startsWith('#');
        const isExternal = a.target === '_blank' || (href && /^https?:\/\//i.test(href) && !href.includes(window.location.host));
        if (!href || isAnchor || isExternal) return;

        a.addEventListener('click', function(e) {
            e.preventDefault();
            const url = this.href;
            document.body.classList.add('fade-out');
            setTimeout(() => { window.location.href = url; }, 300);
        });
    });
});