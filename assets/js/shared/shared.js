/**
 * SHARED JS – Navbar scroll effect & common utilities
 * Used across ALL pages
 */

(function() {
    'use strict';

    // ── Navbar shadow on scroll ──
    const navbar = document.getElementById('mainNav');
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 20) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // ── Current page active link ──
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    navLinks.forEach(function(link) {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // ── Smooth scroll for hash links ──
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

})();
/**
 * BELL CURSOR – Static (No Sound, No Ring)
 */
(function() {
    'use strict';

    // ── Create bell cursor element ──
    var bellCursor = document.createElement('div');
    bellCursor.className = 'bell-cursor';
    bellCursor.textContent = '🔔';
    document.body.appendChild(bellCursor);

    // ── Track mouse position ──
    document.addEventListener('mousemove', function(e) {
        bellCursor.style.left = e.clientX + 'px';
        bellCursor.style.top = e.clientY + 'px';
    });

    // ── Create ripple effect on click ──
    function createRipple(x, y) {
        var ripple = document.createElement('div');
        ripple.className = 'bell-ripple';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        document.body.appendChild(ripple);

        setTimeout(function() {
            if (ripple.parentNode) {
                ripple.parentNode.removeChild(ripple);
            }
        }, 600);
    }

    // ── Ripple on any click ──
    document.addEventListener('click', function(e) {
        createRipple(e.clientX, e.clientY);
    });

})();