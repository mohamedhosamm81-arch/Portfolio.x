// Dynamic Hello Greeting in Multiple Languages
const greetings = [
    'Hello', 'مرحبا', 'Hola', 'Bonjour', 'Ciao', 'こんにちは', '你好', 'Привет', '안녕하세요', 'Olá'
];
let greetingIndex = 0;
const greetingElement = document.querySelector('.dynamic-greeting');

if (greetingElement) {
    setInterval(() => {
        greetingElement.style.animation = 'none';
        setTimeout(() => {
            greetingIndex = (greetingIndex + 1) % greetings.length;
            greetingElement.textContent = greetings[greetingIndex];
            greetingElement.style.animation = 'fadeIn 0.5s ease-in-out';
        }, 50);
    }, 3000);
}

// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Close menu when a link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });
}

// Smooth scroll and active nav highlighting
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Contact Form Handler
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Get form values
        const formData = new FormData(this);

        // You can integrate with email service here
        console.log('Form submitted:', Object.fromEntries(formData));

        this.reset();
    });
}

// Scroll animation for elements with Intersection Observer
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            // Trigger skill progress bars animation
            if (entry.target.classList.contains('skill-card')) {
                const progressBars = entry.target.querySelectorAll('.skill-progress');
                progressBars.forEach(bar => {
                    const width = bar.style.width;
                    bar.style.width = '0';
                    setTimeout(() => {
                        bar.style.width = width;
                    }, 100);
                });
            }
        }
    });
}, observerOptions);

// Observe all animated elements
document.querySelectorAll('.skill-card, .cert-card, .project-card, .fact').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(element);
});

// Add scroll effect to navbar - keep white background
let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > 100) {
        navbar.style.boxShadow = '0 2px 15px rgba(0, 0, 0, 0.1)';
        navbar.style.background = '#ffffff';
    } else {
        navbar.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.05)';
        navbar.style.background = '#ffffff';
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// Parallax effect disabled to prevent overlap with other sections
// const heroSection = document.querySelector('.hero');
// if (heroSection) {
//     window.addEventListener('scroll', () => {
//         const scrollPosition = window.pageYOffset;
//         if (scrollPosition < window.innerHeight) {
//             heroSection.style.transform = `translateY(${scrollPosition * 0.5}px)`;
//         }
//     });
// }

// Active navigation link highlighting
window.addEventListener('scroll', () => {
    let current = '';

    document.querySelectorAll('section').forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (pageYOffset >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Back to top button functionality
const backToTopButton = document.createElement('button');
backToTopButton.innerHTML = '<i class="fas fa-chevron-up"></i>';
backToTopButton.classList.add('back-to-top');
backToTopButton.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    background: linear-gradient(135deg, #0066ff, #00d4ff);
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    font-size: 1.2rem;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 999;
    box-shadow: 0 5px 20px rgba(0, 102, 255, 0.3);
`;

document.body.appendChild(backToTopButton);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopButton.style.opacity = '1';
        backToTopButton.style.visibility = 'visible';
    } else {
        backToTopButton.style.opacity = '0';
        backToTopButton.style.visibility = 'hidden';
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

backToTopButton.addEventListener('mouseenter', () => {
    backToTopButton.style.transform = 'scale(1.1) translateY(-5px)';
});

backToTopButton.addEventListener('mouseleave', () => {
    backToTopButton.style.transform = 'scale(1)';
});

// Add smooth transitions to all interactive elements
document.addEventListener('DOMContentLoaded', () => {
    console.log('Portfolio loaded successfully!');
});

// 3D Tilt Effect for Cards - Simplified
function init3DTiltEffect() {
    const cards = document.querySelectorAll('.skill-card, .project-card, .cert-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
        });
    });
}

// Initialize 3D tilt effect
init3DTiltEffect();
