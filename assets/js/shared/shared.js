/**
 * SHARED JS – Navbar + Bell Cursor (No Sound) + Auto-Play Background Music
 * Used across ALL pages
 */
(function() {
    'use strict';

    // ============================================================
    // 1. NAVBAR FUNCTIONALITY
    // ============================================================

    var navbar = document.getElementById('mainNav');
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 20) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    var currentPage = window.location.pathname.split('/').pop() || 'index.html';
    var navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    navLinks.forEach(function(link) {
        var href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            var target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // ============================================================
    // 2. BELL CURSOR – VISUAL ONLY (NO SOUND)
    // ============================================================

    var bellCursor = document.createElement('div');
    bellCursor.className = 'bell-cursor';
    bellCursor.textContent = '🔔';
    document.body.appendChild(bellCursor);

    document.addEventListener('mousemove', function(e) {
        bellCursor.style.left = e.clientX + 'px';
        bellCursor.style.top = e.clientY + 'px';
    });

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

    document.addEventListener('click', function(e) {
        createRipple(e.clientX, e.clientY);
    });

    // ============================================================
    // 3. BACKGROUND MUSIC – AUTO-PLAY ON PAGE LOAD
    // ============================================================

    var bgAudio = null;
    var musicStarted = false;

    function initAudio() {
        if (!bgAudio) {
            bgAudio = document.createElement('audio');
            bgAudio.src = '../assets/audio/bg-music.mp3';
            bgAudio.loop = true;
            bgAudio.volume = 0.6; // Adjust volume as needed
            bgAudio.setAttribute('preload', 'auto');
            document.body.appendChild(bgAudio);

            // Listen for errors (e.g., file not found)
            bgAudio.addEventListener('error', function() {
                console.warn('Background music MP3 not found. Place your MP3 at assets/audio/bg-music.mp3');
            });
        }
    }

    function tryPlayMusic() {
        initAudio();
        if (bgAudio && !musicStarted) {
            bgAudio.play()
                .then(function() {
                    musicStarted = true;
                    localStorage.setItem('bgMusicEnabled', 'true');
                })
                .catch(function(error) {
                    console.log('Autoplay prevented. Waiting for user interaction...');
                    // Browser blocked autoplay – set up one-time interaction listener
                    document.addEventListener('click', startMusicOnInteraction, { once: true });
                    document.addEventListener('touchstart', startMusicOnInteraction, { once: true });
                    document.addEventListener('keydown', startMusicOnInteraction, { once: true });
                });
        }
    }

    function startMusicOnInteraction() {
        if (!musicStarted && bgAudio) {
            bgAudio.play()
                .then(function() {
                    musicStarted = true;
                    localStorage.setItem('bgMusicEnabled', 'true');
                })
                .catch(function(e) {
                    console.warn('Could not start music even after interaction:', e);
                });
        }
        // Remove listeners after first interaction
        document.removeEventListener('click', startMusicOnInteraction);
        document.removeEventListener('touchstart', startMusicOnInteraction);
        document.removeEventListener('keydown', startMusicOnInteraction);
    }

    // ── Try to start music on page load ──
    document.addEventListener('DOMContentLoaded', function() {
        // If user had music enabled before, try to autoplay
        if (localStorage.getItem('bgMusicEnabled') === 'true') {
            tryPlayMusic();
        } else {
            // First time visit – still try to autoplay (may be blocked)
            tryPlayMusic();
            // Also set default state to true so next visit attempts autoplay
            localStorage.setItem('bgMusicEnabled', 'true');
        }
    });

    // ── If the page loads and the audio hasn't started, and user interacts with the page later,
    // the 'startMusicOnInteraction' listener is already attached from the catch block above.
    // But we also attach a global click listener as a fallback.
    document.addEventListener('click', function() {
        if (!musicStarted && bgAudio) {
            bgAudio.play()
                .then(function() {
                    musicStarted = true;
                    localStorage.setItem('bgMusicEnabled', 'true');
                })
                .catch(function(e) { /* ignore */ });
        }
    });

    // ── Handle tab visibility (pause when hidden, resume when visible) ──
    document.addEventListener('visibilitychange', function() {
        if (document.hidden && bgAudio && !bgAudio.paused) {
            bgAudio.pause();
        } else if (!document.hidden && bgAudio && bgAudio.paused && musicStarted) {
            bgAudio.play().catch(function(e) { /* ignore */ });
        }
    });

    // ── Cleanup on page unload ──
    window.addEventListener('beforeunload', function() {
        if (bgAudio) {
            bgAudio.pause();
            bgAudio.src = '';
        }
    });

})();