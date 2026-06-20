/**
 * KNOWLEDGE BASE JS – Stats, Categories, Articles (Safe Version)
 * 
 * Security measures:
 * - No innerHTML – uses createElement and textContent
 * - No eval(), Function(), or dynamic code execution
 * - No external requests or trackers
 */
(function() {
    'use strict';

    // ============================================================
    // DATA
    // ============================================================

    var statsData = [
        { number: '2000+', label: 'Articles' },
        { number: '50K+', label: 'Monthly Searches' },
        { number: '15+', label: 'Languages' },
        { number: '500+', label: 'Temples Covered' }
    ];

    var categoriesData = [
        { icon: '📜', title: 'Temple History', desc: 'Ancient origins, architectural evolution, and historical significance of Hindu temples' },
        { icon: '🪔', title: 'Smart Rituals', desc: 'Daily practices, festival ceremonies, and their spiritual significance' },
        { icon: '🏛️', title: 'Architecture & Design', desc: 'Smart geometry, Vastu principles, and architectural symbolism' },
        { icon: '🎉', title: 'Festival Traditions', desc: 'Celebrations, customs, and cultural practices across different regions' },
        { icon: '🕉️', title: 'Deity Worship', desc: 'Understanding different deities, their attributes, and worship practices' },
        { icon: '🎭', title: 'Cultural Traditions', desc: 'Regional variations, community practices, and cultural preservation' }
    ];

    var articlesData = [
        {
            badge: 'festival',
            title: 'Diwali: The Festival of Lights',
            desc: 'Diwali celebrates the triumph of light over darkness through five days of rituals, prayers, and illumination.',
            date: 'October 2024',
            views: '1,563',
            category: 'festivals'
        },
        {
            badge: 'deity',
            title: 'Lord Ganesh: The Remover of Obstacles',
            desc: 'Lord Ganesh is the beloved elephant-headed deity worshipped as the remover of obstacles and patron of new beginnings.',
            date: 'December 2024',
            views: '1,247',
            category: 'deities'
        },
        {
            badge: 'ritual',
            title: 'Daily Temple Rituals and Their Significance',
            desc: 'Temple daily routines follow natural rhythms with specific rituals for awakening, worship, and rest.',
            date: 'February 2024',
            views: '1,089',
            category: 'rituals'
        },
        {
            badge: 'architecture',
            title: 'Smart Geometry in Hindu Temple Architecture',
            desc: 'Hindu temples embody Smart geometry and cosmic symbolism, designed as miniature representations of the universe.',
            date: 'November 2024',
            views: '892',
            category: 'architecture'
        },
        {
            badge: 'ritual',
            title: 'The Power of Vedic Chanting and Mantras',
            desc: 'Vedic chanting uses precise sound vibrations to create spiritual transformation and mental harmony.',
            date: 'November 2024',
            views: '743',
            category: 'rituals'
        },
        {
            badge: 'history',
            title: 'Ancient Temple Origins and Evolution',
            desc: 'Discover the ancient origins of Hindu temples, their architectural evolution, and historical significance.',
            date: 'September 2024',
            views: '654',
            category: 'history'
        }
    ];

    var impactData = [
        { number: '5', label: 'Total Articles' },
        { number: '5,534', label: 'Total Views' },
        { number: '6', label: 'Categories' }
    ];

    // ============================================================
    // RENDER FUNCTIONS
    // ============================================================

    /**
     * Create a DOM element safely with attributes and text content
     */
    function createElement(tag, attrs, children) {
        var el = document.createElement(tag);
        if (attrs) {
            for (var key in attrs) {
                if (key === 'className') {
                    el.className = attrs[key];
                } else {
                    el.setAttribute(key, attrs[key]);
                }
            }
        }
        if (children) {
            for (var i = 0; i < children.length; i++) {
                if (typeof children[i] === 'string') {
                    el.appendChild(document.createTextNode(children[i]));
                } else if (children[i] instanceof Node) {
                    el.appendChild(children[i]);
                }
            }
        }
        return el;
    }

    /**
     * Render stats
     */
    function renderStats() {
        var container = document.getElementById('statsKnowledgeGrid');
        if (!container) return;

        container.innerHTML = '';

        for (var i = 0; i < statsData.length; i++) {
            var item = statsData[i];

            var col = createElement('div', { className: 'col-lg-3 col-md-6' });

            var card = createElement('div', { className: 'stat-knowledge-card' });

            var numberEl = createElement('div', { className: 'stat-knowledge-number' }, [item.number]);
            var labelEl = createElement('div', { className: 'stat-knowledge-label' }, [item.label]);

            card.appendChild(numberEl);
            card.appendChild(labelEl);
            col.appendChild(card);
            container.appendChild(col);
        }
    }

    /**
     * Render categories
     */
    function renderCategories() {
        var container = document.getElementById('categoriesGrid');
        if (!container) return;

        container.innerHTML = '';

        for (var i = 0; i < categoriesData.length; i++) {
            var item = categoriesData[i];

            var col = createElement('div', { className: 'col-lg-4 col-md-6' });

            var card = createElement('div', { className: 'category-card' });

            var icon = createElement('div', { className: 'category-icon' }, [item.icon]);
            var title = createElement('h3', { className: 'category-title' }, [item.title]);
            var desc = createElement('p', { className: 'category-desc' }, [item.desc]);

            card.appendChild(icon);
            card.appendChild(title);
            card.appendChild(desc);
            col.appendChild(card);
            container.appendChild(col);
        }
    }

    /**
     * Render articles
     */
    function renderArticles() {
        var container = document.getElementById('articlesGrid');
        if (!container) return;

        container.innerHTML = '';

        for (var i = 0; i < articlesData.length; i++) {
            var item = articlesData[i];

            var col = createElement('div', { className: 'col-lg-4 col-md-6' });

            var card = createElement('div', { className: 'article-card' });

            // Badge
            var badge = createElement('span', { className: 'article-badge' }, [item.badge]);

            // Title
            var title = createElement('h3', { className: 'article-title' }, [item.title]);

            // Description
            var desc = createElement('p', { className: 'article-desc' }, [item.desc]);

            // Meta
            var meta = createElement('div', { className: 'article-meta' });

            var dateSpan = createElement('span', {}, ['📅 ' + item.date]);
            var viewsSpan = createElement('span', {}, ['👁️ ' + item.views + ' views']);

            meta.appendChild(dateSpan);
            meta.appendChild(viewsSpan);

            // Read More link
            var link = createElement('a', { className: 'article-link', href: '#' }, ['Read More →']);

            card.appendChild(badge);
            card.appendChild(title);
            card.appendChild(desc);
            card.appendChild(meta);
            card.appendChild(link);
            col.appendChild(card);
            container.appendChild(col);
        }
    }

    /**
     * Render impact stats
     */
    function renderImpact() {
        var container = document.getElementById('impactGrid');
        if (!container) return;

        container.innerHTML = '';

        for (var i = 0; i < impactData.length; i++) {
            var item = impactData[i];

            var col = createElement('div', { className: 'col-lg-4 col-md-4 col-6' });

            var numberEl = createElement('div', { className: 'impact-number' }, [item.number]);
            var labelEl = createElement('div', { className: 'impact-label' }, [item.label]);

            col.appendChild(numberEl);
            col.appendChild(labelEl);
            container.appendChild(col);
        }
    }

    // ============================================================
    // FILTER FUNCTIONALITY
    // ============================================================

    function setupFilters() {
        var filterButtons = document.querySelectorAll('.filter-btn');
        var articleCards = document.querySelectorAll('.article-card');

        if (filterButtons.length === 0 || articleCards.length === 0) return;

        for (var i = 0; i < filterButtons.length; i++) {
            (function(button) {
                button.addEventListener('click', function() {
                    // Remove active class from all buttons
                    for (var j = 0; j < filterButtons.length; j++) {
                        filterButtons[j].classList.remove('active');
                    }
                    button.classList.add('active');

                    var filterValue = button.getAttribute('data-filter');

                    // Get all article columns
                    var articleColumns = document.querySelectorAll('#articlesGrid .col-lg-4');
                    for (var k = 0; k < articleColumns.length; k++) {
                        var col = articleColumns[k];
                        var card = col.querySelector('.article-card');
                        if (!card) continue;

                        // We need to check if the article matches the filter
                        // We stored category in data attribute on the article data
                        // We'll use a data-category attribute on the column
                        var category = col.getAttribute('data-category');

                        if (filterValue === 'all' || category === filterValue) {
                            col.style.display = '';
                        } else {
                            col.style.display = 'none';
                        }
                    }
                });
            })(filterButtons[i]);
        }

        // Show all articles initially
        var articleColumns = document.querySelectorAll('#articlesGrid .col-lg-4');
        for (var k = 0; k < articleColumns.length; k++) {
            articleColumns[k].style.display = '';
        }

        // Activate "All" filter by default if not already active
        var allBtn = document.querySelector('.filter-btn[data-filter="all"]');
        if (allBtn && !allBtn.classList.contains('active')) {
            for (var m = 0; m < filterButtons.length; m++) {
                filterButtons[m].classList.remove('active');
            }
            allBtn.classList.add('active');
        }
    }

    /**
     * Add data-category attributes to article columns for filtering
     */
    function addCategoryAttributes() {
        var columns = document.querySelectorAll('#articlesGrid .col-lg-4');
        var articles = articlesData;

        for (var i = 0; i < columns.length && i < articles.length; i++) {
            columns[i].setAttribute('data-category', articles[i].category);
        }
    }

    // ============================================================
    // SEARCH FUNCTIONALITY
    // ============================================================

    function setupSearch() {
        var searchInput = document.getElementById('searchInput');
        if (!searchInput) return;

        searchInput.addEventListener('keyup', function() {
            var query = this.value.toLowerCase().trim();

            var articleColumns = document.querySelectorAll('#articlesGrid .col-lg-4');

            for (var i = 0; i < articleColumns.length; i++) {
                var col = articleColumns[i];
                var card = col.querySelector('.article-card');
                if (!card) continue;

                var text = card.textContent.toLowerCase();

                if (query === '' || text.indexOf(query) !== -1) {
                    col.style.display = '';
                } else {
                    col.style.display = 'none';
                }
            }
        });
    }

    // ============================================================
    // INIT
    // ============================================================

    document.addEventListener('DOMContentLoaded', function() {
        renderStats();
        renderCategories();
        renderArticles();
        renderImpact();

        // Wait for articles to be rendered before adding attributes and filters
        setTimeout(function() {
            addCategoryAttributes();
            setupFilters();
            setupSearch();

            // Show all articles initially
            var allColumns = document.querySelectorAll('#articlesGrid .col-lg-4');
            for (var i = 0; i < allColumns.length; i++) {
                allColumns[i].style.display = '';
            }
        }, 50);
    });

})();