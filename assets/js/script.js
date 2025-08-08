// Inicialização quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar AOS (Animate On Scroll)
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        offset: 100
    });

    // Inicializar funcionalidades
    initNavbar();
    initCarousel();
    initBackToTop();
    initSmoothScroll();
    initMobileMenu();
});

// Navbar - Efeito de scroll
function initNavbar() {
    const navbar = document.getElementById('navbar');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Adicionar/remover classe baseada no scroll
        if (scrollTop > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Esconder/mostrar navbar no mobile ao fazer scroll
        if (window.innerWidth <= 768) {
            if (scrollTop > lastScrollTop && scrollTop > 100) {
                navbar.style.transform = 'translateY(-100%)';
            } else {
                navbar.style.transform = 'translateY(0)';
            }
        }
        
        lastScrollTop = scrollTop;
    });

    // Destacar link ativo baseado na seção visível
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Carrossel do Hero Section
function initCarousel() {
    const slides = document.querySelectorAll('.carousel-slide');
    const indicators = document.querySelectorAll('.indicator');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    let currentSlide = 0;
    const totalSlides = slides.length;
    let autoSlideInterval;

    // Função para mostrar slide específico
    function showSlide(index) {
        // Remover classe active de todos os slides e indicadores
        slides.forEach(slide => slide.classList.remove('active'));
        indicators.forEach(indicator => indicator.classList.remove('active'));
        
        // Adicionar classe active ao slide e indicador atual
        slides[index].classList.add('active');
        indicators[index].classList.add('active');
        
        currentSlide = index;
    }

    // Função para próximo slide
    function nextSlide() {
        const next = (currentSlide + 1) % totalSlides;
        showSlide(next);
    }

    // Função para slide anterior
    function prevSlide() {
        const prev = (currentSlide - 1 + totalSlides) % totalSlides;
        showSlide(prev);
    }

    // Auto-play do carrossel
    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 5000); // Troca a cada 5 segundos
    }

    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }

    // Event listeners para botões
    nextBtn.addEventListener('click', () => {
        nextSlide();
        stopAutoSlide();
        startAutoSlide(); // Reinicia o auto-play
    });

    prevBtn.addEventListener('click', () => {
        prevSlide();
        stopAutoSlide();
        startAutoSlide(); // Reinicia o auto-play
    });

    // Event listeners para indicadores
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            showSlide(index);
            stopAutoSlide();
            startAutoSlide(); // Reinicia o auto-play
        });
    });

    // Pausar auto-play quando mouse estiver sobre o carrossel
    const heroSection = document.querySelector('.hero');
    heroSection.addEventListener('mouseenter', stopAutoSlide);
    heroSection.addEventListener('mouseleave', startAutoSlide);

    // Controle por teclado
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevSlide();
            stopAutoSlide();
            startAutoSlide();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
            stopAutoSlide();
            startAutoSlide();
        }
    });

    // Iniciar auto-play
    startAutoSlide();

    // Suporte a touch/swipe para mobile
    let touchStartX = 0;
    let touchEndX = 0;

    heroSection.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    heroSection.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swipe left - próximo slide
                nextSlide();
            } else {
                // Swipe right - slide anterior
                prevSlide();
            }
            stopAutoSlide();
            startAutoSlide();
        }
    }
}

// Botão Voltar ao Topo
function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    
    // Mostrar/esconder botão baseado no scroll
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    // Scroll suave para o topo
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Scroll suave para links internos
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Compensar altura da navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Menu mobile (hamburger)
function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
        
        // Animar linhas do hamburger
        const spans = hamburger.querySelectorAll('span');
        if (hamburger.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
    
    // Fechar menu ao clicar em um link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
            
            const spans = hamburger.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        });
    });
    
    // Fechar menu ao clicar fora dele
    document.addEventListener('click', function(e) {
        if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
            
            const spans = hamburger.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
}

// Lazy loading para imagens
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
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
    
    images.forEach(img => imageObserver.observe(img));
}

// Animações de hover para cards
function initCardAnimations() {
    const cards = document.querySelectorAll('.accommodation-card, .service-item, .experience-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// Contador animado (se necessário para estatísticas futuras)
function animateCounters() {
    const counters = document.querySelectorAll('.counter');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.dataset.target);
                const duration = 2000; // 2 segundos
                const increment = target / (duration / 16); // 60fps
                let current = 0;
                
                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        counter.textContent = Math.floor(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target;
                    }
                };
                
                updateCounter();
                counterObserver.unobserve(counter);
            }
        });
    });
    
    counters.forEach(counter => counterObserver.observe(counter));
}

// Validação de formulários (para futuras implementações)
function initFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const inputs = form.querySelectorAll('input[required], textarea[required]');
            let isValid = true;
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.classList.add('error');
                } else {
                    input.classList.remove('error');
                }
            });
            
            if (isValid) {
                // Processar formulário
                console.log('Formulário válido - processar envio');
            }
        });
    });
}

// Otimização de performance
function initPerformanceOptimizations() {
    // Debounce para eventos de scroll
    let scrollTimeout;
    const originalScrollHandler = window.onscroll;
    
    window.onscroll = function() {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        
        scrollTimeout = setTimeout(() => {
            if (originalScrollHandler) {
                originalScrollHandler();
            }
        }, 10);
    };
    
    // Preload de imagens críticas
    const criticalImages = [
        'https://images.unsplash.com/photo-1566073771259-6a8506099945',
        'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9',
        'https://images.unsplash.com/photo-1578662996442-48f60103fc96'
    ];
    
    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Tratamento de erros globais
window.addEventListener('error', function(e) {
    console.error('Erro capturado:', e.error);
    // Aqui você pode implementar um sistema de logging
});

// Inicializar funcionalidades adicionais quando necessário
document.addEventListener('DOMContentLoaded', function() {
    initCardAnimations();
    initPerformanceOptimizations();
    
    // Verificar se há suporte para Intersection Observer
    if ('IntersectionObserver' in window) {
        initLazyLoading();
        animateCounters();
    }
});

// Service Worker para cache (opcional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registrado com sucesso:', registration);
            })
            .catch(registrationError => {
                console.log('Falha no registro do SW:', registrationError);
            });
    });
}

// Função para detectar dispositivo móvel
function isMobile() {
    return window.innerWidth <= 768;
}

// Ajustes específicos para mobile
function initMobileOptimizations() {
    if (isMobile()) {
        // Reduzir animações em dispositivos móveis para melhor performance
        document.body.classList.add('mobile-device');
        
        // Ajustar altura do viewport para mobile
        const setVH = () => {
            const vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        };
        
        setVH();
        window.addEventListener('resize', setVH);
    }
}

// Inicializar otimizações mobile
document.addEventListener('DOMContentLoaded', initMobileOptimizations);

// Função para analytics (Google Analytics, etc.)
function trackEvent(eventName, eventData) {
    // Implementar tracking de eventos
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, eventData);
    }
    
    // Console log para desenvolvimento
    console.log('Event tracked:', eventName, eventData);
}

// Dropdown do menu de navegação
function initDropdown() {
    const dropdownTrigger = document.querySelector('.dropdown-trigger');
    const dropdownMenu = document.querySelector('.dropdown-menu');
    
    if (dropdownTrigger && dropdownMenu) {
        dropdownTrigger.addEventListener('mouseenter', function() {
            dropdownMenu.classList.add('show');
        });
        
        dropdownTrigger.addEventListener('mouseleave', function() {
            setTimeout(() => {
                if (!dropdownMenu.matches(':hover')) {
                    dropdownMenu.classList.remove('show');
                }
            }, 100);
        });
        
        dropdownMenu.addEventListener('mouseleave', function() {
            dropdownMenu.classList.remove('show');
        });
        
        // Para mobile - toggle no click
        if (isMobile()) {
            dropdownTrigger.addEventListener('click', function(e) {
                e.preventDefault();
                dropdownMenu.classList.toggle('show');
            });
        }
    }
}

// Parallax effect para hero section
function initParallax() {
    const heroSection = document.querySelector('.hero');
    
    if (heroSection && !isMobile()) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            heroSection.style.transform = `translateY(${rate}px)`;
        });
    }
}

// Animação de entrada para elementos
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// Função para modal (para futuras implementações)
function initModal() {
    const modalTriggers = document.querySelectorAll('[data-modal]');
    const modals = document.querySelectorAll('.modal');
    const closeButtons = document.querySelectorAll('.modal-close');
    
    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', function(e) {
            e.preventDefault();
            const modalId = this.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            
            if (modal) {
                modal.classList.add('active');
                document.body.classList.add('modal-open');
            }
        });
    });
    
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('.modal');
            modal.classList.remove('active');
            document.body.classList.remove('modal-open');
        });
    });
    
    // Fechar modal ao clicar no overlay
    modals.forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.classList.remove('active');
                document.body.classList.remove('modal-open');
            }
        });
    });
    
    // Fechar modal com ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const activeModal = document.querySelector('.modal.active');
            if (activeModal) {
                activeModal.classList.remove('active');
                document.body.classList.remove('modal-open');
            }
        }
    });
}

// Loading screen
function initLoadingScreen() {
    const loadingScreen = document.querySelector('.loading-screen');
    
    if (loadingScreen) {
        window.addEventListener('load', function() {
            setTimeout(() => {
                loadingScreen.classList.add('fade-out');
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                }, 500);
            }, 1000);
        });
    }
}

// Função para cookies (LGPD)
function initCookieConsent() {
    const cookieBanner = document.querySelector('.cookie-banner');
    const acceptButton = document.querySelector('.accept-cookies');
    
    if (cookieBanner && acceptButton) {
        // Verificar se já aceitou cookies
        if (!localStorage.getItem('cookiesAccepted')) {
            setTimeout(() => {
                cookieBanner.classList.add('show');
            }, 2000);
        }
        
        acceptButton.addEventListener('click', function() {
            localStorage.setItem('cookiesAccepted', 'true');
            cookieBanner.classList.remove('show');
        });
    }
}

// Função para WhatsApp
function initWhatsApp() {
    const whatsappBtn = document.getElementById('whatsappBtn');
    
    if (whatsappBtn) {
        whatsappBtn.addEventListener('click', function() {
            const message = encodeURIComponent('Olá! Gostaria de fazer uma reserva no Hotel dos Lagos.');
            const phone = '5511999999999'; // Substitua pelo número real
            const url = `https://wa.me/${phone}?text=${message}`;
            
            window.open(url, '_blank');
            
            // Track event
            trackEvent('whatsapp_click', {
                event_category: 'engagement',
                event_label: 'whatsapp_button'
            });
        });
    }
}

// Função para botões de reserva
function initBookingButtons() {
    const bookingButtons = document.querySelectorAll('.booking-btn');
    
    bookingButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Aqui você pode redirecionar para o Booking.com ou sistema próprio
            const bookingUrl = 'https://www.booking.com/hotel/br/hotel-dos-lagos.html'; // URL real do hotel
            window.open(bookingUrl, '_blank');
            
            // Track event
            trackEvent('booking_click', {
                event_category: 'conversion',
                event_label: 'booking_button',
                value: 1
            });
        });
    });
}

// Função para otimizar imagens baseado na conexão
function initAdaptiveImages() {
    if ('connection' in navigator) {
        const connection = navigator.connection;
        const images = document.querySelectorAll('img[data-src-hd]');
        
        images.forEach(img => {
            if (connection.effectiveType === '4g' || connection.effectiveType === 'wifi') {
                img.src = img.dataset.srcHd; // Imagem HD
            } else {
                img.src = img.dataset.src; // Imagem padrão
            }
        });
    }
}

// Função para detectar modo escuro do sistema
function initDarkModeDetection() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.body.classList.add('dark-mode-preferred');
    }
    
    // Escutar mudanças no modo escuro
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        if (e.matches) {
            document.body.classList.add('dark-mode-preferred');
        } else {
            document.body.classList.remove('dark-mode-preferred');
        }
    });
}

// Inicialização completa
document.addEventListener('DOMContentLoaded', function() {
    // Funcionalidades principais
    initNavbar();
    initCarousel();
    initBackToTop();
    initSmoothScroll();
    initMobileMenu();
    initDropdown();
    initWhatsApp();
    initBookingButtons();
    
    // Funcionalidades de UX
    initCardAnimations();
    initLoadingScreen();
    initCookieConsent();
    initModal();
    
    // Otimizações
    initPerformanceOptimizations();
    initMobileOptimizations();
    initAdaptiveImages();
    initDarkModeDetection();
    
    // Animações e efeitos
    if ('IntersectionObserver' in window) {
        initLazyLoading();
        animateCounters();
        initScrollAnimations();
    }
    
    if (!isMobile()) {
        initParallax();
    }
    
    // AOS (Animate On Scroll)
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            offset: 100,
            disable: isMobile() ? 'mobile' : false
        });
    }
});

// Tratamento de redimensionamento da janela
let resizeTimeout;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(function() {
        // Reajustar elementos baseado no novo tamanho
        if (isMobile()) {
            document.body.classList.add('mobile-device');
        } else {
            document.body.classList.remove('mobile-device');
        }
    }, 250);
});

// Função de debug (apenas em desenvolvimento)
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    window.hotelDebug = {
        trackEvent: trackEvent,
        isMobile: isMobile,
        version: '1.0.0'
    };
    
    console.log('🏨 Hotel dos Lagos - Debug mode ativo');
    console.log('Versão:', window.hotelDebug.version);
}