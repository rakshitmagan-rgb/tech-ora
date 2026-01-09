// Main JavaScript for Techora Website

// DOM Ready
document.addEventListener('DOMContentLoaded', function() {
    // Initialize everything
    initNav();
    initAnimations();
    initServicesScroll();
    initProcessSteps();
    initProjects();
    initContactForm();
    initThreeJS();
    
    console.log('Techora website initialized successfully.');
});

// Navigation functionality
function initNav() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.padding = '15px 0';
            navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.padding = '20px 0';
            navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.05)';
        }
    });
}

// GSAP Animations
function initAnimations() {
    // Check if GSAP is loaded
    if (typeof gsap === 'undefined') {
        console.warn('GSAP not loaded. Animations disabled.');
        return;
    }
    
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);
    
    // Hero section entrance animation
    gsap.from('.hero-tag', {
        duration: 0.8,
        y: 30,
        opacity: 0,
        ease: 'power2.out',
        delay: 0.3
    });
    
    gsap.from('.hero-title', {
        duration: 1,
        y: 40,
        opacity: 0,
        ease: 'power2.out',
        delay: 0.5
    });
    
    gsap.from('.hero-subtitle', {
        duration: 1,
        y: 40,
        opacity: 0,
        ease: 'power2.out',
        delay: 0.7
    });
    
    gsap.from('.hero-cta', {
        duration: 1,
        y: 40,
        opacity: 0,
        ease: 'power2.out',
        delay: 0.9
    });
    
    
  
    
    
    // Why Techora section animation
    gsap.from('.why-feature', {
        scrollTrigger: {
            trigger: '.why-techora',
            start: 'top 70%',
            toggleActions: 'play none none reverse'
        },
        x: -60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power2.out'
    });
    
    // Contact section animation
    gsap.from('.contact-form-container', {
        scrollTrigger: {
            trigger: '.contact',
            start: 'top 70%',
            toggleActions: 'play none none reverse'
        },
        y: 60,
        opacity: 0,
        duration: 1,
        ease: 'power2.out'
    });
    
    // Floating animation for hero shapes
    gsap.to('.floating-element', {
        y: 20,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        stagger: 0.5
    });
    
    // Scroll indicator animation
    gsap.to('.scroll-line', {
        height: 0,
        duration: 2,
        repeat: -1,
        ease: 'power2.inOut'
    });
}

// Services horizontal scroll
function initServicesScroll() {
    const servicesTrack = document.querySelector('.services-track');
    if (!servicesTrack) return;
    
    let isDown = false;
    let startX;
    let scrollLeft;
    
    servicesTrack.addEventListener('mousedown', (e) => {
        isDown = true;
        startX = e.pageX - servicesTrack.offsetLeft;
        scrollLeft = servicesTrack.scrollLeft;
        servicesTrack.style.cursor = 'grabbing';
    });
    
    servicesTrack.addEventListener('mouseleave', () => {
        isDown = false;
        servicesTrack.style.cursor = 'grab';
    });
    
    servicesTrack.addEventListener('mouseup', () => {
        isDown = false;
        servicesTrack.style.cursor = 'grab';
    });
    
    servicesTrack.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - servicesTrack.offsetLeft;
        const walk = (x - startX) * 2;
        servicesTrack.scrollLeft = scrollLeft - walk;
    });
    
    // Add touch support for mobile
    servicesTrack.addEventListener('touchstart', (e) => {
        startX = e.touches[0].pageX - servicesTrack.offsetLeft;
        scrollLeft = servicesTrack.scrollLeft;
    });
    
    servicesTrack.addEventListener('touchmove', (e) => {
        e.preventDefault();
        const x = e.touches[0].pageX - servicesTrack.offsetLeft;
        const walk = (x - startX) * 2;
        servicesTrack.scrollLeft = scrollLeft - walk;
    });
}

// Process steps interaction
function initProcessSteps() {
    const processDots = document.querySelectorAll('.process-dot');
    const processSteps = document.querySelectorAll('.process-step');
    
    if (processDots.length === 0) return;
    
    // Observer to change active step based on scroll
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.3
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const step = entry.target.getAttribute('data-step');
                setActiveProcessStep(step);
            }
        });
    }, observerOptions);
    
    processSteps.forEach(step => {
        observer.observe(step);
    });
    
    // Set active step
    function setActiveProcessStep(step) {
        // Remove active class from all
        processDots.forEach(dot => dot.classList.remove('active'));
        processSteps.forEach(step => step.classList.remove('active'));
        
        // Add active class to current
        const activeDot = document.querySelector(`.process-dot[data-step="${step}"]`);
        const activeStep = document.querySelector(`.process-step[data-step="${step}"]`);
        
        if (activeDot) activeDot.classList.add('active');
        if (activeStep) activeStep.classList.add('active');
    }
    
    // Click on dots to scroll to step
    processDots.forEach(dot => {
        dot.addEventListener('click', () => {
            const step = dot.getAttribute('data-step');
            const targetStep = document.querySelector(`.process-step[data-step="${step}"]`);
            
            if (targetStep) {
                targetStep.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });
            }
        });
    });
}

// Projects hover effects
function initProjects() {
    const projectItems = document.querySelectorAll('.project-image');
    
    projectItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            // Add subtle scale effect
            gsap.to(this, {
                scale: 1.05,
                duration: 0.5,
                ease: 'power2.out'
            });
        });
        
        item.addEventListener('mouseleave', function() {
            // Reset scale
            gsap.to(this, {
                scale: 1,
                duration: 0.5,
                ease: 'power2.out'
            });
        });
    });
}

// Contact form handling
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };
        
        // Simple validation
        if (!formData.name || !formData.email || !formData.message) {
            showFormMessage('Please fill in all required fields.', 'error');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            showFormMessage('Please enter a valid email address.', 'error');
            return;
        }
        
        // Show success message (in a real app, you would send to a server)
        showFormMessage('Thank you! Your message has been sent. We\'ll get back to you within 24 hours.', 'success');
        
        // Reset form
        contactForm.reset();
        
        // Reset labels position
        document.querySelectorAll('.form-group label').forEach(label => {
            label.style.top = '15px';
            label.style.fontSize = '1rem';
        });
    });
    
    // Form validation on blur
    const formInputs = contactForm.querySelectorAll('input, textarea');
    formInputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
    });
    
    function validateField(field) {
        const value = field.value.trim();
        const fieldId = field.id;
        
        if (field.required && !value) {
            setFieldError(field, 'This field is required');
            return false;
        }
        
        if (fieldId === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                setFieldError(field, 'Please enter a valid email');
                return false;
            }
        }
        
        clearFieldError(field);
        return true;
    }
    
    function setFieldError(field, message) {
        const formGroup = field.parentElement;
        formGroup.classList.add('error');
        
        // Remove any existing error message
        const existingError = formGroup.querySelector('.error-message');
        if (existingError) existingError.remove();
        
        // Add error message
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        errorElement.style.color = '#ff006e';
        errorElement.style.fontSize = '0.8rem';
        errorElement.style.marginTop = '5px';
        formGroup.appendChild(errorElement);
        
        // Change underline color
        const underline = formGroup.querySelector('.form-underline');
        if (underline) underline.style.backgroundColor = '#ff006e';
    }
    
    function clearFieldError(field) {
        const formGroup = field.parentElement;
        formGroup.classList.remove('error');
        
        // Remove error message
        const existingError = formGroup.querySelector('.error-message');
        if (existingError) existingError.remove();
        
        // Reset underline color
        const underline = formGroup.querySelector('.form-underline');
        if (underline) underline.style.backgroundColor = 'var(--primary-color)';
    }
    
    function showFormMessage(message, type) {
        // Remove any existing message
        const existingMessage = document.querySelector('.form-message');
        if (existingMessage) existingMessage.remove();
        
        // Create message element
        const messageElement = document.createElement('div');
        messageElement.className = `form-message ${type}`;
        messageElement.textContent = message;
        messageElement.style.padding = '15px';
        messageElement.style.borderRadius = 'var(--border-radius)';
        messageElement.style.marginTop = '20px';
        messageElement.style.textAlign = 'center';
        messageElement.style.fontWeight = '500';
        
        if (type === 'success') {
            messageElement.style.backgroundColor = 'rgba(76, 201, 240, 0.1)';
            messageElement.style.color = '#4361ee';
            messageElement.style.border = '1px solid rgba(67, 97, 238, 0.3)';
        } else {
            messageElement.style.backgroundColor = 'rgba(255, 0, 110, 0.1)';
            messageElement.style.color = '#ff006e';
            messageElement.style.border = '1px solid rgba(255, 0, 110, 0.3)';
        }
        
        // Add to form
        contactForm.appendChild(messageElement);
        
        // Remove message after 5 seconds
        setTimeout(() => {
            if (messageElement.parentElement) {
                messageElement.remove();
            }
        }, 5000);
    }
}

// Three.js initialization for hero section
function initThreeJS() {
    // Check if Three.js is loaded
    if (typeof THREE === 'undefined') {
        console.warn('Three.js not loaded. 3D effects disabled.');
        return;
    }
    
    const container = document.getElementById('threejs-container');
    if (!container) return;
    
    // Only initialize on desktop for performance
    if (window.innerWidth < 1024) {
        container.innerHTML = '<div class="threejs-fallback" style="width:100%;height:100%;background:linear-gradient(135deg, rgba(58,134,255,0.1), rgba(131,56,236,0.1));border-radius:20px;"></div>';
        return;
    }
    
    // Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);
    
    // Create floating geometric shapes
    const geometry1 = new THREE.TetrahedronGeometry(1.5, 0);
    const geometry2 = new THREE.OctahedronGeometry(1.2, 0);
    const geometry3 = new THREE.DodecahedronGeometry(1, 0);
    
    const material1 = new THREE.MeshBasicMaterial({ 
        color: 0x3a86ff, 
        wireframe: true,
        transparent: true,
        opacity: 0.6
    });
    
    const material2 = new THREE.MeshBasicMaterial({ 
        color: 0x8338ec, 
        wireframe: true,
        transparent: true,
        opacity: 0.6
    });
    
    const material3 = new THREE.MeshBasicMaterial({ 
        color: 0xff006e, 
        wireframe: true,
        transparent: true,
        opacity: 0.6
    });
    
    const shape1 = new THREE.Mesh(geometry1, material1);
    const shape2 = new THREE.Mesh(geometry2, material2);
    const shape3 = new THREE.Mesh(geometry3, material3);
    
    // Position shapes
    shape1.position.x = -2;
    shape1.position.y = 1;
    shape2.position.x = 2;
    shape2.position.y = -1;
    shape3.position.x = 0;
    shape3.position.y = 0;
    shape3.position.z = -1;
    
    scene.add(shape1);
    scene.add(shape2);
    scene.add(shape3);
    
    camera.position.z = 5;
    
    // Animation
    function animate() {
        requestAnimationFrame(animate);
        
        // Rotate shapes slowly
        shape1.rotation.x += 0.005;
        shape1.rotation.y += 0.005;
        
        shape2.rotation.x += 0.003;
        shape2.rotation.y += 0.003;
        
        shape3.rotation.x += 0.004;
        shape3.rotation.y += 0.004;
        
        // Float up and down
        const time = Date.now() * 0.001;
        shape1.position.y = Math.sin(time * 0.5) * 0.5 + 1;
        shape2.position.y = Math.sin(time * 0.7) * 0.5 - 1;
        shape3.position.y = Math.sin(time * 0.6) * 0.5;
        
        renderer.render(scene, camera);
    }
    
    // Handle resize
    window.addEventListener('resize', () => {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    });
    
    // Start animation
    animate();
}