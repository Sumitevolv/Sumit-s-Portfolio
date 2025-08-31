// Global variables
        let isDarkMode = true;
        let currentTextIndex = 0;
        let currentCharIndex = 0;
        let selectedGender = '';
        
        const typedTexts = [
            'Electronics Engineer',
            'Embedded Systems Specialist',
            'Full Stack Developer',
            'IoT Solutions Architect',
            'PCB Design Expert'
        ];

        // Theme toggle functionality
        function toggleTheme() {
            isDarkMode = !isDarkMode;
            const body = document.body;
            const themeIcon = document.querySelector('.theme-toggle i');
            
            if (isDarkMode) {
                body.className = 'dark-mode';
                themeIcon.className = 'fas fa-sun';
            } else {
                body.className = 'light-mode';
                themeIcon.className = 'fas fa-moon';
            }
        }

        // Mobile menu functionality
        function toggleMobileMenu() {
            const mobileMenu = document.getElementById('mobileMenu');
            const menuBtn = document.querySelector('.mobile-menu-btn');
            
            if (mobileMenu.style.display === 'block') {
                mobileMenu.style.display = 'none';
                menuBtn.classList.remove('active');
            } else {
                mobileMenu.style.display = 'block';
                menuBtn.classList.add('active');
            }
        }

        function closeMobileMenu() {
            const mobileMenu = document.getElementById('mobileMenu');
            const menuBtn = document.querySelector('.mobile-menu-btn');
            mobileMenu.style.display = 'none';
            menuBtn.classList.remove('active');
        }

        // Typing animation
        function typeText() {
            const typingElement = document.getElementById('typingText');
            const currentText = typedTexts[currentTextIndex];
            
            if (currentCharIndex < currentText.length) {
                typingElement.innerHTML = currentText.substring(0, currentCharIndex + 1) + '<span class="typing-cursor">|</span>';
                currentCharIndex++;
                setTimeout(typeText, 90);
            } else {
                setTimeout(() => {
                    currentCharIndex = 0;
                    currentTextIndex = (currentTextIndex + 1) % typedTexts.length;
                    typeText();
                }, 2000);
            }
        }

        // Smooth scrolling for navigation
        function smoothScroll(target) {
            document.querySelector(target).scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }

        // Update active navigation link
        function updateActiveLink() {
            const sections = document.querySelectorAll('.section');
            const navLinks = document.querySelectorAll('.nav-link');
            
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (scrollY >= (sectionTop - 200)) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + current) {
                    link.classList.add('active');
                }
            });
        }

        // Animate elements on scroll
        function animateOnScroll() {
            const elements = document.querySelectorAll('.animate-on-scroll');
            
            elements.forEach(element => {
                const elementTop = element.getBoundingClientRect().top;
                const elementVisible = 150;
                
                if (elementTop < window.innerHeight - elementVisible) {
                    element.classList.add('animated');
                }
            });
        }

        // Animate skill bars
        function animateSkillBars() {
            const skillBars = document.querySelectorAll('.skill-progress');
            
            skillBars.forEach(bar => {
                const width = bar.getAttribute('data-width');
                const barTop = bar.getBoundingClientRect().top;
                
                if (barTop < window.innerHeight - 100) {
                    bar.style.width = width + '%';
                }
            });
        }

        // Modal functionality
        function openHireModal() {
            document.getElementById('hireModal').classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        function closeHireModal() {
            document.getElementById('hireModal').classList.remove('active');
            document.body.style.overflow = 'auto';
            resetHireForm();
        }

        function selectGender(gender) {
            selectedGender = gender;
            document.getElementById('selectedGender').value = gender;
            
            // Update UI
            const genderOptions = document.querySelectorAll('.gender-option');
            genderOptions.forEach(option => {
                option.classList.remove('selected');
                if (option.textContent === gender) {
                    option.classList.add('selected');
                }
            });
        }

        function resetHireForm() {
            document.getElementById('recruiterName').value = '';
            document.getElementById('companyName').value = '';
            document.getElementById('selectedGender').value = '';
            document.getElementById('phone').value = '';
            document.getElementById('hireEmail').value = '';
            document.getElementById('projectDetails').value = '';
            
            const genderOptions = document.querySelectorAll('.gender-option');
            genderOptions.forEach(option => option.classList.remove('selected'));
            selectedGender = '';
        }

        // Form submission handlers
        function submitContactForm(event) {
            event.preventDefault();
            
            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };
            
            // Simulate form submission
            alert('Thank you for your message! I will get back to you soon.');
            
            // Reset form
            event.target.reset();
        }

        function submitHireForm(event) {
            event.preventDefault();
            
            if (!selectedGender) {
                alert('Please select your gender.');
                return;
            }
            
            // Get form data
            const formData = {
                recruiterName: document.getElementById('recruiterName').value,
                companyName: document.getElementById('companyName').value,
                gender: selectedGender,
                phone: document.getElementById('phone').value,
                email: document.getElementById('hireEmail').value,
                projectDetails: document.getElementById('projectDetails').value
            };
            
            // Simulate form submission
            alert('Thank you for your interest! Your hiring request has been submitted. I will contact you within 24 hours.');
            
            closeHireModal();
        }

        // Add click event listeners to navigation links
        document.addEventListener('DOMContentLoaded', function() {
            // Start typing animation
            typeText();
            
            // Add smooth scrolling to navigation links
            const navLinks = document.querySelectorAll('.nav-link');
            navLinks.forEach(link => {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    const target = this.getAttribute('href');
                    smoothScroll(target);
                    closeMobileMenu();
                });
            });
            
            // Add smooth scrolling to buttons
            const heroButtons = document.querySelectorAll('.hero-buttons a');
            heroButtons.forEach(button => {
                button.addEventListener('click', function(e) {
                    e.preventDefault();
                    const target = this.getAttribute('href');
                    smoothScroll(target);
                });
            });
            
            // Close modal when clicking outside
            document.getElementById('hireModal').addEventListener('click', function(e) {
                if (e.target === this) {
                    closeHireModal();
                }
            });
            
            // Initial animations
            animateOnScroll();
            animateSkillBars();
        });

        // Scroll event listeners
        window.addEventListener('scroll', function() {
            updateActiveLink();
            animateOnScroll();
            animateSkillBars();
            
            // Add navbar background on scroll
            const navbar = document.querySelector('.navbar');
            if (window.scrollY > 50) {
                navbar.style.background = isDarkMode ? 
                    'rgba(15, 23, 42, 0.95)' : 
                    'rgba(255, 255, 255, 0.95)';
            } else {
                navbar.style.background = isDarkMode ? 
                    'rgba(15, 23, 42, 0.8)' : 
                    'rgba(255, 255, 255, 0.8)';
            }
        });

        // Resize event listener
        window.addEventListener('resize', function() {
            // Close mobile menu on resize
            if (window.innerWidth > 768) {
                document.getElementById('mobileMenu').style.display = 'none';
                document.querySelector('.mobile-menu-btn').classList.remove('active');
            }
        });

        // Add keyboard navigation
        document.addEventListener('keydown', function(e) {
            // Escape key to close modal
            if (e.key === 'Escape') {
                closeHireModal();
            }
        });

        // Add loading animation
        window.addEventListener('load', function() {
            document.body.style.opacity = '1';
            
            // Trigger initial animations with delay
            setTimeout(() => {
                const elements = document.querySelectorAll('.animate-on-scroll');
                elements.forEach((element, index) => {
                    setTimeout(() => {
                        element.classList.add('animated');
                    }, index * 100);
                });
            }, 200);
        });

        // Add intersection observer for better performance
        if ('IntersectionObserver' in window) {
            const observerOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            };

            const observer = new IntersectionObserver(function(entries) {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animated');
                        
                        // Animate skill bars when skills section is visible
                        if (entry.target.id === 'skills') {
                            setTimeout(animateSkillBars, 300);
                        }
                    }
                });
            }, observerOptions);

            // Observe all animatable elements
            document.querySelectorAll('.animate-on-scroll').forEach(el => {
                observer.observe(el);
            });
        }

        // Add particle animation to hero section
        function createParticle() {
            const hero = document.querySelector('.hero');
            const particle = document.createElement('div');
            
            particle.style.cssText = `
                position: absolute;
                width: 4px;
                height: 4px;
                background: linear-gradient(135deg, var(--primary-orange), var(--primary-purple));
                border-radius: 50%;
                pointer-events: none;
                opacity: 0.6;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: floatParticle ${5 + Math.random() * 10}s linear infinite;
            `;
            
            hero.appendChild(particle);
            
            // Remove particle after animation
            setTimeout(() => {
                if (particle.parentNode) {
                    particle.parentNode.removeChild(particle);
                }
            }, 15000);
        }

        // Add particle animation keyframes
        const particleStyle = document.createElement('style');
        particleStyle.textContent = `
            @keyframes floatParticle {
                0% {
                    transform: translateY(100vh) translateX(0px) rotate(0deg);
                    opacity: 0.6;
                }
                10% {
                    opacity: 1;
                }
                90% {
                    opacity: 1;
                }
                100% {
                    transform: translateY(-100px) translateX(${Math.random() * 200 - 100}px) rotate(360deg);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(particleStyle);

        // Create particles periodically
        setInterval(createParticle, 3000);

        // Add smooth scroll behavior for better UX
        document.documentElement.style.scrollBehavior = 'smooth';

        // Preload images for better performance
        function preloadImages() {
            const images = [
                'https://images.unsplash.com/photo-1580927752452-89d86da3fa0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
            ];
            
            images.forEach(src => {
                const img = new Image();
                img.src = src;
            });
        }

        preloadImages();
   