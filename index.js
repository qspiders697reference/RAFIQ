/**
 * ABDUL RAFIQ KHAN - PORTFOLIO INTERACTIVITY
 * Vanilla JavaScript implementation for GitHub Pages
 */

document.addEventListener('DOMContentLoaded', () => {
    // Dynamic Copyright Year
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // Mobile Hamburger Menu Navigation
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // Active Navbar Section Link Highlighting on Scroll
    const sections = document.querySelectorAll('section[id]');
    
    function highlightNavOnScroll() {
        const scrollY = window.pageYOffset;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 100;
            const sectionId = current.getAttribute('id');
            const navLink = document.querySelector(`.nav-menu a[href*="#${sectionId}"]`);

            if (navLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navLink.classList.add('active');
                } else {
                    navLink.classList.remove('active');
                }
            }
        });
    }

    window.addEventListener('scroll', highlightNavOnScroll);

    // Back to Top Button Functionality
    const backToTopBtn = document.getElementById('back-to-top');

    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Career Highlights Carousel Implementation
    const track = document.getElementById('carousel-track');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const dotsContainer = document.getElementById('carousel-dots');

    if (track && prevBtn && nextBtn && dotsContainer) {
        const slides = Array.from(track.children);
        let currentIndex = 0;

        // Generate Dots
        slides.forEach((_, idx) => {
            const dot = document.createElement('div');
            dot.classList.add('carousel-dot');
            if (idx === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(idx));
            dotsContainer.appendChild(dot);
        });

        const dots = Array.from(dotsContainer.children);

        function updateCarousel() {
            track.style.transform = `translateX(-${currentIndex * 100}%)`;
            dots.forEach((dot, idx) => {
                dot.classList.toggle('active', idx === currentIndex);
            });
        }

        function goToSlide(index) {
            currentIndex = index;
            updateCarousel();
        }

        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex === 0) ? slides.length - 1 : currentIndex - 1;
            updateCarousel();
        });

        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex === slides.length - 1) ? 0 : currentIndex + 1;
            updateCarousel();
        });

        // Autoplay carousel every 6 seconds
        let carouselInterval = setInterval(() => {
            currentIndex = (currentIndex === slides.length - 1) ? 0 : currentIndex + 1;
            updateCarousel();
        }, 6000);

        // Pause autoplay on mouse enter
        const carouselContainer = document.querySelector('.carousel-container');
        if (carouselContainer) {
            carouselContainer.addEventListener('mouseenter', () => clearInterval(carouselInterval));
            carouselContainer.addEventListener('mouseleave', () => {
                carouselInterval = setInterval(() => {
                    currentIndex = (currentIndex === slides.length - 1) ? 0 : currentIndex + 1;
                    updateCarousel();
                }, 6000);
            });
        }
    }

    // Project Details Modal / Drawer System
    const projectData = {
        'project-1': {
            title: 'AI-Powered Smart Farming Dashboard with Crop Disease Detection',
            tech: 'Python, FastAPI, TensorFlow/Keras (MobileNet V2), MySQL, OpenWeatherMap API, HTML/CSS/JS',
            overview: 'A full-stack, AI-driven smart agriculture platform designed to support farmers with instant diagnosis and intelligent resource planning.',
            details: [
                'Engineered real-time plant leaf disease detection using a MobileNet V2 Transfer Learning CNN architecture trained on agricultural datasets.',
                'Integrated ML-based crop recommendation engines and optimal fertilizer calculators.',
                'Utilized OpenWeatherMap API for weather-aware irrigation scheduling to reduce water wastage.',
                'Designed role-based access control with administrative oversight, user prediction tracking, and CSV analytical report downloads.'
            ]
        },
        'project-2': {
            title: 'Intelligent Animal Detection and Alert System using YOLOv8',
            tech: 'Python, OpenCV, YOLOv8 (Ultralytics), Computer Vision, Deep Learning',
            overview: 'An intelligent computer vision system focused on hazard prevention and wildlife monitoring across highways and restricted areas.',
            details: [
                'Utilized Ultralytics YOLOv8 real-time object detection model to identify animals near transit zones.',
                'Engineered priority-based alerting mechanics prioritizing fast-moving target threats.',
                'Optimized frame extraction with OpenCV for high-throughput video processing in surveillance pipelines.'
            ]
        },
        'project-3': {
            title: 'Hotel Management System',
            tech: 'JAVA, Apache NetBeans, JDBC, Swing/AWT',
            overview: 'A robust desktop application built to modernize room allocation, customer data handling, and automated transaction billing.',
            details: [
                'Created desktop GUI components using Java inside Apache NetBeans.',
                'Reduced manual room booking process entry duration by 40% using structured database relational mapping.',
                'Implemented error-handling routines for database connectivity and client billing generation.'
            ]
        }
    };

    const modal = document.getElementById('project-modal');
    const modalContent = document.getElementById('modal-content');
    const modalClose = document.getElementById('modal-close');
    const triggers = document.querySelectorAll('.modal-trigger');

    if (modal && modalContent) {
        triggers.forEach(btn => {
            btn.addEventListener('click', () => {
                const key = btn.getAttribute('data-project');
                const data = projectData[key];

                if (data) {
                    modalContent.innerHTML = `
                        <h3 style="color: var(--text-heading); font-size: 1.4rem; margin-bottom: 0.5rem;">${data.title}</h3>
                        <p style="color: var(--accent-cyan); font-family: var(--font-mono); font-size: 0.85rem; margin-bottom: 1rem;">${data.tech}</p>
                        <p style="color: var(--text-secondary); margin-bottom: 1.25rem;">${data.overview}</p>
                        <h4 style="color: var(--accent-emerald); font-size: 1rem; margin-bottom: 0.5rem;">Key Technical Achievements:</h4>
                        <ul style="list-style: disc; padding-left: 1.25rem; color: var(--text-secondary); font-size: 0.92rem; display: flex; flex-direction: column; gap: 0.5rem;">
                            ${data.details.map(item => `<li>${item}</li>`).join('')}
                        </ul>
                    `;
                    modal.classList.add('active');
                    modal.setAttribute('aria-hidden', 'false');
                }
            });
        });

        if (modalClose) {
            modalClose.addEventListener('click', closeModal);
        }

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });

        function closeModal() {
            modal.classList.remove('active');
            modal.setAttribute('aria-hidden', 'true');
        }
    }

    // Contact Form Simulation
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    if (contactForm && formStatus) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            formStatus.className = 'form-status success';
            formStatus.textContent = 'Thank you for reaching out! Your message has been sent successfully.';
            contactForm.reset();
            setTimeout(() => {
                formStatus.textContent = '';
            }, 5000);
        });
    }
});