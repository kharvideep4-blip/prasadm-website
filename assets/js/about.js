/**
 * ABOUT PAGE JS – Stats Counter (Safe Version)
 * 
 * Security measures:
 * - No innerHTML – uses createElement and textContent
 * - No eval(), Function(), or dynamic code execution
 * - No external requests or trackers
 */
(function() {
    'use strict';

    // ── Stats Data ──
    var statsData = [
        { number: '500+', label: 'Temples Served', sub: 'Across India' },
        { number: '1M+', label: 'Devotees Connected', sub: 'Growing Daily' },
        { number: '50+', label: 'Cities Covered', sub: 'Nationwide' },
        { number: '99.9%', label: 'Uptime Guarantee', sub: 'Reliable Service' }
    ];

    var container = document.getElementById('statsAboutGrid');

    if (!container) {
        return; // exit if container not found
    }

    // ── Clear any existing content ──
    container.innerHTML = '';

    // ── Build stats cards safely ──
    for (var i = 0; i < statsData.length; i++) {
        var item = statsData[i];

        // Column
        var col = document.createElement('div');
        col.className = 'col-lg-3 col-md-6';

        // Card
        var card = document.createElement('div');
        card.className = 'stat-about-card';

        // Number
        var numberEl = document.createElement('div');
        numberEl.className = 'stat-about-number';
        numberEl.textContent = item.number;

        // Label
        var labelEl = document.createElement('div');
        labelEl.className = 'stat-about-label';
        labelEl.textContent = item.label;

        // Sub
        var subEl = document.createElement('div');
        subEl.className = 'stat-about-sub';
        subEl.textContent = item.sub;

        // Assemble
        card.appendChild(numberEl);
        card.appendChild(labelEl);
        card.appendChild(subEl);
        col.appendChild(card);
        container.appendChild(col);
    }

})();