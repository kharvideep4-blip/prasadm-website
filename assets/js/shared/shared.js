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
            bgAudio.volume = 0.2; // Adjust volume as needed
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
// ============================================================
// TEMPLE PRELOADER – Hide after page loads
// ============================================================
(function() {
    'use strict';

    const preloader = document.getElementById('templePreloader');

    function hidePreloader() {
        if (preloader) {
            preloader.classList.add('hidden');
            // Remove from DOM after fade animation (optional)
            setTimeout(function() {
                if (preloader) {
                    preloader.style.display = 'none';
                }
            }, 1000);
        }
    }

    // Hide when everything is loaded
    window.addEventListener('load', function() {
        // Wait at least 2.5 seconds for the animation to feel natural
        setTimeout(hidePreloader, 2500);
    });

    // Fallback: hide after 4 seconds even if load event is slow
    setTimeout(function() {
        if (preloader && !preloader.classList.contains('hidden')) {
            hidePreloader();
        }
    }, 4000);

})();
// ============================================================
// 2. BELL CURSOR + REAL INDIAN TEMPLE BELL SOUND (EMBEDDED MP3)
// ============================================================

var bellCursor = document.createElement('div');
bellCursor.className = 'bell-cursor';
bellCursor.textContent = '🔔';
document.body.appendChild(bellCursor);

document.addEventListener('mousemove', function(e) {
    bellCursor.style.left = e.clientX + 'px';
    bellCursor.style.top = e.clientY + 'px';
});

// ── Real temple bell MP3 embedded as base64 – no file needed ──
var BELL_SRC =  '/assets/audio/temple-bell.mp3';
// Pre-load the bell audio once
var _bellAudio = new Audio(BELL_SRC);
_bellAudio.volume = 1.0;
_bellAudio.load();

// Pre-load a second instance for rapid clicks (double-buffer)
var _bellAudio2 = new Audio(BELL_SRC);
_bellAudio2.volume = 1.0;
_bellAudio2.load();

var _bellToggle = false;

function playBell(isHover) {
    try {
        var audio = _bellToggle ? _bellAudio2 : _bellAudio;
        _bellToggle = !_bellToggle;
        audio.volume = isHover ? 0.35 : 0.85;
        audio.currentTime = 0;
        audio.play().catch(function(){});
    } catch(e) {}
}

// ── Ripple on click ──
function createRipple(x, y) {
    var ripple = document.createElement('div');
    ripple.className = 'bell-ripple';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    document.body.appendChild(ripple);
    setTimeout(function() {
        if (ripple.parentNode) ripple.parentNode.removeChild(ripple);
    }, 600);
}

// ── Click = full bell ──
document.addEventListener('click', function(e) {
    createRipple(e.clientX, e.clientY);
    playBell(false);
});

// ── Hover on nav + cards = soft bell ──
var _hoverCD = false;
document.addEventListener('mouseover', function(e) {
    if (_hoverCD) return;
    var t = e.target.closest(
        'a, button, .feature-card, .step-card, .mission-card, ' +
        '.why-card, .ecosystem-card, .hero-shirdi-action, ' +
        '.nav-shirdi-links li, .dropdown-shirdi-menu li, .btn-shirdi-cta'
    );
    if (t) {
        _hoverCD = true;
        playBell(true);
        setTimeout(function() { _hoverCD = false; }, 400);
    }
});

// ============================================================
// DROPDOWN POSITIONING – ensures dropdowns stay on screen
// ============================================================
(function() {
    'use strict';

    // ── Desktop: Smart sub-dropdown positioning ──
    document.querySelectorAll('.dropdown-sub').forEach(function (item) {
        item.addEventListener('mouseenter', function () {
            if (window.innerWidth <= 992) return;
            var subMenu = item.querySelector('.dropdown-sub-menu');
            if (!subMenu) return;

            subMenu.style.left  = '';
            subMenu.style.right = '';
            subMenu.style.top   = '';

            var rect    = item.getBoundingClientRect();
            var smRect  = subMenu.getBoundingClientRect();
            var vw      = window.innerWidth;

            if (rect.right + smRect.width + 10 > vw) {
                subMenu.style.left  = 'auto';
                subMenu.style.right = '100%';
            } else {
                subMenu.style.left  = '100%';
                subMenu.style.right = 'auto';
            }

            subMenu.style.top = '0';
            var afterRect = subMenu.getBoundingClientRect();
            if (afterRect.bottom > window.innerHeight - 20) {
                var overflow = afterRect.bottom - (window.innerHeight - 20);
                subMenu.style.top = '-' + overflow + 'px';
            }
        });
    });

    // ── Desktop: Smart main-dropdown horizontal centering ──
    document.querySelectorAll('.dropdown-shirdi').forEach(function (item) {
        item.addEventListener('mouseenter', function () {
            if (window.innerWidth <= 992) return;
            var ddMenu = item.querySelector('.dropdown-shirdi-menu');
            if (!ddMenu) return;

            ddMenu.style.left      = '';
            ddMenu.style.right     = '';
            ddMenu.style.transform = '';

            ddMenu.style.visibility = 'hidden';
            ddMenu.style.display    = 'grid';

            var menuRect = ddMenu.getBoundingClientRect();
            var vw       = window.innerWidth;
            var mw       = menuRect.width;
            var margin   = 12;

            var barRect  = item.closest('.navbar-shirdi-bottom').getBoundingClientRect();
            var itemRect = item.getBoundingClientRect();
            var itemCenterRelBar = (itemRect.left + itemRect.width / 2) - barRect.left;

            var idealLeft = itemCenterRelBar - mw / 2;
            var clampedLeft = Math.max(margin, idealLeft);
            if (clampedLeft + mw > vw - margin) {
                clampedLeft = vw - mw - margin;
            }
            var finalLeft = clampedLeft - barRect.left;

            ddMenu.style.left       = finalLeft + 'px';
            ddMenu.style.transform  = 'none';
            ddMenu.style.visibility = '';
            ddMenu.style.display    = '';
        });
    });

})();