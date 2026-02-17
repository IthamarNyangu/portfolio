// Theme toggle functionality
const themeToggle = document.getElementById('themeToggle');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

// Check for saved theme preference or use system preference
const currentTheme = localStorage.getItem('theme') || 
                    (prefersDarkScheme.matches ? 'dark' : 'light');
if (currentTheme === 'dark') {
    document.body.classList.add('dark-mode');
}

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const theme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
    localStorage.setItem('theme', theme);
    
    // Update navbar background when toggling theme
    const navbar = document.querySelector('.navbar');
    if (theme === 'dark') {
        navbar.style.backgroundColor = window.scrollY > 50 ? 'rgba(30, 30, 30, 0.95)' : '#1e1e1e';
    } else {
        navbar.style.backgroundColor = window.scrollY > 50 ? 'rgba(255, 255, 255, 0.95)' : 'var(--white)';
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);
        
        if (target) {
            // Calculate the target position
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
            const startPosition = window.pageYOffset;
            const distance = targetPosition - startPosition - 80; // Account for navbar height
            const duration = 800; // Animation duration in ms
            let startTime = null;
            
            function animation(currentTime) {
                if (startTime === null) startTime = currentTime;
                const timeElapsed = currentTime - startTime;
                const run = ease(timeElapsed, startPosition, distance, duration);
                window.scrollTo(0, run);
                if (timeElapsed < duration) requestAnimationFrame(animation);
            }
            
            // Easing function for smooth animation
            function ease(t, b, c, d) {
                t /= d / 2;
                if (t < 1) return c / 2 * t * t + b;
                t--;
                return -c / 2 * (t * (t - 2) - 1) + b;
            }
            
            requestAnimationFrame(animation);
        }
    });
});

// Sticky navigation
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        if (document.body.classList.contains('dark-mode')) {
            navbar.style.backgroundColor = 'rgba(30, 30, 30, 0.95)';
        } else {
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        }
    } else {
        navbar.style.boxShadow = 'none';
        if (document.body.classList.contains('dark-mode')) {
            navbar.style.backgroundColor = '#1e1e1e';
        } else {
            navbar.style.backgroundColor = 'var(--white)';
        }
    }
});

// Simple per-card carousel
document.querySelectorAll('[data-carousel]').forEach((carousel) => {
  const track = carousel.querySelector('[data-track]');
  const prevBtn = carousel.querySelector('[data-prev]');
  const nextBtn = carousel.querySelector('[data-next]');
  const slides = Array.from(track.querySelectorAll('img'));

  let index = 0;

  function update() {
    track.style.transform = `translateX(-${index * 100}%)`;
  }

  prevBtn.addEventListener('click', () => {
    index = (index - 1 + slides.length) % slides.length;
    update();
  });

  nextBtn.addEventListener('click', () => {
    index = (index + 1) % slides.length;
    update();
  });

  update();
});


// // Form submission handling with fetch
// const contactForm = document.getElementById('contactForm');
// if (contactForm) {
//     contactForm.addEventListener('submit', function(e) {
//         e.preventDefault();
        
//         // Disable submit button during submission
//         const submitBtn = this.querySelector('button[type="submit"]');
//         submitBtn.disabled = true;
//         submitBtn.textContent = 'Sending...';
        
//         // Get form values
//         const formData = {
//             name: document.getElementById('name').value,
//             email: document.getElementById('email').value,
//             subject: document.getElementById('subject').value,
//             message: document.getElementById('message').value,
//             _template: 'table',
//             _captcha: 'false'
//         };

//         // Show loading state
//         const formGroups = document.querySelectorAll('.form-group');
//         formGroups.forEach(group => group.style.opacity = '0.5');

//         const form = document.getElementById('contactForm');
        
//         fetch("https://formsubmit.co/ajax/6cc0bfc0b517f89af990e586dd718681", {
//             method: "POST",
//             body: new FormData(form)
//         })
//         .then(response => {
//             if (!response.ok) throw new Error('Network response was not ok');
//             return response.json();
//         })
//         .then(data => {
//             // Show success message
//             formGroups.forEach(group => group.style.display = 'none');
//             submitBtn.style.display = 'none';
            
//             const successMessage = document.createElement('div');
//             successMessage.className = 'success-message';
//             successMessage.innerHTML = `
//                 <i class="fas fa-check-circle" style="font-size: 3rem; color: var(--success-color); margin-bottom: 15px;"></i>
//                 <h3>Thank You!</h3>
//                 <p>Your message has been sent successfully. I'll get back to you soon.</p>
//             `;
//             contactForm.appendChild(successMessage);
            
//             // Reset form after 5 seconds
//             setTimeout(() => {
//                 contactForm.reset();
//                 successMessage.remove();
//                 formGroups.forEach(group => {
//                     group.style.display = 'block';
//                     group.style.opacity = '1';
//                 });
//                 submitBtn.style.display = 'block';
//                 submitBtn.disabled = false;
//                 submitBtn.textContent = 'Send Message';
//             }, 5000);
//         })
//         .catch(error => {
//             console.error('Error:', error);
//             // Show error message
//             const errorMessage = document.createElement('div');
//             errorMessage.className = 'error-message';
//             errorMessage.innerHTML = `
//                 <i class="fas fa-exclamation-circle" style="font-size: 3rem; color: #ff4444; margin-bottom: 15px;"></i>
//                 <h3>Error</h3>
//                 <p>There was a problem sending your message. Please try again later.</p>
//             `;
//             contactForm.appendChild(errorMessage);
            
//             // Reset form state
//             formGroups.forEach(group => group.style.opacity = '1');
//             submitBtn.disabled = false;
//             submitBtn.textContent = 'Send Message';
            
//             setTimeout(() => {
//                 errorMessage.remove();
//             }, 5000);
//         });
//     });
// }

// Contact form -> opens user's email client (mailto)
const contactForm = document.getElementById('contactForm');

if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();

    const to = "ithamarnyangu@gmail.com"; // <-- your email

    const mailSubject = encodeURIComponent(`[Portfolio] ${subject || "New message"}`);

    const body = encodeURIComponent(
      `Name: ${name}\n` +
      `Email: ${email}\n\n` +
      `Message:\n${message}\n\n` +
      `---\nSent from: https://ithamarnyangu.github.io/portfolio/`
    );

    // This opens the user's default email app with fields filled in
    window.location.href = `mailto:${to}?subject=${mailSubject}&body=${body}`;
  });
}


// Display current year in footer copyright
const yearSpan = document.querySelector('.footer .year');
if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
}