// Initialize Lucide Icons
lucide.createIcons();

// Set current year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Language State
let currentLang = 'pt';

// Translations - COMPLETO
const translations = {
    pt: {
        nav: {
            home: 'Início',
            about: 'Sobre',
            contact: 'Contato'
        },
        hero: {
            badge: 'LANÇAMENTO OFICIAL',
            title1: 'Domine o Inglês',
            subtitle: 'A apostila definitiva para acelerar seu aprendizado. Conteúdo prático, exercícios reais e a metodologia que já ajudou centenas de alunos.',
            btnPrimary: 'Quero minha apostila',
            btnSecondary: 'Saber mais',
            btnBuy: 'Comprar Agora',
            priceLabel: 'Preço Especial'
        },
        about: {
            title: 'Sobre o Teacher Ignarro',
            subtitle: 'Metodologia prática e direta para você destravar o seu inglês de uma vez por todas.',
            question: 'Por que escolher esta apostila?',
            description: 'O Teacher Ignarro desenvolveu um método exclusivo baseado em conversação e gramática aplicada. Esta apostila virtual condensa anos de experiência em sala de aula em um material prático, focado no que realmente importa para você falar inglês com confiança.',
            list1: 'Exercícios práticos com gabarito comentado.',
            list2: 'Vocabulário focado em situações reais do dia a dia.',
            list3: 'Dicas exclusivas de pronúncia e "linking sounds".'
        },
        contact: {
            title: 'Pronto para começar?',
            subtitle: 'Ficou com alguma dúvida sobre a apostila ou quer saber mais sobre as aulas? Entre em contato comigo através das redes sociais.'
        }
    },
    en: {
        nav: {
            home: 'Home',
            about: 'About',
            contact: 'Contact'
        },
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
            title: 'About Teacher Ignarro',
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
        if (value) {
            el.textContent = value;
        }
    });
    
    const desktopBtn = document.getElementById('current-lang-text');
    if (desktopBtn) desktopBtn.textContent = currentLang.toUpperCase();
    
    const mobileBtn = document.getElementById('current-lang-mobile');
    if (mobileBtn) mobileBtn.textContent = currentLang === 'pt' ? 'Português' : 'English';
    
    lucide.createIcons();
}

function toggleLanguage() {
    currentLang = currentLang === 'pt' ? 'en' : 'pt';
    updateContent();
}

// Mobile Menu
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-link');
let isMenuOpen = false;

function toggleMenu() {
    isMenuOpen = !isMenuOpen;
    if (isMenuOpen) {
        mobileMenu.classList.remove('translate-x-full');
        document.body.style.overflow = 'hidden';
    } else {
        mobileMenu.classList.add('translate-x-full');
        document.body.style.overflow = '';
    }
}

if (menuBtn) menuBtn.addEventListener('click', toggleMenu);

mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (isMenuOpen) toggleMenu();
    });
});

// Navbar Scroll Effect
const navbar = document.getElementById('navbar');
const teacherText = document.getElementById('teacher-text');
const navLinks = document.querySelectorAll('.nav-link');
const langBtn = document.getElementById('lang-btn-desktop');

window.addEventListener('scroll', () => {
    const isScrolled = window.scrollY > 20;
    
    if (isScrolled) {
        navbar.classList.add('bg-white/95', 'shadow-lg', 'backdrop-blur-md', 'py-3');
        navbar.classList.remove('bg-transparent', 'py-4');
        if (teacherText) {
            teacherText.classList.remove('text-white');
            teacherText.classList.add('text-brand-navy');
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
        navbar.classList.remove('bg-white/95', 'shadow-lg', 'backdrop-blur-md', 'py-3');
        navbar.classList.add('bg-transparent', 'py-4');
        if (teacherText) {
            teacherText.classList.add('text-white');
            teacherText.classList.remove('text-brand-navy');
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

// Initialize
updateContent();
window.toggleLanguage = toggleLanguage;
