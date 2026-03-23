// 1. MOBILE MENU TOGGLE
const hamburger = document.getElementById("hamburger");
const nav = document.getElementById("nav");
const navLinks = document.querySelectorAll("#nav a");

hamburger.addEventListener("click", () => {
    nav.classList.toggle("active");
});

navLinks.forEach(link => {
    link.addEventListener("click", () => {
        nav.classList.remove("active");
    });
});

// 2. SMOOTH SCROLLING
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

// 3. SCROLL REVEAL ANIMATIONS
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target); // Only animate once
        }
    });
}, {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
});

revealElements.forEach(el => revealObserver.observe(el));

// 4. ANIMATE SKILL PROGRESS BARS ON SCROLL
const progressBars = document.querySelectorAll('.progress-fill');

const progressObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const bar = entry.target;
            const targetWidth = bar.getAttribute('data-width');
            bar.style.width = targetWidth;
            observer.unobserve(bar); // Only animate once
        }
    });
}, { threshold: 0.5 });

progressBars.forEach(bar => {
    progressObserver.observe(bar);
});

// 5. BULLETPROOF TYPEWRITER EFFECT
document.addEventListener("DOMContentLoaded", () => {
   const words = [
    "Software Engineering Specialist",
    "ML & IoT Researcher",
    "Quantitative Finance Analyst",
    "Geopolitical Tech Strategist"
];
    
    let currentWordIndex = 0;
    let currentCharIndex = 0;
    const typewriterElement = document.querySelector('.typewriter-text');
    
    // Typing Speeds (in milliseconds)
    const typingDelay = 80;
    const erasingDelay = 40;
    const newWordDelay = 2000; // How long it pauses on a finished word

    if (typewriterElement) {
        function type() {
            if (currentCharIndex < words[currentWordIndex].length) {
                // Type next character
                typewriterElement.textContent += words[currentWordIndex].charAt(currentCharIndex);
                currentCharIndex++;
                setTimeout(type, typingDelay);
            } else {
                // Word is finished, wait then erase
                setTimeout(erase, newWordDelay);
            }
        }

        function erase() {
            if (currentCharIndex > 0) {
                // Erase last character
                typewriterElement.textContent = words[currentWordIndex].substring(0, currentCharIndex - 1);
                currentCharIndex--;
                setTimeout(erase, erasingDelay);
            } else {
                // Word is erased, move to next word
                currentWordIndex++;
                if (currentWordIndex >= words.length) {
                    currentWordIndex = 0; // Loop back to the start
                }
                setTimeout(type, typingDelay + 500);
            }
        }
        
        // Start the effect after a short 1-second delay
        setTimeout(type, 1000); 
    }
});