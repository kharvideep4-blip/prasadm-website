/**
 * SHARED JS – Navbar + Ripple + Background Music + Bell + Firebase (Compat)
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
    // 2. RIPPLE EFFECT (Visual only)
    // ============================================================

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
    // 3. BACKGROUND MUSIC – INSTANT AUTOPLAY (Muted trick)
    // ============================================================

    (function() {
        var bgAudio = null;
        var musicStarted = false;
        var audioInitialized = false;

        function initAudio() {
            if (!audioInitialized) {
                bgAudio = document.createElement('audio');
                // Use absolute path (from root) to work in any subfolder
                bgAudio.src = '/assets/audio/bg-music.mp3';
                bgAudio.loop = true;
                bgAudio.volume = 0.2;
                bgAudio.setAttribute('preload', 'auto');
                document.body.appendChild(bgAudio);
                audioInitialized = true;

                bgAudio.addEventListener('error', function() {
                    console.warn('Background music MP3 not found. Place your MP3 at /assets/audio/bg-music.mp3');
                });
            }
            return bgAudio;
        }

        function forcePlay() {
            var audio = initAudio();
            if (!audio) return;

            audio.play()
                .then(function() {
                    musicStarted = true;
                    console.log('🎵 Background music started (autoplay).');
                })
                .catch(function(error) {
                    console.log('Autoplay blocked. Using muted autoplay trick...');
                    audio.muted = true;
                    audio.play()
                        .then(function() {
                            musicStarted = true;
                            setTimeout(function() {
                                audio.muted = false;
                                console.log('🎵 Background music started via muted autoplay trick.');
                            }, 100);
                        })
                        .catch(function(e) {
                            console.warn('Even muted autoplay failed. Will start on first user interaction.');
                            function onInteraction() {
                                if (!musicStarted && audio) {
                                    audio.muted = false;
                                    audio.play()
                                        .then(function() {
                                            musicStarted = true;
                                            console.log('🎵 Music started after user interaction.');
                                        })
                                        .catch(function() { /* ignore */ });
                                }
                                document.removeEventListener('click', onInteraction);
                                document.removeEventListener('touchstart', onInteraction);
                                document.removeEventListener('keydown', onInteraction);
                            }
                            document.addEventListener('click', onInteraction, { once: true });
                            document.addEventListener('touchstart', onInteraction, { once: true });
                            document.addEventListener('keydown', onInteraction, { once: true });
                        });
                });
        }

        document.addEventListener('DOMContentLoaded', function() {
            forcePlay();
        });

        if (document.readyState !== 'loading') {
            forcePlay();
        }

        document.addEventListener('visibilitychange', function() {
            var audio = initAudio();
            if (document.hidden && audio && !audio.paused) {
                audio.pause();
            } else if (!document.hidden && audio && audio.paused && musicStarted) {
                audio.play().catch(function(e) { /* ignore */ });
            }
        });

        window.addEventListener('beforeunload', function() {
            if (bgAudio) {
                bgAudio.pause();
                bgAudio.src = '';
            }
        });
    })();

    // ============================================================
    // 4. TEMPLE PRELOADER – Hide after page loads
    // ============================================================

    (function() {
        var preloader = document.getElementById('templePreloader');

        function hidePreloader() {
            if (preloader) {
                preloader.classList.add('hidden');
                setTimeout(function() {
                    if (preloader) {
                        preloader.style.display = 'none';
                    }
                }, 1000);
            }
        }

        window.addEventListener('load', function() {
            setTimeout(hidePreloader, 2500);
        });

        setTimeout(function() {
            if (preloader && !preloader.classList.contains('hidden')) {
                hidePreloader();
            }
        }, 4000);
    })();

    // ============================================================
    // 5. BELL SOUND (temple-bell.mp3) – on click & hover
    // ============================================================

    var BELL_SRC = '/assets/audio/temple-bell.mp3';
    var _bellAudio = new Audio(BELL_SRC);
    _bellAudio.volume = 1.0;
    _bellAudio.load();

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

    document.addEventListener('click', function(e) {
        playBell(false);
    });

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
    // 6. DROPDOWN POSITIONING – ensures dropdowns stay on screen
    // ============================================================

    (function() {
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

    // ============================================================
    // 7. FIREBASE INITIALIZATION (COMPAT – NO IMPORTS)
    // ============================================================

    // Check if Firebase is available
    if (typeof firebase === 'undefined') {
        console.warn('Firebase SDK not loaded. Make sure the scripts are added to HTML.');
    } else {
        // Your Firebase config (copied from Firebase console)
        const firebaseConfig = {
            apiKey: "AIzaSyBDFUdtN_9EtUS40XAxUsZz7YtXwclhkps",
            authDomain: "sewai-website.firebaseapp.com",
            projectId: "sewai-website",
            storageBucket: "sewai-website.firebasestorage.app",
            messagingSenderId: "1003544441805",
            appId: "1:1003544441805:web:d68cf1f9db969d5e6bca84",
            measurementId: "G-ECQEBY317S"
        };

        // Initialize only once
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
            console.log('🔥 Firebase initialized (compat) – Project: sewai-website');
        }

        // Get Firestore and Auth instances
        const db = firebase.firestore();
        const auth = firebase.auth();

        // Enable offline persistence (optional)
        db.enablePersistence()
            .then(() => console.log('🔥 Offline persistence enabled'))
            .catch(err => console.warn('Persistence error (multiple tabs open):', err));

        // Expose globally for use in other scripts
        window.db = db;
        window.auth = auth;

        // ── Test function to confirm everything works ──
        function testFirebase() {
            db.collection('test').add({
                message: 'SEWAI Firebase connected!',
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            })
            .then(() => console.log('✅ Firebase is working – test document added!'))
            .catch(err => console.error('❌ Firebase test failed:', err));
        }

        // Run the test (remove after confirming)
        testFirebase();
    }

})();