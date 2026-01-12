// ============================================
// MAIN SCRIPT - ENGENHARIA CIVIL SITE
// ============================================

// Aguarda o carregamento completo da página
document.addEventListener('DOMContentLoaded', function() {
    console.log('Site EngConstruções carregado');
    
    // Inicializar todas as funcionalidades
    initLoader();
    initMobileMenu();
    initSmoothScroll();
    initBackToTop();
    initClientSlider();
    initContactForm();
    initCurrentYear();
    initScrollAnimations();
    initHeaderScroll();
});

// ============================================
// LOADER
// ============================================

function initLoader() {
    const loader = document.getElementById('loader');
    
    // Simular tempo de carregamento
    setTimeout(() => {
        loader.classList.add('fade-out');
        
        // Remover loader do DOM após a transição
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }, 1000);
}

// ============================================
// MENU MOBILE - FUNÇÃO CORRIGIDA
// ============================================

function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const menuOverlay = document.querySelector('.menu-overlay');
    const navLinks = document.querySelectorAll('.nav-link');
    const body = document.body;
    
    if (!menuToggle) return;
    
    // Abrir/fechar menu
    menuToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        const isActive = this.classList.toggle('active');
        navMenu.classList.toggle('active');
        body.style.overflow = isActive ? 'hidden' : 'auto';
        this.setAttribute('aria-expanded', isActive);
    });
    
    // Fechar menu ao clicar no overlay
    if (menuOverlay) {
        menuOverlay.addEventListener('click', function() {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
            body.style.overflow = 'auto';
            menuToggle.setAttribute('aria-expanded', 'false');
        });
    }
    
    // Fechar menu ao clicar em links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
            if (menuOverlay) menuOverlay.style.display = 'none';
            body.style.overflow = 'auto';
            menuToggle.setAttribute('aria-expanded', 'false');
        });
    });
    
    // Fechar menu com ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
            if (menuOverlay) menuOverlay.style.display = 'none';
            body.style.overflow = 'auto';
            menuToggle.setAttribute('aria-expanded', 'false');
        }
    });
}

// ============================================
// SCROLL SUAVE
// ============================================

function initSmoothScroll() {
    // Links de navegação interna
    const navLinks = document.querySelectorAll('a[href^="#"]:not([href="#"])');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Calcular posição do elemento considerando header fixo
                const headerHeight = document.getElementById('header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                // Scroll suave
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Atualizar link ativo
                updateActiveNavLink(targetId);
            }
        });
    });
}

// ============================================
// ATUALIZAR LINK ATIVO NA NAVEGAÇÃO
// ============================================

function updateActiveNavLink(targetId) {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        
        if (link.getAttribute('href') === targetId) {
            link.classList.add('active');
        }
    });
}

// ============================================
// BACK TO TOP BUTTON
// ============================================

function initBackToTop() {
    const backToTopButton = document.getElementById('backToTop');
    
    // Mostrar/ocultar botão baseado na posição do scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });
    
    // Scroll suave ao topo
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ============================================
// HEADER SCROLL EFFECT
// ============================================

function initHeaderScroll() {
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// ============================================
// SLIDER DE CLIENTES
// ============================================

function initClientSlider() {
    const clientLogos = document.querySelector('.client-logos');
    const prevButton = document.querySelector('.slider-prev');
    const nextButton = document.querySelector('.slider-next');
    
    if (!clientLogos || !prevButton || !nextButton) return;
    
    let scrollPosition = 0;
    const scrollAmount = 200;
    
    // Próximo
    nextButton.addEventListener('click', function() {
        scrollPosition += scrollAmount;
        clientLogos.scrollTo({
            left: scrollPosition,
            behavior: 'smooth'
        });
    });
    
    // Anterior
    prevButton.addEventListener('click', function() {
        scrollPosition -= scrollAmount;
        if (scrollPosition < 0) scrollPosition = 0;
        
        clientLogos.scrollTo({
            left: scrollPosition,
            behavior: 'smooth'
        });
    });
}

// ============================================
// FORMULÁRIO DE CONTATO
// ============================================

function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Resetar erros
        resetFormErrors();
        
        // Validar campos
        const isValid = validateForm();
        
        if (isValid) {
            // Simular envio do formulário
            simulateFormSubmission();
        }
    });
    
    // Validação em tempo real
    const inputs = contactForm.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            clearFieldError(this);
        });
    });
}

function validateForm() {
    const contactForm = document.getElementById('contactForm');
    const nameInput = contactForm.querySelector('#name');
    const emailInput = contactForm.querySelector('#email');
    const messageInput = contactForm.querySelector('#message');
    
    let isValid = true;
    
    // Validar nome
    if (!nameInput.value.trim()) {
        showFieldError(nameInput, 'Por favor, informe seu nome completo');
        isValid = false;
    }
    
    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailInput.value.trim()) {
        showFieldError(emailInput, 'Por favor, informe seu e-mail');
        isValid = false;
    } else if (!emailRegex.test(emailInput.value)) {
        showFieldError(emailInput, 'Por favor, informe um e-mail válido');
        isValid = false;
    }
    
    // Validar mensagem
    if (!messageInput.value.trim()) {
        showFieldError(messageInput, 'Por favor, escreva sua mensagem');
        isValid = false;
    }
    
    return isValid;
}

function validateField(field) {
    const fieldId = field.id;
    const fieldValue = field.value.trim();
    
    if (field.hasAttribute('required') && !fieldValue) {
        const fieldName = field.previousElementSibling.textContent;
        showFieldError(field, `Por favor, preencha o campo "${fieldName}"`);
        return false;
    }
    
    if (fieldId === 'email' && fieldValue) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(fieldValue)) {
            showFieldError(field, 'Por favor, informe um e-mail válido');
            return false;
        }
    }
    
    return true;
}

function showFieldError(field, message) {
    const errorElement = document.getElementById(`${field.id}Error`);
    
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
        field.style.borderColor = '#dc3545';
    }
}

function clearFieldError(field) {
    const errorElement = document.getElementById(`${field.id}Error`);
    
    if (errorElement) {
        errorElement.style.display = 'none';
        field.style.borderColor = '#ddd';
    }
}

function resetFormErrors() {
    const errorMessages = document.querySelectorAll('.error-message');
    const inputs = document.querySelectorAll('#contactForm input, #contactForm textarea');
    
    errorMessages.forEach(error => {
        error.style.display = 'none';
    });
    
    inputs.forEach(input => {
        input.style.borderColor = '#ddd';
    });
}

function simulateFormSubmission() {
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');
    
    // Simular tempo de envio
    contactForm.style.opacity = '0.5';
    contactForm.style.pointerEvents = 'none';
    
    setTimeout(() => {
        // Mostrar mensagem de sucesso
        formSuccess.style.display = 'flex';
        
        // Resetar formulário
        setTimeout(() => {
            contactForm.reset();
            contactForm.style.opacity = '1';
            contactForm.style.pointerEvents = 'auto';
            
            // Ocultar mensagem de sucesso após alguns segundos
            setTimeout(() => {
                formSuccess.style.display = 'none';
            }, 5000);
        }, 1000);
    }, 1500);
}

// ============================================
// ANIMAÇÕES AO SCROLL
// ============================================

function initScrollAnimations() {
    // Observar elementos para animar quando entrarem na viewport
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Elementos para observar
    const elementsToAnimate = document.querySelectorAll('.about-card, .service-card, .contact-item');
    
    elementsToAnimate.forEach(element => {
        observer.observe(element);
    });
}

// ============================================
// ANO ATUAL NO FOOTER
// ============================================

function initCurrentYear() {
    const currentYearElement = document.getElementById('currentYear');
    
    if (currentYearElement) {
        const currentYear = new Date().getFullYear();
        currentYearElement.textContent = currentYear;
    }
}

// ============================================
// DARK MODE (OPCIONAL)
// ============================================

function initDarkMode() {
    // Esta função seria implementada se o dark mode fosse adicionado
    console.log('Dark mode disponível para implementação futura');
}

// ============================================
// FUNÇÕES AUXILIARES
// ============================================

// Debounce para otimizar eventos de scroll/resize
function debounce(func, wait = 20, immediate = true) {
    let timeout;
    return function() {
        const context = this, args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}