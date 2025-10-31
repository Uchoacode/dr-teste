/*==================== MENU SHOW Y HIDDEN ====================*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close')

/*===== MENU SHOW =====*/
/* Validate if constant exists */
if(navToggle){
    navToggle.addEventListener('click', () =>{
        // CORREÇÃO: Usa a classe 'open-menu' para abrir o menu lateral
        navMenu.classList.add('open-menu')
    })
}

/*===== MENU HIDDEN =====*/
/* Validate if constant exists */
if(navClose){
    navClose.addEventListener('click', () =>{
        // CORREÇÃO: Usa a classe 'open-menu' para fechar o menu lateral
        navMenu.classList.remove('open-menu')
    })
}

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the open-menu class
    // CORREÇÃO: Remove a classe 'open-menu'
    navMenu.classList.remove('open-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

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

/*==================== SHOW SCROLL UP ====================*/ 
function scrollUp(){
    const scrollUp = document.getElementById('scroll-up');
    // When the scroll is higher than 560 viewport height, add the show-scroll class to the a tag with the scroll-top class
    // CORREÇÃO: A classe de mostrar agora usa 'show-scroll' (já estava no CSS, mas o valor de bottom foi corrigido lá)
    if(this.scrollY >= 560) scrollUp.classList.add('show-scroll'); else scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)

/*==================== SMOOTH SCROLLING ====================*/
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);
        
        if (target) {
            // CORREÇÃO: Usa scrollIntoView para rolagem suave
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });

            // CORREÇÃO: Adiciona um ajuste para o cabeçalho fixo após a rolagem. 
            // O CSS scroll-margin-top é uma solução melhor, mas este é um fallback JavaScript.
            // Para não ter o salto, a melhor forma é usar scroll-margin-top no CSS.
            /*
            if(targetId !== '#home') {
                setTimeout(() => {
                    const headerHeight = document.getElementById('header').offsetHeight;
                    window.scrollBy(0, -headerHeight);
                }, 400); // 400ms após o início do smooth scroll
            }
            */
        }
    });
});

/*==================== TYPING ANIMATION ====================*/
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing animation when page loads
document.addEventListener('DOMContentLoaded', function() {
    const titleElement = document.querySelector('.home__title-accent');
    if (titleElement) {
        const originalText = titleElement.textContent;
        typeWriter(titleElement, originalText, 150);
    }
});

/*==================== INTERSECTION OBSERVER FOR ANIMATIONS ====================*/
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in-up');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
    const elementsToAnimate = document.querySelectorAll('.specialty__card, .education__item, .stat__item, .contact__item');
    elementsToAnimate.forEach(el => observer.observe(el));
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
// Skip to main content
document.addEventListener('DOMContentLoaded', function() {
    const skipLink = document.createElement('a');
    skipLink.href = '#main';
    skipLink.textContent = 'Pular para o conteúdo principal';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: var(--primary-color);
        color: white;
        padding: 8px;
        text-decoration: none;
        border-radius: 4px;
        z-index: 1000;
        transition: top 0.3s;
    `;
    
    skipLink.addEventListener('focus', function() {
        this.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', function() {
        this.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
});

// Focus management for mobile menu
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

/*==================== BACK TO TOP SMOOTH SCROLL ====================*/
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

/* ... código JavaScript existente ... */

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
        // Seleciona um termo aleatório da lista
        snippet.textContent = snippets[Math.floor(Math.random() * snippets.length)];
        
        // Define a posição horizontal e a duração da animação (velocidade)
        const leftVw = Math.min(98, Math.max(2, randBetween(0, 100)));
        snippet.style.left = leftVw + "vw";
        snippet.style.animationDuration = randBetween(isMobile ? 12 : 15, isMobile ? 20 : 25) + "s";
        snippet.style.fontSize = randBetween(isMobile ? 0.9 : 0.8, isMobile ? 1.3 : 1.2) + "rem";
        
        container.appendChild(snippet);
        
        // Remove o elemento da DOM após a queda para manter a performance
        setTimeout(() => { snippet.remove(); }, 26000);
    }, isMobile ? 420 : 520); 
}

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
    
    // Inicializa a chuva de códigos médica
    initCodeRain();
});
