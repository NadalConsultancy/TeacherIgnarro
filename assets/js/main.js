/* ================================================
   Teacher Ignarro - Main JavaScript
   Entry point that initializes all modules
   ================================================ */

// ================================================
// Internationalization (i18n)
// ================================================

let currentLang = 'pt';

const translations = {
    pt: {
        nav: { home: 'Inicio', about: 'Sobre', contact: 'Contato' },
        hero: { 
            badge: 'LANCAMENTO OFICIAL', 
            title1: 'Domine o Ingles', 
            subtitle: 'A apostila definitiva para acelerar seu aprendizado. Conteudo pratico, exercicios reais e a metodologia que ja ajudou centenas de alunos.', 
            btnPrimary: 'Quero minha apostila', 
            btnSecondary: 'Saber mais', 
            btnBuy: 'Comprar Agora', 
            priceLabel: 'Preco Especial' 
        },
        about: { 
            title: 'Sobre o ', 
            subtitle: 'Metodologia pratica e direta para voce destravar o seu ingles de uma vez por todas.', 
            question: 'Por que escolher esta apostila?', 
            description: 'O Teacher Ignarro desenvolveu um metodo exclusivo baseado em conversacao e gramatica aplicada. Esta apostila virtual condensa anos de experiencia em sala de aula em um material pratico, focado no que realmente importa para voce falar ingles com confianca.', 
            list1: 'Exercicios praticos com gabarito comentado.', 
            list2: 'Vocabulario focado em situacoes reais do dia a dia.', 
            list3: 'Dicas exclusivas de pronuncia e "linking sounds".' 
        },
        contact: { 
            title: 'Pronto para comecar?', 
            subtitle: 'Ficou com alguma duvida sobre a apostila ou quer saber mais sobre as aulas? Entre em contato comigo atraves das redes sociais.' 
        }
    },
    en: {
        nav: { home: 'Home', about: 'About', contact: 'Contact' },
        hero: { 
            badge: 'OFFICIAL LAUNCH', 
            title1: 'Master English', 
            subtitle: 'The definitive workbook to accelerate your learning. Practical content, real exercises, and the methodology that has helped hundreds of students.', 
            btnPrimary: 'Get my workbook', 
            btnSecondary: 'Learn more', 
            btnBuy: 'Buy Now', 
            priceLabel: 'Special Price' 
        },
        about: { 
            title: 'About ', 
            subtitle: 'Practical and direct methodology to unlock your English once and for all.', 
            question: 'Why choose this workbook?', 
            description: 'Teacher Ignarro developed an exclusive method based on conversation and applied grammar. This digital workbook condenses years of classroom experience into practical material, focused on what really matters for you to speak English with confidence.', 
            list1: 'Practical exercises with commented answer key.', 
            list2: 'Vocabulary focused on real everyday situations.', 
            list3: 'Exclusive pronunciation tips and "linking sounds".' 
        },
        contact: { 
            title: 'Ready to start?', 
            subtitle: 'Got any questions about the workbook or want to know more about the classes? Contact me through social media.' 
        }
    }
};

function getNestedValue(obj, path) {
    return path.split('.').reduce((prev, curr) => prev ? prev[curr] : null, obj);
}

function updateContent() {
    const content = translations[currentLang];
    
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        const value = getNestedValue(content, key);
        if (value) el.textContent = value;
    });
    
    // Update price badge label
    const priceLabel = document.getElementById('price-label');
    if (priceLabel) {
        priceLabel.textContent = content.hero.priceLabel;
    }
    
    const desktopBtn = document.getElementById('current-lang-text');
    if (desktopBtn) desktopBtn.textContent = currentLang.toUpperCase();
    
    const mobileBtn = document.getElementById('current-lang-mobile');
    if (mobileBtn) mobileBtn.textContent = currentLang === 'pt' ? 'Portugues' : 'English';
    
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

function toggleLanguage() {
    currentLang = currentLang === 'pt' ? 'en' : 'pt';
    updateContent();
}

// ================================================
// Navigation
// ================================================

const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const menuIcon = document.getElementById('menu-icon');
const closeIcon = document.getElementById('close-icon');
const mobileLinks = document.querySelectorAll('.mobile-link');
const teacherText = document.getElementById('teacher-text');
const ignarroText = document.getElementById('ignarro-text');
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const langBtn = document.getElementById('lang-btn-desktop');

let isMenuOpen = false;

function toggleMenu() {
    isMenuOpen = !isMenuOpen;
    
    if (isMenuOpen) {
        // Open Menu
        mobileMenu.classList.remove('translate-x-full');
        mobileMenu.classList.add('translate-x-0');
        
        // Add body class - CSS handles icon swap
        document.body.classList.add('menu-open');
        
        // Lock body scroll
        document.body.style.overflow = 'hidden';
        
        // Change logo colors to dark when menu is open
        if (teacherText) {
            teacherText.classList.remove('text-white', 'text-brand-navy');
            teacherText.classList.add('text-slate-900');
        }
    } else {
        // Close Menu
        mobileMenu.classList.add('translate-x-full');
        mobileMenu.classList.remove('translate-x-0');
        
        // Remove body class - CSS handles icon swap
        document.body.classList.remove('menu-open');
        
        // Unlock body scroll
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        document.documentElement.style.overflow = '';
        
        // Restore logo colors based on scroll position
        const isScrolled = window.scrollY > 20;
        if (teacherText) {
            if (isScrolled) {
                teacherText.classList.remove('text-white', 'text-slate-900');
                teacherText.classList.add('text-brand-navy');
            } else {
                teacherText.classList.remove('text-brand-navy', 'text-slate-900');
                teacherText.classList.add('text-white');
            }
        }
    }
}

// Mobile links close menu
mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (isMenuOpen) {
            isMenuOpen = false;
            toggleMenu();
            isMenuOpen = false;
        }
    });
});

if (menuBtn) menuBtn.addEventListener('click', toggleMenu);

// Scroll handler
window.addEventListener('scroll', () => {
    const isScrolled = window.scrollY > 20;
    
    if (isScrolled) {
        navbar.classList.add('bg-white/95', 'shadow-lg', 'backdrop-blur-md', 'py-3', 'scrolled');
        navbar.classList.remove('bg-transparent', 'py-4');
        
        if (!isMenuOpen) {
            if (teacherText) {
                teacherText.classList.remove('text-white', 'text-slate-900');
                teacherText.classList.add('text-brand-navy');
            }
            if (menuIcon) {
                menuIcon.style.color = '#001f3f';
            }
        }
        
        navLinks.forEach(link => {
            link.classList.remove('text-white');
            link.classList.add('text-slate-800');
        });
        
        if (langBtn) {
            langBtn.classList.remove('bg-white/10', 'text-white');
            langBtn.classList.add('bg-brand-red/10', 'text-brand-red');
        }
    } else {
        navbar.classList.remove('bg-white/95', 'shadow-lg', 'backdrop-blur-md', 'py-3', 'scrolled');
        navbar.classList.add('bg-transparent', 'py-4');
        
        if (!isMenuOpen) {
            if (teacherText) {
                teacherText.classList.remove('text-brand-navy', 'text-slate-900');
                teacherText.classList.add('text-white');
            }
            if (menuIcon) {
                menuIcon.style.color = '#ffffff';
            }
        }
        
        navLinks.forEach(link => {
            link.classList.add('text-white');
            link.classList.remove('text-slate-800');
        });
        
        if (langBtn) {
            langBtn.classList.add('bg-white/10', 'text-white');
            langBtn.classList.remove('bg-brand-red/10', 'text-brand-red');
        }
    }
});

// ================================================
// Initialization
// ================================================

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide Icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
    
    // Set current year in footer
    const yearEl = document.getElementById('year');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }
    
    // Initialize content
    updateContent();
});

// Force scroll unlock on page load
window.addEventListener('load', () => {
    document.body.style.overflow = '';
});

// Export for global access
window.toggleLanguage = toggleLanguage;
