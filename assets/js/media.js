/**
 * MEDIA PAGE JS – Category Filter (Safe Version)
 * 
 * Security measures:
 * - No innerHTML – uses classList and style.display
 * - No eval(), Function(), or dynamic code execution
 * - All event listeners use standard addEventListener
 * - No external requests or trackers
 */
(function() {
    'use strict';

    var filterButtons = document.querySelectorAll('.filter-btn');
    var mediaItems = document.querySelectorAll('.media-card');

    if (filterButtons.length === 0 || mediaItems.length === 0) {
        return; // exit if elements not found
    }

    /**
     * Get the parent grid column of a media card
     */
    function getParentColumn(card) {
        return card.closest('.col-lg-4, .col-md-6');
    }

    /**
     * Show all media items
     */
    function showAllItems() {
        for (var i = 0; i < mediaItems.length; i++) {
            var col = getParentColumn(mediaItems[i]);
            if (col) {
                col.style.display = '';
            }
        }
    }

    /**
     * Filter items by category
     */
    function filterItems(category) {
        for (var i = 0; i < mediaItems.length; i++) {
            var col = getParentColumn(mediaItems[i]);
            if (!col) continue;

            var itemCategory = col.getAttribute('data-category');

            if (category === 'all' || itemCategory === category) {
                col.style.display = '';
            } else {
                col.style.display = 'none';
            }
        }
    }

    /**
     * Handle filter button click
     */
    function handleFilterClick(button) {
        // Remove active class from all buttons
        for (var i = 0; i < filterButtons.length; i++) {
            filterButtons[i].classList.remove('active');
        }

        // Add active class to clicked button
        button.classList.add('active');

        // Get filter value and apply
        var filterValue = button.getAttribute('data-filter');
        if (filterValue === 'all') {
            showAllItems();
        } else {
            filterItems(filterValue);
        }
    }

    // ── Attach click listeners ──
    for (var i = 0; i < filterButtons.length; i++) {
        (function(button) {
            button.addEventListener('click', function() {
                handleFilterClick(button);
            });
        })(filterButtons[i]);
    }

    // ── Ensure "All" is active and all items visible on page load ──
    showAllItems();

    // Find the "All" button and activate it if not already active
    var allButton = document.querySelector('.filter-btn[data-filter="all"]');
    if (allButton && !allButton.classList.contains('active')) {
        for (var j = 0; j < filterButtons.length; j++) {
            filterButtons[j].classList.remove('active');
        }
        allButton.classList.add('active');
    }

})();