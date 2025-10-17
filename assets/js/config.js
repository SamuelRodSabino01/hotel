// Configurações do Hotel dos Lagos
const HotelConfig = {
    // Informações do Hotel
    hotel: {
        name: "Hotel dos Lagos",
        phone: "+55 11 99999-9999",
        whatsapp: "5535999052225",
        email: "contato@hoteldoslagos.com.br",
        address: {
            street: "R. Alterosa, 101 - Jardim Vista Alegre",
            city: "Alfenas",
            state: "MG",
            zipCode: "37132-166",
            coordinates: {
                lat: -23.5505,
                lng: -46.6333
            }
        }
    },

    // URLs e Links
    urls: {
        booking: "https://www.booking.com/hotel/br/dos-lagos",
        website: "https://www.hoteldoslagos.com.br",
        socialMedia: {
            facebook: "https://www.facebook.com/hoteldoslagos",
    instagram: "https://www.instagram.com/hoteldoslagos/",
            youtube: "https://youtube.com/hoteldoslagos"
        }
    },

    // Configurações do Carrossel
    carousel: {
        autoSlideInterval: 5000, // 5 segundos
        transitionDuration: 500,
        pauseOnHover: true,
        enableKeyboardNavigation: true,
        enableTouchSwipe: true
    },

    // Configurações de Animação
    animations: {
        duration: 800,
        easing: 'ease-in-out',
        offset: 100,
        disableOnMobile: false
    },

    // Google Maps
    maps: {
        apiKey: "YOUR_GOOGLE_MAPS_API_KEY",
        zoom: 15,
        style: "roadmap", // roadmap, satellite, hybrid, terrain
        markers: [
            {
                name: "Hotel dos Lagos",
                lat: -23.5505,
                lng: -46.6333,
                icon: "hotel"
            },
            {
                name: "Restaurante Lago Azul",
                lat: -23.5515,
                lng: -46.6343,
                icon: "restaurant"
            },
            {
                name: "Centro Histórico",
                lat: -23.5495,
                lng: -46.6323,
                icon: "attraction"
            }
        ]
    },

    // Configurações de Performance
    performance: {
        lazyLoadOffset: 100,
        debounceDelay: 10,
        preloadCriticalImages: true,
        enableServiceWorker: false
    },

    // Analytics
    analytics: {
        googleAnalyticsId: "GA_MEASUREMENT_ID",
        enableTracking: false,
        trackScrollDepth: true,
        trackOutboundLinks: true
    },

    // Configurações de UI
    ui: {
        showLoadingScreen: true,
        loadingScreenDelay: 1000,
        enableCookieConsent: true,
        cookieConsentDelay: 2000,
        enableBackToTop: true,
        backToTopOffset: 300
    },

    // Breakpoints Responsivos
    breakpoints: {
        mobile: 767,
        tablet: 1199,
        desktop: 1200
    },

    // Mensagens Personalizadas
    messages: {
        whatsapp: "Olá! Gostaria de fazer uma reserva no Hotel dos Lagos.",
        booking: "Reserve agora e garanta o melhor preço!",
        loading: "Carregando...",
        error: "Ops! Algo deu errado. Tente novamente.",
        cookieConsent: "Este site utiliza cookies para melhorar sua experiência. Ao continuar navegando, você concorda com nossa política de cookies."
    },

    // Configurações de Desenvolvimento
    development: {
        enableDebugMode: false,
        showPerformanceMetrics: false,
        enableConsoleLogging: true
    }
};

// Exportar configurações (se usando módulos)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = HotelConfig;
}

// Disponibilizar globalmente
window.HotelConfig = HotelConfig;