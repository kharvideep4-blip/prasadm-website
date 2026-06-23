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
var BELL_SRC = 'data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4Ljc2LjEwMAAAAAAAAAAAAAAA//PkAAAAAAAAAAAAAAAAAAAAAAAASW5mbwAAAA8AAAAgAAA94AAPDw8XFxcfHx8mJiYuLi42NjY+Pj5FRUVNTU1NVVVVXV1dZGRkbGxsdHR0fHx8g4ODi4uLi5OTk5ubm6KioqqqqrKysrq6usHBwcnJycnR0dHZ2dng4ODo6Ojw8PD4+Pj///8AAAAATGF2YzU4LjEzAAAAAAAAAAAAAAAAJAQgAAAAAAAAPeB+G+DtAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//PkZAAgwhyEUK48ABpq2VF1WBAAQOBuU1SVQQWDWi8NJDAyexzarxNvo0wQkDmtHOUt0DO8yIdjQx8MvC4YDpjUagIhg0GgYJvPvusMPxSmoavQ9R2V8ZOIZFL+JuS87AM4mauIIQhUKdD2er9+/snDkUDeTgyIqvUbPikNDGSr+8BWMmVYrImWNXq9zYDTUdmBkq/f7fs7/bAchoHRFTjJV+/vimXmob/bYnGRjJwdEVPoez2eRL3v4CsQxklTjJWHHw8eagRKfN77gK9/ilLv37+JKxs8I5CCGQ2k4MiCn1HGYFZVWRIb+dsTjI3mghEFXs9mBWaYHlM3fv74fx94o8pT0p///6a///////9H994pr//336QHlAC4qxOZwcahJILLAJzW02rDjiAB3ucRruOHD9oDcSdNKRIcfi+ufnn+jvI07znyEIykJO8hJG8jKQlX0Y//9CMpCN/9Tn///IBnoRv////yN/oRlDgYG4c6nEy7///8cD6nfLggt5DicPoIAkk92Y4IfokA2eGY3poFD/djZhBgrmCgBoYcwGxhWg899QmXmCoA0YEIEPC5wbIuMDSiQFBIAgDyYKiZMAMJgiZAkrAEIfIoRQQXEFyTBRKAoPAzggDNGBCL//PkZFsfegEKZM9QAD3cLgwBn6AA88QMg44ETcDFiQMEACxRIaAcV/IOXzcwIoaJAZwEOWLMHcAUHN3/5ME4Qc+xBC4aOFtAUEOGeBsozwYAHLJj/+XxcB5MUuUDxPl83Pj7FdAKBmwswEIAMtjkEYOQHqCyP//LhoVC+fIoThfD1CqbokDImVExUxVBfsiRGB2hBEWkYAXMjDDoxQ4qYWkFb///63QMze///cZgNViwBjQgY35pjJjjQlcYMoAYGH2I2ZiAIYwgPCAB8wSQEEMG/AyTA0AJ8wHYFMYZNmAcgArbmA0gNpgRIAXycDCADAAGjMDZjAFk78XAMYIAEXAvdA4pEAouDdPbLxUDbBcg7ACQwWMhABAxYUDCi/y0kiFzA8G4bOFjQXOhikAkSFqv4sscZuRcnzcnwwAHIB2xShFxpjQ/5GEQPF9zAuMwWnB6odKYg2LFSLqwyH/+cJw3Tl/8LPgMAwFDBaLYt3///5wnJcIARAjhCg7Bcg4D3lEAESRY1JMT2IwEzAsFFbCu/////+gQcn3W6BFz6D//QGPIV1CuCAZRDVRLVQE5JbrbdrrgZPlvAYpabFYZjEclDsLuhlGSIOjAEQfWZclz42lQz1Td3nhG4XgrWM74//PkZDIc2dFJL+w8ATnEFpJf2ngDQ0mZqJAXwugecqOIlXyRSqvNxNnS5pVUOD03k6pMKNnVEVfxAgQXbCn2JrVF4Tp+5zYzCM02Hm8PGf4pIkCduLGlUIa3z48WlHzMKqZUxzzYY2/TN94aPhlUWPv+RZQ1RWRiHLKTaUMUx2n8jTzYE+rDoTbE1oYknBLJtWrC9cxH8frtpliOTCze93jCdbRY/2ynzpdvt9VqjoYs6Mf/L/f8OPjBe6oxLVz7I9ZrKQhDLf5f7AJtsl1u2vo4iUA2eSmpcw4aGBhtSEafpwdFUqyBLkRhHFWW1hRuHIafp9G+hl3FaeDOuy4OZ+Jk1FpCG1DiYj+O4uJ7G4XdArlgu7WlysKCCtrLo647ArEPkXekOhLKuZjrcEmml0dJnHgeOqxUPXSI34aHqCc0V1HWFXMj7w36kSyRYmtpRbTDv//3s7BP1zAjza//w44pV+71///////////6vVKxby0/+VywzwVwpmjMZGKpZ1lD2B+rN///////////////////01gFILihyGMmoETLGz75bhUoK2a1MQK9NZf7wXohQxCuT2LZMGDkEJAUDpQehaq4RERXBtKFxponsNRRtnUipa0EttALBaN4Ybga//PkZC8Y2ekqB3MJHLO0EkQG6w8cQM1s1ZYGCrRIQPHi5GqKEO6WAZJWyRhipCyyowEEpJLILSCzjKouqRHUZiZdnqhqJjORN7R1YQIWEBTosUM8yaUECDbdRhs6RIVOMHvez53ah9sSDhAqHjs8gxns6RIf7V8vUIrV4qt/DyboNGersmWrQbAkQHYqrt549Fnl/xBv/CiHypbf/asfcI/8GxJ//4ef8IoDOjxQAbf/abyg0egaqYRGkYyFmZvi8Ybi+YsjaYJBgYAhGFgIMCQKMFgkCBxX8ypxTAMAn5Rva2ipK2IWHGaGoe97JVtyKARaHJYA6U2B1HJMMDIqneiKjLicdHkMhDqlMyYCLRxaiGTiQg1mTRuBswV0QzZaiTdQ+PU80T5pPNTwfKqlKX4WsUniY/OiwpS/M8gS1a3z/M1woTSmWk6Kq5P///5RzW+VVHEcmYLQVKtEcIAGFx0ij//////zBwx1KDYSBrFTHj42zUc8KUOVosUBjVUhD5l2jq4cjLA6TCQMzPMVDFYLSQPh0BS67PgMFQEAMMKqRofKFqeXlFHTaY8671LH3TMgp9HfdOcdiZceOxN2YdgWgZ9IaaMXZFxw/D0vl0mCRACBl5YJzBMifkvHi4hm//PkZGQdPfMiAnWKrjjr9kAE9lZd7EUZeiMDxe+yWsauTU6GiZXtNxF09qpXneoEJbO8PzJ1dyZ1OcyfbDDVYwZq5heTpXljeo9aVoYLKSmjmAeYrry+xaaLKDgi66NDMDU0YumnymUHTgtFcfCj8J6PpSd4vQLpPAkue9Mz9ScbPmBdC1MHjf/6j0zcBQaReDWWCmEQFscyoXghG40v6bJ7iZjzhqGg8cGYqg1RkZh8GQIL6YRoaxgKAqBRwZpKtgB+MdEzxwxw0RjWGaW0FS5ElO9iKqUXLAMdUsaOy9l9+OOvqJ08vhM63WVMudyExKRDSPg3ghgIplY7G0XURx0AMEwsIYyHagN47oD2YlAxLSANpJ6cFjiU8rYkVtHYWymWlpq6IRRuyosQabEGkocoP9//wz4IyZ4r+UR0qnGfoM2GlP62HGMr9N///+qILTKSCKATovk10bv/////////////MCBA+ZpksdZCkM9Fo0j+TaeSyfYYLX8BFcUEKUZQUhlM3hwwU5koT5gwBZhUAZQLBfaXoXjwAIRl41fCQTJmrfRyep+GYwS9TwSOEQHVZ8ke9Eyy5v3dfB4ItCmVS6GnTjNyW184eOx6EgzWXuSqokPYLHJKMjy7PChB//PkZGEbegMqe3WKrjoMDkAC8xU0gMILHaBq+CTXFcmMdS7YmO8ayud5OsQkOavnSberKNMr2NSJaiJCdKqBHPLTuWVKrUksli2Wh+czktZrKGrtVdDzLLLtsN2VtKYyvPnuy1nT57aLGHvkFh5pTpmfwWBT/FwFf//6HQwAaExiEQpYAUFMMxZPdR63qPycJn3iOGsQI+Y1Agxg8CDGG+BgYewSYGEZMCMB8wLwGi1gMAVMAIB1pBcIGgAFzUJxcYvo9AqAC/7IEc1pLTZAoM2j4zDlUjX4o/jM3Ufd+gaC5IeDzgrHcYh0ZjsVBNEoe3gOkYVRPBqViJOGR9NR5MR6EI/NRF+ha6EsiNFGZiUQiwhOnc6vdmYD+XFZSiYUKD/oEfoj3M6CiLY/1GosCcT6D4mQaiZj8tGREWHgi2lCOM248L+Y2p5Uli8KACsBkTZje+e/55O6GN////IhaIQ8DEaBQioIAuJQUgiibF4iS5OPphmgfCGLIsCaJwAxiBBGmGiBEYJAOpg2AdlwTAfAIMAUAAuCNAGhgFZgIgdoIhEAKW6WGDAAWmF5YFamz6+7SCZNCDHflb/3FNYOde63Zlbiv4yyDm1ijgQ8zqEyaFzUDu3ANp3HHvwzIWex//PkZGgeIgMgBHmHyjBj/lmW6lU1CBILf+GJJB9DKNd6BsImCCtHt3yeSjVaYegOGbtrQnrd2TuVx88sQanJ6qWoJdfLyEfErjp4qGYkmntHLvSXqn8eGbTdJtHMnYHWh6P52fdIqC8RWjJVbcXXXvFmYSgW1/lC7ZPevkA7opnHV0ZXi35/Fwzzybx4bP//6nn0EvQMzTmER55/yxcAdKaqCbh26PxmGcpUAVMVIQwcC0BAMWdUXXu66ZYQAxgCAKX0Xacg69l2C2X0DTn5k1RWVej+PBR0MbcNX78QNZjRENPbD0rLKNyIwIGSNx4iMkjkJBAt5lxPdsUQuMkc0x8kxszZa2em99KO6Gf9bsyblsRGSX1JEaJ0RvkKdUvs1Dsw1qkpIcuhMeb5x3j8tlSnIRAjAVRBOMi3GT4qP+VBowo2///8/U93kIqB8UcPgux5yoFoXIhkE4CsOB8o+gg0L5ydiAaYydEMHKkhXuQGv+j078VSUVWRIjac0G6m7kPYRB+X3fiCAsKBRSjDQPuNioTRDPNLEay9MFiUlVUxiSTUy7pUjYmzvTTJacstSJrVGD+MUuRqxUTmuQkEGI0Xb8iG1ExnMq2Smpe4//WKb/9Sp/rGo9Pf4puWr/uW//PkZIAWygMsGq2kADB0FkwLXlgAUU3f//+n1tfkIVtsWxbVI4R///jiu/z/8BQb/suRZ//////////hI/jkvlSgoWMJV0Lf/9ImiBNMImQyyQGjBgA6MFAFIwOwOzBBAGEYD4EADYEk+FgAXPBQD5AA1BSwjLmwSp+nuae8DXpTdkY7g8Fg+jwLhsAuQhHKCENxMaIHh3GqRNhJAd7SYT6JBcuO0oaxypxpibk6qceuyK46fg+slVQePnU2SxrtSfbbW81SVrnOnmNtrQarur5OOa09B6n0qpVn61GP/afq//0/9tfLf+W/tr//d//y2tpR/////5n/lH5w3vYia2YIpo/onnm/UJ0v5NtlWJZFTV3OaXS17OxNiQnfrniU4mFwyBYAjKkpy6xkCDQgDAwfD4wSAswWAgwSDQvW/BfReo8AJcdyGII45vU1xSAhJNEFPR9FMryFkopYqRIFw0+y/9NLaRrj+SucYO0Vg4keuQBThSY/HnZWEfCG3znFvwLNwM+8pPFcMDha5DGQBSkce/ctic2+NPT5yCk5OmeGWzDAwFA/MvhAcAmfBTz4x+tHI+097pDUrUcshEgzjDjy+XrEfVXbQKeIxeteiE/lhJsIr9/WrFe/hhhzBw4H//PkZNMoqhldf87kgTpEMtb/mnkiYI4DaI+O5FMKe3LO4S+vyUWK8spLG99sW8J+YpMaSZwl+VLja5Lc6ksctnbjrEVI0yjsU8IhuLw3G6e7rCn7+GGU/T3KtefpMP5/01yhl+6T+0li7lSZVblaxnz/n38hiKTzgOowe/xy3fn+0liaciKX0NWWEZtZtLX89H88y2KyekybYskSYUiahqXeM4WMkYEjCNSAEaGLplgyMTwZK/4d5d4KTPswkiJueZUEOakYcxlCYM8SqjWHm4ikWMs7ctne/jwCeD8GchDImGWKLmdarW0WhZL2fcKbcqekq/VrXJBVfpes9GQsc+sD4S6mT+XC89FEqFShjKxYVijpTGKP56UtvVZqxc+moWb0+fr73/AiR8ap/Smv////vHp/v6vnfprdrw757nf/f+ocfX1ff///9Nahx6Y/xbG//9+kS+4sSHa2tx4ES+9RP/831Dj0xSA8pvHu/j6qNFh5VliftqdLaURhCKZKgV5dMVLFXeQlLKbk5pnKWOQYu56GV5O5puKF+8XOuvSt5ApvVpsCgZhrNGcTttRyCaLjateNe/Vm1babla1dSeKQn2pm5MggqD+5c7MQNnVvR2AXXe5nDv3q9d4pO9MY//PkRG8gggl3f8xkAT/0Ju8dmaACy1iNNzUom+/9b6epVu5ylimu6z1ymvTP///j9afkirYAYgiaw2LTMt/KrMTNLGojKMv///si1M0mfP1///JdelnYu39Jybi7+VJ2b/LKtBOFiVZfdtxvVfD5U5cyv7Cnr58uU9DATfUFmW4VrcMRJYn8fyGcqbVqV1rH/8tz1/5ZV9bs53s//ef///f//x5azuwfT5NFZ4lWhVOGdCO2xyA6wwl1b4CilxyhNfRedVpKsyEhe9hn0HN3DhnRJoMggoAHcGcCN1jcIUZgAxABiBggkQUmxPRIjOj4Dihc8nCqUwCha9Y4WssMBjQFmFRQrwFRYBxMrjPDLMICgRAFMcliyF0AGJY4hlRlVFk0AYHEVHyRU6hGPcUwruiianDYnCsXERCAKFP6j386aj5KpqSguEY8cZuamZWaVD5cMTivmBjKRmd+udSLQ7iDkSHPLiBZJ8sJDieoyRK7lZVS0kGZdzUi5BjEqFU4eMUlHlmZfTRUoyIePSlkAOIH6iwSBr30ObU3MmR/z2cNlGy6iZK55B52BJaWjrQog2d9Q5awSuQ/RflS+MyvCYi9P2483K27ElfVM6mtrJ02UgXTY46S0nWgp0kTZ6Nh//PkRDYYVgNjdOxIALHUCr7x2mgA6EsFFZuk6ltrRWoEyCcC4iSRLqkobWmQY+cSUgutXU9dX9Zo9qKnHKMmQRICMyMIyNWLZMj4FxuXxM3LiVG7OcWkzf9FJI2PjcPIyVIok6Z5bmqA5xkRZcumyklpTNboqKRDjYrj0SD8hx6ThtfZZXQq7mp8fBurRNTU4TpJFMc46RY2qQRNr/pmSA7gFlq8d6EheK1GZFuF2usD0glfMUaVMkQ5f2bE9RU/9q4W1ZGLVr5Kmh1bmJqXDePUw7uip9ExRAeBJxxrWrRU/ZrHx/B2lOlRWEwJEe7oH0mN0n9lt+j7a2LrpoiZI0S8VBRFAwRQaXjhHGkSoxJhsmzt2//XNi+boGww4/hNQfCOSrrMygRjUOSfMnUdGWfaiarXMSkOUlRwkQ2PvYeompmiSjv1IGx9O6TOSRJDADBu9jIxWblQ9h6GIWOxwzKZfbdVZqgibQLe0HUIUkEjxmCYPg5kbXJ9JaTxsyyy+3V7S4GUy9NYq1d9pZHeiqrotWtjMHBAwcBIIiplI1KZVjrIGghYA7KKKfZJZwSoKHiyhRWv/u/1pKVWX2TYzWgM4JRR1rDvDJJKKJOmI3A24njMQoo4mapGXSPutn/q//PkRHcX2gdbKGGULC7sCrZYw9rdWkWB/kDKtIsmKDVIjoLTFlEmkSWSM3orUbO2WyJEyUSaJ16R0hs+d/LI+Cr9yOLxNGz60jRYvB3IiSlFLYvE0Sf9SyZKBbWgC/aCVAipLUMRN3Xyk7WHHnXbimt3p6zLf5h3eRoY9s2g19d3bG6BeLj714G8/eW8G+J2TZzr81+/8bxnEKw2UVO++c1CFDHRLM4v9N6clfRnk/94f1F+uyKkUmMk1COExR2SHkGSkySZsHIGWZjkTHa2dQ6Ovt9LJF1pF4nkYEeKaLqRJIWqhhEzA8qJYbbJJPSREaJGgSxc58kDYvEq3tQP60WWSJmVjK84UpWUlDvH5OymNyW/sXE5tQpMQU1FMy4xMDCqqqqqqqqqqqqqAVzDy+WxX81p5bVNV5KKWUP9TxyzbnsM/5wkw82fAWwU4KCQXJP4b9PIKGQAUFB3wBAZqvrRbrSQLyQNDIGRKmZBTM1NiLAVMhUUK1KCalolmv50w9qb6zc6gt0lrEphjJS2kBDE4aQdKZoM0Vg/ILKiJjMgKBSsTxszHS0pL1fpOsrE+QImDYhC3SEci5SIrWgUSbDzDlCxl8wIcRMniHU2omKbSyJ9KBDxXSwOXpMOhycI//PkZLQaSgVPEGB0dCtcCqpIwyg8Ej9EaJr+xiQcgHqMZAh2nA+xgLE7IrRIt/LDnykUgDfoLSiUm8SvuNTkBgtoIF1AqOx6P2l6H13JWDKKUzysxUH5U08eXsxd9jiNZKAAiQxcC0E2rbWqrdTlAL9jrKyTMkXgajw8ZUQdFFH//3b0WX1jkFo+us2CEEJypMbHxng85VKYcbJlFpKf//yxke04VBxF/qGOJ44RJBIwL5wpPzQ1fOlIzUmaElqcmXUVPzpET3zpEThBTR/LSyaMiHDHl0tKdkSYHd/rQOGVTEFNRTMuMTAwAtAwylB5iqgNwUMASHgMfjj8QxT0kriNXGpOUsZuTOBViSCvh2//9udm56rZu5a3+/xsSWzEXwlJIkJRJ4jS4Kuqv/hv9/jUu2oYIR0XJ1JrVt0kbaIAE80ccIiDhKx51I/XMTVvWaLrRculWUi4ViiNsBUjVTJi9CxEQaSK0p4UMArw4w4oWcaE8Yok2y//+tkki+WQ5I+slA+IWsnWmRuZCaJEEOy+NpEXO78yNtETsWB+HGTA1GqOiETFsipLdR0uDiNH61jDMSGiyUNZQNnGNDQR/D0jQnG5uVv+TopBcARkDAILpmiYFmQksEkjQUQeuLwu//PkRPYcMgNEwGtysrgUCoowzpscBYzOXMN3Lu9TE3wlmIuIVhhuky/VypM61Z7rmfeY93M2MFVjVLRQWGhyIN9nXMLt/f5dz5W2zUsAk+qC7hfVkh4bjpkwmTznauf///U+rGef//WmKP/xr1dfynnJkAAwgjX1uaeMLL8pBS17ONRWRtnuQu3Zlt4d4grf/9dxykUpAJYtmIrDSlWcKYfyC4XRM8PotjEZCD60u4XIlR4jnPDjSqQGKeJwGKbpecIRr9RBJAFtGSrUbkskWhZOADE4PI8jOjAjJ/sZFMxZTEFNRTMuMTAwVVVVVVVVAMAg49gF2zIPDKpRkOYYIRBX1gKK00mtQ5T54wy+jZIz3QgtFB2T0lBnKMst8pa9BTUd392Od72S38rINAmWbiFabZ20OBsa29Z/zP7tynjDKzADA1NESNdKOyqOt0MFpwE6C3BpheRdF/9voGKVRwuF5RxAc8kCBlwAtRxqzweiGxnmTHWwfgDNDLJFA4ybVnhof//nCORIiaFTTELPzEvkg4z7oEaW0hYSS/x9iyVCzjERiWtI0E2jeGqQOl7kCf6KiyKSJfywVzEP+JiO4MSk4KVbWYlv/OHxLCs4EAjSAA0AhAqGYeQGNDAGC3Si//PkRPAbtgdAwGtysjeUCn1g3NuoUlh+huRKv8vsW4XBEmo9hUQIqSXWObmO7ynssLNTf/uxZpsfuf+QqGm+lgycAsOYY9lNbu7sZ4561lzOYFRAwIUljy9pImSARgZ6aWOCzw+pLnkv+pL5wZ5JpgXCdROlIiRQH4EBgbBYq0XYwBiAVeSJoOsUKYjIDkhbEPRHMUjWXRw///yssJUZyBJgI8EifnRkjdF8jID6R2E//40BOTQeQdime1EkJaNw1pj2X5mMN+pY/BNSM2orKJwmjyG0V0wWKGokih/nS4bOOA5MsKNenQEEQYiFz8obg/Ejs3r1J2kUXVExDWPQCjAhiOfDFI/cEX7mVPb7Ut4c/eNa/nTwbR9qiINmnSEDTOHJ0vswXCzlY/Pt7HCJxqK05g0mHWAwGBlLqBZQ/qPxkpCmqgiGLgDkkAM1L//6Q5ZdnFjmkNPSKFoWE8GoAMmIsnZICiAWEbqI0ipoOoAsQs4LaCU0XzIZ7//+LOIASAjMtLca4ZdLWozJYdyQrxNF0ok6VgxETC3+thVknE7DOii6BNDGnnWS/ygHyv+PpRDiFP8yK8NRIIUxmhuESP50yKzfykgMcRJxGfsxsUiLCBix6ChFYaLvdDcKhb/R//PkRP8dMgc4AGuTXjjUCnAg3RuqOU1JnkVkUD3q8ymuRfkspI9SQxq7KYTT0ljk1LO7xrW85fMZyxrZgQIB/UwCONtCjCwGrau/X13sov1rli6w9O5BsFANLVgaCVKiRLBzKK4GCSaMUkX//1HyRmRgPB91DnERKpDA9IBYMRJSaBFgaNgUPD2ZC0kFOiuiEAvhXw9dR5DGv//9ZdNCiPp5bl4cJ7nCojyQKBqTSiPIYcb/9IAWljhC3DiG3Y2C7JuJkdbqLojKvxpi6UW5iSpcNxxjhB2HBavqJ5q/8fz5aUpMQU1FMy4xMDCqqqqqEe/wdaQaFYNRC6SX8w09lr9TecNvZGY5JoFaqibHnDiJgsELujzyyHbsQraobc5fqyyez///HfxGRTjtrlOQGwrDnhjBfhwbdLTV7WPd952UNfCwAZC9mXSYIFFU3SjM9Ahjp6A5QGoAuxBNX//mZMj3KhRJI+0ZYgxJjKBAIC8atwhkLgPpGLpjFDIYgqRYCxloPk0f5g583/6i+OFjofiieQJkvH9dy+ZjpKRskXXNBooPOtqjNGSIYRIgR76TsooG3yUFiX/QLhAn60mG6RYhpMkUIl1k4Y/5wXHCBAw92VOgVzSi0zQVWCKogyda//PkRPAbwgE2EGtzXrdsAmzg3RepESq1IjLaWZjFG11401KeN1TA10bMYpMUl98N3aC8/WVjlaLf/7x1V+ll0ICoYdWqinQChwrD1TVYtjhjZy3/yWcuxALAJnQsDhCL81VgsAEZrQQNQQKgtX//rU0rppuyi2UjMh4JgQmVSWpaQNWAjQhT5VNnFpBt0MsiMQ0qefKS/6Frn///8+aFzR9PrMNB2r/vNyeSxWTjzjVRhDHL1a9B4BJxQAURAN/tBIXUBFf/54kLf/woaltfwjDSaYCiIxPv4YQ1//4fR2BtTEFNRTMuMTAwVVVVVVUICGnRXpsBiUERjKeJLAkOL5CoCyfsSmZl9eUD+x171VpHL4yYObA+Bb6QyyVvVvs1T3q1PF85bav//1M3osyqHSwEG7vINJTf1EDE7sc7+Wu8+5dmKGVUJhoknKQkhHFLecOJhmLAWakA4X+FbjsJ9Bav/+QAYs3lZ8xMjEwDIYF6upawwMTLuo2Ohb6IXGaIoCIXT5Zd93Ul/5KEqQ9xzB3IorJA9N1ybLihlicRUYqKJ5T/cvDhPlIWYS39R5D1JLf+oumq+sulwxJ46SBDkHeopEc/9Q5yQQDEHJL4ZYXpksFggQAYlg41pKIcFYIs//PkRPEbMgE2cW+SsrjkBmTo5udkrDTuS3Zx9QFDeKi7uxd/TB7zA0VaZWtWY9QclLeyeOz1mKNLvznP3N4S+mjLnjoZNWJoARgPGiV9jCjlMz9rGtWt01LTQwqM4t3JgRq0/hyNmCBwGyQteIGThm6f//kMPzQmTJ8pFE+XRZAEbGC1HYZGBjCsbkMIMWRQAdCJyFdLLmvMCF6TqS/8sIEBNRyibWeH0Q5OfXIYbLGgXjFIxMC8bO9XUXhmjYpECU3UXnSNjb1mqm/nCZLrdI2cfZVIUZZIQ5PUkYP/TJk2TDx5cPfP4wSQAVNTe5XNOJozcMDEgdCCePBMwkBDAwICAAmu2dmr1wfcWGchucYKiBI3YwaEwBDabk1uYiP7mK9DN4673PtZjTuOixZAiIlwYIHZxd4AwALtl1m/NU9Je+DJfLIfYgFQSZAPRqA/BApQ8Ya80hC4JMMuQ0sNQCwFxiWLZ5//9agmQSzFZJEtycJaoewJCAHFPomJ0p0HYKMCeCphXA8sbJ8gdZC//HwL+dLwYhfrREvI16JKj6RiRZCqtFF+hxho+A6kUvzpHPf/+m5IH9ZgYn1njJMeT6jNT+1RJEdyiaiAR8vmnFUGaTFJkojGd0CZjGZiEHGK//PkRP4c1gUuAHIt0DjUBlwA5JWoAQvgteYDApbcaAkYcm/DkBBgBUIl8VFKSLO1Zkuxoofg7laW4z81IaWZgCCr29bxg2nlRYAYwQDE0DEDcPyD4u0zaKT1mUa/c9FpTf7Aiw5gwiGiIMYgBbPn9nrKwZgMcGcAmGQhJk2LhkcUb84f/qIsT1jIzfl5M2IUJKXVM54INBRWRI4vFEZkNUh75MmNl4wFP//GDkAC5gXAgByg/Fl7qwyFc0eud1GJA/MZAuRiecLYN4JflAaP//mN/NCsJ4XorioNvOf+wXxMTEFNRTMuMTAwqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqowFKjkrUOFgEweOgEcgg4hYBKosUVVGhLAaEpFhYJXig1123rhEEN0FOaNoESBj9ySKq3PxLJJdzh9sElv35FHYvRVpd9aMQWWAaYxGhCTCFMHND2YeC6c0hporW1lS437Dpug2MYCRkEHniomChyqq3R8bRgQChYoGEwQJwB5hyTI1Nneggh/2OPSIwmF60zEZQNcFoRsvUEohqZLsZVDljADIxRDnUEf0Zv/OgvBgIwCoUmaF2F2//PkZLgcwgUsAHJq1Cdb/po+zRTfSZpwvFkoPSE+4/PJxwo43PHRwvJGH4XY2DX9B6b//+RHZhqSeeMQ+LX2/yJkJQSlYuEAackD7SA5QFBEYA4KBSQXtKY7Dl9wqdwGwl/l21qKU5MIyCg16CZQSQU1jY/M6vTIxajpkBiBYcgAxXIV0yiicLyWs4V9YpgWEFnqMTcdx42///0fs2p6kBw76gHM/iSIEkR//b/+grHEfYeBShS8oMRsOEwxN6nE36xiPh4LQwf6kJAv//kpc5+Vdipo4XBC5ytKnMhC8lEVTEFNRRBNk18Ic40TTCYTEAQEgJDTXW4Pg1902ttdaQsNOR+zKnPkcMCnFM7AUaCjruOux9HchutKI1Tt1ikzRUN2mlUxd3qllQgBY6HR44FQKHZgUCgs0OQVPpfr/nq7qWvejwFjmNmIwqCkwXejM20wwQaAEf0HVxWqfPGev7yws3a/+m+m5NpZNEidJ9lk5JoW8T2tS1Qgog4rIGpMJjdFwC1kFW63r9Rr//GdHaPxZGy+xKHV+1wPxmUdxNW1iYooZBAoHAgBCGK//mYov6k+///+Bw5kKqB1Kl3miYebfxV0kFQjj/IOQJEyiTAEfTKIRMLhQtcHCoRAdrxa//PkZPscUgEuEXIo5Lj8AlgA403R1E1WWYXJDy1YYpJFGlSqgKgZGxS40mm3AUMgx/7mFJF3FoH/kcxJML1y3uCor2bbU7WkjAkkOxowuKxSft1av0+Os8JmUQ2lQY9D5sxlgkHMziVLaaUDgwNLZIWLw53G3292s/k5UpLFhvUO82edMzhKOwmDGRBCkT3MQV8UEnODQoScLSNZRIVD+o1//k5ESQntUYGSauZHHiel84bZnfLfKh5EoajvJx6gymmJBeYdbv63zJ1nz6KVpNAUQPDZyiYeA2vEUH4q3dHKTEFNRTMuMTAwqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqCEYDzkCHFl2YdGQGBhgkAltWDwU5ckb2cY2zOHaB4K0enITK7w5RQgbpMSevLHf5TZWr9DBEjvQ/UjXM7E1ehvKbjhijAKxGFdk8gOGO3LYzaqW5mX09JK4Ip5RDZgjBuzClrsXcuwwZ0QdMIAKCMapMX/tdhj3stSDrzGvVJrJVzc4bgVAef9kghpe2oHlA2Nx26N8l3fdlf//y/8krpki+Sht/5QvBe2q4J5qvJdmyxutojsKVnO//k2utSHyap/+h//zW+1uLPeoQ//PkZMwalf8yaXNLejDUFnY+2o3QJNXWP9uvNitAALgGAikQtmxhhzxwZwQGXCRQLmBhI4AMLkbSHyk7WJS6sMPXFcLFKwOTCE1HqWpzk3HtXNa7HpVYh+f/XNf36veRN7w7dEDUGSy5YVVy5l+8v1u5jk2EYBTeQQoA5Nfwr4KvBQM4iIkalkvgSSQbGJa7jsxBl8KuEhj6CWmzodQfmILhF/Bl28hFB7N/uh3/9WFIftnEpv0zn9ST/ycWSjPImQljp7yMvoPUHOpMLm7Ud50ur4LnOKOTDG61V+wOPzuhTEFNRTMuMTAwVVVVVVVVVVVVVVVVVVVVVVVVVVUCACAm6ZWFDqUagglKmZ0CGak5EBF3HuT3gSXuxDFNVjVNhAzcb0hGf2IrckdHRPvVpqSMakcO2/mv3vtb/g2/fkCpzRw0GjBmAypRBFPln/61L//+zjhlg6NKLEvYapaaraAwahYUDX+7+B1DZeWJezkAs3lh7QIllH0MG/5AkE9TI0PhYccJAId/MwOZypmeH6uYhZODkXHH4qKiYRv8SBPs9uHcdNNaqq8k1/rUX9mrNbM1f8/XH+jkaM5I2jYLluKiJYLLJo2t/YJQVP7aEJ+mAGIC0bjGZsQKGDxOY8Fx//PkROIaEgs2w20J2jc0DlwC49GpgQFmAQWXgTAjbFFY0v2pxxmcskruNEQGO0YAX49qmmwuLzE/KbMvv081T1a2fP3H5vKtM1plN4GgA3MfgRLzI5pf9uMejNSzf+UQ9+rGWdK2EzWJUIYdpsewZDpMni+3fvtx8+Tx4rY2+NhXSzs0VFU8sGd9uE/aLP3Qp+/+uBpGJSum86ILzV1NrG/RJg4fZCwtpHUvF1ZwwVg+CnHHf4kDjb5Lyha59VWuVVf2aV4WtvuV/+G/r/xgiDYUcTljIYwHA/14/JoQB3CVSLRtzGnR++YqGxo4kiENiyHW27iOKg7TWxoLp+zMMX6KmagrbAAqATC3rO7i0mAik4k7iCORwFBsjnpJGN0rd6kmiNmVSi38/NPoIAiY5HYUd5v0zAoVI+u1KpdO5fHoVXiEbjFDYAofA35CBA/eGETTIMBhQxoCC0GxKTqEKPC2JpjFONrNnrIRm3WR8KwlXt+Eg2KYHgBrTMriEXlF6DW6Co246B3p2Zmsw0TjGbfG/MmMfW0KV9jktYrkRA0OlN/B4j81yyx/lmM/OoX+ihko6v4QKEKKg8iXTJhYLtQTM+5//kRFGGfpBd3Fs7gkPWh0fRb1pof7KsqgYGlD//PkZP8fbgEqBnGJ1rZkEmAW4pPRPZMMp8k5KQzEggM6Bsx6ZgqOxwDyMdCK40YnAVjaW4ktU1waU70ivDjtCDCsymhdFD0ZsyiHJjcxIJnGISXtyrvUFxqIuUWhM/JwcVxsAuGGAjKb1rC3zO5QZ4TNJNxgumZkI6YD73N/PjgoFkig4rW89PhvW5tkdX8f/Zrc4Xk2a9JghSFtuoPFNTYVQKhhEA7nuayCLUwL1rnjIWR2ayUHQrjARAwGZ5/Ec0+VB56Ykcxv9T//QzmN//5hQZFIjDypKDQ6Owh2NFr7KxoeH1BpxEL2GBCNM4cO8eoN8TRMNCjNbhbMfBWAgOmM42DAIIfDIFryRdxXI0tubuOa6LdG5RwxElka/oaBhLuGFeGAIGua1622rLYaooOmXJdWiyoJ/vXrnrbdFCzG6/IBeY2XrHlLpBPRST8lcuz3Um4q85ewQK85GYQqBFAXKhl8E7xCVDNATcJLKkkVamtX4+7knz//ncOf9y/nOzMvwvf9+SKcwrcZpZfrm7VM1aWSijisy2FoNDERoHVID7lnPGC51ALECcGK6oSRO50nIwOUBXR1tInt1xWYE6rEbilXguvXqbc/yH+sS2UCpofWbzJCb32r8MnO+lK8//PkRPUh1g0mAneJjkEMElBE69OppviJ3oWQw2AeIy6AiCp0Nh6RNxOU3JhvoXAQKxmtap4Nv5tUIYhOI0TAEaIMDBuYkDCIAJYAQAU5aab7sITkZepQ19yGtMQhgw0EQDZdClpszh4vPfhyCGBphXWdZS6H35jMNxuI277GKruKDlgAzGQ9gATJv+IACBlHGnnbF2kyv/qUTONuUJ6GLIxtvEaaxNlQAjAwRTDYAxYjlZqPrRrQs//3e0p/JtifSx6a/na0MvKizlmw8gTExQGrPD1gPjoZ9uPhxon7LEXEvUgvJr2TbvTLrsEaZdF+bMECLMIgIaTMQ2FLM4jqRJOmxSZI6dWLa3sRwG7SXt5lFfaT6CEIp9KSeWSJo723omkLIZxCC81g2WMxQ9xjOIFeNiBFKZbGZt45mWDcYyGpiwDmMAKtZu6ii70moUk/LGaJAIvr3huIUrYmRGKDCfpBCOKp3HlJKA5bBkfciUclcpkjkxmNU1u7PTESnbkGgAWAkcggcmxQAgc9kxQ0eVNNSyat4xSH4gyMw8JDTZ+LpvhM2pxyhgmA4Qj+GbnuHCdQPZPgmVahXGexTidhEitda+2iO3I24YmXr1TpV+OvpCKej6gDSFCopevYRacN//PkZK0eafUqYnGH2DfkElwE4hPRJqRHr6gpuz7vxPoa1CE4vJalT0RcP1K80KS5NLmwNRWJxZq0dF1bCsYmE4bigNM5/O1P3Ju2cWhecx1ruvmGaqSVbqRzBlazjx1OyJo3cMzMxdNBAcIOpUAzMEDk6GvrWVsKAU0xLxurhy+tH3i4OOUeWbHYHtwJDb6RLCtFqXVbkxO6jVXfKl6SQW3YAlEyuqAubTZwAW47tFLdc/WN+rzV25lGBYxuTLN50DPTAAyAxzgtf07ncxqbic/qp38uZH/CbGJ+wdPZwNbej1GBMOYskGxLCKEopATDIr4ZUHSZTWJeVr+BIQHNciGHq8M1rW0t8N+JDtV+Gv9yjQ4sQjjhczGiI71/ig/0/goYXdyUwcWkeJschHRUrMTxQnpoRuAjIzYyN5qNOOESMODqMOg7MFgvSsLqAEDENb6j6t7XnBWFAILplLvZ6vZZ0ANUMOhvOIwVXarte6xFH31pmdP1E5VPS2JUmoKp4zjckCRkI5QrFMggvBJrmoYig0Ami2ZXas01NzUnlGUikD5hYVDIwDC4LlS2/WcQwdDwyJAkHwDGsw2m13ncg1fHrx8aZ8peZKb2TE6v2SO3ZbQ4Tyid2rq3VMnJZw7q//PkRKUc/gMoAHWG1LK0Cmj05pD12ovv8rS22JX+ZdfsDch+xbbzsSY/nNF/u69/nfWOCx//JW905Tn+UDQrz5yzne/5cqW5bjAvyFl3dILRSRtK+6CzNjAQI9dmAJQYRP5lkGg4CAQDch9WmLPy9UOtYtQUjONAPOarXoxQBZGDUSmbfco7lcwqSuxhL7sb3cpZZZ/KSWK8EIrHNcCKka9UNCYc+pzuP97YuVsuSRTo0QWEd53CPvULEQbBvH3NfzUQ1zQvxYp2VnXY4ggfRA2JEVReDnmQ6FxUixz4ra43n/kq4of5Dt/nGeMtryqOgvKRH+ZH3sTew6Q5j/QStUotyI3BZVa61I6YT61eOYFz3kgaEgjlnDxW2IEUGmMFxxDdTEFNRTMuMTAwVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVQFWgBCBcumO6gUHBwVIl1Z2HXrlstl0PyOpk6LyY3L13loQCB8VOZscKO6KKjE6fLqjyl60EVMYhq4SMAqefpfoIP5fAsFNk+YDdC7g6U//qTRnJsKMrz1SZRVMxlHs87ihKZi5G9aIcc70OdmqY5KG+zNWLvqJm6PhX9mb1Nnav/4w//PkRIMSgftDK2qFeq6b9lwC4gusasuMIggJzmHD0HLRRod+i0RhuIMm8jkbLLwVAQ0W0Iqy2FtNidJXElhxnY6DwEDoNgebkFDDRh6OEUXhEYh+hksvkV67T3JDXu9gezKaTmM3TWak2sk0wZQYdisOCIAuNJbVnv/uJW/v2M5QFQOX0dSrlu48ZfRoofASS6r+v4uYU5kxlRSJZW9IuMihyxELdFW13F7WjGDv8bEDHHDx8FC5Y6uWcU0N1UrNVhd9RM3R8K/pFW6o0epf+nGDX9XZhYcJlorrKgiLqfKKTEFNRQnZIZoomB8M0Y0NJSAuTmCCaHjsr1xS/S/QIIDkRTFg1S1sQjAU41cmBYRGFmPG7INBgQqtY45YgAVe7htkpoNg2C60Euu0yDL0rlEAODJJbcdIYAAzVAIGGEZMlYiBEoXWxv288XKkbxUlmjdgCCGZPiWWSh2enIbfQwRB0xLAJZi9L1invTdDL69ea7RUte2S9xaOKnbRPzOd05ZQVGmSAlGjs3oxARmSooS0j6GQ79CcMhn5EYlL7TwQAoAM5uJ+B0Z7/6UQEZ65zQy/VEhLn//+///kyjad/8hI3HJIjD/ZjznzmeyjR19//ikB0KHFkUUOeUvLf/////PkZPsfmg0kAW+pbzJkCkgA7o9saHTSfzhHUJhAppokVRgaJ5geQS8AuBc0gaFAJioWAROd5REABhGDCA1Mdc6g46ADTjCQqwVrZMAjc1YnQSPZhEnSfhlNVuUglECtkXI6b80mWbPI63BjZgqH5o4QZikJ5wiQACBZcEFVbXMt1FZLFNCqO27AGBgbWCj0Mz0sgMkBGF7lQ4u5Gi3zLeclpt0/fuwdjG8foLtukyuVd9sbxmLVFVYPcqOaHTGNVh0hC9BUc3//////////////++HiXOddRqz9RqIGygtqTEFNRTMuMTAwqqqqqqqqqqqqqqqqqqqqqqoCQQFV8bhh5xNLmnQOEEskCzjMIZa0JQh4SIBrlfSHlVmPuq193nSCwAMQCowNpDToPAQvZpLmbthh+nqyWmjdHE5ivnnurVuRyO39swS8O4UMNaFnRfGH4bv85rCk/6v8iC5AMEMmehuMb7XbmVUJggkBsUiE5jj2cjDaxqL/FqtJMWtXN4ZTn2b1TPl2H45GKS197lNuiwq41ccNSznKsasWspmm/6a9T3ufVs/vOrclMZ/XyytLsN3YxY5nnKLU3HZBuc7/8k+El5nn3/ww///OkjGFejl2dHnT3Kf5RS0+sv3R//PkZOUe6d0uuq5oAC5cCmAnXKgAcvW5fzlukrdnqvf//rWsocUGBAkQ9VDTShZM9nMiSRhEUjQXVSX7ikQ2jmy3lMy1bEAtYaZdlwiAxhwOGswCBgm45AxcZAzEiw5pgQQzMDUyTcjjxdMSYLhGFk+LPC2ABzaAwUUgUiQNwiyx9k8aGBoidNGmh8wLhIg2PEm1SJEwiIQJFkW4qmF1HDFI1SdqjQ0TQaupBCpWYl5DQrR1NdBDMmbZS9BqDeg1X0G/q/1f////Ug3///tnC8ouIIIetN0EGTTeZF4QcEDlNtAk7nMjA4WLd/5i44mhEeQhhyv8yOgDFA7VtEYK/zQBvN/9Y7iCqW+Xl//MyhwxsCjFYfMFgEGAdUDP2A//+YYCBiMQmFQCY8Bho1TRhfLKYAeP///C4sASOIh4YUAIGCwhJD7R1nztTa+v///zFATARGMlG0wMEUCCXpgAAuFE3w+liWX////lulSlpS4TLS0qQyuS5NWPZVY9lVj2X/////6Qy1S8KgylqAFQZeqPqRTNU6aseyqx7LGay3NVv///////06l+p0p1L9TpWsuFK1OpqCdK1mOKWqXbmq25qtuarbmq25qtv//////////2gLVWszRaq9l6KWr2//PkRP8kbfEkAM5wAEj74jwBneAAZovVfy/FqsWXovViy9GasWXpNVtzVbc1W3NVtzVbc1W3NVtzR5vpxkc45hkMZhYBH+Y0IYYdl4YEgWFQC/zFslzFgzFORUAP8xkjjn7oLCnBoGUvaD/+ZBEgKKoOHRg8EI2uI2OU//+WVCoInzAJGNFpCpXxtMh///wUQjGAFHicYrDRigRmNTwymOKKvrKI////+1kCAMEhiOpqp9gIDSq1V1TRGl////8uS1Mu0XZVcXyLeqvBQCuR2rWjtLWgGl//////Lsqclri2rnpXF8Vai4ydKri41yO1bkdq1o7VuR2r///////+mC0NBZTVm6CyYLV06l6qMpXJqsfSuVhuR2rqO1dTNXUzV1M1df/////////+t5OpmrF1rL1Y+zZbqz17MVXuvZjil6sS3VY1/LdVjmaupmrqZq6maupmrqZq6mauplVMQU1FMy4xMDBVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV//PkZAAAAAGkAOAAAAAAA0gBwAAATEFNRTMuMTAwVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVTEFNRTMuMTAwVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV';

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

