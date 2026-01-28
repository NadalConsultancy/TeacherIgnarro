/* ================================================
   Internationalization (i18n) Module
   ================================================ */

// Language State
let currentLang = 'pt';

// Translations
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
            title: 'Sobre o Teacher Ignarro', 
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
        if (value) el.textContent = value;
    });
    
    const desktopBtn = document.getElementById('current-lang-text');
    if (desktopBtn) desktopBtn.textContent = currentLang.toUpperCase();
    
    const mobileBtn = document.getElementById('current-lang-mobile');
    if (mobileBtn) mobileBtn.textContent = currentLang === 'pt' ? 'Portugues' : 'English';
    
    // Re-initialize icons after content change
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

function toggleLanguage() {
    currentLang = currentLang === 'pt' ? 'en' : 'pt';
    updateContent();
}

// Export functions
window.toggleLanguage = toggleLanguage;
window.updateContent = updateContent;
window.getCurrentLang = () => currentLang;
