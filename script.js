// ================================
// Mobile Menu Functionality
// ================================
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const sidebar = document.querySelector('.sidebar');
const sidebarOverlay = document.querySelector('.sidebar-overlay');

function openMobileMenu() {
    mobileMenuToggle.classList.add('active');
    sidebar.classList.add('active');
    sidebarOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeMobileMenu() {
    mobileMenuToggle.classList.remove('active');
    sidebar.classList.remove('active');
    sidebarOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

mobileMenuToggle.addEventListener('click', () => {
    if (sidebar.classList.contains('active')) {
        closeMobileMenu();
    } else {
        openMobileMenu();
    }
});

sidebarOverlay.addEventListener('click', closeMobileMenu);

// Close menu on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && sidebar.classList.contains('active')) {
        closeMobileMenu();
    }
});

// ================================
// Intersection Observer for Animations
// ================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Optional: stop observing after animation
            // sectionObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('.section-card').forEach(section => {
    sectionObserver.observe(section);
});

// Make hero section visible immediately
const heroSection = document.querySelector('.hero-section');
if (heroSection) {
    heroSection.style.opacity = '1';
    heroSection.style.transform = 'none';
}

// ================================
// Smooth Scrolling Navigation
// ================================
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            // Close mobile menu if open
            closeMobileMenu();

            // Calculate offset for better positioning
            const offset = window.innerWidth <= 768 ? 80 : 20;
            const targetPosition = targetSection.offsetTop - offset;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }

        // Update active state
        document.querySelectorAll('.nav-menu a').forEach(a => a.classList.remove('active'));
        this.classList.add('active');
    });
});