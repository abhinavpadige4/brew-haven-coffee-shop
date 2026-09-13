// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuToggle && navLinks) {
        mobileMenuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            
            // Animate hamburger icon
            const hamburger = mobileMenuToggle.querySelector('.hamburger');
            hamburger.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking a link
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                const hamburger = document.querySelector('.hamburger');
                hamburger.classList.remove('active');
            }
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId !== '#') {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80, // Account for header height
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Form Validation and Submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Reset previous errors
            const formErrors = contactForm.querySelectorAll('.form-error');
            formErrors.forEach(error => error.textContent = '');
            
            const formSuccess = document.getElementById('form-success');
            formSuccess.textContent = '';
            
            // Get form values
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            
            // Validation flags
            let isValid = true;
            
            // Validate name
            if (name === '') {
                document.getElementById('name-error').textContent = 'Please enter your name';
                isValid = false;
            } else if (name.length < 2) {
                document.getElementById('name-error').textContent = 'Name must be at least 2 characters';
                isValid = false;
            }
            
            // Validate email
            if (email === '') {
                document.getElementById('email-error').textContent = 'Please enter your email';
                isValid = false;
            } else {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(email)) {
                    document.getElementById('email-error').textContent = 'Please enter a valid email address';
                    isValid = false;
                }
            }
            
            // Validate message
            if (message === '') {
                document.getElementById('message-error').textContent = 'Please enter your message';
                isValid = false;
            } else if (message.length < 10) {
                document.getElementById('message-error').textContent = 'Message must be at least 10 characters';
                isValid = false;
            }
            
            // If form is valid, show success message
            if (isValid) {
                // In a real application, you would send this data to a backend
                // For this static site, we'll show a success message
                formSuccess.textContent = 'Thank you for your message! We\'ll get back to you soon.';
                
                // Reset form
                contactForm.reset();
                
                // Scroll to success message
                formSuccess.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        });
    }
    
    // Add skip link for accessibility
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.className = 'skip-link';
    skipLink.textContent = 'Skip to main content';
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Add lazy loading for images
    const images = document.querySelectorAll('img[loading="lazy"]');
    if ('loading' in HTMLImageElement.prototype) {
        images.forEach(img => {
            img.loading = 'lazy';
        });
    } else {
        // Fallback for browsers that don't support native lazy loading
        const lazyLoad = function() {
            images.forEach(img => {
                const rect = img.getBoundingClientRect();
                if (
                    rect.top <= window.innerHeight &&
                    rect.bottom >= 0 &&
                    rect.left <= window.innerWidth &&
                    rect.right >= 0
                ) {
                    if (img.getAttribute('data-src')) {
                        img.src = img.getAttribute('data-src');
                        img.removeAttribute('data-src');
                    }
                }
            });
        };
        
        window.addEventListener('scroll', lazyLoad);
        window.addEventListener('resize', lazyLoad);
        window.addEventListener('orientationchange', lazyLoad);
        lazyLoad(); // Initial load
    }
    
    // Add animation on scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.fade-in');
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            
            if (
                elementTop < window.innerHeight - 100 &&
                elementBottom > 0
            ) {
                element.classList.add('animate');
            }
        });
    };
    
    // Add animate class to elements that should fade in
    const fadeElements = document.querySelectorAll('.section-title, .menu-category, .hours-day, .location-info, .location-map, .contact-form, .footer-content > div');
    fadeElements.forEach(element => {
        element.classList.add('fade-in');
    });
    
    window.addEventListener('scroll', animateOnScroll);
    window.addEventListener('load', animateOnScroll);
    
    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        .fade-in {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }
        
        .fade-in.animate {
            opacity: 1;
            transform: translateY(0);
        }
        
        .hamburger.active {
            background-color: transparent;
        }
        
        .hamburger.active::before {
            transform: rotate(45deg) translate(5px, 5px);
            background-color: var(--primary);
        }
        
        .hamburger.active::after {
            transform: rotate(-45deg) translate(5px, -5px);
            background-color: var(--primary);
        }
    `;
    document.head.appendChild(style);
});