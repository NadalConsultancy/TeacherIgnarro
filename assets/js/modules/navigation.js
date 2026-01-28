/* ================================================
   Navigation Module
   Handles navbar and mobile menu functionality
   ================================================ */

// DOM Elements
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

/**
 * Toggle mobile menu open/close state
 */
function toggleMenu() {
    isMenuOpen = !isMenuOpen;
    
    if (isMenuOpen) {
        openMenu();
    } else {
        closeMenu();
    }
    
    // Re-initialize Lucide icons after DOM changes
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

/**
 * Open mobile menu
 */
function openMenu() {
    // Slide menu in
    mobileMenu.classList.remove('translate-x-full');
    mobileMenu.classList.add('translate-x-0');
    
    // Add body class for menu state
    document.body.classList.add('menu-open');
    
    // Switch icons
    menuIcon.classList.remove('block');
    menuIcon.classList.add('hidden');
    closeIcon.classList.remove('hidden');
    closeIcon.classList.add('block');
    
    // Lock body scroll
    document.body.style.overflow = 'hidden';
    
    // Change logo colors to dark
    if (teacherText) {
        teacherText.classList.remove('text-white', 'text-brand-navy');
        teacherText.classList.add('text-slate-900');
    }
    
    // Ensure close icon is visible
    if (closeIcon) {
        closeIcon.style.color = '#0f172a';
    }
}

/**
 * Close mobile menu
 */
function closeMenu() {
    // Slide menu out
    mobileMenu.classList.add('translate-x-full');
    mobileMenu.classList.remove('translate-x-0');
    
    // Remove body class
    document.body.classList.remove('menu-open');
    
    // Switch icons back
    menuIcon.classList.remove('hidden');
    menuIcon.classList.add('block');
    closeIcon.classList.add('hidden');
    closeIcon.classList.remove('block');
    
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
    
    // Restore menu icon color based on scroll
    if (menuIcon) {
        menuIcon.style.color = isScrolled ? '#001f3f' : '#ffffff';
    }
}

/**
 * Handle scroll events for navbar styling
 */
function handleScroll() {
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
}

/**
 * Initialize navigation event listeners
 */
function initNavigation() {
    // Menu button click
    if (menuBtn) {
        menuBtn.addEventListener('click', toggleMenu);
    }
    
    // Close menu when clicking on mobile links
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (isMenuOpen) {
                isMenuOpen = false;
                closeMenu();
            }
        });
    });
    
    // Scroll event listener
    window.addEventListener('scroll', handleScroll);
    
    // Force scroll unlock on page load
    window.addEventListener('load', () => {
        document.body.style.overflow = '';
    });
}

// Export
window.initNavigation = initNavigation;
window.toggleMenu = toggleMenu;
